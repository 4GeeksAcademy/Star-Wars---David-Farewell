import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch personajes
        fetch("https://akabab.github.io/starwars-api/api/all.json")
            .then((res) => res.json())
            .then((data) => {
                setCharacters(data);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching characters:", error));

        // Fetch planetas
        fetch("https://swapi.dev/api/planets/")
            .then((res) => res.json())
            .then((data) => {
                setPlanets(data.results);
            })
            .catch((error) => console.error("Error fetching planets:", error));

    }, []);

    return (
        <div className="container">
            <h1 className="text-center mt-5">Star Wars Databank</h1>

            {/* Personajes */}
            <h2 className="mt-4">Characters</h2>
            {loading ? <p>Loading...</p> : (
                <div className="row">
                    {characters.map((char) => (
                        <div key={char.id} className="col-md-3 mb-4">
                            <div className="card shadow">
                                <div className="image-container">
                                    <img 
                                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/characters/${char.id}.jpg`}
                                        alt={char.name}
                                        className="card-img-top"
                                    />
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title">{char.name}</h5>
                                    <p className="text-muted">{char.affiliation || "Unknown Affiliation"}</p>
                                    <Link to={`/character/${char.id}`} className="btn btn-dark">
                                        View More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Planetas */}
            <h2 className="mt-4">Planets</h2>
            {loading ? <p>Loading...</p> : (
                <div className="row">
                    {planets.map((planet, index) => (
                        <div key={index} className="col-md-3 mb-4">
                            <div className="card shadow">
                                <div className="image-container">
                                    <img 
                                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/planets/${index + 1}.jpg`}
                                        alt={planet.name}
                                        className="card-img-top"
                                    />
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title">{planet.name}</h5>
                                    <p className="text-muted">Climate: {planet.climate}</p>
                                    <Link to={`/planet/${index + 1}`} className="btn btn-dark">
                                        View More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
