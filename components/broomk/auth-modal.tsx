"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Lock, Eye, EyeOff, CheckCircle2, User } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

type AuthState = "login" | "register" | "success"

// Confetti particle component
const ConfettiParticle = ({ delay, x, color }: { delay: number; x: number; color: string }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full"
    style={{ backgroundColor: color, left: `${x}%` }}
    initial={{ y: 0, opacity: 1, scale: 1 }}
    animate={{
      y: [0, -100, 200],
      opacity: [1, 1, 0],
      scale: [1, 1.2, 0.8],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 2,
      delay,
      ease: "easeOut",
    }}
  />
)

// Google Icon SVG
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
)

// Facebook Icon SVG
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path
      fill="#1877F2"
      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
    />
  </svg>
)

// Thêm onLoginSuccess vào đây
export function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps & { onLoginSuccess: () => void }) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login")
  const [authState, setAuthState] = useState<AuthState>("login")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Form states
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const confettiColors = ["#0d9488", "#14b8a6", "#2dd4bf", "#5eead4", "#f59e0b", "#fbbf24"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsLoading(false)
    setAuthState("success")

    // Auto close after success
    setTimeout(() => {
      onLoginSuccess()
      onClose()
      // Reset state after close
      setTimeout(() => {
        setAuthState("login")
        setActiveTab("login")
        setEmail("")
        setPassword("")
        setName("")
        setConfirmPassword("")
      }, 300)
    }, 2500)
  }

  const handleTabChange = (tab: "login" | "register") => {
    setActiveTab(tab)
    setAuthState(tab)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setAuthState("login")
      setActiveTab("login")
      setEmail("")
      setPassword("")
      setName("")
      setConfirmPassword("")
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close button */}
            <motion.button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5" />
            </motion.button>

            <AnimatePresence mode="wait">
              {authState === "success" ? (
                /* Success State */
                <motion.div
                  key="success"
                  className="p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                >
                  {/* Confetti */}
                  <div className="absolute inset-0 pointer-events-none">
                    {confettiColors.map((color, i) => (
                      <ConfettiParticle
                        key={`left-${i}`}
                        delay={i * 0.1}
                        x={10 + i * 5}
                        color={color}
                      />
                    ))}
                    {confettiColors.map((color, i) => (
                      <ConfettiParticle
                        key={`right-${i}`}
                        delay={i * 0.1 + 0.05}
                        x={60 + i * 5}
                        color={color}
                      />
                    ))}
                    {confettiColors.map((color, i) => (
                      <ConfettiParticle
                        key={`center-${i}`}
                        delay={i * 0.1 + 0.1}
                        x={35 + i * 5}
                        color={color}
                      />
                    ))}
                  </div>

                  {/* Success Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10, stiffness: 200, delay: 0.2 }}
                  >
                    <motion.div
                      className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <CheckCircle2 className="w-14 h-14 text-teal-600" />
                    </motion.div>
                  </motion.div>

                  {/* Success Text */}
                  <motion.h2
                    className="mt-6 text-2xl font-bold text-slate-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Đăng nhập thành công!
                  </motion.h2>
                  <motion.p
                    className="mt-2 text-slate-500 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Chào mừng bạn quay trở lại BrOOmK
                  </motion.p>
                </motion.div>
              ) : (
                /* Login/Register Form */
                <motion.div
                  key="form"
                  className="p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Logo */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">B</span>
                    </div>
                    <span className="ml-2 text-xl font-bold text-slate-800">
                      Br<span className="text-teal-600">OO</span>mK
                    </span>
                  </div>

                  {/* Tabs */}
                  <div className="flex bg-slate-100 rounded-2xl p-1 mb-6">
                    <motion.button
                      className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-colors relative ${activeTab === "login" ? "text-white" : "text-slate-600 hover:text-slate-800"
                        }`}
                      onClick={() => handleTabChange("login")}
                      whileTap={{ scale: 0.98 }}
                    >
                      {activeTab === "login" && (
                        <motion.div
                          className="absolute inset-0 bg-teal-600 rounded-xl"
                          layoutId="activeTab"
                          transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        />
                      )}
                      <span className="relative z-10">Đăng nhập</span>
                    </motion.button>
                    <motion.button
                      className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-colors relative ${activeTab === "register" ? "text-white" : "text-slate-600 hover:text-slate-800"
                        }`}
                      onClick={() => handleTabChange("register")}
                      whileTap={{ scale: 0.98 }}
                    >
                      {activeTab === "register" && (
                        <motion.div
                          className="absolute inset-0 bg-teal-600 rounded-xl"
                          layoutId="activeTab"
                          transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        />
                      )}
                      <span className="relative z-10">Đăng ký</span>
                    </motion.button>
                  </div>

                  {/* Form */}
                  <AnimatePresence mode="wait">
                    <motion.form
                      key={activeTab}
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0, x: activeTab === "login" ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: activeTab === "login" ? 20 : -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {activeTab === "register" && (
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Họ và tên"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                            required
                          />
                        </div>
                      )}

                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                          required
                        />
                      </div>

                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Mật khẩu"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>

                      {activeTab === "register" && (
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Xác nhận mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      )}

                      {activeTab === "login" && (
                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                          >
                            Quên mật khẩu?
                          </button>
                        </div>
                      )}

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-2xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isLoading ? (
                          <motion.span
                            className="flex items-center justify-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <motion.span
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Đang xử lý...
                          </motion.span>
                        ) : (
                          activeTab === "login" ? "Đăng nhập" : "Đăng ký"
                        )}
                      </motion.button>
                    </motion.form>
                  </AnimatePresence>

                  {/* Divider */}
                  <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-slate-200" />
                    <span className="text-sm text-slate-400">hoặc</span>
                    <div className="flex-1 h-px bg-slate-200" />
                  </div>

                  {/* Social Login */}
                  <div className="space-y-3">
                    <motion.button
                      type="button"
                      className="w-full py-3.5 px-4 border border-slate-200 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <GoogleIcon />
                      <span className="font-medium text-slate-700">Tiếp tục với Google</span>
                    </motion.button>
                    <motion.button
                      type="button"
                      className="w-full py-3.5 px-4 border border-slate-200 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FacebookIcon />
                      <span className="font-medium text-slate-700">Tiếp tục với Facebook</span>
                    </motion.button>
                  </div>

                  {/* Terms */}
                  <p className="mt-6 text-xs text-center text-slate-400">
                    Bằng việc tiếp tục, bạn đồng ý với{" "}
                    <a href="#" className="text-teal-600 hover:underline">
                      Điều khoản sử dụng
                    </a>{" "}
                    và{" "}
                    <a href="#" className="text-teal-600 hover:underline">
                      Chính sách bảo mật
                    </a>{" "}
                    của BrOOmK.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
