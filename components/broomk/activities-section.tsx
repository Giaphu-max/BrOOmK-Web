"use client"

import Link from "next/link" // ĐÃ THÊM: Import Link từ Next.js
import { motion } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"

const activities = [
  {
    id: 1,
    title: "Vịnh Hạ Long",
    category: "Di sản thiên nhiên",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1470&auto=format&fit=crop",
    rating: 4.9,
    size: "large",
  },
  {
    id: 2,
    title: "Phố cổ Hội An",
    category: "Di sản văn hóa",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1480&auto=format&fit=crop",
    rating: 4.8,
    size: "medium",
  },
  {
    id: 3,
    title: "Bà Nà Hills",
    category: "Công viên giải trí",
    image: "https://images.unsplash.com/photo-1582639590152-4f0762e6e31b?q=80&w=1470&auto=format&fit=crop",
    rating: 4.7,
    size: "medium",
  },
  {
    id: 4,
    title: "Đảo Phú Quốc",
    category: "Biển đảo",
    image: "https://images.unsplash.com/photo-1559628233-100c798642d4?q=80&w=1470&auto=format&fit=crop",
    rating: 4.9,
    size: "medium",
  },
  {
    id: 5,
    title: "Sapa",
    category: "Núi rừng",
    image: "https://images.unsplash.com/photo-1570366583862-f91883984fde?q=80&w=1528&auto=format&fit=crop",
    rating: 4.8,
    size: "large",
  },
  {
    id: 6,
    title: "Mũi Né",
    category: "Biển cát",
    image: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?q=80&w=1528&auto=format&fit=crop",
    rating: 4.6,
    size: "small",
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

export default function ActivitiesSection() {
  return (
    <section id="activities" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Khám phá ngay
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Hoạt động & Vui chơi
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Khám phá những điểm đến tuyệt vời nhất Việt Nam với các trải nghiệm độc đáo và đáng nhớ
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              variants={itemVariants}
              className={`${activity.size === "large"
                ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto min-h-[300px] lg:min-h-[500px]"
                : activity.size === "medium"
                  ? "aspect-[4/3] min-h-[200px] lg:min-h-[240px]"
                  : "aspect-square min-h-[200px]"
                }`}
            >
              {/* ĐÃ SỬA: Bọc Link của Next.js bao quanh toàn bộ thẻ */}
              <Link href={`/activities/${activity.id}`} className="block w-full h-full outline-none">
                <motion.div
                  className="group relative overflow-hidden rounded-2xl lg:rounded-3xl cursor-pointer w-full h-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${activity.image}')` }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Glass Border on Hover */}
                  <div className="absolute inset-0 rounded-2xl lg:rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-colors duration-300" />

                  {/* Content */}
                  <div className="absolute inset-0 p-4 lg:p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                        {activity.category}
                      </span>
                      <div className="flex items-center gap-1 px-2 py-1 bg-accent/90 rounded-full">
                        <Star className="w-3 h-3 fill-current text-accent-foreground" />
                        <span className="text-xs font-medium text-accent-foreground">{activity.rating}</span>
                      </div>
                    </div>
                    <h3 className={`font-bold text-white mb-2 ${activity.size === "large" ? "text-2xl lg:text-3xl" : "text-lg lg:text-xl"
                      }`}>
                      {activity.title}
                    </h3>

                    {/* Arrow Link */}
                    <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                      <span className="text-sm font-medium">Khám phá ngay</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10 lg:mt-14"
        >
          {/* ĐÃ SỬA LỖI DEPRECATED: Bỏ passHref legacyBehavior, dùng motion.div bên trong Link */}
          <Link href="/activities" className="inline-block">
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Xem tất cả điểm đến
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}