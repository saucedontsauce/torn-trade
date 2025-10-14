import { useState, useEffect, useMemo } from "react";

import { useApp } from "@/context/AppContext";

import Pagination from "@/components/Pagination";


// Item card
function ItemCard({ item }) {
    return (
        <div className="border border-gray-700 rounded-lg p-4 shadow hover:shadow-lg transition duration-200 bg-gray-800 text-gray-100">
            <h2 className="text-xl font-bold mb-2">{item.name}</h2>
            <p className="text-gray-400 mb-2">{item.type}</p>
            <p className="mb-2">{item.description}</p>
            <div className="flex justify-between text-sm text-gray-300">
                <span>Buy: ${item.buy_price}</span>
                <span>Sell: ${item.sell_price}</span>
                <span>Market: ${item.market_price}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2">
                Circulation: {item.circulation.toLocaleString()}
            </p>
        </div>
    );
}

// Skeleton for loading
function SkeletonCard() {
    return (
        <div className="border border-gray-700 rounded-lg p-4 shadow animate-pulse space-y-2 bg-gray-800">
            <div className="h-6 bg-gray-600 rounded w-1/2"></div>
            <div className="h-4 bg-gray-600 rounded w-1/4"></div>
            <div className="h-3 bg-gray-600 rounded w-full"></div>
            <div className="flex justify-between">
                <div className="h-3 bg-gray-600 rounded w-1/5"></div>
                <div className="h-3 bg-gray-600 rounded w-1/5"></div>
                <div className="h-3 bg-gray-600 rounded w-1/5"></div>
            </div>
            <div className="h-3 bg-gray-600 rounded w-1/3 mt-2"></div>
        </div>
    );
}

export default function () {
    const { items } = useApp();

    const [types, setTypes] = useState([]);
    const [filterType, setFilterType] = useState("");
    const [searchName, setSearchName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Extract unique types when data is available
    useEffect(() => {
        if (items?.items?.length) {
            const uniqueTypes = [...new Set(items.items.map((item) => item.type))];
            setTypes(uniqueTypes);
        }
    }, [items]);

    // ✅ Filter items using useMemo (derived data)
    const filteredItems = useMemo(() => {
        if (!items?.items) return [];
        let filtered = items.items;

        if (filterType) {
            filtered = filtered.filter(
                (item) => item.type.toLowerCase() === filterType.toLowerCase()
            );
        }

        if (searchName) {
            filtered = filtered.filter((item) =>
                item.name.toLowerCase().includes(searchName.toLowerCase())
            );
        }

        return filtered;
    }, [items, filterType, searchName]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filterType, searchName]);

    // Pagination logic
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const goToPage = (num) => {
        if (num < 1 || num > totalPages) return;
        setCurrentPage(num);
    };

    return (
        <div className="p-6 max-w-5xl mx-auto bg-gray-900 min-h-screen text-gray-100">
            <h1 className="text-3xl font-bold mb-6">Items</h1>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by name"
                    disabled={!items}
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className={`border border-gray-700 rounded px-3 py-2 w-full sm:w-1/2 bg-gray-800 text-gray-100 placeholder-gray-400 transition ${!items ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                />

                <select
                    value={filterType}
                    disabled={!items}
                    onChange={(e) => setFilterType(e.target.value)}
                    className={`border border-gray-700 rounded px-3 py-2 w-full sm:w-1/2 bg-gray-800 text-gray-100 transition ${!items ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    <option value="">All Types</option>
                    {types.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>

                {/* Items per page */}
                <select
                    title="Items per page"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="border border-gray-700 rounded px-3 py-2 w-full sm:w-1/4 bg-gray-800 text-gray-100"
                >
                    <option value={5}>5pp</option>
                    <option value={10}>10pp</option>
                    <option value={25}>25pp</option>
                    <option value={50}>50pp</option>
                </select>
            </div>

            {/* Items Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
                {!items
                    ? Array.from({ length: 4 }).map((_, idx) => <SkeletonCard key={idx} />)
                    : currentItems.length > 0 ? (
                        currentItems.map((item) => <ItemCard key={item.id} item={item} />)
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-400">
                            <p className="text-lg">No items found.</p>
                            <p className="text-sm text-gray-500">Try changing your filters or search query.</p>
                        </div>
                    )}
            </div>


            {items && filteredItems.length > itemsPerPage && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                    maxVisible={9} // optional; defaults to 9
                />
            )}

        </div>
    );
}
