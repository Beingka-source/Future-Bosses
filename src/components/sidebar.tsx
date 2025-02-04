"use client"

import {
  ClipboardList,
  Package,
  LayoutGrid,
  FileCheck,
  User,
  ShoppingBag,
  HelpCircle,
  LogOut,
  Home,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname.startsWith(path)
  }

  return (
    <aside className="flex h-full flex-col bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          <ShoppingBag className="h-6 w-6 text-[#f77700]" />
          <span className="text-[#f77700]">foodZy</span>
        </Link>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 overflow-y-auto">
        <nav className="flex flex-col gap-2">
          <Link
            className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
              isActive("/") ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-900"
            }`}
            href="/"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
              isActive("/staff") ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-900"
            }`}
            href="/staff"
          >
            <User className="h-5 w-5" />
            Staff Profiles
          </Link>
          <Link
            className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
              isActive("/orders") ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-900"
            }`}
            href="/orders"
          >
            <ClipboardList className="h-5 w-5" />
            Orders
          </Link>
          <Link
            className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
              isActive("/inventory") ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-900"
            }`}
            href="/inventory"
          >
            <Package className="h-5 w-5" />
            Inventory
          </Link>
          <Link
            className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
              isActive("/floor-plan") ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-900"
            }`}
            href="/floor-plan"
          >
            <LayoutGrid className="h-5 w-5" />
            Floor Plan
          </Link>
          <Link
            className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
              isActive("/verification") ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-900"
            }`}
            href="/verification"
          >
            <FileCheck className="h-5 w-5" />
            Slip Verification
          </Link>
        </nav>
      </div>
      <div className="mt-auto border-t p-6">
        <nav className="flex flex-col gap-2">
          <Link
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-colors hover:text-gray-900"
            href="/help"
          >
            <HelpCircle className="h-5 w-5" />
            Help Center
          </Link>
          <button
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-colors hover:text-gray-900"
            onClick={() => {
              // Add logout logic here
              console.log("Logging out...")
            }}
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </button>
        </nav>
      </div>
    </aside>
  )
}

