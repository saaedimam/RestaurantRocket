import {
  users,
  tables,
  categories,
  menuItems,
  orders,
  orderItems,
  inventoryItems,
  staff,
  type User,
  type UpsertUser,
  type Table,
  type InsertTable,
  type Category,
  type InsertCategory,
  type MenuItem,
  type InsertMenuItem,
  type Order,
  type InsertOrder,
  type OrderItem,
  type InsertOrderItem,
  type InventoryItem,
  type InsertInventoryItem,
  type Staff,
  type InsertStaff,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc, sql, gte, lte } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Table operations
  getTables(): Promise<Table[]>;
  getTable(id: number): Promise<Table | undefined>;
  createTable(table: InsertTable): Promise<Table>;
  updateTableStatus(id: number, status: string): Promise<Table>;
  
  // Category operations
  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Menu item operations
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItemsByCategory(categoryId: number): Promise<MenuItem[]>;
  createMenuItem(menuItem: InsertMenuItem): Promise<MenuItem>;
  updateMenuItemAvailability(id: number, available: boolean): Promise<MenuItem>;
  
  // Order operations
  getOrders(): Promise<Order[]>;
  getOrdersByStatus(status: string): Promise<Order[]>;
  getOrdersForKitchen(): Promise<(Order & { orderItems: (OrderItem & { menuItem: MenuItem })[] })[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order>;
  
  // Order item operations
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  updateOrderItemStatus(id: number, status: string): Promise<OrderItem>;
  
  // Inventory operations
  getInventoryItems(): Promise<InventoryItem[]>;
  getLowStockItems(): Promise<InventoryItem[]>;
  updateInventoryStock(id: number, newStock: number): Promise<InventoryItem>;
  
  // Staff operations
  getStaff(): Promise<(Staff & { user: User })[]>;
  getStaffByRole(role: string): Promise<(Staff & { user: User })[]>;
  createStaff(staff: InsertStaff): Promise<Staff>;
  
  // Analytics
  getDailyStats(): Promise<{
    totalSales: number;
    totalOrders: number;
    averageOrder: number;
    activeTables: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Table operations
  async getTables(): Promise<Table[]> {
    return await db.select().from(tables).orderBy(asc(tables.number));
  }

  async getTable(id: number): Promise<Table | undefined> {
    const [table] = await db.select().from(tables).where(eq(tables.id, id));
    return table;
  }

  async createTable(table: InsertTable): Promise<Table> {
    const [newTable] = await db.insert(tables).values(table).returning();
    return newTable;
  }

  async updateTableStatus(id: number, status: string): Promise<Table> {
    const [table] = await db
      .update(tables)
      .set({ status })
      .where(eq(tables.id, id))
      .returning();
    return table;
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories).where(eq(categories.active, true));
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }

  // Menu item operations
  async getMenuItems(): Promise<MenuItem[]> {
    return await db.select().from(menuItems).where(eq(menuItems.available, true));
  }

  async getMenuItemsByCategory(categoryId: number): Promise<MenuItem[]> {
    return await db
      .select()
      .from(menuItems)
      .where(and(eq(menuItems.categoryId, categoryId), eq(menuItems.available, true)));
  }

  async createMenuItem(menuItem: InsertMenuItem): Promise<MenuItem> {
    const [newMenuItem] = await db.insert(menuItems).values(menuItem).returning();
    return newMenuItem;
  }

  async updateMenuItemAvailability(id: number, available: boolean): Promise<MenuItem> {
    const [menuItem] = await db
      .update(menuItems)
      .set({ available })
      .where(eq(menuItems.id, id))
      .returning();
    return menuItem;
  }

  // Order operations
  async getOrders(): Promise<Order[]> {
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  }

  async getOrdersByStatus(status: string): Promise<Order[]> {
    return await db
      .select()
      .from(orders)
      .where(eq(orders.status, status as any))
      .orderBy(asc(orders.createdAt));
  }

  async getOrdersForKitchen(): Promise<(Order & { orderItems: (OrderItem & { menuItem: MenuItem })[] })[]> {
    const ordersWithItems = await db.query.orders.findMany({
      where: sql`${orders.status} IN ('confirmed', 'preparing')`,
      with: {
        orderItems: {
          with: {
            menuItem: true,
          },
        },
        table: true,
      },
      orderBy: [asc(orders.createdAt)],
    });
    return ordersWithItems as any;
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db.insert(orders).values(order).returning();
    return newOrder;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order> {
    const [order] = await db
      .update(orders)
      .set({ status: status as any, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return order;
  }

  // Order item operations
  async createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem> {
    const [newOrderItem] = await db.insert(orderItems).values(orderItem).returning();
    return newOrderItem;
  }

  async updateOrderItemStatus(id: number, status: string): Promise<OrderItem> {
    const [orderItem] = await db
      .update(orderItems)
      .set({ status })
      .where(eq(orderItems.id, id))
      .returning();
    return orderItem;
  }

  // Inventory operations
  async getInventoryItems(): Promise<InventoryItem[]> {
    return await db.select().from(inventoryItems);
  }

  async getLowStockItems(): Promise<InventoryItem[]> {
    return await db
      .select()
      .from(inventoryItems)
      .where(sql`${inventoryItems.currentStock} <= ${inventoryItems.minStock}`);
  }

  async updateInventoryStock(id: number, newStock: number): Promise<InventoryItem> {
    const [item] = await db
      .update(inventoryItems)
      .set({ currentStock: newStock.toString(), lastRestocked: new Date() })
      .where(eq(inventoryItems.id, id))
      .returning();
    return item;
  }

  // Staff operations
  async getStaff(): Promise<(Staff & { user: User })[]> {
    return await db.query.staff.findMany({
      with: {
        user: true,
      },
      where: eq(staff.active, true),
    }) as any;
  }

  async getStaffByRole(role: string): Promise<(Staff & { user: User })[]> {
    return await db.query.staff.findMany({
      with: {
        user: true,
      },
      where: and(eq(staff.role, role as any), eq(staff.active, true)),
    }) as any;
  }

  async createStaff(staffData: InsertStaff): Promise<Staff> {
    const [newStaff] = await db.insert(staff).values(staffData).returning();
    return newStaff;
  }

  // Analytics
  async getDailyStats(): Promise<{
    totalSales: number;
    totalOrders: number;
    averageOrder: number;
    activeTables: number;
  }> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [salesResult] = await db
      .select({
        totalSales: sql<number>`COALESCE(SUM(${orders.totalAmount}), 0)`,
        totalOrders: sql<number>`COUNT(*)`,
      })
      .from(orders)
      .where(
        and(
          gte(orders.createdAt, today),
          lte(orders.createdAt, tomorrow),
          sql`${orders.status} != 'cancelled'`
        )
      );

    const [activeTablesResult] = await db
      .select({
        count: sql<number>`COUNT(*)`,
      })
      .from(tables)
      .where(eq(tables.status, "occupied"));

    const averageOrder = salesResult.totalOrders > 0 
      ? salesResult.totalSales / salesResult.totalOrders 
      : 0;

    return {
      totalSales: salesResult.totalSales || 0,
      totalOrders: salesResult.totalOrders || 0,
      averageOrder: averageOrder,
      activeTables: activeTablesResult.count || 0,
    };
  }
}

export const storage = new DatabaseStorage();
