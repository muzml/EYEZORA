import Sidebar from "@/app/components/Sidebar";

export default function StudentDashboard() {
  return (
    <div className="flex">
      <Sidebar role="student" />

      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-bold mb-2">AI Proctored Exam</h2>
          <p>Duration: 60 Minutes</p>

          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
}
