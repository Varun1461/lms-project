  import { useDispatch, useSelector } from "react-redux";
  import { useEffect } from "react";
  import { getAllCourses } from "../../Redux/Slices/courseSlice";
  import HomeLayout from "../../Layouts/HomeLayout";
  import CourseCard from "../../components/CourseCard"; // Import CourseCard

  function CourseList() {
    const dispatch = useDispatch();
    const { courseData } = useSelector((state) => state.course);

    useEffect(() => {
      dispatch(getAllCourses()); // Fetch courses on component mount
    }, [dispatch]);

    return (
      <HomeLayout>
        <div className="min-h-[90vh] pt-12 flex flex-col items-center gap-8 text-white px-6">
          <h1 className="text-center text-2xl font-semibold">
            Explore the courses made by{" "}
            <span className="font-bold text-yellow-500">Industry Experts</span>
          </h1>
          
          {/* Courses in a Responsive Grid (3 in a Row) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-[1200px]">
            {courseData?.length > 0 ? (
              courseData.map((element) => (
                <div
                  key={element._id}
                  className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700 hover:shadow-2xl transition-all"
                >
                  <CourseCard data={element} />
                </div>
              ))
            ) : (
              <p className="text-lg text-gray-300 text-center col-span-3">
                No courses available
              </p>
            )}
          </div>
        </div>
      </HomeLayout>
    );
  }

  export default CourseList;
