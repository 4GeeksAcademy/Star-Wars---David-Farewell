import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton";

const Home = () => {
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        // Llamadas a la API con .then() en vez de async/await
        Promise.all([
            fetch("https://www.swapi.tech/api/people").then(res => res.json()),
            fetch("https://www.swapi.tech/api/planets").then(res => res.json()),
            fetch("https://www.swapi.tech/api/vehicles").then(res => res.json()),
        ])
        .then(([charData, planetData, vehicleData]) => {
            setCharacters(charData.results || []);
            setPlanets(planetData.results || []);
            setVehicles(vehicleData.results || []);
            setLoading(false);
        })
        .catch(error => console.error("Error fetching data:", error));
    }, []);

    // Función para obtener imágenes según la categoría
    const getImage = (category, id) =>
        `https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/${category}/${id}.jpg`;

    return (
        <div className="container text-center mt-5">
            <h1 className="star-wars-title">Star Wars Databank</h1>

            {loading ? (
                <div className="loader-container">
                    <div className="planet-loader"></div>
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                    {/* Characters */}
                    <h2 className="category-title">Characters</h2>
                    <div className="row">
                        {characters.map((char) => (
                            <div key={char.uid} className="col-md-3 mb-4">
                                <div className="card">
                                    <img src={getImage("characters", char.uid)} className="card-img-top" alt={char.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{char.name}</h5>
                                        <Link to={`/character/${char.uid}`} className="btn btn-dark">
                                            View More
                                        </Link>
                                        <FavoriteButton item={{ ...char, type: "character" }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Planets */}
                    <h2 className="category-title">Planets</h2>
                    <div className="row">
                        {planets.map((planet) => (
                            <div key={planet.uid} className="col-md-3 mb-4">
                                <div className="card">
                                    <img src={getImage("planets", planet.uid)} className="card-img-top" alt={planet.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{planet.name}</h5>
                                        <Link to={`/planet/${planet.uid}`} className="btn btn-dark">
                                            View More
                                        </Link>
                                        <FavoriteButton item={{ ...planet, type: "planet" }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Vehicles */}
                    <h2 className="category-title">Vehicles</h2>
                    <div className="row">
                        {vehicles.map((vehicle) => (
                            <div key={vehicle.uid} className="col-md-3 mb-4">
                                <div className="card">
                                    <img src={getImage("vehicles", vehicle.uid)} className="card-img-top" alt={vehicle.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{vehicle.name}</h5>
                                        <Link to={`/vehicle/${vehicle.uid}`} className="btn btn-dark">
                                            View More
                                        </Link>
                                        <FavoriteButton item={{ ...vehicle, type: "vehicle" }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
