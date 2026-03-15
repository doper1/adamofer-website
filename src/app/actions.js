"use server";

import { db } from "@/lib/db";
import { messages, visits } from "@/lib/schema";
import { sql } from "drizzle-orm";

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
    
    // For the chart, we can mock it or query grouped by date. 
    // Mocking chart data for now since we just set up the DB
    const chartData = [...Array(14)].map(() => Math.floor(Math.random() * 80 + 20));

    return {
      totalVisits: Number(totalVisitsResult[0]?.count || 0),
      uniqueVisitors: Number(uniqueVisitorsResult[0]?.count || 0),
      chartData
    };
  } catch (error) {
    console.error("Failed to get stats:", error);
    return {
      totalVisits: 0,
      uniqueVisitors: 0,
      chartData: [...Array(14)].map(() => 0)
    };
  }
}
