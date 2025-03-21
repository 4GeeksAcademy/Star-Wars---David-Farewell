import { useGlobalReducer } from "../hooks/useGlobalReducer";
import { useEffect } from "react";

const FavoriteButton = ({ item }) => {
    const { store, dispatch } = useGlobalReducer();
    const isFavorite = store.favorites.some(fav => fav.uid === item.uid);

    useEffect(() => {
        // LocalStorage 
        localStorage.setItem("favorites", JSON.stringify(store.favorites));
    }, [store.favorites]);

    const toggleFavorite = () => {
        let updatedFavorites;
        if (isFavorite) {
            updatedFavorites = store.favorites.filter(fav => fav.uid !== item.uid);
            dispatch({ type: "REMOVE_FAVORITE", payload: item });
        } else {
            updatedFavorites = [...store.favorites, item];
            dispatch({ type: "ADD_FAVORITE", payload: item });
        }

        // Guardar en localStorage
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <button className={`btn-favorite ${isFavorite ? "active" : ""}`} onClick={toggleFavorite}>
            {isFavorite ? "❤️" : "🤍"}
        </button>
    );
};

export default FavoriteButton;
