// File provides Footer and Navbar components

import { Link, NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { useApp } from "@/context/AppContext";

import { FaUser, FaCaretDown } from 'react-icons/fa'

import { signOut } from "firebase/auth"

export function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-12">
            <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">

                {/* App Name / Branding */}
                <div className="mb-4 sm:mb-0">
                    <span className="text-gray-200 font-semibold">YourApp</span> © {new Date().getFullYear()}
                </div>

                {/* Legal Links */}
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        to="/legal/privacy"
                        className="hover:text-blue-400 transition-colors duration-200"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        to="/legal/terms"
                        className="hover:text-blue-400 transition-colors duration-200"
                    >
                        Terms of Service
                    </Link>
                    <Link
                        to="/legal/cookies"
                        className="hover:text-blue-400 transition-colors duration-200"
                    >
                        Cookie Policy
                    </Link>
                    <Link
                        to="/contact"
                        className="hover:text-blue-400 transition-colors duration-200"
                    >
                        Contact
                    </Link>
                    <Link
                        to="/legal/data-request"
                        className="hover:text-blue-400 transition-colors duration-200"
                    >
                        Data Request
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export function Navbar() {
    // Navbar UI component
    const navigate = useNavigate();

    const { user, auth } = useApp()

    const [open, setOpen] = useState(false);

    const [userOpen, setUserOpen] = useState(false);

    const navItems = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
    ];

    const userNavItems = [
        { name: "Items", path: "/items" },
        { name: "List", path: "/user/list" },
    ];


    return (
        <nav className="bg-gray-800 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="text-2xl font-bold text-blue-400">
                        Torn-Trade
                    </Link>



                    {/* Desktop menu */}
                    <div className="hidden md:flex space-x-6">
                        {!user && navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `text-gray-300 flex items-center hover:text-blue-400 ${isActive ? "text-blue-400 font-semibold" : ""
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                        {user && userNavItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `text-gray-300 flex items-center hover:text-blue-400 ${isActive ? "text-blue-400 font-semibold" : ""
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}

                        <div className="flex items-center pr-2">
                            {user ? (
                                <>
                                    <div className="relative">
                                        <button
                                            onClick={() => setUserOpen(!userOpen)}
                                            className="flex items-center space-x-1 text-white hover:text-yellow-300 transition duration-300 ease-in-out"
                                            aria-haspopup="true"
                                            aria-expanded={userOpen}
                                        >
                                            <FaUser />
                                            <span>{user.displayName || "Account"}</span>
                                            <FaCaretDown />
                                        </button>
                                        {userOpen && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                                <Link
                                                    onClick={() => setUserOpen(false)}
                                                    to="/user"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left "
                                                >
                                                    Profile
                                                </Link>
                                                <button
                                                    onClick={() => signOut(auth)}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => { navigate("/login") }}
                                        className="bg-white cursor-pointer text-blue-500 px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                    >
                                        Sign In
                                    </button>
                                </>
                            )}
                        </div>
                    </div>


                    {/* Mobile menu  */}

                    <div className="md:hidden flex">
                        <div className="flex items-center pr-4">
                            {user ? (
                                <>
                                    <div className="relative">
                                        <button
                                            onClick={() => setUserOpen(!userOpen)}
                                            className="flex items-center space-x-1 text-white hover:text-yellow-300 transition duration-300 ease-in-out"
                                            aria-haspopup="true"
                                            aria-expanded={userOpen}
                                        >
                                            <FaUser />
                                            <span>{user.displayName || "Account"}</span>
                                            <FaCaretDown />
                                        </button>
                                        {userOpen && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                                <Link
                                                    onClick={() => setUserOpen(false)}
                                                    to="/user"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left "
                                                >
                                                    Profile
                                                </Link>
                                                <button
                                                    onClick={() => signOut(auth)}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => { navigate("/login") }}
                                        className="bg-white cursor-pointer text-blue-500 px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                    >
                                        Sign In
                                    </button>
                                </>
                            )}
                        </div>
                        {/* Mobile menu button */}

                        <button
                            className=" cursor-pointer text-gray-300 hover:text-white"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                </div>

                {/* Mobile menu */}
                {open && (
                    <div className="md:hidden pb-3 space-y-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `block px-3 py-2 rounded-md ${isActive ? "bg-blue-500 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                        {user && userNavItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `block px-3 py-2 rounded-md ${isActive ? "bg-blue-500 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
