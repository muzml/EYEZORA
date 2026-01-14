"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({
  role,
}: {
  role: "student" | "admin";
}) {
  const pathname = usePathname();

  return (
    <aside
      className="
        w-72 min-h-screen
        bg-gradient-to-b from-black via-[#0a1633] to-black
        border-r border-white/10
        px-6 py-8
      "
    >
      {/* Brand */}
      <div className="mb-12">
        <h1 className="text-2xl font-extrabold text-white tracking-wide">
          EYEZORA
        </h1>
      </div>

      {/* Navigation */}
      <nav className="space-y-3">
        {role === "student" ? (
          <>
            <NavItem
              label="My Exam"
              href="/dashboard/student"
              active={pathname === "/dashboard/student"}
            />
            <NavItem
              label="Instructions"
              href="/dashboard/student/instructions"
              active={pathname.includes("instructions")}
            />
            <NavItem
              label="Result"
              href="/dashboard/student/result"
              active={pathname.includes("result")}
            />
          </>
        ) : (
          <>
            <NavItem
              label="Dashboard"
              href="/dashboard/admin"
              active={pathname === "/dashboard/admin"}
            />
            <NavItem
              label="Create Test"
              href="/dashboard/admin/create-test"
              active={pathname.includes("create-test")}
            />
            <NavItem
              label="Reports"
              href="/dashboard/admin/reports"
              active={pathname.includes("reports")}
            />
          </>
        )}
      </nav>
    </aside>
  );
}

/* ---------- Nav Item ---------- */

function NavItem({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        block px-4 py-3 rounded-xl
        font-medium transition-all
        ${
          active
            ? "bg-gradient-to-r from-[#5c145a] to-[#7a1c6b] text-white shadow-lg"
            : "text-white/70 hover:text-white hover:bg-white/10"
        }
      `}
    >
      {label}
    </Link>
  );
}
