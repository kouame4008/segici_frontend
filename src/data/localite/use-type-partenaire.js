import useSWRV from 'swrv';
import { LISTE_TYPE_PARTENAIRE } from '../../router/APIrouter';
import { listeTypePartenaireFetcher } from '../localite/localite-actions';

export default function useTypePartenaire() {
    const { data: partenaireType } = useSWRV(
        LISTE_TYPE_PARTENAIRE,
        listeTypePartenaireFetcher,
        { registerOnFocus: false }
    );

    return {
        partenaireType
    };
}
