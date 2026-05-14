"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, Star, Filter, ArrowRight, X } from "lucide-react"

// MOCK DATA (Cập nhật cho phong phú)
const categories = [
    { id: "all", label: "Tất cả" },
    { id: "nature", label: "Di sản thiên nhiên" },
    { id: "culture", label: "Di sản văn hóa" },
    { id: "theme-park", label: "Công viên giải trí" },
    { id: "beach", label: "Biển đảo" },
    { id: "mountain", label: "Núi rừng" },
]

const regions = [
    { id: "all", label: "Tất cả các miền" },
    { id: "north", label: "Miền Bắc (Hà Nội, Hạ Long, Sapa...)" },
    { id: "central", label: "Miền Trung (Đà Nẵng, Hội An...)" },
    { id: "south", label: "Miền Nam & Đảo (Phú Quốc, HCM...)" },
]

const destinations = [
    { id: 1, title: "Vịnh Hạ Long", location: "Quảng Ninh", region: "north", price: 1250000, rating: 4.9, image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop", category: "nature" },
    { id: 2, title: "Phố Cổ Hội An", location: "Quảng Nam", region: "central", price: 450000, rating: 4.8, image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop", category: "culture" },
    { id: 3, title: "Đảo Phú Quốc", location: "Kiên Giang", region: "south", price: 2100000, rating: 4.7, image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&h=600&fit=crop", category: "beach" },
    { id: 4, title: "Bà Nà Hills", location: "Đà Nẵng", region: "central", price: 850000, rating: 4.6, image: "https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?w=800&h=600&fit=crop", category: "theme-park" },
    { id: 5, title: "Sapa", location: "Lào Cai", region: "north", price: 1500000, rating: 4.8, image: "https://images.unsplash.com/photo-1570366583862-f91883984fde?w=800&h=600&fit=crop", category: "mountain" },
    { id: 6, title: "Động Phong Nha", location: "Quảng Bình", region: "central", price: 650000, rating: 4.9, image: "https://images.unsplash.com/photo-1573790387438-4da905039392?w=800&h=600&fit=crop", category: "nature" },
    { id: 7, title: "Cố Đô Huế", location: "Thừa Thiên Huế", region: "central", price: 380000, rating: 4.7, image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop", category: "culture" },
    { id: 8, title: "Côn Đảo", location: "Bà Rịa - Vũng Tàu", region: "south", price: 3200000, rating: 4.8, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop", category: "beach" },
    { id: 9, title: "VinWonders Nha Trang", location: "Khánh Hòa", region: "central", price: 750000, rating: 4.5, image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&h=600&fit=crop", category: "theme-park" },
    { id: 10, title: "Đà Lạt", location: "Lâm Đồng", region: "south", price: 980000, rating: 4.7, image: "https://images.unsplash.com/photo-1558005137-d9619a5c539f?w=800&h=600&fit=crop", category: "mountain" },
    { id: 11, title: "Mũi Né", location: "Bình Thuận", region: "south", price: 1100000, rating: 4.6, image: "https://images.unsplash.com/photo-1559628233-100c798642d4?w=800&h=600&fit=crop", category: "beach" },
    { id: 12, title: "Thánh Địa Mỹ Sơn", location: "Quảng Nam", region: "central", price: 290000, rating: 4.5, image: "https://images.unsplash.com/photo-1600100397608-e1f5e19c5e44?w=800&h=600&fit=crop", category: "culture" },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

function formatPrice(price: number): string {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ"
}

export default function AllActivitiesPage() {
    const [activeCategory, setActiveCategory] = useState("all")
    const [activeRegion, setActiveRegion] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [priceRange, setPriceRange] = useState(5000000) // Max 5 triệu
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

    // LỌC DỮ LIỆU
    const filteredDestinations = destinations.filter((dest) => {
        const matchesCategory = activeCategory === "all" || dest.category === activeCategory
        const matchesRegion = activeRegion === "all" || dest.region === activeRegion
        const matchesPrice = dest.price <= priceRange
        const matchesSearch = dest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dest.location.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesRegion && matchesPrice && matchesSearch
    })

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header Section */}
            <div className="bg-gradient-to-br from-teal-600 to-teal-800 px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-4xl font-bold text-white sm:text-5xl"
                    >
                        Khám phá Điểm đến
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mx-auto mt-4 max-w-2xl text-center text-lg text-teal-100"
                    >
                        Tìm kiếm và khám phá những điểm đến tuyệt vời nhất Việt Nam
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mx-auto mt-8 max-w-2xl"
                    >
                        <div className="relative group">
                            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm điểm đến, thành phố..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-2xl border-0 bg-white py-4 pl-14 pr-6 text-slate-800 shadow-xl placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Mobile Filter Button */}
                <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden w-full flex items-center justify-center gap-2 bg-white border border-slate-200 py-3 rounded-2xl font-medium text-slate-700 shadow-sm mb-6"
                >
                    <Filter className="w-5 h-5" />
                    Bộ lọc nâng cao
                </button>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* SIDEBAR FILTER (Desktop & Mobile) */}
                    <aside className={`
                        ${isMobileFilterOpen ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden'} 
                        lg:block lg:w-1/4 lg:sticky lg:top-28 lg:h-fit lg:bg-transparent lg:p-0
                    `}>
                        {isMobileFilterOpen && (
                            <div className="flex items-center justify-between mb-8 lg:hidden">
                                <h2 className="text-xl font-bold text-slate-800">Bộ lọc</h2>
                                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 bg-slate-100 rounded-full">
                                    <X className="w-5 h-5 text-slate-600" />
                                </button>
                            </div>
                        )}

                        <div className="space-y-8 bg-white lg:p-6 lg:rounded-3xl lg:shadow-sm lg:border lg:border-slate-100">
                            {/* Filter by Category */}
                            <div>
                                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    Loại hình trải nghiệm
                                </h3>
                                <div className="flex flex-col gap-2">
                                    {categories.map((category) => (
                                        <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="category"
                                                checked={activeCategory === category.id}
                                                onChange={() => setActiveCategory(category.id)}
                                                className="w-5 h-5 accent-teal-600"
                                            />
                                            <span className={`font-medium transition-colors ${activeCategory === category.id ? "text-teal-700" : "text-slate-600 group-hover:text-slate-900"}`}>
                                                {category.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Filter by Region */}
                            <div>
                                <h3 className="font-bold text-slate-800 mb-4">Khu vực</h3>
                                <div className="flex flex-col gap-2">
                                    {regions.map((region) => (
                                        <label key={region.id} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="region"
                                                checked={activeRegion === region.id}
                                                onChange={() => setActiveRegion(region.id)}
                                                className="w-5 h-5 accent-teal-600"
                                            />
                                            <span className={`font-medium transition-colors ${activeRegion === region.id ? "text-teal-700" : "text-slate-600 group-hover:text-slate-900"}`}>
                                                {region.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Filter by Price */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-slate-800">Mức giá tối đa</h3>
                                    <span className="text-sm font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-lg">
                                        {formatPrice(priceRange)}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="5000000"
                                    step="100000"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(Number(e.target.value))}
                                    className="w-full accent-teal-600"
                                />
                                <div className="flex items-center justify-between text-xs text-slate-400 mt-2 font-medium">
                                    <span>0đ</span>
                                    <span>5.000.000đ+</span>
                                </div>
                            </div>

                            {/* Mobile Apply Button */}
                            {isMobileFilterOpen && (
                                <button
                                    onClick={() => setIsMobileFilterOpen(false)}
                                    className="w-full py-4 bg-teal-600 text-white font-bold rounded-2xl mt-8"
                                >
                                    Áp dụng bộ lọc
                                </button>
                            )}
                        </div>
                    </aside>

                    {/* GRID LIST (Right Side) */}
                    <div className="lg:w-3/4">
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-slate-600 font-medium">
                                Tìm thấy <span className="font-bold text-teal-600 text-lg">{filteredDestinations.length}</span> điểm đến
                            </p>
                        </div>

                        <motion.div
                            key={activeCategory + activeRegion + searchQuery + priceRange}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
                        >
                            <AnimatePresence>
                                {filteredDestinations.map((destination) => (
                                    <motion.div
                                        key={destination.id}
                                        variants={itemVariants}
                                        layout
                                        exit={{ opacity: 0, scale: 0.9 }}
                                    >
                                        <Link href={`/activities/${destination.id}`}>
                                            <div className="group cursor-pointer overflow-hidden rounded-[2rem] bg-white border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/5 hover:-translate-y-1 flex flex-col h-full">
                                                {/* Image Container */}
                                                <div className="relative h-60 overflow-hidden">
                                                    <Image
                                                        src={destination.image}
                                                        alt={destination.title}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                    {/* Gradient Overlay */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                                    {/* Rating Badge */}
                                                    <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-sm font-bold text-slate-800 shadow-lg backdrop-blur-sm">
                                                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                                        {destination.rating}
                                                    </div>

                                                    {/* Title on Image */}
                                                    <div className="absolute bottom-4 left-4 right-4">
                                                        <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors">
                                                            {destination.title}
                                                        </h3>
                                                    </div>
                                                </div>

                                                {/* Card Content */}
                                                <div className="p-5 flex flex-col flex-1">
                                                    <div className="flex items-center gap-1.5 text-slate-500 font-medium mb-4">
                                                        <MapPin className="h-4 w-4 text-teal-600" />
                                                        <span className="text-sm">{destination.location}</span>
                                                    </div>

                                                    {/* Divider */}
                                                    <div className="mt-auto border-t border-slate-100 pt-4 flex items-center justify-between">
                                                        <div>
                                                            <span className="text-xs text-slate-400 font-medium">Giá từ</span>
                                                            <div className="text-xl font-black text-teal-700">
                                                                {formatPrice(destination.price)}
                                                            </div>
                                                        </div>
                                                        <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                                                            <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {filteredDestinations.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="py-20 text-center bg-white rounded-3xl border border-slate-100 mt-6"
                            >
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-10 h-10 text-slate-300" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Không tìm thấy kết quả</h3>
                                <p className="text-slate-500">
                                    Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm nhé.
                                </p>
                                <button
                                    onClick={() => {
                                        setActiveCategory("all");
                                        setActiveRegion("all");
                                        setPriceRange(5000000);
                                        setSearchQuery("");
                                    }}
                                    className="mt-6 px-6 py-2.5 bg-teal-50 text-teal-700 font-semibold rounded-xl hover:bg-teal-100 transition-colors"
                                >
                                    Xóa tất cả bộ lọc
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}