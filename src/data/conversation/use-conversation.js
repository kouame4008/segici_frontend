import useSWRV from 'swrv';
import { EP_LISTE_CONVERSATION } from '../../router/APIrouter';
import { swrvFetcher } from '../process';

export default function useConversation() {
    const { data: conversations } = useSWRV(
        EP_LISTE_CONVERSATION,
        swrvFetcher,
        { registerOnFocus: false }
    );

    return {
        conversations,
    };
}
