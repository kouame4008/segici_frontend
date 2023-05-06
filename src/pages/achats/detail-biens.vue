<template>
<div class="main-content-wrapper form-detail-bien">
    <section class="section">
        <div class="container">
            <div class="row">
                <div class="col-md-9">
                    <div class="row">
                        <div class="col-12 col-lg-12">
                            <div class="single-post-wrapper">
                                <div class="post-content">
                                    <a-skeleton :loading="skeleton">
                                        <!-- <div class="post-image">
                                            <div style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff" class="swiper mySwiper2">
                                                <div class="swiper-wrapper">
                                                    <div class="swiper-slide" v-for="(item, i) in photos" :key="i">
                                                        <img :src="API_FICHIER+item.nom_image" />
                                                    </div>
                                                </div>
                                                <div class="swiper-button-next"></div>
                                                <div class="swiper-button-prev"></div>
                                                <div class="swiper-pagination"></div>
                                            </div>
                                            <div thumbsSlider="" class="swiper mySwiper">
                                                <div class="swiper-wrapper">
                                                    <div class="swiper-slide" v-for="(item, i) in photos" :key="i">
                                                        <img :src="API_FICHIER+item.nom_image" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div> -->
                                        <div class="">
                                            <!-- <q-carousel swipeable animated v-model="slide" thumbnails infinite>
                                                <q-carousel-slide v-for="(item, i) in photos" :key="i" :name="i" :img-src="API_FICHIER+item.nom_image" />
                                            </q-carousel> -->
                                        </div>
                                    </a-skeleton>
                                </div>

                                <div class="mt-4 single-overview-section panel-group property-panel">
                                    <h2 class="descrip-name">
                                        {{ bien && bien.titre_bien }}
                                    </h2>
                                </div>

                                <div class="mt-4 single-overview-section panel-group property-panel d-none">
                                    <h4 class="panel-title" id="">Résumé</h4>

                                    <ul class="overview_element">
                                        <li class="first_overview">
                                            <strong> Mis à jour le : </strong>
                                        </li>
                                        <li class="first_overview_date"> {{bien && moment (bien.created_at).format ('DD/MM/YYYY') }} </li>

                                    </ul>

                                    <ul class="overview_element">
                                        <li class="first_overview">
                                            <i class="fas fa-bed"></i>
                                        </li>
                                        <li> {{ bien && bien.nombre_piece_maison }} Chambre(s)</li>

                                    </ul>

                                    <ul class="overview_element">
                                        <li class="first_overview">
                                            <i class="fas fa-sink"></i>
                                        </li>
                                        <li>Salle de bains</li>
                                    </ul>
                                </div>

                                <!-- description du bien-->
                                <div class="mt-4 single-overview-section panel-group property-panel">
                                    <h4 class="panel-title" id="">DESCRIPTION DU BIEN</h4>

                                    <div>
                                        <p>
                                            {{ bien && bien.description_bien }}
                                        </p>
                                        <p v-if="bien && bien.libelle_type_maison">
                                            <strong> Type de maison : </strong> {{ bien && bien.libelle_type_maison }}
                                        </p>
                                        <p v-if="bien && bien.equipement_maison">
                                            <strong> Equipement de maison : </strong> {{ bien && bien.equipement_maison }}
                                        </p>
                                    </div>

                                    <div class="row q-mt-md">
                                        <div class="col-md-6">
                                            <p v-if="bien && bien.nombre_piece_maison">
                                                <strong> Nombre de pièces : </strong> {{ bien && bien.nombre_piece_maison }}
                                            </p>
                                            <p v-if="bien && bien.nombre_chambre">
                                                <strong> Nombre de chambre : </strong> {{ bien && bien.nombre_chambre }}
                                            </p>
                                            <p v-if="bien && bien.nombre_douche">
                                                <strong> Nombre de douche : </strong> {{ bien && bien.nombre_douche }}
                                            </p>
                                            <p v-if="bien && bien.garage">
                                                <strong> Garage : </strong> {{ bien && bien.garage }} voiture(s)
                                            </p>
                                            <p v-if="bien && bien.superficie_lot_maison">
                                                <strong> Superficie du lot : </strong> {{ bien && bien.superficie_lot_maison }} m²
                                            </p>

                                            <p v-if="bien && bien.superficie_batie">
                                                <strong> Superficie bâtie : </strong> {{ bien && bien.superficie_batie }} m²
                                            </p>
                                            <p v-if="bien && bien.titre_propriete">
                                                <strong> Titre de propiété : </strong> {{ bien && bien.titre_propriete }}
                                            </p>
                                            <p v-if="bien && bien.superficie_terrain">
                                                <strong> Superficie (m²) : </strong> {{ bien && bien.superficie_terrain }}
                                            </p>
                                            <p v-if="bien && bien.libelle_type_terrain">
                                                <strong> Type de terrain : </strong> {{ bien && bien.libelle_type_terrain }}
                                            </p>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="top-table-produit">
                                                A proximité
                                            </div>
                                            <table class="table-left-products table proxime table-bordered">
                                                <thead>
                                                    <tr>
                                                        <td>
                                                            <!-- <q-icon name="church" color="grey-6">
                                                                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                                                    <strong>Eglise</strong>
                                                                </q-tooltip>
                                                            </q-icon> -->
                                                        </td>

                                                         <td>
                                                            <!-- <q-icon name="mosque" color="grey-6">
                                                                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                                                    <strong>Mosquée</strong>
                                                                </q-tooltip>
                                                            </q-icon> -->
                                                        </td>
                                                        <td>
                                                            <!-- <q-icon name="shopping_basket" color="grey-6">
                                                                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                                                    <strong>Supermarché</strong>
                                                                </q-tooltip>
                                                            </q-icon> -->
                                                        </td>
                                                        <td>
                                                            <!-- <q-icon name="medication_liquid" color="grey-6">
                                                                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                                                    <strong>Hôpital</strong>
                                                                </q-tooltip>
                                                            </q-icon> -->
                                                        </td>
                                                        <td>
                                                            <!-- <q-icon name="bus_alert" color="grey-6">
                                                                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                                                    <strong>Ecole</strong>
                                                                </q-tooltip>
                                                            </q-icon> -->
                                                        </td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td> {{ proximite && proximite.eglise }}  </td>
                                                        <td> {{ proximite && proximite.mosquee }}  </td>
                                                        <td>{{ proximite && proximite.supermarche }} </td>
                                                        <td>{{ proximite && proximite.hopital }} </td>
                                                        <td>{{ proximite && proximite.ecole }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </div>
                                <!-- Adresse du b v ien-->
                                <div class="mt-4 single-overview-section panel-group property-panel">
                                    <h4 class="panel-title" id="">Adresse du bien</h4>

                                    <div class="mt-3 row">
                                        <div class="col-md-6">
                                            <strong>Ville :</strong> <span> {{ bien && bien.libelle_localite }} </span>
                                        </div>
                                        <div class="col-md-6">
                                            <strong>Région: </strong> <span>{{ bien && bien.libelle_localite }}</span>
                                        </div>
                                        <div class="mt-3 col-md-6">
                                            <strong>Pays: </strong> <span>Côte d'ivoire</span>
                                        </div>
                                        <div class="mt-3 col-md-12">
                                            <a-button type="" class="bien-btn"> Ouvrir dans Google Maps </a-button>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-4 single-overview-section panel-group property-panel d-none">
                                    <h4 class="panel-title" id="">Les avis</h4>
                                    <avis-form v-if="bien" :url="ENREGISTRER_AVIS_BIEN" :id="bien.id" type="bien" />
                                </div>

                                <div class="mt-4 single-overview-section panel-group property-panel">
                                    <h4 class="panel-title text-danger" id="">Nos conseils de sécurité </h4>
                                    <div class="d-block text-danger" v-html="accueil && accueil.msg_securite"></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-0 col-md-3">
                    <div class="p-0 single-overview-section panel-group property-panel">
                        <div class="single-price-wrap">
                            <div class="white-block single-price">
                                <i class="aficon-dollar-sign"></i>
                                <div class="white-block-content">
                                    <div class="price"> {{ bien &&formatteurMillier ( bien.prix_bien)  }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="promoteur">
                            <h3>Agence immobilière SEGICI</h3>
                            <div class="d-flex flex-column">
                                <strong>SEGICI </strong>
                                <span>
                                    <StarOutlined />
                                    <StarOutlined />
                                    <StarOutlined />
                                    <StarOutlined />
                                    <StarOutlined />
                                </span>
                            </div>
                            <div class="d-flex w-100 justify-content-center align-item-center">
                                <a-button type="" class="red-btn" @click="changeVisible"> <strong>
                                        {{ bien && bien.type_operation_id == 2 ? "JE VEUX ACHETER" : 'JE VEUX LOUER' }}
                                    </strong> </a-button>
                            </div>
                        </div>
                    </div>

                    <div class="single-overview-section panel-group property-panel " style="padding:  15px">
                        <a-form class="form-terrain" :model="contactValues" @submit.prevent="handleNousContacter">
                            <div class="row">
                                <div class="col-md-12">
                                    <h2 class="m-0 main-heading" style="font-size: 16px;line-height: 25px;">Contacter un conseiller client segici <a href="tel:+2250767090967">(+225) 0767090967</a></h2>
                                    <hr>
                                </div>
                                <div class="col-md-12">
                                    <label for="">Nom & prénom(s)</label>
                                    <a-form-item>
                                        <a-input v-model:value="contactValues.nom" placeholder="Nom & prénom(s)" class="promteurInput" />
                                    </a-form-item>
                                </div>
                                <div class="col-md-12">
                                    <label for="">Téléphone </label>
                                    <a-form-item>
                                        <a-input v-model:value="contactValues.telephone" placeholder="Téléphone" class="promteurInput" />
                                    </a-form-item>
                                </div>
                                <div class="col-md-12">
                                    <label for="">Email </label>
                                    <a-form-item>
                                        <a-input v-model:value="contactValues.email" placeholder="Email" class="promteurInput" />
                                    </a-form-item>
                                </div>

                                <div class="col-md-12">
                                    <label for="">Ville </label>
                                    <a-form-item>
                                        <a-input v-model:value="contactValues.ville" placeholder="Ville" class="promteurInput" />
                                    </a-form-item>
                                </div>

                                <div class="col-md-12">
                                    <label for="">Profession </label>
                                    <a-form-item>
                                        <a-input v-model:value="contactValues.profession" placeholder="Profession" class="promteurInput" />
                                    </a-form-item>
                                </div>

                                <div class="col-md-12">
                                    <label for="">Message </label>
                                    <a-form-item>
                                        <a-textarea v-model:value="contactValues.message" placeholder="Message" class="textareaItemField" rows="2" />
                                    </a-form-item>
                                </div>

                                <div class="col-md-12">
                                    <div class="d-flex justify-content-end">
                                        <a-button size="large" class="search-btn" htmlType="submit" :loading="spinning">
                                            SOUMETTRE
                                        </a-button>
                                    </div>
                                </div>
                            </div>
                        </a-form>
                    </div>

                </div>

            </div>
        </div>
        <Dialog :style="{width: '50vw'}" :modal="true" :dismissableMask="true">

            <template #footer>
                <Button label="ANNULER" icon="pi pi-times" class="p-button-text" />
                <Button label="SOUMETTRE LES INFORMATIONS" icon="pi pi-check" autofocus />
            </template>
        </Dialog>

        <a-modal v-model:visible="displayModal" width="50vw" :destroyOnClose="true" :afterClose="afterClose" :footer="false">
            <template #title>
                <h3> <strong>FORMULAIRE DE DEMANDE {{ bien && bien.type_operation_id == 2 ? "D'ACHAT" : 'DE LOCATION' }} </strong> </h3>
            </template>
            <a-spin :spinning="spinning">
                <a-form class="form-demadne-location details" :model="form">
                    <div class="px-3 row">
                        <div class="col-md-4">
                            <label for="">Civilité</label>
                            <a-form-item>
                                <a-select v-model:value="form.civilite_demandeur" class="inputItemField" :options="civilite"></a-select>
                            </a-form-item>
                        </div>
                        <div class="col-md-4">
                            <label for="">Nom</label>
                            <a-form-item>
                                <a-input v-model:value="form.nom_demandeur" class="inputItemField" placeholder="Nom" allow-clear />
                            </a-form-item>
                        </div>

                        <div class="col-md-4">
                            <label for="">Prénom(s)</label>
                            <a-form-item>
                                <a-input v-model:value="form.prenom_demandeur" class="inputItemField" placeholder="Prénom(s)" allow-clear />
                            </a-form-item>
                        </div>

                        <div class="col-md-4">
                            <label for="">Téléphone</label>
                            <a-form-item>
                                <a-input v-model:value="form.telephone_demandeur" class="inputItemField" placeholder="Téléphone" allow-clear />
                            </a-form-item>
                        </div>

                        <div class="col-md-4">
                            <label for="">Email</label>
                            <a-form-item>
                                <a-input v-model:value="form.email_demandeur" class="inputItemField" placeholder="Email" allow-clear />
                            </a-form-item>
                        </div>

                         <div class="col-md-4">
                            <label for="">Profession</label>
                            <a-form-item>
                                <a-input v-model:value="form.profession" class="inputItemField" placeholder="Profession" allow-clear />
                            </a-form-item>
                        </div>

                        <div class="col-md-6">
                            <label for="">Pays</label>
                            <a-form-item>
                                <a-select v-model:value="form.pays_id" class="inputItemField" :options="pays"></a-select>
                            </a-form-item>
                        </div>

                        <div class="col-md-6">
                            <label for="">Ville</label>
                            <a-form-item>
                                <a-select v-model:value="form.localite_id" class="inputItemField" :options="localite"></a-select>
                            </a-form-item>
                        </div>

                        <div class="col-md-12">
                            <label for="">Message</label>
                            <a-form-item>
                                <a-textarea v-model:value="form.message_demandeur" allow-clear class="textareaItemField" placeholder="Message" />
                            </a-form-item>
                        </div>
                        <div class="mt-4 col-md-12">
                            <div class="d-flex justify-content-end">
                                <Button label="ANNULER" icon="pi pi-times" class="text-white p-button-text" @click="modalCancel" />
                                <Button label="SOUMETTRE LES INFORMATIONS" icon="pi pi-check" autofocus @click="handleSubleDemande" />
                            </div>
                        </div>
                    </div>
                </a-form>
            </a-spin>

        </a-modal>

    </section>
</div>
</template>

<script>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import {
    reactive,
    ref
} from '@vue/reactivity';
import {
    StarOutlined
} from '@ant-design/icons-vue';
import {
    onMounted
} from '@vue/runtime-core';
import {
    useRoute
} from 'vue-router';
import {
    detailDuBien,
    enregistrerDemande,
    photoBien
} from '../../data/biens/bien-action';
import {
    formatteurMillier
} from '../../helpers/ServicesHelpers';
import moment from 'moment';
import {
    notification
} from 'ant-design-vue';

import {
    Form
} from 'ant-design-vue';
import {
    API_FICHIER,
    INFO_ACCUEIL,
    LISTE_CIVILITE,
    LISTE_LOCALITE,
    LISTE_PAYS,
    NOUS_CONTACTER
} from '../../router/APIrouter';
import {
    processData
} from '../../data/residences/residence-action';
import AvisForm from '../../components/avis/avis-form.vue';
import {
    ENREGISTRER_AVIS_BIEN
} from '../../router/APIrouter';
import {
    processListeFetcher
} from '../../data/process';
import {
    listeLocaliteFetcher
} from '../../data/localite/localite-actions';

const useForm = Form.useForm;

export default {
    setup() {
        const displayModal = ref(false);
        const route = useRoute();
        const bien = ref();
        const photos = ref();

        const spinning = ref(false);
        const proximite = ref(null);

        const civilite = ref([]);
        const pays = ref([]);
        const localite = ref([]);

        const skeleton = ref(false)

        const form = reactive({
            bien_id: '',
            type_operation_id: '',
            civilite_demandeur: '',
            nom_demandeur: '',
            prenom_demandeur: '',
            telephone_demandeur: '',
            email_demandeur: '',
            localite_id: '',
            pays_id: '',
            message_demandeur: '',
            profession : ''

        });

        const contactValues = reactive({
            nom: '',
            telephone: '',
            email: '',
            message: '',
            ville: '',
            profession: ''
        })

        const {
            resetFields
        } = useForm(form);

        const handleListeCivilite = () => {
            listeLocaliteFetcher(LISTE_CIVILITE).then((res) => {
                if (res) {
                    civilite.value = [];

                    res.map((value) => {
                        let el = {
                            value: value.id,
                            label: value.libelle_civilite
                        }
                        civilite.value.push(el)
                    })
                }
            })
        }

        const handleListeLocalite = () => {
            listeLocaliteFetcher(LISTE_LOCALITE).then((res) => {
                if (res) {
                    localite.value = [];

                    res.map((value) => {
                        let el = {
                            value: value.id,
                            label: value.libelle_localite
                        }
                        localite.value.push(el)
                    })
                }
            })
        }

        const handleListePays = () => {
            listeLocaliteFetcher(LISTE_PAYS).then((res) => {
                if (res) {
                    pays.value = [];

                    res.map((value) => {
                        let el = {
                            value: value.id,
                            label: value.libelle_pays
                        }
                        pays.value.push(el)
                    })
                }
            })
        }

        const changeVisible = () => {
            displayModal.value = true
        }

        const handleBienInfo = () => {
            skeleton.value = true;
            let data = new FormData();
            data.append('bien_slug', route.params.id);
            detailDuBien(data).then((res) => {
                if (res.status == "succes") {
                    bien.value = res.resultat;
                    data.append('bien_id', res.resultat.id);
                    proximite.value = JSON.parse (res.resultat.proximite)
                    photoBien(data).then((val) => {
                        skeleton.value = false;
                        photos.value = val.resultat;
                    });
                }
            });

        }

        onMounted(() => {
            handleBienInfo();
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            // console.log(pays.value)
            handleListeCivilite();
            handleListePays();
            handleListeLocalite();
        })

        const handleSubleDemande = () => {
            spinning.value = !spinning.value;

            let data = new FormData();

            data.append('bien_id', bien.value.id);
            data.append('type_operation_id', bien.value.type_operation_id);
            data.append('civilite_demandeur', form.civilite_demandeur);
            data.append('nom_demandeur', form.nom_demandeur);
            data.append('prenom_demandeur', form.prenom_demandeur);
            data.append('telephone_demandeur', form.telephone_demandeur);
            data.append('email_demandeur', form.email_demandeur);
            data.append('localite_id', form.localite_id);
            data.append('pays_id', form.pays_id);
            data.append('message_demandeur', form.message_demandeur);
            data.append('profession', form.profession);

            // alert (bien.value.id)

            enregistrerDemande(data).then((res) => {
                spinning.value = !spinning.value;
                if (res.status == "succes") {
                    notification.success({
                        message: res.status,
                        description: res.message
                    });
                    displayModal.value = false;
                    resetFields();
                } else {
                    notification.error({
                        message: res.status,
                        description: res.message
                    });
                }
            })
        }

        const afterClose = () => {
            resetFields();
            spinning.value = false;
        }

        const modalCancel = () => {
            displayModal.value = false;
        }

        const handleNousContacter = () => {
            if (contactValues.nom == '') {
                notification.error({
                    message: 'Le champs nom & prenom(s) est obligatoire',
                    placement: 'bottomRight'
                });
                return false;
            }

            if (contactValues.telephone == '') {
                notification.error({
                    message: 'Le champs téléphone est obligatoire',
                    placement: 'bottomRight'
                });
                return false;
            }

            if (contactValues.email == '') {
                notification.error({
                    message: 'Le champs email est obligatoire',
                    placement: 'bottomRight'
                });
                return false;
            }

            if (contactValues.message == '') {
                notification.error({
                    message: 'Le champs message est obligatoire',
                    placement: 'bottomRight'
                });
                return false;
            }

            // resetFields ()

            spinning.value = !spinning.value;

            processData(NOUS_CONTACTER, contactValues).then((res) => {
                spinning.value = !spinning.value;
                if (res.statut == 'succes') {
                    notification.success({
                        message: res.message
                    })
                    contactValues.nom = '';
                    contactValues.telephone = '';
                    contactValues.email = '';
                    contactValues.message = '';
                    contactValues.ville = '';
                    contactValues.profession = '';
                } else {
                    notification.error({
                        message: res.message,
                        placement: 'bottomRight'
                    })
                }
            })
        }

        return {
            modalCancel,
            displayModal,
            bien,
            spinning,
            changeVisible,
            formatteurMillier,
            moment,
            pays,
            civilite,
            form,
            localite,
            handleSubleDemande,
            afterClose,
            photos,
            API_FICHIER,
            contactValues,
            handleNousContacter,
            skeleton,
            ENREGISTRER_AVIS_BIEN,
            slide: ref(0),
            proximite
        }
    },
    data() {
        return {
            accueil: null
        }
    },
    methods: {
        getInfoAccueil() {
            processListeFetcher(INFO_ACCUEIL).then((res) => {
                this.accueil = res;
            })
        }
    },
    components: {
        Dialog,
        Button,
        StarOutlined,
        AvisForm
    },
    mounted() {
        this.getInfoAccueil()
    }

}
</script>

<style lang="scss">
@import '../../scss/_variable.scss';

.descrip-name {
    font-size: 25px;
    font-weight: 600;
    font-family: $fontFamily;
    color: $secondary_color;
    text-transform: uppercase;
    margin-bottom: 1rem !important;
}
</style>
