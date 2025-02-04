import { Button } from "@/src/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { useEffect, useState } from "react"

interface CustomerInputDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { numberOfCustomers: number }) => void
  initialCustomers?: number
}

export function CustomerInputDialog({ open, onOpenChange, onSubmit, initialCustomers = 1 }: CustomerInputDialogProps) {
  const [numberOfCustomers, setNumberOfCustomers] = useState(initialCustomers)

  useEffect(() => {
    if (open) {
      setNumberOfCustomers(initialCustomers)
    }
  }, [open, initialCustomers])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ numberOfCustomers })
    setNumberOfCustomers(1)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Customer Information</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="numberOfCustomers" className="text-right">
                Number of Customers
              </Label>
              <Input
                id="numberOfCustomers"
                type="number"
                value={numberOfCustomers}
                onChange={(e) => setNumberOfCustomers(Number(e.target.value))}
                className="col-span-3"
                min={1}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

