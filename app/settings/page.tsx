import Header from "@/components/broomk/header"
import Footer from "@/components/broomk/footer"
import SettingsContent from "@/components/broomk/settings-content"

export default function SettingsPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Header />
            <div className="pt-24 pb-12 container mx-auto px-4 lg:px-8">
                <SettingsContent />
            </div>
            <Footer />
        </main>
    )
}