import { useContext, useReducer, createContext } from "react";
import { storeReducer, initialStore } from "../store"; // ✅ Corrección aquí

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useGlobalReducer() {  // ✅ Aquí estaba el error, antes era export default
  const { dispatch, store } = useContext(StoreContext);
  return { dispatch, store };
}
