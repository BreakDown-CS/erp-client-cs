import api from "@/lib/axios";
import { PayloadListStaff, PayloadSaveStaff } from "./emp.type";

export const GetStaffList = async (data: PayloadListStaff) => {
    try {
        const response = await api.post("/setting/staffs/list", data);

        return response.data
    } catch (error) {
        console.log("AuthLogin Error :", error);
        throw error;
    }
};

export const GetBranchesList = async () => {
    try {
        const response = await api.get("/setup/get-dropdown-branches");

        return response.data
    } catch (error) {
        console.log("GetBranchesList Error :", error);
        throw error;
    }
}

export const GetDepartmentList = async () => {
    try {
        const response = await api.get("/setup/get-dropdown-department");

        return response.data
    } catch (error) {
        console.log("GetDepartmentList Error :", error);
        throw error;
    }
}

export const GetEmployeeStatusList = async () => {
    try {
        const response = await api.get("/setup/get-dropdown-employees-status");

        return response.data
    } catch (error) {
        console.log("GetBranchesList Error :", error);
        throw error;
    }
}

export const GetPositionsList = async () => {
    try {
        const response = await api.get("/setup/get-dropdown-positions");

        return response.data
    } catch (error) {
        console.log("GetPositionsList Error :", error);
        throw error;
    }
}

export const InsertStaffNew = async (payload: PayloadSaveStaff) => {
    try {
        const response = await api.post("/employees/save", payload)

        return response.data
    } catch (error) {
        console.log("InsertStaffNew Error :", error);
        throw error;
    }
}