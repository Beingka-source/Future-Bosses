import { useState } from "react"

interface InventoryItem {
  id: string
  name: string
  quantity: number
  threshold: number
  category: string
}

const initialInventory: InventoryItem[] = [
  { id: "1", name: "Chicken", quantity: 50, threshold: 10, category: "Meat" },
  { id: "2", name: "Rice", quantity: 100, threshold: 20, category: "Grains" },
  { id: "3", name: "Tomatoes", quantity: 30, threshold: 5, category: "Vegetables" },
  { id: "4", name: "Cooking Oil", quantity: 20, threshold: 5, category: "Condiments" },
]

export const useInventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory)

  const updateInventory = (itemName: string, quantityUsed: number) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.name.toLowerCase() === itemName.toLowerCase()
          ? { ...item, quantity: Math.max(0, item.quantity - quantityUsed) }
          : item,
      ),
    )
  }

  const getLowStockItems = () => {
    return inventory.filter((item) => item.quantity <= item.threshold)
  }

  return { inventory, updateInventory, getLowStockItems }
}

export const updateInventory = (itemName: string, quantityUsed: number) => {
  // This function will be called from the order processing component
  // It should update the inventory in the global state or database
  console.log(`Updating inventory: ${itemName}, used: ${quantityUsed}`)
  // Implement the actual update logic here, e.g., using a context or database call
}

