import axios, { AxiosResponse } from "axios";
import AxiosInstance from "../helper/AxiosInstance";


export const login = async (username,pass) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/auth/sign-in';
        const body={
            email:username,
            password:pass
        }
        const response = await axiosInstance.post(url,body);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
