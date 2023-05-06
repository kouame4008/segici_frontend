import axios from 'axios';
import { API_URL } from '../../router/APIrouter';

export const listeOperationFetcher = (url) =>
    axios.get(`${API_URL + url}`).then((res) => {
        let data = res.data.resultat;
        let operation = [];
        data.map((value) => {
            let el = {
                value : value.id,
                label : value.libelle_type_operation
            }
            operation.push(el)
        })
        return operation
    })
