"use client"

import { Button } from "@/src/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { useState } from "react"
import type { TableData, TableStatus } from "./floor-plan"

interface AddTableDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onAddTable: (newTable: Omit<TableData, "id">) => void
}

export function AddTableDialog({ open, onOpenChange, onAddTable }: AddTableDialogProps) {
    const [number, setNumber] = useState("")
    const [status, setStatus] = useState<TableStatus>("available")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onAddTable({
            number,
            status,
            orders: [],
        })
        setNumber("")
        setStatus("available")
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Table</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="number" className="text-right">
                                Table Number
                            </Label>
                            <Input
                                id="number"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Initial Status
                            </Label>
                            <Select value={status} onValueChange={(value) => setStatus(value as TableStatus)}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="available">Available</SelectItem>
                                    <SelectItem value="occupied">Occupied</SelectItem>
                                    <SelectItem value="reserved">Reserved</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add Table</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

