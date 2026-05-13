"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import {
    Plane,
    Mail,
    Phone,
    User,
    Check,
    CreditCard,
    Calendar,
    IdCard,
    ChevronDown,
    Shield,
    Clock,
    MapPin,
    Armchair,
    UtensilsCrossed,
    Luggage,
    QrCode,
    Wallet,
    CheckCircle2,
    Lock,
    ArrowRight,
    Sparkles,
} from "lucide-react"

// Mock data cho đơn hàng
const orderSummary = {
    flight: {
        from: "Hà Nội",
        fromCode: "HAN",
        to: "TP. Hồ Chí Minh",
        toCode: "SGN",
        date: "15/05/2026",
        departureTime: "06:00",
        arrivalTime: "08:10",
        airline: "Vietnam Airlines",
        flightNumber: "VN219",
        aircraft: "Airbus A321",
    },
    seats: ["12A", "12B"],
    addons: {
        baggage: "23kg",
        meals: ["Phở bò", "Cơm gà"],
        insurance: true,
    },
    pricing: {
        basePrice: 2580000,
        seatFee: 150000,
        baggageFee: 350000,
        mealsFee: 190000,
        insuranceFee: 89000,
        tax: 516000,
    },
}

const paymentMethods = [
    {
        id: "qr",
        name: "Chuyển khoản QR",
        description: "Quét mã QR thanh toán ngay",
        icon: QrCode,
        color: "bg-blue-500",
        popular: true,
    },
    {
        id: "momo",
        name: "Ví MoMo",
        description: "Thanh toán qua ví điện tử MoMo",
        icon: Wallet,
        color: "bg-pink-500",
        popular: false,
    },
    {
        id: "card",
        name: "Thẻ tín dụng/ghi nợ",
        description: "Visa, Mastercard, JCB",
        icon: CreditCard,
        color: "bg-purple-500",
        popular: false,
    },
]

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

