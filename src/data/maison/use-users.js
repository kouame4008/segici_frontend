import useSWRV from 'swrv';
import { EP_LISTE_USERS } from '../../router/APIrouter';
import { listeUsersFetcher } from './maison-action';

export default function useUsers() {
    const { data: users} = useSWRV(
        EP_LISTE_USERS,
        listeUsersFetcher,
        { registerOnFocus: false }
    );

    return {
        users,
    };
}
