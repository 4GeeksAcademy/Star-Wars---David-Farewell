const initialStore = {
  favorites: []
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "REMOVE_FAVORITE":
      return { ...state, favorites: state.favorites.filter(fav => fav.uid !== action.payload.uid) };
    default:
      return state;
  }
};

export { initialStore, storeReducer };
