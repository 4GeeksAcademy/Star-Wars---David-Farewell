import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const SingleCharacter = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/people/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setCharacter(data.result.properties);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching character:", error));
    }, [id]);

    return (
        <div className="container text-center mt-5">
            {loading ? <p>Loading...</p> : character && (
                <div className="character-container">
                    <img 
                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/characters/${id}.jpg`} 
                        onError={(e) => e.target.style.display = "none"}
                        alt={character.name} 
                        className="character-image"
                    />
                    <div className="character-stats">
                        <h1>{character.name}</h1>
                        <p><strong>Birth Year:</strong> {character.birth_year}</p>
                        <p><strong>Height:</strong> {character.height} cm</p>
                        <p><strong>Mass:</strong> {character.mass} kg</p>
                        <p><strong>Gender:</strong> {character.gender}</p>
                        <Link to="/" className="back-button">⬅ Back to Home</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleCharacter;
