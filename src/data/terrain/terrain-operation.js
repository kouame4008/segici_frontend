import axios from 'axios';
import { API_URL } from '../../router/APIrouter';

export const listeTerrainFetcher = (url) =>
    axios.get(`${API_URL + url}`).then((res) => {
        let data = res.data.resultat;
        let terrain = [];
        data.map((value) => {
            let el = {
                value : value.id,
                label : value.libelle_type_terrain
            }
            terrain.push(el)
        })
        return terrain
    })
