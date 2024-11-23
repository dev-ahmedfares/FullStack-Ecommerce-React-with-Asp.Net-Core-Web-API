import { isString, TCategory, TLoading } from "@customTypes/index";
import { createSlice } from "@reduxjs/toolkit";
import { actGetGategories } from "./act/actGetCategories";
import actAddNewCategory from "./act/actAddNewCategory";
import actDelCategoryById from "./act/actDelCategoryById";

type TInitialState = {
  records: TCategory[];
  loading: TLoading;
  loadingCategories: TLoading;
  loadingAddingProduct: TLoading;
  error: string | null;
};

const initialState: TInitialState = {
  records: [],
  loading: "idle",
  loadingCategories: "idle",
  loadingAddingProduct: "idle",
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoriesCleanUp: (state) => {
      state.records = [];
      state.error=null;
      state.loading= "idle";
      state.loadingCategories= "idle";
    },
  },
  extraReducers: (builder) => {
    // Get All Categories
    builder.addCase(actGetGategories.pending, (state) => {
      state.loadingCategories = "pending";
      state.error = null;
    });
    builder.addCase(actGetGategories.fulfilled, (state, action) => {
      state.loadingCategories = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetGategories.rejected, (state, action) => {
      state.loadingCategories = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // Add New Category 
    builder.addCase(actAddNewCategory.pending, (state) => {
      state.loadingAddingProduct = "pending";
      state.error = null;
    });
    builder.addCase(actAddNewCategory.fulfilled, (state) => {
      state.loadingAddingProduct = "succeeded";
    });
    builder.addCase(actAddNewCategory.rejected, (state, action) => {
      state.loadingAddingProduct = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // Delete Category 
    builder.addCase(actDelCategoryById.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actDelCategoryById.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actDelCategoryById.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { categoriesCleanUp } = categorySlice.actions;
export { actGetGategories,actAddNewCategory,actDelCategoryById };
export default categorySlice.reducer;
