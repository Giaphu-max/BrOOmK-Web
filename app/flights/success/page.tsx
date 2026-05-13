"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Plane, CheckCircle2, Calendar, Ticket, ArrowRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FlightSuccessPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center"
            >
                {/* Icon Thành công bùng nổ */}
                <div className="relative mx-auto w-24 h-24 mb-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12, delay: 0.2 }}
                        className="absolute inset-0 bg-teal-100 rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <CheckCircle2 className="w-12 h-12 text-teal-600" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-slate-900 mb-2">Đặt vé máy bay thành công!</h1>
                <p className="text-slate-500 mb-8">Chúc mừng Gia Phú, chuyến bay của bạn đã được xác nhận. Sẵn sàng cất cánh cùng BrOOmK nhé!</p>

                {/* Thẻ thông tin vé */}
                <div className="bg-slate-50 rounded-2xl p-4 mb-8 text-left space-y-4 border border-dashed border-slate-300">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 text-slate-600">
                            <Ticket className="w-5 h-5 text-teal-600" />
                            <span className="text-sm font-medium">Mã đặt chỗ:</span>
                        </div>
                        <span className="font-bold text-slate-900">BRK8899FLY</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 text-slate-600">
                            <Plane className="w-5 h-5 text-teal-600" />
                            <span className="text-sm font-medium">Chuyến bay:</span>
                        </div>
                        <span className="font-bold text-slate-900">VN-123 (Eco)</span>
                    </div>
                </div>

                {/* Nút thao tác */}
                <div className="space-y-3">
                    <Button className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold gap-2">
                        <Download className="w-5 h-5" />
                        Tải vé điện tử (PDF)
                    </Button>

                    <Link href="/" className="block">
                        <Button variant="outline" className="w-full h-12 rounded-xl font-bold text-slate-600 gap-2">
                            Quay lại trang chủ
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}