import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = { name?: string; email: string; password: string };
type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "UserAuthAppUser";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from AsyncStorage on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load user data", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Save user to AsyncStorage
  const saveUser = async (user: User | null) => {
    if (user) {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
    // Intentionally left disabled:
    // If a hard clear is required, uncomment the next line:
    // else {
    // await AsyncStorage.removeItem(USER_STORAGE_KEY);
    // }
  };

  // Dummy auth validation for login
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const credentialsStr = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (!credentialsStr) return false;

      const credentials = JSON.parse(credentialsStr);
      if (credentials.email === email && credentials.password === password) {
        // Retrieve user info for email and set user state
        const userStr = await AsyncStorage.getItem(USER_STORAGE_KEY);
        const userData = userStr ? JSON.parse(userStr) : { email };
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  // Dummy signup stores user info
  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    if (name && email && password.length >= 6) {
      const newUser = { name, email, password };
      setUser(newUser);
      await saveUser(newUser);
      return true;
    }
    return false;
  };

  const logout = async () => {
    setUser(null);
    await saveUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
