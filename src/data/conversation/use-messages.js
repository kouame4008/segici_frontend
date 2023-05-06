import useSWRV from 'swrv';
import { EP_LISTE_MESSAGE } from '../../router/APIrouter';
import { swrvFetcher } from '../process';

export default function useMessages(conversationId) {
    const { data: messagesList } = useSWRV(
        EP_LISTE_MESSAGE+'?conversation_id='+conversationId,
        swrvFetcher,
        { registerOnFocus: false, refreshInterval: 3000 }
    );

    return {
        messagesList,
    };
}
