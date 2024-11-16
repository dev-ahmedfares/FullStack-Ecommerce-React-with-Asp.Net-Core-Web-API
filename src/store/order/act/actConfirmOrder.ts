import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";



const actConfirmOrder = createAsyncThunk(
  "order/actConfirmOrder",
  async (subtotal: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { cart, auth } = getState() as RootState;
    const API_URL = import.meta.env.VITE_FETCH_URL
    const ordersItems = cart.productsFullInfo.map((el) => ({
      productId: el.productId,
      productName: el.productName,
      img: el.productImages[0].imagePath,
      price: el.price,
      quantity: cart.items[el.productId],
    }));

    const order = {
      userId: auth.user?.userId,
      subtotal,
      items: ordersItems,
    };

    try {
        await fetch(`${API_URL}/order`,{
        method:"POST",
        body: JSON.stringify(order),
        headers: {
          "Content-Type":"application/json"
        }
      });
  
      
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default actConfirmOrder;
