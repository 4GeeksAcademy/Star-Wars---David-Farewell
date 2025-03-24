import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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
      .catch((err) => console.error(err));
  }, [id]);

  const getImage = (id) =>
    `https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/planets/${id}.jpg`;

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
        alt={planet.name}
        className="detail-image"
      />
      <div className="detail-info">
        <h1>{planet.name}</h1>
        <p><strong>Climate:</strong> {planet.climate}</p>
        <p><strong>Diameter:</strong> {planet.diameter} km</p>
        <p><strong>Gravity:</strong> {planet.gravity}</p>
        <p><strong>Population:</strong> {planet.population}</p>
        <p><strong>Terrain:</strong> {planet.terrain}</p>
        <Link to="/" className="back-button">← Back to Home</Link>
      </div>
    </div>
  );
};

export default SinglePlanet;
