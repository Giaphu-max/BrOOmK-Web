"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
    User,
    Plane,
    CreditCard,
    Bell,
    Settings,
    LogOut,
    Gift,
    Shield,
    CheckCheck,
    Trash2,
    Clock,
} from "lucide-react"

interface Notification {
    id: string
    type: "trip" | "promo" | "system"
    title: string
    message: string
    time: string
    isRead: boolean
}

const initialNotifications: Notification[] = [
    {
        id: "1",
        type: "trip",
        title: "Nhắc nhở chuyến đi",
        message: "Chuyến đi Đà Nẵng của bạn sẽ khởi hành trong 24h tới. Hãy kiểm tra lại hành lý!",
        time: "5 phút trước",
        isRead: false,
    },
    {
        id: "2",
        type: "promo",
        title: "Ưu đãi đặc biệt",
        message: "Bạn nhận được mã giảm giá 20% cho lần đặt khách sạn tiếp theo. Mã: BROOMK20",
        time: "1 giờ trước",
        isRead: false,
    },
    {
        id: "3",
        type: "system",
        title: "Cập nhật chính sách",
        message: "Cập nhật chính sách bảo mật mới. Vui lòng xem chi tiết để biết thêm thông tin.",
        time: "2 giờ trước",
        isRead: false,
    },
    {
        id: "4",
        type: "trip",
        title: "Xác nhận đặt phòng",
        message: "Đặt phòng khách sạn Mường Thanh Đà Nẵng đã được xác nhận thành công!",
        time: "1 ngày trước",
        isRead: true,
    },
    {
        id: "5",
        type: "promo",
        title: "Flash Sale cuối tuần",
        message: "Giảm đến 50% cho các chuyến bay nội địa. Đặt ngay hôm nay!",
        time: "2 ngày trước",
        isRead: true,
    },
    {
        id: "6",
        type: "system",
        title: "Xác thực email thành công",
        message: "Email của bạn đã được xác thực. Tài khoản đã được kích hoạt đầy đủ.",
        time: "3 ngày trước",
        isRead: true,
    },
]

// ĐÃ SỬA: Đồng bộ link href và thêm mục Ưu đãi
const menuItems = [
    { icon: User, label: "Hồ sơ cá nhân", href: "/profile", active: false },
    { icon: Plane, label: "Chuyến đi của tôi", href: "/my-trips", active: false },
    { icon: CreditCard, label: "Phương thức thanh toán", href: "/payment", active: false },
    { icon: Gift, label: "Ưu đãi & Điểm thưởng", href: "/rewards", active: false }, // ĐÃ THÊM MỤC NÀY
    { icon: Bell, label: "Thông báo", href: "/notifications", badge: 3, active: true },
    { icon: Settings, label: "Cài đặt", href: "/settings", active: false },
]

const getNotificationIcon = (type: string) => {
    switch (type) {
        case "trip":
            return { icon: Plane, bgColor: "bg-teal-100", iconColor: "text-teal-600" }
        case "promo":
            return { icon: Gift, bgColor: "bg-amber-100", iconColor: "text-amber-600" }
        case "system":
            return { icon: Shield, bgColor: "bg-blue-100", iconColor: "text-blue-600" }
        default:
            return { icon: Bell, bgColor: "bg-slate-100", iconColor: "text-slate-600" }
    }
}

