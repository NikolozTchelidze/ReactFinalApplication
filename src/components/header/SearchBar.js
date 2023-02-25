import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { clearSearchProducts, queryProducts, useSearchResults } from "../../redux";
import { useDispatch } from "react-redux";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchResults = useSearchResults();
  const dispatch = useDispatch();
  useEffect(() => {
    const timerId = setTimeout(() => {
      if(searchQuery){

      }else{
        dispatch(clearSearchProducts());
      }
      dispatch(queryProducts(searchQuery));
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);

  return (
    <Autocomplete
      freeSolo
      sx={{ width: 300 }}
      disableClearable
      options={searchResults}
      getOptionLabel={(option) => option.name}
      renderOption={(_, option) => {
        const { name, category, _id, price } = option;
        return (
          <Link to={`/products/categories/${category}/${name}`} key={_id} state={{id:_id}}>
            <Box>
              <Typography>{name}</Typography>
              <Typography>{price}</Typography>
            </Box>
          </Link>
        );
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            label="Search Products"
            InputProps={{ ...params.inputProps, type: "search" }}
          />
        );
      }}
    />
  );
};
