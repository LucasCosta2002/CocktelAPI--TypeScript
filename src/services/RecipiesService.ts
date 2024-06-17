import axios from "axios";
import { CategoriesAPIResponseSchmea, DrinksAPIResponse, RecipeAPIResponseSchema } from "../utils/recipies-shema";
import { Drink, SearchFilter } from "../types";

export async function getCategories() {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

    const {data} = await axios.get(url)

    //comprobar que los resultados sean como el schema
    const result = CategoriesAPIResponseSchmea.safeParse(data);

    if(result.success) {
        return result.data
    }
}

export async function getRecipies(searchFilters : SearchFilter) {

    const {ingridient, category} = searchFilters;

    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}&i=${ingridient}`;
 
    const {data} = await axios.get(url)

    //comprobar que los resultados sean como el schema
    const result = DrinksAPIResponse.safeParse(data);
    
    if(result.success) {
         return result.data
    }
}


export async function getRecipiesById(id : Drink['idDrink']) {

    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
 
    const {data} = await axios.get(url)

    //comprobar que los resultados sean como el schema
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0]);
    
    if(result.success) {
         return result.data
    }
}