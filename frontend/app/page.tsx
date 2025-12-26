"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [role, setRole] = useState<"student" | "admin">("student");
  const [open, setOpen] = useState(false);

  const login = () => {
    role === "admin"
      ? router.push("/dashboard/admin")
      : router.push("/dashboard/student");
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-gradient-to-br from-[#3b0a45] via-[#5c145a] to-[#7a1c6b]
      "
    >
      <div
        className="
          backdrop-blur-xl bg-white/70
          border border-black/10 shadow-2xl
          rounded-3xl p-10 w-[420px]
        "
      >
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-black text-center mb-1">
          AI Exam Proctoring
        </h1>

        <p className="text-black/70 text-center mb-8">
          Secure • Monitored • Intelligent
        </p>

        {/* User ID */}
        <input
          className="
            w-full mb-4 p-3 rounded-xl
            bg-white text-black
            border border-black/30
            focus:outline-none focus:ring-2 focus:ring-[#7a1c6b]
          "
          placeholder="User ID"
        />

        {/* Password */}
        <input
          type="password"
          className="
            w-full mb-4 p-3 rounded-xl
            bg-white text-black
            border border-black/30
            focus:outline-none focus:ring-2 focus:ring-[#7a1c6b]
          "
          placeholder="Password"
        />

        {/* CUSTOM ROLE DROPDOWN */}
        <div className="relative mb-6">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="
              w-full p-3 rounded-xl
              bg-white text-black
              border border-black/30
              flex justify-between items-center
              focus:outline-none focus:ring-2 focus:ring-[#7a1c6b]
            "
          >
            <span className="font-medium capitalize">{role}</span>
            <span className="text-black/60">▼</span>
          </button>

          {open && (
            <div
              className="
                absolute z-20 mt-2 w-full
                bg-white rounded-xl shadow-xl
                border border-black/20 overflow-hidden
              "
            >
              <div
                onClick={() => {
                  setRole("student");
                  setOpen(false);
                }}
                className="
                  px-4 py-3 cursor-pointer
                  text-black hover:bg-[#f3e8f3]
                "
              >
                Student
              </div>

              <div
                onClick={() => {
                  setRole("admin");
                  setOpen(false);
                }}
                className="
                  px-4 py-3 cursor-pointer
                  text-black hover:bg-[#f3e8f3]
                "
              >
                Admin
              </div>
            </div>
          )}
        </div>

        {/* Login Button */}
        <button
          onClick={login}
          className="
            w-full py-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-[#5c145a] to-[#7a1c6b]
            hover:brightness-110 transition shadow-lg
          "
        >
          Login
        </button>
      </div>
    </div>
  );
}
