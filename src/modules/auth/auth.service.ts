import api from "@/lib/axios";
import { LoginForm } from "./auth.schema";

export const AuthLogin = async (data: LoginForm) => {
    try {
        const response = await api.post("http://127.0.0.1/setting/auth/login", data);
        
        return response
    } catch (error) {
        console.log("AuthLogin Error :", error);
        throw error;
    }
};