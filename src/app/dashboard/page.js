"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Users, Trophy, Zap, Flame, Star, Megaphone, BarChart3, CalendarDays, Shield } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import EventCard from "@/components/EventCard";
import ClubCard from "@/components/ClubCard";
import { clubs } from "@/data/clubs";
import { events } from "@/data/events";

export default function DashboardPage() {
  const upcomingEvents = events
    .filter((e) => new Date(e.date) >= new Date("2026-03-28"))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 4);

  const recommendedClubs = clubs.slice(0, 3);

  const stats = [
    { icon: Calendar, label: "Events Attended", value: "12" },
    { icon: Users, label: "Clubs Joined", value: "4" },
    { icon: Trophy, label: "Points Earned", value: "340" },
    { icon: Flame, label: "Day Streak", value: "7" },
  ];

  return (
    <div className="pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 sm:p-8 mb-8 relative overflow-hidden"
        >
          <div className="glow-orb glow-orb-1" style={{ opacity: 0.15, width: 200, height: 200 }} />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star size={18} style={{ color: "var(--accent-1)" }} />
                <span className="text-xs font-semibold" style={{ color: "var(--accent-1)" }}>
                  Good Morning!
                </span>
              </div>
              <h1
                className="text-2xl sm:text-3xl font-bold"
                style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
              >
                Welcome back, Harish 👋
              </h1>
              <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                You have 3 upcoming events this week. Keep the vibe going!
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="px-4 py-2 rounded-xl flex items-center gap-2"
                style={{ background: "var(--gradient-1)" }}
              >
                <Zap size={16} className="text-white" />
                <span className="text-sm font-semibold text-white">Level 5</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <StatsCard key={stat.label} {...stat} index={i} />
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { href: "/announcements", icon: Megaphone, label: "Announcements", color: "#f59e0b" },
            { href: "/calendar", icon: CalendarDays, label: "Calendar", color: "#06b6d4" },
            { href: "/leaderboard", icon: BarChart3, label: "Leaderboard", color: "#22c55e" },
            { href: "/admin", icon: Shield, label: "Admin Panel", color: "#ef4444" },
          ].map((link, i) => (
            <motion.div key={link.href} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.08 }}>
              <Link href={link.href} className="glass-card p-4 flex items-center gap-3 cursor-pointer group block">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${link.color}20` }}>
                  <link.icon size={18} style={{ color: link.color }} />
                </div>
                <span className="text-sm font-medium group-hover:opacity-80 transition-opacity" style={{ color: "var(--text-primary)" }}>
                  {link.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Events */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h2
                className="text-lg font-semibold"
                style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
              >
                Upcoming Events
              </h2>
              <a
                href="/clubs"
                className="text-xs font-medium"
                style={{ color: "var(--accent-1)" }}
              >
                View All →
              </a>
            </div>
            <div className="flex flex-col gap-3">
              {upcomingEvents.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          </div>

          {/* Recommended Clubs */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2
                className="text-lg font-semibold"
                style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
              >
                Recommended Clubs
              </h2>
              <a
                href="/clubs"
                className="text-xs font-medium"
                style={{ color: "var(--accent-1)" }}
              >
                See All →
              </a>
            </div>
            <div className="flex flex-col gap-4">
              {recommendedClubs.map((club, i) => (
                <ClubCard key={club.id} club={club} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
