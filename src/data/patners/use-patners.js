
import useSWRV from 'swrv';
import { LISTE_PARTENAIRE } from '../../router/APIrouter';
import { listePatnersFetcher } from './patners-actions';

export default function usePatners() {
    const { data: patners, error: erreurPatners } = useSWRV(
        LISTE_PARTENAIRE,
        listePatnersFetcher,
        { registerOnFocus: false }
    );

    return {
        patners,
        erreurPatners,
    };
}
