"use client";

import Link from "next/link";
import { FaJar } from "react-icons/fa6";
import { PiListBulletsFill } from "react-icons/pi";

export default function Footer() {
  return (
    <footer className="bg-pink-100 text-pink-700 shadow-inner fixed bottom-0 w-full py-3 px-4 flex justify-center items-center gap-10 z-50">
      <Link
        href="/"
        className="flex flex-col items-center hover:scale-105 transition-all"
      >
        <FaJar className="text-xl" />
        <span className="text-xs mt-1">Jar</span>
      </Link>

      <Link
        href="/list"
        className="flex flex-col items-center hover:scale-105 transition-all"
      >
        <PiListBulletsFill className="text-xl" />
        <span className="text-xs mt-1">List</span>
      </Link>
    </footer>
  );
}
