import {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    AxiosRequestConfig
} from 'axios';

import axios from 'axios';

const API_CONFIG = {
    baseURL: import.meta.env.VITE_API_URL as string
};

class Api {
    private instance: AxiosInstance;

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config);
        this.instance.interceptors.response.use(Api.onResponse, Api.onRejected);
        this.instance.interceptors.request.use(Api.onRequest);
    }

    private static onRequest(params: any) {
        const localParams = params;
        return localParams;
    }
    
    private static onResponse(response: AxiosResponse) {
        return response.data;
    }

    private static onRejected(error: any) {
        // const originalConfig: AxiosRequestConfig | any = error.config;
        return Promise.reject(error?.response?.data?.error);
    }

    public get<T>(url: string, data?: any): Promise<T> {
        return this.instance.get(url, { ...data });
    }

    public post(url: string, data?: any, config?: object): any {
        return this.instance({
            method: 'post',
            url: url,
            data,
            ...config
        });
    }

    public put(url: string, data?: any): any {
        return this.instance({
            method: 'put',
            url: url,
            data
        });
    }

    public patch(url: string, data?: any): any {
        return this.instance({
            method: 'patch',
            url: url,
            data
        });
    }

    public delete(url: string, data?: any, config?: object): any {
        return this.instance({
            method: 'delete',
            url: url,
            data,
            ...config
        });
    }
}

const api = new Api(API_CONFIG);

export {
    api
};
