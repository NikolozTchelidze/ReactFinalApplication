import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../application";

export const saveProduct = createAsyncThunk(
  "product/saveProduct",
  async ({ product, isUpdating, id }, { rejectWithValue, dispatch }) => {
    try {
      const endPoint = isUpdating ? `/products/${id}` : "/products";
      const method = isUpdating ? "put" : "post";
      const { data } = await axiosInstance[method](endPoint, { product });
      dispatch(fetchHomePageProducts());
      return data;
    } catch (error) {
      rejectWithValue("error during saving product");
    }
  }
);

export const fetchHomePageProducts = createAsyncThunk(
  "product/fetchHomePageProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/products");
      return data;
    } catch (error) {
      return rejectWithValue("Error during getting home page products");
    }
  }
);

export const fetchCategoryProducts = createAsyncThunk(
  "product/fetchCategoryProducts",
  async (url, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/products/categories/${url}`);
      return data;
    } catch (error) {
      return rejectWithValue("Error during fetching category products");
    }
  }
);

export const queryProducts = createAsyncThunk(
  "product/queryProducts",
  async (name, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/products?name=${name}`);
      return data;
    } catch (error) {
      return rejectWithValue("Error getting query products");
    }
  }
);

export const rateProduct = createAsyncThunk(
  "product/rateProduct",
  async (
    { productId, userId, rating, url, isHome },
    { rejectWithValue, dispatch }
  ) => {
    try {
      await axiosInstance.post(`/products/${productId}/users/${userId}/rate`, {
        rating,
      });
      if (isHome) {
        dispatch(fetchHomePageProducts());
      } else {
        dispatch(fetchCategoryProducts(url));
      }
    } catch (error) {
      return rejectWithValue("Problem rating product");
    }
  }
);
export const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingleProduct",
  async ({ id, category }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/products/category/${category}/${id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue("Couldnt fetch single product");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    homePageProducts: [],
    error: null,
    selectedProduct: null,
    categories: [],
    categoryProducts: {},
    searchResults: [],
    singleProduct: null,
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSearchProducts: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveProduct.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(saveProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchHomePageProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchHomePageProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.homePageProducts = action.payload.products;
      state.error = null;
      state.categories = action.payload.categories;
    });
    builder.addCase(fetchHomePageProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchCategoryProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryProducts = action.payload;
    });
    builder.addCase(fetchCategoryProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(queryProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(queryProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.searchResults = action.payload.products;
    });
    builder.addCase(queryProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleProduct.fulfilled, (state,action) => {
      state.loading = false;
      state.singleProduct = action.payload.product;
    });
    builder.addCase(fetchSingleProduct.rejected, (state,action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const productReducer = productSlice.reducer;
export const { setSelectedProduct, clearSearchProducts } = productSlice.actions;
