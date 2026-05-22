import api from "@/lib/axios";
import { PayloadListStaff } from "./staff.type";

export const GetStaffList = async (data: PayloadListStaff) => {
    try {
        const response = await api.post("/setting/staffs/list", data);
        
        return response.data
    } catch (error) {
        console.log("AuthLogin Error :", error);
        throw error;
    }
};