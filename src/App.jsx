import { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router";

import { AppContext } from "@/context/AppContext";
import InitData from "@/context/ItemContext";

import { onAuthStateChanged } from "firebase/auth"
import { db, auth } from "@/firebase/config"
import { initializeUserData } from "@/firebase/initUserData"


import { Navbar, Footer } from "@/components/Layout";
import Chat from "@/components/Chat";


const Home = lazy(() => import("@/pages/public/Home"));
const About = lazy(() => import("@/pages/public/About"));
const Login = lazy(() =>
  import("@/pages/public/index.jsx").then((m) => ({ default: m.Login }))
);
const Register = lazy(() =>
  import("@/pages/public/index.jsx").then((m) => ({ default: m.Register }))
);
const TEMPLATE1 = lazy(() => import("@/pages/public/Home"));


const Profile = lazy(() => import("@/pages/user/Profile"));
const List = lazy(() => import("@/pages/user/List"));

const Items = lazy(() => import("@/pages/info/Items"));

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const [items, setItems] = useState();

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (u) => {
      console.log("Auth status changed")
      u ? await initializeUserData(u, setUser) : setUser()
      setLoading(false)
    })

    const cleanupSheets = InitData(setItems);

    return () => {
      unsubAuth();
      cleanupSheets();
    }
  }, [])


  if (loading || !items) return <div className="h-screen bg-gray-900 text-gray-100 flex items-center justify-center">Loading...</div>

  return (
    <Suspense fallback={<div className="h-screen bg-gray-900 text-gray-100 flex items-center justify-center">Loading...</div>}>
      <AppContext.Provider value={{ db, auth, user, items, setUser }}>
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto p-6">
            <Routes>
              <Route path="/"  >
                <Route index element={<Home items={items} />} />
                <Route path="about" element={<About />} />
                <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />
                <Route path="register" element={user ? <Navigate to="/" /> : <Register />} />
                <Route path="chat" element={user ? <Chat /> : <Navigate to="/" />} />
                <Route path=":id" element={<TEMPLATE1 items={items} />} />
              </Route >

              <Route path="/user" element={user ? <Outlet /> : <Navigate to="/" />}>
                <Route index element={<Profile />} />
                <Route path="list" element={<List items={items} />} />
              </Route>

              <Route path="/info" element={user ? <Outlet /> : <Navigate to="/" />} >
                <Route index element={<Items />} />
              </Route >

            </Routes>
          </main>
          <Footer />
        </div>
      </AppContext.Provider>
    </Suspense>
  );
}
