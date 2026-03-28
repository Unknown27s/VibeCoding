"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, MapPin, Users, Calendar, QrCode, Check, Star, Award, MessageSquare } from "lucide-react";
import { events } from "@/data/events";
import FeedbackModal from "@/components/FeedbackModal";
import CertificatePreview from "@/components/CertificatePreview";

export default function EventDetailPage() {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);
  const [rsvp, setRsvp] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [attendanceTab, setAttendanceTab] = useState("qr");

  if (!event) {
    return (
      <div className="pt-24 pb-12 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-4xl mb-4">😕</p>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Event not found
          </h1>
          <Link href="/dashboard" className="btn-primary mt-6 inline-flex">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const dateObj = new Date(event.date);
  const formattedDate = dateObj.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const progress = Math.round((event.attendees / event.maxAttendees) * 100);

  const mockAttendees = [
    { name: "Aarav S.", status: "Present", time: "9:02 AM" },
    { name: "Priya M.", status: "Present", time: "9:05 AM" },
    { name: "Rohan K.", status: "Present", time: "9:10 AM" },
    { name: "Ananya D.", status: "Late", time: "9:25 AM" },
    { name: "Karthik R.", status: "Absent", time: "—" },
  ];

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium mb-6 hover:opacity-80 transition-opacity"
          style={{ color: "var(--text-secondary)" }}
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Event Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 glass-card p-8 relative overflow-hidden"
          >
            <div className="glow-orb glow-orb-1" style={{ opacity: 0.12, width: 200, height: 200 }} />
            <div className="relative z-10">
              {/* Event Type Badge & Club */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="badge">{event.type}</span>
                <Link
                  href={`/clubs/${event.clubId}`}
                  className="text-xs font-semibold hover:opacity-80 transition-opacity"
                  style={{ color: "var(--accent-1)" }}
                >
                  {event.clubName} →
                </Link>
              </div>

              {/* Title */}
              <h1
                className="text-3xl sm:text-4xl font-bold mb-4"
                style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
              >
                <span className="mr-3">{event.image}</span>
                {event.title}
              </h1>

              {/* Description */}
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: "var(--text-secondary)" }}
              >
                {event.description}
              </p>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                  <Calendar size={18} style={{ color: "var(--accent-1)" }} />
                  <div>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Date</p>
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      {formattedDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                  <Clock size={18} style={{ color: "var(--accent-1)" }} />
                  <div>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Time</p>
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      {event.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                  <MapPin size={18} style={{ color: "var(--accent-1)" }} />
                  <div>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Location</p>
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      {event.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                  <Users size={18} style={{ color: "var(--accent-1)" }} />
                  <div>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Spots</p>
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      {event.attendees} / {event.maxAttendees} registered
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setRsvp(!rsvp)}
                  className={rsvp ? "btn-secondary" : "btn-primary"}
                  id="rsvp-button"
                >
                  {rsvp ? (
                    <><Check size={16} /> Registered ✓</>
                  ) : (
                    "RSVP — Reserve Your Spot"
                  )}
                </button>
                <button
                  onClick={() => setShowFeedback(true)}
                  className="btn-secondary"
                >
                  <Star size={14} /> Give Feedback
                </button>
                <button
                  onClick={() => setShowCertificate(true)}
                  className="btn-secondary"
                >
                  <Award size={14} /> Get Certificate
                </button>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* QR / Attendance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="glass-card p-6"
            >
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setAttendanceTab("qr")}
                  className="flex-1 py-1.5 rounded-lg text-xs font-medium text-center cursor-pointer transition-all"
                  style={{
                    background: attendanceTab === "qr" ? "var(--accent-1)" : "var(--bg-card)",
                    color: attendanceTab === "qr" ? "white" : "var(--text-secondary)",
                  }}
                >
                  QR Check-in
                </button>
                <button
                  onClick={() => setAttendanceTab("list")}
                  className="flex-1 py-1.5 rounded-lg text-xs font-medium text-center cursor-pointer transition-all"
                  style={{
                    background: attendanceTab === "list" ? "var(--accent-1)" : "var(--bg-card)",
                    color: attendanceTab === "list" ? "white" : "var(--text-secondary)",
                  }}
                >
                  Attendance
                </button>
              </div>

              {attendanceTab === "qr" ? (
                <div className="text-center">
                  <div
                    className="w-40 h-40 mx-auto rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: "var(--bg-card)", border: "2px dashed var(--border-color)" }}
                  >
                    <div className="text-center">
                      <QrCode size={48} style={{ color: "var(--accent-1)", opacity: 0.5 }} />
                      <p className="text-[10px] mt-2" style={{ color: "var(--text-secondary)" }}>
                        Available on event day
                      </p>
                    </div>
                  </div>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    Scan at venue for instant attendance
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {mockAttendees.map((a, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b" style={{ borderColor: "var(--border-color)" }}>
                      <div className="flex items-center gap-2">
                        <div className="avatar text-[9px] w-6 h-6">{a.name.charAt(0)}</div>
                        <span className="text-xs" style={{ color: "var(--text-primary)" }}>{a.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px]" style={{ color: "var(--text-secondary)" }}>{a.time}</span>
                        <span
                          className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                          style={{
                            background: a.status === "Present" ? "rgba(34,197,94,0.15)" : a.status === "Late" ? "rgba(245,158,11,0.15)" : "rgba(239,68,68,0.15)",
                            color: a.status === "Present" ? "#22c55e" : a.status === "Late" ? "#f59e0b" : "#ef4444",
                          }}
                        >
                          {a.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Capacity Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="glass-card p-6"
            >
              <h3
                className="text-sm font-semibold mb-3"
                style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
              >
                Registration Progress
              </h3>
              <div className="w-full h-3 rounded-full overflow-hidden mb-2" style={{ background: "var(--bg-card)" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full rounded-full"
                  style={{ background: "var(--gradient-1)" }}
                />
              </div>
              <div className="flex justify-between">
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  {event.attendees} registered
                </span>
                <span className="text-xs font-semibold" style={{ color: "var(--accent-1)" }}>
                  {progress}%
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showFeedback && <FeedbackModal event={event} onClose={() => setShowFeedback(false)} />}
      {showCertificate && <CertificatePreview event={event} onClose={() => setShowCertificate(false)} />}
    </div>
  );
}
