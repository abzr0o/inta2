import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseurl from "../../api/baseurl";

export const login = createAsyncThunk("login", async (data: any) => {
  try {
    const res = await baseurl.post("/login", data);

    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const checkCookie = createAsyncThunk(
  "check",
  async (_, { rejectWithValue }) => {
    try {
      const res = await baseurl.get("check");
      return res.data;
    } catch (err: any) {
      if (err.response.status === 401) {
        return rejectWithValue(401);
      }
    }
  }
);

export const authUser = createSlice({
  name: "authUser",
  initialState: {
    token: null,
    user: null,
    isloggedin: false,
    finshchechk: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isloggedin = true;
      })
      .addCase(checkCookie.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isloggedin = true;
      })
      .addCase(checkCookie.rejected, (state) => {
        state.isloggedin = false;
        state.user = null;
      });
  },
});

export default authUser.reducer;
