import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLanguage, formatTime } from "@/lib/i18n";
import { apiRequest } from "@/lib/queryClient";
import { Clock, ChefHat, CheckCircle } from "lucide-react";

interface OrderQueueProps {
  orders: any[];
  title: string;
  emptyMessage: string;
  showActions?: boolean;
}

export default function OrderQueue({ orders, title, emptyMessage, showActions = true }: OrderQueueProps) {
  const { toast } = useToast();
  const { t, currentLang } = useLanguage();
  const queryClient = useQueryClient();

  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: number; status: string }) => {
      return apiRequest("PATCH", `/api/orders/${orderId}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders/kitchen"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    },
  });

  const handleStartCooking = (orderId: number) => {
    updateOrderStatusMutation.mutate({ orderId, status: "preparing" });
  };

  const handleMarkReady = (orderId: number) => {
    updateOrderStatusMutation.mutate({ orderId, status: "ready" });
  };

  const getTimeElapsed = (createdAt: string) => {
    const now = new Date();
    const orderTime = new Date(createdAt);
    const diff = Math.floor((now.getTime() - orderTime.getTime()) / (1000 * 60));
    return diff;
  };

  const getTimeColor = (minutes: number) => {
    if (minutes < 15) return "text-green-600";
    if (minutes < 30) return "text-yellow-600";
    return "text-red-600";
  };

  if (!orders || orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className={currentLang === "bn" ? "bengali-text" : ""}>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <ChefHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className={`text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
              {emptyMessage}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className={`flex items-center justify-between ${currentLang === "bn" ? "bengali-text" : ""}`}>
          {title}
          <Badge variant="secondary">{orders.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => {
            const timeElapsed = getTimeElapsed(order.createdAt);
            
            return (
              <Card key={order.id} className="border">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">
                        {t("kitchen.order", "Order")} #{order.id}
                      </h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className={currentLang === "bn" ? "bengali-text" : ""}>
                          {t("kitchen.table", "Table")} {order.table?.number}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{formatTime(order.createdAt, currentLang)}</span>
                      </div>
                    </div>
                    <div className={`flex items-center text-sm font-medium ${getTimeColor(timeElapsed)}`}>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{timeElapsed}m</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {order.orderItems?.map((item: any) => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <span className={currentLang === "bn" ? "bengali-text" : ""}>
                          {currentLang === "bn" && item.menuItem?.nameBn 
                            ? item.menuItem.nameBn 
                            : item.menuItem?.name}
                        </span>
                        <Badge variant="outline">x{item.quantity}</Badge>
                      </div>
                    ))}
                  </div>

                  {order.notes && (
                    <div className="text-sm text-muted-foreground mb-4 p-2 bg-muted rounded">
                      <strong>Notes:</strong> {order.notes}
                    </div>
                  )}

                  {showActions && (
                    <div className="flex gap-2">
                      {order.status === "confirmed" && (
                        <Button
                          size="sm"
                          onClick={() => handleStartCooking(order.id)}
                          disabled={updateOrderStatusMutation.isPending}
                          className={`flex-1 ${currentLang === "bn" ? "bengali-text" : ""}`}
                        >
                          <ChefHat className="h-4 w-4 mr-2" />
                          {t("kitchen.startCooking", "Start Cooking")}
                        </Button>
                      )}
                      {order.status === "preparing" && (
                        <Button
                          size="sm"
                          onClick={() => handleMarkReady(order.id)}
                          disabled={updateOrderStatusMutation.isPending}
                          className={`flex-1 ${currentLang === "bn" ? "bengali-text" : ""}`}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {t("kitchen.markReady", "Mark Ready")}
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
