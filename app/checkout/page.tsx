"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CheckoutHeader } from "@/components/broomk/checkout/checkout-header"
import { ContactForm } from "@/components/broomk/checkout/contact-form"
import { PaymentMethods } from "@/components/broomk/checkout/payment-methods"
import { BookingSummary } from "@/components/broomk/checkout/booking-summary"
import Footer from "@/components/broomk/footer"

// Mock booking data - in real app, this would come from state/context
const mockBooking = {
  hotel: {
    name: "The Anam Cam Ranh Resort",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop",
    rating: 5,
    reviewScore: 9.4,
    location: "Long Beach, Cam Ranh, Khánh Hòa",
  },
  room: {
    type: "Deluxe Ocean View",
    guests: 2,
    count: 1,
  },
  dates: {
    checkIn: "Thứ 6, 15/03/2024",
    checkOut: "Chủ nhật, 17/03/2024",
    nights: 2,
  },
  pricing: {
    roomPrice: 5800000,
    tax: 580000,
    serviceFee: 200000,
    discount: 500000,
    total: 6080000,
  },
}

export default function CheckoutPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const [contactInfo, setContactInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
  })

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card")
  const [selectedEwallet, setSelectedEwallet] = useState("")

  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const handleContactChange = (field: string, value: string) => {
    setContactInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleCardChange = (field: string, value: string) => {
    setCardInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    router.push("/booking-confirmation")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2314b8a6' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <CheckoutHeader currentStep={2} />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Hoàn tất đặt phòng
          </h1>
          <p className="text-muted-foreground mt-1">
            Vui lòng điền thông tin để hoàn tất đặt phòng của bạn
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-6 order-2 lg:order-1">
            <ContactForm
              contactInfo={contactInfo}
              onContactChange={handleContactChange}
            />
            <PaymentMethods
              selectedMethod={selectedPaymentMethod}
              onMethodChange={setSelectedPaymentMethod}
              cardInfo={cardInfo}
              onCardChange={handleCardChange}
              selectedEwallet={selectedEwallet}
              onEwalletChange={setSelectedEwallet}
              onSubmit={handleSubmit}
              isProcessing={isProcessing}
            />
          </div>

          {/* Right Column - Booking Summary */}
          <div className="order-1 lg:order-2">
            <BookingSummary booking={mockBooking} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
