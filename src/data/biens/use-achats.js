import useSWRV from 'swrv';
import { LISTE_BIEN } from '../../router/APIrouter';
import { listeBienFetcher } from './bien-action';


export default function useAchats() {
    const { data: biens, error: erreurBiens } = useSWRV(
        LISTE_BIEN+'?type_operation_id='+2,
        listeBienFetcher,
        { registerOnFocus: false }
    );

    // console.log ("Bien", biens)

    return {
        biens,
        erreurBiens,
    };
}
