import { createContext,useState } from "react";
export const AuthContext=createContext();

function AuthProvider({children}){
  const [user,setUser]=useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [token,setToken]=useState(
    localStorage.getItem("token")
  );

  return (
    <AuthContext.Provider
    value={{
      user,
      setUser,
      token,
      setToken,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
