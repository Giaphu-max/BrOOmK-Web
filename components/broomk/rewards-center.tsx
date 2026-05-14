"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
    User,
    Plane,
    CreditCard,
    Bell,
    Settings,
    LogOut,
    Crown,
    Diamond,
    Hotel,
    Car,
    ArrowUpCircle,
    Clock,
    Sparkles,
    Headphones,
    Gift,
    Star,
    Ticket,
} from "lucide-react"

// ĐÃ SỬA: Đồng bộ Menu với trang My Trips
const menuItems = [
    { icon: User, label: "Hồ sơ cá nhân", href: "/profile", active: false },
    { icon: Plane, label: "Chuyến đi của tôi", href: "/my-trips", active: false },
    { icon: CreditCard, label: "Phương thức thanh toán", href: "/payment", active: false },
    { icon: Gift, label: "Ưu đãi & Điểm thưởng", href: "/rewards", active: true }, // Đổi tên nhãn cho khớp Dropdown
    { icon: Bell, label: "Thông báo", href: "/notifications", badge: 3, active: false },
    { icon: Settings, label: "Cài đặt", href: "/settings", active: false },
]

const vouchers = [
    {
        id: 1,
        icon: Hotel,
        title: "Giảm 20% Khách sạn",
        description: "Áp dụng cho tất cả khách sạn 4-5 sao",
        points: 1000,
        color: "bg-blue-500",
        expiry: "30 ngày",
    },
    {
        id: 2,
        icon: Car,
        title: "Miễn phí Xe đưa đón",
        description: "Đưa đón sân bay 2 chiều miễn phí",
        points: 1500,
        color: "bg-amber-500",
        expiry: "60 ngày",
    },
    {
        id: 3,
        icon: ArrowUpCircle,
        title: "Nâng hạng phòng",
        description: "Nâng hạng phòng miễn phí khi check-in",
        points: 2000,
        color: "bg-purple-500",
        expiry: "90 ngày",
    },
]

const goldBenefits = [
    {
        icon: Clock,
        title: "Check-in sớm",
        description: "Check-in từ 10:00 sáng",
    },
    {
        icon: Sparkles,
        title: "Tích lũy x1.5 điểm",
        description: "Nhận thêm 50% điểm thưởng",
    },
    {
        icon: Headphones,
        title: "Hỗ trợ 24/7",
        description: "Đường dây nóng ưu tiên",
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
        transition: { duration: 0.5, ease: "easeOut" },
    },
}

