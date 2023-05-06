import axios from 'axios';
import { API_URL, DETAIL_DU_BIEN, ENREGISTRER_DEMANDE, PHOTOS_BIEN, RECHERCHER_BIEN,PRIX_MAX_BIEN, CREER_BIEN } from '../../router/APIrouter';


export const listeBienFetcher = (url) =>
    axios.get(`${API_URL + url}`).then((res) => {
        // console.log ("Bien", res.data.res)
        return res.data.resultat;
    })

export const rechercherBien = async (data) => {
    return axios.post(API_URL + RECHERCHER_BIEN, data).then((res) => {
        return res.data
    })
}

export const detailDuBien = async (data) => {
    return axios.post(API_URL + DETAIL_DU_BIEN, data).then((res) => {
        return res.data
    })
}

export const enregistrerDemande = async (data) => {
    return axios.post(API_URL + ENREGISTRER_DEMANDE, data).then((res) => {
        return res.data
    })
}

export const photoBien = async (data) => {
    return axios.post(API_URL + PHOTOS_BIEN, data).then((res) => {
        return res.data
    })
}

export const getPrixMax = async () => {
    return axios.get(API_URL + PRIX_MAX_BIEN).then((res) => {
        return res.data
    })
}


export const creerBien = async (data) => {
    return axios.post(API_URL + CREER_BIEN, data).then((res) => {
        return res.data
    })
}
