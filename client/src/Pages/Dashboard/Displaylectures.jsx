import HomeLayout from "../../Layouts/HomeLayout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getCourseLectures, deleteCourseLecture } from "../../Redux/Slices/LectureSlice";


function Displaylectures() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation(); // Extracting course details from the location state
    const { lectures } = useSelector((state) => state.lecture); // Extracting lectures from Redux state
    const { role } = useSelector((state) => state.auth); // Extracting role from Redux state

    const [currentVideo, setCurrentVideo] = useState(0);
    
    async function onLectureDelete(courseId, lectureId) {
        await dispatch(deleteCourseLecture({ courseId: courseId, lectureId: lectureId })); // Dispatching action to delete the lecture
        await dispatch(getCourseLectures(courseId)); // Fetch updated lectures after deletion
    }
    useEffect(() => {
        if (!state) {
          navigate("/courses");
        } else {
          dispatch(getCourseLectures(state._id));
        }
      }, [state, dispatch, navigate]);

      useEffect(() => {
      }, [lectures]); 
      

    return (
        <HomeLayout>
            <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
                <h1 className="text-center text-2xl font-semibold text-yellow-500">
                    Course Name : {state?.title}
                </h1>

                    <div className="flex justify-center gap-10 w-full">
                        {/* Left Section: Video Player */}
                        <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                            <video
                                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                                src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                                controls
                                disablePictureInPicture
                                muted
                                controlsList="nodownload"
                            ></video>
                            <div>
                                <h1>
                                    <span className="text-yellow-500">Title :{" "} </span>
                                    {lectures && lectures[currentVideo]?.title}
                                </h1>
                                <p>
                                    <span className="text-yellow-500 line-clamp-4">Description :{" "} </span>
                                    {lectures && lectures[currentVideo]?.description}
                                </p>
                            </div>
                        </div>

                        {/* Right Section: Lectures List */}
                        <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
                            <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                                <p>Lectures List</p>
                                {role === "ADMIN" && (
                                    <button
                                        onClick={() =>
                                            navigate("/course/addlecture", {
                                                state: { ...state },
                                            })
                                        }
                                        className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded-md font-semibold text-sm"
                                    >
                                        Add New Lecture
                                    </button>
                                )}
                            </li>
                            {lectures && lectures.map((lecture, idx) => {
                                return (
                                    <li className="space-y-2" key={lecture._id}>
                                        <p
                                            className="cursor-pointer"
                                            onClick={() => setCurrentVideo(idx)}
                                        >
                                            <span className="text-yellow-500">
                                            {" "} Lecture {idx + 1} :{" "}
                                            </span>
                                            {lecture?.title}
                                        </p>
                                        {role === "ADMIN" && (
                                            <button
                                                onClick={() => onLectureDelete(state?._id, lecture?._id)}
                                                className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded-md font-semibold text-sm"
                                            >
                                                Delete Lecture
                                            </button>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                
            </div>
        </HomeLayout>
    );
}

export default Displaylectures;