 
import { CATEGORIES_ACTION_TYPE} from "./category.types"

// export const  setCategories = (categoriesArray) =>{
//     return ({type : CATEGORIES_ACTION_TYPE.SET_CATEGORIES, payload : categoriesArray})
// }

export const fetchCategoriesStart = () =>{
    return ({type : CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START})
}
export const fetchCategoriesSuccess = (categoriesArray) =>{
    return ({type : CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS , payload : categoriesArray})
}
export const fetchCategoriesFailed = (error) =>{
    return ({type : CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED , payload : error})
}
