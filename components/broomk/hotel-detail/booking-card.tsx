"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Users, Minus, Plus, ChevronDown, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const roomOptions = [
  { id: "1", name: "Deluxe Ocean View", price: 3200000 },
  { id: "2", name: "Premium Pool Access", price: 4500000 },
  { id: "3", name: "Family Suite", price: 5800000 },
  { id: "4", name: "Presidential Villa", price: 15000000 },
]

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN").format(price)
}

interface BookingCardProps {
  selectedRoomId?: string
}

export default function BookingCard({ selectedRoomId }: BookingCardProps) {
  const [checkIn, setCheckIn] = useState("2024-03-15")
  const [checkOut, setCheckOut] = useState("2024-03-18")
  const [rooms, setRooms] = useState(1)
  const [selectedRoom, setSelectedRoom] = useState(selectedRoomId || "1")
  const [isRoomDropdownOpen, setIsRoomDropdownOpen] = useState(false)

  const currentRoom = roomOptions.find((r) => r.id === selectedRoom) || roomOptions[0]
  const nights = 3 // Calculate based on dates
  const subtotal = currentRoom.price * nights * rooms
  const taxes = subtotal * 0.1
  const total = subtotal + taxes

  return (
    <motion.div
      className="glass-strong rounded-3xl p-6 border border-primary/20 shadow-xl shadow-primary/10 sticky top-20"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Header with Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-primary">
            {formatPrice(currentRoom.price)}đ
          </span>
          <span className="text-muted-foreground">/ đêm</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Bao gồm thuế và phí</p>
      </div>

      {/* Booking Form */}
      <div className="space-y-4">
        {/* Check-in / Check-out */}
        <div className="grid grid-cols-2 gap-2">
          <div className="glass rounded-xl p-3 border border-border/50">
            <label className="text-xs text-muted-foreground font-medium block mb-1">
              Nhận phòng
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent text-sm font-medium text-foreground w-full focus:outline-none"
              />
            </div>
          </div>
          <div className="glass rounded-xl p-3 border border-border/50">
            <label className="text-xs text-muted-foreground font-medium block mb-1">
              Trả phòng
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent text-sm font-medium text-foreground w-full focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Room Type Selector */}
        <div className="relative">
          <div
            className="glass rounded-xl p-3 border border-border/50 cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => setIsRoomDropdownOpen(!isRoomDropdownOpen)}
          >
            <label className="text-xs text-muted-foreground font-medium block mb-1">
              Loại phòng
            </label>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{currentRoom.name}</span>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform ${
                  isRoomDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>

          {/* Dropdown */}
          {isRoomDropdownOpen && (
            <motion.div
              className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-xl border border-border/50 shadow-lg overflow-hidden z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {roomOptions.map((room) => (
                <button
                  key={room.id}
                  className={`w-full px-4 py-3 flex items-center justify-between text-left hover:bg-primary/10 transition-colors ${
                    room.id === selectedRoom ? "bg-primary/10" : ""
                  }`}
                  onClick={() => {
                    setSelectedRoom(room.id)
                    setIsRoomDropdownOpen(false)
                  }}
                >
                  <span className="text-sm font-medium">{room.name}</span>
                  <span className="text-sm text-primary font-semibold">
                    {formatPrice(room.price)}đ
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Number of Rooms */}
        <div className="glass rounded-xl p-3 border border-border/50">
          <label className="text-xs text-muted-foreground font-medium block mb-2">
            Số phòng
          </label>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{rooms} phòng</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors disabled:opacity-50"
                onClick={() => setRooms(Math.max(1, rooms - 1))}
                disabled={rooms <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-semibold">{rooms}</span>
              <button
                className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
                onClick={() => setRooms(rooms + 1)}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="mt-6 pt-6 border-t border-border/50 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {formatPrice(currentRoom.price)}đ x {nights} đêm x {rooms} phòng
          </span>
          <span className="font-medium">{formatPrice(subtotal)}đ</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Thuế và phí (10%)</span>
          <span className="font-medium">{formatPrice(taxes)}đ</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-3 border-t border-border/50">
          <span>Tổng cộng</span>
          <span className="text-primary">{formatPrice(total)}đ</span>
        </div>
      </div>

      {/* Book Now Button */}
      <Link href="/checkout" className="block mt-6">
        <Button
          size="lg"
          className="w-full h-14 text-base bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/30"
        >
          Đặt phòng ngay
        </Button>
      </Link>

      {/* Trust Badges */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Shield className="w-4 h-4 text-success" />
          <span>Thanh toán an toàn</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4 text-primary" />
          <span>Hủy miễn phí 24h</span>
        </div>
      </div>
    </motion.div>
  )
}
