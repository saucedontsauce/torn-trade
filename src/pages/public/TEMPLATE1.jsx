import { useEffect, useRef, useState, useMemo } from "react";
import { useApp } from '@/context/AppContext'

import { Card } from '@/components/ui/Card'

import { db } from "@/firebase/config"
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate, useParams } from "react-router";

function CatCard({ cat, name }) {
    return (
        <div className="relative border border-gray-700 rounded-lg p-4 shadow hover:shadow-lg transition duration-200 bg-gray-800 text-gray-100">
            <h2 className="text-xl font-bold mb-2">{name}</h2>
            {/*<p className="text-gray-400 mb-2">{item.type}</p>
            <p className="mb-2">{item.description}</p>*/}
            {Object.keys(cat).map((item) => <div key={item} className="flex justify-between text-sm text-gray-300">
                <span><img src={`https://www.torn.com/images/items/${item}/small.png`} className="inline" alt="img" />{cat[item].name}</span>
                <span> ${cat[item].rate === "definitive" ? cat[item].val : cat[item].val * cat[item].market_price}</span>
            </div>)}
        </div>
    );
}

export default function TEMPLATE1(props) {
    const { items, categories } = useMemo(() => { let categories = [], items = {}; props.items.items.map((i) => { items[i.id] = i; if (!categories.includes(i.type)) categories.push(i.type); }); return { items: items, categories: categories } }, [props.items]);

    const navigate = useNavigate()
    const { id } = useParams()

    const [loading, setLoading] = useState(true)

    const [list, setList] = useState({});
    const [display, setDisplay] = useState({});


    async function getdata() {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("link", "==", id));

        const querySnapshot = await getDocs(q);
        const data = { ...querySnapshot.docs[0].data() }
        if (querySnapshot.docs[0].exists() && querySnapshot.docs[0].data().public == true) {
            if (data.credits = 0) {
                navigate("/man-dont-pay")
            } else {
                setList({ owner: data.displayName, list: data.list, order: data.order, scheme: data.scheme })
                setLoading(false);
            }
        } else {
            navigate("/")
        }
    };

    useEffect(() => {
        if (Object.keys(list).length === 0) {
            getdata();
        } else {
            setDisplay({});
            (list.order || categories).map((category) => {
                let catitems = Object.entries(list.list).filter((v) => items[v[0]].type === category)
                let catobj = {}
                catitems.forEach(v => catobj[v[0]] = { ...v[1], ...items[v[0]] })
                Object.keys(catobj).length > 0 && setDisplay({ ...display, [category]: catobj })
            });
        }
    }, [list]);



    if (!list) return <Card>
        <h1>loading prices</h1>
    </Card>
    return <div className="p-6 max-w-5xl mx-auto bg-gray-900 min-h-screen text-gray-100">
        <h1 className="text-3xl font-bold mb-6">{list?.scheme?.title ? list.scheme.title : `${list.owner}'s Price List`}</h1>

        {/* Items Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
            {Object.keys(display).length > 0 ? (
                Object.keys(display).map((item) => <CatCard key={item} name={item} cat={display[item]} />)
            ) : (
                <div className="col-span-full text-center py-12 text-gray-400">
                    <p className="text-lg">No items to show.</p>
                    <p className="text-sm text-gray-500">Try changing your filters or asking this seller to add more items.</p>
                </div>
            )}
        </div>


    </div>

}