"use client"

import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Plane,
    MapPin,
    Calendar,
    Users,
    Search,
    ArrowRight,
    Clock,
    ArrowRightLeft,
    ChevronDown,
    Star,
    Briefcase,
    Wifi,
    Coffee,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

// Mock data cho các sân bay phổ biến
const airports = [
    { code: "HAN", name: "Hà Nội", airport: "Sân bay Nội Bài" },
    { code: "SGN", name: "TP. Hồ Chí Minh", airport: "Sân bay Tân Sơn Nhất" },
    { code: "DAD", name: "Đà Nẵng", airport: "Sân bay Đà Nẵng" },
    { code: "PQC", name: "Phú Quốc", airport: "Sân bay Phú Quốc" },
    { code: "CXR", name: "Nha Trang", airport: "Sân bay Cam Ranh" },
]

// Mock data cho loại vé
const ticketTypes = [
    { id: "economy", label: "Phổ thông", icon: Users },
    { id: "business", label: "Thương gia", icon: Briefcase },
]

// Mock data cho kết quả chuyến bay
const flightResults = [
    {
        id: 1,
        airline: "Vietnam Airlines",
        logo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=80&h=80&fit=crop&auto=format",
        flightNumber: "VN201",
        departure: { time: "06:00", city: "Hà Nội", code: "HAN" },
        arrival: { time: "08:10", city: "TP.HCM", code: "SGN" },
        duration: "2h 10m",
        price: 1850000,
        stops: 0,
        amenities: ["wifi", "meal"],
        seatsLeft: 5,
    },
    {
        id: 2,
        airline: "VietJet Air",
        logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=80&h=80&fit=crop&auto=format",
        flightNumber: "VJ123",
        departure: { time: "08:30", city: "Hà Nội", code: "HAN" },
        arrival: { time: "10:45", city: "TP.HCM", code: "SGN" },
        duration: "2h 15m",
        price: 1250000,
        stops: 0,
        amenities: ["meal"],
        seatsLeft: 12,
    },
    {
        id: 3,
        airline: "Bamboo Airways",
        logo: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=80&h=80&fit=crop&auto=format",
        flightNumber: "QH301",
        departure: { time: "10:00", city: "Hà Nội", code: "HAN" },
        arrival: { time: "12:05", city: "TP.HCM", code: "SGN" },
        duration: "2h 05m",
        price: 1650000,
        stops: 0,
        amenities: ["wifi", "meal"],
        seatsLeft: 8,
    },
    {
        id: 4,
        airline: "Vietnam Airlines",
        logo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=80&h=80&fit=crop&auto=format",
        flightNumber: "VN207",
        departure: { time: "14:30", city: "Hà Nội", code: "HAN" },
        arrival: { time: "16:40", city: "TP.HCM", code: "SGN" },
        duration: "2h 10m",
        price: 2100000,
        stops: 0,
        amenities: ["wifi", "meal"],
        seatsLeft: 3,
    },
    {
        id: 5,
        airline: "VietJet Air",
        logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=80&h=80&fit=crop&auto=format",
        flightNumber: "VJ189",
        departure: { time: "17:00", city: "Hà Nội", code: "HAN" },
        arrival: { time: "19:20", city: "TP.HCM", code: "SGN" },
        duration: "2h 20m",
        price: 1450000,
        stops: 0,
        amenities: ["wifi"],
        seatsLeft: 15,
    },
    {
        id: 6,
        airline: "Bamboo Airways",
        logo: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=80&h=80&fit=crop&auto=format",
        flightNumber: "QH305",
        departure: { time: "20:15", city: "Hà Nội", code: "HAN" },
        arrival: { time: "22:25", city: "TP.HCM", code: "SGN" },
        duration: "2h 10m",
        price: 1550000,
        stops: 0,
        amenities: ["wifi", "meal"],
        seatsLeft: 7,
    },
]

