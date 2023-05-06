// components 
import Accueil from '../pages/accueil/Accueil';
import Presentation from '../pages/apropos/Presentation';
import Equipes from '../pages/apropos/Equipes';
import Location from '../pages/louer/Location';
import Acheter from '../pages/achats/acheter';
import DetailBien from '../pages/achats/detail-biens';
import Services from '../pages/services/Services';
import ServicesDetails from '../pages/services/Detail-service';
import Agences from '../pages/agence/Agences';
import AgencesDetail from '../pages/agence/Detail-agence';
import Biens from '../pages/biens/Biens';
import TousLesBiens from '../pages/biens/TousLesBiens';
import Besoin from '../pages/besoins/Besoins';
import Partners from '../pages/partners/Partners';
import DevenirPartners from '../pages/partners/devenir-partners';
import Residences from '../pages/hotel/Residences';
import DetailsResidences from '../pages/residence/details-residence';
import ResultatListeBien from '../pages/biens/ResultatRecherche';
import Maisons from '../pages/biens/Maisons';
import PromotionImmobiliere from '../pages/biens/promotion-immobiliere';
import DetailsPromotionImmobiliere from '../pages/biens/details-promotion-immobiliere';
import Terrains from '../pages/biens/Terrains';
import Login from '../pages/espace-pro/login/Login';
import Dashboard from '../pages/espace-pro/pages/Dashboard';
import Hotels from '../pages/hotel/Hotels';
import HotelsDetails from '../pages/hotel/details-hotel';
import Doowely from '../pages/doowely/Doowely';
import ListeDemandeResidence from '../pages/espace-pro/pages/residences/liste-demande';
import EPListeReservation from '../pages/espace-pro/pages/residences/liste-reservation';
import EPDemandeReservation from '../pages/espace-pro/pages/hotels/liste-demande';
import EPReservationHotel from '../pages/espace-pro/pages/hotels/liste-reservation';
import ConsultationOffre from '../pages/espace-pro/pages/offres/Offres';
import PresentationOffres from '../pages/espace-pro/pages/soumission/PresentationOffres';
import Message from '../pages/espace-pro/pages/messages/Message';
import Discussion from '../pages/espace-pro/pages/messages/Discussion';
import EPBesoin from '../pages/espace-pro/pages/besoin/Besoin';
import EPAnnonce from '../pages/espace-pro/pages/annonce/Annonces';
import EPAvis from '../pages/espace-pro/pages/avis/Avis';



const routes = [
    {
        path: '/',
        component: Accueil,
        name: 'Accueil',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/a-propos',
        component: Presentation,
        name: 'Presentation',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/biens-a-louer',
        component: Location,
        name: 'Location',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/biens-a-acheter',
        component: Acheter,
        name: 'Acheter',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/detail-biens/:id',
        component: DetailBien,
        name: 'DetailBien',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/services',
        component: Services,
        name: 'Services',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/services/:id',
        component: ServicesDetails,
        name: 'ServicesDetails',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/agences',
        component: Agences,
        name: 'Agences',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/agences/:id',
        component: AgencesDetail,
        name: 'AgencesDetail',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/notre-equipe',
        component: Equipes,
        name: 'Equipes',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/proposer-un-bien',
        component: Biens,
        name: 'Biens',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/doowely',
        component: Doowely,
        name: 'Doowely',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/proposer-un-besoin',
        component: Besoin,
        name: 'Besoin',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/partenaires',
        component: Partners,
        name: 'Partners',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/devenir-partenaires',
        component: DevenirPartners,
        name: 'DevenirPartners',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/residences-meublees',
        component: Residences,
        name: 'Residences',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/residences-meublees/:id',
        component: DetailsResidences,
        name: 'DetailsResidences',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/resultat-recherche/:data',
        component: ResultatListeBien,
        name: 'ResultatListeBien',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/tous-les-biens',
        component: TousLesBiens,
        name: 'TousLesBiens',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/maisons',
        component: Maisons,
        name: 'Maisons',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/promotion-immobiliere',
        component: PromotionImmobiliere,
        name: 'PromotionImmobiliere',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/details-promotion-immobiliere/:slug',
        component: DetailsPromotionImmobiliere,
        name: 'DetailsPromotionImmobiliere',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/terrains',
        component: Terrains,
        name: 'Terrains',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/espace-pro/connexion',
        component: Login,
        name: 'Login',
        meta: {
            layout: 'login'
        }
    },
    {
        path: '/espace-pro/dashboard',
        component: Dashboard,
        name: 'Dashboard',
        meta: {
            layout: 'espace',
            permission: {
                menu_id: 1,
                title: "Tableau de bord",
                icon: 'fas fa-tachometer-alt',
            }
        }
    },
    {
        path: '/espace-pro/consultation-offres',
        component: ConsultationOffre,
        name: 'ConsultationOffre',
        meta: {
            layout: 'espace',
            permission: {
                menu_id: 2,
                title: "Consultation des offres",
                icon: 'fas fa-archway',
            }
        }
    },
    {
        path: '/espace-pro/emission-besoin',
        component: EPBesoin,
        name: 'EmissionBesoin',
        meta: {
            layout: 'espace',
            permission: {
                menu_id: 3,
                title: "Emission de besoin",
                icon: 'fas fa-comment',
            }
        }
    },
    {
        path: '/espace-pro/envoyer-message',
        component: Message,
        name: 'Message',
        meta: {
            layout: 'espace',
            permission: {
                menu_id: 4,
                title: "Message",
                icon: 'fas fa-paper-plane',
            }
        }
    },
    {
        path: '/espace-pro/discussion-message/:id',
        component: Discussion,
        name: 'Discussion',
        meta: {
            layout: 'espace'
        }
    },
    {
        path: '/espace-pro/alerte-annonce',
        component: EPAnnonce,
        name: 'AlerteAnnonce',
        meta: {
            layout: 'espace',
            permission: {
                menu_id: 6,
                title: "Alerte annonce",
                icon: 'fas fa-bell',
            }
        }
    },
    {
        path: '/espace-pro/avis-partenaire',
        component: EPAvis,
        name: 'AvisPartenaire',
        meta: {
            layout: 'espace',
            permission: {
                menu_id: 7,
                title: "Avis partenaire",
                icon: 'fas fa-star',
            }
        }
    },
    {
        path: '/espace-pro/presentation-offres',
        component: PresentationOffres,
        name: 'PresentationOffres',
        meta: {
            layout: 'espace',
            permission: {
                menu_id: 8,
                title: "Soumission de bien",
                icon: 'fas fa-book',
            }
        }
    },
    {
        path: '/hotels',
        component: Hotels,
        name: 'Hotels',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/hotels/:id/:uuid',
        component: HotelsDetails,
        name: 'HotelsDetails',
        meta: {
            layout: 'web'
        }
    },
    {
        path: '/liste-demande-reservation-residence',
        component: ListeDemandeResidence,
        name: 'ListeDemandeResidence',
        meta: {
            layout: 'espace'
        }
    },
    {
        path: '/liste-reservation-residence',
        component: EPListeReservation,
        name: 'EPListeReservation',
        meta: {
            layout: 'espace'
        }
    },
    {
        path: '/liste-demande-reservation-hotel',
        component: EPDemandeReservation,
        name: 'EPDemandeReservation',
        meta: {
            layout: 'espace'
        }
    },
    {
        path: '/liste-reservation-hotel',
        component: EPReservationHotel,
        name: 'EPReservationHotel',
        meta: {
            layout: 'espace'
        }
    }
];

export default routes;