export default function RewardsCenter() {
    const currentPoints = 2500
    const nextTierPoints = 3000
    const progress = (currentPoints / nextTierPoints) * 100

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn")
        window.location.href = "/"
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* ĐÃ SỬA: Bố cục Sidebar đồng bộ hoàn toàn với My Trips */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:w-1/4 w-full"
                    >
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                            {/* User Info - Đổi thành Gia Phú "GP" để khớp Context */}
                            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-2xl font-bold">
                                        GP
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Gia Phú</h3>
                                    <div className="flex items-center gap-1 text-amber-500 text-sm">
                                        <Crown className="w-4 h-4" />
                                        <span>Hạng Vàng</span>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Menu */}
                            <nav className="mt-6 space-y-2">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${item.active
                                            ? "bg-teal-50 text-teal-600 font-medium"
                                            : "text-slate-600 hover:bg-slate-50"
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span className="flex-1 text-left">{item.label}</span>
                                        {item.badge && (
                                            <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                ))}

                                <div className="pt-4 border-t border-slate-100 mt-4">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-all duration-200"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        <span>Đăng xuất</span>
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </motion.aside>

                    {/* Main Content - Vẫn giữ nguyên các tính năng Reward xuất sắc */}
                    <main className="lg:w-3/4 w-full">
                        {/* Tiêu đề giống My Trips */}
                        <motion.div variants={itemVariants} className="mb-6">
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">Ưu đãi & Điểm thưởng</h1>
                            <p className="text-slate-600">Khám phá các đặc quyền và sử dụng điểm tích lũy của bạn</p>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-8"
                        >
                            {/* Hero Section - Points Display */}
                            <motion.div
                                variants={itemVariants}
                                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 p-8 text-white shadow-xl"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                                <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white/5 rounded-full" />

                                <div className="relative z-10">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Star className="w-5 h-5 text-amber-300" />
                                                <span className="text-teal-100 text-sm font-medium">Điểm thưởng hiện tại</span>
                                            </div>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-5xl md:text-6xl font-bold">2,500</span>
                                                <span className="text-xl text-teal-200">BrOOmK Points</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                                                <Crown className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-teal-100 text-sm">Hạng hiện tại</p>
                                                <p className="font-bold text-lg">Hạng Vàng</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <Crown className="w-5 h-5 text-amber-300" />
                                                <span className="font-medium">Hạng Vàng</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Diamond className="w-5 h-5 text-cyan-300" />
                                                <span className="font-medium">Hạng Kim Cương</span>
                                            </div>
                                        </div>
                                        <div className="h-4 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progress}%` }}
                                                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                                                className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full relative"
                                            >
                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center">
                                                    <div className="w-3 h-3 bg-amber-400 rounded-full" />
                                                </div>
                                            </motion.div>
                                        </div>
                                        <p className="text-center mt-3 text-teal-100">
                                            Còn <span className="font-bold text-white">500 điểm</span> nữa để lên{" "}
                                            <span className="font-bold text-cyan-300">Hạng Kim Cương</span>
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Vouchers Section */}
                            <motion.div variants={itemVariants}>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-slate-800">Đổi điểm lấy ưu đãi</h2>
                                    <Link
                                        href="/rewards/history"
                                        className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                                    >
                                        Xem lịch sử
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {vouchers.map((voucher) => (
                                        <motion.div
                                            key={voucher.id}
                                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                            className="relative bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group"
                                        >
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-slate-50 rounded-full" />
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 bg-slate-50 rounded-full" />

                                            <div className={`${voucher.color} p-6 text-white relative overflow-hidden`}>
                                                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                                                <div className="relative z-10">
                                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                                                        <voucher.icon className="w-7 h-7" />
                                                    </div>
                                                    <h3 className="font-bold text-lg">{voucher.title}</h3>
                                                    <p className="text-white/80 text-sm mt-1 line-clamp-2">{voucher.description}</p>
                                                </div>
                                            </div>

                                            <div className="border-t-2 border-dashed border-slate-200 mx-4" />

                                            <div className="p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <p className="text-slate-500 text-xs uppercase tracking-wider font-bold">Đổi với</p>
                                                        <p className="font-bold text-slate-800 text-lg">
                                                            {voucher.points.toLocaleString()} pts
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                                                        <Ticket className="w-4 h-4" />
                                                        <span>{voucher.expiry}</span>
                                                    </div>
                                                </div>

                                                <button
                                                    disabled={currentPoints < voucher.points}
                                                    className={`w-full py-3 rounded-2xl font-bold transition-all ${currentPoints >= voucher.points
                                                        ? "bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-100"
                                                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                                                        }`}
                                                >
                                                    {currentPoints >= voucher.points ? "Đổi ngay" : "Không đủ điểm"}
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Benefits & Earn Info */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <motion.div variants={itemVariants}>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
                                            <Crown className="w-5 h-5 text-white" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-800">Đặc quyền Hạng Vàng</h2>
                                    </div>
                                    <div className="space-y-4">
                                        {goldBenefits.map((benefit) => (
                                            <div key={benefit.title} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <benefit.icon className="w-6 h-6 text-amber-500" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-800">{benefit.title}</h3>
                                                    <p className="text-slate-500 text-sm">{benefit.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center shadow-inner">
                                            <Sparkles className="w-5 h-5 text-teal-600" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-800">Tích điểm thế nào?</h2>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Hotel className="w-6 h-6 text-teal-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-800">Đặt khách sạn & Ẩm thực</h3>
                                                <p className="text-slate-500 text-sm">Nhận 10 điểm / 100.000đ</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Plane className="w-6 h-6 text-teal-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-800">Đặt vé máy bay</h3>
                                                <p className="text-slate-500 text-sm">Nhận 15 điểm / 100.000đ</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                        </motion.div>
                    </main>
                </div>
            </div>
        </div>
    )
}