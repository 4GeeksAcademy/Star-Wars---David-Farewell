import { useGlobalReducer } from "../hooks/useGlobalReducer";
import { useEffect } from "react";

const FavoriteButton = ({ item }) => {
    const { store, dispatch } = useGlobalReducer();

    // con uid y type
    const isFavorite = store.favorites.some(
        fav => fav.uid === item.uid && fav.type === item.type
    );

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(store.favorites));
    }, [store.favorites]);

    const toggleFavorite = () => {
        let updatedFavorites;

        if (isFavorite) {
            updatedFavorites = store.favorites.filter(
                fav => !(fav.uid === item.uid && fav.type === item.type)
            );
            dispatch({ type: "REMOVE_FAVORITE", payload: item });
        } else {
            updatedFavorites = [...store.favorites, item];
            dispatch({ type: "ADD_FAVORITE", payload: item });
        }

        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <button className={`btn-favorite ${isFavorite ? "active" : ""}`} onClick={toggleFavorite}>
            {isFavorite ? "❤️" : "🤍"}
        </button>
    );
};

export default FavoriteButton;
