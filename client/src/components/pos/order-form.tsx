import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useLanguage, formatCurrency } from "@/lib/i18n";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Minus, ShoppingCart } from "lucide-react";

interface OrderFormProps {
  selectedTable: any;
  onOrderComplete: () => void;
}

interface OrderItem {
  menuItemId: number;
  menuItem: any;
  quantity: number;
  price: number;
  notes?: string;
}

export default function OrderForm({ selectedTable, onOrderComplete }: OrderFormProps) {
  const { toast } = useToast();
  const { t, currentLang } = useLanguage();
  const queryClient = useQueryClient();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [notes, setNotes] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
    retry: false,
  });

  const { data: menuItems } = useQuery({
    queryKey: ["/api/menu-items", selectedCategory],
    retry: false,
  });

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      return apiRequest("POST", "/api/orders", orderData);
    },
    onSuccess: () => {
      toast({
        title: t("pos.orderPlaced", "Order placed successfully!"),
        description: `${t("pos.table", "Table")} ${selectedTable.number}`,
      });
      setOrderItems([]);
      setNotes("");
      queryClient.invalidateQueries({ queryKey: ["/api/tables"] });
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      onOrderComplete();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const addToOrder = (menuItem: any) => {
    const existingItem = orderItems.find(item => item.menuItemId === menuItem.id);
    
    if (existingItem) {
      setOrderItems(items =>
        items.map(item =>
          item.menuItemId === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setOrderItems(items => [
        ...items,
        {
          menuItemId: menuItem.id,
          menuItem,
          quantity: 1,
          price: parseFloat(menuItem.price),
          notes: ""
        }
      ]);
    }
  };

  const updateQuantity = (menuItemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setOrderItems(items => items.filter(item => item.menuItemId !== menuItemId));
    } else {
      setOrderItems(items =>
        items.map(item =>
          item.menuItemId === menuItemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const getTotalAmount = () => {
    return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handlePlaceOrder = () => {
    if (orderItems.length === 0) {
      toast({
        title: "Error",
        description: "Please add items to the order",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      order: {
        tableId: selectedTable.id,
        totalAmount: getTotalAmount().toString(),
        notes,
        status: "confirmed"
      },
      orderItems: orderItems.map(item => ({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: item.price.toString(),
        notes: item.notes
      }))
    };

    createOrderMutation.mutate(orderData);
  };

  return (
    <div className="space-y-6">
      {/* Selected Table Info */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center ${currentLang === "bn" ? "bengali-text" : ""}`}>
            <ShoppingCart className="h-5 w-5 mr-2" />
            {t("pos.newOrder", "New Order")} - {t("pos.table", "Table")} {selectedTable.number}
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Menu Items */}
        <div className="space-y-4">
          <h3 className={`text-lg font-semibold ${currentLang === "bn" ? "bengali-text" : ""}`}>
            {t("pos.addItems", "Add Items")}
          </h3>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className={currentLang === "bn" ? "bengali-text" : ""}
            >
              All
            </Button>
            {categories?.map((category: any) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={currentLang === "bn" ? "bengali-text" : ""}
              >
                {currentLang === "bn" && category.nameBn ? category.nameBn : category.name}
              </Button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {menuItems?.map((item: any) => (
              <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h4 className={`font-medium ${currentLang === "bn" ? "bengali-text" : ""}`}>
                      {currentLang === "bn" && item.nameBn ? item.nameBn : item.name}
                    </h4>
                    <p className={`text-sm text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                      {currentLang === "bn" && item.descriptionBn ? item.descriptionBn : item.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-primary">
                        {formatCurrency(parseFloat(item.price), currentLang)}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => addToOrder(item)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <h3 className={`text-lg font-semibold ${currentLang === "bn" ? "bengali-text" : ""}`}>
            {t("pos.orderSummary", "Order Summary")}
          </h3>

          <Card>
            <CardContent className="p-4">
              {orderItems.length === 0 ? (
                <p className={`text-muted-foreground text-center py-4 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                  No items added yet
                </p>
              ) : (
                <div className="space-y-4">
                  {orderItems.map((item) => (
                    <div key={item.menuItemId} className="flex justify-between items-center">
                      <div className="flex-1">
                        <h5 className={`font-medium ${currentLang === "bn" ? "bengali-text" : ""}`}>
                          {currentLang === "bn" && item.menuItem.nameBn 
                            ? item.menuItem.nameBn 
                            : item.menuItem.name}
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(item.price, currentLang)} × {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                        {t("pos.notes", "Special Notes")}
                      </label>
                      <Textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={currentLang === "bn" ? "বিশেষ নির্দেশনা..." : "Special instructions..."}
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span className={currentLang === "bn" ? "bengali-text" : ""}>
                        {t("pos.total", "Total")}:
                      </span>
                      <span className="text-primary">
                        {formatCurrency(getTotalAmount(), currentLang)}
                      </span>
                    </div>

                    <Button
                      className="w-full"
                      onClick={handlePlaceOrder}
                      disabled={createOrderMutation.isPending || orderItems.length === 0}
                    >
                      {createOrderMutation.isPending 
                        ? t("common.loading", "Loading...")
                        : t("pos.placeOrder", "Place Order")
                      }
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
