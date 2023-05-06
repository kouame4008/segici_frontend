import axios from 'axios';
import { API_URL } from '../router/APIrouter';

// Liste async
export const processListeFetcher = async (URL) => {
    return axios.get(`${API_URL + URL}`).then((res) => {
        return res.data.resultat
    })
}

// Liste sync
export const swrvFetcher = (url) =>
    axios.get(`${API_URL + url}`).then((res) => res.data.resultat)


// Update Create Delete 
export const processData = async (URL, data) => {
    return axios.post(`${API_URL + URL}`, data).then((res) => {
        return res.data
    })
}