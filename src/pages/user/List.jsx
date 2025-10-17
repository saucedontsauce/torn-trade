import { useEffect, useState, useMemo } from "react";
import CatCard from "@/components/CatCard";

export default function List({ itemsProp, user }) {
    // Build items lookup and categories
    const { items, categories } = useMemo(() => {
        let categories = [];
        let itemsMap = {};
        itemsProp?.items?.forEach((i) => {
            itemsMap[i.id] = i;
            if (!categories.includes(i.type)) categories.push(i.type);
        });
        return { items: itemsMap, categories };
    }, [itemsProp]);

    const [display, setDisplay] = useState({});

    useEffect(() => {
        if (!user?.list) {
            setDisplay({});
            return;
        }

        const newDisplay = {};
        (user.order?.length ? user.order : categories).forEach((category) => {
            const catItems = Object.entries(user.list).filter(
                ([id]) => items[id]?.type === category
            );

            if (catItems.length > 0) {
                newDisplay[category] = {};
                catItems.forEach(([id, data]) => {
                    newDisplay[category][id] = { ...data, ...items[id] };
                });
            }
        });

        setDisplay(newDisplay);
    }, [user, items, categories]);

    return (
        <div className="p-6 max-w-6xl mx-auto bg-gray-900 min-h-screen text-gray-100">
            <h1 className="text-3xl font-bold mb-6">Your Price List</h1>

            {Object.keys(display).length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2">
                    {Object.keys(display).map((category) => (
                        <CatCard key={category} name={category} cat={display[category]} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-gray-400">
                    <p className="text-lg">No items to show.</p>
                    <p className="text-sm text-gray-500">
                        Try changing your filters or ask this seller to add more items.
                    </p>
                </div>
            )}
        </div>
    );
}
