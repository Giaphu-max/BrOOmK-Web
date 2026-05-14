"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
    Star,
    MapPin,
    Clock,
    Ticket,
    CheckCircle,
    Calendar,
    Users,
    Minus,
    Plus,
    ChevronLeft,
    Heart,
    Share2,
    Images,
    Shield,
    Zap,
    Camera,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// MOCK DATABASE DYNAMIC DATA
const activitiesDB: Record<string, any> = {
    "1": {
        title: "Tour Du Thuyền Vịnh Hạ Long 5 Sao Trọn Gói",
        location: "Quảng Ninh, Việt Nam",
        rating: 4.9,
        reviews: "3,205",
        participants: "10,000+",
        pricePerAdult: 1500000,
        pricePerChild: 900000,
        tags: ["Di sản thiên nhiên", "Bán chạy nhất"],
        description: "Trải nghiệm kỳ quan thiên nhiên thế giới trên du thuyền 5 sao sang trọng. Thưởng thức hải sản tươi sống, chèo kayak qua các hang động kỳ bí và đón hoàng hôn tuyệt đẹp trên boong tàu thượng hạng.",
        timeline: [
            { time: "08:00", title: "Đón khách", description: "Đón tại khách sạn khu vực Bãi Cháy hoặc bến cảng." },
            { time: "09:30", title: "Lên du thuyền", description: "Nhận phòng, thưởng thức đồ uống chào mừng." },
            { time: "11:00", title: "Tham quan Hang Sửng Sốt", description: "Khám phá hang động lớn và đẹp nhất Vịnh Hạ Long." },
            { time: "12:30", title: "Ăn trưa Buffet", description: "Thưởng thức hải sản tươi ngon chuẩn 5 sao." },
            { time: "14:30", title: "Chèo Kayak", description: "Tự do chèo thuyền Kayak tại khu vực Hang Luồn." },
        ],
        images: [
            "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
            "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&q=80",
            "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80"
        ]
    },
    "2": {
        title: "Khám Phá Phố Cổ Hội An & Thả Đèn Hoa Đăng",
        location: "Quảng Nam, Việt Nam",
        rating: 4.8,
        reviews: "1,842",
        participants: "8,500+",
        pricePerAdult: 450000,
        pricePerChild: 250000,
        tags: ["Văn hóa", "Khuyên dùng"],
        description: "Dạo bước qua những con phố lấp lánh đèn lồng, tìm hiểu kiến trúc cổ kính và tham gia hoạt động thả đèn hoa đăng cầu may mắn trên dòng sông Hoài thơ mộng vào buổi tối.",
        timeline: [
            { time: "15:00", title: "Tập trung", description: "Gặp HDV tại trung tâm phố cổ Hội An." },
            { time: "15:30", title: "Tham quan nhà cổ", description: "Chiêm ngưỡng kiến trúc Nhà cổ Tấn Ký, Hội quán Phúc Kiến." },
            { time: "17:00", title: "Chùa Cầu", description: "Check-in tại biểu tượng lịch sử của Hội An." },
            { time: "18:00", title: "Ăn tối đặc sản", description: "Thưởng thức Cao Lầu, Mì Quảng, Cơm Gà." },
            { time: "19:30", title: "Thả đèn hoa đăng", description: "Đi thuyền trên sông Hoài và thả đèn cầu nguyện." },
        ],
        images: [
            "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80",
            "https://images.unsplash.com/photo-1535992165812-68d1861aa71e?w=600&q=80",
            "https://images.unsplash.com/photo-1582639590152-4f0762e6e31b?w=600&q=80"
        ]
    },
    "3": {
        title: "Tour Bà Nà Hills - Cầu Vàng Trọn Gói 1 Ngày",
        location: "Đà Nẵng, Việt Nam",
        rating: 4.9,
        reviews: "2,847",
        participants: "5,200+",
        pricePerAdult: 1250000,
        pricePerChild: 850000,
        tags: ["Tour phổ biến", "Bán chạy nhất"],
        description: "Khám phá Bà Nà Hills - thiên đường du lịch bốn mùa giữa núi rừng Đà Nẵng. Tour trọn gói bao gồm vé cáp treo, buffet trưa, và tự do vui chơi tại Fantasy Park. Đặc biệt, bạn sẽ được check-in tại Cầu Vàng nổi tiếng thế giới - cây cầu được hai bàn tay khổng lồ nâng đỡ giữa mây trời.",
        timeline: [
            { time: "08:00", title: "Đón khách", description: "Hướng dẫn viên đón bạn tại sảnh khách sạn trung tâm." },
            { time: "08:30", title: "Khởi hành", description: "Di chuyển bằng xe du lịch máy lạnh đến Bà Nà Hills." },
            { time: "09:30", title: "Cáp treo", description: "Trải nghiệm tuyến cáp treo dài nhất thế giới." },
            { time: "10:00", title: "Cầu Vàng", description: "Check-in tại cây cầu biểu tượng." },
            { time: "12:00", title: "Buffet trưa", description: "Thưởng thức ẩm thực đa dạng tại nhà hàng." },
            { time: "14:00", title: "Fantasy Park", description: "Vui chơi tại công viên trong nhà lớn nhất VN." },
        ],
        images: [
            "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80",
            "https://images.unsplash.com/photo-1528127269322-539801943592?w=600&q=80",
            "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&q=80"
        ]
    },
    "4": {
        title: "Khám Phá Đảo Ngọc Phú Quốc & Lặn Ngắm San Hô",
        location: "Kiên Giang, Việt Nam",
        rating: 4.9,
        reviews: "4,102",
        participants: "12,000+",
        pricePerAdult: 850000,
        pricePerChild: 450000,
        tags: ["Biển đảo", "Khám phá"],
        description: "Tour cano 4 đảo vip nhất Phú Quốc. Bạn sẽ được câu cá, lặn ngắm san hô tại những rạn san hô đẹp nhất, và thư giãn trên những bãi biển cát trắng mịn hoang sơ.",
        timeline: [
            { time: "08:30", title: "Đón khách", description: "Xe đón tại khách sạn khu vực Dương Đông." },
            { time: "09:30", title: "Lên cano", description: "Bắt đầu hành trình khám phá các đảo nhỏ." },
            { time: "10:30", title: "Lặn ngắm san hô", description: "Trang bị kính lặn, áo phao khám phá đại dương." },
            { time: "12:30", title: "Ăn trưa trên đảo", description: "Thưởng thức hải sản tươi sống đánh bắt trong ngày." },
            { time: "15:00", title: "Bãi Sao", description: "Tự do tắm biển và chụp hình tại bãi biển đẹp nhất." },
        ],
        images: [
            "https://images.unsplash.com/photo-1559628233-100c798642d4?w=800&q=80",
            "https://images.unsplash.com/photo-1506158669146-619067262a00?w=600&q=80",
            "https://images.unsplash.com/photo-1570366583862-f91883984fde?w=600&q=80"
        ]
    }
}

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
}

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const highlights = [
    { icon: Clock, title: "Thời lượng", description: "Khoảng 1 ngày" },
    { icon: Ticket, title: "Vé điện tử", description: "Xuất trình trên điện thoại" },
    { icon: Shield, title: "Hủy miễn phí", description: "Trước 24 giờ" },
    { icon: Zap, title: "Xác nhận tức thì", description: "Nhận vé ngay lập tức" },
]

