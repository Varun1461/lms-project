import  { useState ,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateProfile } from "../../Redux/Slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { toast } from "react-hot-toast";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth?.data);

  useEffect(() => {
  if (!user?._id) {
    dispatch(getUserData());
  }
}, []);

  const [data, setData] = useState({
    previewImage: user?.avatar?.secure_url || "",
    fullName: user?.fullName || "",
    avatar: undefined,
    userId: user?._id,
  });
  
  function handleImageUpload(e) {
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(uploadedImage);
      reader.onloadend = () => {
        setData((prev) => ({
          ...prev,
          previewImage: reader.result,
          avatar: uploadedImage,
        }));
      };
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }
  async function onFormSubmit(e) {
    e.preventDefault();
    if (!data.fullName || !data.avatar) {
      toast.error("All fields are mandatory");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);
    
    const newUserData = [data.userId, formData];
    await dispatch(updateProfile(newUserData));
    await dispatch(getUserData());

    toast.success("Profile updated successfully");
    navigate("/user/profile");
  }
  return (
    <HomeLayout>
      {" "}
      <div className="min-h-[100vh] flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {" "}
        <form
          onSubmit={onFormSubmit}
          className="w-full max-w-md backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl p-8 rounded-2xl text-white flex flex-col gap-6"
          data-aos="zoom-in"
        >
          {" "}
          <h1 className="text-3xl font-bold text-center" data-aos="fade-down">
            {" "}
            Edit Profile{" "}
          </h1>{" "}
          <label
            htmlFor="image_uploads"
            className="cursor-pointer flex justify-center"
            data-aos="fade-up"
          >
            {" "}
            {data.previewImage ? (
              <img
                className="w-28 h-28 rounded-full border-4 border-white object-cover"
                src={data.previewImage}
                alt="preview"
              />
            ) : (
              <BsPersonCircle className="w-28 h-28 text-white/70" />
            )}{" "}
          </label>{" "}
          <input
            onChange={handleImageUpload}
            className="hidden"
            type="file"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .jpeg, .png"
          />{" "}
          <div className="flex flex-col gap-2" data-aos="fade-up">
            {" "}
            <label htmlFor="fullName" className="text-lg font-semibold">
              {" "}
              Full Name{" "}
            </label>{" "}
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={data.fullName}
              onChange={handleInputChange}
              className="bg-transparent px-4 py-2 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />{" "}
          </div>{" "}
          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-500 py-2 rounded-lg font-semibold text-lg transition duration-300"
            data-aos="fade-up"
          >
             {" "}
            Update Profile{" "}
          </button>{" "}
          <Link to="/user/profile" data-aos="fade-up">
            {" "}
            <p className="text-yellow-500 hover:text-yellow-400 transition flex items-center justify-center gap-2 mt-2">
              {" "}
              <AiOutlineArrowLeft /> Back to Profile{" "}
            </p>{" "}
          </Link>{" "}
        </form>{" "}
      </div>{" "}
    </HomeLayout>
  );
}
export default EditProfile;
