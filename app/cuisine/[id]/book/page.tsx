"use client"

import HeaderCompact from "@/components/broomk/header-compact"
import Footer from "@/components/broomk/footer"
import CuisineReservation from "@/components/broomk/cuisine-reservation"

export default function CuisineBookPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <HeaderCompact />
            <div className="pt-24 pb-12 container mx-auto px-4 lg:px-8">
                <CuisineReservation />
            </div>
            <Footer />
        </main>
    )
}