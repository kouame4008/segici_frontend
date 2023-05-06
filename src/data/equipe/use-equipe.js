
import useSWRV from 'swrv';
import { LISTE_MEMBRE } from '../../router/APIrouter';
import { listeEquipeFetcher } from './equipe-action';

export default function useEquipe() {
    const { data: equipes, error: erreurEquipes } = useSWRV(
        LISTE_MEMBRE,
        listeEquipeFetcher,
        { registerOnFocus: false }
    );

    return {
        equipes,
        erreurEquipes,
    };
}
