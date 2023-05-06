<template>
<div class="main-content-wrapper ">
    <section class="my-4">
        <div class="container">
            <div class="row">
                <div class="col-md-5">
                    <div v-if="current && current.image_residence" class="image-box" @click="() => showImg(current.image_residence)">
                        <img v-if="current && current.image_residence" :src="API+'fichier/photo_de_bien/'+current.image_residence" alt="" class="img-fluid">
                        <div class="SquareOverlayLargeBox">
                            <CameraOutlined class="camera-two" /> AFFICHER TOUTES LES PHOTOS
                        </div>

                    </div>
                </div>
                <div class="col-md-7 p-0">
                    <div class="group-box d-flex mb-2">
                        <template v-if="current && current.images">
                            <template v-for="(image, i) in current.images" :key="i">
                                <span class="image-box px-1 small-box" v-if="[1,2,3].includes(i)" @click="() => showImg(image.nom_image)">
                                    <img :src="API+'fichier/photo_de_bien/'+image.nom_image" :alt="i" class="img-fluid ">
                                    <div class="SquareOverlay"></div>
                                </span>
                            </template>
                        </template>
                    </div>
                    <div class="group-box d-flex mt-2 justify-content-between">
                        <template v-if="current && current.images">
                            <template v-for="(image, i) in current.images" :key="i" @click="() => showImg(image.nom_image)">
                                <span class="image-box px-1 small-box" v-if="[4,5,6].includes(i)">
                                    <img :src="API+'fichier/photo_de_bien/'+image.nom_image" alt="" class="img-fluid ">
                                    <div class="SquareOverlay"></div>
                                </span>
                            </template>
                        </template>
                    </div>
                </div>

                <vue-easy-lightbox :visible="visible" :imgs="imgs" :index="index" @hide="handleHide"></vue-easy-lightbox>
            </div>
        </div>
    </section>
    <section class="my-4">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body d-flex justify-content-between" style="padding: 1rem">
                            <div class="ul-el">
                                <a href="#options">
                                    <span class="">Options</span>
                                </a>
                                <a href="">
                                    <span class="">Equipements</span>
                                </a>
                                <a href="">
                                    <span class="">Avis clients</span>
                                </a>
                                <a-button type="primary" shape="round" @click="openMaps">Voir sur la carte</a-button>
                            </div>
                            <div class="rpice">
                                <address class="m-0">
                                    {{ current && formatteurMillier (current.tarif) }}
                                </address>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body" style="padding: 1rem">
                            <a-typography>
                                <a-typography-title> {{ current && current.titre_residence }} <span class="star">
                                        <StarFilled />
                                        <StarFilled />
                                        <StarFilled /></span> </a-typography-title>
                                <hr>
                                <a-typography-paragraph>
                                    {{ current && current.description }}
                                </a-typography-paragraph>
                            </a-typography>
                        </div>
                    </div>
                </div>

                <div class="col-md-12" v-if="current && current.etat_occupation !== 1">
                    <div class="d-flex justify-content-center mt-3">
                        <a-button type="primary" shape="round" size="large" @click="handleVisible">
                            Reserver maintenant
                        </a-button>
                    </div>
                </div>

                <div class="col-md-12 mt-3">
                    <div class="card">
                        <div class="card-body" style="padding: 1rem">
                            <a-typography>
                                <a-typography-title :level="4"> Caractéristiques
                                </a-typography-title>
                                <hr>
                            </a-typography>

                            <a-descriptions>
                                <a-descriptions-item>
                                    <template #label>
                                        <strong> TYPE LOGEMENT </strong>
                                    </template>
                                    {{ current && current.libelle_type_maison }}
                                </a-descriptions-item>

                                <a-descriptions-item>
                                    <template #label>
                                        <strong>PAYS - VILLE </strong>
                                    </template>
                                    Côte d'ivoire, {{ current && current.libelle_localite }}
                                </a-descriptions-item>

                                <a-descriptions-item>
                                    <template #label>
                                        <strong>QUARTIER - SECTEUR </strong>
                                    </template>
                                    {{ current && current.quartier }} - {{ current && current.secteur }}
                                </a-descriptions-item>

                                <a-descriptions-item>
                                    <template #label>
                                        <strong> TARIF </strong>
                                    </template>
                                    {{ current && formatteurMillier (current.tarif) }}
                                </a-descriptions-item>
                            </a-descriptions>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body" style="padding: 1rem">
                            <a-typography>
                                <a-typography-title :level="4"> Options </a-typography-title>
                                <hr>
                                <div class="row">
                                    <template v-if="current && current.options">
                                        <div class="col-md-2" v-for="op in current.options" :key="op.id">
                                            <div class="d-flex flex-row text-center">
                                                <span class="icon-flex mb-3">
                                                    <CheckOutlined class="camera-two" style="color: green" />
                                                </span>
                                                <span class="text-option" style="color: #000">
                                                    {{ op.libelle_option }}
                                                </span>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </a-typography>
                        </div>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body" style="padding: 1rem">
                            <a-typography>
                                <a-typography-title :level="4"> Equipements </a-typography-title>
                                <hr>
                                <div class="row">
                                    <template v-if="current && current.equipements">
                                        <div class="col-md-2" v-for="op in current.equipements" :key="op.id">
                                            <div class="d-flex flex-row text-center">
                                                <span class="icon-flex mb-3">
                                                    <CheckOutlined class="camera-two" style="color: green" />
                                                </span>
                                                <span class="text-option" style="color: #000">
                                                    {{ op.libelle_equipement }}
                                                </span>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </a-typography>
                        </div>
                    </div>
                </div>

                <div class="col-md-12 mt-3">
                    <div class="card">
                        <div class="card-body" style="padding: 1rem">
                            <a-typography>
                                <a-typography-title :level="4"> Avis clients
                                </a-typography-title>
                                <hr>
                            </a-typography>
                        </div>
                    </div>
                </div>

                <a-modal v-model:visible="visibles" :footer="false" :destroyOnClose="true" @cancel="handleSetupCancel" width="800px" class="residence">
                    <template #title>
                        <strong>DEMANDE DE RESERVATION</strong>
                    </template>

                    <div class="alert" v-if="verif" :class="verifClass ? 'alert-success' : 'alert-danger'">
                        {{ verificationText }}
                    </div>

                    <a-form class="form-demadne-location detail-residence" @submit="handleSubmit" ref="formRef" :model="formState">
                        <div class="row">
                            <div class="col-md-9">
                                <label for="">Période de début</label>
                                <a-form-item ref="periode" name="periode" v-bind="validateInfos.periode">
                                    <a-range-picker :disabledDate="disabledDate" class="inputItemField" :locale="locale" :format="dateFormat" v-model:value="formState.periode" />
                                </a-form-item>
                            </div>

                            <div class="col-md-3">
                                <label for="" :style="{opacity : 0}">Période de début</label>
                                <a-button type="danger" :loading="verificationLoad" @click="handleVerification">Vérifier la disponibilité</a-button>
                            </div>

                            <div class="col-md-6">
                                <label for="">Civilité</label>
                                <a-form-item ref="civil" name="civil" v-bind="validateInfos.civil">
                                    <a-select v-model:value="formState.civil" class="inputItemField" :options="civilite"></a-select>
                                </a-form-item>
                            </div>

                            <div class="col-md-6">
                                <label for="">Nom</label>
                                <a-form-item ref="nom" name="nom" v-bind="validateInfos.nom">
                                    <a-input class="inputItemField" v-model:value="formState.nom" />
                                </a-form-item>
                            </div>

                            <div class="col-md-6">
                                <label for="">Prénom(s)</label>
                                <a-form-item ref="prenom" name="prenom" v-bind="validateInfos.prenom">
                                    <a-input class="inputItemField" v-model:value="formState.prenom" />
                                </a-form-item>
                            </div>

                            <div class="col-md-6">
                                <label for="">Email</label>
                                <a-form-item ref="email" name="email" v-bind="validateInfos.email">
                                    <a-input class="inputItemField" v-model:value="formState.email" />
                                </a-form-item>
                            </div>

                            <div class="col-md-6">
                                <label for="">Téléphone</label>
                                <a-form-item ref="telephone" name="telephone" v-bind="validateInfos.telephone">
                                    <a-input class="inputItemField" v-model:value="formState.telephone" />
                                </a-form-item>
                            </div>
                            <div class="col-md-6">
                                <label for="">Ville</label>
                                <a-form-item ref="ville" name="ville" v-bind="validateInfos.ville">
                                    <a-input class="inputItemField" v-model:value="formState.ville" />
                                </a-form-item>
                            </div>
                            <div class="col-md-4">
                                <label for="">Nombre de personne</label>
                                <a-form-item ref="nbre_personne" name="nbre_personne" v-bind="validateInfos.nbre_personne">
                                    <a-input class="inputItemField" v-model:value="formState.nbre_personne" />
                                </a-form-item>
                            </div>
                            <div class="col-md-4">
                                <label for="">Type de pièce</label>
                                <a-form-item ref="type_piece" name="type_piece" v-bind="validateInfos.type_piece">
                                    <a-input class="inputItemField" v-model:value="formState.type_piece" />
                                </a-form-item>
                            </div>
                            <div class="col-md-4">
                                <label for="">Numéro de pièce</label>
                                <a-form-item ref="numero_piece" name="numero_piece" v-bind="validateInfos.numero_piece">
                                    <a-input class="inputItemField" v-model:value="formState.numero_piece" />
                                </a-form-item>
                            </div>

                            <div class="col-md-12 mt-3">
                                <div class="d-flex justify-content-center">
                                    <a-button type="primary" shape="round" htmlType="submit" style="background : #00276e;border : 0" :loading="chargement">SOUMETTRE MA DEMANDE</a-button>
                                </div>
                            </div>

                        </div>
                    </a-form>

                </a-modal>

            </div>
        </div>
    </section>
