import useSWRV from 'swrv';
import { LISTE_TERRAIN } from '../../router/APIrouter';
import { listeTerrainFetcher } from './terrain-operation';

export default function useOperation() {
    const { data: terrain, error: erreurTerrain } = useSWRV(
        LISTE_TERRAIN,
        listeTerrainFetcher,
        { registerOnFocus: false }
    );

    return {
        terrain,
        erreurTerrain,
    };
}
