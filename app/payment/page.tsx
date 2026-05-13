import Header from "@/components/broomk/header"
import Footer from "@/components/broomk/footer"
import PaymentMethods from "@/components/broomk/payment-methods"

export default function PaymentPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Header />

            <div className="pt-24 pb-12 container mx-auto px-4 lg:px-8">
                <PaymentMethods />
            </div>

            <Footer />
        </main>
    )
}