// NHẬN PROP ID
export default function ActivityDetailPage({ id = "3" }: { id?: string }) {
    const router = useRouter()

    // LẤY DỮ LIỆU ĐỘNG
    const data = activitiesDB[id] || activitiesDB["3"]

    const [adults, setAdults] = useState(2)
    const [children, setChildren] = useState(1)
    const [selectedDate, setSelectedDate] = useState("2026-05-20")
    const [isLiked, setIsLiked] = useState(false)

    const totalPrice = adults * data.pricePerAdult + children * data.pricePerChild

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN").format(price) + "đ"
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navigation Bar */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-md"
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.back()} // ĐÃ THÊM: Nút quay lại mượt mà
                        className="gap-2 text-slate-600 hover:text-slate-900"
                    >
                        <ChevronLeft className="h-5 w-5" />
                        <span>Quay lại</span>
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-slate-600 hover:text-slate-900">
                            <Share2 className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsLiked(!isLiked)}
                            className={isLiked ? "text-red-500 hover:text-red-600" : "text-slate-600 hover:text-slate-900"}
                        >
                            <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                        </Button>
                    </div>
                </div>
            </motion.nav>

            {/* Image Gallery */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="mx-auto max-w-7xl px-4 py-6"
            >
                <div className="grid h-[400px] grid-cols-3 gap-3 overflow-hidden rounded-3xl">
                    <div className="relative col-span-2 row-span-2">
                        <img
                            src={data.images[0]}
                            alt={data.title}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="relative">
                        <img
                            src={data.images[1]}
                            alt={data.title}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="relative">
                        <img
                            src={data.images[2]}
                            alt={data.title}
                            className="h-full w-full object-cover"
                        />
                        <Button
                            variant="secondary"
                            size="sm"
                            className="absolute bottom-3 right-3 gap-2 rounded-full bg-white/90 text-slate-800 shadow-lg backdrop-blur-sm hover:bg-white"
                        >
                            <Images className="h-4 w-4" />
                            Xem tất cả ảnh
                        </Button>
                    </div>
                </div>
            </motion.section>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-4 pb-12">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left Column - Content */}
                    <motion.div
                        className="space-y-8 lg:col-span-2"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                    >
                        {/* Title Section */}
                        <motion.div variants={fadeInUp} className="space-y-4">
                            <div className="flex flex-wrap items-center gap-2">
                                {data.tags.map((tag: string, index: number) => (
                                    <Badge key={index} variant={index === 0 ? "default" : "outline"} className={`rounded-full px-3 py-1 ${index === 0 ? "bg-teal-100 text-teal-700 hover:bg-teal-100" : "border-amber-300 bg-amber-50 text-amber-700"}`}>
                                        {index === 0 && <Camera className="mr-1 h-3 w-3" />}
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <h1 className="text-balance text-3xl font-bold text-slate-800 lg:text-4xl">
                                {data.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-slate-600">
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-5 w-5 text-teal-600" />
                                    <span>{data.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                                    <span className="font-semibold text-slate-800">{data.rating}</span>
                                    <span className="text-slate-500">({data.reviews} đánh giá)</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Users className="h-5 w-5 text-slate-400" />
                                    <span>{data.participants} đã tham gia</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* About Section */}
                        <motion.div variants={fadeInUp}>
                            <Card className="overflow-hidden rounded-3xl border-0 bg-white shadow-sm">
                                <CardContent className="p-6">
                                    <h2 className="mb-4 text-xl font-semibold text-slate-800">Về hoạt động này</h2>
                                    <p className="leading-relaxed text-slate-600">
                                        {data.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Highlights Section */}
                        <motion.div variants={fadeInUp}>
                            <Card className="overflow-hidden rounded-3xl border-0 bg-white shadow-sm">
                                <CardContent className="p-6">
                                    <h2 className="mb-6 text-xl font-semibold text-slate-800">Điểm nổi bật</h2>
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        {highlights.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="flex flex-col items-center rounded-2xl bg-slate-50 p-4 text-center"
                                            >
                                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                                                    <item.icon className="h-6 w-6 text-teal-600" />
                                                </div>
                                                <h3 className="font-medium text-slate-800">{item.title}</h3>
                                                <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Timeline Section */}
                        <motion.div variants={fadeInUp}>
                            <Card className="overflow-hidden rounded-3xl border-0 bg-white shadow-sm">
                                <CardContent className="p-6">
                                    <h2 className="mb-6 text-xl font-semibold text-slate-800">Lịch trình tour</h2>
                                    <div className="space-y-0">
                                        {data.timeline.map((item: any, index: number) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="relative flex gap-4 pb-6 last:pb-0"
                                            >
                                                {/* Timeline line */}
                                                {index !== data.timeline.length - 1 && (
                                                    <div className="absolute left-[19px] top-10 h-[calc(100%-24px)] w-0.5 bg-teal-200" />
                                                )}
                                                {/* Timeline dot */}
                                                <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-semibold text-white">
                                                    {item.time.split(":")[0]}h
                                                </div>
                                                {/* Content */}
                                                <div className="flex-1 rounded-2xl bg-slate-50 p-4">
                                                    <div className="mb-1 flex items-center gap-2">
                                                        <span className="text-sm font-medium text-teal-600">{item.time}</span>
                                                    </div>
                                                    <h3 className="font-semibold text-slate-800">{item.title}</h3>
                                                    <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Booking Widget */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="sticky top-24"
                        >
                            <Card className="overflow-hidden rounded-3xl border-0 bg-white shadow-lg">
                                <CardContent className="p-6">
                                    {/* Price */}
                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-bold text-slate-800">{formatPrice(data.pricePerAdult)}</span>
                                            <span className="text-slate-500">/ người lớn</span>
                                        </div>
                                        <p className="mt-1 text-sm text-slate-500">Trẻ em từ {formatPrice(data.pricePerChild)}</p>
                                    </div>

                                    {/* Date Picker */}
                                    <div className="mb-6">
                                        <label className="mb-2 block text-sm font-medium text-slate-700">Chọn ngày</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="date"
                                                value={selectedDate}
                                                onChange={(e) => setSelectedDate(e.target.value)}
                                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-800 outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                            />
                                        </div>
                                    </div>

                                    {/* Ticket Counter */}
                                    <div className="mb-6 space-y-4">
                                        <label className="block text-sm font-medium text-slate-700">Số lượng vé</label>

                                        {/* Adults */}
                                        <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                                            <div>
                                                <p className="font-medium text-slate-800">Người lớn</p>
                                                <p className="text-sm text-slate-500">Từ 12 tuổi trở lên</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => setAdults(Math.max(1, adults - 1))}
                                                    disabled={adults <= 1}
                                                    className="h-9 w-9 rounded-full border-slate-300"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <span className="w-8 text-center text-lg font-semibold text-slate-800">{adults}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => setAdults(adults + 1)}
                                                    className="h-9 w-9 rounded-full border-slate-300"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Children */}
                                        <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                                            <div>
                                                <p className="font-medium text-slate-800">Trẻ em</p>
                                                <p className="text-sm text-slate-500">Từ 4 - 11 tuổi</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => setChildren(Math.max(0, children - 1))}
                                                    disabled={children <= 0}
                                                    className="h-9 w-9 rounded-full border-slate-300"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <span className="w-8 text-center text-lg font-semibold text-slate-800">{children}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => setChildren(children + 1)}
                                                    className="h-9 w-9 rounded-full border-slate-300"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price Breakdown */}
                                    <div className="mb-6 space-y-2 rounded-2xl bg-slate-50 p-4">
                                        <div className="flex justify-between text-slate-600">
                                            <span>
                                                Người lớn x {adults}
                                            </span>
                                            <span>{formatPrice(adults * data.pricePerAdult)}</span>
                                        </div>
                                        {children > 0 && (
                                            <div className="flex justify-between text-slate-600">
                                                <span>
                                                    Trẻ em x {children}
                                                </span>
                                                <span>{formatPrice(children * data.pricePerChild)}</span>
                                            </div>
                                        )}
                                        <div className="border-t border-slate-200 pt-2">
                                            <div className="flex justify-between">
                                                <span className="font-semibold text-slate-800">Tổng cộng</span>
                                                <span className="text-xl font-bold text-teal-600">{formatPrice(totalPrice)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Book Now Button */}
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            onClick={() => router.push(`/activities/${id}/checkout`)} // ĐÃ SỬA: Chuyển trang sang Checkout theo đúng ID
                                            className="w-full rounded-2xl bg-gradient-to-r from-teal-600 to-teal-500 py-6 text-lg font-semibold text-white shadow-lg shadow-teal-500/30 hover:from-teal-700 hover:to-teal-600"
                                        >
                                            Đặt ngay
                                        </Button>
                                    </motion.div>

                                    {/* Trust badges */}
                                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500">
                                        <Shield className="h-4 w-4" />
                                        <span>Thanh toán an toàn & bảo mật</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}