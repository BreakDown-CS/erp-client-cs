import api from "@/lib/axios";
import { ListStaffForm } from "./staff.schema";

export const GetStaffList = async (data: ListStaffForm) => {
    try {
        const response = await api.post("/setting/staffs/list", data);
        
        return response
    } catch (error) {
        console.log("AuthLogin Error :", error);
        throw error;
    }
};