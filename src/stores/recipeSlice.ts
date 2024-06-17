import { StateCreator } from "zustand"
import { getCategories, getRecipies, getRecipiesById } from "../services/RecipiesService"
import type { Categories, Drink, Drinks, RecipeDrink, SearchFilter } from "../types"
import { FavoritesSliceType } from "./favoritesSlice"

export type RecipiesSliceType = {
    categories: Categories
    drinks: Drinks
    selectedRecipe: RecipeDrink
    modal: boolean
    fetchCategories: () => Promise<void>
    searchRecipies: (SearchFilters: SearchFilter) => Promise<void>
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
}


//slice, store mas pequeño que se incorpora en el store principal. Store = similiar a contextProvider
export const createRecipiesSlice : StateCreator<RecipiesSliceType & FavoritesSliceType, [], [], RecipiesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as RecipeDrink,
    modal: false,

    fetchCategories: async () => {
        const categories = await getCategories()
        set({ categories })
    },   

    searchRecipies: async (searchFilters) => {
       const drinks = await getRecipies(searchFilters);
       set({ drinks })
    },

    selectRecipe: async (idDrink) => {
        const selectedRecipe = await getRecipiesById(idDrink)
        set({  
            selectedRecipe,
            modal: true
        })
    },

    closeModal: () => {
        set({
            modal: false,
            selectedRecipe: {} as RecipeDrink
        })
    }
})