import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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
      .catch((err) => console.error(err));
  }, [id]);

  const getImage = (id) =>
    `https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/characters/${id}.jpg`;

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="card-detail">
      <img
        src={getImage(id)}
        alt={character.name}
        className="detail-image"
      />
      <div className="detail-info">
        <h1>{character.name}</h1>
        <p><strong>Birth Year:</strong> {character.birth_year}</p>
        <p><strong>Height:</strong> {character.height} cm</p>
        <p><strong>Mass:</strong> {character.mass} kg</p>
        <p><strong>Gender:</strong> {character.gender}</p>
        <Link to="/" className="back-button">← Back to Home</Link>
      </div>
    </div>
  );
};

export default SingleCharacter;
