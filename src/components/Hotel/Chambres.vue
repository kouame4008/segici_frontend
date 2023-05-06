<template>
<section>
    <a-typography>
        <a-typography-title :level="4"> {{chambres && chambres.length }} CHAMBRE(S) DISPONIBLE(S)
        </a-typography-title>
        <hr>
    </a-typography>

    <div class="row">
        <div class="col-md-4" v-for="chambre in chambres" :key="chambre.id">
            <card-chambre :item="chambre" @method="handleVisible(chambre)" />
        </div>
    </div>
    <hr>
    <a-modal v-model:visible="visibles" :footer="false" :destroyOnClose="true" @cancel="handleSetupCancel" width="800px" class="residence">
        <template #title>
            <strong>DEMANDE DE RESERVATION ({{ current && current.libelle_salle }}) </strong>
        </template>

        <div class="alert" v-if="verif" :class="verifClass ? 'alert-success' : 'alert-danger'">
            {{ verificationText }}
        </div>

        <a-form class="form-demadne-location detail-residence" @submit="handleSubmit" ref="formRef" :model="formState">
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-8">
                            <label for="">Date d'arrivée et de depart</label>
                            <a-form-item ref="periode" name="periode" v-bind="validateInfos.periode">
                                <a-range-picker :disabledDate="disabledDate" class="inputItemField" :locale="locale" :format="dateFormat" v-model:value="formState.periode" />
                            </a-form-item>
                        </div>

                        <div class="col-md-3">
                            <label for="" :style="{opacity : 0}">Période de début</label>
                            <a-button type="danger" size="large" :loading="verificationLoad" @click="handleVerification">Vérifier la disponibilité</a-button>
                        </div>
                    </div>
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
                    <a-form-item>
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
                    <a-form-item>
                        <a-input class="inputItemField" v-model:value="formState.ville" />
                    </a-form-item>
                </div>
                <div class="col-md-4">
                    <label for="">Nombre de personne</label>
                    <a-form-item>
                        <a-select class="inputItemField" v-model:value="formState.nbre_personne">
                            <a-select-option v-for="i in 7" :key="i" :value="i"> {{i}} </a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
                <div class="col-md-4">
                    <label for="">Nombre d'adulte</label>
                    <a-form-item>
                        <a-input class="inputItemField" v-model:value="formState.nombre_adulte" />
                    </a-form-item>
                </div>
                <div class="col-md-4">
                    <label for=""> {{ enfant }} </label>
                    <a-form-item>
                        <a-input class="inputItemField" v-model:value="formState.nombre_enfant" />
                    </a-form-item>
                </div>

                <div class="col-md-12 mt-3">
                    <div class="d-flex justify-content-center">
                        <a-button type="primary" shape="round" htmlType="submit" style="background : #00276e;border : 0" :loading="chargement">SOUMETTRE MA DEMANDE DE RESERVATION</a-button>
                    </div>
                </div>

            </div>
        </a-form>

    </a-modal>
    <vue-easy-lightbox :visible="visible" :imgs="imgs" :index="index" @hide="handleHide"></vue-easy-lightbox>
</section>
</template>

<script>
import {
    processData,
    processListeFetcher
} from '../../data/process'
import {
    LISTE_SALLE_HOTEL_URL,
    API,
    DEMANDE_CHALBRE_HOTEL,
    EP_VERIFICATION_HOTEL,
    LISTE_CIVILITE
} from '../../router/APIrouter';

import {
    formatteurMillier
} from '../../helpers/ServicesHelpers';
import locale from "ant-design-vue/es/date-picker/locale/fr_FR";
import moment from "moment";
import {
    reactive,
    ref
} from '@vue/reactivity';
// import useCivilite from '../../data/localite/use-civilite';
import {
    Form,
    notification
} from 'ant-design-vue';
import cardChambre from './card-chambre.vue';
import {
    processDataAuth
} from '../../data/process-auth';
import {
    onBeforeMount
} from '@vue/runtime-core';

const useForm = Form.useForm;

