"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react"
import Image from "next/image"

const hotelImages = [
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop",
    alt: "Toàn cảnh resort với hồ bơi vô cực",
  },
  {
    src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop",
    alt: "Sảnh đón tiếp sang trọng",
  },
  {
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
    alt: "Phòng nghỉ hướng biển",
  },
  {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    alt: "Nhà hàng view biển",
  },
  {
    src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop",
    alt: "Khu spa thư giãn",
  },
]

export default function ImageGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % hotelImages.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + hotelImages.length) % hotelImages.length)
  }

  return (
    <>
      {/* Bento Box Gallery */}
      <section className="container mx-auto px-4 lg:px-8 pt-20 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 h-[300px] md:h-[400px] lg:h-[480px]">
          {/* Main Hero Image */}
          <motion.div
            className="lg:col-span-2 lg:row-span-2 relative rounded-2xl overflow-hidden cursor-pointer group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => openLightbox(0)}
          >
            <Image
              src={hotelImages[0].src}
              alt={hotelImages[0].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <motion.button
              className="absolute bottom-4 right-4 glass p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Expand className="w-5 h-5 text-white" />
            </motion.button>
          </motion.div>

          {/* Secondary Images */}
          {hotelImages.slice(1, 5).map((image, index) => (
            <motion.div
              key={index}
              className={`relative rounded-xl overflow-hidden cursor-pointer group ${
                index < 2 ? "hidden lg:block" : "hidden lg:block"
              }`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
              onClick={() => openLightbox(index + 1)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Show more overlay on last image */}
              {index === 3 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-semibold text-lg">+{hotelImages.length - 4} ảnh</span>
                </div>
              )}
            </motion.div>
          ))}

          {/* Mobile: Show all button */}
          <motion.button
            className="lg:hidden absolute bottom-4 right-4 glass-strong px-4 py-2 rounded-full text-sm font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => openLightbox(0)}
          >
            Xem tất cả {hotelImages.length} ảnh
          </motion.button>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation */}
            <button
              className="absolute left-4 p-3 glass rounded-full text-white/80 hover:text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              className="absolute right-4 p-3 glass rounded-full text-white/80 hover:text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Image */}
            <motion.div
              key={currentIndex}
              className="relative w-full max-w-5xl h-[70vh] mx-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={hotelImages[currentIndex].src}
                alt={hotelImages[currentIndex].alt}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full text-white text-sm">
              {currentIndex + 1} / {hotelImages.length}
            </div>

            {/* Thumbnails */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
              {hotelImages.map((img, index) => (
                <button
                  key={index}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden transition-all ${
                    index === currentIndex
                      ? "ring-2 ring-primary scale-110"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentIndex(index)
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
