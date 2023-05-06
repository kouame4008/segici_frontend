import numeral from 'numeral';
import axios from 'axios';

export const axiosGetHeaders = () => {
    return axios.defaults.headers.common = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
}



export const formatteurMillier = (data) => {
    let nombre = numeral(data).format("0,0").replace(/,/g, " ") + " F CFA";
    return nombre;
};

export const isMobile = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)) {
        return true
    } else {
        return false
    }
}