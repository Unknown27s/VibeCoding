"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Rocket, Users, Calendar, Zap, Trophy, QrCode, MessageSquare, BarChart3, FileText, Award } from "lucide-react";

export default function HeroSection() {
  const features = [
    { icon: Users, title: "Club Management", desc: "Manage members, roles & announcements" },
    { icon: Calendar, title: "Smart Events", desc: "Create events with auto-notifications" },
    { icon: QrCode, title: "QR Attendance", desc: "Instant check-in with QR codes" },
    { icon: Trophy, title: "Gamification", desc: "Points, badges & leaderboards" },
    { icon: MessageSquare, title: "Chat & Forums", desc: "Built-in discussion & announcements" },
    { icon: BarChart3, title: "Performance Analytics", desc: "Track participation & activity scores" },
    { icon: Award, title: "Certificates", desc: "Auto-generate participation certificates" },
    { icon: FileText, title: "Resource Sharing", desc: "Upload posters, reports & documents" },
    { icon: Zap, title: "Vibe Modes", desc: "Personalized UI themes & moods" },
  ];

  const stats = [
    { value: "50+", label: "Active Clubs" },
    { value: "200+", label: "Events/Year" },
    { value: "5,000+", label: "Students" },
    { value: "98%", label: "Satisfaction" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="animated-gradient relative min-h-screen flex items-center overflow-hidden" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Glow Orbs */}
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10" style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', padding: '6rem 2rem 4rem' }}>
          <div className="text-center max-w-3xl mx-auto" style={{ textAlign: 'center', maxWidth: '48rem', marginLeft: 'auto', marginRight: 'auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: "rgba(108, 99, 255, 0.1)",
                border: "1px solid rgba(108, 99, 255, 0.2)",
                marginBottom: '2rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                borderRadius: '9999px',
              }}
            >
              <Rocket size={14} style={{ color: "var(--accent-1)" }} />
              <span className="text-xs font-semibold" style={{ color: "var(--accent-1)", fontSize: '0.75rem', fontWeight: 600 }}>
                Smart Digital Ecosystem for Club Management
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
              style={{ fontFamily: "Outfit, sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem' }}
            >
              Manage Clubs.{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-1)", WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                Engage Students.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto"
              style={{ color: "var(--text-secondary)", fontSize: '1.125rem', marginBottom: '2.5rem', maxWidth: '42rem', marginLeft: 'auto', marginRight: 'auto' }}
            >
              A centralized, automated platform with event management, real-time notifications,
              attendance tracking, and performance analytics to improve efficiency and student engagement.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}
            >
              <Link href="/signup" className="btn-primary text-base py-3 px-8">
                Get Started <ArrowRight size={18} />
              </Link>
              <Link href="/clubs" className="btn-secondary text-base py-3 px-8">
                Browse Clubs
              </Link>
            </motion.div>
          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-3xl mx-auto"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '5rem', maxWidth: '48rem', marginLeft: 'auto', marginRight: 'auto' }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card p-5 text-center" style={{ textAlign: 'center', padding: '1.25rem' }}>
                <p
                  className="text-2xl font-bold"
                  style={{ fontFamily: "Outfit, sans-serif", color: "var(--accent-1)", fontSize: '1.5rem', fontWeight: 700 }}
                >
                  {stat.value}
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--text-secondary)", fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 relative" style={{ paddingTop: '5rem', paddingBottom: '5rem', position: 'relative' }}>
        <div className="glow-orb glow-orb-3" style={{ opacity: 0.15 }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', padding: '0 2rem' }}>
          <div className="text-center mb-14" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p className="section-title">Features</p>
            <h2 className="section-heading">Everything You Need</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-secondary)", maxWidth: '36rem', marginLeft: 'auto', marginRight: 'auto' }}>
              From club discovery to smart attendance — all in one beautiful platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card p-6 flex flex-col gap-4"
                style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--gradient-1)", width: '2.75rem', height: '2.75rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <f.icon size={20} style={{ color: 'white' }} />
                </div>
                <h3
                  className="text-base font-semibold"
                  style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)", fontSize: '1rem', fontWeight: 600 }}
                >
                  {f.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--text-secondary)", fontSize: '0.875rem' }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', padding: '0 2rem' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-10 sm:p-14 text-center relative overflow-hidden"
            style={{ textAlign: 'center', padding: '3.5rem', position: 'relative', overflow: 'hidden' }}
          >
            <div className="glow-orb glow-orb-1" style={{ opacity: 0.2, width: 250, height: 250 }} />
            <div className="glow-orb glow-orb-2" style={{ opacity: 0.2, width: 200, height: 200 }} />

            <div className="relative z-10" style={{ position: 'relative', zIndex: 10 }}>
              <h2
                className="text-3xl sm:text-4xl font-bold mb-4"
                style={{ fontFamily: "Outfit, sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, marginBottom: '1rem' }}
              >
                Ready to{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "var(--gradient-1)", WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  Transform
                </span>{" "}
                Campus Life?
              </h2>
              <p className="text-base mb-8 max-w-lg mx-auto" style={{ color: "var(--text-secondary)", fontSize: '1rem', marginBottom: '2rem', maxWidth: '32rem', marginLeft: 'auto', marginRight: 'auto' }}>
                Join thousands of students already using AstroClub to make the most of their college experience.
              </p>
              <Link href="/signup" className="btn-primary text-base py-3 px-8">
                Create Account <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
