import axios from 'axios';
import { API_URL } from '../../router/APIrouter';


export const listeSlideFetcher = (url) =>
    axios.get(`${API_URL + url}`).then((res) => {
        return res.data.resultat;
    })