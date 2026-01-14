"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTestPage() {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleCreateExam = async () => {
    if (!title.trim()) {
      alert("Enter exam title");
      return;
    }

    const res = await fetch("http://localhost:5000/api/admin/exam", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    const exam = await res.json();
    router.push(`/dashboard/admin/add-questions/${exam._id}`);
  };

  return (
    <div className="p-10 max-w-3xl">
      {/* Page title */}
      <h1 className="text-3xl font-bold text-white mb-8">
        Create Test
      </h1>

      {/* Card */}
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <label className="block text-gray-700 font-semibold mb-2">
          Exam Title
        </label>

        <input
          className="
            w-full p-3 rounded-lg
            border border-gray-300
            text-black placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-purple-500
            mb-6
          "
          placeholder="Enter exam name (e.g. AI Final Exam)"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <button
          onClick={handleCreateExam}
          className="
            w-full py-3 rounded-xl
            text-white font-semibold text-lg
            bg-gradient-to-r from-[#5c145a] to-[#7a1c6b]
            hover:brightness-110 transition
            shadow-lg
          "
        >
          Create Exam
        </button>
      </div>
    </div>
  );
}
