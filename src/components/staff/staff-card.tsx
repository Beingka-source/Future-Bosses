"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Progress } from "@/src/components/ui/progress"
import { AnimatePresence, motion } from "framer-motion"
import { AlertTriangle, ChevronDown, ChevronUp, Pencil } from "lucide-react"
import { useState } from "react"

interface StaffMember {
  id: number
  name: string
  email: string
  phone: string
  position: string
  servicePeriod: string
  status: string
  image: string
  education: string
  skills: string[]
  experience: string
  assignedSection: string
  performance: number
  errorCount: number
}

interface StaffCardProps {
  staff: StaffMember
  isExpanded: boolean
  onToggle: () => void
}

export function StaffCard({ staff, isExpanded, onToggle }: StaffCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editedStaff, setEditedStaff] = useState(staff)

  const getPerformanceColor = (performance: number) => {
    if (performance >= 70) return "bg-green-500"
    if (performance >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getPerformanceWarning = (performance: number) => {
    if (performance < 50) return "Critical: Owner intervention required immediately"
    if (performance < 60) return "Final Warning: Performance improvement needed urgently"
    if (performance < 70) return "Warning: Performance needs improvement"
    return null
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the editedStaff data to your backend
    // For now, we'll just close the dialog
    setIsEditDialogOpen(false)
  }

  return (
    <div className="relative">
      <motion.div
        className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr] gap-4 p-4 cursor-pointer hover:bg-gray-50"
        onClick={onToggle}
        initial={false}
        animate={{ backgroundColor: isExpanded ? "#f3f4f6" : "#ffffff" }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-2">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {staff.name}
        </div>
        <div className="text-gray-500">
          {staff.email}
          <br />
          {staff.phone}
        </div>
        <div>{staff.position}</div>
        <div>{staff.servicePeriod}</div>
        <div>
          <span
            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${staff.status === "On Shift"
                ? "bg-green-50 text-green-700"
                : staff.status === "Off Duty"
                  ? "bg-gray-100 text-gray-700"
                  : "bg-yellow-50 text-yellow-700"
              }`}
          >
            {staff.status}
          </span>
        </div>
      </motion.div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t bg-gray-50/50 p-6 overflow-hidden"
          >
            <div className="flex gap-6">
              <Avatar className="h-32 w-32 rounded-lg">
                <AvatarImage src={staff.image} alt={staff.name} />
                <AvatarFallback>
                  {staff.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{staff.name}</h3>
                    <p className="text-gray-500">{staff.position}</p>
                  </div>
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Staff Profile</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleEditSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              value={editedStaff.name}
                              onChange={(e) => setEditedStaff({ ...editedStaff, name: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              value={editedStaff.email}
                              onChange={(e) => setEditedStaff({ ...editedStaff, email: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              value={editedStaff.phone}
                              onChange={(e) => setEditedStaff({ ...editedStaff, phone: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="position">Position</Label>
                            <Input
                              id="position"
                              value={editedStaff.position}
                              onChange={(e) => setEditedStaff({ ...editedStaff, position: e.target.value })}
                            />
                          </div>
                        </div>
                        <Button type="submit">Save Changes</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium">Education</div>
                    <div className="text-gray-500">{staff.education}</div>
                  </div>
                  <div>
                    <div className="font-medium">Skills</div>
                    <div className="text-gray-500">{staff.skills.join(", ")}</div>
                  </div>
                  <div>
                    <div className="font-medium">Experience</div>
                    <div className="text-gray-500">{staff.experience}</div>
                  </div>
                  <div>
                    <div className="font-medium">Assigned Section</div>
                    <div className="text-gray-500">{staff.assignedSection}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="font-medium">Performance</div>
                    <div className="flex items-center gap-2 mt-2">
                      <Progress value={staff.performance} className={getPerformanceColor(staff.performance)} />
                      <span className="text-sm font-medium">{staff.performance}%</span>
                    </div>
                    {getPerformanceWarning(staff.performance) && (
                      <div className="flex items-center gap-2 mt-2 text-red-600">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm">{getPerformanceWarning(staff.performance)}</span>
                      </div>
                    )}
                    <div className="text-sm text-gray-500 mt-1">
                      Errors in daily sales: {staff.errorCount} (affects performance)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

