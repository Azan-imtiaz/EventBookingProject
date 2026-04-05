import React,{useEffect,useState,createContext} from "react";

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
    const response = await axios.post("/login", userData);
    setUser(response.data);
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", response.data.token);
}catch(err){
    console.error("Login failed:", err);
}
};

const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};

const verifyOtp = async (otp) => {
    try {
        const response = await axios.post("/auth/verifyOtp", { otp });
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token);
    } catch (err) {
        console.error("OTP verification failed:", err);
    }
};

    return (
        <AuthContext.Provider value={{ user, setUser, loading, login, logout, verifyOtp }}>
            {children}
        </AuthContext.Provider>
    );
};

