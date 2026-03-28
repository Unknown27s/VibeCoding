"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import Link from "next/link";
import { events } from "@/data/events";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarPage() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(2); // March = 2 (0-indexed)

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prev = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  };
  const next = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  };

  // Events for current month
  const monthEvents = events.filter((e) => {
    const d = new Date(e.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });

  const getEventsForDay = (day) => {
    return monthEvents.filter((e) => new Date(e.date).getDate() === day);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const today = new Date();
  const isToday = (day) => day && today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;

  return (
    <div className="pt-32 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="section-title">Schedule</p>
          <h1 className="section-heading">Event Calendar</h1>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>
            View all upcoming events. Avoid clashes between clubs.
          </p>
        </motion.div>

        {/* Month Nav */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={prev} className="btn-secondary py-2 px-3 cursor-pointer"><ChevronLeft size={18} /></button>
          <h2 className="text-xl font-bold" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
            {MONTHS[month]} {year}
          </h2>
          <button onClick={next} className="btn-secondary py-2 px-3 cursor-pointer"><ChevronRight size={18} /></button>
        </div>

        {/* Calendar Grid */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-4 sm:p-6 overflow-hidden">
          {/* Day Headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-xs font-semibold py-2" style={{ color: "var(--text-secondary)" }}>
                {d}
              </div>
            ))}
          </div>

          {/* Cells */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              const dayEvents = day ? getEventsForDay(day) : [];
              return (
                <div
                  key={i}
                  className="min-h-[80px] sm:min-h-[100px] p-1.5 rounded-xl transition-colors"
                  style={{
                    background: isToday(day) ? "rgba(108, 99, 255, 0.1)" : day ? "var(--bg-card)" : "transparent",
                    border: isToday(day) ? "1px solid var(--accent-1)" : day ? "1px solid var(--border-color)" : "none",
                  }}
                >
                  {day && (
                    <>
                      <p
                        className="text-xs font-semibold mb-1"
                        style={{ color: isToday(day) ? "var(--accent-1)" : "var(--text-primary)" }}
                      >
                        {day}
                      </p>
                      {dayEvents.map((ev) => (
                        <Link key={ev.id} href={`/events/${ev.id}`}>
                          <div
                            className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-md mb-0.5 truncate font-medium cursor-pointer hover:opacity-80"
                            style={{ background: "var(--gradient-1)", color: "white" }}
                          >
                            {ev.image} {ev.title}
                          </div>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Month Events Summary */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Calendar size={16} style={{ color: "var(--accent-1)" }} />
            {monthEvents.length} events in {MONTHS[month]}
          </h3>
          <div className="flex flex-wrap gap-2">
            {monthEvents.map((ev) => (
              <Link key={ev.id} href={`/events/${ev.id}`} className="badge text-xs hover:opacity-80 transition-opacity">
                {ev.image} {ev.title} — {new Date(ev.date).getDate()} {MONTHS[month].slice(0, 3)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
