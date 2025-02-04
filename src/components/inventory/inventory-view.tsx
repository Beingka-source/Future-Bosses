"use client"

import { useInventory } from "@/lib/inventory"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { motion } from "framer-motion"
import { Bell, Plus, Search, Share } from "lucide-react"
import { useState } from "react"
import { AddProductDialog } from "./add-product-dialog"
import { InventoryStats } from "./inventory-stats"
import { LowStockDialog } from "./low-stock-dialog"
import { ProductTable } from "./product-table"
import { ShareDialog } from "./share-dialog"
import { TopUsedDialog } from "./top-used-dialog"

export function InventoryView() {
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [showTopUsed, setShowTopUsed] = useState(false)
  const [showLowStock, setShowLowStock] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const { inventory, getLowStockItems } = useInventory()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Inventory</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-lg border bg-white p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold mb-4">Overall Inventory</h2>
        <InventoryStats
          inventory={inventory}
          lowStockItems={getLowStockItems()}
          onTopUsedClick={() => setShowTopUsed(true)}
          onLowStockClick={() => setShowLowStock(true)}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="rounded-lg border bg-white shadow-sm"
      >
        <div className="border-b p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search product..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setShowShare(true)}>
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button className="bg-[#f77700] hover:bg-[#f77700]/90" onClick={() => setShowAddProduct(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>
        </div>
        <ProductTable searchQuery={searchQuery} inventory={inventory} />
      </motion.div>

      <AddProductDialog open={showAddProduct} onOpenChange={setShowAddProduct} />
      <ShareDialog open={showShare} onOpenChange={setShowShare} />
      <TopUsedDialog open={showTopUsed} onOpenChange={setShowTopUsed} />
      <LowStockDialog open={showLowStock} onOpenChange={setShowLowStock} />
    </motion.div>
  )
}

