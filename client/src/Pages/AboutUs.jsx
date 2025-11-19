import aboutMainImage from "../Assets/Images/aboutMainImage.png";
import apj from "../Assets/Images/apj.png";
import billGates from "../Assets/Images/billGates.png";
import einstein from "../Assets/Images/einstein.png";
import nelsonMandela from "../Assets/Images/nelsonMandela.png";
import steveJobs from "../Assets/Images/steveJobs.png";
import HomeLayout from "../Layouts/HomeLayout";

function AboutUs() {
  return (
    <HomeLayout>
      <div className="px-5 md:px-10 lg:px-20 pt-10 flex flex-col text-white">

        {/* Section 1: About Content */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 mx-auto">
          <section className="w-full lg:w-1/2 space-y-6 lg:space-y-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-yellow-500 font-semibold">
              Affordable and Quality Education
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-gray-200">
              Our goal is to provide affordable and quality education to the world. We are
              providing a platform for aspiring teachers and students to share their
              creativity, skills, and knowledge to empower and contribute to the growth
              and wellness of mankind.
            </p>
          </section>

          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              className="max-w-full h-auto drop-shadow-2xl"
              src={aboutMainImage}
              alt="About Main"
            />
          </div>
        </div>

        {/* Section 2: Carousel */}
        <div className="carousel mx-auto w-full lg:w-3/4 xl:w-1/2 my-16">
          {/* Slide 1 */}
          <div id="slide1" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-5 md:px-10 lg:px-16">
              <img
                className="w-20 md:w-32 lg:w-40 rounded-full border-2 border-gray-400"
                src={nelsonMandela}
                alt="Nelson Mandela"
              />
              <p className="text-center text-sm md:text-base lg:text-xl text-gray-200">
                "Education is the most powerful tool you can use to change the world."
              </p>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">Nelson Mandela</h3>
            
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide5" className="btn btn-circle">❮</a>
              <a href="#slide2" className="btn btn-circle">❯</a>
            </div>
          </div>
          </div>

          {/* Slide 2 */}
          <div id="slide2" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-5 md:px-10 lg:px-16">
              <img
                className="w-20 md:w-32 lg:w-40 rounded-full border-2 border-gray-400"
                src={apj}
                alt="APJ Abdul Kalam"
              />
              <p className="text-center text-sm md:text-base lg:text-xl text-gray-200">
                "Learning gives creativity, creativity leads to thinking, thinking provides
                knowledge, knowledge makes you great."
              </p>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">A. P. J. Abdul Kalam</h3>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle">❮</a>
              <a href="#slide3" className="btn btn-circle">❯</a>
            </div>
          </div>

          {/* Slide 3 */}
          <div id="slide3" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-5 md:px-10 lg:px-16">
              <img
                className="w-20 md:w-32 lg:w-40 rounded-full border-2 border-gray-400"
                src={einstein}
                alt="Albert Einstein"
              />
              <p className="text-center text-sm md:text-base lg:text-xl text-gray-200">
                "Education is not the learning of facts, but the training of the mind to think."
              </p>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">Albert Einstein</h3>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide2" className="btn btn-circle">❮</a>
              <a href="#slide4" className="btn btn-circle">❯</a>
            </div>
          </div>

          {/* Slide 4 */}
          <div id="slide4" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-5 md:px-10 lg:px-16">
              <img
                className="w-20 md:w-32 lg:w-40 rounded-full border-2 border-gray-400"
                src={steveJobs}
                alt="Steve Jobs"
              />
              <p className="text-center text-sm md:text-base lg:text-xl text-gray-200">
                "Innovation distinguishes between a leader and a follower."
              </p>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">Steve Jobs</h3>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide3" className="btn btn-circle">❮</a>
              <a href="#slide5" className="btn btn-circle">❯</a>
            </div>
          </div>

          {/* Slide 5 */}
          <div id="slide5" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-5 md:px-10 lg:px-16">
              <img
                className="w-20 md:w-32 lg:w-40 rounded-full border-2 border-gray-400"
                src={billGates}
                alt="Bill Gates"
              />
              <p className="text-center text-sm md:text-base lg:text-xl text-gray-200">
                "Technology is just a tool. In terms of getting the kids working together
                and motivating them, the teacher is the most important."
              </p>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">Bill Gates</h3>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide4" className="btn btn-circle">❮</a>
              <a href="#slide1" className="btn btn-circle">❯</a>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
