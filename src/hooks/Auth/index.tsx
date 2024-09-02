"use client";
import { createContext, useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "../LocalStorage";
import { User } from "firebase/auth";
import { onAuthStateChanged, signInWithGoogle, signOut } from "src/lib/firebase/auth";
import { register } from "src/services";
import { useRouter } from "next/navigation";

const AuthContext = createContext<any>(null);

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useLocalStorage<any>("user_wepromolink", null);
  const [idToken, setIdToken] = useLocalStorage<any>(
    "user_wepromolink_idToken",
    null
  );
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      authUser &&
        (await register({
          email: authUser?.email,
          firebaseId: authUser?.uid,
          fullname: authUser?.displayName,
          photoUrl: authUser?.photoURL,
        }));
      setUser(authUser);
      let token = await authUser?.getIdToken();
      setIdToken(token || null);
      router.refresh();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    onAuthStateChanged((authUser) => {
      if (user === undefined) return;
      if (user?.email !== authUser?.email) {
        router.refresh();
      }
    });
  }, [user]);


  const login = async (event) => {
    event.preventDefault();
    await signInWithGoogle();
  };


  const logout = async (event) => {
    event.preventDefault();
    await signOut();
    setUser(null);
    setIdToken(null);
    router.replace("/");
    router.refresh();
  };

  const value = useMemo(
    () => ({
      user,
      idToken,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
