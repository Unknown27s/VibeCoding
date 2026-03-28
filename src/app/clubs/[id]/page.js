"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Calendar, Bell, Megaphone, MessageSquare, UserPlus, UserMinus, Shield, Crown } from "lucide-react";
import EventCard from "@/components/EventCard";
import { clubs } from "@/data/clubs";
import { events } from "@/data/events";

const mockMembers = [
  { name: "Aarav S.", role: "Admin", avatar: "AS", joined: "Jan 2025" },
  { name: "Priya M.", role: "Co-Lead", avatar: "PM", joined: "Feb 2025" },
  { name: "Rohan K.", role: "Volunteer", avatar: "RK", joined: "Mar 2025" },
  { name: "Ananya D.", role: "Member", avatar: "AD", joined: "Apr 2025" },
  { name: "Karthik R.", role: "Member", avatar: "KR", joined: "May 2025" },
  { name: "Sneha P.", role: "Member", avatar: "SP", joined: "Jun 2025" },
];

const roleColors = {
  Admin: { bg: "rgba(239,68,68,0.15)", color: "#ef4444", icon: Crown },
  "Co-Lead": { bg: "rgba(245,158,11,0.15)", color: "#f59e0b", icon: Shield },
  Volunteer: { bg: "rgba(34,197,94,0.15)", color: "#22c55e", icon: Shield },
  Member: { bg: "rgba(108,99,255,0.15)", color: "var(--accent-1)", icon: Users },
};

export default function ClubDetailPage() {
  const { id } = useParams();
  const club = clubs.find((c) => c.id === id);
  const [activeTab, setActiveTab] = useState("events");

  if (!club) {
    return (
      <div className="pt-24 pb-12 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-4xl mb-4">😕</p>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Club not found
          </h1>
          <Link href="/clubs" className="btn-primary mt-6 inline-flex">
            ← Back to Clubs
          </Link>
        </div>
      </div>
    );
  }

  const clubEvents = events.filter((e) => e.clubId === club.id);

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/clubs"
          className="inline-flex items-center gap-2 text-sm font-medium mb-6 hover:opacity-80 transition-opacity"
          style={{ color: "var(--text-secondary)" }}
        >
          <ArrowLeft size={16} /> Back to Clubs
        </Link>

        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 sm:p-10 mb-8 relative overflow-hidden"
        >
          <div
            className="glow-orb"
            style={{ width: 250, height: 250, background: club.color, opacity: 0.15, top: -50, right: -50 }}
          />
          <div className="relative z-10">
            <div className="flex items-start gap-5 mb-6">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
                style={{ background: `${club.color}15`, border: `2px solid ${club.color}30` }}
              >
                {club.image}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h1
                    className="text-2xl sm:text-3xl font-bold"
                    style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
                  >
                    {club.name}
                  </h1>
                  <span className="badge">{club.category}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {club.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
                <Users size={16} />
                <span className="text-sm font-medium">{club.memberCount} Members</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
                <Calendar size={16} />
                <span className="text-sm font-medium">{clubEvents.length} Events</span>
              </div>
              <div className="ml-auto flex gap-2">
                <Link href={`/clubs/${id}/chat`} className="btn-secondary text-sm py-2 px-4">
                  <MessageSquare size={14} /> Chat
                </Link>
                <button className="btn-primary text-sm py-2 px-6">
                  Join Club
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {["events", "members", "announcements"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer capitalize"
              style={{
                background: activeTab === tab ? "var(--accent-1)" : "var(--bg-card)",
                color: activeTab === tab ? "white" : "var(--text-secondary)",
                border: `1px solid ${activeTab === tab ? "var(--accent-1)" : "var(--border-color)"}`,
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Events Tab */}
        {activeTab === "events" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {clubEvents.length > 0 ? (
              <div className="flex flex-col gap-3">
                {clubEvents.map((event, i) => (
                  <EventCard key={event.id} event={event} index={i} />
                ))}
              </div>
            ) : (
              <div className="glass-card p-8 text-center">
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>No upcoming events</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Members Tab */}
        {activeTab === "members" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{mockMembers.length} members</p>
              <button className="btn-primary text-xs py-2 px-4"><UserPlus size={14} /> Add Member</button>
            </div>
            <div className="glass-card overflow-hidden">
              {mockMembers.map((member, i) => {
                const rc = roleColors[member.role] || roleColors.Member;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 px-5 py-3.5 border-b"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <div className="avatar text-xs">{member.avatar}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{member.name}</p>
                      <p className="text-[11px]" style={{ color: "var(--text-secondary)" }}>Joined {member.joined}</p>
                    </div>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1"
                      style={{ background: rc.bg, color: rc.color, border: `1px solid ${rc.color}20` }}
                    >
                      <rc.icon size={10} /> {member.role}
                    </span>
                    {member.role === "Member" && (
                      <button className="p-1.5 rounded-lg cursor-pointer hover:opacity-70" style={{ color: "#ef4444" }}>
                        <UserMinus size={14} />
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Announcements Tab */}
        {activeTab === "announcements" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3">
            {club.announcements.map((ann, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5 flex items-start gap-3"
              >
                <Bell size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--accent-1)" }} />
                <div className="flex-1">
                  <p className="text-sm" style={{ color: "var(--text-primary)" }}>{ann}</p>
                  <p className="text-[11px] mt-1" style={{ color: "var(--text-secondary)", opacity: 0.7 }}>
                    {i === 0 ? "Today" : `${i + 1} days ago`}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
