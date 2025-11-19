import { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Slices/authSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  const [showFooter, setShowFooter] = useState(true);
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        setShowFooter(false); // Hide footer when scrolling up
      } else {
        setShowFooter(true); // Show footer when scrolling down
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function hideDrawer() {
    const drawerToggle = document.querySelector("#my-drawer");
    if (drawerToggle) drawerToggle.checked = false;
  }

  function changeWidth() {
    const drawerSide = document.querySelector(".drawer-side");
    if (drawerSide) {
      drawerSide.style.width = "auto";
    }
  }

  async function handleLogout(e) {
    e.preventDefault();
    const res = await dispatch(logout());
    if (res?.payload?.success) navigate("/");
  }

  return (
    <div className="min-h-[90vh] relative">
      <div className="drawer absolute z-50 left-0">
        {/* Drawer Input Toggle */}
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Sidebar Menu Button */}
          <label htmlFor="my-drawer" className="cursor-pointer fixed top-4 left-4">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold text-white"
            />
          </label>
        </div>

        {/* Sidebar Drawer */}
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-72 h-full bg-black/70 backdrop-blur-md text-white relative">
            {/* Close Button */}
            <li className="absolute top-4 right-4 z-50">
              <button onClick={hideDrawer} className="bg-transparent hover:bg-gray-700 p-1 rounded-full">
                <AiFillCloseCircle size={24} className="text-white" />
              </button>
            </li>

            {/* Sidebar Links */}
            <li className="text-left">
              <Link to={"/"} className="relative group p-2 rounded text-white block">
                <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">
                  Home
                </span>
              </Link>
            </li>
            {isLoggedIn && role === "ADMIN" && (
              <li className="text-left">
                <Link to={"/admin/dashboard"} className="relative group p-2 rounded text-white block">
                  <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">
                    Admin Dashboard
                  </span>
                </Link>
              </li>
            )}
            {isLoggedIn && role === "ADMIN" && (
              <li className="text-left">
                <Link to={"/course/create"} className="relative group p-2 rounded text-white block">
                  <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">
                    Create New Course
                  </span>
                </Link>
              </li>
            )}

            <li className="text-left">
              <Link to={"/courses"} className="relative group p-2 rounded text-white block">
                <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">
                  All Courses
                </span>
              </Link>
            </li>
            <li className="text-left">
              <Link to={"/contact"} className="relative group p-2 rounded text-white block">
                <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">
                  Contact Us
                </span>
              </Link>
            </li>
            <li className="text-left">
              <Link to={"/about"} className="relative group p-2 rounded text-white block">
                <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">
                  About Us
                </span>
              </Link>
            </li>

            {/* Login/Signup Buttons */}
            {!isLoggedIn && (
              <li className="absolute bottom-4 left-0 w-full px-4">
                <div className="flex">
                  <Link to="/login" className="w-1/2">
                    <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 w-full rounded-l-lg">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup" className="w-1/2">
                    <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 w-full rounded-r-lg">
                      Signup
                    </button>
                  </Link>
                </div>
              </li>
            )}

            {/* Logout/Profile Buttons */}
            {isLoggedIn && (
              <li className="absolute bottom-4 left-0 w-full px-4">
                <div className="flex gap-2">
                  <Link to="/user/profile" className="w-full">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 w-full rounded-md">
                      Profile
                    </button>
                  </Link>
                  <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 w-full rounded-md">
                    Logout
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      {children}

      {/* Footer is conditionally displayed based on scroll */}
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
