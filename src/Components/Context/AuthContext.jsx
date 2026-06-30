import { createContext, useState, useEffect } from "react";
import API from "../../services/api";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await API.post("/auth/login", { email, password });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      try {
        window.dispatchEvent(new Event("user-login"));
      } catch (e) {}
      return data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (name, email, password, phone) => {
    try {
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
        phone,
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      try {
        window.dispatchEvent(new Event("user-login"));
      } catch (e) {}
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cart");
  };

  const isAdmin = () => {
    return user && user.role === "admin";
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
