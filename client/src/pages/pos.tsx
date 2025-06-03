import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useLanguage } from "@/lib/i18n";
import { useWebSocketSubscription } from "@/lib/websocket";
import TableGrid from "@/components/pos/table-grid";
import OrderForm from "@/components/pos/order-form";
import { ShoppingCart, ArrowLeft } from "lucide-react";

export default function POS() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const { t, currentLang } = useLanguage();
  const [selectedTable, setSelectedTable] = useState<any>(null);
  const [orderStep, setOrderStep] = useState<"selectTable" | "createOrder">("selectTable");

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

  const { data: tables, refetch: refetchTables } = useQuery({
    queryKey: ["/api/tables"],
    retry: false,
  });

  // Listen for real-time table updates
  useWebSocketSubscription("tableStatusUpdate", (data) => {
    refetchTables();
  });

  const handleTableSelect = (table: any) => {
    if (table.status !== "available") {
      toast({
        title: "Table Not Available",
        description: `Table ${table.number} is currently ${table.status}`,
        variant: "destructive",
      });
      return;
    }
    
    setSelectedTable(table);
    setOrderStep("createOrder");
  };

  const handleOrderComplete = () => {
    setSelectedTable(null);
    setOrderStep("selectTable");
    refetchTables();
  };

  const handleBackToTables = () => {
    setSelectedTable(null);
    setOrderStep("selectTable");
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold text-foreground flex items-center ${currentLang === "bn" ? "bengali-text" : ""}`}>
                <ShoppingCart className="h-8 w-8 mr-3" />
                {t("pos.title", "Point of Sale")}
              </h1>
              <p className={`text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                {orderStep === "selectTable" 
                  ? t("pos.selectTable", "Select a table to start a new order")
                  : `${t("pos.newOrder", "New Order")} - ${t("pos.table", "Table")} ${selectedTable?.number}`
                }
              </p>
            </div>
            {orderStep === "createOrder" && (
              <Button
                variant="outline"
                onClick={handleBackToTables}
                className={`flex items-center ${currentLang === "bn" ? "bengali-text" : ""}`}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tables
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        {orderStep === "selectTable" ? (
          <Card>
            <CardHeader>
              <CardTitle className={currentLang === "bn" ? "bengali-text" : ""}>
                {t("pos.selectTable", "Select Table")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TableGrid
                tables={tables || []}
                selectedTable={selectedTable}
                onTableSelect={handleTableSelect}
              />
            </CardContent>
          </Card>
        ) : (
          <OrderForm
            selectedTable={selectedTable}
            onOrderComplete={handleOrderComplete}
          />
        )}
      </div>
    </div>
  );
}
