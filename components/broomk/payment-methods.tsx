"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
    User,
    Plane,
    CreditCard,
    Bell,
    Settings,
    LogOut,
    Plus,
    Hotel,
    CheckCircle,
    Trash2,
} from "lucide-react"

const menuItems = [
    { icon: User, label: "Hồ sơ cá nhân", href: "/profile", active: false },
    { icon: Plane, label: "Chuyến đi của tôi", href: "/my-trips", active: false }, // ĐÃ SỬA THÀNH /my-trips
    { icon: CreditCard, label: "Phương thức thanh toán", href: "/payment", active: true },
    { icon: Bell, label: "Thông báo", href: "/notifications", active: false, badge: 3 },
    { icon: Settings, label: "Cài đặt", href: "/settings", active: false },
]

const transactions = [
    {
        id: 1,
        type: "flight",
        title: "Thanh toán vé máy bay Đà Nẵng",
        date: "12/05/2026",
        amount: -2500000,
        status: "success",
    },
    {
        id: 2,
        type: "hotel",
        title: "Đặt phòng Vinpearl Nha Trang",
        date: "10/05/2026",
        amount: -4200000,
        status: "success",
    },
    {
        id: 3,
        type: "flight",
        title: "Vé máy bay Hà Nội - Phú Quốc",
        date: "05/05/2026",
        amount: -1850000,
        status: "success",
    },
    {
        id: 4,
        type: "hotel",
        title: "Khách sạn Mường Thanh Đà Lạt",
        date: "28/04/2026",
        amount: -1650000,
        status: "success",
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
    hidden: { opacity: 0, scale: 0.9, rotateY: -10 },
    visible: {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
}

function formatCurrency(amount: number) {
    return new Intl.NumberFormat("vi-VN").format(Math.abs(amount)) + " VND"
}

export default function PaymentMethods() {
    const [cards] = useState([
        {
            id: 1,
            number: "**** **** **** 2026",
            holder: "NGUYEN GIA PHU",
            expiry: "12/28",
            type: "visa",
            isDefault: true,
        },
    ])

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
                                    {/* ĐÃ SỬA: Nút đăng xuất xóa state và đá về trang chủ */}
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem("isLoggedIn");
                                            window.location.href = "/";
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
                                Phương thức thanh toán
                            </h1>
                            <p className="text-slate-600">
                                Quản lý thẻ và xem lịch sử giao dịch của bạn
                            </p>
                        </motion.div>

                        {/* My Cards Section */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-3xl p-6 shadow-sm"
                        >
                            <h2 className="text-lg font-semibold text-slate-900 mb-6">
                                Thẻ của tôi
                            </h2>

                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Credit Card - Glassmorphism */}
                                {cards.map((card) => (
                                    <motion.div
                                        key={card.id}
                                        variants={cardVariants}
                                        className="relative w-full lg:w-80 h-48 rounded-3xl overflow-hidden group"
                                        style={{ perspective: "1000px" }}
                                    >
                                        {/* Glassmorphism Background */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/90 via-teal-600/85 to-teal-700/90 backdrop-blur-xl" />

                                        {/* Glass Shine Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/5" />

                                        {/* Decorative Circles */}
                                        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-md" />
                                        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/10 blur-md" />

                                        {/* Card Content */}
                                        <div className="relative h-full p-6 flex flex-col justify-between text-white">
                                            {/* Top Row - Chip & Logo */}
                                            <div className="flex items-start justify-between">
                                                {/* Chip */}
                                                <div className="w-12 h-9 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-400 flex items-center justify-center">
                                                    <div className="w-8 h-6 rounded border border-yellow-500/50 bg-gradient-to-br from-yellow-300 to-yellow-200" />
                                                </div>

                                                {/* Visa Logo */}
                                                {card.type === "visa" && (
                                                    <svg className="h-8" viewBox="0 0 100 32" fill="white">
                                                        <path d="M40.3 0l-6.4 31h-6.3l6.4-31h6.3zm26.7 20.2l3.3-9.1 1.9 9.1h-5.2zm7 10.8h5.8l-5.1-31h-5.4c-1.2 0-2.2.7-2.7 1.8l-9.4 29.2h6.6l1.3-3.6h8l.9 3.6zm-16.7-10.1c0-8.2-11.3-8.6-11.3-12.3 0-1.1 1.1-2.3 3.4-2.6 1.2-.1 4.3-.3 7.9 1.4l1.4-6.5c-1.9-.7-4.4-1.4-7.5-1.4-7.9 0-13.5 4.2-13.5 10.3 0 4.5 4 7 7 8.5 3.1 1.5 4.2 2.5 4.2 3.9 0 2.1-2.5 3-4.8 3-4.1.1-6.4-1.1-8.3-2l-1.5 6.8c1.9.9 5.4 1.6 9 1.7 8.4 0 13.9-4.2 14-10.8zM25.5 0L14.1 31H7.5L1.8 5.5C1.5 4.1.4 3.2 0 2.7l10.5-.1-.1.1c1.9.4 4 1.1 5.3 1.8.8.4 1 .8 1.3 1.9L21.8 31h6.6L32 0h-6.5z" />
                                                    </svg>
                                                )}
                                            </div>

                                            {/* Card Number */}
                                            <div className="text-xl font-medium tracking-[0.2em] text-white/95">
                                                {card.number}
                                            </div>

                                            {/* Bottom Row - Name & Expiry */}
                                            <div className="flex items-end justify-between">
                                                <div>
                                                    <p className="text-[10px] uppercase text-white/60 mb-1">
                                                        Chủ thẻ
                                                    </p>
                                                    <p className="text-sm font-medium tracking-wide">
                                                        {card.holder}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] uppercase text-white/60 mb-1">
                                                        Hết hạn
                                                    </p>
                                                    <p className="text-sm font-medium">{card.expiry}</p>
                                                </div>
                                            </div>

                                            {/* Default Badge */}
                                            {card.isDefault && (
                                                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-white/20 rounded-full text-xs">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Mặc định
                                                </div>
                                            )}
                                        </div>

                                        {/* Hover Actions */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                            <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                                                <Trash2 className="w-5 h-5 text-white" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Add New Card Button */}
                                <motion.button
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full lg:w-80 h-48 rounded-3xl border-2 border-dashed border-teal-300 bg-teal-50/50 flex flex-col items-center justify-center gap-3 text-teal-600 hover:border-teal-400 hover:bg-teal-50 transition-all duration-200"
                                >
                                    <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center">
                                        <Plus className="w-7 h-7" />
                                    </div>
                                    <span className="font-medium">Thêm thẻ mới</span>
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Recent Transactions */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-3xl p-6 shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-slate-900">
                                    Lịch sử giao dịch gần đây
                                </h2>
                                <button className="text-teal-600 font-medium text-sm hover:underline">
                                    Xem tất cả
                                </button>
                            </div>

                            <div className="space-y-4">
                                {transactions.map((transaction, index) => (
                                    <motion.div
                                        key={transaction.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.4 }}
                                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors duration-200"
                                    >
                                        {/* Icon */}
                                        <div
                                            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${transaction.type === "flight"
                                                    ? "bg-blue-100 text-blue-600"
                                                    : "bg-amber-100 text-amber-600"
                                                }`}
                                        >
                                            {transaction.type === "flight" ? (
                                                <Plane className="w-6 h-6" />
                                            ) : (
                                                <Hotel className="w-6 h-6" />
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-slate-900 truncate">
                                                {transaction.title}
                                            </h4>
                                            <p className="text-sm text-slate-500">{transaction.date}</p>
                                        </div>

                                        {/* Amount & Status */}
                                        <div className="text-right">
                                            <p className="font-semibold text-slate-900">
                                                -{formatCurrency(transaction.amount)}
                                            </p>
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                                <CheckCircle className="w-3 h-3" />
                                                Thành công
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </main>
                </motion.div>
            </div>
        </div>
    )
}