import { createContext, useContext, useReducer } from "react";
import { storeReducer, initialStore } from "../store"; // ✅ Corrección

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useGlobalReducer() { 
  const { dispatch, store } = useContext(StoreContext);
  return { dispatch, store };
}
