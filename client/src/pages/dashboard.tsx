import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useLanguage } from "@/lib/i18n";
import { 
  TrendingUp, 
  ShoppingCart, 
  Receipt, 
  Table,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  Package,
  ChefHat
} from "lucide-react";

export default function Dashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const { t, currentLang } = useLanguage();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
    retry: false,
  });

  const { data: lowStockItems } = useQuery({
    queryKey: ["/api/inventory/low-stock"],
    retry: false,
  });

  const { data: kitchenOrders } = useQuery({
    queryKey: ["/api/orders/kitchen"],
    retry: false,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: tables } = useQuery({
    queryKey: ["/api/tables"],
    retry: false,
  });

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const occupiedTables = tables?.filter((table: any) => table.status === 'occupied')?.length || 0;
  const totalTables = tables?.length || 0;
  const occupancyRate = totalTables > 0 ? (occupiedTables / totalTables) * 100 : 0;

  const pendingOrders = kitchenOrders?.filter((order: any) => order.status === 'confirmed')?.length || 0;
  const preparingOrders = kitchenOrders?.filter((order: any) => order.status === 'preparing')?.length || 0;

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold text-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
            {t("dashboard.title", "Restaurant Dashboard")}
          </h1>
          <p className={`text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
            {t("dashboard.subtitle", "Overview of your restaurant operations")}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                    {t("dashboard.todaysSales", "Today's Sales")}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    ৳{statsLoading ? "---" : (stats?.totalSales || 0).toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                    {t("dashboard.totalOrders", "Total Orders")}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {statsLoading ? "---" : stats?.totalOrders || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                    {t("dashboard.averageOrder", "Average Order")}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    ৳{statsLoading ? "---" : Math.round(stats?.averageOrder || 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                  <Receipt className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                    {t("dashboard.activeTables", "Active Tables")}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {occupiedTables}/{totalTables}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <Table className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Table Occupancy */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center ${currentLang === "bn" ? "bengali-text" : ""}`}>
                <Table className="h-5 w-5 mr-2" />
                {t("dashboard.tableOccupancy", "Table Occupancy")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className={currentLang === "bn" ? "bengali-text" : ""}>
                    {t("dashboard.occupied", "Occupied")}: {occupiedTables}
                  </span>
                  <span className={currentLang === "bn" ? "bengali-text" : ""}>
                    {occupancyRate.toFixed(1)}%
                  </span>
                </div>
                <Progress value={occupancyRate} className="h-2" />
                <div className="grid grid-cols-4 gap-2">
                  {tables?.slice(0, 8).map((table: any) => (
                    <div
                      key={table.id}
                      className={`p-2 rounded text-center text-xs font-medium ${
                        table.status === 'occupied' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : table.status === 'reserved'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}
                    >
                      {table.number}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Kitchen Status */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center ${currentLang === "bn" ? "bengali-text" : ""}`}>
                <ChefHat className="h-5 w-5 mr-2" />
                {t("dashboard.kitchenStatus", "Kitchen Status")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-yellow-500 mr-2" />
                    <span className={`text-sm ${currentLang === "bn" ? "bengali-text" : ""}`}>
                      {t("dashboard.pending", "Pending")}
                    </span>
                  </div>
                  <Badge variant="secondary">{pendingOrders}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ChefHat className="h-4 w-4 text-orange-500 mr-2" />
                    <span className={`text-sm ${currentLang === "bn" ? "bengali-text" : ""}`}>
                      {t("dashboard.preparing", "Preparing")}
                    </span>
                  </div>
                  <Badge variant="secondary">{preparingOrders}</Badge>
                </div>
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.href = "/kitchen"}
                  >
                    {t("dashboard.viewKitchen", "View Kitchen Display")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Low Stock Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center ${currentLang === "bn" ? "bengali-text" : ""}`}>
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                {t("dashboard.lowStockAlerts", "Low Stock Alerts")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockItems?.length > 0 ? (
                  lowStockItems.slice(0, 5).map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {currentLang === "bn" && item.nameBn ? item.nameBn : item.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {t("dashboard.currentStock", "Current")}: {item.currentStock} {item.unit}
                        </p>
                      </div>
                      <Badge variant="destructive">
                        {t("dashboard.low", "Low")}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className={`text-sm text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                      {t("dashboard.allStockGood", "All inventory levels are good")}
                    </p>
                  </div>
                )}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = "/inventory"}
                >
                  <Package className="h-4 w-4 mr-2" />
                  {t("dashboard.viewInventory", "View Inventory")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className={`${currentLang === "bn" ? "bengali-text" : ""}`}>
                {t("dashboard.quickActions", "Quick Actions")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  className="h-20 flex flex-col items-center justify-center"
                  onClick={() => window.location.href = "/pos"}
                >
                  <ShoppingCart className="h-6 w-6 mb-2" />
                  <span className={`text-sm ${currentLang === "bn" ? "bengali-text" : ""}`}>
                    {t("dashboard.newOrder", "New Order")}
                  </span>
                </Button>
                <Button 
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                  onClick={() => window.location.href = "/kitchen"}
                >
                  <ChefHat className="h-6 w-6 mb-2" />
                  <span className={`text-sm ${currentLang === "bn" ? "bengali-text" : ""}`}>
                    {t("dashboard.kitchen", "Kitchen")}
                  </span>
                </Button>
                <Button 
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                  onClick={() => window.location.href = "/inventory"}
                >
                  <Package className="h-6 w-6 mb-2" />
                  <span className={`text-sm ${currentLang === "bn" ? "bengali-text" : ""}`}>
                    {t("dashboard.inventory", "Inventory")}
                  </span>
                </Button>
                <Button 
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                  onClick={() => window.location.href = "/staff"}
                >
                  <Users className="h-6 w-6 mb-2" />
                  <span className={`text-sm ${currentLang === "bn" ? "bengali-text" : ""}`}>
                    {t("dashboard.staff", "Staff")}
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
