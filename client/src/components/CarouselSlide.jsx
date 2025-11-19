function CarouselSlide ({image, title, description, slideNumber, totalSlides}){
    return (
        <div id={'slide${slideNumber}'} className="carousel-item relative w-full">
                    <div className="flex flex-col items-center justify-center gap-4 px-5 md:px-10 lg:px-16">
                      <img
                        className="w-20 md:w-32 lg:w-40 rounded-full border-2 border-gray-400"
                        src={image}
                        alt="Nelson Mandela"
                      />
                      <p className="text-center text-sm md:text-base lg:text-xl text-gray-200">
                      {description}
                      </p>
                      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">{title}</h3>
                    
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                      <a href={'#slide${(slideNumber = 1 ? totalSlides : (slideNumber -1))}'} className="btn btn-circle">❮</a>
                      <a href={'#slide${(slideNumber) % totalSlides + 1}'} className="btn btn-circle">❯</a>
                    </div>
                  </div>
                  </div>
    )

}

export default CarouselSlide;