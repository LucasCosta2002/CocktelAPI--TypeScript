import { z } from 'zod';
import { CategoriesAPIResponseSchmea, DrinkAPIResponse, DrinksAPIResponse, RecipeAPIResponseSchema } from '../utils/recipies-shema';
import { SearchFilterSchema } from '../utils/recipies-shema';

export type Categories = z.infer<typeof CategoriesAPIResponseSchmea>;
export type SearchFilter = z.infer<typeof SearchFilterSchema>;
export type Drinks = z.infer<typeof DrinksAPIResponse>
export type Drink = z.infer<typeof DrinkAPIResponse>
export type RecipeDrink = z.infer<typeof RecipeAPIResponseSchema>