import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosinstance.js";

// ✅ Safe parse function
let parsedData = {};
try {
  const rawData = localStorage.getItem("data");
  if (rawData && rawData !== "undefined" && rawData !== "null") {
    parsedData = JSON.parse(rawData);
  } else {
    parsedData = {};
  }
} catch (error) {
  console.error("Error parsing localStorage data:", error);
  localStorage.removeItem("data");
}

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  data: parsedData,
  role: localStorage.getItem("role") || "",
};

// ✅ Signup
export const createAccount = createAsyncThunk("/auth/signup", async (data, { rejectWithValue }) => {
  try {
    const res = axiosInstance.post("user/register", data);

    toast.promise(res, {
      loading: "Wait! Creating your account",
      success: (data) => data?.data?.message,
      error: "Failed to create account",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return rejectWithValue(error?.response?.data);
  }
});

// ✅ Login
export const login = createAsyncThunk("/auth/login", async (data, { rejectWithValue }) => {
  try {
    const res = axiosInstance.post("user/login", data);

    toast.promise(res, {
      loading: "Wait! authentication in progress...",
      success: (data) => data?.data?.message,
      error: "Failed to log in",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return rejectWithValue(error?.response?.data);
  }
});

// ✅ Logout
export const logout = createAsyncThunk("/auth/logout", async (_, { rejectWithValue }) => {
  try {
    const res = axiosInstance.get("user/logout");

    toast.promise(res, {
      loading: "wait for logout...",
      success: (data) => data?.data?.message,
      error: "Failed to log out",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return rejectWithValue(error?.response?.data);
  }
});

// ✅ Update Profile
export const updateProfile = createAsyncThunk(
  "/user/update/profile",
  async (data) => {
    try {
      let res = axiosInstance.put(`/user/update/${data[0]}`, data[1]);

      toast.promise(res, {
        loading: "Updating...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to update profile",
      });

      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
)

// ✅ Get User Data
export const getUserData = createAsyncThunk("/user/details", async () => {
  try {
    const res = await axiosInstance.get("/user/m e");
    return res?.data;
  } catch (error) {
    toast.error(error.message);
  }
});

// ✅ Change Password
export const changePassword = createAsyncThunk(
  "/auth/changePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const res = axiosInstance.post("/user/changepassword", {
        oldPassword,
        newPassword,
      });

      toast.promise(res, {
        loading: "Changing password...",
        error: "Failed to change password",
      });

      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(error?.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })

      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.data = "";
      })

      .addCase(getUserData.fulfilled, (state, action) => {
        if (action?.payload?.user) {
          localStorage.setItem("data", JSON.stringify(action?.payload?.user));
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("role", action?.payload?.user?.role);
          state.isLoggedIn = true;
          state.data = action?.payload?.user;
          state.role = action?.payload?.user?.role;
        } else {
          // If no user is returned, treat as logged out
          localStorage.clear();
          state.isLoggedIn = false;
          state.data = {};
          state.role = "";
        }
      })

  },
});

export default authSlice.reducer;
