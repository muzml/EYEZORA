export async function verifyPerson(studentId: string, image: string) {
  const res = await fetch("http://localhost:8000/api/verify-person", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      student_id: studentId,
      image: image,
    }),
  });

  return res.json();
}
