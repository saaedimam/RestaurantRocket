import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/lib/i18n";
import LanguageToggle from "@/components/language-toggle";
import { 
  UtensilsCrossed,
  LayoutDashboard, 
  ShoppingCart, 
  ChefHat, 
  Package, 
  Users,
  LogOut,
  Menu
} from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();
  const { user } = useAuth();
  const { t, currentLang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigationItems = [
    {
      href: "/",
      label: t("nav.dashboard", "Dashboard"),
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      href: "/pos",
      label: t("nav.pos", "POS"),
      icon: <ShoppingCart className="h-4 w-4" />,
    },
    {
      href: "/kitchen",
      label: t("nav.kitchen", "Kitchen"),
      icon: <ChefHat className="h-4 w-4" />,
    },
    {
      href: "/inventory",
      label: t("nav.inventory", "Inventory"),
      icon: <Package className="h-4 w-4" />,
    },
    {
      href: "/staff",
      label: t("nav.staff", "Staff"),
      icon: <Users className="h-4 w-4" />,
    },
  ];

  const NavLinks = ({ mobile = false, onClose = () => {} }) => (
    <>
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
        >
          <Button
            variant={location === item.href ? "default" : "ghost"}
            className={`w-full justify-start gap-2 ${currentLang === "bn" ? "bengali-text" : ""} ${
              mobile ? "h-12" : ""
            }`}
          >
            {item.icon}
            {item.label}
          </Button>
        </Link>
      ))}
    </>
  );

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-border fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <UtensilsCrossed className="h-8 w-8 text-primary mr-3" />
              <span className="text-xl font-bold text-foreground">RestaurantOS</span>
              <Badge variant="secondary" className="ml-2 bg-primary text-primary-foreground">
                BD
              </Badge>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLinks />
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            
            {/* User info */}
            {user && (
              <div className="hidden sm:flex items-center space-x-2">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {user.firstName || user.email}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("role.manager", "Manager")}
                  </p>
                </div>
                {user.profileImageUrl && (
                  <img
                    src={user.profileImageUrl}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
              </div>
            )}

            {/* Logout button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.href = "/api/logout"}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className={`hidden sm:inline ${currentLang === "bn" ? "bengali-text" : ""}`}>
                {t("nav.logout", "Logout")}
              </span>
            </Button>

            {/* Mobile menu button */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col space-y-4 mt-8">
                  <NavLinks mobile onClose={() => setMobileOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
