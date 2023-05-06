import useSWRV from 'swrv';
import { LISTE_BIEN } from '../../router/APIrouter';
import { listeBienFetcher } from './bien-action';


export default function useBien(etat_bien, type_bien='') {
    const { data: biens, error: erreurBiens } = useSWRV(
        LISTE_BIEN+'?etat_bien='+etat_bien+'&type_bien='+type_bien,
        listeBienFetcher
    );

    // console.log ("Bien", biens)

    return {
        biens,
        erreurBiens,
    };
}
