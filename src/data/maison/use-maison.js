import useSWRV from 'swrv';
import { LISTE_MAISON } from '../../router/APIrouter';
import { listeMaisonFetcher } from './maison-action';

export default function useMaison() {
    const { data: maison, error: erreurMaison } = useSWRV(
        LISTE_MAISON,
        listeMaisonFetcher,
        { registerOnFocus: false }
    );

    return {
        maison,
        erreurMaison,
    };
}
