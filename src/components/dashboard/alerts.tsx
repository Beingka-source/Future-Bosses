import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { AlertTriangle, Package } from "lucide-react"

type Alert = {
  type: "staff" | "inventory"
  message: string
  severity: "warning" | "critical"
}

const alerts: Alert[] = [
  {
    type: "staff",
    message: "Alex Johnson's performance is critically low (45%). Immediate attention required.",
    severity: "critical",
  },
  {
    type: "staff",
    message: "Sophie Chen's performance is below target (55%). Schedule a review.",
    severity: "warning",
  },
  {
    type: "inventory",
    message: "Tomato Sauce is running low. Current stock: 22 units",
    severity: "warning",
  },
  {
    type: "inventory",
    message: "Lettuce is out of stock. Place an order immediately.",
    severity: "critical",
  },
]

export function Alerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Alerts</CardTitle>
        <CardDescription>Important notifications requiring your attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`flex items-start space-x-4 rounded-md border p-4 ${alert.severity === "critical" ? "border-red-500 bg-red-50" : "border-yellow-500 bg-yellow-50"
                }`}
            >
              {alert.type === "staff" ? (
                <AlertTriangle
                  className={`h-5 w-5 ${alert.severity === "critical" ? "text-red-600" : "text-yellow-600"}`}
                />
              ) : (
                <Package className={`h-5 w-5 ${alert.severity === "critical" ? "text-red-600" : "text-yellow-600"}`} />
              )}
              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${alert.severity === "critical" ? "text-red-800" : "text-yellow-800"}`}
                >
                  {alert.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

