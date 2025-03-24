import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const SingleVehicle = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/vehicles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setVehicle(data.result.properties);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const getImage = (id) =>
    `https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/vehicles/${id}.jpg`;

  if (loading) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="card-detail">
      <img
        src={getImage(id)}
        alt={vehicle.name}
        className="detail-image"
      />
      <div className="detail-info">
        <h1>{vehicle.name}</h1>
        <p><strong>Model:</strong> {vehicle.model}</p>
        <p><strong>Manufacturer:</strong> {vehicle.manufacturer}</p>
        <p><strong>Cost in credits:</strong> {vehicle.cost_in_credits}</p>
        <p><strong>Max Speed:</strong> {vehicle.max_atmosphering_speed}</p>
        <p><strong>Crew:</strong> {vehicle.crew}</p>
        <Link to="/" className="back-button">← Back to Home</Link>
      </div>
    </div>
  );
};

export default SingleVehicle;
