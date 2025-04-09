export default async function handler(req, res) {
    const API_KEY = process.env.PEXELS_API_KEY;
    const { type = "photos", query = "travel" } = req.query;
  
    const url = type === "videos"
      ? `https://api.pexels.com/videos/search?query=${query}&per_page=1`
      : `https://api.pexels.com/v1/search?query=${query}&per_page=1`;
  
    const response = await fetch(url, {
      headers: { Authorization: API_KEY },
    });
  
    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch from Pexels API" });
    }
  
    const data = await response.json();
    res.status(200).json(data);
  }
  