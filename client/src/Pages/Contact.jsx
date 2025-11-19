import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import HomeLayout from "../Layouts/HomeLayout";
import Background from "../Assets/images/background.png"; // Import background image
import toast from "react-hot-toast";
import { isEmail } from "../Helpers/regexMatcher";
import axiosInstance from "../Helpers/axiosinstance";

function Contact() {
    useEffect(() => {
        AOS.init({ duration: 800, once: false, delay: 200 }); // AOS settings
    }, []);

    // ✅ Fixed: useState instead of userState
    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: "",
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        console.log(name, value);
        setUserInput({
            ...userInput,
            [name]: value
        });
    }

   async function onFormSubmit(e) {
    e.preventDefault();

    if (!userInput.email || !userInput.name || !userInput.message) {
        toast.error("All fields are mandatory");
        return;
    }

    if (!isEmail(userInput.email)) {
        toast.error("Invalid email");
        return;
    }

    try {
        const responsePromise = axiosInstance.post("/contact", userInput);

        toast.promise(responsePromise, {
            loading: "Submitting your message",
            success: "Form submitted successfully",
            error: "Failed to submit the form"
        });

        const contactResponse = await responsePromise;

        if (contactResponse?.data?.success) {
            setUserInput({
                name: "",
                email: "",
                message: "",
            });
        }
    } catch (error) {
        toast.error("Operation failed...");
    }
}

    return (
        <HomeLayout>
            <div
                className="flex items-center justify-center h-[100vh] bg-cover bg-center bg-no-repeat min-h-screen"
                style={{ backgroundImage: `url(${Background})` }} // Set Background Image
            >
                <form
                    noValidate
                    onSubmit={onFormSubmit}
                    className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg border border-purple-900 
                    bg-black/40 backdrop-blur-lg shadow-md shadow-purple-600 w-[24rem]"
                    data-aos="fade-right"
                    data-aos-delay="200"
                >
                    {/* Contact Form Heading */}
                    <h1
                        className="text-3xl font-semibold text-white"
                        data-aos="fade-right"
                        data-aos-delay="300"
                    >
                        Contact Form
                    </h1>

                    {/* Name Field */}
                    <div
                        className="flex flex-col w-full gap-2"
                        data-aos="fade-right"
                        data-aos-delay="400"
                    >
                        <label
                            className="text-lg font-medium text-white"
                            htmlFor="name"
                            data-aos="fade-right"
                            data-aos-delay="450"
                        >
                            Name
                        </label>
                        <input
                            className="bg-black/30 border border-purple-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-white"
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            data-aos="fade-right"
                            data-aos-delay="500"
                            onChange={handleInputChange}
                            value={userInput.name}
                        />
                    </div>

                    {/* Email Field */}
                    <div
                        className="flex flex-col w-full gap-2"
                        data-aos="fade-right"
                        data-aos-delay="600"
                    >
                        <label
                            className="text-lg font-medium text-white"
                            htmlFor="email"
                            data-aos="fade-right"
                            data-aos-delay="650"
                        >
                            Email
                        </label>
                        <input
                            className="bg-black/30 border border-purple-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-white"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            data-aos="fade-right"
                            data-aos-delay="700"
                            onChange={handleInputChange}
                            value={userInput.email}

                        />
                    </div>

                    {/* Message Field */}
                    <div
                        className="flex flex-col w-full gap-2"
                        data-aos="fade-right"
                        data-aos-delay="800"
                    >
                        <label
                            className="text-lg font-medium text-white"
                            htmlFor="message"
                            data-aos="fade-right"
                            data-aos-delay="850"
                        >
                            Message
                        </label>
                        <textarea
                            className="bg-black/30 border border-purple-500 px-3 py-2 rounded-md resize-none h-32 focus:outline-none focus:ring-2 focus:ring-purple-400 text-white"
                            name="message"
                            id="message"
                            placeholder="Enter your message"
                            data-aos="fade-right"
                            data-aos-delay="900"
                            onChange={handleInputChange}
                            value={userInput.message}

                        ></textarea>
                    </div>

                    
                    <button
                        className="w-full bg-purple-900 rounded-md py-2 font-semibold text-lg text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:to-purple-600  "
                        type="submit"
                        data-aos="fade-right"
                        data-aos-delay="1000"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default Contact;
