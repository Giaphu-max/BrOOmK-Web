"use client"

import { use } from "react" // ĐÃ THÊM: Import hook 'use' từ React
import HeaderCompact from "@/components/broomk/header-compact"
import Footer from "@/components/broomk/footer"
import ActivityDetail from "@/components/broomk/activity-detail"

// ĐÃ SỬA: Khai báo params là một Promise
export default function ActivityPage({ params }: { params: Promise<{ id: string }> }) {
    // ĐÃ THÊM: Dùng hook use() để "mở khóa" lấy dữ liệu thực bên trong
    const resolvedParams = use(params)

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <HeaderCompact />

            <div className="pt-24 pb-12 flex-grow">
                {/* ĐÃ SỬA: Truyền id đã được mở khóa vào */}
                <ActivityDetail id={resolvedParams.id} />
            </div>

            <Footer />
        </main>
    )
}