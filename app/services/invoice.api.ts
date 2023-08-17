import Axios, { AxiosRequestConfig } from 'axios';

export const URL = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/v1`
    : "http://localhost:8000/api/v1";

const API_URL = URL + '/invoice'

export const onGetInvoiceList = async (data: any) => {
    const requestConfig: AxiosRequestConfig = {
        method: 'get',
        url: API_URL,
        data
    }
    try {
        const { data: response } = await Axios.request(requestConfig)
        return response
    }
    catch (err: any) {
        const errMessage = err.message
        return { error: errMessage }
    }
}

export const onReadInvoiceList = async (data: any) => {
    const requestConfig: AxiosRequestConfig = {
        method: 'get',
        url: API_URL + `/${data.id}`,
        data
    }
    try {
        const { data: response } = await Axios.request(requestConfig)
        return response
    }
    catch (err: any) {
        const errMessage = err.message
        return { error: errMessage }
    }
}

export const onCreateInvoice = async (data: any) => {
    const requestConfig: AxiosRequestConfig = {
        method: 'post',
        url: API_URL,
        data
    }
    try {
        const { data: response } = await Axios.request(requestConfig)
        return response
    }
    catch (err: any) {
        const errMessage = err.message
        return { error: errMessage }
    }
}

export const onUpdateInvoiceClaim = async (data: any) => {
    const requestConfig: AxiosRequestConfig = {
        method: 'patch',
        url: API_URL + `/claim/${data.id}`,
        data
    }
    try {
        const { data: response } = await Axios.request(requestConfig)
        return response
    }
    catch (err: any) {
        const errMessage = err.message
        return { error: errMessage }
    }
}
export const onUpdateInvoiceList = async (data: any) => {
    const requestConfig: AxiosRequestConfig = {
        method: 'patch',
        url: API_URL + `/list/${data.id}`,
        data
    }
    try {
        const { data: response } = await Axios.request(requestConfig)
        return response
    }
    catch (err: any) {
        const errMessage = err.message
        return { error: errMessage }
    }
}