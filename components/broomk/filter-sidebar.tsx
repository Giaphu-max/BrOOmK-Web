"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SlidersHorizontal, X, ChevronDown, MapPin, Bed, DoorOpen, BadgeDollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface FilterState {
  areas: string[]
  roomTypes: string[]
  availability: boolean
  priceRange: [number, number]
}

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void
}

const areas = [
  { id: "hai-chau", label: "Quận Hải Châu", count: 45 },
  { id: "son-tra", label: "Quận Sơn Trà", count: 32 },
  { id: "ngu-hanh-son", label: "Quận Ngũ Hành Sơn", count: 28 },
  { id: "thanh-khe", label: "Quận Thanh Khê", count: 15 },
  { id: "lien-chieu", label: "Quận Liên Chiểu", count: 12 },
]

const roomTypes = [
  { id: "standard", label: "Phòng Standard", count: 89 },
  { id: "deluxe", label: "Phòng Deluxe", count: 67 },
  { id: "suite", label: "Phòng Suite", count: 34 },
  { id: "family", label: "Phòng Gia đình", count: 23 },
  { id: "villa", label: "Villa / Biệt thự", count: 12 },
]

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>(["area", "roomType", "availability", "price"])
  const [filters, setFilters] = useState<FilterState>({
    areas: [],
    roomTypes: [],
    availability: false,
    priceRange: [0, 5000000],
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    )
  }

  const handleAreaChange = (areaId: string, checked: boolean) => {
    const newAreas = checked
      ? [...filters.areas, areaId]
      : filters.areas.filter(a => a !== areaId)
    const newFilters = { ...filters, areas: newAreas }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleRoomTypeChange = (typeId: string, checked: boolean) => {
    const newTypes = checked
      ? [...filters.roomTypes, typeId]
      : filters.roomTypes.filter(t => t !== typeId)
    const newFilters = { ...filters, roomTypes: newTypes }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleAvailabilityChange = (checked: boolean) => {
    const newFilters = { ...filters, availability: checked }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handlePriceChange = (value: number, index: 0 | 1) => {
    const newRange: [number, number] = [...filters.priceRange] as [number, number]
    newRange[index] = value
    const newFilters = { ...filters, priceRange: newRange }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ"
  }

  const clearFilters = () => {
    const newFilters: FilterState = {
      areas: [],
      roomTypes: [],
      availability: false,
      priceRange: [0, 5000000],
    }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const activeFilterCount = filters.areas.length + filters.roomTypes.length + (filters.availability ? 1 : 0)

  const FilterContent = () => (
    <div className="space-y-4">
      {/* Area Filter */}
      <div className="glass rounded-xl border border-border/50 overflow-hidden">
        <button
          onClick={() => toggleSection("area")}
          className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="font-medium text-foreground">Khu vực</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expandedSections.includes("area") ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {expandedSections.includes("area") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-3">
                {areas.map((area) => (
                  <div key={area.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={area.id}
                        checked={filters.areas.includes(area.id)}
                        onCheckedChange={(checked) => handleAreaChange(area.id, checked as boolean)}
                      />
                      <Label htmlFor={area.id} className="text-sm text-foreground cursor-pointer">
                        {area.label}
                      </Label>
                    </div>
                    <span className="text-xs text-muted-foreground">({area.count})</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Room Type Filter */}
      <div className="glass rounded-xl border border-border/50 overflow-hidden">
        <button
          onClick={() => toggleSection("roomType")}
          className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Bed className="w-5 h-5 text-primary" />
            <span className="font-medium text-foreground">Loại phòng</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expandedSections.includes("roomType") ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {expandedSections.includes("roomType") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-3">
                {roomTypes.map((type) => (
                  <div key={type.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={type.id}
                        checked={filters.roomTypes.includes(type.id)}
                        onCheckedChange={(checked) => handleRoomTypeChange(type.id, checked as boolean)}
                      />
                      <Label htmlFor={type.id} className="text-sm text-foreground cursor-pointer">
                        {type.label}
                      </Label>
                    </div>
                    <span className="text-xs text-muted-foreground">({type.count})</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Availability Filter */}
      <div className="glass rounded-xl border border-border/50 overflow-hidden">
        <button
          onClick={() => toggleSection("availability")}
          className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <DoorOpen className="w-5 h-5 text-primary" />
            <span className="font-medium text-foreground">Còn phòng</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expandedSections.includes("availability") ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {expandedSections.includes("availability") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="available-only"
                    checked={filters.availability}
                    onCheckedChange={(checked) => handleAvailabilityChange(checked as boolean)}
                  />
                  <Label htmlFor="available-only" className="text-sm text-foreground cursor-pointer">
                    Chỉ hiện khách sạn còn phòng
                  </Label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price Range Filter */}
      <div className="glass rounded-xl border border-border/50 overflow-hidden">
        <button
          onClick={() => toggleSection("price")}
          className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <BadgeDollarSign className="w-5 h-5 text-primary" />
            <span className="font-medium text-foreground">Mức giá</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expandedSections.includes("price") ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {expandedSections.includes("price") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Từ: <span className="text-foreground font-medium">{formatPrice(filters.priceRange[0])}</span></span>
                  <span className="text-muted-foreground">Đến: <span className="text-foreground font-medium">{formatPrice(filters.priceRange[1])}</span></span>
                </div>
                <div className="space-y-3">
                  <input
                    type="range"
                    min={0}
                    max={5000000}
                    step={100000}
                    value={filters.priceRange[0]}
                    onChange={(e) => handlePriceChange(parseInt(e.target.value), 0)}
                    className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                  />
                  <input
                    type="range"
                    min={0}
                    max={5000000}
                    step={100000}
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceChange(parseInt(e.target.value), 1)}
                    className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                  />
                </div>
                <div className="flex gap-2">
                  {[500000, 1000000, 2000000, 3000000].map((price) => (
                    <button
                      key={price}
                      onClick={() => {
                        setFilters({ ...filters, priceRange: [0, price] })
                        onFilterChange?.({ ...filters, priceRange: [0, price] })
                      }}
                      className="flex-1 py-1.5 text-xs rounded-lg bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {"<"} {(price / 1000000).toFixed(1)}tr
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <Button
          variant="outline"
          className="w-full"
          onClick={clearFilters}
        >
          Xóa bộ lọc ({activeFilterCount})
        </Button>
      )}
    </div>
  )

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
        <Button
          onClick={() => setIsMobileOpen(true)}
          className="w-full bg-gradient-to-r from-primary to-primary/80 shadow-lg"
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Bộ lọc
          {activeFilterCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-accent text-accent-foreground rounded-full text-xs">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-overlay z-50"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-background z-50 overflow-y-auto"
            >
              <div className="sticky top-0 glass-strong p-4 flex items-center justify-between border-b border-border/50">
                <h2 className="font-semibold text-foreground">Bộ lọc tìm kiếm</h2>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <FilterContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-32">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-primary" />
              Bộ lọc tìm kiếm
            </h2>
          </div>
          <FilterContent />
        </div>
      </aside>
    </>
  )
}
