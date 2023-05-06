import useSWRV from 'swrv';
import { LISTE_BIEN_BACK_OFFICE } from '../../router/APIrouter';
import { listeBienFetcher } from './bien-action';


export default function useBienPatners(partenaire_id) {
    const { data: biens, error: erreurBiens,mutate : mutateBien } = useSWRV(
        LISTE_BIEN_BACK_OFFICE+'?partenaire_id='+partenaire_id,
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
