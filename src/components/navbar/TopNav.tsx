"use client";

// import Link from "next/link";
import { motion } from "framer-motion";

export default function TopNav() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-pink-200 text-pink-900 shadow-md py-4 px-8 rounded-b-3xl flex justify-center items-center"
    >
      {/* <Link
        href="/list"
        className="text-2xl font-bold tracking-wide text-pink-700 hover:underline"
      >
        Hey Click ME!
      </Link> */}
      <h1 className="text-2xl font-bold tracking-wide">
        Love you babe&#128151;
      </h1>
    </motion.nav>
  );
}
