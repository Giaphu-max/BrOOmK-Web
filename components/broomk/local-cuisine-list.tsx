"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
    MapPin,
    Clock,
    Star,
    Filter,
    ChevronDown,
    Map,
    Utensils,
    ArrowLeft,
    Search,
    X,
    BadgeCheck,
    Heart,
} from "lucide-react"

// Food type filters
const foodTypes = [
    { id: "all", label: "Tất cả", icon: Utensils },
    { id: "soup", label: "Món nước", icon: Utensils },
    { id: "dry", label: "Món khô", icon: Utensils },
    { id: "snack", label: "Ăn vặt", icon: Utensils },
    { id: "main", label: "Ăn chính", icon: Utensils },
]

// Cities
const cities = [
    { id: "all", name: "Tất cả thành phố" },
    { id: "hanoi", name: "Hà Nội" },
    { id: "hue", name: "Huế" },
    { id: "danang", name: "Đà Nẵng" },
    { id: "hcm", name: "TP. Hồ Chí Minh" },
    { id: "cantho", name: "Cần Thơ" },
]

// Restaurant data
const restaurants = [
    {
        id: 1,
        name: "Phở Thìn Bờ Hồ",
        signature: "Phở bò tái lăn",
        address: "13 Lò Đúc, Hai Bà Trưng, Hà Nội",
        city: "hanoi",
        type: "soup",
        rating: 4.8,
        reviews: 1250,
        image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop",
        badge: "local",
        isOpen: true,
        hours: "06:00 - 22:00",
        priceRange: "50.000đ - 80.000đ",
    },
    {
        id: 2,
        name: "Bún Chả Hương Liên",
        signature: "Bún chả Obama",
        address: "24 Lê Văn Hưu, Hai Bà Trưng, Hà Nội",
        city: "hanoi",
        type: "main",
        rating: 4.9,
        reviews: 3200,
        image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop",
        badge: "authentic",
        isOpen: true,
        hours: "08:00 - 21:00",
        priceRange: "40.000đ - 60.000đ",
    },
    {
        id: 3,
        name: "Bánh Mì Phượng",
        signature: "Bánh mì thập cẩm",
        address: "2B Phan Châu Trinh, Hội An",
        city: "danang",
        type: "snack",
        rating: 4.7,
        reviews: 2800,
        image: "https://images.unsplash.com/photo-1600688640154-9619e002df30?w=400&h=300&fit=crop",
        badge: "local",
        isOpen: true,
        hours: "06:30 - 21:30",
        priceRange: "25.000đ - 40.000đ",
    },
    {
        id: 4,
        name: "Cơm Tấm Bụi Sài Gòn",
        signature: "Cơm tấm sườn bì chả",
        address: "84 Nguyễn Du, Quận 1, TP.HCM",
        city: "hcm",
        type: "main",
        rating: 4.6,
        reviews: 890,
        image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
        badge: "authentic",
        isOpen: false,
        hours: "06:00 - 14:00",
        priceRange: "35.000đ - 55.000đ",
    },
    {
        id: 5,
        name: "Bún Bò Huế Đông Ba",
        signature: "Bún bò giò heo",
        address: "17 Lý Thường Kiệt, TP Huế",
        city: "hue",
        type: "soup",
        rating: 4.8,
        reviews: 1560,
        image: "https://images.unsplash.com/photo-1576577445504-6af96477db52?w=400&h=300&fit=crop",
        badge: "local",
        isOpen: true,
        hours: "05:30 - 22:00",
        priceRange: "35.000đ - 50.000đ",
    },
    {
        id: 6,
        name: "Bánh Cuốn Bà Hoành",
        signature: "Bánh cuốn nóng",
        address: "66 Tô Hiến Thành, Hai Bà Trưng, Hà Nội",
        city: "hanoi",
        type: "snack",
        rating: 4.5,
        reviews: 720,
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop",
        badge: "authentic",
        isOpen: true,
        hours: "06:00 - 11:00",
        priceRange: "25.000đ - 40.000đ",
    },
    {
        id: 7,
        name: "Hủ Tiếu Nam Vang",
        signature: "Hủ tiếu khô đặc biệt",
        address: "115 Châu Văn Liêm, Quận 5, TP.HCM",
        city: "hcm",
        type: "dry",
        rating: 4.7,
        reviews: 1100,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
        badge: "local",
        isOpen: true,
        hours: "06:00 - 23:00",
        priceRange: "45.000đ - 70.000đ",
    },
    {
        id: 8,
        name: "Mì Quảng Bà Mua",
        signature: "Mì Quảng tôm thịt",
        address: "95 Trần Bình Trọng, Đà Nẵng",
        city: "danang",
        type: "dry",
        rating: 4.6,
        reviews: 950,
        image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop",
        badge: "authentic",
        isOpen: true,
        hours: "06:30 - 21:00",
        priceRange: "30.000đ - 45.000đ",
    },
    {
        id: 9,
        name: "Bánh Xèo Mười Xiềm",
        signature: "Bánh xèo miền Tây",
        address: "68 Điện Biên Phủ, Cần Thơ",
        city: "cantho",
        type: "snack",
        rating: 4.8,
        reviews: 680,
        image: "https://images.unsplash.com/photo-1562967916-eb82221dfb44?w=400&h=300&fit=crop",
        badge: "local",
        isOpen: true,
        hours: "10:00 - 21:00",
        priceRange: "20.000đ - 35.000đ",
    },
    {
        id: 10,
        name: "Cháo Lòng Cô Ba",
        signature: "Cháo lòng đặc biệt",
        address: "42 Nguyễn Thiện Thuật, Quận 3, TP.HCM",
        city: "hcm",
        type: "soup",
        rating: 4.5,
        reviews: 520,
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
        badge: "authentic",
        isOpen: false,
        hours: "05:00 - 10:00",
        priceRange: "25.000đ - 40.000đ",
    },
    {
        id: 11,
        name: "Nem Lụi Huế",
        signature: "Nem lụi cuốn bánh tráng",
        address: "28 Nguyễn Tri Phương, TP Huế",
        city: "hue",
        type: "snack",
        rating: 4.6,
        reviews: 430,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
        badge: "local",
        isOpen: true,
        hours: "14:00 - 22:00",
        priceRange: "30.000đ - 50.000đ",
    },
    {
        id: 12,
        name: "Phở Cuốn Ngũ Xá",
        signature: "Phở cuốn thịt bò",
        address: "12 Ngũ Xá, Ba Đình, Hà Nội",
        city: "hanoi",
        type: "dry",
        rating: 4.7,
        reviews: 890,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
        badge: "authentic",
        isOpen: true,
        hours: "07:00 - 22:00",
        priceRange: "40.000đ - 60.000đ",
    },
]

