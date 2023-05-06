import useSWRV from 'swrv';
import { LISTE_SLIDES } from '../../router/APIrouter';
import { listeSlideFetcher } from './slide-action';


export default function useSlide() {
    const { data: slides, error: erreurSlides } = useSWRV(
        LISTE_SLIDES,
        listeSlideFetcher,
        { registerOnFocus: false}
    );

    // console.log ("Bien", biens)

    return {
        slides,
        erreurSlides,
    };
}
