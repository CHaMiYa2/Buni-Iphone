import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  product_id: string;
  name: string;
  qty: number;
  price: number;
  storage: string;
  color: string;
  image: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (product_id: string, storage: string, color: string) => void;
  updateQuantity: (product_id: string, storage: string, color: string, qty: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.product_id === item.product_id && i.storage === item.storage && i.color === item.color
          );
          if (existingIndex >= 0) {
            const newItems = [...state.items];
            newItems[existingIndex].qty += item.qty;
            return { items: newItems };
          }
          return { items: [...state.items, item] };
        });
      },
      removeItem: (product_id, storage, color) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.product_id === product_id && i.storage === storage && i.color === color)
          ),
        }));
      },
      updateQuantity: (product_id, storage, color, qty) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.product_id === product_id && i.storage === storage && i.color === color
              ? { ...i, qty: Math.max(1, qty) }
              : i
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.qty, 0);
      },
      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.qty, 0);
      },
    }),
    {
      name: 'buni-iphone-cart',
    }
  )
);
