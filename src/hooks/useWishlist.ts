import { useState } from "react";

export interface WishlistItem {
  id: string;
  title: string;
  url?: string;
  note?: string;
  emoji?: string;
  addedAt: string;
  reservedBy?: "self" | "partner";
  reservedAt?: string;
}

const STORAGE_KEY = "melo-wishlist";

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
    catch { return []; }
  });

  const save = (next: WishlistItem[]) => {
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const addItem = (item: Omit<WishlistItem, "id" | "addedAt">) => {
    const newItem: WishlistItem = {
      ...item,
      id: `wish-${Date.now()}`,
      addedAt: new Date().toISOString(),
    };
    save([...items, newItem]);
    return newItem;
  };

  const removeItem = (id: string) => save(items.filter(i => i.id !== id));

  const updateItem = (id: string, updates: Partial<WishlistItem>) => {
    save(items.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  const isWished = (title: string) => items.some(i => i.title === title);

  const toggleWish = (title: string, emoji?: string) => {
    if (isWished(title)) {
      save(items.filter(i => i.title !== title));
    } else {
      const newItem: WishlistItem = {
        id: `wish-${Date.now()}`,
        title,
        emoji,
        addedAt: new Date().toISOString(),
      };
      save([...items, newItem]);
    }
  };

  const toggleReserve = (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item) return;
    if (item.reservedBy === "self") {
      updateItem(id, { reservedBy: undefined, reservedAt: undefined });
    } else {
      updateItem(id, { reservedBy: "self", reservedAt: new Date().toISOString() });
    }
  };

  return { items, addItem, removeItem, isWished, toggleWish, updateItem, toggleReserve };
}
