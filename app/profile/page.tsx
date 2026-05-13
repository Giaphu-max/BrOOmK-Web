import Header from "@/components/broomk/header"
import Footer from "@/components/broomk/footer"
// Nhớ đổi tên import nếu v0 đặt tên component khác
import UserProfile from "@/components/broomk/user-profile"

export default function ProfilePage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Header />

            {/* Cắt một khoảng pt-24 để không bị lẹm vào Header cố định */}
            <div className="pt-24 pb-12 container mx-auto px-4 lg:px-8">
                <UserProfile />
            </div>

            <Footer />
        </main>
    )
}