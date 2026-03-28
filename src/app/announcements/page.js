"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Megaphone, Bell, Filter } from "lucide-react";
import { clubs } from "@/data/clubs";

const allAnnouncements = clubs.flatMap((club) =>
  club.announcements.map((text, i) => ({
    id: `${club.id}-${i}`,
    club: club.name,
    clubImage: club.image,
    clubColor: club.color,
    text,
    date: i === 0 ? "Today" : "2 days ago",
    pinned: i === 0,
  }))
);

export default function AnnouncementsPage() {
  const [filter, setFilter] = useState("All");
  const clubNames = ["All", ...clubs.map((c) => c.name)];

  const filtered = filter === "All"
    ? allAnnouncements
    : allAnnouncements.filter((a) => a.club === filter);

  return (
    <div className="pt-32 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="section-title">Updates</p>
          <h1 className="section-heading">Announcement Board</h1>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>
            All updates from your clubs in one place. No more missed messages.
          </p>
        </motion.div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap mb-6">
          <Filter size={16} className="mt-2" style={{ color: "var(--text-secondary)" }} />
          {clubNames.map((name) => (
            <button
              key={name}
              onClick={() => setFilter(name)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer"
              style={{
                background: filter === name ? "var(--accent-1)" : "var(--bg-card)",
                color: filter === name ? "white" : "var(--text-secondary)",
                border: `1px solid ${filter === name ? "var(--accent-1)" : "var(--border-color)"}`,
              }}
            >
              {name}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex flex-col gap-3">
          {filtered.map((ann, i) => (
            <motion.div
              key={ann.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-5 flex items-start gap-4"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: `${ann.clubColor}15`, border: `1px solid ${ann.clubColor}30` }}
              >
                {ann.clubImage}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold" style={{ color: "var(--accent-1)" }}>
                    {ann.club}
                  </span>
                  {ann.pinned && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>
                      📌 Pinned
                    </span>
                  )}
                </div>
                <p className="text-sm" style={{ color: "var(--text-primary)" }}>{ann.text}</p>
                <p className="text-[11px] mt-1" style={{ color: "var(--text-secondary)", opacity: 0.7 }}>
                  {ann.date}
                </p>
              </div>
              <Bell size={14} className="mt-1 flex-shrink-0" style={{ color: "var(--text-secondary)", opacity: 0.5 }} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
