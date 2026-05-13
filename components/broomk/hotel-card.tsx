"use client"

import { motion } from "framer-motion"
import { Star, Wifi, Car, Utensils, Waves, Dumbbell, MapPin, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export interface Hotel {
  id: string
  name: string
  image: string
  rating: number
  reviewCount: number
  stars: number
  location: string
  distance: string
  amenities: string[]
  pricePerNight: number
  originalPrice?: number
  isAvailable: boolean
  roomsLeft?: number
}

interface HotelCardProps {
  hotel: Hotel
  index?: number
}

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="w-3.5 h-3.5" />,
  parking: <Car className="w-3.5 h-3.5" />,
  restaurant: <Utensils className="w-3.5 h-3.5" />,
  pool: <Waves className="w-3.5 h-3.5" />,
  gym: <Dumbbell className="w-3.5 h-3.5" />,
}

const amenityLabels: Record<string, string> = {
  wifi: "Wi-Fi miễn phí",
  parking: "Bãi đỗ xe",
  restaurant: "Nhà hàng",
  pool: "Hồ bơi",
  gym: "Phòng gym",
}

export default function HotelCard({ hotel, index = 0 }: HotelCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price)
  }

  const discount = hotel.originalPrice
    ? Math.round(((hotel.originalPrice - hotel.pricePerNight) / hotel.originalPrice) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group glass rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative w-full md:w-72 lg:w-80 h-48 md:h-auto shrink-0">
          <Image
            src={hotel.image}
            alt={hotel.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Favorite Button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-3 right-3 p-2 rounded-full glass hover:bg-white/30 transition-colors"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorite ? "fill-red-500 text-red-500" : "text-white"
              }`}
            />
          </button>

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded-lg">
              -{discount}%
            </div>
          )}

          {/* Availability Badge */}
          {hotel.isAvailable && hotel.roomsLeft && hotel.roomsLeft <= 3 && (
            <div className="absolute bottom-3 left-3 px-2 py-1 bg-warning/90 text-warning-foreground text-xs font-medium rounded-lg">
              Chỉ còn {hotel.roomsLeft} phòng!
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 lg:p-5 flex flex-col">
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-1">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                  ))}
                </div>
                
                {/* Name */}
                <h3 className="text-lg lg:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {hotel.name}
                </h3>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">{hotel.reviewCount} đánh giá</div>
                </div>
                <div className="px-2 py-1 bg-primary text-primary-foreground rounded-lg font-semibold">
                  {hotel.rating.toFixed(1)}
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{hotel.location}</span>
              <span className="mx-1">•</span>
              <span>{hotel.distance}</span>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2 mb-4">
              {hotel.amenities.slice(0, 5).map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-muted/50 rounded-lg text-xs text-muted-foreground"
                >
                  {amenityIcons[amenity]}
                  <span>{amenityLabels[amenity]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer - Price & CTA */}
          <div className="flex items-end justify-between pt-3 border-t border-border/50">
            <div>
              {hotel.originalPrice && (
                <div className="text-sm text-muted-foreground line-through">
                  {formatPrice(hotel.originalPrice)}đ
                </div>
              )}
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-primary">
                  {formatPrice(hotel.pricePerNight)}đ
                </span>
                <span className="text-sm text-muted-foreground">/đêm</span>
              </div>
            </div>

            {hotel.isAvailable ? (
              <Link href={`/hotels/${hotel.id}`}>
                <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                  Chọn phòng
                </Button>
              </Link>
            ) : (
              <Button
                className="bg-muted text-muted-foreground cursor-not-allowed"
                disabled
              >
                Hết phòng
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
