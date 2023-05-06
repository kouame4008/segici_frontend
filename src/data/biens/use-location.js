import useSWRV from 'swrv';
import { LISTE_BIEN } from '../../router/APIrouter';
import { listeBienFetcher } from './bien-action';


export default function useLouer() {
    const { data: biens, error: erreurBiens, mutate : mutateBien } = useSWRV(
        LISTE_BIEN+'?type_operation_id='+1,
        listeBienFetcher,
        { registerOnFocus: false }
    );

    // console.log ("Bien", biens)

    return {
        biens,
        erreurBiens,
        mutateBien
    };
}
