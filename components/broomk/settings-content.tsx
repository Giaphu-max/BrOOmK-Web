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
    ChevronDown,
    Sun,
    Moon,
    Monitor,
    AlertTriangle,
    Globe,
    Banknote,
    Palette,
    Trash2,
} from "lucide-react"

const menuItems = [
    { label: "Hồ sơ cá nhân", href: "/profile", icon: User },
    { label: "Chuyến đi của tôi", href: "/my-trips", icon: Plane },
    { label: "Phương thức thanh toán", href: "/payment", icon: CreditCard },
    { label: "Thông báo", href: "/notifications", icon: Bell },
    { label: "Cài đặt", href: "/settings", icon: Settings, active: true },
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
            duration: 0.4,
            ease: "easeOut",
        },
    },
}

export default function SettingsContent() {
    const [language, setLanguage] = useState("vi")
    const [currency, setCurrency] = useState("VND")
    const [theme, setTheme] = useState("light")
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
    const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    const languages = [
        { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
        { code: "en", label: "English", flag: "🇺🇸" },
    ]

    const currencies = [
        { code: "VND", label: "VND - Việt Nam Đồng", symbol: "₫" },
        { code: "USD", label: "USD - US Dollar", symbol: "$" },
    ]

    const themes = [
        { id: "light", label: "Sáng", icon: Sun, description: "Giao diện sáng" },
        { id: "dark", label: "Tối", icon: Moon, description: "Giao diện tối" },
        { id: "system", label: "Tự động", icon: Monitor, description: "Theo hệ thống" },
    ]

    const selectedLanguage = languages.find((l) => l.code === language)
    const selectedCurrency = currencies.find((c) => c.code === currency)

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full lg:w-1/4"
                    >
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sticky top-8">
                            {/* User Info */}
                            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-500/30">
                                    GP
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Gia Phú</h3>
                                    <p className="text-sm text-slate-500">giaph@example.com</p>
                                </div>
                            </div>

                            {/* Navigation Menu */}
                            <nav className="mt-6 space-y-2">
                                {menuItems.map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all ${item.active
                                                    ? "bg-teal-50 text-teal-600"
                                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                                                }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span>{item.label}</span>
                                        </Link>
                                    )
                                })}
                            </nav>

                            {/* Logout Button */}
                            <div className="mt-6 pt-6 border-t border-slate-100">
                                <button
                                    onClick={() => {
                                        localStorage.removeItem("isLoggedIn")
                                        window.location.href = "/"
                                    }}
                                    className="flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-red-500 hover:bg-red-50 transition-all w-full"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span>Đăng xuất</span>
                                </button>
                            </div>
                        </div>
                    </motion.aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-6"
                        >
                            {/* Header */}
                            <motion.div variants={itemVariants}>
                                <h1 className="text-2xl font-bold text-slate-800">Cài đặt</h1>
                                <p className="text-slate-500 mt-1">Tùy chỉnh trải nghiệm của bạn trên BrOOmK</p>
                            </motion.div>

                            {/* Display Options */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center">
                                        <Globe className="w-5 h-5 text-teal-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-slate-800">Tùy chọn hiển thị</h2>
                                        <p className="text-sm text-slate-500">Ngôn ngữ và đơn vị tiền tệ</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Language Dropdown */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Ngôn ngữ</label>
                                        <div className="relative">
                                            <button
                                                onClick={() => {
                                                    setShowLanguageDropdown(!showLanguageDropdown)
                                                    setShowCurrencyDropdown(false)
                                                }}
                                                className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl hover:border-teal-300 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xl">{selectedLanguage?.flag}</span>
                                                    <span className="font-medium text-slate-700">{selectedLanguage?.label}</span>
                                                </div>
                                                <ChevronDown
                                                    className={`w-5 h-5 text-slate-400 transition-transform ${showLanguageDropdown ? "rotate-180" : ""}`}
                                                />
                                            </button>

                                            {showLanguageDropdown && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden"
                                                >
                                                    {languages.map((lang) => (
                                                        <button
                                                            key={lang.code}
                                                            onClick={() => {
                                                                setLanguage(lang.code)
                                                                setShowLanguageDropdown(false)
                                                            }}
                                                            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors ${language === lang.code ? "bg-teal-50 text-teal-600" : "text-slate-700"
                                                                }`}
                                                        >
                                                            <span className="text-xl">{lang.flag}</span>
                                                            <span className="font-medium">{lang.label}</span>
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Currency Dropdown */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Tiền tệ</label>
                                        <div className="relative">
                                            <button
                                                onClick={() => {
                                                    setShowCurrencyDropdown(!showCurrencyDropdown)
                                                    setShowLanguageDropdown(false)
                                                }}
                                                className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl hover:border-teal-300 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Banknote className="w-5 h-5 text-teal-600" />
                                                    <span className="font-medium text-slate-700">{selectedCurrency?.label}</span>
                                                </div>
                                                <ChevronDown
                                                    className={`w-5 h-5 text-slate-400 transition-transform ${showCurrencyDropdown ? "rotate-180" : ""}`}
                                                />
                                            </button>

                                            {showCurrencyDropdown && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden"
                                                >
                                                    {currencies.map((curr) => (
                                                        <button
                                                            key={curr.code}
                                                            onClick={() => {
                                                                setCurrency(curr.code)
                                                                setShowCurrencyDropdown(false)
                                                            }}
                                                            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors ${currency === curr.code ? "bg-teal-50 text-teal-600" : "text-slate-700"
                                                                }`}
                                                        >
                                                            <span className="font-bold text-lg w-6">{curr.symbol}</span>
                                                            <span className="font-medium">{curr.label}</span>
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Theme Selection */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center">
                                        <Palette className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-slate-800">Giao diện</h2>
                                        <p className="text-sm text-slate-500">Chọn chế độ hiển thị phù hợp với bạn</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {themes.map((t) => {
                                        const Icon = t.icon
                                        const isActive = theme === t.id
                                        return (
                                            <motion.button
                                                key={t.id}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => setTheme(t.id)}
                                                className={`relative flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${isActive
                                                        ? "border-teal-500 bg-teal-50"
                                                        : "border-slate-200 bg-slate-50 hover:border-slate-300"
                                                    }`}
                                            >
                                                <div
                                                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isActive ? "bg-teal-500 text-white" : "bg-white text-slate-600 shadow-sm"
                                                        }`}
                                                >
                                                    <Icon className="w-6 h-6" />
                                                </div>
                                                <div className="text-center">
                                                    <p className={`font-semibold ${isActive ? "text-teal-700" : "text-slate-700"}`}>
                                                        {t.label}
                                                    </p>
                                                    <p className={`text-sm ${isActive ? "text-teal-600" : "text-slate-500"}`}>
                                                        {t.description}
                                                    </p>
                                                </div>
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="theme-indicator"
                                                        className="absolute top-3 right-3 w-3 h-3 rounded-full bg-teal-500"
                                                    />
                                                )}
                                            </motion.button>
                                        )
                                    })}
                                </div>
                            </motion.div>

                            {/* Danger Zone */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-white rounded-3xl shadow-sm border-2 border-red-100 p-6"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center">
                                        <AlertTriangle className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-red-600">Vùng nguy hiểm</h2>
                                        <p className="text-sm text-slate-500">Các thao tác không thể hoàn tác</p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-red-50 rounded-2xl">
                                    <div>
                                        <h3 className="font-medium text-slate-800">Xóa tài khoản vĩnh viễn</h3>
                                        <p className="text-sm text-slate-500 mt-1">
                                            Tất cả dữ liệu của bạn sẽ bị xóa và không thể khôi phục.
                                        </p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setShowDeleteConfirm(true)}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors whitespace-nowrap"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Yêu cầu xóa tài khoản
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    </main>
                </div>
            </div>

            {/* Delete Account Confirmation Modal */}
            {showDeleteConfirm && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={() => setShowDeleteConfirm(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-3xl p-6 max-w-md w-full shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full mb-4">
                            <AlertTriangle className="w-8 h-8 text-red-500" />
                        </div>
                        <h3 className="text-xl font-bold text-center text-slate-800 mb-2">
                            Xác nhận xóa tài khoản?
                        </h3>
                        <p className="text-slate-500 text-center mb-6">
                            Hành động này không thể hoàn tác. Tất cả dữ liệu, lịch sử đặt chỗ và điểm thưởng của bạn sẽ bị xóa
                            vĩnh viễn.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors"
                            >
                                Hủy bỏ
                            </button>
                            <button
                                onClick={() => {
                                    localStorage.removeItem("isLoggedIn")
                                    window.location.href = "/"
                                }}
                                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors"
                            >
                                Xóa tài khoản
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    )
}
