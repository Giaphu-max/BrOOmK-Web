"use client"

import HeaderCompact from "@/components/broomk/header-compact"
import SearchBarCompact from "@/components/broomk/search-bar-compact"
import FilterSidebar from "@/components/broomk/filter-sidebar"
import HotelList from "@/components/broomk/hotel-list"
import Footer from "@/components/broomk/footer"
import { motion } from "framer-motion"

export default function HotelsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Background Gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <HeaderCompact />
      <SearchBarCompact />

      <main className="container mx-auto px-4 py-6 lg:py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex gap-6 lg:gap-8"
        >
          <FilterSidebar />
          <HotelList />
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
