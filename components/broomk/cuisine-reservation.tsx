"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
    ArrowLeft,
    Calendar,
    Clock,
    Users,
    FileText,
    MapPin,
    Star,
    Check,
    Minus,
    Plus,
    Sun,
    Sunset,
    Moon,
    Sparkles,
    Loader2,
    User,
    Phone,
    Mail,
} from "lucide-react"

const timeSlots = [
    {
        id: "morning",
        label: "Buổi sáng",
        time: "06:00 - 11:00",
        icon: Sun,
        slots: ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00"],
    },
    {
        id: "afternoon",
        label: "Buổi trưa",
        time: "11:00 - 17:00",
        icon: Sunset,
        slots: ["11:30", "12:00", "12:30", "13:00", "14:00", "15:00"],
    },
    {
        id: "evening",
        label: "Buổi tối",
        time: "17:00 - 22:00",
        icon: Moon,
        slots: ["17:00", "18:00", "19:00", "20:00", "21:00"],
    },
]

// ĐÃ CẬP NHẬT: Thêm bước Thông tin liên hệ
const steps = [
    { id: 1, label: "Thời gian", icon: Calendar },
    { id: 2, label: "Số khách", icon: Users },
    { id: 3, label: "Liên hệ", icon: User },
    { id: 4, label: "Ghi chú", icon: FileText },
]

