import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice"
import HomeLayout from "../../Layouts/HomeLayout";


function AddLecture() {


    const courseDetails = useLocation().state;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        id: courseDetails?._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
        category: courseDetails?.category || "", // assuming from courseDetails
    createBy: courseDetails?.createdBy || "", // assuming from courseDetails
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserInput({ ...userInput, [name]: value });
    };

    function handleVideo(e) {
        const video = e.target.files[0];
        const source = window.URL.createObjectURL(video);
        setUserInput({ ...userInput, videoSrc: source, lecture: video });
    };

    async function onFormSubmit(e) {
        e.preventDefault();
    
        const { title, description, lecture, category, createBy, id } = userInput;
    
        if (!lecture || !title || !description || !category || !createBy) {
            toast.error("All fields are mandatory");
            return;
        }
    
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("createBy", createBy);
        formData.append("lecture", lecture);
    
        const resPromise = dispatch(addCourseLecture({ id, formData }));
    
        toast.promise(resPromise, {
            loading: "Uploading lecture...",
            success: "Lecture added successfully",
            error: "Failed to upload lecture"
        });
    
        const res = await resPromise;
    
        if (res?.payload?.success) {
            navigate(-1);
            setUserInput({ ...userInput, title: "", description: "", lecture: undefined, videoSrc: "" });
        }
    }
    
    
        

    useEffect(() => {
        if (!courseDetails) {
            navigate("/courses");
        }
    }, []);


    return (
        <HomeLayout>
            <div className=" text-white flex flex-col items-center justify-center gap-10 mx-16 min-h-[90vh]">
                <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
                    <header className="flex items-center justify-center relative">
                        <button
                            onClick={() => navigate(-1)}
                            className="absolute left-2 text-xl text-green-500"
                        >
                            <AiOutlineArrowLeft />
                        </button>
                        <h1 className="text-xl text-yellow-500 font-semibold">
                            Add your new lecture
                        </h1>
                    </header>
                    <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
                        <input
                            type="text"
                            name="title"
                            value={userInput.title}
                            onChange={handleInputChange}
                            placeholder="Enter the title for lecture"
                            className="bg-transparent px-3 py-1 border"
                        />

                        <textarea
                            name="description"
                            value={userInput.description}
                            onChange={handleInputChange}
                            placeholder="Enter the description for lecture"
                            className="resize-none overflow-y-scroll h-24 bg-transparent px-3 py-1 border"
                        />
                        {userInput.videoSrc ? (
                            <video
                                src={userInput.videoSrc}
                                muted
                                controls
                                controlsList="nodownload nofullscreen"
                                disablePictureInPicture
                                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                            ></video>
                        ) : (
                            <div className="h-48 border flex items-center justify-center cursor-pointer">
                                <label
                                    htmlFor="lecture"
                                    className="font-semibold text-xl cursor-pointer"
                                >
                                    Choose your video
                                </label>
                                <input
                                    type="file"
                                    name="lecture"
                                    id="lecture"
                                    onChange={handleVideo}
                                    accept="video/mp4,video/x-m4v,video/*"
                                    className="hidden"
                                />
                            </div>
                        )}

                        <button type="submit"
                        className="bg-purple-600 hover:bg-purple-700 text-white py-1 font-semibold text-lg rounded">
                            Add Lecture
                        </button>

                    </form>
                </div>
            </div>


        </HomeLayout>
    )
}

export default AddLecture;