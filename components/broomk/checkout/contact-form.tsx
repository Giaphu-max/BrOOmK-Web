"use client"

import { motion } from "framer-motion"
import { User, Mail, Phone, Info } from "lucide-react"
import { Input } from "@/components/ui/input"

interface ContactFormProps {
  contactInfo: {
    fullName: string
    email: string
    phone: string
  }
  onContactChange: (field: string, value: string) => void
}

export function ContactForm({ contactInfo, onContactChange }: ContactFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-2xl border border-white/10 bg-card/30 backdrop-blur-xl p-6 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <User className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Thông tin liên hệ</h2>
          <p className="text-sm text-muted-foreground">Thông tin để xác nhận đặt phòng</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            Họ và tên
            <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Nguyễn Văn A"
              value={contactInfo.fullName}
              onChange={(e) => onContactChange("fullName", e.target.value)}
              className="h-12 bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/20 rounded-xl pl-4 placeholder:text-muted-foreground/50"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            Email
            <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <Input
              type="email"
              placeholder="email@example.com"
              value={contactInfo.email}
              onChange={(e) => onContactChange("email", e.target.value)}
              className="h-12 bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/20 rounded-xl pl-4 placeholder:text-muted-foreground/50"
            />
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Info className="w-3 h-3" />
            Xác nhận đặt phòng sẽ được gửi về email này
          </p>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            Số điện thoại
            <span className="text-destructive">*</span>
          </label>
          <div className="relative flex gap-2">
            <div className="flex items-center gap-2 px-3 h-12 bg-background/50 border border-white/10 rounded-xl text-sm text-muted-foreground">
              <span className="text-base">🇻🇳</span>
              <span>+84</span>
            </div>
            <Input
              type="tel"
              placeholder="901 234 567"
              value={contactInfo.phone}
              onChange={(e) => onContactChange("phone", e.target.value)}
              className="flex-1 h-12 bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/20 rounded-xl pl-4 placeholder:text-muted-foreground/50"
            />
          </div>
        </div>

        {/* Special Request */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Yêu cầu đặc biệt
            <span className="text-muted-foreground font-normal ml-1">(Tùy chọn)</span>
          </label>
          <textarea
            placeholder="Ví dụ: Phòng tầng cao, giường đôi..."
            rows={3}
            className="w-full px-4 py-3 bg-background/50 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 rounded-xl text-sm placeholder:text-muted-foreground/50 resize-none outline-none transition-all"
          />
        </div>
      </div>
    </motion.div>
  )
}
