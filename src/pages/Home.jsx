import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://akabab.github.io/starwars-api/api/all.json")
            .then((res) => res.json())
            .then((data) => {
                setCharacters(data);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching characters:", error));
    }, []);

    return (
        <div className="container">
            <h1 className="text-center mt-5">Star Wars Databank</h1>
            {loading ? <p>Loading...</p> : (
                <div className="row">
                    {characters.map((char) => (
                        <div key={char.id} className="col-md-3 mb-4">
                            <div className="card shadow">
                                <img src={char.image} alt={char.name} className="card-img-top" />
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
        </div>
    );
};

export default Home;
