import { useState, useEffect } from 'react';
import HomeLayout from '../Layouts/HomeLayout';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { login } from '../Redux/Slices/authSlice';
import Background from "../Assets/images/background.png"; // Import background image
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Eye, EyeOff } from "lucide-react"; // 👈 eye icons

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [passwordVisible, setPasswordVisible] = useState(false); // 👈 state for toggle

    function handleUserInput(e) {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }

    async function onLogin(event) {
        event.preventDefault();
    
        if (!loginData.email || !loginData.password) {
            toast.error("Please fill all the details");
            return;
        }
    
        const response = await dispatch(login(loginData));
    
        if (response?.payload?.success) {
            navigate("/");
        }
        setLoginData({
            email: "",
            password: "",
        });
    }

    return (
        <HomeLayout>
            <div 
                className="flex items-center justify-center h-[100vh] bg-cover bg-center bg-no-repeat min-h-screen "
                style={{ backgroundImage: `url(${Background})` }} // Set Background Image
            >
                <form 
                    noValidate 
                    onSubmit={onLogin} 
                    className="flex flex-col justify-center gap-5 rounded-lg p-6 text-white w-96 shadow-md bg-black bg-opacity-80 border border-gray-700 backdrop-blur-lg shadow-purple-600" 
                    data-aos="fade-up"
                >
                    <h1 className="text-center text-3xl font-extrabold" data-aos="fade-right">Login Page</h1>
                    
                    {/* Email */}
                    <div className='flex flex-col gap-2' data-aos="fade-right" data-aos-delay="200">
                        <label htmlFor='email' className='font-semibold'>Email</label>
                        <input
                            type='email'
                            required
                            name='email'
                            id='email'
                            placeholder='Enter email here...'
                            className='bg-gray-800 px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            onChange={handleUserInput}
                            value={loginData.email}
                        />
                    </div>
                    
                    {/* Password */}
                    <div className='flex flex-col gap-2 relative' data-aos="fade-right" data-aos-delay="400">
                        <label htmlFor='password' className='font-semibold'>Password</label>
                        <input
                            type={passwordVisible ? "text" : "password"} // 👈 toggle type
                            required
                            name='password'
                            id='password'
                            placeholder='Enter password here...'
                            className='bg-gray-800 px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10'
                            onChange={handleUserInput}
                            value={loginData.password}
                        />
                        
                        {/* Eye Button */}
                        <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute right-3 top-11 text-gray-400 hover:text-white"
                        >
                            {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Login Button */}
                    <button 
                        type='submit' 
                        className='mt-3 w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 py-2 text-lg cursor-pointer font-bold transition-all ease-in-out duration-300 rounded-md hover:via-blue-600 hover:to-purple-600' 
                        data-aos="fade-right" data-aos-delay="600"
                    >
                         Login
                    </button>
                    
                    {/* Redirect to signup */}
                    <p className='text-center' data-aos="fade-right" data-aos-delay="800">
                        Do not have an account? <Link to="/signup" className='text-blue-400 hover:underline'>Signup</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}

export default Signup;
