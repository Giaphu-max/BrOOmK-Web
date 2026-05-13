import Header from "@/components/broomk/header"
import Footer from "@/components/broomk/footer"
import FlightMainContent from "@/components/broomk/flight-main-content"

export default function FlightBooking() {
    return (
        <main className="min-h-screen bg-slate-50">
            {/* Header của BrOOmK */}
            <Header />

            {/* Khoảng đệm để nội dung không bị dính sát vào Header cố định */}
            <div className="pt-24 pb-12">
                <FlightMainContent />
            </div>

            {/* Footer của BrOOmK */}
            <Footer />
        </main>
    )
}