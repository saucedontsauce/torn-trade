import { useApp } from "@/context/AppContext";
export default function Home() {
    const { items } = useApp();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Welcome to [WIP]</h1>
            <p>This site displays Torn data fetched from Google Sheets, There is a login function where you can set a price list and omit any items you dont want.</p>

            <p className="p-4">
                Currently Torn has {!items ? <span className="inline-block h-4 w-12 bg-gray-300 rounded animate-pulse"></span> : items.count} item codes, although some of them are duds.
            </p>

            { /*<hr />
            <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="h-6 bg-gray-300 rounded w-5/6"></div>
            </div>*/}

        </div>
    );
}
