"use client";
import { motion } from "framer-motion";
import { Trophy, Medal, Flame, Star, TrendingUp, Award } from "lucide-react";

const leaderboard = [
  { rank: 1, name: "Priya Menon", avatar: "PM", points: 980, events: 28, streak: 15, badge: "🏆" },
  { rank: 2, name: "Aarav Sharma", avatar: "AS", points: 875, events: 24, streak: 12, badge: "🥈" },
  { rank: 3, name: "Rohan Kapoor", avatar: "RK", points: 790, events: 22, streak: 10, badge: "🥉" },
  { rank: 4, name: "Harish Kumar", avatar: "HK", points: 720, events: 19, streak: 7, badge: "⭐", isYou: true },
  { rank: 5, name: "Ananya Das", avatar: "AD", points: 680, events: 18, streak: 9, badge: "⭐" },
  { rank: 6, name: "Karthik R.", avatar: "KR", points: 640, events: 17, streak: 6, badge: "" },
  { rank: 7, name: "Sneha Patel", avatar: "SP", points: 590, events: 15, streak: 5, badge: "" },
  { rank: 8, name: "Vikram Joshi", avatar: "VJ", points: 540, events: 14, streak: 4, badge: "" },
  { rank: 9, name: "Meera Trivedi", avatar: "MT", points: 480, events: 12, streak: 3, badge: "" },
  { rank: 10, name: "Arjun Bhat", avatar: "AB", points: 420, events: 10, streak: 2, badge: "" },
];

const badges = [
  { name: "Rising Star", icon: "🌟", desc: "Attended 10+ events", earned: true },
  { name: "Social Butterfly", icon: "🦋", desc: "Joined 5+ clubs", earned: true },
  { name: "Streak Master", icon: "🔥", desc: "7-day streak", earned: true },
  { name: "Event Organizer", icon: "📋", desc: "Organized an event", earned: false },
  { name: "Top Contributor", icon: "💎", desc: "Top 3 in leaderboard", earned: false },
  { name: "Pioneer", icon: "🚀", desc: "First to join a new club", earned: true },
];

export default function LeaderboardPage() {
  return (
    <div className="pt-32 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="section-title">Performance</p>
          <h1 className="section-heading">Leaderboard & Achievements</h1>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>
            Track your participation and climb the ranks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leaderboard Table */}
          <div className="lg:col-span-2">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
              <TrendingUp size={18} style={{ color: "var(--accent-1)" }} /> Top Performers
            </h2>

            <div className="glass-card overflow-hidden">
              {/* Header Row */}
              <div className="grid grid-cols-12 gap-2 px-5 py-3 border-b text-[11px] font-semibold" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
                <div className="col-span-1">#</div>
                <div className="col-span-5">Student</div>
                <div className="col-span-2 text-center">Points</div>
                <div className="col-span-2 text-center">Events</div>
                <div className="col-span-2 text-center">Streak</div>
              </div>

              {/* Rows */}
              {leaderboard.map((row, i) => (
                <motion.div
                  key={row.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="grid grid-cols-12 gap-2 px-5 py-3 items-center border-b transition-colors"
                  style={{
                    borderColor: "var(--border-color)",
                    background: row.isYou ? "rgba(108, 99, 255, 0.08)" : "transparent",
                  }}
                >
                  <div className="col-span-1">
                    <span className="text-sm font-bold" style={{ color: row.rank <= 3 ? "var(--accent-1)" : "var(--text-secondary)" }}>
                      {row.badge || row.rank}
                    </span>
                  </div>
                  <div className="col-span-5 flex items-center gap-2">
                    <div className="avatar text-[10px] w-7 h-7">{row.avatar}</div>
                    <div>
                      <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                        {row.name}
                      </span>
                      {row.isYou && (
                        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: "var(--accent-1)", color: "white" }}>
                          YOU
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2 text-center text-sm font-semibold" style={{ color: "var(--accent-1)" }}>
                    {row.points}
                  </div>
                  <div className="col-span-2 text-center text-sm" style={{ color: "var(--text-secondary)" }}>
                    {row.events}
                  </div>
                  <div className="col-span-2 text-center text-sm flex items-center justify-center gap-1" style={{ color: "var(--text-secondary)" }}>
                    <Flame size={12} style={{ color: "#f59e0b" }} /> {row.streak}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div>
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
              <Award size={18} style={{ color: "var(--accent-1)" }} /> Your Badges
            </h2>
            <div className="flex flex-col gap-3">
              {badges.map((badge, i) => (
                <motion.div
                  key={badge.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card p-4 flex items-center gap-3"
                  style={{ opacity: badge.earned ? 1 : 0.4 }}
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{badge.name}</p>
                    <p className="text-[11px]" style={{ color: "var(--text-secondary)" }}>{badge.desc}</p>
                  </div>
                  {badge.earned && <Star size={14} fill="var(--accent-1)" style={{ color: "var(--accent-1)" }} />}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
