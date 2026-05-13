import Header from "@/components/broomk/header"
import Footer from "@/components/broomk/footer"
import FlightAddons from "@/components/broomk/flight-addons"

export default function AddonsPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Header />
            <FlightAddons />
            <Footer />
        </main>
    )
}