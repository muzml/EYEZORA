export default function Sidebar({ role }: { role: "admin" | "student" }) {
  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-xl font-bold mb-6">EYEZORA</h2>

      {role === "admin" ? (
        <>
          <p className="mb-3 cursor-pointer">Dashboard</p>
          <p className="mb-3 cursor-pointer">Create Test</p>
          <p className="mb-3 cursor-pointer">Live Monitor</p>
          <p className="mb-3 cursor-pointer">Reports</p>
        </>
      ) : (
        <>
          <p className="mb-3 cursor-pointer">My Exam</p>
          <p className="mb-3 cursor-pointer">Instructions</p>
          <p className="mb-3 cursor-pointer">Result</p>
        </>
      )}
    </div>
  );
}
