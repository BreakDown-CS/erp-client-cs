import api from "@/lib/axios";
import { LoginForm } from "./auth.schema";

export const AuthLogin = async (data: LoginForm) => {
    try {
        const response = await api.post("/setting/auth/login", data);
        
        return response
    } catch (error) {
        console.log("AuthLogin Error :", error);
        throw error;
    }
};