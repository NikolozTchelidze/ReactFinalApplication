import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {fetchCategoryProducts, useCategoryProducts} from "../../../redux";
import { Sort } from "./Sort";
import {CategoryProductsList} from "./CategoryProductsList";
import {Paginate} from "./Paginate";
import { useQueryParams } from "../../../application";


export const CategoryProducts = () => {
    const {categoryName} = useParams();
    const dispatch = useDispatch();
    const {products,totalPages} = useCategoryProducts();
    const {value: sort, changeQueryValue: changeSort,} = useQueryParams("sort");
    const {value: page, changeQueryValue: changePage,} = useQueryParams("page");


    useEffect(()=>{
        dispatch(fetchCategoryProducts(`${categoryName}?page=${page}&size=1&sort=${sort}`));
    },[categoryName,sort,page]);

    useEffect(() =>{
        changePage("page", 1);
    },[sort])



    return <Box>
        <Sort sort={sort} changeSort={changeSort}/>
        <CategoryProductsList products={products}/>
        <Paginate totalPages={totalPages} currentPage={page} changePage={changePage}/>
    </Box>
};