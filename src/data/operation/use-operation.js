import useSWRV from 'swrv';
import { LISTE_OPERATION } from '../../router/APIrouter';
import { listeOperationFetcher } from './operation-action';

export default function useOperation() {
    const { data: operation, error: erreurOperation } = useSWRV(
        LISTE_OPERATION,
        listeOperationFetcher,
        { registerOnFocus: false }
    );

    return {
        operation,
        erreurOperation,
    };
}
