import axios from 'axios';
import { API_URL } from '../../router/APIrouter';

export const listeLocaliteFetcher = (url) =>
    axios.get(`${API_URL + url}`).then((res) => {
        let data = res.data.resultat;
        // let operation = [];
        // data.map((value) => {
        //     let el = {
        //         value: value.id,
        //         label: value.libelle_localite
        //     }
        //     operation.push(el)
        // })
        return data
    })

export const listePaysFetcher = (url) =>
    axios.get(`${API_URL + url}`).then((res) => {
        let data = res.data.resultat;
        let operation = [];
        data.map((value) => {
            let el = {
                value: value.id,
                label: value.libelle_pays
            }
            operation.push(el)
        })
        return operation
    })

export const listeCiviliteFetcher = (url) =>
    axios.get(`${API_URL + url}`).then((res) => {
        let data = res.data.resultat;
        let operation = [];
        data.map((value) => {
            // console.log (value)
            let el = {
                value: value.id,
                label: value.libelle_civilite
            }
            operation.push(el)
        })
        return data
    })

export const listeTypePartenaireFetcher = (url) =>
    axios.get(`${API_URL + url}`).then((res) => {
        let data = res.data.resultat;
        let partenaire = [];
        data.map((value) => {
            let el = {
                value: value.id,
                label: value.libelle_type_pat
            }
            partenaire.push(el)
        })
        return partenaire
    })


