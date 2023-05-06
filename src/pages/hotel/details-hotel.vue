<template>
<div class="main-content-wrapper residence">
    <section class="my-4">
        <div class="container">
            <div class="row">
                <div class="col-md-5">
                    <div v-if="current && current.image_hotel" class="image-box" @click="() => showImg(current.image_hotel)">
                        <img v-if="current && current.image_hotel" :src="API+'fichier/photo_de_bien/'+current.image_hotel" alt="" class="img-fluid">
                        <div class="SquareOverlayLargeBox">
                            <CameraOutlined class="camera-two" /> AFFICHER TOUTES LES PHOTOS
                        </div>

                    </div>
                </div>
                <div class="col-md-7 p-0">
                    <div class="group-box d-flex mb-2">
                        <template v-if="images.length > 0">
                            <template v-for="(image, i) in images" :key="i">
                                <span class="image-box px-1 small-box" v-if="[0,1,2].includes(i)" @click="() => showImg(image.image_hotel)">
                                    <img :src="API+'fichier/photo_de_bien/'+image.image_hotel" :alt="i" class="img-fluid " >
                                    <div class="SquareOverlay"></div>
                                </span>
                            </template>
                        </template>
                    </div>
                    <div class="group-box d-flex mt-2 justify-content-between">
                        <template v-if="images.length > 0">
                            <template v-for="(image, i) in images" :key="i">
                                <span class="image-box px-1 small-box" v-if="[3,4,5].includes(i)" @click="() => showImg(image.image_hotel)">
                                    <img :src="API+'fichier/photo_de_bien/'+image.image_hotel" alt="" class="img-fluid ">
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
            <div class="row d-none">
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
                            <div class="rpice d-none">
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
                                <a-typography-title> {{ current && current.nom_hotel }} <span class="star">
                                        <StarFilled />
                                        <StarFilled />
                                        <StarFilled /></span> </a-typography-title>
                                <hr>
                                <a-typography-paragraph>
                                    {{ current && current.description_hotel }}
                                </a-typography-paragraph>
                            </a-typography>
                        </div>
                    </div>
                </div>

                <div class="col-md-12 mt-3">
                    <div class="card">
                        <div class="card-body" style="padding: 1rem">
                            <chambres />
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body" style="padding: 1rem">
                            <a-typography>
                                <a-typography-title :level="4"> Equipements </a-typography-title>
                                <hr>
                                <div class="row">
                                    <template v-if="current && current.equipements">
                                        <div class="col-md-2" v-for="op in JSON.parse(current.equipements)" :key="op.id">
                                            <div class="d-flex flex-row text-center">
                                                <span class="icon-flex mb-3">
                                                    <CheckOutlined class="camera-two" style="color: green" />
                                                </span>
                                                <span class="text-option" style="color: #000">
                                                    {{ op }}
                                                </span>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </a-typography>
                        </div>
                    </div>
                </div>

                <div class="col-md-12 mt-3 d-none">
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

            </div>
        </div>
    </section>
</div>
</template>

<script>
import {
    DETAILS_HOTEL,
    LISTE_IMAGE_HOTEL
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
    processData
} from '../../data/process';
import Chambres from '../../components/Hotel/Chambres.vue';

const useForm = Form.useForm;

export default {
    setup() {
        const route = useRoute();
        const current = ref();
        const visibles = ref(false);
        const formRef = ref();
        const images = ref([]);
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
            data.append('hotel_id', route.params.id);

            processData(DETAILS_HOTEL, data).then((res) => {
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
                data.append('dateDebut', moment(formState.periode[0]).format('YYYY-MM-DD HH:mm:ss'));
                data.append('dateFin', moment(formState.periode[1]).format('YYYY-MM-DD HH:mm:ss'));
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

        const handleImages = () => {
            let data = new FormData();
            data.append('hotel_id', route.params.id);

            processData(LISTE_IMAGE_HOTEL, data).then((res) => {
                if (res.status == "succes") {
                    images.value = res.resultat;
                }
            })
        }

        onMounted(() => {
            getItem();
            handleImages()
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
            images,
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
            dateFormat: "DD/MM/YYYY HH:mm:ss",
        }
    },
    methods: {
        getFetcherItem() {
            let data = new FormData();
            data.append('hotel_id', this.$route.params.id);

            processData(DETAILS_HOTEL, data).then((res) => {
                this.current = res.resultat;
            })
        },
        showImg(im) {
            this.imgs = [];
            // alert (im)
            this.imgs.push(
                API + 'fichier/photo_de_bien/' + im
            )
            this.images.forEach((item) => {
                this.imgs.push(API + 'fichier/photo_de_bien/' + item.image_hotel)
            });

            console.log (this.imgs)
            this.index = 0
            this.visible = true
        },
        handleHide() {
            this.visible = false
        },
        openMaps() {
            window.open("https://maps.google.com?q=" + this.current.longitude_hotel + ',' + this.current.latitude_hotel, '_bank')
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
        Chambres
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
