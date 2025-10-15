import { useState } from "react";
import { X } from "lucide-react";

function onRemoveItem(id) {

};

function onUpdateItem(cat, updated) {

};

export default function CatCard({ cat, name, onRemoveItem, onUpdateItem }) {
    const [localCat, setLocalCat] = useState(cat);

    const handleTypeChange = (item, newType) => {
        const updated = {
            ...localCat,
            [item]: { ...localCat[item], type: newType },
        };
        setLocalCat(updated);
        onUpdateItem?.(cat, updated);
    };

    const handleValueChange = (item, newVal) => {
        const updated = {
            ...localCat,
            [item]: { ...localCat[item], value: Number(newVal) },
        };
        setLocalCat(updated);
        onUpdateItem?.(item, updated[item]);
    };

    const handleRemove = (item) => {
        const updated = { ...localCat };
        delete updated[item];
        setLocalCat(updated);
        onRemoveItem?.(item.id);
    };

    return (
        <div className="relative border border-gray-700 rounded-lg p-4 shadow hover:shadow-lg transition duration-200 bg-gray-800 text-gray-100">
            <h2 className="text-xl font-bold mb-3">{name}</h2>

            <div className="space-y-3">
                {Object.keys(localCat).map((item) => (
                    <div
                        key={item}
                        className="flex items-center justify-between bg-gray-900/50 px-3 py-2 rounded-lg border border-gray-700 text-sm"
                    >
                        {/* Left: Item name and image */}
                        <div className="flex items-center space-x-2">
                            <img
                                src={`https://www.torn.com/images/items/${item}/small.png`}
                                className="h-6"
                                alt={localCat[item].name}
                            />
                            <span>{localCat[item].name}</span>
                        </div>

                        {/* Middle: Dropdown + Value input */}
                        <div className="flex items-center space-x-2">
                            <select
                                value={localCat[item].type || ""}
                                onChange={(e) => handleTypeChange(item, e.target.value)}
                                className="bg-gray-800 border border-gray-600 rounded-md px-2 py-1 text-gray-200 text-sm focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Type</option>
                                <option value="definitive" title="Set Price">Definitive</option>
                                <option value="sell" title="Multiplier">Multiplier</option>
                            </select>

                            <input
                                type="number"
                                value={localCat[item].value || ""}
                                onChange={(e) => handleValueChange(item, e.target.value)}
                                className="w-20 bg-gray-800 border border-gray-600 rounded-md px-2 py-1 text-gray-200 text-sm focus:ring-2 focus:ring-blue-500"
                                placeholder="Value"
                            />
                        </div>

                        {/* Right: Remove button */}
                        <button
                            onClick={() => handleRemove(item)}
                            className="text-red-400 hover:text-red-500 transition"
                            title="Remove item"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
