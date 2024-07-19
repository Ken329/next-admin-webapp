import { createContext, useState, ReactNode } from "react";

type AuthContext = {
  auth: any;
  setAuth: Function;
};

const Context = createContext<AuthContext | undefined>({} as AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState({});

  return (
    <Context.Provider value={{ auth, setAuth }}>{children}</Context.Provider>
  );
};

export default Context;
