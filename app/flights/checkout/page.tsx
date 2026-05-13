import Header from "@/components/broomk/header"
import Footer from "@/components/broomk/footer"
import FlightCheckout from "@/components/broomk/flight-checkout" // Nhớ đổi tên đúng với file ở Bước 2

export default function CheckoutPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Header />
            {/* Thêm khoảng đệm pt-20 để không bị Header đè lên nội dung */}
            <div className="pt-20">
                <FlightCheckout />
            </div>
            <Footer />
        </main>
    )
}