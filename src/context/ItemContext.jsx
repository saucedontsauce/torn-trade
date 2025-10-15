export default function fetchSheetData(cb) {
    const sheetUrl =
        "https://torn-trade-nnmnn.vercel.app/api/sheet.js";
    const proxyUrl = "https://corsproxy.io/?" + encodeURIComponent(sheetUrl);

    const getData = () =>
        fetch(sheetUrl)//was proxyUrl
            .then((res) => res.json())
            .then(cb)
            .catch(console.error);

    getData();

    // Refresh every 15 min (900 000 ms)
    const interval = setInterval(getData, 900000);

    return () => clearInterval(interval); // allow cleanup in useEffect
}