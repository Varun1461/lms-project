import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosinstance";

const initialState = {
  allUsersCount: 0,
  subscribedUsersCount: 0,
};

export const getStatsData = createAsyncThunk("stats/get", async () => {
  try {
    const res = await toast.promise(
      axiosInstance.get("/admin/stats/users"),
      {
        loading: "Getting the stats...",
        success: (data) => data?.data?.message || "Stats loaded successfully",
        error: "Failed to load stats",
      }
    );

    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "An error occurred");
    throw error; 
  }
});


const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatsData.fulfilled, (state, action) => {
      state.allUsersCount = action?.payload?.allUsersCount;
      state.subscribedUsersCount = action?.payload?.subscribedUsersCount;
    });
  },
});

export const {} = statSlice.actions;
export default statSlice.reducer;