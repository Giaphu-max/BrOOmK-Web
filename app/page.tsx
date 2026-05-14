"use client"

import Header from "@/components/broomk/header"
import HeroSection from "@/components/broomk/hero-section"
import PromoBanner from "@/components/broomk/promo-banner" // ĐÃ THÊM: Import Promo Banner
import ActivitiesSection from "@/components/broomk/activities-section"
import CuisineSection from "@/components/broomk/cuisine-section"
import Footer from "@/components/broomk/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      <HeroSection />

      {/* ĐÃ THÊM: Banner Quảng cáo chuyển hướng sang trang Ưu đãi */}
      <PromoBanner />

      <ActivitiesSection />
      <CuisineSection />
      <Footer />
    </main>
  )
}