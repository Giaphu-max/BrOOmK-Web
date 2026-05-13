"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, User, LogIn, ChevronDown, Briefcase, Settings, LogOut, CreditCard, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AuthModal } from "./auth-modal"

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/#activities", label: "Hoạt động" },
  { href: "/#cuisine", label: "Ẩm thực" },
  { href: "/#about", label: "Về chúng tôi" },
]

export default function HeaderCompact() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const savedState = localStorage.getItem("isLoggedIn")
    if (savedState === "true") {
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/">
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">B</span>
                  </div>
                </div>
                <span className="text-lg font-bold text-foreground">
                  Br<span className="text-primary">OO</span>mK
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href}>
                  <motion.span
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
                    whileHover={{ y: -1 }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              ))}
            </nav>

            {/* Desktop Auth Button */}
            <div className="hidden lg:flex items-center gap-3">
              {!isLoggedIn ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="glass border-primary/30 hover:bg-primary/10"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Đăng nhập
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Đăng ký
                  </Button>
                </>
              ) : (
                <div className="group relative">
                  <div className="flex items-center gap-2 cursor-pointer p-1 pr-3 rounded-full hover:bg-slate-100/50 transition-all border border-primary/20 bg-white/50">
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white font-bold text-[10px]">
                      GP
                    </div>
                    <div className="text-left">
                      <p className="text-[9px] text-muted-foreground leading-none">Xin chào,</p>
                      <p className="text-xs font-bold text-foreground leading-tight">Gia Phú</p>
                    </div>
                    <ChevronDown className="w-3 h-3 text-muted-foreground group-hover:rotate-180 transition-transform" />
                  </div>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2 overflow-hidden">
                    <Link href="/profile" className="flex items-center gap-3 p-2.5 text-slate-600 hover:bg-teal-50 hover:text-teal-600 rounded-xl transition-colors">
                      <User className="w-4 h-4" />
                      <span className="text-sm font-medium">Hồ sơ cá nhân</span>
                    </Link>

                    <Link href="/my-trips" className="flex items-center gap-3 p-2.5 text-slate-600 hover:bg-teal-50 hover:text-teal-600 rounded-xl transition-colors">
                      <Briefcase className="w-4 h-4" />
                      <span className="text-sm font-medium">Chuyến đi của tôi</span>
                    </Link>

                    <Link href="/payment" className="flex items-center gap-3 p-2.5 text-slate-600 hover:bg-teal-50 hover:text-teal-600 rounded-xl transition-colors">
                      <CreditCard className="w-4 h-4" />
                      <span className="text-sm font-medium">Phương thức thanh toán</span>
                    </Link>

                    <Link href="/notifications" className="flex items-center justify-between p-2.5 text-slate-600 hover:bg-teal-50 hover:text-teal-600 rounded-xl transition-colors">
                      <div className="flex items-center gap-3">
                        <Bell className="w-4 h-4" />
                        <span className="text-sm font-medium">Thông báo</span>
                      </div>
                      <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
                    </Link>

                    <Link href="/settings" className="flex items-center gap-3 p-2.5 text-slate-600 hover:bg-teal-50 hover:text-teal-600 rounded-xl transition-colors">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm font-medium">Cài đặt</span>
                    </Link>

                    <div className="h-px bg-slate-100 my-1" />

                    <button
                      onClick={() => {
                        setIsLoggedIn(false);
                        localStorage.removeItem("isLoggedIn");
                      }}
                      className="flex w-full items-center gap-3 p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Đăng xuất</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass-strong border-t border-border/50"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
                {navLinks.map((link, index) => (
                  <Link key={link.label} href={link.href}>
                    <motion.span
                      className="block text-foreground font-medium py-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                ))}
                <div className="flex flex-col gap-2 pt-3 border-t border-border/50">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setIsAuthModalOpen(true)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Đăng nhập
                  </Button>
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-primary to-primary/80"
                    onClick={() => {
                      setIsAuthModalOpen(true)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Đăng ký
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
          setIsAuthModalOpen(false);
        }}
      />
    </>
  )
}