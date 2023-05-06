import useSWRV from 'swrv';
import { LISTE_CIVILITE } from '../../router/APIrouter';
import { listeCiviliteFetcher } from '../localite/localite-actions';

export default function usePays() {
    const { data: civilite, error: erreurCivilite } = useSWRV(
        LISTE_CIVILITE,
        listeCiviliteFetcher,
        { registerOnFocus: false }
    );

    return {
        civilite,
        erreurCivilite,
    };
}
