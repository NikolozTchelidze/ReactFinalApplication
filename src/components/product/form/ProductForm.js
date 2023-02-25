import { Button, FormControl, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "../../../application/hooks/useForm";
import FileBase from "react-file-base64";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveProduct, setSelectedProduct, useSelecterProduct } from "../../../redux";
import { useNavigate } from "react-router-dom";

export const generateAddProductFormValues = (selectedProduct) => {
  return {
    name: {
      value: selectedProduct?.name || "",
      required: true,
      error: "",
      validateInput: (name) =>
        name.length > 3 ? null : "Name should have atleast 4 characters",
    },
    description: {
      value: selectedProduct?.description || "",
      required: true,
      error: "",
      validateInput: (description) =>
        description.length > 4
          ? null
          : "Description should have atleast 5 characters",
    },
    category: {
      value: selectedProduct?.category || "",
      required: true,
      error: "",
      validateInput: (category) =>
        category.length > 2
          ? null
          : "Category should have atleast 3 characters",
    },
    brand: {
      value: selectedProduct?.brand || "",
      required: true,
      error: "",
      validateInput: (brand) =>
        brand.length > 1 ? null : "Brand should have atleast 2 characters",
    },
    price: {
      value: selectedProduct?.price || "",
      required: true,
      error: "",
      validateInput: (price) =>
        price > 0 ? null : "Price should be positive number",
    },
  };
};

export const ProductForm = () => {
  const { formValues: productFormValues, onInputChange,setFormValues, } = useForm({
    defaultFormValues: generateAddProductFormValues(),
  });
  const dispatch = useDispatch();
  const [image, setImage ]  = useState("");
  const navigate = useNavigate();
  const selectedProduct = useSelecterProduct();


  const onSaveProduct = () => {
    const name = productFormValues.name.value;
    const description = productFormValues.description.value;
    const category = productFormValues.category.value;
    const brand = productFormValues.brand.value;
    const price = productFormValues.price.value;
    dispatch(
      saveProduct({
        product: { name, description, category, brand, price, image },
        isUpdating: !!selectedProduct,
        id: selectedProduct?._id,
      })
    )
    .unwrap()
    .then(() => {
      navigate("/");
    });
  };
  useEffect(()=>{
    if(selectedProduct){
      setFormValues(generateAddProductFormValues(selectedProduct));
      setImage(selectedProduct.image);
    }
  },[selectedProduct]);

  useEffect(()=>{
    return()=>{
      dispatch(setSelectedProduct(null))
    }
  },[]);


  return (
    <FormControl fullWidth>
      <TextField
        name="name"
        value={productFormValues.name.value}
        onChange={onInputChange}
        error={!!productFormValues.name.error}
        helperText={productFormValues.name.error}
        label="Name"
      />
      <TextField
        name="description"
        value={productFormValues.description.value}
        onChange={onInputChange}
        error={!!productFormValues.description.error}
        helperText={productFormValues.description.error}
        label="Description"
      />
      <TextField
        name="category"
        value={productFormValues.category.value}
        onChange={onInputChange}
        error={!!productFormValues.category.error}
        helperText={productFormValues.category.error}
        label="Category"
      />
      <TextField
        name="brand"
        value={productFormValues.brand.value}
        onChange={onInputChange}
        error={!!productFormValues.brand.error}
        helperText={productFormValues.brand.error}
        label="Brand"
      />
      <TextField
        name="price"
        value={productFormValues.price.value}
        onChange={onInputChange}
        error={!!productFormValues.price.error}
        helperText={productFormValues.price.error}
        label="Price"
      />
      <FileBase
        type="file"
        multiple={false}
        onDone={({ base64 }) => {
          setImage(base64);
        }}
      />
      <Button onClick={onSaveProduct}>Save</Button>
    </FormControl>
  );
};
