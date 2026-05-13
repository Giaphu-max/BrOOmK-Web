"use client"

import { motion } from "framer-motion"
import { Calendar, Users, BedDouble, MapPin, Star, Clock, Shield, Tag } from "lucide-react"
import Image from "next/image"

interface BookingSummaryProps {
  booking: {
    hotel: {
      name: string
      image: string
      rating: number
      reviewScore: number
      location: string
    }
    room: {
      type: string
      guests: number
      count: number
    }
    dates: {
      checkIn: string
      checkOut: string
      nights: number
    }
    pricing: {
      roomPrice: number
      tax: number
      serviceFee: number
      discount?: number
      total: number
    }
  }
}

export function BookingSummary({ booking }: BookingSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="sticky top-24 rounded-2xl border border-white/10 bg-card/30 backdrop-blur-xl shadow-xl overflow-hidden"
    >
      {/* Hotel Image & Info */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={booking.hotel.image}
          alt={booking.hotel.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-1 mb-1">
            {Array.from({ length: booking.hotel.rating }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-accent text-accent" />
            ))}
          </div>
          <h3 className="font-semibold text-foreground text-lg line-clamp-1">
            {booking.hotel.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <MapPin className="w-3 h-3" />
            <span className="line-clamp-1">{booking.hotel.location}</span>
          </div>
        </div>
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-primary/90 backdrop-blur-sm">
          <span className="text-xs font-bold text-primary-foreground">
            {booking.hotel.reviewScore}
          </span>
        </div>
      </div>

      {/* Booking Details */}
      <div className="p-4 space-y-4">
        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-background/30 border border-white/5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Calendar className="w-3 h-3" />
              <span>Nhận phòng</span>
            </div>
            <p className="font-semibold text-foreground text-sm">{booking.dates.checkIn}</p>
            <p className="text-xs text-muted-foreground">14:00</p>
          </div>
          <div className="p-3 rounded-xl bg-background/30 border border-white/5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Calendar className="w-3 h-3" />
              <span>Trả phòng</span>
            </div>
            <p className="font-semibold text-foreground text-sm">{booking.dates.checkOut}</p>
            <p className="text-xs text-muted-foreground">12:00</p>
          </div>
        </div>

        {/* Room Info */}
        <div className="p-3 rounded-xl bg-background/30 border border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BedDouble className="w-4 h-4 text-primary" />
              <div>
                <p className="font-medium text-foreground text-sm">{booking.room.type}</p>
                <p className="text-xs text-muted-foreground">
                  {booking.room.count} phòng · {booking.room.guests} khách
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{booking.dates.nights} đêm</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Price Breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Chi tiết giá</h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Giá phòng ({booking.dates.nights} đêm x {booking.room.count} phòng)
              </span>
              <span className="text-foreground">{formatPrice(booking.pricing.roomPrice)}đ</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Thuế VAT (10%)</span>
              <span className="text-foreground">{formatPrice(booking.pricing.tax)}đ</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Phí dịch vụ</span>
              <span className="text-foreground">{formatPrice(booking.pricing.serviceFee)}đ</span>
            </div>
            {booking.pricing.discount && (
              <div className="flex items-center justify-between text-green-500">
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  Giảm giá
                </span>
                <span>-{formatPrice(booking.pricing.discount)}đ</span>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Tổng tiền</p>
            <p className="text-xs text-muted-foreground">(Đã bao gồm thuế và phí)</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {formatPrice(booking.pricing.total)}đ
            </p>
          </div>
        </div>

        {/* Promo Code */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Mã giảm giá"
            className="flex-1 px-3 py-2 text-sm bg-background/50 border border-white/10 rounded-lg focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 placeholder:text-muted-foreground/50"
          />
          <button className="px-4 py-2 text-sm font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors">
            Áp dụng
          </button>
        </div>

        {/* Trust Badges */}
        <div className="pt-2 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="w-4 h-4 text-green-500" />
            <span>Miễn phí hủy trước 24h</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>Xác nhận đặt phòng ngay lập tức</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
