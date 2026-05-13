"use client"

import Header from "@/components/broomk/header"
import HeroSection from "@/components/broomk/hero-section"
import ActivitiesSection from "@/components/broomk/activities-section"
import CuisineSection from "@/components/broomk/cuisine-section"
import Footer from "@/components/broomk/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ActivitiesSection />
      <CuisineSection />
      <Footer />
    </main>
  )
}
