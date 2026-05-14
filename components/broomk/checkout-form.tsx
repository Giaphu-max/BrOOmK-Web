"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { motion } from "framer-motion"
import {
    Check,
    CreditCard,
    Building2,
    Wallet,
    MapPin,
    Calendar,
    Users,
    Shield,
    Lock,
    User,
    Mail,
    Phone,
    ArrowLeft,
    ShieldCheck
} from "lucide-react"
import Link from "next/link"

const paymentMethods = [
    {
        id: "credit-card",
        name: "Thẻ tín dụng",
        description: "Visa •••• 4242",
        icon: CreditCard,
        saved: true,
    },
    {
        id: "bank-transfer",
        name: "Chuyển khoản ngân hàng",
        description: "Vietcombank, Techcombank, BIDV...",
        icon: Building2,
        saved: false,
    },
    {
        id: "e-wallet",
        name: "Ví điện tử",
        description: "Momo, ZaloPay, VNPay",
        icon: Wallet,
        saved: false,
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

export default function CheckoutPage() {
    const router = useRouter()
    const params = useParams()
    const activityId = params?.id || "1" // Tự động lấy ID từ URL

    const [selectedPayment, setSelectedPayment] = useState("credit-card")
    const [isProcessing, setIsProcessing] = useState(false) // State xử lý loading
    const [formData, setFormData] = useState({
        fullName: "Nguyễn Gia Phú",
        email: "giaphu@email.com",
        phone: "0912 345 678",
    })

    const bookingDetails = {
        activityName: "Tour Bà Nà Hills - Cầu Vàng",
        date: "Thứ 7, 24/05/2026",
        adults: 2,
        children: 1,
        pricePerAdult: 1200000,
        pricePerChild: 800000,
    }

    const subtotal =
        bookingDetails.adults * bookingDetails.pricePerAdult +
        bookingDetails.children * bookingDetails.pricePerChild
    const taxFee = Math.round(subtotal * 0.1)
    const total = subtotal + taxFee

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN").format(price) + "đ"
    }

    const handlePayment = () => {
        setIsProcessing(true)
        // Giả lập thời gian call API thanh toán 1.5 giây
        setTimeout(() => {
            router.push(`/activities/${activityId}/checkout/success`)
        }, 1500)
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header with Progress */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100"
            >
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between mb-6">
                        <Link
                            href={`/activities/${activityId}`}
                            className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Quay lại</span>
                        </Link>
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <Lock className="w-4 h-4" />
                            <span>Thanh toán an toàn</span>
                        </div>
                    </div>

                    {/* Progress Bar - 2 Bước (Đã làm gọn) */}
                    <div className="flex items-center justify-center py-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-lg shadow-teal-600/30">
                                1
                            </div>
                            <span className="font-bold text-teal-700 hidden sm:block">Điền thông tin</span>
                        </div>

                        <div className="w-12 sm:w-24 h-0.5 bg-slate-200 rounded-full mx-3 sm:mx-6" />

                        <div className="flex items-center gap-3 opacity-50">
                            <div className="w-10 h-10 rounded-2xl bg-slate-200 text-slate-500 flex items-center justify-center font-bold">
                                2
                            </div>
                            <span className="font-medium text-slate-500 hidden sm:block">Xác nhận hoàn tất</span>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid lg:grid-cols-3 gap-8"
                >
                    {/* Left Column - Forms */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Contact Information */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-slate-100"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center">
                                    <User className="w-6 h-6 text-teal-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">
                                        Thông tin liên lạc
                                    </h2>
                                    <p className="text-sm text-slate-500">
                                        Thông tin để nhận xác nhận đặt chỗ
                                    </p>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Họ và tên
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            value={formData.fullName}
                                            onChange={(e) =>
                                                setFormData({ ...formData, fullName: e.target.value })
                                            }
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all text-slate-800"
                                            placeholder="Nhập họ và tên"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all text-slate-800"
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Số điện thoại
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) =>
                                                setFormData({ ...formData, phone: e.target.value })
                                            }
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all text-slate-800"
                                            placeholder="0xxx xxx xxx"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Payment Methods */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-slate-100"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center">
                                    <CreditCard className="w-6 h-6 text-teal-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">
                                        Phương thức thanh toán
                                    </h2>
                                    <p className="text-sm text-slate-500">
                                        Chọn cách bạn muốn thanh toán
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {paymentMethods.map((method) => (
                                    <motion.button
                                        key={method.id}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={() => setSelectedPayment(method.id)}
                                        className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center gap-4 text-left ${selectedPayment === method.id
                                            ? "border-teal-500 bg-teal-50/50"
                                            : "border-slate-200 hover:border-slate-300 bg-white"
                                            }`}
                                    >
                                        <div
                                            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${selectedPayment === method.id
                                                ? "bg-teal-600 text-white"
                                                : "bg-slate-100 text-slate-600"
                                                }`}
                                        >
                                            <method.icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-slate-800">
                                                    {method.name}
                                                </span>
                                                {method.saved && (
                                                    <span className="px-2 py-0.5 text-xs font-medium bg-teal-100 text-teal-700 rounded-full">
                                                        Đã lưu
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-sm text-slate-500">
                                                {method.description}
                                            </span>
                                        </div>
                                        <div
                                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPayment === method.id
                                                ? "border-teal-600 bg-teal-600"
                                                : "border-slate-300"
                                                }`}
                                        >
                                            {selectedPayment === method.id && (
                                                <Check className="w-4 h-4 text-white" />
                                            )}
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            {/* E-wallet options */}
                            {selectedPayment === "e-wallet" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="mt-4 grid grid-cols-3 gap-3"
                                >
                                    {["Momo", "ZaloPay", "VNPay"].map((wallet) => (
                                        <button
                                            key={wallet}
                                            className="p-4 rounded-xl border-2 border-slate-200 hover:border-teal-500 transition-all bg-white"
                                        >
                                            <div className="text-center">
                                                <div
                                                    className={`w-12 h-12 mx-auto mb-2 rounded-xl flex items-center justify-center ${wallet === "Momo"
                                                        ? "bg-pink-100"
                                                        : wallet === "ZaloPay"
                                                            ? "bg-blue-100"
                                                            : "bg-red-100"
                                                        }`}
                                                >
                                                    <Wallet
                                                        className={`w-6 h-6 ${wallet === "Momo"
                                                            ? "text-pink-600"
                                                            : wallet === "ZaloPay"
                                                                ? "text-blue-600"
                                                                : "text-red-600"
                                                            }`}
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-slate-700">
                                                    {wallet}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </motion.div>
                            )}

                            {/* Security Badge */}
                            <div className="mt-6 flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                                <Shield className="w-5 h-5 text-teal-600 shrink-0" />
                                <span className="text-sm text-slate-600">
                                    Thông tin thanh toán của bạn được mã hóa và bảo mật theo tiêu
                                    chuẩn quốc tế PCI DSS
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Booking Summary */}
                    <div className="lg:col-span-1">
                        <motion.div
                            variants={itemVariants}
                            className="sticky top-36 bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100"
                        >
                            <h2 className="text-xl font-bold text-slate-800 mb-6">
                                Tóm tắt đặt chỗ
                            </h2>

                            {/* Activity Info */}
                            <div className="flex gap-4 pb-5 border-b border-slate-100">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white overflow-hidden shrink-0">
                                    <img
                                        src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&h=200&fit=crop"
                                        alt="Bà Nà Hills"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-slate-800 leading-tight">
                                        {bookingDetails.activityName}
                                    </h3>
                                    <div className="flex items-center gap-1 mt-1 text-sm text-slate-500">
                                        <MapPin className="w-4 h-4" />
                                        <span>Đà Nẵng</span>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Details */}
                            <div className="py-5 border-b border-slate-100 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                                        <Calendar className="w-5 h-5 text-slate-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Ngày tham quan</p>
                                        <p className="font-medium text-slate-800">
                                            {bookingDetails.date}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                                        <Users className="w-5 h-5 text-slate-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Số lượng khách</p>
                                        <p className="font-medium text-slate-800">
                                            {bookingDetails.adults} người lớn,{" "}
                                            {bookingDetails.children} trẻ em
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="py-5 border-b border-slate-100 space-y-3">
                                <div className="flex justify-between text-slate-600">
                                    <span>
                                        Người lớn x {bookingDetails.adults}
                                    </span>
                                    <span>
                                        {formatPrice(
                                            bookingDetails.adults * bookingDetails.pricePerAdult
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>
                                        Trẻ em x {bookingDetails.children}
                                    </span>
                                    <span>
                                        {formatPrice(
                                            bookingDetails.children * bookingDetails.pricePerChild
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Tạm tính</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Thuế & Phí dịch vụ</span>
                                    <span>{formatPrice(taxFee)}</span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="py-5">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-slate-800">
                                        Tổng thanh toán
                                    </span>
                                    <span className="text-2xl font-bold text-teal-600">
                                        {formatPrice(total)}
                                    </span>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={!isProcessing ? { scale: 1.02 } : {}}
                                whileTap={!isProcessing ? { scale: 0.98 } : {}}
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className={`w-full py-4 px-6 rounded-2xl font-semibold text-white shadow-lg flex items-center justify-center gap-2 transition-all ${isProcessing
                                        ? "bg-teal-400 cursor-not-allowed shadow-none"
                                        : "bg-gradient-to-r from-teal-500 to-teal-600 hover:shadow-xl hover:shadow-teal-500/40"
                                    }`}
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                        Đang xử lý...
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck className="w-5 h-5" />
                                        Xác nhận & Thanh toán
                                    </>
                                )}
                            </motion.button>

                            {/* Terms */}
                            <p className="mt-4 text-xs text-center text-slate-500">
                                Bằng việc nhấn thanh toán, bạn đồng ý với{" "}
                                <a href="#" className="text-teal-600 hover:underline">
                                    Điều khoản sử dụng
                                </a>{" "}
                                và{" "}
                                <a href="#" className="text-teal-600 hover:underline">
                                    Chính sách bảo mật
                                </a>{" "}
                                của chúng tôi.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </main>
        </div>
    )
}