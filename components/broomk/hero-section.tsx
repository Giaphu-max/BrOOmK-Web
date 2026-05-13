"use client"


import { useState } from "react"
import { motion } from "framer-motion"
import {
  Hotel,
  Plane,
  Bus,
  MapPin,
  Calendar,
  Users,
  Search,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const tabs = [
  { id: "hotel", label: "Khách sạn", icon: Hotel },
  { id: "flight", label: "Máy bay", icon: Plane },
  { id: "bus", label: "Xe khách", icon: Bus },
  { id: "tour", label: "Tour du lịch", icon: MapPin },
]

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("hotel")

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-overlay via-overlay/60 to-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-12 lg:pt-32 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 lg:mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 lg:mb-6 text-balance">
            Khám phá{" "}
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Việt Nam
            </span>
            <br />
            theo cách của bạn
          </h1>
          <p className="text-lg lg:text-xl text-white/80 max-w-2xl mx-auto text-pretty">
            Đặt phòng khách sạn, vé máy bay, xe khách và tour du lịch chỉ với vài cú click.
            Trải nghiệm không giới hạn!
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-strong rounded-2xl lg:rounded-3xl p-4 lg:p-6 shadow-2xl">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 relative">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </span>
                  </motion.button>
                )
              })}
            </div>

            {/* Search Fields */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {activeTab === "hotel" && (
                <>
                  <SearchField icon={MapPin} label="Điểm đến" placeholder="Bạn muốn đi đâu?" />
                  <SearchField icon={Calendar} label="Nhận phòng" placeholder="Chọn ngày" type="date" />
                  <SearchField icon={Calendar} label="Trả phòng" placeholder="Chọn ngày" type="date" />
                  <SearchField icon={Users} label="Số khách" placeholder="2 người lớn" />
                </>
              )}

              {activeTab === "flight" && (
                <>
                  <SearchField icon={Plane} label="Điểm đi" placeholder="Hà Nội (HAN)" />
                  <SearchField icon={MapPin} label="Điểm đến" placeholder="TP.HCM (SGN)" />
                  <SearchField icon={Calendar} label="Ngày bay" placeholder="Chọn ngày" type="date" />
                  <SearchField icon={Users} label="Hành khách" placeholder="1 người lớn" />
                </>
              )}

              {activeTab === "bus" && (
                <>
                  <SearchField icon={Bus} label="Điểm đi" placeholder="Bến xe Mỹ Đình" />
                  <SearchField icon={MapPin} label="Điểm đến" placeholder="Bến xe Đà Nẵng" />
                  <SearchField icon={Calendar} label="Ngày đi" placeholder="Chọn ngày" type="date" />
                  <SearchField icon={Users} label="Số ghế" placeholder="1 ghế" />
                </>
              )}

              {activeTab === "tour" && (
                <>
                  <SearchField icon={MapPin} label="Tour đến" placeholder="Phú Quốc, Đà Nẵng..." />
                  <SearchField icon={Calendar} label="Ngày khởi hành" placeholder="Chọn ngày" type="date" />
                  <SearchField icon={Calendar} label="Thời gian" placeholder="3N2Đ" />
                  <SearchField icon={Users} label="Số người" placeholder="2 người" />
                </>
              )}
            </motion.div>

            {/* Search Button */}
            <div className="mt-6 flex justify-center">
              {/*<Link href="/hotels">*/}
              <Link
                href={
                  {
                    hotel: "/hotels",
                    flight: "/flights",
                    bus: "/bus",
                    tour: "/tours"
                  }[activeTab] || "#"
                }
              >

                <Button
                  size="lg"
                  className="w-full md:w-auto px-8 h-14 text-base bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/30"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Tìm kiếm
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto"
        >
          {[
            { value: "500+", label: "Khách sạn" },
            { value: "50+", label: "Điểm đến" },
            { value: "10K+", label: "Khách hàng" },
            { value: "4.9", label: "Đánh giá" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl lg:text-4xl font-bold text-white">{stat.value}</div>
              <div className="text-sm lg:text-base text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-3 bg-white/70 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

function SearchField({
  icon: Icon,
  label,
  placeholder,
  type = "text",
}: {
  icon: React.ElementType
  label: string
  placeholder: string
  type?: string
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
        <Input
          type={type}
          placeholder={placeholder}
          className="pl-10 h-12 bg-muted/50 border-border/50 focus:border-primary"
        />
      </div>
    </div>
  )
}