export default {
    components: {
        cardChambre
    },
    setup() {
        const visibles = ref(false);
        const enfant = ref('Nombre d\'enfant < 15ans')
        const formRef = ref();
        const current = ref();
        const civilite = ref([]);
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
            numero_piece: '',
            nombre_adulte: '',
            nombre_enfant: ''
        });
        const verif = ref(false)
        const verifClass = ref(false)
        const verificationText = ref('')
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
            telephone: [{
                required: true,
                message: 'Champs obligatoire !',
            }],
            periode: [{
                required: true,
                message: 'Champs obligatoire !',
            }],

        }

        const {
            resetFields,
            validateInfos,
            validate
        } = useForm(formState, rules);

        // const {

        // } = useCivilite();
        const chargement = ref(false);

        const handleSetupCancel = () => {
            visibles.value = false;
            resetFields();
        }

        const handleVerification = () => {
            verificationLoad.value = true;
            let data = new FormData();

            if (formState.periode.length == 2) {
                data.append('date_debut', moment(formState.periode[0]).format('YYYY-MM-DD'));
                data.append('date_fin', moment(formState.periode[1]).format('YYYY-MM-DD'));
                data.append('residence_id', current.value.id);

                processDataAuth(EP_VERIFICATION_HOTEL, data).then((res) => {
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

        const handleSubmit = () => {
            validate().then(() => {
                chargement.value = true;
                let data = new FormData();
                data.append('civilite_demandeur', formState.civil);
                data.append('nom_demandeur', formState.nom);
                data.append('prenom_demandeur', formState.prenom);
                data.append('telephone_demandeur', formState.telephone);
                data.append('email_demandeur', formState.email);
                data.append('nombre_personne', formState.nbre_personne);
                data.append('type_piece_demandeur', formState.type_piece);
                data.append('numero_piece_demandeur', formState.numero_piece);
                data.append('nombre_adulte', formState.nombre_adulte);
                data.append('nombre_enfant', formState.nombre_enfant);
                data.append('date_debut', moment(formState.periode[0]).format('YYYY-MM-DD'));
                data.append('date_fin', moment(formState.periode[1]).format('YYYY-MM-DD'));
                data.append('ville', formState.ville);
                data.append('chambre_id', current.value.id);

                processData(DEMANDE_CHALBRE_HOTEL, data).then((res) => {
                    chargement.value = false;
                    if (res.status == 'succes') {
                        visibles.value = false;
                        notification.success({
                            message: res.message,
                        });
                        resetFields();
                        verif.value = false
                        verifClass.value = false;
                        verificationText.value = ""
                    } else {
                        notification.error({
                            message: res.message,
                            placement: 'bottomRight'
                        })
                    }
                })
            })
        };

        const handleVisible = (chambre) => {
            // alert ()
            visibles.value = true,
                current.value = chambre;
        }

        const disabledDate = current => {
            // Can not select days before today and today
            return current && current <= moment().startOf('day')
        };

        const handleCivilite = () => {
            processListeFetcher(LISTE_CIVILITE).then((res) => {
                res.map((value) => {
                    let civil = {
                        id: value.id,
                        label: value.libelle_civilite,
                        value: value.id,
                    };

                    civilite.value.push(civil);
                })
            })
        }

        onBeforeMount(() => {
            handleCivilite();
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
            locale,
            current,
            dateFormat: "DD/MM/YYYY",
            handleVerification,
            verifClass,
            verificationText,
            verif,
            verificationLoad,
            enfant,
            handleCivilite
        }
    },
    data() {
        return {
            chambres: [],
            API,
            formatteurMillier
        }
    },
    methods: {
        getListeChambre() {
            let data = new FormData();
            data.append('hotel_id', this.$route.params.id);

            processData(LISTE_SALLE_HOTEL_URL, data).then((res) => {
                if (res.status == 'succes') {
                    this.chambres = res.resultat;
                }
            })
        },
        showImg(index) {
            this.imgs = [];
            this.images.forEach((item) => {
                this.imgs.push(API + 'fichier/photo_de_bien/' + item.image_hotel)
            });
            this.index = index
            this.visible = true
        },
    },
    mounted() {
        // alert (this.$route.params.id)
        this.getListeChambre()
    }
}
</script>

<style>
tbody {
    background: #f5fcff;
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
