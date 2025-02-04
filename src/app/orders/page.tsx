import { Layout } from "@/src/components/layout"
import { MenuManagement } from "@/src/components/orders/menu-management"
import { OrderProcessing } from "@/src/components/orders/order-processing"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"

export default function OrdersPage() {
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-gray-500">Manage orders and menu items</p>
        </div>
        <Tabs defaultValue="processing">
          <TabsList>
            <TabsTrigger value="processing">Order Processing</TabsTrigger>
            <TabsTrigger value="menu">Menu Management</TabsTrigger>
          </TabsList>
          <TabsContent value="processing">
            <OrderProcessing />
          </TabsContent>
          <TabsContent value="menu">
            <MenuManagement />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

