"use server";

import { db } from "@/lib/db";
import {
  messages,
  visits,
  certificates,
  skillGroups,
  skills,
  projects,
  projectTags,
  experiences,
  experienceHighlights,
  photos,
  siteConfig,
} from "@/lib/schema";
import { sql, eq, asc } from "drizzle-orm";

export async function submitContactForm(formData) {
  try {
    await db.insert(messages).values({
      name: formData.name,
      email: formData.email,
      content: formData.message,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to submit contact form:", error);
    return { success: false, error: "Failed to send message." };
  }
}

export async function logVisit(ipHash, path) {
  try {
    await db.insert(visits).values({
      ipHash,
      path,
    });
  } catch (error) {
    console.error("Failed to log visit:", error);
  }
}

export async function getDashboardStats() {
  try {
    const totalVisitsResult = await db.select({ count: sql`count(*)` }).from(visits);
    const uniqueVisitorsResult = await db.select({ count: sql`count(distinct ${visits.ipHash})` }).from(visits);

    // Real chart data: visits per day for the last 14 days
    const chartRaw = await db.execute(sql`
      SELECT DATE(visited_at) as day, COUNT(*) as count
      FROM visits
      WHERE visited_at >= NOW() - INTERVAL '14 days'
      GROUP BY DATE(visited_at)
      ORDER BY day ASC
    `);

    // Build a 14-slot array aligned to today
    const today = new Date();
    const chartData = Array.from({ length: 14 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (13 - i));
      const key = d.toISOString().slice(0, 10);
      const found = chartRaw.rows?.find((r) => r.day?.toISOString?.().slice(0, 10) === key || r.day === key);
      return found ? Number(found.count) : 0;
    });

    const maxVal = Math.max(...chartData, 1);
    const normalizedChart = chartData.map((v) => Math.round((v / maxVal) * 100));

    return {
      totalVisits: Number(totalVisitsResult[0]?.count || 0),
      uniqueVisitors: Number(uniqueVisitorsResult[0]?.count || 0),
      chartData: normalizedChart,
    };
  } catch (error) {
    console.error("Failed to get stats:", error);
    return {
      totalVisits: 0,
      uniqueVisitors: 0,
      chartData: [...Array(14)].map(() => 0),
    };
  }
}

// ─── Certificate CRUD ───

export async function getCertificates() {
  try {
    const rows = await db
      .select()
      .from(certificates)
      .orderBy(asc(certificates.displayOrder));
    return { success: true, data: rows };
  } catch (error) {
    console.error("Failed to get certificates:", error);
    return { success: false, error: "Failed to get certificates." };
  }
}

export async function createCertificate(data) {
  try {
    const [created] = await db
      .insert(certificates)
      .values({
        title: data.title,
        issuer: data.issuer,
        date: data.date,
        color: data.color,
        badgeUrl: data.badgeUrl,
        credentialUrl: data.credentialUrl,
        displayOrder: data.displayOrder,
      })
      .returning();
    return { success: true, data: created };
  } catch (error) {
    console.error("Failed to create certificate:", error);
    return { success: false, error: "Failed to create certificate." };
  }
}

export async function updateCertificate(id, data) {
  try {
    const [updated] = await db
      .update(certificates)
      .set({
        title: data.title,
        issuer: data.issuer,
        date: data.date,
        color: data.color,
        badgeUrl: data.badgeUrl,
        credentialUrl: data.credentialUrl,
        displayOrder: data.displayOrder,
      })
      .where(eq(certificates.id, id))
      .returning();
    return { success: true, data: updated };
  } catch (error) {
    console.error("Failed to update certificate:", error);
    return { success: false, error: "Failed to update certificate." };
  }
}

export async function deleteCertificate(id) {
  try {
    await db.delete(certificates).where(eq(certificates.id, id));
    return { success: true };
  } catch (error) {
    console.error("Failed to delete certificate:", error);
    return { success: false, error: "Failed to delete certificate." };
  }
}

// ─── Skill Group CRUD ───

export async function getSkillGroups() {
  try {
    const groups = await db
      .select()
      .from(skillGroups)
      .orderBy(asc(skillGroups.displayOrder));

    const groupsWithSkills = await Promise.all(
      groups.map(async (group) => {
        const groupSkills = await db
          .select()
          .from(skills)
          .where(eq(skills.groupId, group.id));
        return { ...group, skills: groupSkills };
      })
    );

    return { success: true, data: groupsWithSkills };
  } catch (error) {
    console.error("Failed to get skill groups:", error);
    return { success: false, error: "Failed to get skill groups." };
  }
}

export async function createSkillGroup(data) {
  try {
    const [created] = await db
      .insert(skillGroups)
      .values({
        category: data.category,
        icon: data.icon,
        color: data.color,
        displayOrder: data.displayOrder,
      })
      .returning();

    if (data.skills && data.skills.length > 0) {
      await db.insert(skills).values(
        data.skills.map((s) => ({
          groupId: created.id,
          name: s.name,
        }))
      );
    }

    return { success: true, data: created };
  } catch (error) {
    console.error("Failed to create skill group:", error);
    return { success: false, error: "Failed to create skill group." };
  }
}

export async function updateSkillGroup(id, data) {
  try {
    const [updated] = await db
      .update(skillGroups)
      .set({
        category: data.category,
        icon: data.icon,
        color: data.color,
        displayOrder: data.displayOrder,
      })
      .where(eq(skillGroups.id, id))
      .returning();

    await db.delete(skills).where(eq(skills.groupId, id));

    if (data.skills && data.skills.length > 0) {
      await db.insert(skills).values(
        data.skills.map((s) => ({
          groupId: id,
          name: s.name,
        }))
      );
    }

    return { success: true, data: updated };
  } catch (error) {
    console.error("Failed to update skill group:", error);
    return { success: false, error: "Failed to update skill group." };
  }
}

export async function deleteSkillGroup(id) {
  try {
    await db.delete(skillGroups).where(eq(skillGroups.id, id));
    return { success: true };
  } catch (error) {
    console.error("Failed to delete skill group:", error);
    return { success: false, error: "Failed to delete skill group." };
  }
}

// ─── Project CRUD ───

export async function getProjects() {
  try {
    const rows = await db
      .select()
      .from(projects)
      .orderBy(asc(projects.displayOrder));

    const projectsWithTags = await Promise.all(
      rows.map(async (project) => {
        const tags = await db
          .select()
          .from(projectTags)
          .where(eq(projectTags.projectId, project.id));
        return { ...project, tags };
      })
    );

    return { success: true, data: projectsWithTags };
  } catch (error) {
    console.error("Failed to get projects:", error);
    return { success: false, error: "Failed to get projects." };
  }
}

export async function createProject(data) {
  try {
    const [created] = await db
      .insert(projects)
      .values({
        title: data.title,
        description: data.description,
        icon: data.icon,
        link: data.link,
        gradient: data.gradient,
        displayOrder: data.displayOrder,
      })
      .returning();

    if (data.tags && data.tags.length > 0) {
      await db.insert(projectTags).values(
        data.tags.map((t) => ({
          projectId: created.id,
          tag: t.tag,
        }))
      );
    }

    return { success: true, data: created };
  } catch (error) {
    console.error("Failed to create project:", error);
    return { success: false, error: "Failed to create project." };
  }
}

export async function updateProject(id, data) {
  try {
    const [updated] = await db
      .update(projects)
      .set({
        title: data.title,
        description: data.description,
        icon: data.icon,
        link: data.link,
        gradient: data.gradient,
        displayOrder: data.displayOrder,
      })
      .where(eq(projects.id, id))
      .returning();

    await db.delete(projectTags).where(eq(projectTags.projectId, id));

    if (data.tags && data.tags.length > 0) {
      await db.insert(projectTags).values(
        data.tags.map((t) => ({
          projectId: id,
          tag: t.tag,
        }))
      );
    }

    return { success: true, data: updated };
  } catch (error) {
    console.error("Failed to update project:", error);
    return { success: false, error: "Failed to update project." };
  }
}

export async function deleteProject(id) {
  try {
    await db.delete(projects).where(eq(projects.id, id));
    return { success: true };
  } catch (error) {
    console.error("Failed to delete project:", error);
    return { success: false, error: "Failed to delete project." };
  }
}

// ─── Experience CRUD ───

export async function getExperiences() {
  try {
    const rows = await db
      .select()
      .from(experiences)
      .orderBy(asc(experiences.displayOrder));

    const experiencesWithHighlights = await Promise.all(
      rows.map(async (exp) => {
        const highlights = await db
          .select()
          .from(experienceHighlights)
          .where(eq(experienceHighlights.experienceId, exp.id));
        return { ...exp, highlights };
      })
    );

    return { success: true, data: experiencesWithHighlights };
  } catch (error) {
    console.error("Failed to get experiences:", error);
    return { success: false, error: "Failed to get experiences." };
  }
}

export async function createExperience(data) {
  try {
    const [created] = await db
      .insert(experiences)
      .values({
        role: data.role,
        company: data.company,
        period: data.period,
        description: data.description,
        displayOrder: data.displayOrder,
      })
      .returning();

    if (data.highlights && data.highlights.length > 0) {
      await db.insert(experienceHighlights).values(
        data.highlights.map((h) => ({
          experienceId: created.id,
          highlight: h.highlight,
        }))
      );
    }

    return { success: true, data: created };
  } catch (error) {
    console.error("Failed to create experience:", error);
    return { success: false, error: "Failed to create experience." };
  }
}

export async function updateExperience(id, data) {
  try {
    const [updated] = await db
      .update(experiences)
      .set({
        role: data.role,
        company: data.company,
        period: data.period,
        description: data.description,
        displayOrder: data.displayOrder,
      })
      .where(eq(experiences.id, id))
      .returning();

    await db
      .delete(experienceHighlights)
      .where(eq(experienceHighlights.experienceId, id));

    if (data.highlights && data.highlights.length > 0) {
      await db.insert(experienceHighlights).values(
        data.highlights.map((h) => ({
          experienceId: id,
          highlight: h.highlight,
        }))
      );
    }

    return { success: true, data: updated };
  } catch (error) {
    console.error("Failed to update experience:", error);
    return { success: false, error: "Failed to update experience." };
  }
}

export async function deleteExperience(id) {
  try {
    await db.delete(experiences).where(eq(experiences.id, id));
    return { success: true };
  } catch (error) {
    console.error("Failed to delete experience:", error);
    return { success: false, error: "Failed to delete experience." };
  }
}

// ─── Photo CRUD ───

export async function getPhotos() {
  try {
    const rows = await db
      .select()
      .from(photos)
      .orderBy(asc(photos.displayOrder));
    return { success: true, data: rows };
  } catch (error) {
    console.error("Failed to get photos:", error);
    return { success: false, error: "Failed to get photos." };
  }
}

export async function createPhoto(data) {
  try {
    const [created] = await db
      .insert(photos)
      .values({
        url: data.url,
        caption: data.caption,
        category: data.category,
        displayOrder: data.displayOrder,
      })
      .returning();
    return { success: true, data: created };
  } catch (error) {
    console.error("Failed to create photo:", error);
    return { success: false, error: "Failed to create photo." };
  }
}

export async function deletePhoto(id) {
  try {
    await db.delete(photos).where(eq(photos.id, id));
    return { success: true };
  } catch (error) {
    console.error("Failed to delete photo:", error);
    return { success: false, error: "Failed to delete photo." };
  }
}

// ─── Site Config CRUD ───

export async function getSiteConfig() {
  try {
    const rows = await db.select().from(siteConfig);
    const config = {};
    for (const row of rows) {
      config[row.key] = row.value;
    }
    return { success: true, data: config };
  } catch (error) {
    console.error("Failed to get site config:", error);
    return { success: false, error: "Failed to get site config." };
  }
}

export async function updateSiteConfig(data) {
  try {
    const entries = Object.entries(data);
    for (const [key, value] of entries) {
      await db
        .insert(siteConfig)
        .values({ key, value })
        .onConflictDoUpdate({
          target: siteConfig.key,
          set: { value, updatedAt: sql`now()` },
        });
    }
    return { success: true };
  } catch (error) {
    console.error("Failed to update site config:", error);
    return { success: false, error: "Failed to update site config." };
  }
}
