import { cn } from "@/lib/utils"
import { Check, DollarSign, Trash2, Users } from "lucide-react"
import type { TableData } from "./floor-plan"

interface TableProps {
  table: TableData
  onClick?: () => void
  onComplete?: () => void
  isRemoveMode?: boolean
  onRemove?: () => void
}

export function Table({ table, onClick, onComplete, isRemoveMode, onRemove }: TableProps) {
  const isClickable = table.status !== "reserved" || isRemoveMode

  return (
    <div
      className={cn(
        "aspect-square rounded-lg border p-4 transition-colors relative",
        table.status === "ordered" && "border-red-500 bg-red-50",
        table.status === "serving" && "border-green-500 bg-green-50",
        table.status === "reserved" && "border-purple-500 bg-purple-50",
        table.status === "available" && "border-gray-200 bg-gray-50",
        table.status === "occupied" && "border-blue-500 bg-blue-50",
        isClickable && "cursor-pointer hover:bg-gray-100",
        isRemoveMode && "border-red-500 hover:bg-red-100",
      )}
      onClick={isRemoveMode ? undefined : onClick}
    >
      {isRemoveMode && (
        <button
          className="absolute inset-0 flex items-center justify-center bg-red-100 bg-opacity-50 text-red-600 w-full h-full"
          onClick={(e) => {
            e.stopPropagation()
            onRemove?.()
          }}
        >
          <Trash2 className="h-6 w-6" />
        </button>
      )}
      {(table.status === "ordered" || table.status === "serving" || table.status === "occupied") && (
        <button
          className="absolute top-2 right-2 w-6 h-6 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white"
          onClick={(e) => {
            e.stopPropagation()
            onComplete?.()
          }}
        >
          <Check className="h-4 w-4" />
        </button>
      )}
      <div className="text-center">
        <div
          className={cn(
            "text-lg font-medium",
            table.status === "ordered" && "text-red-700",
            table.status === "serving" && "text-green-700",
            table.status === "reserved" && "text-purple-700",
            table.status === "available" && "text-gray-700",
            table.status === "occupied" && "text-blue-700",
          )}
        >
          {table.number}
        </div>
        <div className="mt-1 text-sm capitalize text-gray-500">{table.status}</div>
        {table.status === "reserved" && table.booking && (
          <div className="mt-2 text-xs text-purple-600">{table.booking.bookingTime}</div>
        )}
        {(table.status === "ordered" || table.status === "serving" || table.status === "occupied") && (
          <>
            <div className="mt-2 flex items-center justify-center text-xs text-gray-600">
              <Users className="mr-1 h-3 w-3" />
              {table.numberOfCustomers}
            </div>
            <div className="mt-1 flex items-center justify-center text-xs text-gray-600">
              <DollarSign className="mr-1 h-3 w-3" />
              {table.totalCost?.toFixed(2)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

