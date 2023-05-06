import useSWRV from 'swrv';
import { LISTE_RESIDENCE_PUBLIER } from '../../router/APIrouter';
import { residenceFetcher } from './residence-action';


export default function useResidencePublier() {
    const { data: residences, error: erreurResidences } = useSWRV(
        LISTE_RESIDENCE_PUBLIER,
        residenceFetcher,
        { registerOnFocus: false, refreshInterval: 7000 }
    );

    // console.log ("Bien", biens)

    return {
        residences,
        erreurResidences,
    };
}
