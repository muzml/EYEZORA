import Sidebar from "@/app/components/Sidebar";
import StatCard from "@/app/components/StatCard";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <Sidebar role="admin" />

      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-3 gap-6">
          <StatCard title="Total Exams" value="4" />
          <StatCard title="Students Appeared" value="96" />
          <StatCard title="Malpractice Cases" value="11" />
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="font-bold mb-4">AI Special Report</h2>
          <ul className="text-red-600">
            <li>⚠ Student 21 – Mobile detected</li>
            <li>⚠ Student 34 – Multiple faces</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