export default function Checkout() {
    const [contactInfo, setContactInfo] = useState({
        email: "",
        phone: "",
    })

    const [passengers, setPassengers] = useState([
        { id: 1, name: "", gender: "", dob: "", idNumber: "" },
        { id: 2, name: "", gender: "", dob: "", idNumber: "" },
    ])

    const [selectedPayment, setSelectedPayment] = useState("qr")
    const [agreedToTerms, setAgreedToTerms] = useState(false)

    const updatePassenger = (id: number, field: string, value: string) => {
        setPassengers((prev) =>
            prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
        )
    }

    const totalPrice =
        orderSummary.pricing.basePrice * 2 +
        orderSummary.pricing.seatFee +
        orderSummary.pricing.baggageFee +
        orderSummary.pricing.mealsFee +
        orderSummary.pricing.insuranceFee +
        orderSummary.pricing.tax

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN").format(price) + "đ"
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 lg:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Progress Steps */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-center gap-2 sm:gap-4">
                        {[
                            { step: 1, label: "Chọn chuyến" },
                            { step: 2, label: "Chọn ghế" },
                            { step: 3, label: "Dịch vụ" },
                            { step: 4, label: "Thanh toán" },
                        ].map((item, index) => (
                            <div key={item.step} className="flex items-center gap-2 sm:gap-4">
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${item.step <= 4
                                            ? "bg-teal-600 text-white"
                                            : "bg-gray-200 text-gray-500"
                                            }`}
                                    >
                                        {item.step < 4 ? (
                                            <CheckCircle2 className="h-5 w-5" />
                                        ) : (
                                            item.step
                                        )}
                                    </div>
                                    <span
                                        className={`hidden text-sm font-medium sm:block ${item.step <= 4 ? "text-teal-600" : "text-gray-400"
                                            }`}
                                    >
                                        {item.label}
                                    </span>
                                </div>
                                {index < 3 && (
                                    <div
                                        className={`h-0.5 w-8 sm:w-16 ${item.step < 4 ? "bg-teal-600" : "bg-gray-200"
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Page Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8 text-center"
                >
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        Thông tin hành khách & <span className="text-teal-600">Thanh toán</span>
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Vui lòng điền đầy đủ thông tin để hoàn tất đặt vé
                    </p>
                </motion.div>

                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Left Column - Forms */}
                    <div className="flex-1 space-y-6">
                        {/* Contact Information */}
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5 }}
                            className="overflow-hidden rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-lg backdrop-blur-xl"
                        >
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
                                    <Mail className="h-5 w-5 text-teal-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Thông tin liên hệ
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Vé điện tử sẽ được gửi qua email này
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            value={contactInfo.email}
                                            onChange={(e) =>
                                                setContactInfo({ ...contactInfo, email: e.target.value })
                                            }
                                            placeholder="email@example.com"
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-12 pr-4 text-gray-900 transition-all placeholder:text-gray-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Số điện thoại <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="tel"
                                            value={contactInfo.phone}
                                            onChange={(e) =>
                                                setContactInfo({ ...contactInfo, phone: e.target.value })
                                            }
                                            placeholder="0912 345 678"
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-12 pr-4 text-gray-900 transition-all placeholder:text-gray-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Passenger Information */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="space-y-4"
                        >
                            {passengers.map((passenger, index) => (
                                <motion.div
                                    key={passenger.id}
                                    variants={fadeInUp}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="overflow-hidden rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-lg backdrop-blur-xl"
                                >
                                    <div className="mb-6 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
                                            <User className="h-5 w-5 text-teal-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900">
                                                Hành khách {passenger.id}
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                Ghế {orderSummary.seats[index]} • Người lớn
                                            </p>
                                        </div>
                                        {index === 0 && (
                                            <span className="ml-auto rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-600">
                                                Người đặt vé
                                            </span>
                                        )}
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="sm:col-span-2">
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Họ và tên (như trên CCCD) <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={passenger.name}
                                                    onChange={(e) =>
                                                        updatePassenger(passenger.id, "name", e.target.value)
                                                    }
                                                    placeholder="NGUYEN VAN A"
                                                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-12 pr-4 uppercase text-gray-900 transition-all placeholder:text-gray-400 placeholder:normal-case focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Giới tính <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={passenger.gender}
                                                    onChange={(e) =>
                                                        updatePassenger(passenger.id, "gender", e.target.value)
                                                    }
                                                    className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-4 pr-10 text-gray-900 transition-all focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                                >
                                                    <option value="">Chọn giới tính</option>
                                                    <option value="male">Nam</option>
                                                    <option value="female">Nữ</option>
                                                    <option value="other">Khác</option>
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Ngày sinh <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Calendar className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="date"
                                                    value={passenger.dob}
                                                    onChange={(e) =>
                                                        updatePassenger(passenger.id, "dob", e.target.value)
                                                    }
                                                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-12 pr-4 text-gray-900 transition-all focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Số CCCD / Hộ chiếu <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <IdCard className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={passenger.idNumber}
                                                    onChange={(e) =>
                                                        updatePassenger(passenger.id, "idNumber", e.target.value)
                                                    }
                                                    placeholder="001234567890"
                                                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-12 pr-4 text-gray-900 transition-all placeholder:text-gray-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Payment Methods */}
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5 }}
                            className="overflow-hidden rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-lg backdrop-blur-xl"
                        >
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
                                    <CreditCard className="h-5 w-5 text-teal-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Phương thức thanh toán
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Chọn cách thanh toán phù hợp với bạn
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {paymentMethods.map((method) => {
                                    const Icon = method.icon
                                    const isSelected = selectedPayment === method.id

                                    return (
                                        <motion.button
                                            key={method.id}
                                            onClick={() => setSelectedPayment(method.id)}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            className={`relative w-full rounded-xl border-2 p-4 text-left transition-all ${isSelected
                                                ? "border-teal-500 bg-teal-50/50"
                                                : "border-gray-100 bg-gray-50/50 hover:border-gray-200 hover:bg-gray-50"
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${method.color}`}
                                                >
                                                    <Icon className="h-6 w-6 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold text-gray-900">
                                                            {method.name}
                                                        </span>
                                                        {method.popular && (
                                                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                                                                Phổ biến
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-500">
                                                        {method.description}
                                                    </p>
                                                </div>
                                                <div
                                                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${isSelected
                                                        ? "border-teal-500 bg-teal-500"
                                                        : "border-gray-300"
                                                        }`}
                                                >
                                                    {isSelected && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            className="h-2 w-2 rounded-full bg-white"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </motion.button>
                                    )
                                })}
                            </div>

                            {/* Security Note */}
                            <div className="mt-4 flex items-start gap-3 rounded-xl bg-green-50 p-4">
                                <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                                <div>
                                    <p className="text-sm font-medium text-green-800">
                                        Thanh toán an toàn & bảo mật
                                    </p>
                                    <p className="text-xs text-green-600">
                                        Mọi giao dịch được mã hóa SSL 256-bit và tuân thủ tiêu chuẩn PCI DSS
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Terms Agreement */}
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5 }}
                            className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-lg backdrop-blur-xl"
                        >
                            <div
                                className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors"
                                onClick={() => setAgreedToTerms(!agreedToTerms)}
                            >
                                <div className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all ${agreedToTerms
                                    ? "bg-teal-600 border-teal-600"
                                    : "bg-white border-slate-300"
                                    }`}>
                                    {agreedToTerms && <Check className="h-3.5 w-3.5 text-white" strokeWidth={4} />}
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Tôi đã đọc và đồng ý với{" "}
                                        <span className="font-medium text-teal-600 hover:underline">Điều khoản sử dụng</span>,{" "}
                                        <span className="font-medium text-teal-600 hover:underline">Chính sách bảo mật</span>{" "}
                                        và{" "}
                                        <span className="font-medium text-teal-600 hover:underline">Điều kiện vận chuyển</span>{" "}
                                        của hãng hàng không.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Order Summary (Sticky) */}
                    <div className="lg:w-[35%]">
                        <div className="lg:sticky lg:top-8">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="overflow-hidden rounded-2xl border border-gray-100 bg-white/80 shadow-xl backdrop-blur-xl"
                            >
                                {/* Header */}
                                <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-5 text-white">
                                    <h2 className="flex items-center gap-2 text-lg font-semibold">
                                        <Sparkles className="h-5 w-5" />
                                        Tóm tắt đơn hàng
                                    </h2>
                                </div>

                                <div className="p-5">
                                    {/* Flight Info */}
                                    <div className="mb-5 rounded-xl bg-gray-50 p-4">
                                        <div className="mb-3 flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-500">
                                                {orderSummary.flight.date}
                                            </span>
                                            <span className="rounded-full bg-teal-50 px-2 py-1 text-xs font-medium text-teal-600">
                                                {orderSummary.flight.flightNumber}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="text-center">
                                                <p className="text-xl font-bold text-gray-900">
                                                    {orderSummary.flight.departureTime}
                                                </p>
                                                <p className="text-sm font-medium text-gray-500">
                                                    {orderSummary.flight.fromCode}
                                                </p>
                                            </div>

                                            <div className="flex flex-1 flex-col items-center">
                                                <div className="flex w-full items-center gap-1">
                                                    <div className="h-2 w-2 rounded-full bg-teal-500" />
                                                    <div className="h-0.5 flex-1 bg-gradient-to-r from-teal-500 to-teal-300" />
                                                    <Plane className="h-4 w-4 rotate-90 text-teal-500" />
                                                    <div className="h-0.5 flex-1 bg-gradient-to-r from-teal-300 to-teal-500" />
                                                    <div className="h-2 w-2 rounded-full bg-teal-500" />
                                                </div>
                                                <span className="mt-1 text-xs text-gray-400">2h 10m</span>
                                            </div>

                                            <div className="text-center">
                                                <p className="text-xl font-bold text-gray-900">
                                                    {orderSummary.flight.arrivalTime}
                                                </p>
                                                <p className="text-sm font-medium text-gray-500">
                                                    {orderSummary.flight.toCode}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3">
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-6 w-6 items-center justify-center rounded bg-yellow-100">
                                                    <span className="text-xs font-bold text-yellow-700">VN</span>
                                                </div>
                                                <span className="text-sm text-gray-600">
                                                    {orderSummary.flight.airline}
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-400">
                                                {orderSummary.flight.aircraft}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Selected Items */}
                                    <div className="mb-5 space-y-3">
                                        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100">
                                                <Armchair className="h-4 w-4 text-teal-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">Chỗ ngồi</p>
                                                <p className="text-xs text-gray-500">
                                                    Ghế {orderSummary.seats.join(", ")}
                                                </p>
                                            </div>
                                            <span className="text-sm font-semibold text-gray-900">
                                                {formatPrice(orderSummary.pricing.seatFee)}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
                                                <Luggage className="h-4 w-4 text-orange-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">Hành lý</p>
                                                <p className="text-xs text-gray-500">
                                                    {orderSummary.addons.baggage} ký gửi
                                                </p>
                                            </div>
                                            <span className="text-sm font-semibold text-gray-900">
                                                {formatPrice(orderSummary.pricing.baggageFee)}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
                                                <UtensilsCrossed className="h-4 w-4 text-red-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">Suất ăn</p>
                                                <p className="text-xs text-gray-500">
                                                    {orderSummary.addons.meals.join(", ")}
                                                </p>
                                            </div>
                                            <span className="text-sm font-semibold text-gray-900">
                                                {formatPrice(orderSummary.pricing.mealsFee)}
                                            </span>
                                        </div>

                                        {orderSummary.addons.insurance && (
                                            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                                                    <Shield className="h-4 w-4 text-blue-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900">Bảo hiểm</p>
                                                    <p className="text-xs text-gray-500">Bảo hiểm du lịch toàn diện</p>
                                                </div>
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {formatPrice(orderSummary.pricing.insuranceFee)}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Price Breakdown */}
                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Giá vé (x2 người)</span>
                                                <span className="text-gray-900">
                                                    {formatPrice(orderSummary.pricing.basePrice * 2)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Dịch vụ bổ sung</span>
                                                <span className="text-gray-900">
                                                    {formatPrice(
                                                        orderSummary.pricing.seatFee +
                                                        orderSummary.pricing.baggageFee +
                                                        orderSummary.pricing.mealsFee +
                                                        orderSummary.pricing.insuranceFee
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Thuế & phí</span>
                                                <span className="text-gray-900">
                                                    {formatPrice(orderSummary.pricing.tax)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                                            <span className="text-lg font-semibold text-gray-900">
                                                Tổng cộng
                                            </span>
                                            <span className="text-2xl font-bold text-teal-600">
                                                {formatPrice(totalPrice)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <Link
                                        href="/flights/success"
                                        className={`w-full block ${!agreedToTerms ? "pointer-events-none" : ""}`}
                                    >
                                        <motion.button
                                            whileHover={agreedToTerms ? { scale: 1.02 } : {}}
                                            whileTap={agreedToTerms ? { scale: 0.98 } : {}}
                                            disabled={!agreedToTerms}
                                            className={`mt-6 flex w-full items-center justify-center gap-3 rounded-xl py-4 font-bold transition-all shadow-lg ${agreedToTerms
                                                ? "bg-teal-600 text-white shadow-teal-600/30 hover:bg-teal-700"
                                                : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                                                }`}
                                        >
                                            <Lock className="h-5 w-5 text-current" />
                                            <span className={agreedToTerms ? "text-white" : "text-gray-400"}>Thanh toán ngay</span>
                                            <ArrowRight className="h-5 w-5 text-current" />
                                        </motion.button>
                                    </Link>

                                    <p className="mt-3 text-center text-xs text-gray-400">
                                        Bạn sẽ được chuyển đến trang thanh toán bảo mật
                                    </p>
                                </div>
                            </motion.div>

                            {/* Support Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="mt-4 rounded-xl bg-amber-50 p-4"
                            >
                                <div className="flex items-start gap-3">
                                    <Phone className="mt-0.5 h-5 w-5 text-amber-600" />
                                    <div>
                                        <p className="text-sm font-medium text-amber-800">
                                            Cần hỗ trợ? Gọi ngay
                                        </p>
                                        <p className="text-lg font-bold text-amber-700">1900 1234</p>
                                        <p className="text-xs text-amber-600">
                                            Hotline 24/7 - Miễn phí cuộc gọi
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
