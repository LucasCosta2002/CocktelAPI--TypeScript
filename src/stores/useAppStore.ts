import { create } from "zustand";
import { createRecipiesSlice, RecipiesSliceType } from "./recipeSlice";
import { devtools } from "zustand/middleware";
import { FavoritesSliceType, createFavoritesSlice } from "./favoritesSlice";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";

//a = escribir en el state (set, get, api)
export const useAppStore = create<RecipiesSliceType & FavoritesSliceType & NotificationSliceType>()(devtools((...a) => ({
    ...createRecipiesSlice(...a), 
    ...createFavoritesSlice(...a), 
    ...createNotificationSlice(...a) 
})))