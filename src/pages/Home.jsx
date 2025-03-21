import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalReducer } from "../hooks/useGlobalReducer";
import FavoriteButton from "../components/FavoriteButton";

// Importar Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Importar estilos de Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
    const { store } = useGlobalReducer();
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);

            Promise.all([
                fetch("https://www.swapi.tech/api/people").then(res => res.json()),
                fetch("https://www.swapi.tech/api/planets").then(res => res.json()),
                fetch("https://www.swapi.tech/api/vehicles").then(res => res.json())
            ])
            .then(([charData, planetData, vehicleData]) => {
                setCharacters(charData.results || []);
                setPlanets(planetData.results?.slice(1) || []); // Salta el primer planeta
                setVehicles(vehicleData.results || []);
                setLoading(false);
            })
            .catch(error => console.error("Error fetching data:", error));
        };

        fetchData();
    }, []);

    const getImage = (category, id) =>
        `https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/${category}/${id}.jpg`;

    return (
        <div className="container">

            {/* Characters */}
            <h2 className="category-title">Characters</h2>
            <Swiper
                spaceBetween={20}
                slidesPerView={3}
                navigation
                loop={true}
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                className="swiper"
            >
                {characters.map(char => (
                    <SwiperSlide key={char.uid} className="swiper-slide">
                        <img src={getImage("characters", char.uid)} alt={char.name} />
                        <div className="overlay">
                            <h5>{char.name}</h5>
                            <div className="buttons">
                                <Link to={`/character/${char.uid}`} className="btn-dark">View More</Link>
                                <FavoriteButton item={{ uid: char.uid, name: char.name, type: "character" }} />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Planets */}
            <h2 className="category-title">Planets</h2>
            <Swiper
                spaceBetween={20}
                slidesPerView={3}
                navigation
                loop={true}
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                className="swiper"
            >
                {planets.map(planet => (
                    <SwiperSlide key={planet.uid} className="swiper-slide">
                        <img src={getImage("planets", planet.uid)} alt={planet.name} />
                        <div className="overlay">
                            <h5>{planet.name}</h5>
                            <div className="buttons">
                                <Link to={`/planet/${planet.uid}`} className="btn-dark">View More</Link>
                                <FavoriteButton item={{ uid: planet.uid, name: planet.name, type: "planet" }} />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Vehicles */}
            <h2 className="category-title">Vehicles</h2>
            <Swiper
                spaceBetween={20}
                slidesPerView={3}
                navigation
                loop={true}
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                className="swiper"
            >
                {vehicles.map(vehicle => (
                    <SwiperSlide key={vehicle.uid} className="swiper-slide">
                        <img src={getImage("vehicles", vehicle.uid)} alt={vehicle.name} />
                        <div className="overlay">
                            <h5>{vehicle.name}</h5>
                            <div className="buttons">
                                <Link to={`/vehicle/${vehicle.uid}`} className="btn-dark">View More</Link>
                                <FavoriteButton item={{ uid: vehicle.uid, name: vehicle.name, type: "vehicle" }} />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Home;
