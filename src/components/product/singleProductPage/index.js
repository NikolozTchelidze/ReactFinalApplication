import { Box, Card, CardActions, CardContent, Rating, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { fetchSingleProduct, useSingleProduct } from "../../../redux";

const SingleProduct = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { categoryName } = useParams();
  const singleProduct = useSingleProduct();
  useEffect(() => {
    dispatch(fetchSingleProduct({ id: state.id, category: categoryName }));
  }, [state.id]);
  return (
    <Box sx={{display:"flex", justifyContent:"center", alignItems:"center",}}>
      <Card sx={{ width: 600, borderRadius: 5,}}>
        <img
          src={singleProduct.image}
          alt={`${singleProduct.category}-${singleProduct.name}`}
          width="100%"
          height="200px"
          style={{ objectFit: "cover" }}
        ></img>
        <CardContent sx={{display:"flex", justifyContent:"space-around"}}>
            <Typography>{singleProduct.name}</Typography>
            <Typography>${singleProduct.price}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SingleProduct;
