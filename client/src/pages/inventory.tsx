import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage, formatDate } from "@/lib/i18n";
import { apiRequest } from "@/lib/queryClient";
import { Package, AlertTriangle, Plus, Edit, TrendingDown, TrendingUp } from "lucide-react";

export default function Inventory() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const { t, currentLang } = useLanguage();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<"all" | "low">("all");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [newStock, setNewStock] = useState("");

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

  const { data: inventoryItems } = useQuery({
    queryKey: ["/api/inventory"],
    retry: false,
  });

  const { data: lowStockItems } = useQuery({
    queryKey: ["/api/inventory/low-stock"],
    retry: false,
  });

  const updateStockMutation = useMutation({
    mutationFn: async ({ id, stock }: { id: number; stock: number }) => {
      return apiRequest("PATCH", `/api/inventory/${id}/stock`, { stock });
    },
    onSuccess: () => {
      toast({
        title: "Stock Updated",
        description: "Inventory stock has been updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/inventory"] });
      queryClient.invalidateQueries({ queryKey: ["/api/inventory/low-stock"] });
      setEditingItem(null);
      setNewStock("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update stock. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleUpdateStock = () => {
    if (!editingItem || !newStock) return;
    
    const stockValue = parseFloat(newStock);
    if (isNaN(stockValue) || stockValue < 0) {
      toast({
        title: "Invalid Stock",
        description: "Please enter a valid stock amount",
        variant: "destructive",
      });
      return;
    }

    updateStockMutation.mutate({ id: editingItem.id, stock: stockValue });
  };

  const openEditDialog = (item: any) => {
    setEditingItem(item);
    setNewStock(item.currentStock.toString());
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const displayItems = filter === "low" ? lowStockItems : inventoryItems;
  const lowStockCount = lowStockItems?.length || 0;

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold text-foreground flex items-center ${currentLang === "bn" ? "bengali-text" : ""}`}>
            <Package className="h-8 w-8 mr-3" />
            {t("inventory.title", "Inventory Management")}
          </h1>
          <p className={`text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
            Track and manage your restaurant inventory
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                    Total Items
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {inventoryItems?.length || 0}
                  </p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                    {t("inventory.lowStock", "Low Stock Items")}
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {lowStockCount}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                    Stock Status
                  </p>
                  <p className={`text-lg font-semibold ${lowStockCount > 0 ? "text-red-600" : "text-green-600"}`}>
                    {lowStockCount > 0 ? "Needs Attention" : "All Good"}
                  </p>
                </div>
                {lowStockCount > 0 ? (
                  <TrendingDown className="h-8 w-8 text-red-600" />
                ) : (
                  <TrendingUp className="h-8 w-8 text-green-600" />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={currentLang === "bn" ? "bengali-text" : ""}
          >
            {t("inventory.allItems", "All Items")} ({inventoryItems?.length || 0})
          </Button>
          <Button
            variant={filter === "low" ? "default" : "outline"}
            onClick={() => setFilter("low")}
            className={`${currentLang === "bn" ? "bengali-text" : ""} ${lowStockCount > 0 ? "border-red-500 text-red-600" : ""}`}
          >
            {t("inventory.lowStock", "Low Stock")} ({lowStockCount})
          </Button>
        </div>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex justify-between items-center ${currentLang === "bn" ? "bengali-text" : ""}`}>
              {filter === "all" ? t("inventory.allItems", "All Items") : t("inventory.lowStock", "Low Stock Items")}
              <Button size="sm" className={currentLang === "bn" ? "bengali-text" : ""}>
                <Plus className="h-4 w-4 mr-2" />
                {t("inventory.addItem", "Add Item")}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!displayItems || displayItems.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className={`text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                  {filter === "low" ? "No low stock items" : "No inventory items found"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className={`text-left p-3 font-medium ${currentLang === "bn" ? "bengali-text" : ""}`}>
                        {t("inventory.item", "Item")}
                      </th>
                      <th className={`text-left p-3 font-medium ${currentLang === "bn" ? "bengali-text" : ""}`}>
                        {t("inventory.currentStock", "Current Stock")}
                      </th>
                      <th className={`text-left p-3 font-medium ${currentLang === "bn" ? "bengali-text" : ""}`}>
                        {t("inventory.minStock", "Min Stock")}
                      </th>
                      <th className={`text-left p-3 font-medium ${currentLang === "bn" ? "bengali-text" : ""}`}>
                        {t("inventory.supplier", "Supplier")}
                      </th>
                      <th className={`text-left p-3 font-medium ${currentLang === "bn" ? "bengali-text" : ""}`}>
                        {t("inventory.lastRestocked", "Last Restocked")}
                      </th>
                      <th className={`text-left p-3 font-medium ${currentLang === "bn" ? "bengali-text" : ""}`}>
                        {t("common.actions", "Actions")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayItems.map((item: any) => {
                      const isLowStock = parseFloat(item.currentStock) <= parseFloat(item.minStock);
                      
                      return (
                        <tr key={item.id} className="border-b hover:bg-muted/50">
                          <td className="p-3">
                            <div>
                              <h4 className={`font-medium ${currentLang === "bn" ? "bengali-text" : ""}`}>
                                {currentLang === "bn" && item.nameBn ? item.nameBn : item.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Unit: {item.unit}
                              </p>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span className={`font-semibold ${isLowStock ? "text-red-600" : "text-foreground"}`}>
                                {item.currentStock}
                              </span>
                              {isLowStock && (
                                <Badge variant="destructive" className="text-xs">
                                  {t("inventory.low", "Low")}
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="p-3">
                            <span className="text-muted-foreground">{item.minStock}</span>
                          </td>
                          <td className="p-3">
                            <span className="text-muted-foreground">{item.supplier || "—"}</span>
                          </td>
                          <td className="p-3">
                            <span className="text-muted-foreground">
                              {item.lastRestocked ? formatDate(item.lastRestocked, currentLang) : "—"}
                            </span>
                          </td>
                          <td className="p-3">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openEditDialog(item)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle className={currentLang === "bn" ? "bengali-text" : ""}>
                                    {t("inventory.updateStock", "Update Stock")}
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className={`font-medium ${currentLang === "bn" ? "bengali-text" : ""}`}>
                                      {currentLang === "bn" && editingItem?.nameBn ? editingItem.nameBn : editingItem?.name}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      Current: {editingItem?.currentStock} {editingItem?.unit}
                                    </p>
                                  </div>
                                  <div>
                                    <label className={`block text-sm font-medium mb-2 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                                      {t("inventory.newStock", "New Stock Amount")}
                                    </label>
                                    <Input
                                      type="number"
                                      value={newStock}
                                      onChange={(e) => setNewStock(e.target.value)}
                                      placeholder="Enter new stock amount"
                                      min="0"
                                      step="0.01"
                                    />
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      onClick={handleUpdateStock}
                                      disabled={updateStockMutation.isPending}
                                      className={currentLang === "bn" ? "bengali-text" : ""}
                                    >
                                      {updateStockMutation.isPending 
                                        ? t("common.loading", "Loading...")
                                        : t("inventory.save", "Save")
                                      }
                                    </Button>
                                    <Button
                                      variant="outline"
                                      onClick={() => setEditingItem(null)}
                                      className={currentLang === "bn" ? "bengali-text" : ""}
                                    >
                                      {t("inventory.cancel", "Cancel")}
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
