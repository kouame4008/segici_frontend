import useSWRV from 'swrv';
import { EP_LISTE_EQUIPEMENTS } from '../../router/APIrouter';
import { listeEquipementsFetcher } from './maison-action';

export default function useEquipements() {
    const { data: equipements, error: erreurEq } = useSWRV(
        EP_LISTE_EQUIPEMENTS,
        listeEquipementsFetcher,
        { registerOnFocus: false }
    );

    return {
        equipements,
        erreurEq,
    };
}
