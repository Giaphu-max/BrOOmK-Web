"use client"

import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    User,
    Plane,
    CreditCard,
    Bell,
    Settings,
    LogOut,
    Calendar,
    Hotel,
    MapPin,
    Download,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
} from "lucide-react"

// ĐÃ THÊM: href cho từng mục
const menuItems = [
    { icon: User, label: "Hồ sơ cá nhân", active: false, href: "/profile" },
    { icon: Plane, label: "Chuyến đi của tôi", active: true, href: "/my-trips" },
    { icon: CreditCard, label: "Phương thức thanh toán", active: false, href: "/payment" },
    { icon: Bell, label: "Thông báo", active: false, badge: 3, href: "/notifications" },
    { icon: Settings, label: "Cài đặt", active: false, href: "/settings" },
]

const tabs = [
    { id: "upcoming", label: "Sắp tới", count: 2 },
    { id: "completed", label: "Đã hoàn thành", count: 8 },
    { id: "cancelled", label: "Đã hủy", count: 2 },
]

const upcomingTrips = [
    {
        id: 1,
        bookingCode: "#BRK-8923",
        status: "confirmed",
        statusLabel: "Đã xác nhận",
        title: "Combo Vé máy bay & Khách sạn tại Đà Nẵng",
        startDate: "20/05/2026",
        endDate: "23/05/2026",
        image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&h=300&fit=crop",
        location: "Đà Nẵng, Việt Nam",
        services: ["flight", "hotel"],
    },
    {
        id: 2,
        bookingCode: "#BRK-9156",
        status: "pending",
        statusLabel: "Chờ thanh toán",
        title: "Tour du lịch Phú Quốc 4 ngày 3 đêm",
        startDate: "15/06/2026",
        endDate: "18/06/2026",
        image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=300&fit=crop",
        location: "Phú Quốc, Việt Nam",
        services: ["flight", "hotel"],
    },
]

const completedTrips = [
    {
        id: 3,
        bookingCode: "#BRK-7821",
        status: "completed",
        statusLabel: "Đã hoàn thành",
        title: "Khách sạn Vinpearl Nha Trang",
        startDate: "10/04/2026",
        endDate: "13/04/2026",
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop",
        location: "Nha Trang, Việt Nam",
        services: ["hotel"],
    },
]

const cancelledTrips = [
    {
        id: 4,
        bookingCode: "#BRK-6543",
        status: "cancelled",
        statusLabel: "Đã hủy",
        title: "Vé máy bay Hà Nội - Sài Gòn",
        startDate: "01/03/2026",
        endDate: "01/03/2026",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop",
        location: "TP. Hồ Chí Minh",
        services: ["flight"],
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
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.5,
            ease: "easeOut",
        },
    }),
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "confirmed":
            return "bg-green-100 text-green-700"
        case "pending":
            return "bg-amber-100 text-amber-700"
        case "completed":
            return "bg-blue-100 text-blue-700"
        case "cancelled":
            return "bg-red-100 text-red-700"
        default:
            return "bg-slate-100 text-slate-700"
    }
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case "confirmed":
            return <CheckCircle className="w-3.5 h-3.5" />
        case "pending":
            return <Clock className="w-3.5 h-3.5" />
        case "completed":
            return <CheckCircle className="w-3.5 h-3.5" />
        case "cancelled":
            return <XCircle className="w-3.5 h-3.5" />
        default:
            return null
    }
}

interface Trip {
    id: number
    bookingCode: string
    status: string
    statusLabel: string
    title: string
    startDate: string
    endDate: string
    image: string
    location: string
    services: string[]
}

