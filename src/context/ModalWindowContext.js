//Context for ModalWindow states
import React, { useState, useContext } from "react";
const ModalWindowContext = React.createContext();

//function for using context
export const useModalWindowContext = () => {
  return useContext(ModalWindowContext);
};

//ModalWindowContext.Provider and ModalWindow state
export function ModalWindowContextProvider({ children }) {
  const [isShown, setIsShown] = useState(false);

  return <ModalWindowContext.Provider value={{ isShown, setIsShown }}>{children}</ModalWindowContext.Provider>;
}
