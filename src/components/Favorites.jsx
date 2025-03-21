import { useGlobalReducer } from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Favorites = () => {
    const { store, dispatch } = useGlobalReducer();
    const [isOpen, setIsOpen] = useState(false);

    // Cargar favoritos desde localStorage al iniciar
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        dispatch({ type: "SET_FAVORITES", payload: storedFavorites });
    }, [dispatch]);

    const removeFavorite = (item) => {
        const updatedFavorites = store.favorites.filter(fav => fav.uid !== item.uid);
        dispatch({ type: "REMOVE_FAVORITE", payload: item });

        // LkocalStorage
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div className="favorites-dropdown">
            <button className="btn btn-warning" onClick={() => setIsOpen(!isOpen)}>
                Favorites ({store.favorites.length}) ▼
            </button>
            {isOpen && (
                <div className="favorites-list">
                    <ul>
                        {store.favorites.length === 0 ? (
                            <li>No favorites yet</li>
                        ) : (
                            store.favorites.map(fav => (
                                <li key={fav.uid}>
                                    <Link to={`/${fav.type}/${fav.uid}`}>{fav.name}</Link>
                                    <button onClick={() => removeFavorite(fav)}>❌</button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Favorites;
