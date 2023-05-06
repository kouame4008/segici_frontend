import useSWRV from 'swrv';
import { LISTE_BIEN } from '../../router/APIrouter';
import { listeBienFetcher } from './bien-action';


export default function usePromotion() {
    const { data: biens, error: erreurBiens } = useSWRV(
        LISTE_BIEN+'?promotion_immobiliere=1',
        listeBienFetcher
    );

    // console.log ("Bien", biens)

    return {
        biens,
        erreurBiens,
    };
}
