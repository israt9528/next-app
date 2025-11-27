"use client";

import { auth } from "@/app/firebase/config";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const links = [
    <Link key="home" href="/">
      Home
    </Link>,

    <Link key="allItems" href="/items">
      All Items
    </Link>,

    <Link key="add" href="/addItem">
      Add Item
    </Link>,

    <Link key="manage" href="/manage">
      Manage Items
    </Link>,
  ];

  return (
    <nav className="sticky top-0 shadow z-50 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Title */}
          <div className="flex items-center gap-2">
            <Image
              src="/next-logo.jpeg"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-xl font-bold text-yellow-400">GrabNGo</h1>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex gap-5">{links}</ul>
            {user ? (
              <span className="flex items-center gap-3">
                <div className="dropdown dropdown-start">
                  <div
                    tabIndex={0}
                    role="button"
                    className="cursor-pointer m-1"
                  >
                    {user ? (
                      <Image
                        src={user?.photoURL}
                        alt="User"
                        width={34}
                        height={34}
                        className="rounded-full"
                      />
                    ) : (
                      <FaUserCircle size={24} />
                    )}
                  </div>
                  <ul
                    tabIndex="-1"
                    className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-sm"
                  >
                    <li>
                      <p className="truncate">{user.displayName}</p>
                    </li>
                    <li>
                      <p className="truncate border-b">{user.email}</p>
                    </li>
                    <li>
                      <Link href="/addItem">Add Item</Link>
                    </li>
                    <li>
                      <Link href="/manage">Manage Items</Link>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => signOut(auth)}
                  className="btn btn-sm bg-yellow-300 text-indigo-900"
                >
                  LogOut
                </button>
              </span>
            ) : (
              <span className="flex gap-2">
                <Link href="/login">
                  <button className="btn btn-sm bg-yellow-300 text-indigo-900">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="btn btn-sm bg-yellow-300 text-indigo-900">
                    Register
                  </button>
                </Link>
              </span>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white text-black shadow-lg">
          <ul className="flex flex-col gap-3 p-4">
            {links.map((link, i) => (
              <li key={i}>{link}</li>
            ))}

            {user ? (
              <>
                <li className="flex items-center gap-2">
                  <FaUserCircle />
                  <span className="truncate">{user.email}</span>
                </li>
                <li>
                  <Link href="/addItem">Add Item</Link>
                </li>
                <li>
                  <Link href="/manage">Manage Items</Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut(auth)}
                    className="btn w-full bg-yellow-300 text-indigo-900"
                  >
                    LogOut
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login">
                    <button className="btn w-full bg-yellow-300 text-indigo-900">
                      Login
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/register">
                    <button className="btn w-full bg-yellow-300 text-indigo-900">
                      Register
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
