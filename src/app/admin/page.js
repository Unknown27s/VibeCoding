"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Users, Calendar, BarChart3, Settings, Plus, Search, Trash2, Edit, Eye } from "lucide-react";
import { clubs } from "@/data/clubs";
import { events } from "@/data/events";

const users = [
  { id: 1, name: "Harish Kumar", email: "harish@college.edu", role: "Admin", clubs: 4, status: "Active" },
  { id: 2, name: "Priya Menon", email: "priya@college.edu", role: "Club Head", clubs: 2, status: "Active" },
  { id: 3, name: "Aarav Sharma", email: "aarav@college.edu", role: "Student", clubs: 3, status: "Active" },
  { id: 4, name: "Ananya Das", email: "ananya@college.edu", role: "Student", clubs: 1, status: "Active" },
  { id: 5, name: "Rohan Kapoor", email: "rohan@college.edu", role: "Club Head", clubs: 2, status: "Inactive" },
];

export default function AdminPage() {
  const [tab, setTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "clubs", label: "Clubs", icon: Users },
    { id: "events", label: "Events", icon: Calendar },
    { id: "users", label: "Users", icon: Shield },
  ];

  const stats = [
    { label: "Total Users", value: "5,247", change: "+12%", icon: Users },
    { label: "Active Clubs", value: clubs.length.toString(), change: "+2", icon: Shield },
    { label: "Events This Month", value: events.length.toString(), change: "+5", icon: Calendar },
    { label: "Avg. Attendance", value: "76%", change: "+8%", icon: BarChart3 },
  ];

  return (
    <div className="pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="section-title">Admin</p>
          <h1 className="section-heading">Admin Panel</h1>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>
            Manage clubs, events, and users from one place.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer"
              style={{
                background: tab === t.id ? "var(--accent-1)" : "var(--bg-card)",
                color: tab === t.id ? "white" : "var(--text-secondary)",
                border: `1px solid ${tab === t.id ? "var(--accent-1)" : "var(--border-color)"}`,
              }}
            >
              <t.icon size={14} /> {t.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {tab === "overview" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-1)" }}>
                      <s.icon size={18} className="text-white" />
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}>
                      {s.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>{s.value}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-6">
              <h3 className="text-base font-semibold mb-4" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>Recent Activity</h3>
              <div className="flex flex-col gap-3">
                {[
                  { text: "New club 'AI Research Group' created", time: "2 hours ago", color: "#22c55e" },
                  { text: "HackVibe 2026 event updated", time: "5 hours ago", color: "#6c63ff" },
                  { text: "3 new users registered", time: "1 day ago", color: "#f59e0b" },
                  { text: "Photography Club budget approved", time: "2 days ago", color: "#06b6d4" },
                ].map((a, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b" style={{ borderColor: "var(--border-color)" }}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: a.color }} />
                    <p className="text-sm flex-1" style={{ color: "var(--text-primary)" }}>{a.text}</p>
                    <span className="text-[11px]" style={{ color: "var(--text-secondary)" }}>{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Clubs Tab */}
        {tab === "clubs" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{clubs.length} clubs</p>
              <button className="btn-primary text-xs py-2 px-4"><Plus size={14} /> Add Club</button>
            </div>
            <div className="glass-card overflow-hidden">
              <div className="grid grid-cols-12 gap-2 px-5 py-3 border-b text-[11px] font-semibold" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
                <div className="col-span-1">Icon</div>
                <div className="col-span-3">Name</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2 text-center">Members</div>
                <div className="col-span-2 text-center">Events</div>
                <div className="col-span-2 text-center">Actions</div>
              </div>
              {clubs.map((club) => (
                <div key={club.id} className="grid grid-cols-12 gap-2 px-5 py-3 items-center border-b" style={{ borderColor: "var(--border-color)" }}>
                  <div className="col-span-1 text-lg">{club.image}</div>
                  <div className="col-span-3 text-sm font-medium" style={{ color: "var(--text-primary)" }}>{club.name}</div>
                  <div className="col-span-2"><span className="badge text-[10px]">{club.category}</span></div>
                  <div className="col-span-2 text-center text-sm" style={{ color: "var(--text-secondary)" }}>{club.memberCount}</div>
                  <div className="col-span-2 text-center text-sm" style={{ color: "var(--text-secondary)" }}>
                    {events.filter(e => e.clubId === club.id).length}
                  </div>
                  <div className="col-span-2 flex items-center justify-center gap-2">
                    <button className="p-1.5 rounded-lg cursor-pointer hover:opacity-70" style={{ color: "var(--accent-1)" }}><Eye size={14} /></button>
                    <button className="p-1.5 rounded-lg cursor-pointer hover:opacity-70" style={{ color: "var(--text-secondary)" }}><Edit size={14} /></button>
                    <button className="p-1.5 rounded-lg cursor-pointer hover:opacity-70" style={{ color: "#ef4444" }}><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Events Tab */}
        {tab === "events" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{events.length} events</p>
              <button className="btn-primary text-xs py-2 px-4"><Plus size={14} /> Create Event</button>
            </div>
            <div className="glass-card overflow-hidden">
              <div className="grid grid-cols-12 gap-2 px-5 py-3 border-b text-[11px] font-semibold" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
                <div className="col-span-4">Event</div>
                <div className="col-span-2">Club</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2 text-center">RSVPs</div>
                <div className="col-span-2 text-center">Actions</div>
              </div>
              {events.map((ev) => (
                <div key={ev.id} className="grid grid-cols-12 gap-2 px-5 py-3 items-center border-b" style={{ borderColor: "var(--border-color)" }}>
                  <div className="col-span-4 text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
                    {ev.image} {ev.title}
                  </div>
                  <div className="col-span-2 text-xs" style={{ color: "var(--accent-1)" }}>{ev.clubName}</div>
                  <div className="col-span-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                    {new Date(ev.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </div>
                  <div className="col-span-2 text-center text-sm" style={{ color: "var(--text-secondary)" }}>
                    {ev.attendees}/{ev.maxAttendees}
                  </div>
                  <div className="col-span-2 flex items-center justify-center gap-2">
                    <button className="p-1.5 rounded-lg cursor-pointer hover:opacity-70" style={{ color: "var(--accent-1)" }}><Eye size={14} /></button>
                    <button className="p-1.5 rounded-lg cursor-pointer hover:opacity-70" style={{ color: "var(--text-secondary)" }}><Edit size={14} /></button>
                    <button className="p-1.5 rounded-lg cursor-pointer hover:opacity-70" style={{ color: "#ef4444" }}><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {tab === "users" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-4">
              <div className="relative max-w-xs flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }} />
                <input type="text" placeholder="Search users..." className="glass-input pl-9 py-2 text-xs" />
              </div>
              <button className="btn-primary text-xs py-2 px-4"><Plus size={14} /> Add User</button>
            </div>
            <div className="glass-card overflow-hidden">
              <div className="grid grid-cols-12 gap-2 px-5 py-3 border-b text-[11px] font-semibold" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
                <div className="col-span-3">Name</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-2">Role</div>
                <div className="col-span-1 text-center">Clubs</div>
                <div className="col-span-1 text-center">Status</div>
                <div className="col-span-2 text-center">Actions</div>
              </div>
              {users.map((u) => (
                <div key={u.id} className="grid grid-cols-12 gap-2 px-5 py-3 items-center border-b" style={{ borderColor: "var(--border-color)" }}>
                  <div className="col-span-3 flex items-center gap-2">
                    <div className="avatar text-[10px] w-7 h-7">{u.name.split(" ").map(n => n[0]).join("")}</div>
                    <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{u.name}</span>
                  </div>
                  <div className="col-span-3 text-xs" style={{ color: "var(--text-secondary)" }}>{u.email}</div>
                  <div className="col-span-2">
                    <span className="badge text-[10px]" style={{
                      background: u.role === "Admin" ? "rgba(239,68,68,0.15)" : u.role === "Club Head" ? "rgba(245,158,11,0.15)" : "rgba(108,99,255,0.15)",
                      color: u.role === "Admin" ? "#ef4444" : u.role === "Club Head" ? "#f59e0b" : "var(--accent-1)",
                      borderColor: u.role === "Admin" ? "rgba(239,68,68,0.2)" : u.role === "Club Head" ? "rgba(245,158,11,0.2)" : "rgba(108,99,255,0.2)",
                    }}>
                      {u.role}
                    </span>
                  </div>
                  <div className="col-span-1 text-center text-sm" style={{ color: "var(--text-secondary)" }}>{u.clubs}</div>
                  <div className="col-span-1 text-center">
                    <span className="text-[10px] font-semibold" style={{ color: u.status === "Active" ? "#22c55e" : "#ef4444" }}>
                      {u.status}
                    </span>
                  </div>
                  <div className="col-span-2 flex items-center justify-center gap-2">
                    <button className="p-1.5 rounded-lg cursor-pointer hover:opacity-70" style={{ color: "var(--text-secondary)" }}><Edit size={14} /></button>
                    <button className="p-1.5 rounded-lg cursor-pointer hover:opacity-70" style={{ color: "#ef4444" }}><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