export default function LocalCuisineList() {
    const [selectedType, setSelectedType] = useState("all")
    const [selectedCity, setSelectedCity] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [showCityDropdown, setShowCityDropdown] = useState(false)
    const [favorites, setFavorites] = useState<number[]>([])

    // Filter restaurants
    const filteredRestaurants = restaurants.filter((restaurant) => {
        const matchesType = selectedType === "all" || restaurant.type === selectedType
        const matchesCity = selectedCity === "all" || restaurant.city === selectedCity
        const matchesSearch =
            restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            restaurant.signature.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesType && matchesCity && matchesSearch
    })

    const toggleFavorite = (id: number, e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setFavorites((prev) => (prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]))
    }

    const openMap = (address: string, e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, "_blank")
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">B</span>
                            </div>
                            <span className="text-xl font-bold text-slate-800">
                                Br<span className="text-teal-600">OO</span>mK
                            </span>
                        </Link>

                        {/* Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Tìm quán ăn, món ngon..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2.5 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Back Button */}
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-slate-600 hover:text-teal-600 font-medium transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="hidden sm:inline">Quay lại</span>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Title */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">
                        Khám phá <span className="text-teal-600">Ẩm thực Local</span>
                    </h1>
                    <p className="text-slate-600">
                        Những quán ăn được người bản địa tin tưởng và đề xuất
                    </p>
                </motion.div>

                {/* Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-slate-100 mb-8"
                >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Food Type Filters */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <div className="flex items-center gap-2 text-slate-500 mr-2">
                                <Filter className="w-4 h-4" />
                                <span className="text-sm font-medium">Loại món:</span>
                            </div>
                            {foodTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setSelectedType(type.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedType === type.id
                                            ? "bg-teal-600 text-white shadow-md"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                        }`}
                                >
                                    {type.label}
                                </button>
                            ))}
                        </div>

                        {/* City Filter Dropdown */}
                        <div className="relative lg:ml-auto">
                            <button
                                onClick={() => setShowCityDropdown(!showCityDropdown)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-full text-sm font-medium text-slate-700 transition-colors min-w-[180px] justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-teal-600" />
                                    <span>{cities.find((c) => c.id === selectedCity)?.name}</span>
                                </div>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform ${showCityDropdown ? "rotate-180" : ""}`}
                                />
                            </button>

                            <AnimatePresence>
                                {showCityDropdown && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-full mt-2 right-0 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 min-w-[200px]"
                                    >
                                        {cities.map((city) => (
                                            <button
                                                key={city.id}
                                                onClick={() => {
                                                    setSelectedCity(city.id)
                                                    setShowCityDropdown(false)
                                                }}
                                                className={`w-full px-4 py-3 text-left text-sm transition-colors ${selectedCity === city.id
                                                        ? "bg-teal-50 text-teal-600 font-medium"
                                                        : "text-slate-600 hover:bg-slate-50"
                                                    }`}
                                            >
                                                {city.name}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile Search */}
                    <div className="md:hidden mt-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Tìm quán ăn, món ngon..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-10 py-2.5 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <p className="text-sm text-slate-500">
                            Tìm thấy <span className="font-semibold text-teal-600">{filteredRestaurants.length}</span> quán ăn
                        </p>
                        <button className="flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 font-medium">
                            <Map className="w-4 h-4" />
                            Xem tất cả trên bản đồ
                        </button>
                    </div>
                </motion.div>

                {/* Restaurant Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredRestaurants.map((restaurant, index) => (
                            <motion.div
                                key={restaurant.id}
                                layout
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                            >
                                <Link href="/cuisine/detail">
                                    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:border-teal-200 transition-all duration-300 h-full">
                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={restaurant.image}
                                                alt={restaurant.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />

                                            {/* Badge */}
                                            <div className="absolute top-3 left-3">
                                                <span
                                                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${restaurant.badge === "local"
                                                            ? "bg-amber-500/90 text-white"
                                                            : "bg-teal-600/90 text-white"
                                                        }`}
                                                >
                                                    <BadgeCheck className="w-3.5 h-3.5" />
                                                    {restaurant.badge === "local" ? "Người bản địa đề xuất" : "Quán chuẩn vị"}
                                                </span>
                                            </div>

                                            {/* Favorite Button */}
                                            <button
                                                onClick={(e) => toggleFavorite(restaurant.id, e)}
                                                className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${favorites.includes(restaurant.id)
                                                        ? "bg-red-500 text-white"
                                                        : "bg-white/80 text-slate-600 hover:bg-white hover:text-red-500"
                                                    }`}
                                            >
                                                <Heart
                                                    className={`w-5 h-5 ${favorites.includes(restaurant.id) ? "fill-current" : ""}`}
                                                />
                                            </button>

                                            {/* Status Badge */}
                                            <div className="absolute bottom-3 left-3">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${restaurant.isOpen
                                                            ? "bg-emerald-500/90 text-white"
                                                            : "bg-slate-700/90 text-white"
                                                        }`}
                                                >
                                                    <span
                                                        className={`w-2 h-2 rounded-full ${restaurant.isOpen ? "bg-white animate-pulse" : "bg-slate-400"
                                                            }`}
                                                    />
                                                    {restaurant.isOpen ? "Đang mở cửa" : "Đã đóng cửa"}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5">
                                            {/* Name & Rating */}
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <h3 className="font-bold text-slate-800 group-hover:text-teal-600 transition-colors line-clamp-1">
                                                    {restaurant.name}
                                                </h3>
                                                <div className="flex items-center gap-1 shrink-0">
                                                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                                    <span className="text-sm font-semibold text-slate-700">{restaurant.rating}</span>
                                                </div>
                                            </div>

                                            {/* Signature Dish */}
                                            <p className="text-teal-600 font-medium text-sm mb-3">
                                                {restaurant.signature}
                                            </p>

                                            {/* Address */}
                                            <div className="flex items-start gap-2 text-slate-500 text-sm mb-3">
                                                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                                                <span className="line-clamp-2">{restaurant.address}</span>
                                            </div>

                                            {/* Hours & Price */}
                                            <div className="flex items-center justify-between text-sm mb-4">
                                                <div className="flex items-center gap-1.5 text-slate-500">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{restaurant.hours}</span>
                                                </div>
                                                <span className="text-teal-600 font-medium">{restaurant.priceRange}</span>
                                            </div>

                                            {/* Map Button */}
                                            <button
                                                onClick={(e) => openMap(restaurant.address, e)}
                                                className="w-full py-2.5 bg-slate-100 hover:bg-teal-600 text-slate-600 hover:text-white rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
                                            >
                                                <Map className="w-4 h-4" />
                                                Xem trên bản đồ
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {filteredRestaurants.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Utensils className="w-10 h-10 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-700 mb-2">
                            Không tìm thấy quán ăn
                        </h3>
                        <p className="text-slate-500 mb-6">
                            Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                        </p>
                        <button
                            onClick={() => {
                                setSelectedType("all")
                                setSelectedCity("all")
                                setSearchQuery("")
                            }}
                            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-full transition-colors"
                        >
                            Xóa bộ lọc
                        </button>
                    </motion.div>
                )}

                {/* Load More */}
                {filteredRestaurants.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center mt-12"
                    >
                        <button className="px-8 py-3.5 bg-white hover:bg-teal-50 border-2 border-teal-600 text-teal-600 font-semibold rounded-full transition-all hover:shadow-lg">
                            Xem thêm quán ăn
                        </button>
                    </motion.div>
                )}
            </main>
        </div>
    )
}
