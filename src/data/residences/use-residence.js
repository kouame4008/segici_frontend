import useSWRV from 'swrv';
import { LISTE_RESIDENCE } from '../../router/APIrouter';
import { residenceFetcher } from './residence-action';


export default function useResidence() {
    const { data: residences, error: erreurResidences } = useSWRV(
        LISTE_RESIDENCE,
        residenceFetcher,
        { registerOnFocus: false, refreshInterval: 7000 }
    );

    // console.log ("Bien", biens)

    return {
        residences,
        erreurResidences,
    };
}
