"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
    Star,
    MapPin,
    Clock,
    Phone,
    Heart,
    Share2,
    Navigation,
    ChevronLeft,
    Award,
    Quote,
    ExternalLink,
    Check,
    Users,
} from "lucide-react"

const menuItems = [
    {
        id: 1,
        name: "Phở Tái Chín",
        description: "Bánh phở mềm, thịt bò tái chín mềm ngọt",
        price: "55.000",
        image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=300&h=200&fit=crop",
        popular: true,
    },
    {
        id: 2,
        name: "Phở Tái Nạm Gầu",
        description: "Đầy đủ các loại thịt bò đặc trưng",
        price: "65.000",
        image: "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=300&h=200&fit=crop",
        popular: true,
    },
    {
        id: 3,
        name: "Phở Gà Ta",
        description: "Gà ta thả vườn, nước dùng thanh ngọt",
        price: "50.000",
        image: "https://images.unsplash.com/photo-1600803907087-f56d462fd26b?w=300&h=200&fit=crop",
        popular: false,
    },
    {
        id: 4,
        name: "Quẩy Nóng",
        description: "Quẩy giòn rụm, ăn kèm phở",
        price: "10.000",
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=300&h=200&fit=crop",
        popular: false,
    },
]

const reviews = [
    {
        id: 1,
        name: "Nguyễn Văn Minh",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        rating: 5,
        comment: "Phở ở đây đúng chuẩn vị Hà Nội xưa. Nước dùng trong, ngọt tự nhiên từ xương. Tôi ăn ở đây từ nhỏ đến giờ!",
        date: "2 tuần trước",
        isLocal: true,
    },
    {
        id: 2,
        name: "Trần Thị Hương",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        rating: 5,
        comment: "Quán này là bí mật của dân phố cổ. Sáng nào cũng đông nghịt người địa phương, đó là dấu hiệu của quán ngon!",
        date: "1 tháng trước",
        isLocal: true,
    },
    {
        id: 3,
        name: "Lê Hoàng Nam",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        rating: 4,
        comment: "Không gian hơi chật nhưng đổi lại là hương vị tuyệt vời. Nhất định phải thử phở tái lăn!",
        date: "1 tháng trước",
        isLocal: true,
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
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
}

export default function CuisineDetail() {
    const [isFavorite, setIsFavorite] = useState(false)
    const [showCopied, setShowCopied] = useState(false)

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
        setShowCopied(true)
        setTimeout(() => setShowCopied(false), 2000)
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative h-[400px] md:h-[500px] overflow-hidden"
            >
                <img
                    src="https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=1600&h=900&fit=crop"
                    alt="Phở Thìn Bờ Hồ"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Back Button */}
                <Link
                    href="/cuisine"
                    className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="font-medium">Quay lại</span>
                </Link>

                {/* Action Buttons */}
                <div className="absolute top-6 right-6 flex items-center gap-3">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleShare}
                        className="relative p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                        <Share2 className="w-5 h-5" />
                        {showCopied && (
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-800 text-white text-sm rounded-lg whitespace-nowrap"
                            >
                                Đã sao chép!
                            </motion.span>
                        )}
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsFavorite(!isFavorite)}
                        className={`p-3 backdrop-blur-md rounded-full transition-colors ${isFavorite ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white/30"
                            }`}
                    >
                        <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                    </motion.button>
                </div>

                {/* Hero Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
                >
                    <div className="max-w-7xl mx-auto">
                        {/* Badge */}
                        <div className="flex items-center gap-3 mb-4">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500 text-white text-sm font-medium rounded-full">
                                <Award className="w-4 h-4" />
                                Độc quyền: 70 năm gia truyền
                            </span>
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-600 text-white text-sm font-medium rounded-full">
                                <Users className="w-4 h-4" />
                                Người bản địa đề xuất
                            </span>
                        </div>

                        {/* Title & Rating */}
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
                            Phở Thìn Bờ Hồ
                        </h1>
                        <div className="flex items-center gap-4 text-white/90">
                            <div className="flex items-center gap-1">
                                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                                <span className="font-semibold text-lg">4.8</span>
                                <span className="text-white/70">(324 đánh giá)</span>
                            </div>
                            <span className="text-white/50">|</span>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>Hoàn Kiếm, Hà Nội</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-5 gap-8"
                >
                    {/* Left Column - 65% */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Brand Story */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-3xl p-6 md:p-8 shadow-sm"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                                    <Quote className="w-5 h-5 text-teal-600" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800">Câu chuyện thương hiệu</h2>
                            </div>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Phở Thìn Bờ Hồ là một trong những quán phở lâu đời nhất Hà Nội, được thành lập từ năm 1955 bởi cụ Nguyễn Trọng Thìn.
                                Trải qua 3 thế hệ, quán vẫn giữ nguyên công thức nấu nước dùng bí truyền với xương bò ninh trong 24 giờ,
                                kết hợp cùng các loại gia vị đặc biệt được rang thủ công mỗi ngày.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                Đây là "Secret Gem" mà người dân phố cổ luôn giữ kín. Sáng sớm, bạn sẽ thấy hàng dài người địa phương
                                xếp hàng chờ thưởng thức bát phở nóng hổi - đó chính là minh chứng cho hương vị đích thực của Hà Nội xưa.
                            </p>
                        </motion.div>

                        {/* Must Try Menu */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-3xl p-6 md:p-8 shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-800">Thực đơn đặc trưng (Must try)</h2>
                                <span className="text-sm text-teal-600 font-medium">{menuItems.length} món</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {menuItems.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative flex gap-4 p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer group"
                                    >
                                        <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            {item.popular && (
                                                <span className="absolute top-1 left-1 px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full">
                                                    Hot
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-slate-800 truncate">{item.name}</h3>
                                            <p className="text-sm text-slate-500 line-clamp-2 mt-1">{item.description}</p>
                                            <p className="text-teal-600 font-bold mt-2">{item.price}đ</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Reviews */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-3xl p-6 md:p-8 shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-800">Đánh giá từ người bản địa</h2>
                                <button className="text-sm text-teal-600 font-medium hover:underline">
                                    Xem tất cả
                                </button>
                            </div>
                            <div className="space-y-5">
                                {reviews.map((review, index) => (
                                    <motion.div
                                        key={review.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.15 }}
                                        className="flex gap-4 pb-5 border-b border-slate-100 last:border-0 last:pb-0"
                                    >
                                        <img
                                            src={review.avatar}
                                            alt={review.name}
                                            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h4 className="font-semibold text-slate-800">{review.name}</h4>
                                                {review.isLocal && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                                                        <Check className="w-3 h-3" />
                                                        Người dân địa phương
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="flex items-center gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${i < review.rating
                                                                ? "text-amber-400 fill-amber-400"
                                                                : "text-slate-300"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-sm text-slate-400">{review.date}</span>
                                            </div>
                                            <p className="text-slate-600 mt-2 leading-relaxed">{review.comment}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - 35% */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Contact Info */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-3xl p-6 shadow-sm sticky top-6"
                        >
                            <h2 className="text-lg font-bold text-slate-800 mb-5">Thông tin liên hệ</h2>

                            <div className="space-y-4">
                                {/* Address */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-teal-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-slate-500">Địa chỉ</p>
                                        <p className="font-medium text-slate-800">13 Lò Đúc, Hai Bà Trưng, Hà Nội</p>
                                        <a
                                            href="https://maps.google.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-sm text-teal-600 hover:underline mt-1"
                                        >
                                            <Navigation className="w-3.5 h-3.5" />
                                            Chỉ đường
                                        </a>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-slate-500">Giờ mở cửa</p>
                                        <p className="font-medium text-slate-800">06:00 - 10:00 & 18:00 - 21:00</p>
                                        <span className="inline-flex items-center gap-1.5 text-sm text-green-600 mt-1">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            Đang mở cửa
                                        </span>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-slate-500">Số điện thoại</p>
                                        <a
                                            href="tel:02438215930"
                                            className="font-medium text-slate-800 hover:text-teal-600 transition-colors"
                                        >
                                            024 3821 5930
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="mt-6 relative h-48 bg-slate-100 rounded-2xl overflow-hidden">
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                                    <MapPin className="w-10 h-10 mb-2" />
                                    <span className="text-sm font-medium">Bản đồ</span>
                                </div>
                                <a
                                    href="https://maps.google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Xem trên Google Maps
                                </a>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-6 space-y-3">
                                {/* ĐÃ CẬP NHẬT: Nút Đặt bàn ngay dẫn sang trang book */}
                                <Link href="/cuisine/pho-thin/book" className="block w-full">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-2xl transition-colors"
                                    >
                                        Đặt bàn ngay
                                    </motion.button>
                                </Link>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className={`w-full py-4 font-semibold rounded-2xl transition-colors flex items-center justify-center gap-2 ${isFavorite
                                        ? "bg-red-50 text-red-600 border-2 border-red-200"
                                        : "bg-white text-slate-700 border-2 border-slate-200 hover:border-teal-300 hover:text-teal-600"
                                        }`}
                                >
                                    <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                                    {isFavorite ? "Đã lưu vào yêu thích" : "Lưu vào danh sách yêu thích"}
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}