import Link from "next/link";
import { ShieldX } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default function UnauthorizedPage() {
  return (
    <div className="bg-[#030014] min-h-screen text-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <ShieldX className="w-16 h-16 text-purple-400" />
        </div>
        <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
          Access Denied
        </h1>
        <p className="text-gray-400 mb-8">
          You don&apos;t have permission to access this page. This area is restricted to administrators only.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-medium transition-all duration-200 shadow-lg shadow-purple-900/30"
          >
            Go Back Home
          </Link>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
