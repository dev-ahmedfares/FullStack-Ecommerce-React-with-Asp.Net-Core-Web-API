import { isString, TLoading } from "@customTypes/index";
import { createSlice } from "@reduxjs/toolkit";
import actAddReview from "./act/actAddReview";
import actGetReviewByProductId from "./act/actGetReviewByProductId";
import actDelReview from "./act/actDelReview";
type TReview = {
  comment: string;
  date: string;
  rating: number;
  userName: string;
}

type TReviewState = {
  loading: TLoading;
  loadingDelReview: TLoading;
  error: string | null;
  reviews: TReview[];
};

const initialState: TReviewState = {
  loading: "idle",
  loadingDelReview: "idle",
  error: null,
  reviews: [],
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    reviewCleanUp:(state)=>{
      state.loading = "idle";
      state.error = null
      state.reviews= []
    }
  },
  extraReducers: (builder) => {
    // Add new Review
    builder
      .addCase(actAddReview.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actAddReview.fulfilled, (state,action) => {
        state.loading = "succeeded";
        if (action.payload.type === "add") {

          state.reviews  = [...state.reviews,action.payload.review]
        } else {
          state.reviews  = state.reviews.map((review)=> {
            if (review.userName === action.payload.review.userName) {
              return action.payload.review
            } else {
              return review
            }
          })

        }
        
      })
      .addCase(actAddReview.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
    // Get Product Review
    builder
      .addCase(actGetReviewByProductId.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetReviewByProductId.fulfilled, (state,action) => {
        state.loading = "succeeded";
        state.reviews = action.payload
      })
      .addCase(actGetReviewByProductId.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });

    // Delete Review By Product Id 
    builder
      .addCase(actDelReview.pending, (state) => {
        state.loadingDelReview = "pending";
        state.error = null;
      })
      .addCase(actDelReview.fulfilled, (state,action) => {
        state.loadingDelReview = "succeeded";
        if (action.payload) {
          state.reviews = state.reviews.filter((review)=> review.userName !== action.payload)
        }
      })
      .addCase(actDelReview.rejected, (state, action) => {
        state.loadingDelReview = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
  },
});
export const {reviewCleanUp}  = reviewSlice.actions
export { actAddReview, actGetReviewByProductId,actDelReview };
export default reviewSlice.reducer;
