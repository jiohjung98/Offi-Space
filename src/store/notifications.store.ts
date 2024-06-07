import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface useNotificationType {
  category: string;
  /* eslint-disable no-unused-vars */
  setCategory: (payload: string) => void;
}

export const useNotification = create(
  persist<useNotificationType>(
    (set) => ({
      category: 'RESERVATION',
      setCategory: (payload: string) =>
        set(() => ({
          category: payload
        }))
    }),
    {
      name: 'category'
    }
  )
);

export const useNotificationCategory = () => useNotification((state) => state.category);
export const useSetNotificationCategory = () =>
  useNotification((state) => state.setCategory);
