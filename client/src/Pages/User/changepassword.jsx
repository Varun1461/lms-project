import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../Redux/Slices/authSlice';
import toast from 'react-hot-toast';
import HomeLayout from "../../Layouts/HomeLayout";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: ''
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(changePassword(formData)).unwrap();
      setFormData({ oldPassword: '', newPassword: '' });

      // Delay to avoid AOS-triggered double render causing double toast
      setTimeout(() => {
        toast.success(res.message);
        navigate('/user/profile');
      }, 100);
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <HomeLayout>
      <div className="min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <form
          onSubmit={handleSubmit}
          className="w-[90%] md:w-[40%] backdrop-blur-sm bg-white/5 border border-white/10 shadow-2xl p-8 rounded-2xl text-white flex flex-col gap-6 transition-all"
          data-aos="zoom-in"
        >
          <h1 className="text-3xl font-bold text-center text-white-500" data-aos="fade-down">
            Change Password
          </h1>

          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={formData.oldPassword}
            onChange={handleChange}
            className="bg-black/20 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 "
            required
            data-aos="fade-right"
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            className="bg-black/20 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 "
            required
            data-aos="fade-left"
          />

          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg"
            data-aos="fade-up"
          >
            Update Password
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ChangePassword;
