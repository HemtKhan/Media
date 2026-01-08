export default async () => {
  const API_KEY = process.env.07b8850f34c3ad7e91eaed3e505312cb;

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
