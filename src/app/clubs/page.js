"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import ClubCard from "@/components/ClubCard";
import { clubs, categories } from "@/data/clubs";

export default function ClubsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = clubs.filter((club) => {
    const matchSearch =
      club.name.toLowerCase().includes(search.toLowerCase()) ||
      club.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || club.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="section-title">Explore</p>
          <h1 className="section-heading">Discover Clubs</h1>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>
            Find your community. Join clubs that match your passion.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-secondary)" }}
            />
            <input
              type="text"
              placeholder="Search clubs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="glass-input pl-11"
              id="search-clubs"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer"
                style={{
                  background: category === cat ? "var(--accent-1)" : "var(--bg-card)",
                  color: category === cat ? "white" : "var(--text-secondary)",
                  border: `1px solid ${category === cat ? "var(--accent-1)" : "var(--border-color)"}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Clubs Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((club, i) => (
              <ClubCard key={club.id} club={club} index={i} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
              No clubs found
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              Try adjusting your search or filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
