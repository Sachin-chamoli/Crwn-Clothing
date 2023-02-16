import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../../routes/categories-preview/categories-preview.component";
import Category from "../../routes/category/category.component";
import { fetchCategoriesStart } from "../../store/categories/category.action";

import { useDispatch } from "react-redux";

import "./shop.styles.scss"

 const Shop = () =>{
  const dispatch = useDispatch();
  
    useEffect(()=>{
      dispatch(fetchCategoriesStart());
    }, [])

    return(
        <Routes>
          <Route index element={<CategoriesPreview/>}></Route>
          <Route path=":category" element={<Category/>}></Route>
        </Routes>
    );
 }

 export default Shop