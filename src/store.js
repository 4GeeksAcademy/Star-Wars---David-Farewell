const initialStore = {
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    globalLoading: false
  };
  
  const storeReducer = (state, action) => {
    switch (action.type) {
      case "ADD_FAVORITE":
        return { ...state, favorites: [...state.favorites, action.payload] };
  
      case "REMOVE_FAVORITE":
        return {
          ...state,
          favorites: state.favorites.filter(fav => fav.uid !== action.payload.uid)
        };
  
      case "SET_FAVORITES":
        return { ...state, favorites: action.payload };
  
      case "SET_GLOBAL_LOADING":
        return { ...state, globalLoading: action.payload };
  
      default:
        return state;
    }
  };
  
  export { initialStore, storeReducer };
  