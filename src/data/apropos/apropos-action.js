import axios from 'axios';
import { API_URL,INFO_PAGE_APROPOS } from '../../router/APIrouter';


export const listeAproposFetcher = async () => {
    return axios.get(`${API_URL + INFO_PAGE_APROPOS}`).then((res) => {
        return res.data.resultat[0];
    })
}