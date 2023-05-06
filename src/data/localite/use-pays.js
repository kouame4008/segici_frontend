import useSWRV from 'swrv';
import { LISTE_PAYS } from '../../router/APIrouter';
import { listePaysFetcher } from '../localite/localite-actions';

export default function usePays() {
    const { data: pays, error: erreurPays } = useSWRV(
        LISTE_PAYS,
        listePaysFetcher,
        { registerOnFocus: false }
    );

    return {
        pays,
        erreurPays,
    };
}
