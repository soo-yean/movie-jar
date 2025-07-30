"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function TopNav() {
  const pathname = usePathname();

  let message = "Love you babe💗";

  if (pathname === "/list") {
    message = "Our List💗";
  } else if (pathname.startsWith("/calendar")) {
    message = "Our Calendar📅";
  } else if (pathname.startsWith("/letter")) {
    message = "Letter box📮";
  } else if (pathname.startsWith("/ddays")) {
    message = "D-Days🎉";
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-pink-200 text-pink-900 shadow-md py-4 px-8 rounded-b-3xl flex justify-center items-center"
    >
      <h1 className="text-2xl font-bold tracking-wide transition-all duration-300 ease-in-out">
        {message}
      </h1>
    </motion.nav>
  );
}
