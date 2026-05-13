"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CreditCard, Wallet, Lock, ShieldCheck, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const paymentMethods = [
  {
    id: "card",
    name: "Thẻ Tín dụng / Ghi nợ",
    icon: CreditCard,
    description: "Visa, Mastercard, JCB",
    logos: ["/visa.svg", "/mastercard.svg", "/jcb.svg"],
  },
  {
    id: "ewallet",
    name: "Ví điện tử",
    icon: Wallet,
    description: "MoMo, ZaloPay, VNPay",
    logos: ["/momo.svg", "/zalopay.svg", "/vnpay.svg"],
  },
]

const ewalletOptions = [
  { id: "momo", name: "MoMo", color: "#A50064" },
  { id: "zalopay", name: "ZaloPay", color: "#008FE5" },
  { id: "vnpay", name: "VNPay", color: "#005BAA" },
]

interface PaymentMethodsProps {
  selectedMethod: string
  onMethodChange: (method: string) => void
  cardInfo: {
    number: string
    expiry: string
    cvv: string
    name: string
  }
  onCardChange: (field: string, value: string) => void
  selectedEwallet: string
  onEwalletChange: (ewallet: string) => void
  onSubmit: () => void
  isProcessing: boolean
}

export function PaymentMethods({
  selectedMethod,
  onMethodChange,
  cardInfo,
  onCardChange,
  selectedEwallet,
  onEwalletChange,
  onSubmit,
  isProcessing,
}: PaymentMethodsProps) {
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(" ") : value
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-2xl border border-white/10 bg-card/30 backdrop-blur-xl p-6 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <CreditCard className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Phương thức thanh toán</h2>
          <p className="text-sm text-muted-foreground">Chọn cách thanh toán phù hợp</p>
        </div>
      </div>

      {/* Payment Method Options */}
      <div className="space-y-3 mb-6">
        {paymentMethods.map((method) => {
          const Icon = method.icon
          const isSelected = selectedMethod === method.id

          return (
            <motion.button
              key={method.id}
              onClick={() => onMethodChange(method.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`
                w-full p-4 rounded-xl border transition-all duration-300 text-left
                ${isSelected
                  ? "border-primary/50 bg-primary/10 shadow-lg shadow-primary/10"
                  : "border-white/10 bg-background/30 hover:border-white/20"
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                      ${isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"}
                    `}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-primary-foreground"
                      />
                    )}
                  </div>
                  <div
                    className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      ${isSelected ? "bg-primary/20" : "bg-muted/30"}
                    `}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <p className={`font-medium ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                      {method.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{method.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {method.id === "card" && (
                    <>
                      <div className="w-8 h-5 bg-white rounded flex items-center justify-center">
                        <span className="text-[10px] font-bold text-blue-600">VISA</span>
                      </div>
                      <div className="w-8 h-5 bg-white rounded flex items-center justify-center">
                        <div className="flex">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500 -mr-1" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                        </div>
                      </div>
                    </>
                  )}
                  {method.id === "ewallet" && (
                    <>
                      <div className="w-8 h-5 bg-[#A50064] rounded flex items-center justify-center">
                        <span className="text-[8px] font-bold text-white">MoMo</span>
                      </div>
                      <div className="w-8 h-5 bg-[#008FE5] rounded flex items-center justify-center">
                        <span className="text-[8px] font-bold text-white">Zalo</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Card Form */}
      <AnimatePresence mode="wait">
        {selectedMethod === "card" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 overflow-hidden"
          >
            <div className="p-4 rounded-xl bg-background/30 border border-white/5 space-y-4">
              {/* Card Number */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Số thẻ</label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardInfo.number}
                    onChange={(e) => onCardChange("number", formatCardNumber(e.target.value))}
                    maxLength={19}
                    className="h-12 bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/20 rounded-xl pl-4 pr-12 placeholder:text-muted-foreground/50 font-mono tracking-wider"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* Card Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tên trên thẻ</label>
                <Input
                  type="text"
                  placeholder="NGUYEN VAN A"
                  value={cardInfo.name}
                  onChange={(e) => onCardChange("name", e.target.value.toUpperCase())}
                  className="h-12 bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/20 rounded-xl pl-4 placeholder:text-muted-foreground/50 uppercase tracking-wider"
                />
              </div>

              {/* Expiry & CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Ngày hết hạn</label>
                  <Input
                    type="text"
                    placeholder="MM/YY"
                    value={cardInfo.expiry}
                    onChange={(e) => onCardChange("expiry", formatExpiry(e.target.value))}
                    maxLength={5}
                    className="h-12 bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/20 rounded-xl pl-4 placeholder:text-muted-foreground/50 font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1">
                    CVV
                    <Info className="w-3 h-3 text-muted-foreground cursor-help" />
                  </label>
                  <Input
                    type="password"
                    placeholder="•••"
                    value={cardInfo.cvv}
                    onChange={(e) => onCardChange("cvv", e.target.value.replace(/\D/g, ""))}
                    maxLength={4}
                    className="h-12 bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/20 rounded-xl pl-4 placeholder:text-muted-foreground/50 font-mono tracking-widest"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {selectedMethod === "ewallet" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 rounded-xl bg-background/30 border border-white/5">
              <p className="text-sm text-muted-foreground mb-4">Chọn ví điện tử</p>
              <div className="grid grid-cols-3 gap-3">
                {ewalletOptions.map((wallet) => (
                  <motion.button
                    key={wallet.id}
                    onClick={() => onEwalletChange(wallet.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-2
                      ${selectedEwallet === wallet.id
                        ? "border-primary/50 bg-primary/10"
                        : "border-white/10 bg-background/30 hover:border-white/20"
                      }
                    `}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: wallet.color }}
                    >
                      {wallet.name.substring(0, 2)}
                    </div>
                    <span className="text-xs font-medium text-foreground">{wallet.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Security Notice */}
      <div className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-green-500">Thanh toán an toàn & bảo mật</p>
            <p className="text-xs text-muted-foreground mt-1">
              Thông tin thẻ của bạn được mã hóa SSL 256-bit và không được lưu trữ trên hệ thống
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <motion.div
        className="mt-6"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Button
          onClick={onSubmit}
          disabled={isProcessing}
          className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary via-primary to-accent hover:from-primary/90 hover:via-primary/90 hover:to-accent/90 shadow-xl shadow-primary/30 rounded-xl relative overflow-hidden group"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              <span>Đang xử lý...</span>
            </div>
          ) : (
            <>
              <Lock className="w-5 h-5 mr-2" />
              <span>Thanh toán an toàn</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />
            </>
          )}
        </Button>
      </motion.div>

      {/* Terms */}
      <p className="text-xs text-center text-muted-foreground mt-4">
        Bằng việc nhấn thanh toán, bạn đồng ý với{" "}
        <a href="#" className="text-primary hover:underline">Điều khoản sử dụng</a>
        {" "}và{" "}
        <a href="#" className="text-primary hover:underline">Chính sách bảo mật</a>
      </p>
    </motion.div>
  )
}
