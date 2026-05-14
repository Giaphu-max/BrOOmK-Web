"use client"

import HeaderCompact from "@/components/broomk/header-compact"
import Footer from "@/components/broomk/footer"
import CuisineDetail from "@/components/broomk/cuisine-detail"

export default function CuisineDetailPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <HeaderCompact />
            {/* pt-20 để không bị Header đè */}
            <div className="pt-20">
                <CuisineDetail />
            </div>
            <Footer />
        </main>
    )
}