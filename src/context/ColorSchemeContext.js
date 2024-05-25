//Context for ColorScheme
import { createContext, useState, useContext } from "react";

const ColorSchemeContext = createContext();
//Provider for ColorSchemeContext
export function ColorSchemeContextProvider({ children }) {
  const [colorScheme, setColorScheme] = useState("dark");
  return <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>{children}</ColorSchemeContext.Provider>;
}
//simplifying using ColorSchemeContext
export function useColorSchemeContext() {
  return useContext(ColorSchemeContext);
}
