"use client"

import HeaderCompact from "@/components/broomk/header-compact"
import Footer from "@/components/broomk/footer"
// Import Component mà v0.dev vừa tạo ra
import ActivitiesList from "@/components/broomk/activities-list"

export default function AllActivitiesPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            {/* Giữ nguyên Header và Footer của hệ thống */}
            <HeaderCompact />

            <div className="pt-24 pb-12 flex-grow">
                {/* Gọi Component danh sách ra đây */}
                <ActivitiesList />
            </div>

            <Footer />
        </main>
    )
}