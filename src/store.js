const initialStore = {
  characters: [],
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case "SET_CHARACTERS":
      return { ...state, characters: action.payload };
    default:
      return state;
  }
};

export { initialStore, storeReducer };
