import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { createNewCourse } from "../../Redux/Slices/courseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { toast } from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css";
import Background from "../../Assets/images/background.png"; 

function CreateCourse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: ""
    });

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    function handleImageUpload(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if (uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setUserInput((prevState) => ({
                    ...prevState,
                    previewImage: this.result,
                    thumbnail: uploadedImage,
                }));
            });
        }
    }

    function handleUserInput(e) {
        const { name, value } = e.target;
        setUserInput((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (
            !userInput.title ||
            !userInput.category ||
            !userInput.createdBy ||
            !userInput.description ||
            !userInput.thumbnail
        ) {
            toast.error("All fields are mandatory");
            return;
        }

        const formData = new FormData();
        formData.append("title", userInput.title);
        formData.append("category", userInput.category);
        formData.append("createdBy", userInput.createdBy);
        formData.append("description", userInput.description);
        formData.append("thumbnail", userInput.thumbnail);

        const response = await dispatch(createNewCourse(formData));

        if (response?.payload?.success) {
            toast.success("Course created successfully!");
            setUserInput({
                title: "",
                category: "",
                createdBy: "",
                description: "",
                thumbnail: null,
                previewImage: "",
            });
            navigate("/courses");
        }
    }

    return (
        <HomeLayout>
            <div
                className="flex items-center justify-center min-h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${Background})` }}
            >
                <form
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center gap-5 rounded-lg p-8 text-white w-[700px] h-auto my-10 border border-gray-500 bg-opacity-10 bg-black/50 backdrop-blur-lg shadow-2xl relative"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <Link
                        to={"/admin/dashboard"}
                        className="absolute top-6 left-6 text-2xl text-accent cursor-pointer hover:scale-110 transition-transform"
                        data-aos="fade-right"
                        data-aos-delay="200"
                    >
                        <AiOutlineArrowLeft />
                    </Link>

                    <h1
                        className="text-center text-3xl font-bold text-w"
                        data-aos="fade-right"
                        data-aos-delay="300"
                    >
                        Create Course
                    </h1>

                    <main className="grid grid-cols-2 gap-x-10">
                        <div className="space-y-6">
                            <div data-aos="fade-right" data-aos-delay="400">
                                <label className="cursor-pointer" htmlFor="image_uploads">
                                    {userInput.previewImage ? (
                                        <img
                                            className="w-full h-44 m-auto border border-gray-500 rounded-lg shadow-lg"
                                            src={userInput.previewImage}
                                            alt="preview image"
                                        />
                                    ) : (
                                        <div className="w-full h-44 m-auto flex items-center justify-center border border-gray-500 rounded-lg bg-black/30 backdrop-blur-md">
                                            <h1 className="font-bold text-lg text-gray-300">
                                                Upload your course thumbnail
                                            </h1>
                                        </div>
                                    )}
                                </label>
                                <input
                                    type="file"
                                    id="image_uploads"
                                    accept=".jpg, .jpeg, .png"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                            </div>

                            <div className="flex flex-col gap-2" data-aos="fade-right" data-aos-delay="500">
                                <label className="text-lg font-semibold text-blue-400" htmlFor="title">
                                    Course Title
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Enter the course title"
                                    className="bg-transparent px-3 py-2 border border-gray-500 placeholder-gray-400 rounded-md focus:ring-2 focus:ring-yellow-500 transition-all"
                                    value={userInput.title}
                                    onChange={handleUserInput}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-2" data-aos="fade-right" data-aos-delay="600">
                                <label className="text-lg font-semibold text-blue-400" htmlFor="createdBy">
                                    Instructor Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="createdBy"
                                    id="createdBy"
                                    placeholder="Enter the instructor name"
                                    className="bg-transparent px-3 py-2 border border-gray-500 placeholder-gray-400 rounded-md focus:ring-2 focus:ring-yellow-500 transition-all"
                                    value={userInput.createdBy}
                                    onChange={handleUserInput}
                                />
                            </div>

                            <div className="flex flex-col gap-2" data-aos="fade-right" data-aos-delay="700">
                                <label className="text-lg font-semibold text-blue-400" htmlFor="category">
                                    Course Category
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="category"
                                    id="category"
                                    placeholder="Enter the category name"
                                    className="bg-transparent px-3 py-2 border border-gray-500 placeholder-gray-400 rounded-md focus:ring-2 focus:ring-yellow-500 transition-all"
                                    value={userInput.category}
                                    onChange={handleUserInput}
                                />
                            </div>

                            <div className="flex flex-col gap-2" data-aos="fade-right" data-aos-delay="800">
                                <label className="text-lg font-semibold text-blue-400" htmlFor="description">
                                    Course Description
                                </label>
                                <textarea
                                    required
                                    name="description"
                                    id="description"
                                    placeholder="Enter the course description"
                                    className="bg-transparent px-3 py-2 border border-gray-500 placeholder-gray-400 rounded-md h-24 overflow-y-scroll resize-none focus:ring-2 focus:ring-yellow-500 transition-all"
                                    value={userInput.description}
                                    onChange={handleUserInput}
                                />
                            </div>
                        </div>
                    </main>

                    <button
                        className="w-full bg-purple-900 rounded-md py-2 font-semibold text-lg text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:to-purple-600"
                        type="submit"
                        data-aos="fade-up"
                        data-aos-delay="900"
                    >
                        Create Course
                        </button>
                        </form></div> </HomeLayout>

    );

}



export default CreateCourse;