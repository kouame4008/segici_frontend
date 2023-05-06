import useSWRV from 'swrv';
import { LISTE_AVIS_CLIENT } from '../../router/APIrouter';
import { swrvFetcher } from '../process';


export default function useAvis() {
    const { data: avis, error: erreurAvis } = useSWRV(
        LISTE_AVIS_CLIENT,
        swrvFetcher
    );

    // console.log ("Bien", avis)

    return {
        avis,
        erreurAvis,
    };
}
