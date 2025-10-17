import { useState } from "react";
import { X } from "lucide-react";

function onRemoveItem(id) { }
function onUpdateItem(cat, updated) { }

export default function CatCard({ cat, name }) {
    const [localCat, setLocalCat] = useState(cat);

    const handleTypeChange = (item, newType) => {
        const updated = { ...localCat, [item]: { ...localCat[item], type: newType } };
        setLocalCat(updated);
        onUpdateItem?.(cat, updated);
    };

    const handleValueChange = (item, newVal) => {
        const updated = { ...localCat, [item]: { ...localCat[item], value: Number(newVal) } };
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
        <div className="relative border border-gray-700 rounded-lg shadow hover:shadow-lg transition duration-200 bg-gray-800 text-gray-100 p-4 flex flex-col gap-4">
            <h2 className="text-xl font-bold truncate">{name}</h2>

            <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto">
                {Object.keys(localCat).map((item) => (
                    <div
                        key={item}
                        className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-900/50 px-3 py-2 rounded-lg border border-gray-700 text-sm gap-2 flex-wrap"
                    >
                        {/* Left: image + name */}
                        <div className="flex items-center space-x-2 min-w-[120px] max-w-[150px] flex-shrink-0">
                            <img
                                src={`https://www.torn.com/images/items/${item}/small.png`}
                                className="h-6 w-6 object-contain"
                                alt={localCat[item].name}
                            />
                            <span className="truncate">{localCat[item].name}</span>
                        </div>

                        {/* Middle: type + value */}
                        <div className="flex flex-col sm:flex-row items-center sm:justify-center sm:flex-1 gap-2 w-full sm:w-auto flex-wrap">
                            <select
                                value={localCat[item].rate || ""}
                                onChange={(e) => handleTypeChange(item, e.target.value)}
                                className="bg-gray-800 border border-gray-600 rounded-md px-2 py-1 text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                            >
                                <option value="">Type</option>
                                <option value="definitive">Definitive</option>
                                <option value="comparative">Multiplier</option>
                            </select>

                            <input
                                type="number"
                                value={localCat[item].val || ""}
                                onChange={(e) => handleValueChange(item, e.target.value)}
                                className="w-full sm:w-20 bg-gray-800 border border-gray-600 rounded-md px-2 py-1 text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Value"
                            />
                        </div>

                        {/* Right: remove */}
                        <div className="flex justify-end sm:ml-4 flex-shrink-0">
                            <button
                                onClick={() => handleRemove(item)}
                                className="text-red-400 hover:text-red-500 transition mt-1 sm:mt-0"
                                title="Remove item"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