</div>
</template>

<script>
import {
    processData
} from '../../data/residences/residence-action';
import {
    EP_VERIFIER_RESERVATION_RESIDENCE,
    FETCHER_RESIDENCE_BY_ID
} from '../../router/APIrouter';
import {
    API,
    DEMANDE_DE_RESERVATION
} from '../../router/APIrouter';
import {
    CameraOutlined,
    StarFilled,
    CheckOutlined
} from '@ant-design/icons-vue';
import {
    formatteurMillier
} from '../../helpers/ServicesHelpers';

import locale from "ant-design-vue/es/date-picker/locale/fr_FR";
import moment from "moment";
import {
    useRoute
} from 'vue-router';
import {
    reactive,
    ref
} from '@vue/reactivity';
import {
    onMounted
} from '@vue/runtime-core';
import useCivilite from '../../data/localite/use-civilite';
import {
    Form,
    notification
} from 'ant-design-vue';
import {
    processDataAuth
} from '../../data/process-auth';

const useForm = Form.useForm;

export default {
    setup() {
        const verif = ref(false)
        const verifClass = ref(false)
        const verificationText = ref('')
        const route = useRoute();
        const current = ref();
        const visibles = ref(false);
        const formRef = ref();
        const formState = reactive({
            civil: '',
            nom: '',
            prenom: '',
            email: '',
            telephone: '',
            periode: [],
            ville: '',
            nbre_personne: '',
            type_piece: '',
            numero_piece: ''
        });
        const verificationLoad = ref(false)
        const rules = {
            civil: [{
                required: true,
                message: 'Champs obligatoire !',
            }],
            nom: [{
                required: true,
                message: 'Champs obligatoire !',
            }],
            prenom: [{
                required: true,
                message: 'Champs obligatoire !',
            }],
            email: [{
                required: true,
                message: 'Champs obligatoire !',
            }],
            telephone: [{
                required: true,
                message: 'Champs obligatoire !',
            }],
            periode: [{
                required: true,
                message: 'Champs obligatoire !',
            }],
            ville: [{
                required: true,
                message: 'Champs obligatoire !',
            }],
            nbre_personne: [{
                required: true,
                message: 'Champs obligatoire !',
            }],
            type_piece: [{
                required: true,
                message: 'Champs obligatoire !',
            }],
            numero_piece: [{
                required: true,
                message: 'Champs obligatoire !',
            }],
        }
        const {
            resetFields,
            validateInfos,
            validate
        } = useForm(formState, rules);
        const {
            civilite
        } = useCivilite();
        const chargement = ref(false);

        const getItem = () => {
            let data = new FormData();
            data.append('residence_id', route.params.id);

            processData(FETCHER_RESIDENCE_BY_ID, data).then((res) => {
                current.value = res.resultat;
                // console.log(res.resultat)
            })
        }

        const handleSetupCancel = () => {
            visibles.value = false;
            resetFields();
        }

        const handleSubmit = () => {
            validate().then(() => {
                chargement.value = true;
                let data = new FormData();
                data.append('civilite', formState.civil);
                data.append('nom', formState.nom);
                data.append('prenom', formState.prenom);
                data.append('telephone', formState.telephone);
                data.append('email', formState.email);
                data.append('nbre_personne', formState.nbre_personne);
                data.append('type_piece', formState.type_piece);
                data.append('numero_piece', formState.numero_piece);
                data.append('dateDebut', moment(formState.periode[0]).format('YYYY-MM-DD'));
                data.append('dateFin', moment(formState.periode[1]).format('YYYY-MM-DD'));
                data.append('ville', formState.ville);
                data.append('residence_id', current.value.id);

                processData(DEMANDE_DE_RESERVATION, data).then((res) => {
                    chargement.value = false;
                    if (res.statut == 'succes') {
                        visibles.value = false;
                        notification.success({
                            message: res.message,
                        });
                        resetFields();
                    } else {
                        notification.error({
                            message: res.message,
                            placement: 'bottomRight'
                        })
                    }
                })
            })
        };

        const handleVisible = () => {
            visibles.value = true
        }

        const disabledDate = current => {
            // Can not select days before today and today
            return current && current <= moment().startOf('day')
        };

        const handleVerification = () => {
            verificationLoad.value = true;
            let data = new FormData();

            if (formState.periode.length == 2) {
                data.append('date_debut', moment(formState.periode[0]).format('YYYY-MM-DD'));
                data.append('date_fin', moment(formState.periode[1]).format('YYYY-MM-DD'));
                data.append('residence_id', current.value.id);

                processDataAuth(EP_VERIFIER_RESERVATION_RESIDENCE, data).then((res) => {
                    verificationLoad.value = false;
                    verif.value = true;

                    if (res.statut == 'succes') {
                        if (res.resultat == 0) {
                            notification.success({
                                message: 'Date disponible'
                            });
                            verifClass.value = true;
                            verificationText.value = "Cette date est disponible"
                        } else {
                            notification.error({
                                message: 'Date non disponible'
                            });
                            verifClass.value = false;
                            verificationText.value = "Cette date est indisponible"
                        }
                    }
                })
            } else {
                verificationLoad.value = false;
                notification.error({
                    message: 'Veuillez Selectionner les dates d\'arrivées et de départ avant de faire une vérification'
                })
            }

        }

        onMounted(() => {
            getItem();
        })

        return {
            visibles,
            formRef,
            formState,
            handleSubmit,
            civilite,
            handleSetupCancel,
            handleVisible,
            chargement,
            disabledDate,
            validateInfos,
            verificationLoad,
            handleVerification,
            verif,
            verifClass,
            verificationText
        }
    },
    data() {
        return {
            current: null,
            API,
            visible: false,
            index: 0, // default: 0
            imgs: [],
            formatteurMillier,
            center: {
                lat: 40.689247,
                lng: -74.044502
            },
            locale,
            moment,
            dateFormat: "DD/MM/YYYY",
        }
    },
    methods: {
        getFetcherItem() {
            let data = new FormData();
            data.append('residence_id', this.$route.params.id);

            processData(FETCHER_RESIDENCE_BY_ID, data).then((res) => {
                this.current = res.resultat;
            })
        },
        showImg(im) {
            this.imgs = [];

            this.imgs.push(
                API + 'fichier/photo_de_bien/' + im
            )
            this.current.images.forEach((item) => {
                this.imgs.push(API + 'fichier/photo_de_bien/' + item.nom_image)
            });
            this.index = 0
            this.visible = true
        },
        handleHide() {
            this.visible = false
        },
        openMaps() {
            window.open("https://maps.google.com?q=51.03841,-114.01679", '_bank')
        }

    },
    mounted() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
        this.getFetcherItem();
    },
    components: {
        CameraOutlined,
        StarFilled,
        CheckOutlined,
    },

}
</script>

