import axios from 'axios';
import { API_URL } from '../../router/APIrouter';

export const listeEquipeFetcher = (url) =>
    axios.get(`${API_URL + url}`).then((res) => res.data.resultat)
