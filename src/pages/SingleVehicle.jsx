import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
            .catch((error) => console.error("Error fetching vehicle:", error));
    }, [id]);

    return (
        <div className="container text-center mt-5">
            {loading ? <p>Loading...</p> : vehicle && (
                <div className="vehicle-container">
                    <img 
                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/vehicles/${id}.jpg`} 
                        alt={vehicle.name} 
                        className="vehicle-image"
                    />
                    <div className="vehicle-stats">
                        <h1>{vehicle.name}</h1>
                        <p><strong>Model:</strong> {vehicle.model}</p>
                        <p><strong>Manufacturer:</strong> {vehicle.manufacturer}</p>
                        <p><strong>Cost in Credits:</strong> {vehicle.cost_in_credits}</p>
                        <Link to="/" className="back-button">⬅ Back to Home</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleVehicle;
