"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Maximize, Bed, Check, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Room {
  id: string
  name: string
  image: string
  size: number
  maxGuests: number
  bedType: string
  price: number
  originalPrice: number
  features: string[]
  available: number
}

const rooms: Room[] = [
  {
    id: "1",
    name: "Deluxe Ocean View",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&h=400&fit=crop",
    size: 45,
    maxGuests: 2,
    bedType: "1 giường King",
    price: 3200000,
    originalPrice: 4000000,
    features: ["Ban công riêng", "Bồn tắm", "Minibar miễn phí", "Bữa sáng"],
    available: 3,
  },
  {
    id: "2",
    name: "Premium Pool Access",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&h=400&fit=crop",
    size: 55,
    maxGuests: 2,
    bedType: "1 giường King",
    price: 4500000,
    originalPrice: 5500000,
    features: ["Hồ bơi riêng", "Phòng khách riêng", "Butler service", "Bữa sáng tại phòng"],
    available: 2,
  },
  {
    id: "3",
    name: "Family Suite",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&h=400&fit=crop",
    size: 75,
    maxGuests: 4,
    bedType: "1 King + 2 Single",
    price: 5800000,
    originalPrice: 7000000,
    features: ["2 phòng ngủ", "Phòng khách", "Bếp nhỏ", "Khu vui chơi trẻ em"],
    available: 1,
  },
  {
    id: "4",
    name: "Presidential Villa",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
    size: 150,
    maxGuests: 6,
    bedType: "2 King + 2 Single",
    price: 15000000,
    originalPrice: 18000000,
    features: ["Hồ bơi riêng", "3 phòng ngủ", "Spa room", "Đầu bếp riêng", "Xe đưa đón"],
    available: 1,
  },
]

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN").format(price)
}

interface RoomCardProps {
  room: Room
  index: number
  onSelect: (roomId: string) => void
}

function RoomCard({ room, index, onSelect }: RoomCardProps) {
  const [expanded, setExpanded] = useState(false)
  const discount = Math.round(((room.originalPrice - room.price) / room.originalPrice) * 100)

  return (
    <motion.div
      className="glass-strong rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Room Image */}
        <div className="relative w-full md:w-72 h-48 md:h-auto shrink-0">
          <Image
            src={room.image}
            alt={room.name}
            fill
            className="object-cover"
          />
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-full">
              -{discount}%
            </div>
          )}
        </div>

        {/* Room Info */}
        <div className="flex-1 p-5">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            {/* Left - Details */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-2">{room.name}</h3>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1.5">
                  <Maximize className="w-4 h-4" />
                  <span>{room.size} m²</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  <span>Tối đa {room.maxGuests} khách</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Bed className="w-4 h-4" />
                  <span>{room.bedType}</span>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-3">
                {room.features.slice(0, expanded ? undefined : 3).map((feature) => (
                  <span
                    key={feature}
                    className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                  >
                    <Check className="w-3 h-3" />
                    {feature}
                  </span>
                ))}
                {room.features.length > 3 && !expanded && (
                  <button
                    className="text-xs text-primary font-medium hover:underline"
                    onClick={() => setExpanded(true)}
                  >
                    +{room.features.length - 3} tiện ích
                  </button>
                )}
              </div>

              {/* Availability Warning */}
              {room.available <= 3 && (
                <p className="text-xs text-destructive font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-destructive rounded-full animate-pulse" />
                  Chỉ còn {room.available} phòng!
                </p>
              )}
            </div>

            {/* Right - Price & CTA */}
            <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-3 lg:min-w-[160px]">
              <div className="text-right">
                {room.originalPrice > room.price && (
                  <p className="text-sm text-muted-foreground line-through">
                    {formatPrice(room.originalPrice)}đ
                  </p>
                )}
                <p className="text-2xl font-bold text-primary">
                  {formatPrice(room.price)}
                  <span className="text-sm font-normal text-muted-foreground">đ/đêm</span>
                </p>
              </div>
              
              <Button
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg shadow-primary/20 px-6"
                onClick={() => onSelect(room.id)}
              >
                Chọn phòng
              </Button>
            </div>
          </div>

          {/* Expandable Details */}
          <motion.div
            initial={false}
            animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-border/50">
              <h4 className="text-sm font-medium text-foreground mb-2">Tất cả tiện ích:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {room.features.map((feature) => (
                  <span
                    key={feature}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground"
                  >
                    <Check className="w-4 h-4 text-success" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Toggle Button */}
          <button
            className="flex items-center gap-1 text-sm text-primary font-medium mt-3 hover:underline"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                Thu gọn <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Xem chi tiết <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

interface RoomTypesProps {
  onSelectRoom?: (roomId: string) => void
}

export default function RoomTypes({ onSelectRoom }: RoomTypesProps) {
  const handleSelectRoom = (roomId: string) => {
    if (onSelectRoom) {
      onSelectRoom(roomId)
    }
  }

  return (
    <motion.div
      className="mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-2xl font-bold text-foreground mb-6">Chọn loại phòng</h2>
      
      <div className="space-y-4">
        {rooms.map((room, index) => (
          <RoomCard
            key={room.id}
            room={room}
            index={index}
            onSelect={handleSelectRoom}
          />
        ))}
      </div>
    </motion.div>
  )
}
