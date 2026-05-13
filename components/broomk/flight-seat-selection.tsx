"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Plane,
    ArrowRight,
    Clock,
    Star,
    Info,
    Check,
    X,
    Users,
    CreditCard,
    ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Định nghĩa kiểu ghế
type SeatStatus = "available" | "selected" | "occupied" | "vip"

interface Seat {
    id: string
    row: number
    column: string
    status: SeatStatus
    price: number
}

// Thông tin chuyến bay
const flightInfo = {
    airline: "Vietnam Airlines",
    flightNumber: "VN201",
    departure: { city: "Hà Nội", code: "HAN", time: "06:00" },
    arrival: { city: "TP.HCM", code: "SGN", time: "08:10" },
    date: "20/05/2026",
    duration: "2h 10m",
    aircraft: "Airbus A321",
    basePrice: 1850000,
}

// Tạo sơ đồ ghế
const generateSeats = (): Seat[] => {
    const seats: Seat[] = []
    const columns = ["A", "B", "C", "D", "E", "F"]
    const totalRows = 20

    for (let row = 1; row <= totalRows; row++) {
        for (const col of columns) {
            let status: SeatStatus = "available"
            let price = 0

            // Ghế VIP (hàng 1-3)
            if (row <= 3) {
                status = Math.random() > 0.6 ? "occupied" : "vip"
                price = 350000
            }
            // Ghế thường
            else {
                const rand = Math.random()
                if (rand > 0.75) status = "occupied"
                price = row <= 8 ? 150000 : row <= 15 ? 100000 : 50000
            }

            seats.push({
                id: `${row}${col}`,
                row,
                column: col,
                status,
                price,
            })
        }
    }
    return seats
}

const initialSeats = generateSeats()

// Chú thích trạng thái ghế
const seatLegend = [
    { status: "available", label: "Ghế trống", color: "border-gray-300 bg-white" },
    { status: "selected", label: "Đang chọn", color: "bg-teal-600 border-teal-600" },
    { status: "occupied", label: "Đã đặt", color: "bg-gray-300 border-gray-300" },
    { status: "vip", label: "Thương gia", color: "border-amber-400 bg-amber-50" },
]

