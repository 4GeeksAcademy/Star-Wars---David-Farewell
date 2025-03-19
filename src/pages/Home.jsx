import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

    return (
        <div className="container text-center mt-5">
            <h1 className="star-wars-title">Star Wars Databank</h1>
            
            {loading ? <p className="loading-text">Loading...</p> : (
                <>
                    {/* 🔹 Sección de Personajes */}
                    <h2 className="category-title">Characters</h2>
                    <div className="row">
                        {characters.map(char => (
                            <div key={char.uid} className="col-md-3 mb-4">
                                <div className="card">
                                    <img 
                                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/characters/${char.uid}.jpg`} 
                                        className="card-img-top" 
                                        alt={char.name} 
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{char.name}</h5>
                                        <Link to={`/character/${char.uid}`} className="btn btn-dark">
                                            View More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 🔹 Sección de Planetas */}
                    <h2 className="category-title">Planets</h2>
                    <div className="row">
                        {planets.map(planet => (
                            <div key={planet.uid} className="col-md-3 mb-4">
                                <div className="card">
                                    <img 
                                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/planets/${planet.uid}.jpg`} 
                                        className="card-img-top" 
                                        alt={planet.name} 
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{planet.name}</h5>
                                        <Link to={`/planet/${planet.uid}`} className="btn btn-dark">
                                            View More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 🔹 Sección de Vehículos */}
                    <h2 className="category-title">Vehicles</h2>
                    <div className="row">
                        {vehicles.map(vehicle => (
                            <div key={vehicle.uid} className="col-md-3 mb-4">
                                <div className="card">
                                    <img 
                                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/vehicles/${vehicle.uid}.jpg`} 
                                        className="card-img-top" 
                                        alt={vehicle.name} 
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{vehicle.name}</h5>
                                        <Link to={`/vehicle/${vehicle.uid}`} className="btn btn-dark">
                                            View More
                                        </Link>
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
