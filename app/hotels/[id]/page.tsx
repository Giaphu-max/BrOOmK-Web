"use client"

import { useState } from "react"
import HeaderCompact from "@/components/broomk/header-compact"
import ImageGallery from "@/components/broomk/hotel-detail/image-gallery"
import HotelInfo from "@/components/broomk/hotel-detail/hotel-info"
import RoomTypes from "@/components/broomk/hotel-detail/room-types"
import BookingCard from "@/components/broomk/hotel-detail/booking-card"
import ReviewsSection from "@/components/broomk/hotel-detail/reviews-section"
import Footer from "@/components/broomk/footer"

export default function HotelDetailPage() {
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>()

  const handleSelectRoom = (roomId: string) => {
    setSelectedRoomId(roomId)
    // Scroll to booking card on mobile
    if (window.innerWidth < 1024) {
      const bookingSection = document.getElementById("booking-card-mobile")
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <HeaderCompact />

      {/* Hero Image Gallery */}
      <ImageGallery />

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Hotel Details (60%) */}
          <div className="flex-1 lg:max-w-[60%]">
            <HotelInfo />
            <RoomTypes onSelectRoom={handleSelectRoom} />
          </div>

          {/* Right Column - Booking Card (40%) */}
          <div className="lg:w-[40%] lg:max-w-[420px]">
            {/* Desktop Sticky Booking Card */}
            <div className="hidden lg:block">
              <BookingCard selectedRoomId={selectedRoomId} />
            </div>
          </div>
        </div>

        {/* Mobile Booking Card */}
        <div id="booking-card-mobile" className="lg:hidden mt-8">
          <BookingCard selectedRoomId={selectedRoomId} />
        </div>

        {/* Reviews Section */}
        <ReviewsSection />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
