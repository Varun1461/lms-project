import './App.css';
import { Route, Routes } from 'react-router-dom';

import HomePage from '../src/Pages/HomePage.jsx';
import AboutUs from '../src/Pages/AboutUs.jsx';
import NotFound from '../src/Pages/NotFound.jsx';
import Signup from '../src/Pages/Signup.jsx';
import Login from '../src/Pages/Login.jsx';
import CourseList from './Pages/Course/courseList.jsx';
import Contact from './Pages/Contact.jsx';
import Denied from './Pages/Denied.jsx';
import CourseDescription from './Pages/Course/CourseDescription.jsx';
import RequireAuth from './components/Auth/RequireAuth.jsx';
import CreateCourse from './Pages/Course/CreateCourse.jsx';
import Profile from './Pages/User/Profile.jsx';
import EditProfile from './Pages/User/EditProfile.jsx';
import Checkout from './Pages/Payment/Checkout.jsx';
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess.jsx';
import CheckoutFailure from './Pages/Payment/CheckoutFailure.jsx';
import Displaylectures from './Pages/Dashboard/Displaylectures.jsx';
import AddLecture from './Pages/Dashboard/Addlecture.jsx';
import AdminDashboard from './Pages/Dashboard/AdminDashboard.jsx';
import ChangePassword from './Pages/User/changepassword.jsx';

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="/course/description" element={<CourseDescription />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/fail" element={<CheckoutFailure />} />
        <Route path="/course/displaylectures" element={<Displaylectures />} />

        {/* Admin Only Routes */}
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/course/addlecture" element={<AddLecture />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Admin & User Routes */}
        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/editprofile" element={<EditProfile />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
