"use client"

import { motion } from "framer-motion"
import { Check, Calendar, MapPin, Copy, Mail, Phone, ArrowRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import HeaderCompact from "@/components/broomk/header-compact"
import Footer from "@/components/broomk/footer"

export default function BookingConfirmationPage() {
  const [copied, setCopied] = useState(false)

  const bookingData = {
    bookingId: "BRK-2024-789456",
    hotelName: "The Anam Cam Ranh Resort",
    hotelStars: 5,
    roomType: "Deluxe Ocean View",
    checkIn: "15/07/2024",
    checkOut: "18/07/2024",
    nights: 3,
    guests: "2 người lớn, 1 trẻ em",
    totalPrice: "12,450,000",
    guestName: "Nguyen Van A",
    email: "nguyenvana@email.com",
    phone: "+84 912 345 678",
  }

  const handleCopyBookingId = () => {
    navigator.clipboard.writeText(bookingData.bookingId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderCompact />

      {/* Background with subtle pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon with Animation */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              {/* Outer glow rings */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-primary"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.3, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.3,
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-primary"
              />

              {/* Main circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.3,
                }}
                className="relative w-28 h-28 rounded-full bg-gradient-to-br from-accent via-accent/90 to-primary flex items-center justify-center shadow-2xl shadow-accent/40"
              >
                <motion.div
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Check className="w-14 h-14 text-accent-foreground stroke-[3]" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-4"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Dat phong thanh cong!
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
              Cam on ban da lua chon BrOOmK. Chung toi da gui email xac nhan chi tiet den hom thu cua ban.
            </p>
          </motion.div>

          {/* Email notification badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm">
              <Mail className="w-4 h-4" />
              <span>Email xac nhan da duoc gui den {bookingData.email}</span>
            </div>
          </motion.div>

          {/* Booking Summary Card - Glassmorphism Bento Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="backdrop-blur-xl bg-card/60 border border-border/50 rounded-3xl p-6 md:p-8 shadow-2xl mb-8"
          >
            {/* Booking ID Header */}
            <div className="flex items-center justify-between pb-6 border-b border-border/50 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Ma dat cho</p>
                <p className="text-2xl md:text-3xl font-bold font-mono text-accent tracking-wider">
                  {bookingData.bookingId}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyBookingId}
                className="gap-2 border-border/50 hover:bg-accent/10 hover:text-accent"
              >
                <Copy className="w-4 h-4" />
                {copied ? "Da sao chep!" : "Sao chep"}
              </Button>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Hotel Info - Spans full width on mobile, left column on desktop */}
              <div className="md:col-span-2 p-4 rounded-2xl bg-background/50 border border-border/30">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {[...Array(bookingData.hotelStars)].map((_, i) => (
                        <span key={i} className="text-accent text-sm">★</span>
                      ))}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {bookingData.hotelName}
                    </h3>
                    <p className="text-muted-foreground">{bookingData.roomType}</p>
                  </div>
                </div>
              </div>

              {/* Check-in */}
              <div className="p-4 rounded-2xl bg-background/50 border border-border/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Nhan phong</span>
                </div>
                <p className="text-xl font-semibold text-foreground pl-13">
                  {bookingData.checkIn}
                </p>
                <p className="text-sm text-muted-foreground pl-13">Tu 14:00</p>
              </div>

              {/* Check-out */}
              <div className="p-4 rounded-2xl bg-background/50 border border-border/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-sm text-muted-foreground">Tra phong</span>
                </div>
                <p className="text-xl font-semibold text-foreground pl-13">
                  {bookingData.checkOut}
                </p>
                <p className="text-sm text-muted-foreground pl-13">Truoc 12:00</p>
              </div>

              {/* Guest Info */}
              <div className="p-4 rounded-2xl bg-background/50 border border-border/30">
                <p className="text-sm text-muted-foreground mb-1">Khach luu tru</p>
                <p className="text-lg font-semibold text-foreground">{bookingData.guestName}</p>
                <p className="text-sm text-muted-foreground">{bookingData.guests}</p>
              </div>

              {/* Duration & Price */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20">
                <p className="text-sm text-muted-foreground mb-1">{bookingData.nights} dem</p>
                <p className="text-2xl font-bold text-accent">{bookingData.totalPrice}₫</p>
                <p className="text-sm text-muted-foreground">Da thanh toan</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6 pt-6 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-3">Thong tin lien he</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-foreground">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{bookingData.email}</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{bookingData.phone}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/my-trips">
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 h-14 text-base bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 shadow-lg shadow-accent/30 text-accent-foreground font-semibold"
              >
                Quan ly chuyen di
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-8 h-14 text-base border-border/50 hover:bg-card/50 backdrop-blur-sm"
              >
                <Home className="w-5 h-5 mr-2" />
                Ve Trang chu
              </Button>
            </Link>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Can ho tro? Lien he voi chung toi qua hotline{" "}
              <span className="text-primary font-semibold">1900 1234</span> (24/7)
            </p>
            <div className="flex justify-center gap-6">
              <Link
                href="/faq"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Cau hoi thuong gap
              </Link>
              <Link
                href="/policies"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Chinh sach huy phong
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Lien he
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
