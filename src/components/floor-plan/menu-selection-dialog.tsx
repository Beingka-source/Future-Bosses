import { Button } from "@/src/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { Search } from "lucide-react"
import { useState } from "react"

interface MenuItem {
  id: string
  name: string
  price: number
  category: string
}

const menuItems: MenuItem[] = [
  { id: "1", name: "Pad Thai", price: 120, category: "Main Course" },
  { id: "2", name: "Green Curry", price: 150, category: "Main Course" },
  { id: "3", name: "Tom Yum Soup", price: 180, category: "Soup" },
  { id: "4", name: "Mango Sticky Rice", price: 100, category: "Dessert" },
  { id: "5", name: "Spring Rolls", price: 80, category: "Appetizer" },
  { id: "6", name: "Thai Iced Tea", price: 60, category: "Beverage" },
  { id: "7", name: "Papaya Salad", price: 90, category: "Appetizer" },
  { id: "8", name: "Massaman Curry", price: 160, category: "Main Course" },
]

interface MenuSelectionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectItems: (items: { id: string; name: string; quantity: number; price: number }[]) => void
}

export function MenuSelectionDialog({ open, onOpenChange, onSelectItems }: MenuSelectionDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({})

  const filteredItems = menuItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleQuantityChange = (itemId: string, increment: boolean) => {
    setSelectedItems((prev) => {
      const currentQuantity = prev[itemId] || 0
      const newQuantity = increment ? currentQuantity + 1 : Math.max(0, currentQuantity - 1)

      if (newQuantity === 0) {
        const { [itemId]: _, ...rest } = prev
        return rest
      }

      return { ...prev, [itemId]: newQuantity }
    })
  }

  const handleSubmit = () => {
    const items = Object.entries(selectedItems).map(([itemId, quantity]) => {
      const menuItem = menuItems.find((item) => item.id === itemId)!
      return {
        id: itemId,
        name: menuItem.name,
        quantity,
        price: menuItem.price,
      }
    })
    onSelectItems(items)
    setSelectedItems({})
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select Menu Items</DialogTitle>
        </DialogHeader>
        <div className="relative my-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search menu items..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <ScrollArea className="h-[400px] pr-4">
          <div className="grid gap-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <p className="text-sm font-medium text-[#f77700]">฿{item.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(item.id, false)}
                    disabled={!selectedItems[item.id]}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{selectedItems[item.id] || 0}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(item.id, true)}
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={Object.keys(selectedItems).length === 0}
            className="bg-[#f77700] hover:bg-[#f77700]/90"
          >
            Add Selected Items
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

