"use client"

import { motion } from "framer-motion"
import { Check, CreditCard, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const steps = [
  { id: 1, name: "Chọn phòng", icon: Check, href: "/hotels" },
  { id: 2, name: "Thanh toán", icon: CreditCard, href: "/checkout" },
  { id: 3, name: "Hoàn tất", icon: CheckCircle2, href: "/confirmation" },
]

interface CheckoutHeaderProps {
  currentStep?: number
}

export function CheckoutHeader({ currentStep = 2 }: CheckoutHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">B</span>
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BrOOmK
            </span>
          </Link>

          {/* Steps Indicator */}
          <nav className="hidden md:flex items-center gap-2">
            {steps.map((step, index) => {
              const isCompleted = step.id < currentStep
              const isActive = step.id === currentStep
              const isPending = step.id > currentStep
              const Icon = step.icon

              return (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
                        ${isCompleted ? "bg-primary/20 text-primary" : ""}
                        ${isActive ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30" : ""}
                        ${isPending ? "bg-muted/30 text-muted-foreground" : ""}
                      `}
                    >
                      <div
                        className={`
                          w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                          ${isCompleted ? "bg-primary text-primary-foreground" : ""}
                          ${isActive ? "bg-white/20" : ""}
                          ${isPending ? "bg-muted/50" : ""}
                        `}
                      >
                        {isCompleted ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          step.id
                        )}
                      </div>
                      <span className="text-sm font-medium">{step.name}</span>
                    </div>
                  </motion.div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`
                        w-12 h-0.5 mx-2 rounded-full transition-all duration-300
                        ${step.id < currentStep ? "bg-primary" : "bg-muted/30"}
                      `}
                    />
                  )}
                </div>
              )
            })}
          </nav>

          {/* Mobile Steps */}
          <div className="md:hidden flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Bước</span>
            <span className="font-bold text-primary">{currentStep}</span>
            <span className="text-muted-foreground">/ 3</span>
          </div>

          {/* Security Badge */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <svg
              className="w-4 h-4 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="hidden sm:inline">Thanh toán bảo mật</span>
          </div>
        </div>
      </div>
    </header>
  )
}
