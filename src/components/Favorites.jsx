import { useGlobalReducer } from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import { useState } from "react";

const Favorites = () => {
    const { store, dispatch } = useGlobalReducer();
    const [isOpen, setIsOpen] = useState(false);

    const removeFavorite = (item) => {
        dispatch({ type: "REMOVE_FAVORITE", payload: item });
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
