import { useState, useEffect } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { createAccount } from "../Redux/Slices/authSlice";
import { isEmail, isValidPassword } from "../Helpers/regexMatcher";
import AOS from "aos";
import "aos/dist/aos.css";
import Background from "../Assets/images/background.png";


function Signup() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  function getImage(event) {
    event.preventDefault();

    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }

  async function createNewAccount(event) {
    event.preventDefault();

    if (!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar) {
      toast.error("Please fill all the details");
      return;
    }

    if (signupData.fullName.length < 5) {
      toast.error("Name should be at least 5 characters long");
      return;
    }

    if (!isEmail(signupData.email)) {
      toast.error("Invalid email ID");
      return;
    }
    if (!isValidPassword(signupData.password)) {
      toast.error("Password should be 6-16 characters long with at least a number and special character");
      return;
    }
    
    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    const response = await dispatch(createAccount(formData));

    if (response?.payload?.success) {
      navigate("/");
    } else {
      console.log("Signup failed", response.payload || "Unknown error");
    }

    setSignupData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });

    setPreviewImage("");
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh] bg-cover bg-center bg-no-repeat min-h-screen "
       style={{ backgroundImage: `url(${Background})` }}>
        <form
          noValidate
          onSubmit={createNewAccount}
          className="flex flex-col justify-center gap-4 rounded-lg p-6 w-96 bg-black border border-gray-500 shadow-xl shadow-blue-500/50"
          data-aos="fade-right"
        >
          <h1 className="text-center text-2xl font-bold text-white" data-aos="fade-right" data-aos-delay="100">
            Registration Page
          </h1>

          {/* Image Upload */}
          <label htmlFor="image_uploads" className="cursor-pointer" data-aos="fade-right" data-aos-delay="200">
            {previewImage ? (
              <img className="w-24 h-24 rounded-full m-auto border-2 border-blue-400 shadow-lg" src={previewImage} />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto text-gray-400" />
            )}
          </label>
          <input
            onChange={getImage}
            className="hidden"
            type="file"
            accept=".jpg,.jpeg,.png,.svg"
            name="image_uploads"
            id="image_uploads"
          />

          {/* Name Input */}
          <div className="flex flex-col gap-1" data-aos="fade-right" data-aos-delay="300">
            <label htmlFor="fullName" className="font-semibold text-white">
              Name
            </label>
            <input
              type="text"
              required
              name="fullName"
              id="fullName"
              placeholder="Enter name here.."
              className="bg-gray-800 text-white px-2 py-1 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
              onChange={handleUserInput}
              value={signupData.fullName}
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-1" data-aos="fade-right" data-aos-delay="400">
            <label htmlFor="email" className="font-semibold text-white">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter email here.."
              className="bg-gray-800 text-white px-2 py-1 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
              onChange={handleUserInput}
              value={signupData.email}
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1" data-aos="fade-right" data-aos-delay="500">
            <label htmlFor="password" className="font-semibold text-white">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter password here.."
              className="bg-gray-800 text-white px-2 py-1 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
              onChange={handleUserInput}
              value={signupData.password}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:via-blue-600 hover:to-purple-600 py-2 text-lg font-semibold text-white rounded-md shadow-md transition-all duration-300 ease-in-out"
            data-aos="fade-right"
            data-aos-delay="600"
          >
            Create Account
          </button>

          {/* Login Link */}
          <p className="text-center text-white" data-aos="fade-right" data-aos-delay="700">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Signup;
