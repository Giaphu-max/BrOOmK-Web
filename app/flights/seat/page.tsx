import Header from "@/components/broomk/header"
import Footer from "@/components/broomk/footer"
import FlightSeatSelection from "@/components/broomk/flight-seat-selection"

export default function SeatSelectionPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Header />
            <FlightSeatSelection />
            <Footer />
        </main>
    )
}