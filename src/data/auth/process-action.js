import axios from 'axios';
import { API_URL } from '../../router/APIrouter';


export const process_action = async (URL, data) => {
    return axios.post(`${API_URL + URL}`, data).then((res) => {
        return res.data
    })
}