import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage, formatDate } from "@/lib/i18n";
import { Users, UserPlus, Mail, Phone, Calendar, DollarSign } from "lucide-react";

export default function Staff() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const { t, currentLang } = useLanguage();
  const [filter, setFilter] = useState<string>("all");

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

  const { data: allStaff } = useQuery({
    queryKey: ["/api/staff"],
    retry: false,
  });

  const { data: managers } = useQuery({
    queryKey: ["/api/staff", "manager"],
    retry: false,
  });

  const { data: waiters } = useQuery({
    queryKey: ["/api/staff", "waiter"],
    retry: false,
  });

  const { data: kitchenStaff } = useQuery({
    queryKey: ["/api/staff", "kitchen"],
    retry: false,
  });

  const { data: cashiers } = useQuery({
    queryKey: ["/api/staff", "cashier"],
    retry: false,
  });

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getDisplayStaff = () => {
    switch (filter) {
      case "manager":
        return managers || [];
      case "waiter":
        return waiters || [];
      case "kitchen":
        return kitchenStaff || [];
      case "cashier":
        return cashiers || [];
      default:
        return allStaff || [];
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "manager":
        return t("role.manager", "Manager");
      case "waiter":
        return t("role.waiter", "Waiter");
      case "kitchen":
        return t("role.kitchen", "Kitchen Staff");
      case "cashier":
        return t("role.cashier", "Cashier");
      default:
        return role;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "manager":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "waiter":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "kitchen":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "cashier":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const displayStaff = getDisplayStaff();

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-3xl font-bold text-foreground flex items-center ${currentLang === "bn" ? "bengali-text" : ""}`}>
                <Users className="h-8 w-8 mr-3" />
                {t("staff.title", "Staff Management")}
              </h1>
              <p className={`text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                Manage your restaurant staff and roles
              </p>
            </div>
            <Button className={currentLang === "bn" ? "bengali-text" : ""}>
              <UserPlus className="h-4 w-4 mr-2" />
              {t("staff.addStaff", "Add Staff")}
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                    Total Staff
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {allStaff?.length || 0}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                    {t("staff.managers", "Managers")}
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {managers?.length || 0}
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                    {t("staff.waiters", "Waiters")}
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {waiters?.length || 0}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                    {t("staff.kitchen", "Kitchen")}
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {kitchenStaff?.length || 0}
                  </p>
                </div>
                <Users className="h-8 w-8 text-orange-600" />
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
            {t("staff.allStaff", "All Staff")} ({allStaff?.length || 0})
          </Button>
          <Button
            variant={filter === "manager" ? "default" : "outline"}
            onClick={() => setFilter("manager")}
            className={currentLang === "bn" ? "bengali-text" : ""}
          >
            {t("staff.managers", "Managers")} ({managers?.length || 0})
          </Button>
          <Button
            variant={filter === "waiter" ? "default" : "outline"}
            onClick={() => setFilter("waiter")}
            className={currentLang === "bn" ? "bengali-text" : ""}
          >
            {t("staff.waiters", "Waiters")} ({waiters?.length || 0})
          </Button>
          <Button
            variant={filter === "kitchen" ? "default" : "outline"}
            onClick={() => setFilter("kitchen")}
            className={currentLang === "bn" ? "bengali-text" : ""}
          >
            {t("staff.kitchen", "Kitchen")} ({kitchenStaff?.length || 0})
          </Button>
          <Button
            variant={filter === "cashier" ? "default" : "outline"}
            onClick={() => setFilter("cashier")}
            className={currentLang === "bn" ? "bengali-text" : ""}
          >
            {t("staff.cashiers", "Cashiers")} ({cashiers?.length || 0})
          </Button>
        </div>

        {/* Staff Grid */}
        <Card>
          <CardHeader>
            <CardTitle className={currentLang === "bn" ? "bengali-text" : ""}>
              {filter === "all" ? t("staff.allStaff", "All Staff") : getRoleDisplayName(filter)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!displayStaff || displayStaff.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className={`text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                  No staff members found
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayStaff.map((member: any) => (
                  <Card key={member.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage 
                            src={member.user?.profileImageUrl} 
                            alt={member.user?.firstName || member.user?.email} 
                          />
                          <AvatarFallback>
                            {(member.user?.firstName?.[0] || member.user?.email?.[0] || "U").toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className={`font-semibold text-foreground truncate ${currentLang === "bn" ? "bengali-text" : ""}`}>
                              {member.user?.firstName && member.user?.lastName
                                ? `${member.user.firstName} ${member.user.lastName}`
                                : member.user?.firstName || member.user?.email
                              }
                            </h3>
                            <Badge 
                              variant="outline"
                              className={`${getRoleBadgeColor(member.role)} ${currentLang === "bn" ? "bengali-text" : ""}`}
                            >
                              {getRoleDisplayName(member.role)}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            {member.user?.email && (
                              <div className="flex items-center text-muted-foreground">
                                <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span className="truncate">{member.user.email}</span>
                              </div>
                            )}
                            
                            {member.phone && (
                              <div className="flex items-center text-muted-foreground">
                                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span>{member.phone}</span>
                              </div>
                            )}
                            
                            {member.joinDate && (
                              <div className="flex items-center text-muted-foreground">
                                <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span className={currentLang === "bn" ? "bengali-text" : ""}>
                                  {t("staff.joinDate", "Joined")}: {formatDate(member.joinDate, currentLang)}
                                </span>
                              </div>
                            )}
                            
                            {member.salary && (
                              <div className="flex items-center text-muted-foreground">
                                <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span>৳{parseFloat(member.salary).toLocaleString()}</span>
                              </div>
                            )}
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <Badge
                              variant={member.active ? "default" : "secondary"}
                              className={currentLang === "bn" ? "bengali-text" : ""}
                            >
                              {member.active ? t("staff.active", "Active") : t("staff.inactive", "Inactive")}
                            </Badge>
                            
                            <Button variant="outline" size="sm">
                              {t("common.edit", "Edit")}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