export default function NotificationsContent() {
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

    const unreadCount = notifications.filter((n) => !n.isRead).length

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
    }

    const markAsRead = (id: string) => {
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
    }

    const deleteNotification = (id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id))
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" },
        },
        exit: {
            opacity: 0,
            x: -100,
            transition: { duration: 0.3 },
        },
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full lg:w-1/4"
                    >
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden p-6">
                            {/* User Info */}
                            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-2xl font-bold">
                                        GP
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Gia Phú</h3>
                                    <p className="text-sm text-slate-500">Hạng Vàng</p>
                                </div>
                            </div>

                            {/* Menu */}
                            <nav className="mt-6 space-y-2">
                                {/* ĐÃ SỬA: Đảm bảo dùng thẻ Link thay vì thẻ a hoặc list item rườm rà */}
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 ${item.active
                                            ? "bg-teal-50 text-teal-600 font-medium"
                                            : "text-slate-600 hover:bg-slate-50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className="w-5 h-5" />
                                            <span className="flex-1 text-left">{item.label}</span>
                                        </div>
                                        {item.badge && (
                                            <span
                                                className={`w-5 h-5 flex items-center justify-center text-xs font-semibold rounded-full ${item.active ? "bg-red-500 text-white" : "bg-red-500 text-white"
                                                    }`}
                                            >
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                ))}

                                {/* Logout Button */}
                                <div className="mt-4 pt-4 border-t border-slate-100">
                                    {/* ĐÃ SỬA: Lệnh xóa Storage và đá về trang chủ */}
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem("isLoggedIn");
                                            window.location.href = "/";
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-all duration-200"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        <span className="font-medium">Đăng xuất</span>
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </motion.aside>

                    {/* Main Content */}
                    <main className="w-full lg:w-3/4">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-6"
                        >
                            {/* Header */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div>
                                        <h1 className="text-2xl font-bold text-slate-800">Thông báo</h1>
                                        <p className="text-slate-500 mt-1">
                                            Bạn có <span className="text-teal-600 font-semibold">{unreadCount}</span> thông báo chưa đọc
                                        </p>
                                    </div>
                                    {unreadCount > 0 && (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={markAllAsRead}
                                            className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-2xl transition-colors"
                                        >
                                            <CheckCheck className="w-5 h-5" />
                                            <span>Đánh dấu tất cả đã đọc</span>
                                        </motion.button>
                                    )}
                                </div>
                            </motion.div>

                            {/* Notifications List */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
                            >
                                <AnimatePresence mode="popLayout">
                                    {notifications.length > 0 ? (
                                        notifications.map((notification, index) => {
                                            const { icon: Icon, bgColor, iconColor } = getNotificationIcon(notification.type)
                                            return (
                                                <motion.div
                                                    key={notification.id}
                                                    layout
                                                    variants={itemVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    className={`p-5 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors ${!notification.isRead ? "bg-teal-50/30" : ""
                                                        }`}
                                                >
                                                    <div className="flex gap-4">
                                                        {/* Icon */}
                                                        <div className={`w-12 h-12 ${bgColor} rounded-2xl flex items-center justify-center shrink-0`}>
                                                            <Icon className={`w-6 h-6 ${iconColor}`} />
                                                        </div>

                                                        {/* Content */}
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-start justify-between gap-4">
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-2">
                                                                        <h3 className="font-semibold text-slate-800">{notification.title}</h3>
                                                                        {!notification.isRead && (
                                                                            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                                                                        )}
                                                                    </div>
                                                                    <p className="text-slate-600 mt-1 text-sm leading-relaxed">
                                                                        {notification.message}
                                                                    </p>
                                                                    <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                                                                        <Clock className="w-3.5 h-3.5" />
                                                                        <span>{notification.time}</span>
                                                                    </div>
                                                                </div>

                                                                {/* Actions */}
                                                                <div className="flex items-center gap-2">
                                                                    {!notification.isRead && (
                                                                        <motion.button
                                                                            whileHover={{ scale: 1.1 }}
                                                                            whileTap={{ scale: 0.9 }}
                                                                            onClick={() => markAsRead(notification.id)}
                                                                            className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-colors"
                                                                            title="Đánh dấu đã đọc"
                                                                        >
                                                                            <CheckCheck className="w-5 h-5" />
                                                                        </motion.button>
                                                                    )}
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.1 }}
                                                                        whileTap={{ scale: 0.9 }}
                                                                        onClick={() => deleteNotification(notification.id)}
                                                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                                                        title="Xóa thông báo"
                                                                    >
                                                                        <Trash2 className="w-5 h-5" />
                                                                    </motion.button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )
                                        })
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="py-16 text-center"
                                        >
                                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Bell className="w-10 h-10 text-slate-400" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-slate-800 mb-2">Không có thông báo</h3>
                                            <p className="text-slate-500">Bạn đã đọc hết tất cả thông báo</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* Notification Settings Card */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6"
                            >
                                <h2 className="text-lg font-semibold text-slate-800 mb-4">Tùy chỉnh thông báo</h2>
                                <div className="space-y-4">
                                    {[
                                        { label: "Thông báo chuyến đi", desc: "Nhận nhắc nhở về các chuyến đi sắp tới", enabled: true },
                                        { label: "Khuyến mãi & Ưu đãi", desc: "Nhận thông tin về các chương trình giảm giá", enabled: true },
                                        { label: "Cập nhật hệ thống", desc: "Thông báo về bảo mật và chính sách", enabled: false },
                                    ].map((setting, index) => (
                                        <div key={index} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
                                            <div>
                                                <h4 className="font-medium text-slate-800">{setting.label}</h4>
                                                <p className="text-sm text-slate-500">{setting.desc}</p>
                                            </div>
                                            <button
                                                className={`relative w-12 h-7 rounded-full transition-colors ${setting.enabled ? "bg-teal-600" : "bg-slate-300"
                                                    }`}
                                            >
                                                <span
                                                    className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${setting.enabled ? "right-1" : "left-1"
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </main>
                </div>
            </div>
        </div>
    )
}