export default function FlightBooking() {
    const [selectedTicketType, setSelectedTicketType] = useState("economy")
    const [showResults, setShowResults] = useState(true)
    const [selectedFlight, setSelectedFlight] = useState<number | null>(null)

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price)
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section với Search */}
            <section className="relative py-12 lg:py-16">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-10"
                    >
                        <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <Plane className="w-4 h-4" />
                            Đặt vé máy bay
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-balance">
                            Tìm chuyến bay{" "}
                            <span className="text-teal-600">tốt nhất</span>
                        </h1>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto text-pretty">
                            So sánh giá từ các hãng hàng không hàng đầu Việt Nam
                        </p>
                    </motion.div>

                    {/* Search Box - Bento Box Style */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
                            {/* Ticket Type Tabs */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {ticketTypes.map((type) => {
                                    const Icon = type.icon
                                    const isActive = selectedTicketType === type.id
                                    return (
                                        <motion.button
                                            key={type.id}
                                            onClick={() => setSelectedTicketType(type.id)}
                                            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                                                ? "text-white"
                                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                                }`}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeTicketType"
                                                    className="absolute inset-0 bg-teal-600 rounded-xl"
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                            <span className="relative z-10 flex items-center gap-2">
                                                <Icon className="w-4 h-4" />
                                                {type.label}
                                            </span>
                                        </motion.button>
                                    )
                                })}
                            </div>

                            {/* Search Fields Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                {/* Điểm đi */}
                                <div className="lg:col-span-2 space-y-2">
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Điểm đi
                                    </label>
                                    <div className="relative">
                                        <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-600" />
                                        <Input
                                            type="text"
                                            placeholder="Hà Nội (HAN)"
                                            defaultValue="Hà Nội (HAN)"
                                            className="pl-10 h-12 bg-gray-50/80 border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-xl"
                                        />
                                    </div>
                                </div>

                                {/* Swap Button */}
                                <div className="hidden lg:flex items-end justify-center pb-1">
                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 180 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-10 h-10 bg-teal-50 hover:bg-teal-100 rounded-full flex items-center justify-center text-teal-600 transition-colors"
                                    >
                                        <ArrowRightLeft className="w-5 h-5" />
                                    </motion.button>
                                </div>

                                {/* Điểm đến */}
                                <div className="lg:col-span-2 space-y-2">
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Điểm đến
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-600" />
                                        <Input
                                            type="text"
                                            placeholder="TP.HCM (SGN)"
                                            defaultValue="TP.HCM (SGN)"
                                            className="pl-10 h-12 bg-gray-50/80 border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-xl"
                                        />
                                    </div>
                                </div>

                                {/* Ngày bay */}
                                <div className="lg:col-span-2 space-y-2">
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Ngày bay
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-600" />
                                        <Input
                                            type="date"
                                            defaultValue="2026-05-20"
                                            className="pl-10 h-12 bg-gray-50/80 border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-xl"
                                        />
                                    </div>
                                </div>

                                {/* Hành khách */}
                                <div className="lg:col-span-2 space-y-2">
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Hành khách
                                    </label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-600" />
                                        <Input
                                            type="text"
                                            placeholder="1 người lớn"
                                            defaultValue="1 người lớn"
                                            className="pl-10 h-12 bg-gray-50/80 border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-xl"
                                        />
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                </div>

                                {/* Search Button */}
                                <div className="lg:col-span-1 flex items-end">
                                    <Button
                                        onClick={() => setShowResults(true)}
                                        className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-lg shadow-teal-600/30 transition-all"
                                    >
                                        <Search className="w-5 h-5 mr-2" />
                                        Tìm kiếm
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Results Section */}
            <AnimatePresence>
                {showResults && (
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-8 lg:py-12"
                    >
                        <div className="container mx-auto px-4">
                            {/* Results Header */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
                            >
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Chuyến bay có sẵn
                                    </h2>
                                    <p className="text-gray-600">
                                        Hà Nội → TP.HCM • Ngày 20/05/2026 •{" "}
                                        <span className="text-teal-600 font-medium">
                                            {flightResults.length} chuyến bay
                                        </span>
                                    </p>
                                </div>

                                {/* Sort Options */}
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">Sắp xếp theo:</span>
                                    <div className="flex gap-2">
                                        {["Giá thấp nhất", "Sớm nhất", "Nhanh nhất"].map((option, index) => (
                                            <button
                                                key={option}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${index === 0
                                                    ? "bg-teal-600 text-white"
                                                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Flight Cards - Bento Grid */}
                            <div className="grid gap-4">
                                {flightResults.map((flight, index) => (
                                    <motion.div
                                        key={flight.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => setSelectedFlight(selectedFlight === flight.id ? null : flight.id)}
                                        className={`bg-white rounded-2xl p-4 lg:p-6 shadow-lg shadow-gray-100/50 border transition-all cursor-pointer ${selectedFlight === flight.id
                                            ? "border-teal-500 ring-2 ring-teal-500/20"
                                            : "border-gray-100 hover:border-teal-200 hover:shadow-xl"
                                            }`}
                                    >
                                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                                            {/* Airline Info */}
                                            <div className="flex items-center gap-4 lg:w-48">
                                                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                                    <Image
                                                        src={flight.logo}
                                                        alt={flight.airline}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{flight.airline}</p>
                                                    <p className="text-sm text-gray-500">{flight.flightNumber}</p>
                                                </div>
                                            </div>

                                            {/* Flight Time */}
                                            <div className="flex-1 flex items-center justify-between lg:justify-center gap-4 lg:gap-8">
                                                {/* Departure */}
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-gray-900">{flight.departure.time}</p>
                                                    <p className="text-sm text-gray-500">{flight.departure.code}</p>
                                                </div>

                                                {/* Duration */}
                                                <div className="flex-1 max-w-[200px] flex flex-col items-center">
                                                    <p className="text-sm text-gray-500 mb-1">{flight.duration}</p>
                                                    <div className="w-full flex items-center gap-2">
                                                        <div className="h-[2px] flex-1 bg-gray-200"></div>
                                                        <Plane className="w-4 h-4 text-teal-600 rotate-90" />
                                                        <div className="h-[2px] flex-1 bg-gray-200"></div>
                                                    </div>
                                                    <p className="text-xs text-teal-600 mt-1">
                                                        {flight.stops === 0 ? "Bay thẳng" : `${flight.stops} điểm dừng`}
                                                    </p>
                                                </div>

                                                {/* Arrival */}
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-gray-900">{flight.arrival.time}</p>
                                                    <p className="text-sm text-gray-500">{flight.arrival.code}</p>
                                                </div>
                                            </div>

                                            {/* Amenities */}
                                            <div className="hidden lg:flex items-center gap-2 lg:w-24">
                                                {flight.amenities.includes("wifi") && (
                                                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center" title="Wifi miễn phí">
                                                        <Wifi className="w-4 h-4 text-gray-600" />
                                                    </div>
                                                )}
                                                {flight.amenities.includes("meal") && (
                                                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center" title="Bữa ăn miễn phí">
                                                        <Coffee className="w-4 h-4 text-gray-600" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Price & Book */}
                                            <div className="flex items-center justify-between lg:flex-col lg:items-end gap-2 lg:w-48 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                                                <div className="lg:text-right">
                                                    <p className="text-2xl font-bold text-teal-600">
                                                        {formatPrice(flight.price)}
                                                    </p>
                                                    {flight.seatsLeft <= 5 && (
                                                        <p className="text-xs text-orange-500 font-medium">
                                                            Chỉ còn {flight.seatsLeft} ghế
                                                        </p>
                                                    )}
                                                </div>{/*
                                                <Button
                                                    className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl px-6 shadow-lg shadow-teal-600/20"
                                                >
                                                    Chọn
                                                    <ArrowRight className="w-4 h-4 ml-2" />
                                                </Button>*/}
                                                <Link href="/flights/seat">
                                                    <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl px-6 shadow-lg shadow-teal-600/20">
                                                        Chọn
                                                        <ArrowRight className="w-4 h-4 ml-2" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Expanded Details */}
                                        <AnimatePresence>
                                            {selectedFlight === flight.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="mt-6 pt-6 border-t border-gray-100">
                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                            <div className="bg-gray-50 rounded-xl p-4">
                                                                <p className="text-sm text-gray-500 mb-1">Hành lý xách tay</p>
                                                                <p className="font-semibold text-gray-900">7kg</p>
                                                            </div>
                                                            <div className="bg-gray-50 rounded-xl p-4">
                                                                <p className="text-sm text-gray-500 mb-1">Hành lý ký gửi</p>
                                                                <p className="font-semibold text-gray-900">23kg</p>
                                                            </div>
                                                            <div className="bg-gray-50 rounded-xl p-4">
                                                                <p className="text-sm text-gray-500 mb-1">Đổi/Hoàn vé</p>
                                                                <p className="font-semibold text-teal-600">Có phí</p>
                                                            </div>
                                                            <div className="bg-gray-50 rounded-xl p-4">
                                                                <p className="text-sm text-gray-500 mb-1">Đánh giá</p>
                                                                <div className="flex items-center gap-1">
                                                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                                    <span className="font-semibold text-gray-900">4.8</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Load More */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mt-8 text-center"
                            >
                                <Button
                                    variant="outline"
                                    className="border-teal-600 text-teal-600 hover:bg-teal-50 rounded-xl px-8"
                                >
                                    Xem thêm chuyến bay
                                    <ChevronDown className="w-4 h-4 ml-2" />
                                </Button>
                            </motion.div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Trust Indicators */}
            <section className="py-12 lg:py-16 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
                        {[
                            { icon: Plane, value: "20+", label: "Hãng hàng không" },
                            { icon: MapPin, value: "50+", label: "Điểm đến" },
                            { icon: Users, value: "100K+", label: "Khách hàng" },
                            { icon: Star, value: "4.9", label: "Đánh giá" },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100/50 border border-gray-100 text-center"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-50 rounded-xl mb-4">
                                    <stat.icon className="w-6 h-6 text-teal-600" />
                                </div>
                                <p className="text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</p>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
