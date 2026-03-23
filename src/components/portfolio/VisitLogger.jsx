"use client";
import { useEffect } from "react";
import { logVisit } from "@/app/actions";

export default function VisitLogger() {
  useEffect(() => {
    if (sessionStorage.getItem("visit_logged")) return;
    sessionStorage.setItem("visit_logged", "1");
    const raw = `${navigator.userAgent}|${navigator.language}|${screen.width}x${screen.height}`;
    const hash = btoa(raw).slice(0, 32);
    logVisit(hash, "/");
  }, []);

  return null;
}
