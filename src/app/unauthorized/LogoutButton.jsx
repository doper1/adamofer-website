"use client";
import { useAuth } from "@clerk/nextjs";

export default function LogoutButton() {
  const { signOut } = useAuth();

  return (
    <button
      onClick={() => signOut({ redirectUrl: "/" })}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-gray-300 hover:text-white hover:border-white/20 font-medium transition-all duration-200"
    >
      Sign Out
    </button>
  );
}
