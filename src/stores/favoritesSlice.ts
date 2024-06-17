import { StateCreator } from "zustand";
import { RecipeDrink } from "../types";
import { createRecipiesSlice, RecipiesSliceType } from "./recipeSlice";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";

//slice pattern
export type FavoritesSliceType = {
    favorites: RecipeDrink[]
    handleClickFavorite: (recipe: RecipeDrink) => void
    favoriteExists: (id: RecipeDrink['idDrink']) => boolean
    loadFromStorage: () => void
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType & RecipiesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id) 
    },

    handleClickFavorite: (recipie) => {

        //si existe el id en el state, lo borro
        if (get().favoriteExists(recipie.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipie.idDrink)
            }))
      
            createNotificationSlice(set, get, api).showNotification({ text: "Se elimino de favoritos", error: false })
      
        } else {
            set((state) => ({
                favorites: [...state.favorites, recipie]
            }))
      
            createNotificationSlice(set, get, api).showNotification({ text: "Se Agregó de favoritos", error: false })
      
        }

        createRecipiesSlice(set, get, api).closeModal()

        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },

    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')

        if (storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }

})