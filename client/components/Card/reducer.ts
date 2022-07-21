import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseurl from "../../utils/api/baseurl";

export const getTrending = createAsyncThunk(
  "GetTrendning",
  async (params: any) => {
    try {
      const data = await baseurl.get("/trending", { params });
      return {
        data,
        params,
      };
    } catch (err) {
      console.log(err);
    }
  }
);

export const Cards = createSlice({
  name: "cards",
  initialState: {
    trending: {
      params: {},
      data: null,
    },
    activity: {},
    mostfollowed: {},
  } as any,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTrending.fulfilled, (state, action) => {
      state.trending.data = action.payload?.data.data;
      state.trending.params = action.payload?.params;
    });
  },
});

export default Cards.reducer;
