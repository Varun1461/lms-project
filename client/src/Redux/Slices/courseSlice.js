import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosinstance";

const initialState = {
    courseData: []
};

export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try {
        const responsePromise = axiosInstance.get("/courses");

        const response = await toast.promise(responsePromise, {
            loading: "loading course data...",
            success: "courses loaded successfully",
            error: "failed to get all courses",
        });

        return response.data.courses;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;  // Ensures Redux handles the rejected case properly
    }
});

export const createNewCourse = createAsyncThunk("/course/create", async (formData) => {
    const toastId = toast.loading("Creating your course... Please wait."); // Show loading toast

    try {
        const response = await axiosInstance.post("/courses", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        toast.success("Course created successfully!", { id: toastId }); // Update toast on success
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to create course", { id: toastId }); // Update toast on error
        throw error;
    }
});

export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
    try {
      const res = axiosInstance.delete(`courses/${id}`);
  
      toast.promise(res, {
        loading: "Deleting the course...",
        success: "Courses deleted successfully",
        error: "Failed to delete course",
      });
  
      const response = await res;
  
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  });

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if (action.payload) {
                state.courseData = action.payload;
            }
        });
    }
});

export default courseSlice.reducer;
