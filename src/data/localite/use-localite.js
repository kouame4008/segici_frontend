import useSWRV from 'swrv';
import { LISTE_LOCALITE } from '../../router/APIrouter';
import {listeLocaliteFetcher} from '../localite/localite-actions';

export default function useLocalite() {
    const { data: localite, error: erreurLocalite } = useSWRV(
        LISTE_LOCALITE,
        listeLocaliteFetcher,
        { registerOnFocus: false }
    );

    return {
        localite,
        erreurLocalite,
    };
}
