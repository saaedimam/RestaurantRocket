import { useState, useEffect } from "react";

type Language = "en" | "bn";

interface Translations {
  [key: string]: {
    en: string;
    bn: string;
  };
}

const translations: Translations = {
  // Navigation
  "nav.dashboard": { en: "Dashboard", bn: "ড্যাশবোর্ড" },
  "nav.pos": { en: "POS", bn: "পিওএস" },
  "nav.kitchen": { en: "Kitchen", bn: "রান্নাঘর" },
  "nav.inventory": { en: "Inventory", bn: "ইনভেন্টরি" },
  "nav.staff": { en: "Staff", bn: "কর্মী" },
  "nav.logout": { en: "Logout", bn: "লগআউট" },

  // Dashboard
  "dashboard.title": { en: "Restaurant Dashboard", bn: "রেস্তোরাঁ ড্যাশবোর্ড" },
  "dashboard.subtitle": { en: "Overview of your restaurant operations", bn: "আপনার রেস্তোরাঁ পরিচালনার সংক্ষিপ্ত বিবরণ" },
  "dashboard.todaysSales": { en: "Today's Sales", bn: "আজকের বিক্রয়" },
  "dashboard.totalOrders": { en: "Total Orders", bn: "মোট অর্ডার" },
  "dashboard.averageOrder": { en: "Average Order", bn: "গড় অর্ডার" },
  "dashboard.activeTables": { en: "Active Tables", bn: "সক্রিয় টেবিল" },
  "dashboard.tableOccupancy": { en: "Table Occupancy", bn: "টেবিল দখল" },
  "dashboard.kitchenStatus": { en: "Kitchen Status", bn: "রান্নাঘরের অবস্থা" },
  "dashboard.lowStockAlerts": { en: "Low Stock Alerts", bn: "কম স্টক সতর্কতা" },
  "dashboard.quickActions": { en: "Quick Actions", bn: "দ্রুত কর্ম" },
  "dashboard.occupied": { en: "Occupied", bn: "দখলকৃত" },
  "dashboard.pending": { en: "Pending", bn: "অপেক্ষমাণ" },
  "dashboard.preparing": { en: "Preparing", bn: "প্রস্তুত করা হচ্ছে" },
  "dashboard.currentStock": { en: "Current", bn: "বর্তমান" },
  "dashboard.low": { en: "Low", bn: "কম" },
  "dashboard.allStockGood": { en: "All inventory levels are good", bn: "সমস্ত ইনভেন্টরি স্তর ভাল" },
  "dashboard.viewKitchen": { en: "View Kitchen Display", bn: "রান্নাঘর ডিসপ্লে দেখুন" },
  "dashboard.viewInventory": { en: "View Inventory", bn: "ইনভেন্টরি দেখুন" },
  "dashboard.newOrder": { en: "New Order", bn: "নতুন অর্ডার" },
  "dashboard.kitchen": { en: "Kitchen", bn: "রান্নাঘর" },
  "dashboard.inventory": { en: "Inventory", bn: "ইনভেন্টরি" },
  "dashboard.staff": { en: "Staff", bn: "কর্মী" },

  // POS
  "pos.title": { en: "Point of Sale", bn: "পয়েন্ট অফ সেল" },
  "pos.selectTable": { en: "Select Table", bn: "টেবিল নির্বাচন করুন" },
  "pos.newOrder": { en: "New Order", bn: "নতুন অর্ডার" },
  "pos.addItems": { en: "Add Items", bn: "আইটেম যোগ করুন" },
  "pos.orderSummary": { en: "Order Summary", bn: "অর্ডার সারাংশ" },
  "pos.placeOrder": { en: "Place Order", bn: "অর্ডার দিন" },
  "pos.total": { en: "Total", bn: "মোট" },
  "pos.available": { en: "Available", bn: "উপলব্ধ" },
  "pos.occupied": { en: "Occupied", bn: "দখলকৃত" },
  "pos.reserved": { en: "Reserved", bn: "সংরক্ষিত" },
  "pos.table": { en: "Table", bn: "টেবিল" },
  "pos.seats": { en: "seats", bn: "আসন" },
  "pos.quantity": { en: "Quantity", bn: "পরিমাণ" },
  "pos.price": { en: "Price", bn: "মূল্য" },
  "pos.notes": { en: "Special Notes", bn: "বিশেষ নোট" },
  "pos.orderPlaced": { en: "Order placed successfully!", bn: "অর্ডার সফলভাবে দেওয়া হয়েছে!" },

  // Kitchen
  "kitchen.title": { en: "Kitchen Display System", bn: "রান্নাঘর ডিসপ্লে সিস্টেম" },
  "kitchen.pendingOrders": { en: "Pending Orders", bn: "অপেক্ষমাণ অর্ডার" },
  "kitchen.preparingOrders": { en: "Preparing Orders", bn: "প্রস্তুতির অর্ডার" },
  "kitchen.readyOrders": { en: "Ready Orders", bn: "প্রস্তুত অর্ডার" },
  "kitchen.order": { en: "Order", bn: "অর্ডার" },
  "kitchen.table": { en: "Table", bn: "টেবিল" },
  "kitchen.items": { en: "Items", bn: "আইটেম" },
  "kitchen.time": { en: "Time", bn: "সময়" },
  "kitchen.startCooking": { en: "Start Cooking", bn: "রান্না শুরু করুন" },
  "kitchen.markReady": { en: "Mark Ready", bn: "প্রস্তুত চিহ্নিত করুন" },
  "kitchen.orderTime": { en: "Order Time", bn: "অর্ডারের সময়" },
  "kitchen.cookingTime": { en: "Cooking Time", bn: "রান্নার সময়" },
  "kitchen.noOrders": { en: "No orders in queue", bn: "সারিতে কোন অর্ডার নেই" },

  // Inventory
  "inventory.title": { en: "Inventory Management", bn: "ইনভেন্টরি ব্যবস্থাপনা" },
  "inventory.addItem": { en: "Add Item", bn: "আইটেম যোগ করুন" },
  "inventory.lowStock": { en: "Low Stock", bn: "কম স্টক" },
  "inventory.allItems": { en: "All Items", bn: "সব আইটেম" },
  "inventory.item": { en: "Item", bn: "আইটেম" },
  "inventory.currentStock": { en: "Current Stock", bn: "বর্তমান স্টক" },
  "inventory.minStock": { en: "Min Stock", bn: "সর্বনিম্ন স্টক" },
  "inventory.supplier": { en: "Supplier", bn: "সরবরাহকারী" },
  "inventory.lastRestocked": { en: "Last Restocked", bn: "শেষ পুনরায় স্টক" },
  "inventory.updateStock": { en: "Update Stock", bn: "স্টক আপডেট করুন" },
  "inventory.newStock": { en: "New Stock", bn: "নতুন স্টক" },
  "inventory.save": { en: "Save", bn: "সংরক্ষণ করুন" },
  "inventory.cancel": { en: "Cancel", bn: "বাতিল" },
  "inventory.name": { en: "Name", bn: "নাম" },
  "inventory.nameBengali": { en: "Name (Bengali)", bn: "নাম (বাংলা)" },
  "inventory.unit": { en: "Unit", bn: "একক" },
  "inventory.unitCost": { en: "Unit Cost", bn: "একক খরচ" },

  // Staff
  "staff.title": { en: "Staff Management", bn: "কর্মী ব্যবস্থাপনা" },
  "staff.addStaff": { en: "Add Staff", bn: "কর্মী যোগ করুন" },
  "staff.allStaff": { en: "All Staff", bn: "সব কর্মী" },
  "staff.managers": { en: "Managers", bn: "ম্যানেজার" },
  "staff.waiters": { en: "Waiters", bn: "ওয়েটার" },
  "staff.kitchen": { en: "Kitchen", bn: "রান্নাঘর" },
  "staff.cashiers": { en: "Cashiers", bn: "ক্যাশিয়ার" },
  "staff.name": { en: "Name", bn: "নাম" },
  "staff.role": { en: "Role", bn: "ভূমিকা" },
  "staff.email": { en: "Email", bn: "ইমেইল" },
  "staff.phone": { en: "Phone", bn: "ফোন" },
  "staff.status": { en: "Status", bn: "অবস্থা" },
  "staff.active": { en: "Active", bn: "সক্রিয়" },
  "staff.inactive": { en: "Inactive", bn: "নিষ্ক্রিয়" },
  "staff.joinDate": { en: "Join Date", bn: "যোগদানের তারিখ" },
  "staff.salary": { en: "Salary", bn: "বেতন" },
  "staff.address": { en: "Address", bn: "ঠিকানা" },

  // Common
  "common.loading": { en: "Loading...", bn: "লোড হচ্ছে..." },
  "common.save": { en: "Save", bn: "সংরক্ষণ করুন" },
  "common.cancel": { en: "Cancel", bn: "বাতিল" },
  "common.delete": { en: "Delete", bn: "মুছুন" },
  "common.edit": { en: "Edit", bn: "সম্পাদনা" },
  "common.add": { en: "Add", bn: "যোগ করুন" },
  "common.search": { en: "Search", bn: "খুঁজুন" },
  "common.filter": { en: "Filter", bn: "ফিল্টার" },
  "common.actions": { en: "Actions", bn: "কর্ম" },
  "common.close": { en: "Close", bn: "বন্ধ" },
  "common.confirm": { en: "Confirm", bn: "নিশ্চিত করুন" },
  "common.yes": { en: "Yes", bn: "হ্যাঁ" },
  "common.no": { en: "No", bn: "না" },

  // Status
  "status.available": { en: "Available", bn: "উপলব্ধ" },
  "status.occupied": { en: "Occupied", bn: "দখলকৃত" },
  "status.reserved": { en: "Reserved", bn: "সংরক্ষিত" },
  "status.pending": { en: "Pending", bn: "অপেক্ষমাণ" },
  "status.confirmed": { en: "Confirmed", bn: "নিশ্চিত" },
  "status.preparing": { en: "Preparing", bn: "প্রস্তুত করা হচ্ছে" },
  "status.ready": { en: "Ready", bn: "প্রস্তুত" },
  "status.served": { en: "Served", bn: "পরিবেশিত" },
  "status.cancelled": { en: "Cancelled", bn: "বাতিল" },

  // Roles
  "role.manager": { en: "Manager", bn: "ম্যানেজার" },
  "role.waiter": { en: "Waiter", bn: "ওয়েটার" },
  "role.kitchen": { en: "Kitchen Staff", bn: "রান্নাঘরের কর্মী" },
  "role.cashier": { en: "Cashier", bn: "ক্যাশিয়ার" }
};

export function useLanguage() {
  const [currentLang, setCurrentLang] = useState<Language>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("restaurant_language") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "bn")) {
      setCurrentLang(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "bn" : "en";
    setCurrentLang(newLang);
    localStorage.setItem("restaurant_language", newLang);
  };

  const t = (key: string, fallback: string = "") => {
    const translation = translations[key];
    if (translation) {
      return translation[currentLang];
    }
    return fallback;
  };

  return {
    currentLang,
    toggleLanguage,
    t
  };
}

export function formatCurrency(amount: number, lang: Language = "en"): string {
  return `৳${amount.toLocaleString(lang === "bn" ? "bn-BD" : "en-BD")}`;
}

export function formatDate(date: Date | string, lang: Language = "en"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(lang === "bn" ? "bn-BD" : "en-BD");
}

export function formatTime(date: Date | string, lang: Language = "en"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString(lang === "bn" ? "bn-BD" : "en-BD", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
