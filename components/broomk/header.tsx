"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, User, LogIn, ChevronDown, Briefcase, Settings, LogOut, CreditCard, Bell, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthModal } from "./auth-modal"

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "#activities", label: "Hoạt động" },
  { href: "#cuisine", label: "Ẩm thực" },
  { href: "#about", label: "Về chúng tôi" },
]

export default function Header() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const savedState = localStorage.getItem("isLoggedIn")
    if (savedState === "true") {
      setIsLoggedIn(true)
    }
  }, [])

  // Tìm đến hàm handleNavClick trong file Header.tsx và chép đè đoạn này:
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isHashLink = href.startsWith('#')
    const isHomeHashLink = href.startsWith('/#')
    const isHomePage = href === '/'

    // TRƯỜNG HỢP 1: Bấm vào nút "Trang chủ" khi đang ở ngay trang chủ
    if (isHomePage && window.location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
      setIsMobileMenuOpen(false)
      return
    }

    // TRƯỜNG HỢP 2: Các link neo (#activities, #about...)
    if (isHashLink || (isHomeHashLink && window.location.pathname === '/')) {
      e.preventDefault()

      const targetId = isHashLink ? href.substring(1) : href.replace('/#', '')
      const element = document.getElementById(targetId)

      if (element) {
        const headerOffset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })

        setIsMobileMenuOpen(false)
      }
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/">
              <motion.div
                className="flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">B</span>
                  </div>
                </div>
                <span className="text-xl lg:text-2xl font-bold text-foreground">
                  Br<span className="text-primary">OO</span>mK
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)} // ĐÃ THÊM HÀM CLICK
                >
                  <motion.span
                    className="text-muted-foreground hover:text-foreground transition-colors font-medium cursor-pointer inline-block"
                    whileHover={{ y: -2 }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              ))}
            </nav>

            {/* Desktop Auth Button */}
            <div className="hidden lg:flex items-center gap-4">
              {!isLoggedIn ? (
                <>
                  <Button
                    variant="outline"
                    className="glass border-primary/30 hover:bg-primary/10"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Đăng nhập
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Đăng ký
                  </Button>
                </>
              ) : (
                <div className="group relative">
                  <div className="flex items-center gap-3 cursor-pointer p-1 pr-3 rounded-full hover:bg-slate-100/50 transition-all border border-primary/20 bg-white/50">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
                      GP
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-muted-foreground leading-none">Xin chào,</p>
                      <p className="text-sm font-bold text-foreground leading-tight">Gia Phú</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:rotate-180 transition-transform" />
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

                    <Link href="/rewards" className="flex items-center gap-3 p-2.5 text-slate-600 hover:bg-teal-50 hover:text-teal-600 rounded-xl transition-colors">
                      <Gift className="w-4 h-4" />
                      <span className="text-sm font-medium">Ưu đãi & Điểm thưởng</span>
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
                        router.push("/");
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
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)} // ĐÃ THÊM HÀM CLICK
                  >
                    <motion.span
                      className="block text-foreground font-medium py-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                ))}
                <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                  <Button
                    variant="outline"
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