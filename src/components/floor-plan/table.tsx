import { cn } from "@/lib/utils"
import type { TableData } from "./floor-plan"
import { Users, DollarSign, Check } from "lucide-react"

interface TableProps {
  table: TableData
  onClick?: () => void
  onComplete?: () => void
}

export function Table({ table, onClick, onComplete }: TableProps) {
  const isClickable = table.status !== "reserved"

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
      )}
      onClick={onClick}
    >
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
            {table.totalCost && (
              <div className="mt-1 flex items-center justify-center text-xs text-gray-600">
                <DollarSign className="mr-1 h-3 w-3" />
                {table.totalCost.toFixed(2)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

