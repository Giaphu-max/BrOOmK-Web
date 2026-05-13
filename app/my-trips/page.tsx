import Header from "@/components/broomk/header" // hoặc header-compact tùy cậu
import Footer from "@/components/broomk/footer"
import MyTrips from "@/components/broomk/my-trips"

export default function MyTripsPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Header />

            <div className="pt-24 pb-12 container mx-auto px-4 lg:px-8">
                <MyTrips />
            </div>

            <Footer />
        </main>
    )
}