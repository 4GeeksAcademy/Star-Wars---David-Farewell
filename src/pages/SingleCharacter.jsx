import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const SingleCharacter = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://akabab.github.io/starwars-api/api/id/${id}.json`)
            .then((res) => res.json())
            .then((data) => {
                setCharacter(data);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching character:", error));
    }, [id]);

    return (
        <div className="container text-center mt-5">
            {loading ? <p>Loading...</p> : character && (
                <>
                    <h1>{character.name}</h1>
                    <img src={character.image} alt={character.name} className="img-fluid rounded" />
                    <p className="mt-3">{character.affiliation || "Unknown Affiliation"}</p>
                    <Link to="/" className="btn btn-dark mt-3">Back to Home</Link>
                </>
            )}
        </div>
    );
};

export default SingleCharacter;
