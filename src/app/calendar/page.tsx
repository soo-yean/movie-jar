"use client";

import dynamic from "next/dynamic";
// import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { useState, useEffect } from "react";
import AddEventForm from "./AddEventForm";
import "./calendar.css";
import Loading from "@/components/Loading";

const FullCalendar = dynamic(() => import("@fullcalendar/react"), {
  ssr: false,
});

type Event = {
  title: string;
  date: string;
  label: string;
};

export default function CalendarPage() {
  const [showModal, setShowModal] = useState(false);
  const [loading, isLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [calendarView, setCalendarView] = useState<
    "dayGridMonth" | "listWeek" | null
  >(null);

  useEffect(() => {
    isLoading(true);

    const isMobile = window.innerWidth < 768;
    setCalendarView(isMobile ? "listWeek" : "dayGridMonth");

    setEvents([
      { title: "Visa 💕", date: "2025-07-03", label: "S" },
      { title: "Company Visit 🤝", date: "2025-07-01", label: "A" },
      { title: "Germany 🇩🇪", date: "2025-08-01", label: "S" },
    ]);

    isLoading(false);
  }, []);

  if (!calendarView) return null; //until it decides the calendar view
  if (loading) return <Loading />;

  return (
    <div className="relative p-4 text-center">
      <button
        disabled
        onClick={() => setShowModal(true)}
        className="bg-pink-300 hover:enabled:bg-pink-400 text-white font-bold py-2 px-4 rounded-lg transition-transform duration-200 hover:enabled:scale-105 cursor-pointer"
      >
        Add Event
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-pink-100/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-xl"
            >
              x
            </button>
            <AddEventForm onSuccess={() => setShowModal(false)} />
          </div>
        </div>
      )}

      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, listPlugin]}
          initialView={calendarView}
          views={{
            listWeek: {
              buttonText: "List",
            },
          }}
          headerToolbar={{
            left: "dayGridMonth,listWeek",
            center: "title",
            right: "prev,next,today",
          }}
          events={events}
          displayEventTime={true} // ✅ ensure this is enabled (default is true)
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            meridiem: false, // set to true for AM/PM style
            hour12: false, // use 24-hour format
          }}
          eventClassNames={(arg) => {
            const label = arg.event.extendedProps.label;
            if (label === "T") return ["event-together"];
            if (label === "S") return ["event-soo"];
            if (label === "A") return ["event-adam"];
            return [];
          }}
          height="auto"
        />
      </div>
    </div>
  );
}
