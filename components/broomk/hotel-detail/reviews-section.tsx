"use client"

import { motion } from "framer-motion"
import { Star, Quote, ThumbsUp, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface Review {
  id: string
  author: string
  avatar: string
  country: string
  date: string
  rating: number
  title: string
  content: string
  helpful: number
  tripType: string
}

const reviews: Review[] = [
  {
    id: "1",
    author: "Nguyễn Minh Tú",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    country: "Việt Nam",
    date: "Tháng 2, 2024",
    rating: 5,
    title: "Trải nghiệm tuyệt vời không thể nào quên!",
    content:
      "Resort đẹp lung linh, nhân viên cực kỳ thân thiện và chuyên nghiệp. Bữa sáng buffet phong phú với rất nhiều món ngon. Hồ bơi vô cực view biển đẹp mê ly. Chắc chắn sẽ quay lại!",
    helpful: 24,
    tripType: "Gia đình có trẻ nhỏ",
  },
  {
    id: "2",
    author: "David Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    country: "Singapore",
    date: "Tháng 1, 2024",
    rating: 5,
    title: "World-class service and stunning views",
    content:
      "The Anam exceeded all our expectations. From the moment we arrived, we were treated like royalty. The spa treatments were incredible, and the private beach is simply paradise. Highly recommended for a luxury getaway.",
    helpful: 18,
    tripType: "Cặp đôi",
  },
  {
    id: "3",
    author: "Trần Thị Mai",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    country: "Việt Nam",
    date: "Tháng 12, 2023",
    rating: 4,
    title: "Đáng đồng tiền bát gạo",
    content:
      "Phòng rộng rãi, sạch sẽ, view biển tuyệt đẹp. Dịch vụ spa rất tốt. Chỉ tiếc là wifi hơi yếu ở khu vực hồ bơi. Nhưng nhìn chung rất hài lòng với kỳ nghỉ này.",
    helpful: 12,
    tripType: "Một mình",
  },
  {
    id: "4",
    author: "Yamamoto Kenji",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    country: "Nhật Bản",
    date: "Tháng 11, 2023",
    rating: 5,
    title: "素晴らしいリゾート体験",
    content:
      "スタッフの対応が素晴らしく、部屋も清潔で快適でした。プールからの眺めは最高で、レストランの料理も絶品でした。また必ず戻ってきます！",
    helpful: 15,
    tripType: "Cặp đôi",
  },
]

const ratingCategories = [
  { label: "Vị trí", score: 9.6 },
  { label: "Sạch sẽ", score: 9.5 },
  { label: "Dịch vụ", score: 9.4 },
  { label: "Tiện nghi", score: 9.3 },
  { label: "Giá trị", score: 8.9 },
]

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.div
      className="glass-strong rounded-2xl p-6 border border-border/50 h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* Quote Icon */}
      <Quote className="w-8 h-8 text-primary/30 mb-4" />

      {/* Rating */}
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating ? "fill-accent text-accent" : "text-muted"
            }`}
          />
        ))}
      </div>

      {/* Title & Content */}
      <h4 className="font-semibold text-foreground mb-2 line-clamp-1">{review.title}</h4>
      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
        {review.content}
      </p>

      {/* Author */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image src={review.avatar} alt={review.author} fill className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{review.author}</p>
            <p className="text-xs text-muted-foreground">
              {review.country} • {review.date}
            </p>
          </div>
        </div>

        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
          <ThumbsUp className="w-3.5 h-3.5" />
          <span>{review.helpful}</span>
        </button>
      </div>

      {/* Trip Type Badge */}
      <div className="mt-3">
        <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
          {review.tripType}
        </span>
      </div>
    </motion.div>
  )
}

export default function ReviewsSection() {
  return (
    <motion.section
      className="mt-16 pt-12 border-t border-border/50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Đánh giá từ khách hàng</h2>
          <p className="text-muted-foreground">1,247 đánh giá từ khách đã lưu trú</p>
        </div>

        {/* Overall Rating */}
        <div className="flex items-center gap-4 glass-strong rounded-2xl p-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">9.4</div>
            <div className="text-xs text-muted-foreground">Tuyệt vời</div>
          </div>
          <div className="h-12 w-px bg-border/50" />
          <div className="flex flex-col gap-1">
            {ratingCategories.slice(0, 3).map((cat) => (
              <div key={cat.label} className="flex items-center gap-2 text-xs">
                <span className="w-14 text-muted-foreground">{cat.label}</span>
                <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(cat.score / 10) * 100}%` }}
                  />
                </div>
                <span className="text-foreground font-medium">{cat.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reviews.map((review, index) => (
          <ReviewCard key={review.id} review={review} index={index} />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <Button variant="outline" className="glass border-primary/30 hover:bg-primary/10">
          Xem tất cả đánh giá
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.section>
  )
}
