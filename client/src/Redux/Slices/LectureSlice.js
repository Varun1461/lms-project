import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosinstance";


const initialState = {
    lectures: [],
  };
  
  export const getCourseLectures = createAsyncThunk(
    "/course/lecture/get",
    async (courseId, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.get(`/courses/${courseId}`);
  
        return data.lectures; 
  
  
      } catch (error) {
        console.error("Error fetching lectures:", error);
        toast.error(error?.response?.data?.message || "Something went wrong");
        return rejectWithValue(error?.response?.data?.message || "Something went wrong");
      }
    }
  );
  
  
  
  export const addCourseLecture = createAsyncThunk(
    "/course/lecture/add",
    async (data, { rejectWithValue }) => {
      const formData = new FormData();
      formData.append("title", data.formData.get("title"));
      formData.append("description", data.formData.get("description"));
      formData.append("lecture", data.formData.get("lecture"));
      formData.append("category", data.formData.get("category"));
      formData.append("createBy", data.formData.get("createBy"));
  
      try {
        const resPromise = axiosInstance.post(`/courses/${data.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        const response = await toast.promise(resPromise, {
          loading: "Uploading lecture...",
          success: "Lecture added successfully",
          error: "Failed to add the lecture",
        });
  
        return await response.data;
      } catch (error) {
        return rejectWithValue(error?.response?.data?.message || "Error");
      }
    }
  );
  
  
  

  export const deleteCourseLecture = createAsyncThunk(
    "/course/lecture/delete",
    async (data) => {
      try {
        const res = axiosInstance.delete(
          `/courses/?courseId=${data.courseId}&lectureId=${data.lectureId}`
        );
  
        toast.promise(res, {
          loading: "Deleting the lecture...",
          success: "Lecture deleted successfully",
          error: "Failed to delete lecture",
        });
  
        const response = await res;
        return response.data;
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  );
  
  

  const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
       .addCase(getCourseLectures.fulfilled, (state, action) => {
  state.lectures = action.payload; // <-- Now just payload is the lectures array
})

          .addCase(addCourseLecture.fulfilled, (state, action) => {
            state.lectures = action?.payload?.course?.lectures;
          });
    },
    });


  export default lectureSlice.reducer;
  export const {} = lectureSlice.actions;

  