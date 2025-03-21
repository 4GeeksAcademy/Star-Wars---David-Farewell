import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = ({ items, category }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            spaceBetween={20}
            slidesPerView={3} 
            breakpoints={{
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1440: { slidesPerView: 5 }
            }}
            className="carousel-container"
        >
            {items.map((item) => (
                <SwiperSlide key={item.uid}>
                    <div className="card">
                        <img 
                            src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/${category}/${item.uid}.jpg`} 
                            className="card-img-top" 
                            alt={item.name} 
                        />
                        <div className="card-body text-center">
                            <h5 className="card-title">{item.name}</h5>
                            <a href={`/${category}/${item.uid}`} className="btn btn-dark">
                                View More
                            </a>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Carousel;