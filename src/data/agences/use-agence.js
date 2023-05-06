
import useSWRV from 'swrv';
import { LISTE_AGENCE} from '../../router/APIrouter';
import { listeAgenceFetcher } from './agence-action';

export default function useAgence() {
    const { data: agences, error: erreurAgence } = useSWRV(
        LISTE_AGENCE,
        listeAgenceFetcher,
        { registerOnFocus: false }
    );

    return {
        agences,
        erreurAgence,
    };
}
