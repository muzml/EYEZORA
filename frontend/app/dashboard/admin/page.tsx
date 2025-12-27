import Sidebar from "@/app/components/Sidebar";

export default function AdminDashboard() {
  return (
    <div
      className="
        flex min-h-screen
        bg-gradient-to-br from-black via-[#0a1633] to-black
      "
    >
      {/* Sidebar */}
      <Sidebar role="admin" />

      {/* Main Content */}
      <div className="flex-1 p-10">
        {/* Header */}
        <h1 className="text-3xl font-bold text-white mb-8">
          Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Exams" value="4" />
          <StatCard title="Students Appeared" value="96" />
          <StatCard title="Malpractice Cases" value="11" danger />
        </div>

        {/* AI Special Report (ALIGNED) */}
        <div
          className="
            bg-white/90 backdrop-blur-xl
            rounded-3xl shadow-2xl
            p-8
            border border-black/10
          "
        >
          <h2 className="text-2xl font-bold text-black mb-2">
            AI Special Report
          </h2>

          <p className="text-black/70 mb-6">
            High-risk events flagged by the AI proctoring system.
          </p>

          {/* Alerts */}
          <div className="space-y-4 mb-8">
            <Alert text="Student 21 – Mobile phone detected" />
            <Alert text="Student 34 – Multiple faces detected" />
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              className="
                px-6 py-3 rounded-xl
                text-white font-semibold
                bg-gradient-to-r from-[#5c145a] to-[#7a1c6b]
                hover:brightness-110 transition
                shadow-lg
              "
            >
              Review Exam
            </button>

            <button
              className="
                px-6 py-3 rounded-xl
                text-black font-semibold
                bg-gray-200 hover:bg-gray-300 transition
              "
            >
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function StatCard({
  title,
  value,
  danger = false,
}: {
  title: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div
      className="
        bg-white/90 backdrop-blur-xl
        rounded-2xl shadow-xl
        p-6 border border-black/10
      "
    >
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p
        className={`text-3xl font-bold ${
          danger ? "text-red-600" : "text-black"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Alert({ text }: { text: string }) {
  return (
    <div
      className="
        flex items-center gap-3
        bg-red-50 border border-red-200
        rounded-xl p-4
      "
    >
      <span className="text-red-600 text-lg">⚠</span>
      <p className="text-red-700 font-medium">{text}</p>
    </div>
  );
}
