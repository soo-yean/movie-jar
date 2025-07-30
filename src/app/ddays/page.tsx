"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import type { Dday } from "@/index";

//to util.ts
function getDdaysLeft(date: string) {
  const today = new Date();
  const eventDate = new Date(date);
  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

export default function DdaysPage() {
  const [ddays, setDdays] = useState<Dday[] | null>(null);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    fetchDdays();
  }, []);

  const fetchDdays = async () => {
    isLoading(true);
    try {
      const res = await axios.get("/api/ddays");

      setDdays(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      isLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="x-4 py-8 max-w-4xl mx-auto w-full">
      <div className="w-full grid grid-cols-2 max-sm:grid-cols-1 gap-4">
        {ddays?.map((day) => (
          <div
            key={day.id}
            className="flex items-center justify-between bg-pink-100 rounded-xl p-4 pr-8 shadow-sm border border-pink-300"
          >
            <div className="flex flex-col">
              <span className="font-bold text-lg">{day.event}</span>
              <span className="text-gray-700 text-sm">
                {new Date(day.date).toLocaleDateString()}
              </span>
            </div>
            <div className="text-rose-500 font-semibold text-2xl">
              D - {getDdaysLeft(day.date)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
