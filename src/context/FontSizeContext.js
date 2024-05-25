//Context for FontSize
import { createContext, useState, useContext } from "react";

const FontSizeContext = createContext();

export function useFontSizeContext() {
  return useContext(FontSizeContext);
}
//Provider for FontSizeContext
export function FontSizeContextProvider({ children }) {
  const [fontSize, setFontSize] = useState(14);
  return <FontSizeContext.Provider value={{ fontSize, setFontSize }}>{children}</FontSizeContext.Provider>;
}
