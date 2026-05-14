"use client"

import HeaderCompact from "@/components/broomk/header-compact"
import Footer from "@/components/broomk/footer"
import LocalCuisineList from "@/components/broomk/local-cuisine-list"

export default function CuisinePage() {
    return (
        <main className="min-h-screen bg-slate-50">
            {/* Header dành cho các trang con */}
            <HeaderCompact />

            {/* Container chứa danh sách quán ăn, pt-24 để đẩy nội dung xuống dưới Header cố định */}
            <div className="pt-24 pb-12">
                <LocalCuisineList />
            </div>

            <Footer />
        </main>
    )
}