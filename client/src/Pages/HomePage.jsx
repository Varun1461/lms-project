import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; 
import { Link } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import HomePageImage from "../Assets/images/HomePageMainImage.png";
import Background from "../Assets/images/background.png"; // Import background image

function HomePage() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: false }); 
    }, []);

    return (
        <HomeLayout>
            {/* Background Image Wrapper */}
            <div 
                className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center"
                style={{ backgroundImage: `url(${Background})` }} // Set Background Image
            >
                {/* Overlay for better readability */}
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>

                {/* Content Wrapper */}
                <div 
                    className="relative text-white flex flex-col md:flex-row items-center justify-center gap-10 mx-4 md:mx-16 py-20" // Increased top padding
                    data-aos="fade-up"
                >
                    {/* Text Section */}
                    <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
                        <h1 className="text-3xl md:text-5xl font-semibold" data-aos="fade-right">
                            Find out best
                            <span className="text-yellow-500 font-bold ml-2">
                                Online Courses
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200" data-aos="fade-left">
                            We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4" data-aos="zoom-in">
                            <Link to="/courses">
                                <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer 
                                hover:bg-yellow-600 hover:scale-105 hover:shadow-lg transition-all ease-in-out duration-300">
                                    Explore Courses
                                </button>
                            </Link>

                            <Link to="/contact">
                                <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer 
                                hover:bg-yellow-600 hover:text-white hover:scale-105 hover:shadow-lg transition-all ease-in-out duration-300">
                                    Contact Us
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="w-full md:w-1/2 flex items-center justify-center">
                        <img 
                            alt="homepage image" 
                            src={HomePageImage} 
                            className="w-full h-auto max-w-xs md:max-w-full" 
                            data-aos="fade-up"
                        />
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default HomePage;
