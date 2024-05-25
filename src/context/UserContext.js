//Context for user
import { createContext, useContext, useState } from "react";

export const UserContext = createContext(); //Context for storing user data
export const UserSignUpContext = createContext(); //context for methods of logging and unlogging

//Provider for UserContext and UserSignUpContext
export function UserProvider({ children }) {
  const [user, setUser] = useState({ login: "", isLogged: false }); //state for user data as a value to UserContext
  //Methods for UserSignUpContext
  const log = login => {
    if (login) {
      setUser({ login, isLogged: true });
    }
  };
  const unLog = () => {
    setUser({ ...user, isLogged: false });
  };
  return (
    <UserContext.Provider value={user}>
      <UserSignUpContext.Provider value={{ log, unLog }}>{children}</UserSignUpContext.Provider>
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
export function useUserSignUpContext() {
  return useContext(UserSignUpContext);
}
