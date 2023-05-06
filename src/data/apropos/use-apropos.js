import useSWRV from 'swrv';
import { INFO_PAGE_APROPOS } from '../../router/APIrouter';
import { listeAproposFetcher } from './apropos-action';


export default function useApropos() {
    const { data: apropos, error: erreurApropos } = useSWRV(
        INFO_PAGE_APROPOS,
        listeAproposFetcher,
        { registerOnFocus: false }
    );

    // console.log ("Bien", biens)

    return {
        apropos,
        erreurApropos,
    };
}