function TripCard({ trip, index }: { trip: Trip; index: number }) {
    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
        >
            <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                    <img
                        src={trip.image}
                        alt={trip.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-r" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-sm font-medium">
                        <MapPin className="w-4 h-4" />
                        {trip.location}
                    </div>
                </div>

                {/* Content Section */}
                <div className="md:w-2/3 p-5 md:p-6 flex flex-col">
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-sm text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                            {trip.bookingCode}
                        </span>
                        <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                trip.status
                            )}`}
                        >
                            {getStatusIcon(trip.status)}
                            {trip.statusLabel}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">
                        {trip.title}
                    </h3>

                    {/* Details */}
                    <div className="flex flex-wrap items-center gap-4 text-slate-600 text-sm mb-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-teal-600" />
                            <span>
                                {trip.startDate} - {trip.endDate}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            {trip.services.includes("flight") && (
                                <div className="flex items-center gap-1 px-2 py-1 bg-teal-50 rounded-lg">
                                    <Plane className="w-4 h-4 text-teal-600" />
                                    <span className="text-teal-700 text-xs font-medium">
                                        Máy bay
                                    </span>
                                </div>
                            )}
                            {trip.services.includes("hotel") && (
                                <div className="flex items-center gap-1 px-2 py-1 bg-teal-50 rounded-lg">
                                    <Hotel className="w-4 h-4 text-teal-600" />
                                    <span className="text-teal-700 text-xs font-medium">
                                        Khách sạn
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-slate-100">
                        <button className="flex items-center gap-2 px-4 py-2.5 border-2 border-teal-600 text-teal-600 rounded-xl font-medium hover:bg-teal-50 transition-colors duration-200">
                            <Eye className="w-4 h-4" />
                            Xem chi tiết
                        </button>
                        {(trip.status === "confirmed" || trip.status === "completed") && (
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors duration-200">
                                <Download className="w-4 h-4" />
                                Tải vé điện tử
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default function MyTrips() {
    const [activeTab, setActiveTab] = useState("upcoming")

    const getTrips = () => {
        switch (activeTab) {
            case "upcoming":
                return upcomingTrips
            case "completed":
                return completedTrips
            case "cancelled":
                return cancelledTrips
            default:
                return []
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <motion.div
                    className="flex flex-col lg:flex-row gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Sidebar Navigation */}
                    <motion.aside variants={itemVariants} className="lg:w-1/4 w-full">
                        <div className="bg-white rounded-3xl p-6 shadow-sm">
                            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-2xl font-bold">
                                        GP
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Gia Phú</h3>
                                    <p className="text-sm text-slate-500">Hạng Vàng</p>
                                </div>
                            </div>

                            <nav className="mt-6 space-y-2">
                                {/* ĐÃ SỬA: Đổi button thành Link để chuyển trang */}
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
                                        onClick={() => {
                                            localStorage.removeItem("isLoggedIn");
                                            window.location.href = "/"; // Đá về trang chủ khi đăng xuất
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-all duration-200"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        <span>Đăng xuất</span>
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </motion.aside>

                    {/* Main Content */}
                    <main className="lg:w-3/4 w-full space-y-6">
                        {/* Page Header */}
                        <motion.div variants={itemVariants}>
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">
                                Chuyến đi của tôi
                            </h1>
                            <p className="text-slate-600">
                                Quản lý tất cả các đặt chỗ và chuyến đi của bạn
                            </p>
                        </motion.div>

                        {/* Tabs */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-3xl p-2 shadow-sm"
                        >
                            <div className="flex flex-wrap gap-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`relative flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all duration-200 ${activeTab === tab.id
                                            ? "bg-teal-600 text-white"
                                            : "text-slate-600 hover:bg-slate-100"
                                            }`}
                                    >
                                        {tab.label}
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id
                                                ? "bg-white/20 text-white"
                                                : "bg-slate-200 text-slate-600"
                                                }`}
                                        >
                                            {tab.count}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Trip Cards */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                {getTrips().length > 0 ? (
                                    getTrips().map((trip, index) => (
                                        <TripCard key={trip.id} trip={trip} index={index} />
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="bg-white rounded-3xl p-12 shadow-sm text-center"
                                    >
                                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Plane className="w-10 h-10 text-slate-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                            Chưa có chuyến đi nào
                                        </h3>
                                        <p className="text-slate-600 mb-6">
                                            Bạn chưa có chuyến đi nào trong danh mục này
                                        </p>
                                        <button className="px-6 py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors duration-200">
                                            Khám phá ngay
                                        </button>
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </motion.div>
            </div>
        </div>
    )
}