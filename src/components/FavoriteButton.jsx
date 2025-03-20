import { useGlobalReducer } from "../hooks/useGlobalReducer";

const FavoriteButton = ({ item }) => {
    const { store, dispatch } = useGlobalReducer();
    const isFavorite = store.favorites.some(fav => fav.uid === item.uid);

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: "REMOVE_FAVORITE", payload: item });
        } else {
            dispatch({ type: "ADD_FAVORITE", payload: item });
        }
    };

    return (
        <button className={`btn-favorite ${isFavorite ? "active" : ""}`} onClick={toggleFavorite}>
            {isFavorite ? "❤️" : "🤍"}
        </button>
    );
};

export default FavoriteButton;
