"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

/* ---------- TYPES ---------- */
type Option = string;

type Question = {
  _id: string;
  questionText: string;
  options: Option[];
};

/* ---------- COMPONENT ---------- */
export default function StudentExamPage() {
  const { examId } = useParams();

  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  /* ---------- START EXAM ---------- */
  const handleStartExam = async () => {
    setStarted(true);
    setLoading(true);

    const res = await fetch(
      `http://localhost:5000/api/student/exam/${examId}`
    );
    const data = await res.json();
    setQuestions(data);

    setLoading(false);
  };

  /* ---------- SELECT ANSWER ---------- */
  const selectAnswer = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  /* ---------- SUBMIT EXAM ---------- */
  const handleSubmitExam = async () => {
    if (Object.keys(answers).length !== questions.length) {
      alert("Answer all questions before submitting");
      return;
    }

    await fetch("http://localhost:5000/api/student/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        examId,
        studentId: "temp-student-1", // later replace with auth
        answers,
      }),
    });

    alert("Exam submitted successfully ✅");
  };

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-black via-[#0a1633] to-black">
      {!started ? (
        /* ================= START SCREEN ================= */
        <div className="max-w-4xl mx-auto bg-white/90 rounded-3xl p-10 shadow-2xl">
          <h1 className="text-3xl font-bold mb-4">
            AI Proctored Examination
          </h1>

          <p className="text-gray-600 mb-6">
            Please read the instructions carefully before starting.
          </p>

          <ul className="list-disc ml-6 mb-8 text-gray-700">
            <li>No tab switching</li>
            <li>No mobile phones</li>
            <li>Camera must stay on</li>
          </ul>

          <button
            onClick={handleStartExam}
            className="
              w-full py-4 rounded-2xl
              text-white text-lg font-semibold
              bg-gradient-to-r from-purple-600 to-pink-600
              hover:brightness-110 transition
            "
          >
            Start Exam
          </button>
        </div>
      ) : (
        /* ================= EXAM SCREEN ================= */
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">
            Exam in Progress
          </h1>

          {loading ? (
            <p className="text-white">Loading questions...</p>
          ) : (
            <>
              {questions.map((q, i) => (
                <div
                  key={q._id}
                  className="bg-white rounded-2xl p-6 mb-6 shadow-xl"
                >
                  <p className="font-semibold mb-4">
                    {i + 1}. {q.questionText}
                  </p>

                  <div className="space-y-2">
                    {q.options.map((opt, idx) => (
                      <label
                        key={idx}
                        className={`
                          block px-4 py-2 rounded-lg cursor-pointer border
                          ${
                            answers[q._id] === idx
                              ? "bg-purple-100 border-purple-500"
                              : "hover:bg-gray-100"
                          }
                        `}
                      >
                        <input
                          type="radio"
                          name={q._id}
                          className="mr-2"
                          checked={answers[q._id] === idx}
                          onChange={() =>
                            selectAnswer(q._id, idx)
                          }
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={handleSubmitExam}
                className="
                  w-full py-4 mt-6 rounded-2xl
                  text-white text-lg font-bold
                  bg-gradient-to-r from-green-600 to-green-700
                  hover:brightness-110 transition
                "
              >
                Submit Exam
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
