import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../LocalStorage";
import { User, UserCredential } from "firebase/auth";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useLocalStorage("user_wepromolink", null);
  const [idToken, setIdToken] = useLocalStorage("user_wepromolink_idToken", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data: User, idToken: string) => {
    setUser(data);
    setIdToken(idToken);
    navigate("/dashboard");
  };


  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    setIdToken(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      idToken,
      login,
      logout
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};