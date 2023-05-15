import useSWRV from 'swrv';
import { LISTE_HOTEL_URL } from '../../router/APIrouter';
import { swrvFetcher } from '../process';

// etablissement_id = 2 residence ; = 1 hotel
export default function useHotels(etablissement_id) {
    const { data: hotels, error: erreurHotels } = useSWRV(
        LISTE_HOTEL_URL+'?etablissement_id='+etablissement_id,
        swrvFetcher, {
            refreshInterval : 1000000
        }
    );

    // console.log ("Bien", biens)

    return {
        hotels,
        erreurHotels,
        chargement : !hotels && !erreurHotels,
    };
}
