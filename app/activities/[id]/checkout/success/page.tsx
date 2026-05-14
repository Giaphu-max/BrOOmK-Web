"use client"

import HeaderCompact from "@/components/broomk/header-compact"
import Footer from "@/components/broomk/footer"
// Nhúng giao diện thành công mà v0.dev vừa làm
import BookingSuccess from "@/components/broomk/booking-success"

export default function CheckoutSuccessPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <HeaderCompact />

            {/* Căn giữa toàn bộ nội dung */}
            <div className="pt-24 pb-12 flex-grow flex items-center justify-center">
                <BookingSuccess />
            </div>

            <Footer />
        </main>
    )
}