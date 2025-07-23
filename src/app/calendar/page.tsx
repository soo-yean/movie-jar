"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { useState, useEffect } from "react";
import AddEventForm from "./AddEventForm";
import "./calendar.css";
import Loading from "@/components/Loading";
import type { Event } from "@/index";

const FullCalendar = dynamic(() => import("@fullcalendar/react"), {
  ssr: false,
});

export default function CalendarPage() {
  const [showModal, setShowModal] = useState(false);
  const [loading, isLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [calendarView, setCalendarView] = useState<
    "dayGridMonth" | "listWeek" | null
  >(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setCalendarView(isMobile ? "listWeek" : "dayGridMonth");

    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    isLoading(true);
    try {
      const res = await axios.get("/api/calendar");

      setEvents(
        res.data.map((e: Event) => {
          return { ...e, title: `\u00A0 ${e.emoji}\u00A0 ${e.title}` };
        })
      );
    } catch (err) {
      console.error(err);
    } finally {
      isLoading(false);
    }
  };

  const onSuccess = async () => {
    setShowModal(false);
    fetchEvents();
  };

  if (!calendarView) return null; //until it decides the calendar view
  if (loading) return <Loading />;

  return (
    <div className="relative p-4 text-center">
      <button
        onClick={() => setShowModal(true)}
        className="bg-pink-300 hover:enabled:bg-pink-400 text-white font-bold py-2 px-4 rounded-lg transition-transform duration-200 hover:enabled:scale-105 cursor-pointer"
      >
        Add Event
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-pink-100/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-pink-50 rounded-lg shadow-lg p-6 w-11/12 max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-xl cursor-pointer"
            >
              x
            </button>
            <AddEventForm onSuccess={() => onSuccess()} />
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
          displayEventTime={true}
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
