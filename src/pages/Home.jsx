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
        Promise.all([
            fetch("https://www.swapi.tech/api/people").then(res => res.json()),
            fetch("https://www.swapi.tech/api/planets").then(res => res.json()),
            fetch("https://www.swapi.tech/api/vehicles").then(res => res.json())
        ]).then(([charData, planetData, vehicleData]) => {
            setCharacters(charData.results || []);
            setPlanets(planetData.results || []);
            setVehicles(vehicleData.results || []);
            setLoading(false);
        }).catch(error => console.error("Error fetching data:", error));
    }, []);

    const getImage = (category, id) =>
        `https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/${category}/${id}.jpg`;

    return (
        <div className="container text-center mt-5">
            <h1 className="star-wars-title">Star Wars Databank</h1>

            {loading ? <p className="loading-text">Loading...</p> : (
                <>
                    {/* Sección de Personajes */}
                    <h2 className="category-title">Characters</h2>
                    <div className="grid-container">
                        {characters.map(char => (
                            <div key={char.uid} className="grid-item">
                                <div className="card-container">
                                    <img 
                                        src={getImage("characters", char.uid)}
                                        onError={(e) => e.target.style.display = "none"}
                                        alt={char.name}
                                    />
                                    <div className="overlay">
                                        <h5>{char.name}</h5>
                                        <div className="buttons">
                                            <Link to={`/character/${char.uid}`} className="btn-dark">View More</Link>
                                            <FavoriteButton item={{ ...char, type: "character" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sección de Planetas */}
                    <h2 className="category-title">Planets</h2>
                    <div className="grid-container">
                        {planets.map(planet => (
                            <div key={planet.uid} className="grid-item">
                                <div className="card-container">
                                    <img 
                                        src={getImage("planets", planet.uid)}
                                        onError={(e) => e.target.style.display = "none"}
                                        alt={planet.name}
                                    />
                                    <div className="overlay">
                                        <h5>{planet.name}</h5>
                                        <div className="buttons">
                                            <Link to={`/planet/${planet.uid}`} className="btn-dark">View More</Link>
                                            <FavoriteButton item={{ ...planet, type: "planet" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sección de Vehículos */}
                    <h2 className="category-title">Vehicles</h2>
                    <div className="grid-container">
                        {vehicles.map(vehicle => (
                            <div key={vehicle.uid} className="grid-item">
                                <div className="card-container">
                                    <img 
                                        src={getImage("vehicles", vehicle.uid)}
                                        onError={(e) => e.target.style.display = "none"}
                                        alt={vehicle.name}
                                    />
                                    <div className="overlay">
                                        <h5>{vehicle.name}</h5>
                                        <div className="buttons">
                                            <Link to={`/vehicle/${vehicle.uid}`} className="btn-dark">View More</Link>
                                            <FavoriteButton item={{ ...vehicle, type: "vehicle" }} />
                                        </div>
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
