export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=1200");

  try {
    const response = await fetch(
      "https://www.fcf.cat/api/clubs/5057/team/35522",
      {
        headers: {
          accept: "*/*",
          "accept-language": "ca,es;q=0.9",
          referer: "https://www.fcf.cat/ca/clubs/5057/categories/35522",
          "user-agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
      },
    );

    if (!response.ok) throw new Error(`FCF ${response.status}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
