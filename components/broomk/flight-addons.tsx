"use client"

import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Plane,
    Clock,
    Luggage,
    UtensilsCrossed,
    Shield,
    Check,
    Plus,
    Minus,
    ArrowRight,
    Briefcase,
    ShieldCheck,
    Heart,
    Stethoscope,
    Car,
    ChevronRight,
} from "lucide-react"

// Dữ liệu hành lý
const luggageOptions = [
    { id: "luggage-15", weight: 15, price: 200000, popular: false },
    { id: "luggage-20", weight: 20, price: 250000, popular: true },
    { id: "luggage-25", weight: 25, price: 320000, popular: false },
    { id: "luggage-30", weight: 30, price: 400000, popular: false },
    { id: "luggage-40", weight: 40, price: 550000, popular: false },
]

// Dữ liệu suất ăn
const mealOptions = [
    {
        id: "meal-1",
        name: "Cơm gà xào nấm",
        description: "Cơm trắng, gà xào nấm, rau cải",
        price: 85000,
        image: "🍛",
        category: "Cơm",
    },
    {
        id: "meal-2",
        name: "Mì Ý sốt bò bằm",
        description: "Spaghetti sốt cà chua, thịt bò bằm",
        price: 95000,
        image: "🍝",
        category: "Mì",
    },
    {
        id: "meal-3",
        name: "Phở bò tái",
        description: "Phở bò truyền thống Việt Nam",
        price: 75000,
        image: "🍜",
        category: "Phở",
    },
    {
        id: "meal-4",
        name: "Sandwich gà nướng",
        description: "Bánh mì sandwich, gà nướng, rau xà lách",
        price: 65000,
        image: "🥪",
        category: "Bánh mì",
    },
    {
        id: "meal-5",
        name: "Cơm chiên hải sản",
        description: "Cơm chiên tôm, mực, rau củ",
        price: 90000,
        image: "🍚",
        category: "Cơm",
    },
    {
        id: "meal-6",
        name: "Salad cá hồi",
        description: "Rau xanh tươi, cá hồi hun khói",
        price: 110000,
        image: "🥗",
        category: "Salad",
    },
]

// Dữ liệu bảo hiểm
const insuranceOption = {
    id: "insurance-travel",
    name: "Bảo hiểm du lịch toàn diện",
    price: 150000,
    benefits: [
        { icon: Stethoscope, text: "Chi phí y tế lên đến 500 triệu VNĐ" },
        { icon: Briefcase, text: "Bồi thường hành lý thất lạc 20 triệu VNĐ" },
        { icon: Car, text: "Hỗ trợ tai nạn giao thông 100 triệu VNĐ" },
        { icon: Heart, text: "Hỗ trợ 24/7 trong suốt chuyến đi" },
    ],
}

// Thông tin chuyến bay mẫu (sẽ nhận từ props trong thực tế)
const flightInfo = {
    from: "Hà Nội",
    fromCode: "HAN",
    to: "TP. Hồ Chí Minh",
    toCode: "SGN",
    date: "15/05/2026",
    departureTime: "06:00",
    arrivalTime: "08:10",
    airline: "Vietnam Airlines",
    flightNumber: "VN207",
    basePrice: 1450000,
    seatFee: 150000,
    selectedSeat: "12A",
}

type TabType = "luggage" | "meals" | "insurance"

