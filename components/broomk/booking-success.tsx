"use client"

import { motion } from "framer-motion"
import { CheckCircle, Calendar, Users, Mail, Shirt, Headphones, ArrowRight, Home } from "lucide-react"
import Link from "next/link"

export default function BookingSuccessPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg"
            >
                {/* Success Header */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.2,
                        }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal-100 mb-6"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 15,
                                delay: 0.4,
                            }}
                        >
                            <CheckCircle className="w-12 h-12 text-teal-600" strokeWidth={2} />
                        </motion.div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-2xl md:text-3xl font-bold text-slate-800 mb-2"
                    >
                        Đặt chỗ thành công!
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-slate-500"
                    >
                        Mã đặt chỗ:{" "}
                        <span className="font-semibold text-teal-600">#BRK-8899</span>
                    </motion.p>
                </div>

                {/* Booking Summary Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-white rounded-3xl border border-slate-200 p-6 mb-6 shadow-sm"
                >
                    <h2 className="font-semibold text-slate-800 text-lg mb-4">
                        Tour Bà Nà Hills - Cầu Vàng
                    </h2>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-slate-600">
                            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-5 h-5 text-teal-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Ngày tham quan</p>
                                <p className="font-medium text-slate-800">Thứ Bảy, 25/05/2026</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-slate-600">
                            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                                <Users className="w-5 h-5 text-teal-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Số lượng khách</p>
                                <p className="font-medium text-slate-800">2 Người lớn, 1 Trẻ em</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Next Steps Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white rounded-3xl border border-slate-200 p-6 mb-8 shadow-sm"
                >
                    <h3 className="font-semibold text-slate-800 mb-4">Bước tiếp theo</h3>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Mail className="w-4 h-4 text-teal-600" />
                            </div>
                            <div>
                                <p className="font-medium text-slate-800 text-sm">Kiểm tra email</p>
                                <p className="text-sm text-slate-500">
                                    Voucher đã được gửi tới email của bạn.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Shirt className="w-4 h-4 text-teal-600" />
                            </div>
                            <div>
                                <p className="font-medium text-slate-800 text-sm">Chuẩn bị</p>
                                <p className="text-sm text-slate-500">
                                    Xem lại hướng dẫn trang phục trong chi tiết tour.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Headphones className="w-4 h-4 text-teal-600" />
                            </div>
                            <div>
                                <p className="font-medium text-slate-800 text-sm">Hỗ trợ 24/7</p>
                                <p className="text-sm text-slate-500">
                                    Liên hệ{" "}
                                    <span className="font-medium text-teal-600">1900-8899</span>{" "}
                                    nếu cần giúp đỡ.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="space-y-3"
                >
                    <Link href="/my-trips" className="block">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 px-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-teal-600/20"
                        >
                            Xem chuyến đi của tôi
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </Link>

                    <Link href="/" className="block">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 px-6 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-2xl flex items-center justify-center gap-2 border border-slate-200 transition-colors"
                        >
                            <Home className="w-5 h-5" />
                            Về trang chủ
                        </motion.button>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    )
}
