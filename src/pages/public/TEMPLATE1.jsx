import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import { ChevronDown, ChevronUp } from "lucide-react";

function CatCard({ cat, name }) {
    const [open, setOpen] = useState(true);

    return (
        <div className="relative border border-gray-700 rounded-lg p-4 shadow hover:shadow-lg transition duration-200 bg-gray-800 text-gray-100">
            {/* Header */}
            <div
                className="flex justify-between items-center cursor-pointer select-none"
                onClick={() => setOpen(!open)}
            >
                <h2 className="text-xl font-bold text-blue-400">{name}</h2>
                {open ? (
                    <ChevronUp className="text-gray-400" size={18} />
                ) : (
                    <ChevronDown className="text-gray-400" size={18} />
                )}
            </div>

            {/* Collapsible content */}
            <div
                className={`transition-all duration-300 overflow-hidden ${open ? "max-h-[1000px] opacity-100 mt-3" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="space-y-2">
                    {Object.keys(cat).map((item) => (
                        <div
                            key={item}
                            className="flex justify-between items-center text-sm bg-gray-900/50 p-2 rounded-md border border-gray-700"
                        >
                            <span className="flex items-center gap-2">
                                <img
                                    src={`https://www.torn.com/images/items/${item}/small.png`}
                                    className="h-5 w-5"
                                    alt={cat[item].name}
                                />
                                {cat[item].name}
                            </span>
                            <span className="text-green-400 font-medium">
                                $
                                {cat[item].rate === "definitive"
                                    ? cat[item].val.toLocaleString()
                                    : (cat[item].val * cat[item].market_price).toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function SkeletonCard() {
    return (
        <div className="border border-gray-700 rounded-lg p-4 shadow bg-gray-800 animate-pulse">
            <div className="h-6 w-32 bg-gray-700 rounded mb-3"></div>
            <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                        <div className="h-4 w-24 bg-gray-700 rounded"></div>
                        <div className="h-4 w-12 bg-gray-700 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function TEMPLATE1(props) {
    const { items, categories } = useMemo(() => {
        let categories = [],
            items = {};
        props.items.items.forEach((i) => {
            items[i.id] = i;
            if (!categories.includes(i.type)) categories.push(i.type);
        });
        return { items, categories };
    }, [props.items]);

    const navigate = useNavigate();
    const id = props.hash;
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState({});
    const [display, setDisplay] = useState({});
    const [fadeOut, setFadeOut] = useState(false);

    async function getdata() {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("link", "==", id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const data = { ...querySnapshot.docs[0].data() };
            if (data.public === true) {
                if (data.credits === 0) {
                    navigate("/man-dont-pay");
                } else {
                    setList({
                        owner: data.displayName,
                        list: data.list,
                        order: data.order,
                        scheme: data.scheme,
                    });
                }
            } else {
                navigate("/");
            }
        } else {
            navigate("/");
        }

        // Start fade-out animation for skeletons
        setTimeout(() => setFadeOut(true), 150);
        setTimeout(() => setLoading(false), 400);
    }

    useEffect(() => {
        if (Object.keys(list).length === 0) {
            getdata();
        } else {
            const newDisplay = {};
            (list.order || categories).forEach((category) => {
                const catItems = Object.entries(list.list).filter(
                    ([id]) => items[id]?.type === category
                );
                if (catItems.length > 0) {
                    const catObj = {};
                    catItems.forEach(([id, v]) => (catObj[id] = { ...v, ...items[id] }));
                    newDisplay[category] = catObj;
                }
            });
            setDisplay(newDisplay);
        }
    }, [list]);

    return (
        <div className="p-6 max-w-5xl mx-auto bg-gray-900 min-h-screen text-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-blue-400">
                {list?.scheme?.title
                    ? list.scheme.title
                    : list?.owner
                        ? `${list.owner}'s Price List`
                        : "Price List"}
            </h1>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 relative">
                {/* Skeleton fade-out */}
                {loading && (
                    <div
                        className={`absolute inset-0 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-300 ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
                            }`}
                    >
                        {[...Array(6)].map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                )}

                {!loading &&
                    (Object.keys(display).length > 0 ? (
                        Object.keys(display).map((item) => (
                            <CatCard key={item} name={item} cat={display[item]} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-400">
                            <p className="text-lg">No items to show.</p>
                            <p className="text-sm text-gray-500">
                                Try changing your filters or asking this seller to add more
                                items.
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
