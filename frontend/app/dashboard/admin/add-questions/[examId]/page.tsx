"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

/* ---------- TYPES ---------- */
type Question = {
  _id: string;
  questionText: string;
};

/* ---------- COMPONENT ---------- */
export default function AddQuestionsPage() {
  const { examId } = useParams();

  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  /* ---------- FETCH QUESTIONS ---------- */
  useEffect(() => {
    if (!examId) return;

    fetch(`http://localhost:5000/api/questions/${examId}`)
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error(err));
  }, [examId]);

  /* ---------- ADD QUESTION ---------- */
  const handleAddQuestion = async () => {
    if (!questionText || options.some(o => !o)) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    const res = await fetch("http://localhost:5000/api/admin/question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        examId,
        questionText,
        options,
        correctOptionIndex: correctIndex,
      }),
    });

    const savedQuestion = await res.json();

    // show immediately
    setQuestions(prev => [...prev, savedQuestion]);

    // reset
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectIndex(0);
    setLoading(false);
  };

  /* ---------- UI ---------- */
  return (
    <div className="p-10 max-w-6xl">
      <h1 className="text-3xl font-bold text-white mb-2">
        Add Questions
      </h1>

      <p className="text-white/70 mb-8">
        Exam ID: <span className="font-mono">{examId}</span>
      </p>

      {/* ================= ADD QUESTION CARD ================= */}
      <div className="bg-white rounded-2xl p-8 shadow-xl mb-12">
        {/* Question */}
        <label className="block font-semibold text-gray-700 mb-2">
          Question
        </label>
        <input
          className="border p-3 w-full mb-4 text-black rounded-lg"
          placeholder="Enter question"
          value={questionText}
          onChange={e => setQuestionText(e.target.value)}
        />

        {/* Options */}
        <label className="block font-semibold text-gray-700 mb-2">
          Options
        </label>

        {options.map((opt, i) => (
          <input
            key={i}
            className="border p-3 w-full mb-3 text-black rounded-lg"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={e => {
              const copy = [...options];
              copy[i] = e.target.value;
              setOptions(copy);
            }}
          />
        ))}

        {/* Correct option */}
        <label className="block font-semibold text-gray-700 mb-2">
          Correct Answer
        </label>
        <select
          className="border p-3 mb-6 text-black rounded-lg"
          value={correctIndex}
          onChange={e => setCorrectIndex(Number(e.target.value))}
        >
          {options.map((_, i) => (
            <option key={i} value={i}>
              Option {i + 1}
            </option>
          ))}
        </select>

        {/* ADD QUESTION BUTTON (CLEAR & VISIBLE) */}
        <button
          onClick={handleAddQuestion}
          disabled={loading}
          className="
            mt-4
            w-full py-4 rounded-xl
            text-white font-bold text-lg
            bg-gradient-to-r from-purple-600 to-pink-600
            hover:brightness-110 transition
            shadow-xl
            disabled:opacity-50
          "
        >
          {loading ? "Saving Question..." : "➕ Add Question"}
        </button>
      </div>

      {/* ================= ADDED QUESTIONS LIST ================= */}
      <h2 className="text-2xl font-bold text-white mb-4">
        Added Questions
      </h2>

      {questions.length === 0 ? (
        <p className="text-white/70">
          No questions added yet.
        </p>
      ) : (
        questions.map((q, i) => (
          <div
            key={q._id}
            className="bg-white rounded-xl p-4 mb-3"
          >
            <p className="font-semibold text-black">
              {i + 1}. {q.questionText}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