export default function AddonsSelection() {
    const [activeTab, setActiveTab] = useState<TabType>("luggage")
    const [selectedLuggage, setSelectedLuggage] = useState<string | null>(null)
    const [mealQuantities, setMealQuantities] = useState<Record<string, number>>({})
    const [insuranceEnabled, setInsuranceEnabled] = useState(false)

    // Tính tổng tiền dịch vụ bổ sung
    const calculateAddonsTotal = () => {
        let total = 0

        // Hành lý
        if (selectedLuggage) {
            const luggage = luggageOptions.find((l) => l.id === selectedLuggage)
            if (luggage) total += luggage.price
        }

        // Suất ăn
        Object.entries(mealQuantities).forEach(([mealId, quantity]) => {
            const meal = mealOptions.find((m) => m.id === mealId)
            if (meal && quantity > 0) total += meal.price * quantity
        })

        // Bảo hiểm
        if (insuranceEnabled) {
            total += insuranceOption.price
        }

        return total
    }

    const addonsTotal = calculateAddonsTotal()
    const grandTotal = flightInfo.basePrice + flightInfo.seatFee + addonsTotal

    // Format tiền VNĐ
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN").format(price) + "đ"
    }

    // Xử lý tăng/giảm số lượng suất ăn
    const handleMealQuantityChange = (mealId: string, delta: number) => {
        setMealQuantities((prev) => {
            const current = prev[mealId] || 0
            const newQuantity = Math.max(0, Math.min(5, current + delta))
            if (newQuantity === 0) {
                const { [mealId]: _, ...rest } = prev
                return rest
            }
            return { ...prev, [mealId]: newQuantity }
        })
    }

    // Lấy danh sách dịch vụ đã chọn
    const getSelectedAddons = () => {
        const addons: { name: string; price: number }[] = []

        if (selectedLuggage) {
            const luggage = luggageOptions.find((l) => l.id === selectedLuggage)
            if (luggage) {
                addons.push({ name: `Hành lý +${luggage.weight}kg`, price: luggage.price })
            }
        }

        Object.entries(mealQuantities).forEach(([mealId, quantity]) => {
            const meal = mealOptions.find((m) => m.id === mealId)
            if (meal && quantity > 0) {
                addons.push({ name: `${meal.name} x${quantity}`, price: meal.price * quantity })
            }
        })

        if (insuranceEnabled) {
            addons.push({ name: "Bảo hiểm du lịch", price: insuranceOption.price })
        }

        return addons
    }

    const tabs = [
        { id: "luggage" as TabType, label: "Hành lý ký gửi", icon: Luggage },
        { id: "meals" as TabType, label: "Suất ăn nóng", icon: UtensilsCrossed },
        { id: "insurance" as TabType, label: "Bảo hiểm du lịch", icon: Shield },
    ]

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Tiêu đề trang */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Dịch vụ bổ sung</h1>
                    <p className="mt-2 text-gray-600">
                        Tùy chọn thêm hành lý, suất ăn và bảo hiểm cho chuyến bay của bạn
                    </p>
                </motion.div>

                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Cột trái - Danh sách dịch vụ */}
                    <div className="flex-1">
                        {/* Tabs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 overflow-hidden rounded-2xl border border-gray-100 bg-white/80 p-2 shadow-lg backdrop-blur-xl"
                        >
                            <div className="flex gap-2">
                                {tabs.map((tab) => (
                                    <motion.button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`relative flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab.id
                                            ? "text-white"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                            }`}
                                        whileHover={{ scale: activeTab === tab.id ? 1 : 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {activeTab === tab.id && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 rounded-xl bg-teal-600"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <tab.icon className="relative z-10 h-5 w-5" />
                                        <span className="relative z-10 hidden sm:inline">{tab.label}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Nội dung Tab */}
                        <AnimatePresence mode="wait">
                            {/* Tab Hành lý */}
                            {activeTab === "luggage" && (
                                <motion.div
                                    key="luggage"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4"
                                >
                                    <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-lg backdrop-blur-xl">
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
                                                <Luggage className="h-5 w-5 text-teal-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Hành lý ký gửi</h3>
                                                <p className="text-sm text-gray-500">Hành lý xách tay 7kg đã bao gồm</p>
                                            </div>
                                        </div>

                                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                            {luggageOptions.map((option) => (
                                                <motion.button
                                                    key={option.id}
                                                    onClick={() =>
                                                        setSelectedLuggage(selectedLuggage === option.id ? null : option.id)
                                                    }
                                                    className={`relative overflow-hidden rounded-xl border-2 p-4 text-left transition-all ${selectedLuggage === option.id
                                                        ? "border-teal-600 bg-teal-50"
                                                        : "border-gray-200 bg-white hover:border-gray-300"
                                                        }`}
                                                    whileHover={{ scale: 1.02, y: -2 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    {option.popular && (
                                                        <span className="absolute right-2 top-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                                                            Phổ biến
                                                        </span>
                                                    )}
                                                    <div className="mb-2 flex items-center gap-2">
                                                        <Briefcase
                                                            className={`h-8 w-8 ${selectedLuggage === option.id ? "text-teal-600" : "text-gray-400"
                                                                }`}
                                                        />
                                                        {selectedLuggage === option.id && (
                                                            <motion.div
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-600"
                                                            >
                                                                <Check className="h-3 w-3 text-white" />
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                    <p className="text-lg font-bold text-gray-900">+{option.weight}kg</p>
                                                    <p className="text-sm font-semibold text-teal-600">
                                                        {formatPrice(option.price)}
                                                    </p>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Tab Suất ăn */}
                            {activeTab === "meals" && (
                                <motion.div
                                    key="meals"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4"
                                >
                                    <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-lg backdrop-blur-xl">
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
                                                <UtensilsCrossed className="h-5 w-5 text-teal-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Suất ăn nóng</h3>
                                                <p className="text-sm text-gray-500">Phục vụ trên chuyến bay</p>
                                            </div>
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {mealOptions.map((meal) => {
                                                const quantity = mealQuantities[meal.id] || 0
                                                return (
                                                    <motion.div
                                                        key={meal.id}
                                                        className={`overflow-hidden rounded-xl border-2 transition-all ${quantity > 0
                                                            ? "border-teal-600 bg-teal-50/50"
                                                            : "border-gray-200 bg-white"
                                                            }`}
                                                        whileHover={{ scale: 1.01 }}
                                                    >
                                                        <div className="flex items-center gap-4 p-4">
                                                            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 text-3xl">
                                                                {meal.image}
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="font-semibold text-gray-900">{meal.name}</h4>
                                                                <p className="text-xs text-gray-500">{meal.description}</p>
                                                                <p className="mt-1 font-semibold text-teal-600">
                                                                    {formatPrice(meal.price)}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <motion.button
                                                                    onClick={() => handleMealQuantityChange(meal.id, -1)}
                                                                    className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${quantity > 0
                                                                        ? "bg-teal-600 text-white hover:bg-teal-700"
                                                                        : "bg-gray-100 text-gray-400"
                                                                        }`}
                                                                    whileHover={{ scale: quantity > 0 ? 1.1 : 1 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                    disabled={quantity === 0}
                                                                >
                                                                    <Minus className="h-4 w-4" />
                                                                </motion.button>
                                                                <span className="w-6 text-center font-semibold text-gray-900">
                                                                    {quantity}
                                                                </span>
                                                                <motion.button
                                                                    onClick={() => handleMealQuantityChange(meal.id, 1)}
                                                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white transition-colors hover:bg-teal-700"
                                                                    whileHover={{ scale: 1.1 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                >
                                                                    <Plus className="h-4 w-4" />
                                                                </motion.button>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Tab Bảo hiểm */}
                            {activeTab === "insurance" && (
                                <motion.div
                                    key="insurance"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4"
                                >
                                    <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-lg backdrop-blur-xl">
                                        <div className="mb-6 flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg">
                                                    <ShieldCheck className="h-6 w-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{insuranceOption.name}</h3>
                                                    <p className="text-lg font-bold text-teal-600">
                                                        {formatPrice(insuranceOption.price)}
                                                        <span className="text-sm font-normal text-gray-500">/người</span>
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Toggle Switch */}
                                            <motion.button
                                                onClick={() => setInsuranceEnabled(!insuranceEnabled)}
                                                className={`relative h-8 w-14 rounded-full transition-colors ${insuranceEnabled ? "bg-teal-600" : "bg-gray-300"
                                                    }`}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <motion.div
                                                    className="absolute top-1 h-6 w-6 rounded-full bg-white shadow-md"
                                                    animate={{ left: insuranceEnabled ? "calc(100% - 28px)" : "4px" }}
                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                />
                                            </motion.button>
                                        </div>

                                        <div className="rounded-xl bg-gradient-to-br from-teal-50 to-emerald-50 p-4">
                                            <h4 className="mb-3 font-medium text-gray-900">Quyền lợi bảo hiểm:</h4>
                                            <div className="grid gap-3 sm:grid-cols-2">
                                                {insuranceOption.benefits.map((benefit, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className="flex items-center gap-3 rounded-lg bg-white/80 p-3"
                                                    >
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100">
                                                            <benefit.icon className="h-4 w-4 text-teal-600" />
                                                        </div>
                                                        <span className="text-sm text-gray-700">{benefit.text}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {insuranceEnabled && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="mt-4 overflow-hidden"
                                                >
                                                    <div className="flex items-center gap-2 rounded-lg bg-teal-100 p-3 text-teal-800">
                                                        <Check className="h-5 w-5" />
                                                        <span className="text-sm font-medium">
                                                            Bảo hiểm du lịch đã được thêm vào đơn hàng
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Cột phải - Tóm tắt thanh toán (Sticky) */}
                    <div className="w-full lg:sticky lg:top-8 lg:w-[35%] lg:self-start">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-4"
                        >
                            {/* Thông tin chuyến bay */}
                            <div className="rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-lg backdrop-blur-xl">
                                <h3 className="mb-4 font-semibold text-gray-900">Thông tin chuyến bay</h3>

                                <div className="mb-4 flex items-center justify-between">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-gray-900">{flightInfo.fromCode}</p>
                                        <p className="text-sm text-gray-500">{flightInfo.from}</p>
                                    </div>
                                    <div className="flex flex-1 items-center justify-center px-4">
                                        <div className="h-px flex-1 bg-gray-300" />
                                        <Plane className="mx-2 h-5 w-5 rotate-90 text-teal-600" />
                                        <div className="h-px flex-1 bg-gray-300" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-gray-900">{flightInfo.toCode}</p>
                                        <p className="text-sm text-gray-500">{flightInfo.to}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Clock className="h-4 w-4 text-teal-600" />
                                        <span>
                                            {flightInfo.departureTime} - {flightInfo.arrivalTime}
                                        </span>
                                    </div>
                                    <div className="text-right text-gray-600">
                                        <span className="font-medium">{flightInfo.flightNumber}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Chi tiết chi phí */}
                            <div className="rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-lg backdrop-blur-xl">
                                <h3 className="mb-4 font-semibold text-gray-900">Chi tiết chi phí</h3>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Giá vé cơ bản</span>
                                        <span className="font-medium text-gray-900">
                                            {formatPrice(flightInfo.basePrice)}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Phụ phí chọn ghế ({flightInfo.selectedSeat})</span>
                                        <span className="font-medium text-gray-900">
                                            {formatPrice(flightInfo.seatFee)}
                                        </span>
                                    </div>

                                    {/* Danh sách dịch vụ bổ sung */}
                                    <AnimatePresence>
                                        {getSelectedAddons().map((addon, index) => (
                                            <motion.div
                                                key={addon.name}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="flex items-center justify-between text-sm"
                                            >
                                                <span className="text-teal-600">{addon.name}</span>
                                                <span className="font-medium text-teal-600">{formatPrice(addon.price)}</span>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>

                                    <div className="border-t border-gray-200 pt-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Thuế & phí</span>
                                            <span className="text-sm text-gray-500">Đã bao gồm</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Tổng tiền */}
                                <div className="mt-4 rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-gray-900">Tổng cộng</span>
                                        <span className="text-2xl font-bold text-teal-600">{formatPrice(grandTotal)}</span>
                                    </div>
                                </div>

                                {/* Nút CTA */}
                                <Link href="/flights/checkout" className="w-full block">
                                    <motion.button
                                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-4 text-white font-bold shadow-lg shadow-teal-600/20"
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span>Điền thông tin hành khách</span>
                                        <ArrowRight className="h-5 w-5" />
                                    </motion.button>
                                </Link>

                                <p className="mt-3 text-center text-xs text-gray-500">
                                    Bạn có thể bỏ qua và thêm dịch vụ sau
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    )
}
