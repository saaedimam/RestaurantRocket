import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";
import { Table, Users } from "lucide-react";

interface TableGridProps {
  tables: any[];
  selectedTable: any | null;
  onTableSelect: (table: any) => void;
}

export default function TableGrid({ tables, selectedTable, onTableSelect }: TableGridProps) {
  const { t, currentLang } = useLanguage();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200";
      case "occupied":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200";
      case "reserved":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return t("status.available", "Available");
      case "occupied":
        return t("status.occupied", "Occupied");
      case "reserved":
        return t("status.reserved", "Reserved");
      default:
        return status;
    }
  };

  if (!tables || tables.length === 0) {
    return (
      <div className="text-center py-8">
        <Table className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className={`text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
          No tables available
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {tables.map((table) => (
        <Card
          key={table.id}
          className={`cursor-pointer transition-all hover:shadow-md ${
            selectedTable?.id === table.id ? "ring-2 ring-primary" : ""
          } ${getStatusColor(table.status)}`}
          onClick={() => table.status === "available" && onTableSelect(table)}
        >
          <CardContent className="p-4">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Table className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-1">
                {t("pos.table", "Table")} {table.number}
              </h3>
              <div className="flex items-center justify-center text-sm text-muted-foreground mb-2">
                <Users className="h-3 w-3 mr-1" />
                <span>{table.seats} {t("pos.seats", "seats")}</span>
              </div>
              <Badge
                variant="outline"
                className={`text-xs ${
                  table.status === "available" ? "border-green-500 text-green-700" :
                  table.status === "occupied" ? "border-red-500 text-red-700" :
                  "border-yellow-500 text-yellow-700"
                }`}
              >
                {getStatusText(table.status)}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
