
import useSWRV from 'swrv';
import { LISTE_SERVICE } from '../../router/APIrouter';
import { listeServiceFetcher } from './service-action';

export default function useservice() {
    const { data: services, error: erreurServices } = useSWRV(
        LISTE_SERVICE,
        listeServiceFetcher,
        { registerOnFocus: false }
    );

    return {
        services,
        erreurServices,
    };
}
