export default function fetchSheetData(cb) {
    const sheetUrl =
        "https://script.google.com/macros/s/AKfycbwvf8Zo6gnETfBkPep2ZMELcQjxOf5e_1ExNtQtK9JFoJom1JCIoRIuW95-J1v_KnnFLw/exec";
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