<style lang="css">
.image-box {
    position: relative;
}

.image-box img {
    transition: all ease-in .3s;
}

.image-box:hover img {
    transition: all ease-in .3s;
}

.SquareOverlayLargeBox {
    background-color: rgba(0, 0, 0, .3) !important;
    transition: all ease-in .3s;
    cursor: pointer;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
}

.SquareOverlay,
.SquareOverlayLargeBox {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
    background: transparent;
    transition: all ease-in .3s;
}

.image-box:hover .SquareOverlay {
    background-color: rgba(0, 0, 0, .3);
    transition: all ease-in .3s;
    cursor: pointer;
}

.camera-two {
    position: relative;
    top: -1px;
    color: #FFF;
    margin-right: 5px;
    font-size: 20px
}

.ul-el a {
    display: inline-block;
    padding: 0 10px;
    color: #000;
    font-weight: 700;
    font-size: 15px;
}

.rpice {
    position: relative;
    width: 300px;
}

.rpice address {
    font-weight: 700;
    font-size: 16px;
    background: #00276e;
    padding: 5px 15px;
    border-radius: 3px;
    position: absolute;
    right: 10px;
    display: inline-block;
    top: -5px;
    color: #FFF;
}

body {
    background: #FFF !important;
}

.ant-typography {
    margin: 0 !important;
    color: rgb(0, 40, 112) !important;
}

.star {
    font-size: 16px;
    color: #ffa726 !important;
    position: relative;
    top: -8px
}

.ant-form-item-explain-success {
    display: none;
}

.residence .ant-modal-body {
    background-size: cover !important;
    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.78), rgb(255, 255, 255), rgba(255, 255, 255, 0.52)), url('../../assets/images/banner-2.jpg')
}

.detail-residence.ant-form label {
    color: #00276e !important;
    font-weight: bold !important;
}
</style>
