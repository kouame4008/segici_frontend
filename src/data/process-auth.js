import axios from 'axios';
import { API_URL } from '../router/APIrouter';
import {axiosGetHeaders} from '../helpers/ServicesHelpers';

axiosGetHeaders ();

// Liste async
export const processListeFetcherAuth = async (URL) => {
    return axios.get(`${API_URL + URL}`).then((res) => {
        return res.data.resultat
    })
}

export const processFetcherAuth = async (URL) => {
    return axios.get(`${API_URL + URL}`).then((res) => {
        return res.data
    })
}

// Liste sync
export const swrvFetcherAuth = (url) =>
    axios.get(`${API_URL + url}`).then((res) => res.data.resultat)


// Update Create Delete 
export const processDataAuth = async (URL, data) => {
    return axios.post(`${API_URL + URL}`, data).then((res) => {
        return res.data
    })
}