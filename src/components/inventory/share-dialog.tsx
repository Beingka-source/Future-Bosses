"use client"

import { Button } from "@/src/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Copy, Mail } from "lucide-react"

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ShareDialog({ open, onOpenChange }: ShareDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Inventory</DialogTitle>
          <DialogDescription>Share your inventory with others via link or email.</DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="grid gap-2">
            <Label>Share Link</Label>
            <div className="flex gap-2">
              <Input readOnly value="https://foodzy.com/inventory/share/abc123" />
              <Button variant="outline" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Share via Email</Label>
            <div className="flex gap-2">
              <Input type="email" placeholder="Enter email address" />
              <Button variant="outline" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-[#f77700] hover:bg-[#f77700]/90">Share</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

