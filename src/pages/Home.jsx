import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalReducer } from "../hooks/useGlobalReducer";
import FavoriteButton from "../components/FavoriteButton";

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
                setPlanets(planetData.results?.slice(1) || []); 
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
            <h1 className="star-wars-title">Star Wars Databank</h1>

            <h2 className="category-title">Characters</h2>
            <div className="grid-container">
                {characters.map(char => (
                    <div key={char.uid} className="grid-item card-container">
                        <img src={getImage("characters", char.uid)} alt={char.name} />
                        <div className="overlay">
                            <h5>{char.name}</h5>
                            <div className="buttons">
                                <Link to={`/character/${char.uid}`} className="btn-dark">View More</Link>
                                <FavoriteButton item={{ uid: char.uid, name: char.name, type: "character" }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="category-title">Planets</h2>
            <div className="grid-container">
                {planets.map(planet => (
                    <div key={planet.uid} className="grid-item card-container">
                        <img src={getImage("planets", planet.uid)} alt={planet.name} />
                        <div className="overlay">
                            <h5>{planet.name}</h5>
                            <div className="buttons">
                                <Link to={`/planet/${planet.uid}`} className="btn-dark">View More</Link>
                                <FavoriteButton item={{ uid: planet.uid, name: planet.name, type: "planet" }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="category-title">Vehicles</h2>
            <div className="grid-container">
                {vehicles.map(vehicle => (
                    <div key={vehicle.uid} className="grid-item card-container">
                        <img src={getImage("vehicles", vehicle.uid)} alt={vehicle.name} />
                        <div className="overlay">
                            <h5>{vehicle.name}</h5>
                            <div className="buttons">
                                <Link to={`/vehicle/${vehicle.uid}`} className="btn-dark">View More</Link>
                                <FavoriteButton item={{ uid: vehicle.uid, name: vehicle.name, type: "vehicle" }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
