import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const SinglePlanet = () => {
    const { id } = useParams();
    const [planet, setPlanet] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/planets/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPlanet(data.result.properties);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching planet:", error));
    }, [id]);

    return (
        <div className="container text-center mt-5">
            {loading ? <p>Loading...</p> : planet && (
                <>
                    <h1>{planet.name}</h1>
                    <img 
                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/planets/${id}.jpg`} 
                        alt={planet.name} 
                        className="img-fluid rounded"
                    />
                    <p><strong>Climate:</strong> {planet.climate}</p>
                    <p><strong>Terrain:</strong> {planet.terrain}</p>
                    <p><strong>Population:</strong> {planet.population}</p>
                    <Link to="/" className="btn btn-dark mt-3">Back to Home</Link>
                </>
            )}
        </div>
    );
};

export default SinglePlanet;
