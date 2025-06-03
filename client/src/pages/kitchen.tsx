import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/lib/i18n";
import { useWebSocketSubscription } from "@/lib/websocket";
import OrderQueue from "@/components/kitchen/order-queue";
import { ChefHat } from "lucide-react";

export default function Kitchen() {
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

  const { data: kitchenOrders, refetch: refetchOrders } = useQuery({
    queryKey: ["/api/orders/kitchen"],
    retry: false,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Listen for real-time order updates
  useWebSocketSubscription("newOrder", (data) => {
    refetchOrders();
    toast({
      title: t("kitchen.newOrder", "New Order"),
      description: `${t("kitchen.table", "Table")} ${data.tableId}`,
    });
  });

  useWebSocketSubscription("orderStatusUpdate", (data) => {
    refetchOrders();
  });

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const pendingOrders = kitchenOrders?.filter((order: any) => order.status === "confirmed") || [];
  const preparingOrders = kitchenOrders?.filter((order: any) => order.status === "preparing") || [];
  const readyOrders = kitchenOrders?.filter((order: any) => order.status === "ready") || [];

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold text-foreground flex items-center ${currentLang === "bn" ? "bengali-text" : ""}`}>
            <ChefHat className="h-8 w-8 mr-3" />
            {t("kitchen.title", "Kitchen Display System")}
          </h1>
          <p className={`text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
            Real-time order management and preparation tracking
          </p>
        </div>

        {/* Order Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-yellow-800 dark:text-yellow-200 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                  {t("kitchen.pendingOrders", "Pending Orders")}
                </p>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                  {pendingOrders.length}
                </p>
              </div>
              <ChefHat className="h-8 w-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-orange-800 dark:text-orange-200 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                  {t("kitchen.preparingOrders", "Preparing Orders")}
                </p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                  {preparingOrders.length}
                </p>
              </div>
              <ChefHat className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-green-800 dark:text-green-200 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                  {t("kitchen.readyOrders", "Ready Orders")}
                </p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {readyOrders.length}
                </p>
              </div>
              <ChefHat className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Order Queues */}
        <div className="grid lg:grid-cols-3 gap-6">
          <OrderQueue
            orders={pendingOrders}
            title={t("kitchen.pendingOrders", "Pending Orders")}
            emptyMessage={t("kitchen.noOrders", "No pending orders")}
          />

          <OrderQueue
            orders={preparingOrders}
            title={t("kitchen.preparingOrders", "Preparing Orders")}
            emptyMessage={t("kitchen.noOrders", "No orders being prepared")}
          />

          <OrderQueue
            orders={readyOrders}
            title={t("kitchen.readyOrders", "Ready Orders")}
            emptyMessage={t("kitchen.noOrders", "No orders ready for serving")}
            showActions={false}
          />
        </div>
      </div>
    </div>
  );
}
