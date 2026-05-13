"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Calendar, Users, Search, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchParams {
  location: string
  checkIn: string
  checkOut: string
  guests: number
  rooms: number
}

interface SearchBarCompactProps {
  initialParams?: SearchParams
  onSearch?: (params: SearchParams) => void
}

export default function SearchBarCompact({ 
  initialParams = {
    location: "Đà Nẵng",
    checkIn: "2024-03-15",
    checkOut: "2024-03-18",
    guests: 2,
    rooms: 1
  },
  onSearch 
}: SearchBarCompactProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [params, setParams] = useState<SearchParams>(initialParams)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })
  }

  const handleSearch = () => {
    onSearch?.(params)
    setIsExpanded(false)
  }

  return (
    <div className="sticky top-14 z-40 glass-strong border-b border-border/30">
      <div className="container mx-auto px-4 py-3">
        {/* Collapsed View */}
        <motion.div
          className="flex items-center gap-2 lg:gap-4"
          initial={false}
        >
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 flex items-center gap-2 lg:gap-6 p-2 lg:p-3 rounded-xl glass border border-border/50 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center gap-2 text-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-medium text-sm lg:text-base">{params.location}</span>
            </div>
            
            <div className="hidden sm:block w-px h-6 bg-border/50" />
            
            <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm">{formatDate(params.checkIn)} - {formatDate(params.checkOut)}</span>
            </div>
            
            <div className="hidden md:block w-px h-6 bg-border/50" />
            
            <div className="hidden md:flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm">{params.guests} khách, {params.rooms} phòng</span>
            </div>

            <ChevronDown className={`w-4 h-4 text-muted-foreground ml-auto transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>

          <Button
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shrink-0"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Search className="w-4 h-4 lg:mr-2" />
            <span className="hidden lg:inline">Sửa tìm kiếm</span>
          </Button>
        </motion.div>

        {/* Expanded Edit Form */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 pb-2">
                <div className="glass rounded-2xl p-4 lg:p-6 border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Chỉnh sửa tìm kiếm</h3>
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="p-1 rounded-lg hover:bg-muted transition-colors"
                    >
                      <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Location */}
                    <div className="lg:col-span-1">
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Điểm đến
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                        <Input
                          value={params.location}
                          onChange={(e) => setParams({ ...params, location: e.target.value })}
                          className="pl-10 bg-background/50"
                          placeholder="Nhập điểm đến"
                        />
                      </div>
                    </div>

                    {/* Check-in */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Nhận phòng
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                        <Input
                          type="date"
                          value={params.checkIn}
                          onChange={(e) => setParams({ ...params, checkIn: e.target.value })}
                          className="pl-10 bg-background/50"
                        />
                      </div>
                    </div>

                    {/* Check-out */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Trả phòng
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                        <Input
                          type="date"
                          value={params.checkOut}
                          onChange={(e) => setParams({ ...params, checkOut: e.target.value })}
                          className="pl-10 bg-background/50"
                        />
                      </div>
                    </div>

                    {/* Guests & Rooms */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Khách & Phòng
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                          <Input
                            type="number"
                            min={1}
                            value={params.guests}
                            onChange={(e) => setParams({ ...params, guests: parseInt(e.target.value) || 1 })}
                            className="pl-10 bg-background/50"
                          />
                        </div>
                        <Input
                          type="number"
                          min={1}
                          value={params.rooms}
                          onChange={(e) => setParams({ ...params, rooms: parseInt(e.target.value) || 1 })}
                          className="w-20 bg-background/50 text-center"
                        />
                      </div>
                    </div>

                    {/* Search Button */}
                    <div className="flex items-end">
                      <Button
                        onClick={handleSearch}
                        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                      >
                        <Search className="w-4 h-4 mr-2" />
                        Tìm kiếm
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