export default function SeatSelection() {
    const [seats, setSeats] = useState<Seat[]>(initialSeats)
    const [selectedSeats, setSelectedSeats] = useState<string[]>([])
    const [passengerCount] = useState(1)
    const [isMounted, setIsMounted] = useState(false) // 1. Thêm công tắc

    useEffect(() => {
        setIsMounted(true)
    }, []) // 2. Bật công tắc sau khi web đã load xong

    if (!isMounted) return null // 3. Tạm thời hiển thị màn hình trống chờ load

    const handleSeatClick = (seatId: string) => {
        const seat = seats.find((s) => s.id === seatId)
        if (!seat || seat.status === "occupied") return

        // 1. Tính toán danh sách ghế mới sẽ được chọn
        let newSelectedSeats = [...selectedSeats]

        if (newSelectedSeats.includes(seatId)) {
            // Nếu bấm vào ghế đang chọn -> Bỏ chọn
            newSelectedSeats = newSelectedSeats.filter((id) => id !== seatId)
        } else {
            // Nếu bấm vào ghế mới
            if (newSelectedSeats.length >= passengerCount) {
                // TỰ ĐỘNG THẾ CHỖ: Xóa ghế chọn đầu tiên ra khỏi danh sách
                newSelectedSeats.shift()
            }
            // Thêm ghế mới vào
            newSelectedSeats.push(seatId)
        }

        // 2. Cập nhật lại danh sách ID ghế đã chọn
        setSelectedSeats(newSelectedSeats)

        // 3. Quét lại toàn bộ sơ đồ để đổi màu ghế (Xanh/Trống/VIP) dựa trên danh sách mới
        setSeats((prev) =>
            prev.map((s) => {
                if (s.status === "occupied") return s // Ghế người khác mua rồi thì bỏ qua

                const isNowSelected = newSelectedSeats.includes(s.id)
                if (isNowSelected) {
                    return { ...s, status: "selected" }
                } else {
                    // Trả về trạng thái gốc (VIP nếu hàng 1-3, Trống nếu hàng dưới)
                    return { ...s, status: s.row <= 3 ? "vip" : "available" }
                }
            })
        )
    }

    const getSeatPrice = () => {
        return selectedSeats.reduce((total, seatId) => {
            const seat = seats.find((s) => s.id === seatId)
            return total + (seat?.price || 0)
        }, 0)
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price)
    }

    const getSeatClass = (seat: Seat) => {
        const baseClass =
            "w-9 h-9 md:w-10 md:h-10 rounded-lg border-2 flex items-center justify-center text-xs font-medium transition-all cursor-pointer"

        switch (seat.status) {
            case "selected":
                return `${baseClass} bg-teal-600 border-teal-600 text-white shadow-lg shadow-teal-600/30`
            case "occupied":
                return `${baseClass} bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed`
            case "vip":
                return `${baseClass} border-amber-400 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:border-amber-500`
            default:
                return `${baseClass} border-gray-300 bg-white text-gray-600 hover:bg-teal-50 hover:border-teal-400`
        }
    }
    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <section className="py-8 lg:py-12">
                <div className="max-w-6xl mx-auto px-4 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <Users className="w-4 h-4" />
                            Bước 2/3
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-balance">
                            Chọn <span className="text-teal-600">chỗ ngồi</span>
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Chọn vị trí ghế yêu thích của bạn trên máy bay
                        </p>
                    </motion.div>

                    {/* Main Content - 2 Columns */}
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                        {/* Left Column - Seat Map (65%) */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="flex-1"
                        >
                            <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
                                {/* Seat Legend */}
                                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-6 pb-6 border-b border-gray-100">
                                    {seatLegend.map((item) => (
                                        <div key={item.status} className="flex items-center gap-2">
                                            <div
                                                className={`w-6 h-6 rounded-md border-2 ${item.color} ${item.status === "vip" ? "relative" : ""
                                                    }`}
                                            >
                                                {item.status === "vip" && (
                                                    <Star className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
                                                )}
                                            </div>
                                            <span className="text-sm text-gray-600">{item.label}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Aircraft Container */}
                                <div className="relative max-w-md mx-auto">
                                    {/* Aircraft Nose */}
                                    <div className="relative mx-auto mb-4">
                                        <div className="w-full h-24 bg-gradient-to-b from-gray-100 to-gray-50 rounded-t-[100px] border-2 border-gray-200 border-b-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <Plane className="w-8 h-8 text-teal-600 mx-auto mb-1" />
                                                <p className="text-xs text-gray-500 font-medium">
                                                    {flightInfo.aircraft}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Seat Map Container */}
                                    <div className="bg-gradient-to-b from-gray-50 to-gray-100 border-2 border-gray-200 border-t-0 rounded-b-3xl px-4 py-6 overflow-hidden">
                                        {/* Exit Row Indicator - Front */}
                                        <div className="flex items-center justify-center gap-2 mb-4 py-2 bg-green-50 rounded-lg">
                                            <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                                                <ArrowRight className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-xs text-green-700 font-medium">
                                                Lối ra khẩn cấp
                                            </span>
                                            <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center rotate-180">
                                                <ArrowRight className="w-3 h-3 text-white" />
                                            </div>
                                        </div>

                                        {/* Column Headers */}
                                        <div className="flex justify-center gap-1 md:gap-2 mb-3">
                                            <div className="w-9 md:w-10"></div>
                                            {["A", "B", "C"].map((col) => (
                                                <div
                                                    key={col}
                                                    className="w-9 h-6 md:w-10 flex items-center justify-center text-xs font-bold text-gray-400"
                                                >
                                                    {col}
                                                </div>
                                            ))}
                                            <div className="w-8 md:w-10 flex items-center justify-center text-xs text-gray-400">
                                                Lối đi
                                            </div>
                                            {["D", "E", "F"].map((col) => (
                                                <div
                                                    key={col}
                                                    className="w-9 h-6 md:w-10 flex items-center justify-center text-xs font-bold text-gray-400"
                                                >
                                                    {col}
                                                </div>
                                            ))}
                                            <div className="w-9 md:w-10"></div>
                                        </div>

                                        {/* Seats Grid */}
                                        <div className="space-y-2">
                                            {Array.from({ length: 20 }, (_, rowIndex) => {
                                                const row = rowIndex + 1
                                                const rowSeats = seats.filter((s) => s.row === row)
                                                const leftSeats = rowSeats.filter((s) =>
                                                    ["A", "B", "C"].includes(s.column)
                                                )
                                                const rightSeats = rowSeats.filter((s) =>
                                                    ["D", "E", "F"].includes(s.column)
                                                )

                                                const isVipSection = row <= 3
                                                const isExitRow = row === 10

                                                return (
                                                    <div key={row}>
                                                        {/* VIP Section Divider */}
                                                        {row === 4 && (
                                                            <div className="flex items-center gap-2 my-4 px-4">
                                                                <div className="flex-1 h-px bg-gray-300"></div>
                                                                <span className="text-xs text-gray-400 font-medium px-2">
                                                                    Hạng phổ thông
                                                                </span>
                                                                <div className="flex-1 h-px bg-gray-300"></div>
                                                            </div>
                                                        )}

                                                        {/* Exit Row Indicator */}
                                                        {isExitRow && (
                                                            <div className="flex items-center justify-center gap-2 my-3 py-2 bg-green-50 rounded-lg">
                                                                <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                                                                    <ArrowRight className="w-3 h-3 text-white" />
                                                                </div>
                                                                <span className="text-xs text-green-700 font-medium">
                                                                    Lối ra khẩn cấp
                                                                </span>
                                                                <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center rotate-180">
                                                                    <ArrowRight className="w-3 h-3 text-white" />
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div className="flex justify-center items-center gap-1 md:gap-2">
                                                            {/* Row Number Left */}
                                                            <div className="w-9 md:w-10 text-center text-xs font-medium text-gray-400">
                                                                {row}
                                                            </div>

                                                            {/* Left Seats (A, B, C) */}
                                                            {leftSeats.map((seat) => (
                                                                <motion.button
                                                                    key={seat.id}
                                                                    onClick={() => handleSeatClick(seat.id)}
                                                                    disabled={seat.status === "occupied"}
                                                                    className={getSeatClass(seat)}
                                                                    whileHover={
                                                                        seat.status !== "occupied"
                                                                            ? { scale: 1.1, y: -2 }
                                                                            : {}
                                                                    }
                                                                    whileTap={
                                                                        seat.status !== "occupied"
                                                                            ? { scale: 0.95 }
                                                                            : {}
                                                                    }
                                                                    title={`Ghế ${seat.id} - ${formatPrice(seat.price)}`}
                                                                >
                                                                    {seat.status === "selected" ? (
                                                                        <Check className="w-4 h-4" />
                                                                    ) : seat.status === "occupied" ? (
                                                                        <X className="w-4 h-4" />
                                                                    ) : seat.status === "vip" ? (
                                                                        <Star className="w-3 h-3" />
                                                                    ) : (
                                                                        seat.column
                                                                    )}
                                                                </motion.button>
                                                            ))}

                                                            {/* Aisle */}
                                                            <div className="w-8 md:w-10 flex items-center justify-center">
                                                                <div className="w-full h-px bg-gray-200"></div>
                                                            </div>

                                                            {/* Right Seats (D, E, F) */}
                                                            {rightSeats.map((seat) => (
                                                                <motion.button
                                                                    key={seat.id}
                                                                    onClick={() => handleSeatClick(seat.id)}
                                                                    disabled={seat.status === "occupied"}
                                                                    className={getSeatClass(seat)}
                                                                    whileHover={
                                                                        seat.status !== "occupied"
                                                                            ? { scale: 1.1, y: -2 }
                                                                            : {}
                                                                    }
                                                                    whileTap={
                                                                        seat.status !== "occupied"
                                                                            ? { scale: 0.95 }
                                                                            : {}
                                                                    }
                                                                    title={`Ghế ${seat.id} - ${formatPrice(seat.price)}`}
                                                                >
                                                                    {seat.status === "selected" ? (
                                                                        <Check className="w-4 h-4" />
                                                                    ) : seat.status === "occupied" ? (
                                                                        <X className="w-4 h-4" />
                                                                    ) : seat.status === "vip" ? (
                                                                        <Star className="w-3 h-3" />
                                                                    ) : (
                                                                        seat.column
                                                                    )}
                                                                </motion.button>
                                                            ))}

                                                            {/* Row Number Right */}
                                                            <div className="w-9 md:w-10 text-center text-xs font-medium text-gray-400">
                                                                {row}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        {/* Aircraft Tail */}
                                        <div className="mt-6 mx-auto w-3/4 h-8 bg-gradient-to-t from-gray-200 to-gray-100 rounded-b-full"></div>
                                    </div>
                                </div>

                                {/* Price Guide */}
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Info className="w-4 h-4 text-teal-600" />
                                        <span className="text-sm font-medium text-gray-700">
                                            Phụ phí chọn ghế
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        <div className="bg-amber-50 rounded-xl p-3 text-center">
                                            <p className="text-xs text-amber-600 mb-1">Thương gia</p>
                                            <p className="font-bold text-amber-700">350.000 VND</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-3 text-center">
                                            <p className="text-xs text-gray-500 mb-1">Hàng 4-8</p>
                                            <p className="font-bold text-gray-700">150.000 VND</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-3 text-center">
                                            <p className="text-xs text-gray-500 mb-1">Hàng 9-15</p>
                                            <p className="font-bold text-gray-700">100.000 VND</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-3 text-center">
                                            <p className="text-xs text-gray-500 mb-1">Hàng 16-20</p>
                                            <p className="font-bold text-gray-700">50.000 VND</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column - Booking Summary (35%) - Sticky */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="w-full lg:w-[35%]"
                        >
                            <div className="lg:sticky lg:top-6 space-y-6">
                                {/* Flight Summary Card */}
                                <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Plane className="w-5 h-5 text-teal-600" />
                                        <h3 className="font-bold text-gray-900">Thông tin chuyến bay</h3>
                                    </div>

                                    {/* Flight Route */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex-1 text-center">
                                            <p className="text-2xl font-bold text-gray-900">
                                                {flightInfo.departure.code}
                                            </p>
                                            <p className="text-sm text-gray-500">{flightInfo.departure.city}</p>
                                            <p className="text-lg font-semibold text-teal-600 mt-1">
                                                {flightInfo.departure.time}
                                            </p>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center mb-1">
                                                <ArrowRight className="w-4 h-4 text-teal-600" />
                                            </div>
                                            <p className="text-xs text-gray-400">{flightInfo.duration}</p>
                                        </div>

                                        <div className="flex-1 text-center">
                                            <p className="text-2xl font-bold text-gray-900">
                                                {flightInfo.arrival.code}
                                            </p>
                                            <p className="text-sm text-gray-500">{flightInfo.arrival.city}</p>
                                            <p className="text-lg font-semibold text-teal-600 mt-1">
                                                {flightInfo.arrival.time}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Flight Details */}
                                    <div className="space-y-3 pt-4 border-t border-gray-100">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">Hãng bay</span>
                                            <span className="font-medium text-gray-900">
                                                {flightInfo.airline}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">Số hiệu</span>
                                            <span className="font-medium text-gray-900">
                                                {flightInfo.flightNumber}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">Ngày bay</span>
                                            <span className="font-medium text-gray-900">{flightInfo.date}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">Máy bay</span>
                                            <span className="font-medium text-gray-900">
                                                {flightInfo.aircraft}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Selected Seats Card */}
                                <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-5 h-5 text-teal-600" />
                                            <h3 className="font-bold text-gray-900">Ghế đã chọn</h3>
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            {selectedSeats.length}/{passengerCount} hành khách
                                        </span>
                                    </div>

                                    <AnimatePresence mode="popLayout">
                                        {selectedSeats.length > 0 ? (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="space-y-3"
                                            >
                                                {selectedSeats.map((seatId, index) => {
                                                    const seat = seats.find((s) => s.id === seatId)
                                                    return (
                                                        <motion.div
                                                            key={seatId}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: 20 }}
                                                            className="flex items-center justify-between bg-teal-50 rounded-xl p-3"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
                                                                    {seatId}
                                                                </div>
                                                                <div>
                                                                    <p className="font-medium text-gray-900">
                                                                        Hành khách {index + 1}
                                                                    </p>
                                                                    <p className="text-xs text-gray-500">
                                                                        {seat && seat.row <= 3
                                                                            ? "Hạng thương gia"
                                                                            : "Hạng phổ thông"}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="font-bold text-teal-600">
                                                                    +{formatPrice(seat?.price || 0)}
                                                                </p>
                                                            </div>
                                                        </motion.div>
                                                    )
                                                })}
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-center py-8"
                                            >
                                                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                                    <Users className="w-8 h-8 text-gray-400" />
                                                </div>
                                                <p className="text-gray-500 text-sm">
                                                    Chưa chọn ghế nào
                                                </p>
                                                <p className="text-gray-400 text-xs mt-1">
                                                    Nhấn vào ghế trống trên sơ đồ để chọn
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Payment Summary Card */}
                                <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100">
                                    <div className="flex items-center gap-2 mb-4">
                                        <CreditCard className="w-5 h-5 text-teal-600" />
                                        <h3 className="font-bold text-gray-900">Chi tiết thanh toán</h3>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Giá vé cơ bản</span>
                                            <span className="font-medium text-gray-900">
                                                {formatPrice(flightInfo.basePrice)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Phụ phí chọn ghế</span>
                                            <span className="font-medium text-gray-900">
                                                {selectedSeats.length > 0
                                                    ? `+${formatPrice(getSeatPrice())}`
                                                    : "0 VND"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Thuế & phí</span>
                                            <span className="font-medium text-gray-900">
                                                {formatPrice(350000)}
                                            </span>
                                        </div>

                                        <div className="pt-3 mt-3 border-t border-gray-100">
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-bold text-gray-900">
                                                    Tổng cộng
                                                </span>
                                                <span className="text-2xl font-bold text-teal-600">
                                                    {formatPrice(
                                                        flightInfo.basePrice + getSeatPrice() + 350000
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <Link href="/flights/addons" className="w-full block">
                                        <Button
                                            disabled={selectedSeats.length < passengerCount}
                                            className="w-full h-14 mt-6 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-lg font-semibold rounded-xl shadow-lg shadow-teal-600/30 transition-all"
                                        >
                                            <span>Xác nhận & Tiếp tục</span>
                                            <ChevronRight className="w-5 h-5 ml-2" />
                                        </Button>
                                    </Link>

                                    {selectedSeats.length < passengerCount && (
                                        <p className="text-center text-sm text-gray-500 mt-3">
                                            Vui lòng chọn ghế để tiếp tục
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    )
}
