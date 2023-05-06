import axios from 'axios';
import { API_URL, LISTE_RESIDENCE, } from '../../router/APIrouter';

export const listeResidenceFetcher = async () => {
    return axios.get(`${API_URL + LISTE_RESIDENCE}`).then((res) => {
        return res.data.resultat
    })
}


export const residenceFetcher = (url) =>
    axios.get(`${API_URL + url}`).then((res) => res.data.resultat)


export const processData = async (URL, data) => {
    return axios.post(`${API_URL + URL}`, data).then((res) => {
        return res.data
    })
}