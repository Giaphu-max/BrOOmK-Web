"use client"

import { motion } from "framer-motion"
import { ArrowRight, MapPin, Clock, Star, Utensils } from "lucide-react"
import Link from "next/link"

const restaurants = [
  {
    id: 1,
    name: "Phở Thìn Bờ Hồ",
    cuisine: "Ẩm thực Bắc",
    location: "Hà Nội",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=1374&auto=format&fit=crop",
    rating: 4.8,
    status: "busy",
    openHours: "6:00 - 22:00",
    specialty: "Phở bò tái chín",
  },
  {
    id: 2,
    name: "Bánh Mì Huỳnh Hoa",
    cuisine: "Ẩm thực Nam",
    location: "TP.HCM",
    image: "https://images.unsplash.com/photo-1600688640154-9619e002df30?q=80&w=1527&auto=format&fit=crop",
    rating: 4.9,
    status: "available",
    openHours: "7:00 - 21:00",
    specialty: "Bánh mì thịt nguội",
  },
  {
    id: 3,
    name: "Bún Bò Huế O Xuân",
    cuisine: "Ẩm thực Trung",
    location: "Huế",
    image: "https://images.unsplash.com/photo-1576577445504-6af96477db52?q=80&w=1470&auto=format&fit=crop",
    rating: 4.7,
    status: "busy",
    openHours: "5:30 - 20:00",
    specialty: "Bún bò giò heo",
  },
]

export default function CuisineSection() {
  return (
    <section id="cuisine" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Magazine-style Header */}
        <div className="mb-12 lg:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-1 bg-primary rounded-full" />
                <span className="text-sm font-semibold text-primary uppercase tracking-widest">
                  Độc quyền
                </span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
                Khám phá{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Ẩm thực Local
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl">
                Trải nghiệm hương vị đích thực từ những quán ăn địa phương nổi tiếng nhất
              </p>
            </div>
            <Link href="/cuisine">
              <div className="inline-flex items-center gap-2 text-primary font-medium hover:underline cursor-pointer">
                Xem tất cả quán ăn <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </div>

        {/* Restaurant Grid - Đã bỏ hiệu ứng ẩn để hiện ngay lập tức */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {restaurants.map((restaurant, index) => (
            <motion.article
              key={restaurant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative glass-strong rounded-2xl lg:rounded-3xl overflow-hidden hover:shadow-xl transition-all h-full"
            >
              <Link href={`/cuisine/${restaurant.id}`} className="block h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${restaurant.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute top-4 left-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-md ${restaurant.status === 'busy' ? 'bg-red-500/80' : 'bg-green-600/80'}`}>
                      {restaurant.status === 'busy' ? "Đang đông khách" : "Chỗ ngồi trống"}
                    </div>
                  </div>

                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 px-2.5 py-1 bg-accent rounded-full text-sm font-bold text-accent-foreground">
                      <Star className="w-3.5 h-3.5 fill-current" /> {restaurant.rating}
                    </div>
                  </div>
                </div>

                <div className="p-5 lg:p-6">
                  <h3 className="text-lg lg:text-xl font-bold text-foreground mb-2">{restaurant.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4 text-primary" /> {restaurant.location}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-sm font-medium">{restaurant.specialty}</span>
                    <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}