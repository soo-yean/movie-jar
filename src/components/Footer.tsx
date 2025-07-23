"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiHeartBottle } from "react-icons/gi";
import { LuMessageSquareHeart } from "react-icons/lu";
import { PiCalendarHeartDuotone, PiListHeartBold } from "react-icons/pi";

const navItems = [
  { href: "/", icon: <GiHeartBottle className="text-xl" />, label: "Jar" },
  {
    href: "/list",
    icon: <PiListHeartBold className="text-xl" />,
    label: "List",
  },
  {
    href: "/letters",
    icon: <LuMessageSquareHeart className="text-xl" />,
    label: "Letters",
  },
  {
    href: "/calendar",
    icon: <PiCalendarHeartDuotone className="text-xl" />,
    label: "Calendar",
  },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="bg-pink-100 shadow-inner fixed bottom-0 w-full py-3 px-4 flex justify-center items-center gap-10 z-50">
      {navItems.map(({ href, icon, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center hover:scale-105 transition-all ${
              isActive ? "text-pink-700 font-bold" : "text-pink-500"
            }`}
          >
            {icon}
            <span className="text-xs mt-1">{label}</span>
          </Link>
        );
      })}
    </footer>
  );
}
