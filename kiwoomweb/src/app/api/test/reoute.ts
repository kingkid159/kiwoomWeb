export async function connectTest() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/test/hello`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
  const data = await res.text(); // JSON 응답 파싱
  return data;
}