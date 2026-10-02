export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const GRUP_ID = process.env.FCF_GRUP_ID || "58161863";

  try {
    const response = await fetch(
      `https://www.fcf.cat/api/competition/classificacio?grupId=${GRUP_ID}`,
      {
        headers: {
          accept: "*/*",
          "accept-language": "ca,es;q=0.9",
          "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
          referer: "https://www.fcf.cat/",
        },
      },
    );

    if (!response.ok) throw new Error(`FCF ${response.status}`);

    const data = await response.json();
    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=1200");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
