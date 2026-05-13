"use client"

import { motion } from "framer-motion"
import { ArrowRight, MapPin, Clock, Star, Utensils } from "lucide-react"

const restaurants = [
  {
    id: 1,
    name: "Phở Thìn Bờ Hồ",
    cuisine: "Ẩm thực Bắc",
    location: "Hà Nội",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=1374&auto=format&fit=crop",
    rating: 4.8,
    status: "busy", // busy | available
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
  {
    id: 4,
    name: "Cao Lầu Bà Bé",
    cuisine: "Ẩm thực Quảng",
    location: "Hội An",
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1364&auto=format&fit=crop",
    rating: 4.8,
    status: "available",
    openHours: "8:00 - 21:30",
    specialty: "Cao lầu truyền thống",
  },
  {
    id: 5,
    name: "Nem Nướng Ninh Hòa",
    cuisine: "Ẩm thực Khánh Hòa",
    location: "Nha Trang",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=1470&auto=format&fit=crop",
    rating: 4.6,
    status: "available",
    openHours: "10:00 - 22:00",
    specialty: "Nem nướng cuốn",
  },
  {
    id: 6,
    name: "Mì Quảng Bà Mua",
    cuisine: "Ẩm thực Quảng",
    location: "Đà Nẵng",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1480&auto=format&fit=crop",
    rating: 4.7,
    status: "busy",
    openHours: "6:30 - 20:00",
    specialty: "Mì Quảng tôm thịt",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function CuisineSection() {
  return (
    <section id="cuisine" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Magazine-style Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-16"
        >
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
              <p className="text-lg text-muted-foreground max-w-xl text-pretty">
                Trải nghiệm hương vị đích thực từ những quán ăn địa phương nổi tiếng nhất
              </p>
            </div>
            <motion.a
              href="#"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline underline-offset-4"
              whileHover={{ x: 5 }}
            >
              Xem tất cả quán ăn
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>

        {/* Restaurant Grid - Magazine Style */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {restaurants.map((restaurant) => (
            <motion.article
              key={restaurant.id}
              variants={itemVariants}
              className="group relative glass-strong rounded-2xl lg:rounded-3xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${restaurant.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md ${
                      restaurant.status === "busy"
                        ? "bg-destructive/80 text-destructive-foreground"
                        : "bg-success/80 text-white"
                    }`}
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span
                        className={`animate-ping-slow absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          restaurant.status === "busy" ? "bg-white" : "bg-white"
                        }`}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                          restaurant.status === "busy" ? "bg-white" : "bg-white"
                        }`}
                      />
                    </span>
                    <span className="text-xs font-medium">
                      {restaurant.status === "busy" ? "Đang đông khách" : "Chỗ ngồi trống"}
                    </span>
                  </div>
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-accent rounded-full">
                    <Star className="w-3.5 h-3.5 fill-current text-accent-foreground" />
                    <span className="text-sm font-semibold text-accent-foreground">
                      {restaurant.rating}
                    </span>
                  </div>
                </div>

                {/* Cuisine Type */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs text-white font-medium">
                    {restaurant.cuisine}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 lg:p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-lg lg:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {restaurant.name}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{restaurant.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{restaurant.openHours}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-foreground">
                      {restaurant.specialty}
                    </span>
                  </div>
                  <motion.button
                    className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Featured Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 lg:mt-16"
        >
          <div
            className="relative rounded-2xl lg:rounded-3xl overflow-hidden bg-cover bg-center min-h-[300px] lg:min-h-[400px]"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1470&auto=format&fit=crop')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50" />
            <div className="relative z-10 p-8 lg:p-12 flex flex-col justify-center h-full max-w-2xl">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white font-medium w-fit mb-4">
                Ưu đãi đặc biệt
              </span>
              <h3 className="text-2xl lg:text-4xl font-bold text-white mb-4 text-balance">
                Giảm 20% cho lần đặt bàn đầu tiên
              </h3>
              <p className="text-white/90 text-lg mb-6 text-pretty">
                Đăng ký ngay để nhận voucher giảm giá và khám phá ẩm thực Việt Nam đích thực
              </p>
              <motion.button
                className="w-fit px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-white/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Nhận ưu đãi ngay
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
