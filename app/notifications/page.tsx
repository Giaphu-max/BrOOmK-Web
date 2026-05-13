import Header from "@/components/broomk/header"
import Footer from "@/components/broomk/footer"
import NotificationsContent from "@/components/broomk/notifications-content"

export default function NotificationsPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Header />
            <div className="pt-24 pb-12 container mx-auto px-4 lg:px-8">
                <NotificationsContent />
            </div>
            <Footer />
        </main>
    )
}