// /api/sheet.js
let cache = { data: null, ts: 0 };

export default async function handler(req, res) {
    const now = Date.now();
    const fifteenMinutes = 15 * 60 * 1000;

    // Reuse cached data if it's still fresh
    if (cache.data && now - cache.ts < fifteenMinutes) {
        res.setHeader("Cache-Control", "public, max-age=60");
        return res.status(200).json(cache.data);
    }

    // Otherwise, fetch fresh data from Google Apps Script
    const sheetUrl =
        "https://script.google.com/macros/s/AKfycbwvf8Zo6gnETfBkPep2ZMELcQjxOf5e_1ExNtQtK9JFoJom1JCIoRIuW95-J1v_KnnFLw/exec";

    try {
        const resp = await fetch(sheetUrl);
        const data = await resp.json();

        cache = { data, ts: now };

        res.setHeader("Cache-Control", "public, max-age=60");
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch sheet data" });
    }
}
