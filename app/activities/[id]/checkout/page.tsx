"use client"

import { use } from "react"
import HeaderCompact from "@/components/broomk/header-compact"
import Footer from "@/components/broomk/footer"
// Import file code mà v0.dev sẽ tạo ở bước sau
import CheckoutForm from "@/components/broomk/checkout-form"

export default function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params)

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <HeaderCompact />
            <div className="pt-24 pb-12 flex-grow">
                <CheckoutForm id={resolvedParams.id} />
            </div>
            <Footer />
        </main>
    )
}