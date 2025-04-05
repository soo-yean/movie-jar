"use client";

import { motion } from "framer-motion";

export default function TopNav() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-pink-200 text-pink-900 shadow-md py-4 px-8 rounded-b-3xl flex justify-center items-center"
    >
      <h1 className="text-2xl font-bold tracking-wide">
        Hi Adam, how do you feel today?
      </h1>
    </motion.nav>
  );
}
