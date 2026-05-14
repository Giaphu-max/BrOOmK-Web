import Header from "@/components/broomk/header"
import Footer from "@/components/broomk/footer"
// Nhớ kiểm tra tên file component Rewards thực tế của cậu nhé
import RewardsCenter from "@/components/broomk/rewards-center"

export default function RewardsPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Header />
            <div className="pt-24 pb-12 container mx-auto px-4 lg:px-8">
                <RewardsCenter />
            </div>
            <Footer />
        </main>
    )
}