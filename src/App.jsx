import { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router";

import { AppContext } from "@/context/AppContext";
import InitData from "@/context/ItemContext";

import { onAuthStateChanged } from "firebase/auth"
import { db, auth } from "@/firebase/config"
import { initializeUserData } from "@/firebase/initUserData"


import { Navbar, Footer } from "@/components/Layout";
import ChatPage from "@/components/Chat";


const HomePage = lazy(() => import("@/pages/public/Home"));
const AboutPage = lazy(() => import("@/pages/public/About"));
const LoginPage = lazy(() =>
  import("@/pages/public/index.jsx").then((m) => ({ default: m.Login }))
);
const RegisterPage = lazy(() =>
  import("@/pages/public/index.jsx").then((m) => ({ default: m.Register }))
);
const Items = lazy(() => import("@/pages/public/Items"));



const ProfilePage = lazy(() => import("@/pages/user/Profile"));
const ListPage = lazy(() => import("@/pages/user/List"));


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
                <Route index element={<HomePage items={items} />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="login" element={user ? <Navigate to="/" /> : <LoginPage />} />
                <Route path="register" element={user ? <Navigate to="/" /> : <RegisterPage />} />
                <Route path="chat" element={user ? <ChatPage /> : <Navigate to="/" />} />
                <Route path="items" element={<Items items={items} user={user} setUser={setUser} />} />
              </Route >

              <Route path="/user" element={user ? <Outlet /> : <Navigate to="/" />}>
                <Route index element={<ProfilePage user={user} setUser={setUser} />} />
                <Route path="list" element={<ListPage itemsProp={items} user={user} />} />
              </Route>

            </Routes>
          </main>
          <Footer />
        </div>
      </AppContext.Provider>
    </Suspense>
  );
}
