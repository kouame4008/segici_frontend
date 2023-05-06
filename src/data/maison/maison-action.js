import axios from 'axios';
import { API_URL } from '../../router/APIrouter';

export const listeMaisonFetcher = (url) =>
    axios.get(`${API_URL + url}`).then((res) => {
        let data = res.data.resultat;
        let maisons = [];
        data.map((value) => {
            let el = {
                value: value.id,
                label: value.libelle_type_maison
            }
            maisons.push(el)
        })
        return maisons
    })


export const listeEquipementsFetcher = (url) =>
    axios.get(`${API_URL + url}`).then((res) => {
        let data = res.data.resultat;
        let equipements = [];
        data.map((value) => {
            let el = {
                value: value.id,
                label: value.libelle_equipement
            }
            equipements.push(el)
        })
        return equipements
    })

    export const listeUsersFetcher = (url) =>
    axios.get(`${API_URL + url}`).then((res) => {
        let data = res.data.resultat;
        let users = [];
        data.map((value) => {
            let el = {
                value: value.id,
                label: value.civilite_user+' '+value.nom_user+' '+value.prenom_user
            }
            users.push(el)
        })
        return users
    })