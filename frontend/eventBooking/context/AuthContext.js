import React,{useEffect,useState,createContext} from "react";
import app from "../util/axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
        setUser(JSON.parse(user));
    }
    setLoading(false);
}, []);

const login = async (email,password) => {
    const userData = { email, password };

try{
    const response = await app.post("/login", userData);
    setUser(response.data);
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", response.data.token);

    return response.data;
}catch(err){
    console.error("Login failed:", err);
}
};



const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};


const register = async (email, password) => {
    const userData = { email, password };
   try{
    const response = await app.post("/auth/register", userData);
    return response.data;
   }
   catch(err){
    console.error("Registration failed:", err);
    throw err
   }

} 

const verifyOtp = async (otp) => {
    try {
        const response = await app.post("/auth/verifyOtp", { otp });
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (err) {
        console.error("OTP verification failed:", err);
    }
};

    return (
        <AuthContext.Provider value={{ user, setUser, loading, login, logout, verifyOtp, register }}>
            {children}
        </AuthContext.Provider>
    );
};

