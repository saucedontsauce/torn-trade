export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") { return res.status(200).end() };

    const sheetUrl = "https://script.google.com/macros/s/AKfycbwvf8Zo6gnETfBkPep2ZMELcQjxOf5e_1ExNtQtK9JFoJom1JCIoRIuW95-J1v_KnnFLw/exec";

    try {
        const response = await fetch(sheetUrl);
        const data = await response.json();

        // Cache for 15 min on the CDN
        res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate");

        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch sheet data" });
    }
}