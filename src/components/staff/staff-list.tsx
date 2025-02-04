"use client"

import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { AnimatePresence, motion } from "framer-motion"
import { Bell, Plus, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { StaffCard } from "./staff-card"

// Sample data - in a real app this would come from an API
const staffMembers = [
  {
    id: 1,
    name: "Maria Lopez",
    email: "maria.lopez@gmail.com",
    phone: "0812345678",
    position: "Cashier",
    servicePeriod: "2 years",
    status: "On Shift",
    image: "/placeholder.svg",
    education: "High School Graduate",
    skills: ["Cash Handling", "Customer Service", "POS Systems"],
    experience: "2 years",
    assignedSection: "Front Counter",
    performance: 85,
    errorCount: 1,
  },
  {
    id: 2,
    name: "Liam Turner",
    email: "liam.turner@gmail.com",
    phone: "0812345678",
    position: "Waiter",
    servicePeriod: "1 years",
    status: "On Shift",
    image: "/placeholder.svg",
    education: "High School Graduate",
    skills: ["Food Presentation", "Beverage Service", "POS Handling", "Customer Service"],
    experience: "3 years",
    assignedSection: "Dining Room",
    performance: 65,
    errorCount: 2,
  },
  {
    id: 3,
    name: "Sophie Chen",
    email: "sophie.chen@gmail.com",
    phone: "0812345678",
    position: "Bartender",
    servicePeriod: "3 years",
    status: "Off Duty",
    image: "/placeholder.svg",
    education: "Bachelor's in Hospitality",
    skills: ["Mixology", "Inventory Management", "Customer Service"],
    experience: "5 years",
    assignedSection: "Bar",
    performance: 55,
    errorCount: 3,
  },
  {
    id: 4,
    name: "Alex Johnson",
    email: "alex.johnson@gmail.com",
    phone: "0812345678",
    position: "Chef",
    servicePeriod: "4 years",
    status: "On Shift",
    image: "/placeholder.svg",
    education: "Culinary School Graduate",
    skills: ["Food Preparation", "Menu Planning", "Kitchen Management"],
    experience: "7 years",
    assignedSection: "Kitchen",
    performance: 45,
    errorCount: 4,
  },
]

export function StaffList() {
  const [expandedStaff, setExpandedStaff] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [positionFilter, setPositionFilter] = useState("All")

  const filteredStaff = staffMembers.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPosition = positionFilter === "All" || staff.position === positionFilter
    return matchesSearch && matchesPosition
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Staff</h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Link href="/staff/new">
            <Button className="bg-[#f77700] hover:bg-[#f77700]/90">
              <Plus className="mr-2 h-4 w-4" />
              Add New Staff
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={positionFilter} onValueChange={setPositionFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Position: All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Waiter">Waiter</SelectItem>
            <SelectItem value="Cashier">Cashier</SelectItem>
            <SelectItem value="Bartender">Bartender</SelectItem>
            <SelectItem value="Chef">Chef</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-lg border bg-white"
      >
        <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr] gap-4 border-b bg-gray-50/50 p-4 text-sm font-medium text-gray-500">
          <div>Name</div>
          <div>Contacts</div>
          <div>Position</div>
          <div>Service Period</div>
          <div>Status</div>
        </div>
        <AnimatePresence>
          {filteredStaff.map((staff) => (
            <motion.div
              key={staff.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <StaffCard
                staff={staff}
                isExpanded={expandedStaff === staff.id}
                onToggle={() => setExpandedStaff(expandedStaff === staff.id ? null : staff.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

