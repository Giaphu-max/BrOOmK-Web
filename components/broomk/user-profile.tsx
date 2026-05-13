"use client"

import Link from "next/link" // ĐÃ THÊM IMPORT
import { useState } from "react"
import { motion } from "framer-motion"
import {
    User,
    Plane,
    CreditCard,
    Bell,
    Settings,
    LogOut,
    Zap,
    MapPin,
    Crown,
    Mail,
    Phone,
    MapPinned,
    ShieldCheck,
    Lock,
    Camera,
    Pencil,
    Check,
    X,
} from "lucide-react"

// ĐÃ SỬA: Thêm href vào mảng này
const menuItems = [
    { icon: User, label: "Hồ sơ cá nhân", active: true, href: "/profile" },
    { icon: Plane, label: "Chuyến đi của tôi", active: false, href: "/my-trips" },
    { icon: CreditCard, label: "Phương thức thanh toán", active: false, href: "/payment" },
    { icon: Bell, label: "Thông báo", active: false, badge: 3, href: "/notifications" },
    { icon: Settings, label: "Cài đặt", active: false, href: "/settings" },
]

const stats = [
    {
        icon: Zap,
        value: "2,500",
        label: "Điểm thưởng",
        color: "text-amber-500",
        bgColor: "bg-amber-50",
    },
    {
        icon: MapPin,
        value: "12",
        label: "Chuyến đi",
        color: "text-teal-600",
        bgColor: "bg-teal-50",
    },
    {
        icon: Crown,
        value: "Vàng",
        label: "Hạng thành viên",
        color: "text-yellow-500",
        bgColor: "bg-yellow-50",
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

export default function UserProfile() {
    const [isEditing, setIsEditing] = useState(false)
    const [userInfo, setUserInfo] = useState({
        fullName: "Nguyễn Gia Phú",
        email: "giaphu@example.com",
        phone: "0912 345 678",
        address: "Hà Nội, Việt Nam",
    })
    const [editedInfo, setEditedInfo] = useState(userInfo)

    const handleSave = () => {
        setUserInfo(editedInfo)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setEditedInfo(userInfo)
        setIsEditing(false)
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
                                {/* ĐÃ SỬA: Thay button bằng Link */}
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
                        {/* Stats Grid */}
                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    variants={itemVariants}
                                    className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`w-12 h-12 ${stat.bgColor} rounded-2xl flex items-center justify-center`}
                                        >
                                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-slate-900">
                                                {stat.value}
                                            </p>
                                            <p className="text-sm text-slate-500">{stat.label}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Personal Info */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-3xl p-6 shadow-sm"
                        >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="relative group">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-3xl font-bold">
                                            GP
                                        </div>
                                        <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <Camera className="w-6 h-6 text-white" />
                                        </button>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">
                                            Gia Phú
                                        </h2>
                                        <button className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1 mt-1">
                                            <Camera className="w-4 h-4" />
                                            Đổi ảnh đại diện
                                        </button>
                                    </div>
                                </div>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-xl hover:bg-teal-100 transition-colors duration-200 font-medium"
                                    >
                                        <Pencil className="w-4 h-4" />
                                        Chỉnh sửa
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleCancel}
                                            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors duration-200 font-medium"
                                        >
                                            <X className="w-4 h-4" />
                                            Hủy
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors duration-200 font-medium"
                                        >
                                            <Check className="w-4 h-4" />
                                            Lưu
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-500">
                                        <User className="w-4 h-4" />
                                        Họ tên đầy đủ
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedInfo.fullName}
                                            onChange={(e) =>
                                                setEditedInfo({ ...editedInfo, fullName: e.target.value })
                                            }
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                                        />
                                    ) : (
                                        <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">
                                            {userInfo.fullName}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-500">
                                        <Mail className="w-4 h-4" />
                                        Email
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={editedInfo.email}
                                            onChange={(e) =>
                                                setEditedInfo({ ...editedInfo, email: e.target.value })
                                            }
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                                        />
                                    ) : (
                                        <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">
                                            {userInfo.email}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-500">
                                        <Phone className="w-4 h-4" />
                                        Số điện thoại
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            value={editedInfo.phone}
                                            onChange={(e) =>
                                                setEditedInfo({ ...editedInfo, phone: e.target.value })
                                            }
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                                        />
                                    ) : (
                                        <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">
                                            {userInfo.phone}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-500">
                                        <MapPinned className="w-4 h-4" />
                                        Địa chỉ
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedInfo.address}
                                            onChange={(e) =>
                                                setEditedInfo({ ...editedInfo, address: e.target.value })
                                            }
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                                        />
                                    ) : (
                                        <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">
                                            {userInfo.address}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Security Section */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-3xl p-6 shadow-sm"
                        >
                            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-teal-600" />
                                Bảo mật tài khoản
                            </h3>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">Xác thực Email</p>
                                        <p className="text-sm text-green-600 flex items-center gap-1">
                                            <Check className="w-4 h-4" />
                                            Đã xác thực
                                        </p>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-600 rounded-xl hover:bg-slate-300 transition-colors duration-200 font-medium">
                                    <Lock className="w-4 h-4" />
                                    Đổi mật khẩu
                                </button>
                            </div>
                        </motion.div>
                    </main>
                </motion.div>
            </div>
        </div>
    )
}