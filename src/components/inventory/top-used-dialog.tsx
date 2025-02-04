"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { TrendingUp } from "lucide-react"

interface TopUsedDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const topUsedProducts = [
  {
    name: "Chicken Breast",
    usageCount: 150,
    totalCost: 15000,
    lastUsed: "2 hours ago",
  },
  {
    name: "Rice",
    usageCount: 120,
    totalCost: 12000,
    lastUsed: "1 hour ago",
  },
  {
    name: "Cooking Oil",
    usageCount: 100,
    totalCost: 10000,
    lastUsed: "30 minutes ago",
  },
  {
    name: "Tomatoes",
    usageCount: 90,
    totalCost: 9000,
    lastUsed: "45 minutes ago",
  },
  {
    name: "Onions",
    usageCount: 85,
    totalCost: 8500,
    lastUsed: "1 hour ago",
  },
]

export function TopUsedDialog({ open, onOpenChange }: TopUsedDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Top Used Products
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Usage Count</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead>Last Used</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topUsedProducts.map((product) => (
                <TableRow key={product.name}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.usageCount}</TableCell>
                  <TableCell>฿{product.totalCost.toLocaleString()}</TableCell>
                  <TableCell>{product.lastUsed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}