export default function CuisineReservation() {
    const [currentStep, setCurrentStep] = useState(1)
    const [selectedDate, setSelectedDate] = useState<string>("")
    const [selectedPeriod, setSelectedPeriod] = useState<string>("")
    const [selectedTime, setSelectedTime] = useState<string>("")
    const [adults, setAdults] = useState(2)
    const [children, setChildren] = useState(0)

    // MỚI: State thông tin liên hệ
    const [fullName, setFullName] = useState("NGUYỄN GIA PHÚ")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")

    const [notes, setNotes] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const generateDates = () => {
        const dates = []
        const today = new Date()
        for (let i = 0; i < 14; i++) {
            const date = new Date(today)
            date.setDate(today.getDate() + i)
            dates.push({
                date: date.toISOString().split("T")[0],
                day: date.getDate(),
                weekday: date.toLocaleDateString("vi-VN", { weekday: "short" }),
                isToday: i === 0,
            })
        }
        return dates
    }

    const dates = generateDates()

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setIsLoading(false)
        setIsSuccess(true)
    }

    const canProceed = () => {
        if (currentStep === 1) return selectedDate && selectedTime
        if (currentStep === 2) return adults > 0
        if (currentStep === 3) return fullName.length > 2 && phone.length >= 10
        return true
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-[2.5rem] shadow-xl p-10 text-center max-w-lg w-full border border-slate-100"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <Check className="w-10 h-10 text-teal-600" />
                    </motion.div>

                    <h1 className="text-2xl font-bold text-slate-800 mb-2">Đặt bàn thành công!</h1>
                    <p className="text-slate-500 mb-8 px-4">
                        Cảm ơn {fullName}, nhà hàng sẽ sớm liên hệ xác nhận qua số {phone}.
                    </p>

                    <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left space-y-3">
                        <div className="flex items-center gap-3 text-slate-600 text-sm">
                            <Calendar className="w-4 h-4 text-teal-600" />
                            <span>{new Date(selectedDate).toLocaleDateString("vi-VN", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600 text-sm">
                            <Clock className="w-4 h-4 text-teal-600" />
                            <span>{selectedTime}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600 text-sm">
                            <Users className="w-4 h-4 text-teal-600" />
                            <span>{adults + children} khách</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Link href="/cuisine" className="flex-1 py-4 px-6 border-2 border-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all text-sm">
                            Khám phá thêm
                        </Link>
                        <Link href="/my-trips" className="flex-1 py-4 px-6 bg-teal-600 text-white font-bold rounded-2xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-100 text-sm">
                            Xem đơn đặt
                        </Link>
                    </div>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8 lg:py-12">
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/cuisine/detail" className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 mb-8 font-medium transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Quay lại</span>
                </Link>

                <div className="grid lg:grid-cols-[35%_65%] gap-10">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                            <div className="relative h-48">
                                <img src="https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&fit=crop" alt="Pho Thin" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4">
                                    <h2 className="text-xl font-bold text-white">Phở Thìn Bờ Hồ</h2>
                                    <div className="flex items-center gap-2 text-white/80 text-xs mt-1">
                                        <MapPin className="w-3 h-3" /> 13 Lò Đúc, Hà Nội
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-teal-600 text-white">
                                <div className="flex items-center gap-3 mb-2">
                                    <Sparkles className="w-5 h-5" />
                                    <h3 className="font-bold">Đặc quyền BrOOmK</h3>
                                </div>
                                <p className="text-teal-50 text-xs leading-relaxed">Giữ chỗ ưu tiên và tặng kèm Quẩy nóng giòn khi đặt qua App.</p>
                            </div>
                        </div>

                        {(selectedDate || selectedTime) && (
                            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
                                <h3 className="font-bold text-slate-800 mb-4">Tóm tắt đặt bàn</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <Calendar className="w-4 h-4 text-teal-600" />
                                        <span>{selectedDate}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <Clock className="w-4 h-4 text-teal-600" />
                                        <span>{selectedTime || "Chưa chọn giờ"}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <Users className="w-4 h-4 text-teal-600" />
                                        <span>{adults} người lớn, {children} trẻ em</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 lg:p-10">
                        <div className="flex items-center justify-between mb-10 overflow-x-auto pb-4">
                            {steps.map((step, index) => (
                                <div key={step.id} className="flex items-center flex-shrink-0">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentStep >= step.id ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                                            {currentStep > step.id ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider ${currentStep >= step.id ? "text-teal-600" : "text-slate-400"}`}>{step.label}</span>
                                    </div>
                                    {index < steps.length - 1 && <div className={`w-12 h-0.5 mx-2 mb-6 rounded-full ${currentStep > step.id ? "bg-teal-600" : "bg-slate-100"}`} />}
                                </div>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            {currentStep === 1 && (
                                <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                                    <h2 className="text-xl font-bold text-slate-900">Chọn thời gian</h2>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-400 uppercase mb-3">Ngày đến</label>
                                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                            {dates.map((date) => (
                                                <button key={date.date} onClick={() => setSelectedDate(date.date)} className={`flex-shrink-0 w-16 py-4 rounded-2xl border-2 transition-all ${selectedDate === date.date ? "border-teal-600 bg-teal-50 text-teal-600" : "border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200"}`}>
                                                    <div className="text-[10px] font-bold uppercase">{date.weekday}</div>
                                                    <div className="text-lg font-bold">{date.day}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {timeSlots.map((period) => (
                                            <button key={period.id} onClick={() => setSelectedPeriod(period.id)} className={`p-4 rounded-2xl border-2 transition-all text-center ${selectedPeriod === period.id ? "border-teal-600 bg-teal-50" : "border-slate-50 bg-slate-50 hover:border-slate-200"}`}>
                                                <period.icon className={`w-6 h-6 mx-auto mb-2 ${selectedPeriod === period.id ? "text-teal-600" : "text-slate-400"}`} />
                                                <div className={`text-xs font-bold ${selectedPeriod === period.id ? "text-teal-700" : "text-slate-600"}`}>{period.label}</div>
                                            </button>
                                        ))}
                                    </div>
                                    {selectedPeriod && (
                                        <div className="flex flex-wrap gap-2">
                                            {timeSlots.find(p => p.id === selectedPeriod)?.slots.map(time => (
                                                <button key={time} onClick={() => setSelectedTime(time)} className={`px-4 py-2 rounded-xl border-2 font-bold text-sm transition-all ${selectedTime === time ? "border-teal-600 bg-teal-600 text-white" : "border-slate-100 bg-white text-slate-600 hover:border-teal-200"}`}>
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {currentStep === 2 && (
                                <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                    <h2 className="text-xl font-bold text-slate-900">Số lượng khách</h2>
                                    <div className="space-y-4">
                                        {[{ label: "Người lớn", sub: "Từ 13 tuổi", val: adults, set: setAdults, min: 1 }, { label: "Trẻ em", sub: "2 - 12 tuổi", val: children, set: setChildren, min: 0 }].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
                                                <div>
                                                    <div className="font-bold text-slate-800">{item.label}</div>
                                                    <div className="text-xs text-slate-400">{item.sub}</div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <button onClick={() => item.set(Math.max(item.min, item.val - 1))} className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-slate-400 hover:text-teal-600">-</button>
                                                    <span className="font-bold text-xl w-6 text-center">{item.val}</span>
                                                    <button onClick={() => item.set(item.val + 1)} className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-sm">+</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* MỚI: UI cho bước Thông tin liên hệ */}
                            {currentStep === 3 && (
                                <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                    <h2 className="text-xl font-bold text-slate-900">Thông tin người đặt</h2>
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Họ và tên" className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none font-medium" />
                                        </div>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Số điện thoại" className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none font-medium" />
                                        </div>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Địa chỉ Email (Không bắt buộc)" className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none font-medium" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 4 && (
                                <motion.div key="step4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                    <h2 className="text-xl font-bold text-slate-900">Ghi chú & Xác nhận</h2>
                                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Yêu cầu đặc biệt (ví dụ: ngồi cạnh cửa sổ, không ăn hành...)" rows={4} className="w-full p-6 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none resize-none font-medium" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex gap-4 mt-10 pt-8 border-t border-slate-50">
                            {currentStep > 1 && (
                                <button onClick={handleBack} className="flex-1 py-4 border-2 border-slate-100 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all">Quay lại</button>
                            )}
                            {currentStep < 4 ? (
                                <button onClick={handleNext} disabled={!canProceed()} className="flex-1 py-4 bg-teal-600 text-white font-bold rounded-2xl hover:bg-teal-700 disabled:opacity-30 transition-all shadow-lg shadow-teal-100">Tiếp tục</button>
                            ) : (
                                <button onClick={handleSubmit} disabled={isLoading} className="flex-1 py-4 bg-teal-600 text-white font-bold rounded-2xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-100 flex items-center justify-center gap-2">
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Xác nhận đặt bàn"}
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    )
}