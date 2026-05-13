"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpDown, Grid3X3, List, TrendingUp, Star, BadgeDollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import HotelCard, { Hotel } from "./hotel-card"

const mockHotels: Hotel[] = [
  {
    id: "1",
    name: "InterContinental Danang Sun Peninsula Resort",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    rating: 9.4,
    reviewCount: 2847,
    stars: 5,
    location: "Quận Sơn Trà, Đà Nẵng",
    distance: "8.5km từ trung tâm",
    amenities: ["wifi", "pool", "restaurant", "gym", "parking"],
    pricePerNight: 8500000,
    originalPrice: 12000000,
    isAvailable: true,
    roomsLeft: 2,
  },
  {
    id: "2",
    name: "Furama Resort Danang",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    rating: 9.1,
    reviewCount: 3156,
    stars: 5,
    location: "Quận Ngũ Hành Sơn, Đà Nẵng",
    distance: "6.2km từ trung tâm",
    amenities: ["wifi", "pool", "restaurant", "parking"],
    pricePerNight: 4200000,
    originalPrice: 5500000,
    isAvailable: true,
  },
  {
    id: "3",
    name: "Hyatt Regency Danang Resort & Spa",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    rating: 8.9,
    reviewCount: 2103,
    stars: 5,
    location: "Quận Ngũ Hành Sơn, Đà Nẵng",
    distance: "5.8km từ trung tâm",
    amenities: ["wifi", "pool", "gym", "restaurant", "parking"],
    pricePerNight: 3800000,
    isAvailable: true,
    roomsLeft: 5,
  },
  {
    id: "4",
    name: "Pullman Danang Beach Resort",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    rating: 8.7,
    reviewCount: 1876,
    stars: 5,
    location: "Quận Ngũ Hành Sơn, Đà Nẵng",
    distance: "5.5km từ trung tâm",
    amenities: ["wifi", "pool", "restaurant", "gym"],
    pricePerNight: 3200000,
    originalPrice: 4000000,
    isAvailable: true,
  },
  {
    id: "5",
    name: "Novotel Danang Premier Han River",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    rating: 8.5,
    reviewCount: 2341,
    stars: 4,
    location: "Quận Hải Châu, Đà Nẵng",
    distance: "0.5km từ trung tâm",
    amenities: ["wifi", "pool", "restaurant", "gym", "parking"],
    pricePerNight: 1800000,
    isAvailable: true,
  },
  {
    id: "6",
    name: "Melia Danang Beach Resort",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    rating: 8.8,
    reviewCount: 1654,
    stars: 4,
    location: "Quận Ngũ Hành Sơn, Đà Nẵng",
    distance: "6.0km từ trung tâm",
    amenities: ["wifi", "pool", "restaurant", "parking"],
    pricePerNight: 2500000,
    originalPrice: 3200000,
    isAvailable: false,
  },
  {
    id: "7",
    name: "Brilliant Hotel Danang",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    rating: 8.3,
    reviewCount: 987,
    stars: 4,
    location: "Quận Hải Châu, Đà Nẵng",
    distance: "0.8km từ trung tâm",
    amenities: ["wifi", "restaurant", "gym", "parking"],
    pricePerNight: 1200000,
    isAvailable: true,
    roomsLeft: 3,
  },
  {
    id: "8",
    name: "Sala Danang Beach Hotel",
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
    rating: 8.1,
    reviewCount: 756,
    stars: 3,
    location: "Quận Sơn Trà, Đà Nẵng",
    distance: "3.2km từ trung tâm",
    amenities: ["wifi", "pool", "restaurant"],
    pricePerNight: 850000,
    isAvailable: true,
  },
]

type SortOption = "recommended" | "price-low" | "price-high" | "rating"

export default function HotelList() {
  const [sortBy, setSortBy] = useState<SortOption>("recommended")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  const sortedHotels = [...mockHotels].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.pricePerNight - b.pricePerNight
      case "price-high":
        return b.pricePerNight - a.pricePerNight
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const sortOptions: { value: SortOption; label: string; icon: React.ReactNode }[] = [
    { value: "recommended", label: "Đề xuất", icon: <TrendingUp className="w-4 h-4" /> },
    { value: "price-low", label: "Giá thấp nhất", icon: <BadgeDollarSign className="w-4 h-4" /> },
    { value: "price-high", label: "Giá cao nhất", icon: <BadgeDollarSign className="w-4 h-4" /> },
    { value: "rating", label: "Đánh giá cao", icon: <Star className="w-4 h-4" /> },
  ]

  return (
    <div className="flex-1 min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-foreground">
            Khách sạn tại Đà Nẵng
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Tìm thấy <span className="font-medium text-foreground">{mockHotels.length}</span> khách sạn phù hợp
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none pl-4 pr-10 py-2 rounded-xl glass border border-border/50 text-sm font-medium text-foreground bg-transparent cursor-pointer focus:outline-none focus:border-primary/50"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-background">
                  {option.label}
                </option>
              ))}
            </select>
            <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl glass border border-border/50">
            <Button
              variant="ghost"
              size="sm"
              className={`p-2 ${viewMode === "list" ? "bg-primary/10 text-primary" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`p-2 ${viewMode === "grid" ? "bg-primary/10 text-primary" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Hotel List */}
      <motion.div
        layout
        className={`${
          viewMode === "grid"
            ? "grid grid-cols-1 xl:grid-cols-2 gap-4"
            : "flex flex-col gap-4"
        }`}
      >
        {sortedHotels.map((hotel, index) => (
          <HotelCard key={hotel.id} hotel={hotel} index={index} />
        ))}
      </motion.div>

      {/* Load More */}
      <div className="mt-8 text-center">
        <Button
          variant="outline"
          className="px-8 glass border-primary/30 hover:bg-primary/10"
        >
          Xem thêm khách sạn
        </Button>
      </div>
    </div>
  )
}
