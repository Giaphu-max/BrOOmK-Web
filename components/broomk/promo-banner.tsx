"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Gift, Sparkles, ArrowRight } from "lucide-react"

export default function PromoBanner() {
    return (
        <Link href="/rewards" className="block w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 group cursor-pointer">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-400 p-8 md:p-10 shadow-xl shadow-teal-500/20"
            >
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors duration-500" />
                <div className="absolute bottom-0 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />

                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 2px, transparent 2px)", backgroundSize: "24px 24px" }} />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Text Content */}
                    <div className="flex-1 text-white">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sm font-bold shadow-sm">
                                <Sparkles className="w-4 h-4 text-amber-300" />
                                <span className="text-amber-50">Đặc quyền Hội viên BrOOmK</span>
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight drop-shadow-md">
                            Tích điểm liền tay,<br />Nhận ngay Ưu đãi!
                        </h2>
                        <p className="text-teal-50 text-lg max-w-2xl font-medium">
                            Giảm đến 20% đặt phòng Khách sạn và miễn phí Xe đưa đón sân bay cho thành viên hạng Vàng. Khám phá kho Voucher ngay hôm nay.
                        </p>
                    </div>

                    {/* Call to Action Button */}
                    <div className="shrink-0 w-full md:w-auto">
                        <div className="flex items-center justify-center gap-2 px-8 py-5 bg-white text-teal-700 rounded-2xl font-bold text-lg hover:bg-slate-50 shadow-lg group-hover:-translate-y-1 group-hover:shadow-xl transition-all duration-300">
                            <Gift className="w-6 h-6" />
                            <span>Lấy Voucher ngay</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}