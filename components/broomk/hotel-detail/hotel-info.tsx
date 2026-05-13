"use client"

import { motion } from "framer-motion"
import {
  Star,
  MapPin,
  Waves,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Sparkles,
  Coffee,
  Wind,
  Tv,
  ShieldCheck,
} from "lucide-react"

const amenities = [
  { icon: Waves, label: "Hồ bơi vô cực", highlight: true },
  { icon: Sparkles, label: "Spa & Massage", highlight: true },
  { icon: Coffee, label: "Bữa sáng miễn phí", highlight: true },
  { icon: Wifi, label: "Wi-Fi miễn phí" },
  { icon: Car, label: "Bãi đỗ xe" },
  { icon: Utensils, label: "Nhà hàng" },
  { icon: Dumbbell, label: "Phòng gym" },
  { icon: Wind, label: "Điều hòa" },
  { icon: Tv, label: "Smart TV" },
  { icon: ShieldCheck, label: "An ninh 24/7" },
]

export default function HotelInfo() {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Hotel Title & Rating */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-accent text-accent" />
            ))}
          </div>
          <span className="text-sm text-muted-foreground font-medium">Resort 5 sao</span>
        </div>
        
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3 leading-tight">
          The Anam Cam Ranh Resort
        </h1>
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm">Long Beach, Cam Ranh, Khánh Hòa, Việt Nam</span>
          <a href="#" className="text-primary text-sm font-medium hover:underline ml-2">
            Xem bản đồ
          </a>
        </div>

        {/* Rating Badge */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
            <span className="text-primary font-bold">9.4</span>
            <span className="text-sm text-primary font-medium">Tuyệt vời</span>
          </div>
          <span className="text-sm text-muted-foreground">1,247 đánh giá</span>
        </div>
      </div>

      {/* Amenities Section */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Tiện ích nổi bật</h2>
        <div className="flex flex-wrap gap-2">
          {amenities.map((amenity, index) => {
            const Icon = amenity.icon
            return (
              <motion.div
                key={amenity.label}
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  amenity.highlight
                    ? "bg-gradient-to-r from-primary/15 to-accent/15 border border-primary/30"
                    : "glass border-glass-border"
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <Icon
                  className={`w-4 h-4 ${
                    amenity.highlight ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    amenity.highlight ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {amenity.label}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Giới thiệu</h2>
        <div className="glass-strong rounded-2xl p-6 space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Tọa lạc trên bãi biển Long Beach tuyệt đẹp của Cam Ranh, The Anam Resort mang đến
            trải nghiệm nghỉ dưỡng đẳng cấp với kiến trúc Đông Dương cổ điển kết hợp tiện nghi
            hiện đại. Resort sở hữu 3 hồ bơi vô cực hướng biển, spa cao cấp và 5 nhà hàng
            phục vụ ẩm thực đa quốc gia.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Với 117 biệt thự và 96 phòng suite sang trọng, mỗi không gian đều được thiết kế
            tỉ mỉ với nội thất gỗ cao cấp, ban công riêng và tầm nhìn ra biển hoặc vườn nhiệt đới.
            Đặc biệt, resort cách sân bay Cam Ranh chỉ 30 phút di chuyển.
          </p>
          <button className="text-primary font-medium text-sm hover:underline">
            Đọc thêm
          </button>
        </div>
      </div>
    </motion.div>
  )
}
