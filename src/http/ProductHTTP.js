import axios, { AxiosResponse } from "axios";
import AxiosInstance from "../helper/AxiosInstance";


export const getProductHTTP = async () => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/product';
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const createCategoryHTTP = async (data) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/category';
        const response = await axiosInstance.post(url,data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const editCategoryHTTP = async (id,data) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/category/'+id;
        const response = await axiosInstance.patch(url,data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getCategoriesHTTP = async () => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/category';
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const createProductHTTP = async (data) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/product';
        const response = await axiosInstance.post(url,data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const editProduct = async (id,data) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/product/'+id;
        const response = await axiosInstance.patch(url,data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const updateImage = async (data)=>{
    try {
        const axiosInstance = AxiosInstance('multipart/form-data');
        const url = '/image/upload';
        const response = await axiosInstance.post(url,data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getBillLast7DaysHTTP = async ()=>{
    try {
        const axiosInstance = AxiosInstance();
        const url = '/bill-delivery/last-7-days';
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}