export default async () => {
  const API_KEY = process.env.NAIZOP_API_KEY;

  const res = await fetch("https://naizop.com/api/v2", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      key: API_KEY,
      action: "services"
    })
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
};
