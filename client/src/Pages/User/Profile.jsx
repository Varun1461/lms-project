import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; 
import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData } from "../../Redux/Slices/authSlice";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";
import toast from "react-hot-toast";

function Profile() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.data);
  const navigate = useNavigate();

  async function handleCourseCancelSubscription() {
    toast("Initiating cancellation...");
    
    const res = await dispatch(cancelCourseBundle());
  
    if (res?.payload?.success) {
      await dispatch(getUserData());
      toast.success(res?.payload?.message || "Cancellation completed");
      navigate("/");
    } else {
      toast.error("Cancellation failed");
    }
  }

  return (
    <HomeLayout>
      <div className="min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">
        <div
          className="w-full max-w-md backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl p-8 rounded-2xl text-white flex flex-col gap-6"
          data-aos="zoom-in"
        >
          <h1 className="text-3xl font-bold text-center" data-aos="fade-down">
            User Profile
          </h1>

          <img
            src={userData?.avatar?.secure_url}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-white mx-auto object-cover"
            data-aos="fade-up"
          />

          <h3
            className="text-xl font-semibold text-center capitalize"
            data-aos="fade-up"
          >
            {userData?.fullName}
          </h3>

          <div className="flex flex-col gap-2 text-sm" data-aos="fade-up">
            <p>
              <span className="font-semibold">Email:</span> {userData?.email}
            </p>
            <p>
              <span className="font-semibold">Role:</span> {userData?.role}
            </p>
            <p>
              <span className="font-semibold">Subscription:</span>{" "}
              {userData?.subscription?.status === "active" ? "Active" : "Inactive"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up">
            <Link
              to="/changepassword"
              className="w-full sm:w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 py-2 rounded-lg font-semibold text-center shadow-md hover:shadow-lg"
            >
              Change Password
            </Link>
            <Link
              to="/user/editprofile"
              className="w-full sm:w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 py-2 rounded-lg font-semibold text-center shadow-md hover:shadow-lg"
            >
              Edit Profile
            </Link>
          </div>

          {userData?.subscription?.status?.trim()?.toLowerCase() === "active" && (
            <button
              onClick={handleCourseCancelSubscription}
              className="w-full bg-red-600 hover:bg-red-500 transition-all duration-300 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg"
              data-aos="fade-up"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default Profile;
