import { Button } from "@/src/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { useState } from "react"

interface AddOrderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddOrder: (order: { name: string; quantity: number; price: number }) => void
}

export function AddOrderDialog({ open, onOpenChange, onAddOrder }: AddOrderDialogProps) {
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddOrder({ name, quantity, price })
    setName("")
    setQuantity(1)
    setPrice(0)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Order</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Item Name
              </Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="col-span-3"
                min={1}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="col-span-3"
                min={0}
                step={0.01}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Order</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

