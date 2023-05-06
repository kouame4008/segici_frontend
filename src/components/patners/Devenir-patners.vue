<template>
<div class="top-tab-block">
    <div class="container">
        <div class="mt-4 row">
            <div class="col-12">
                <div class="nav-tab-block">
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <a class="nav-item nav-link active" id="who-we-tab" data-toggle="tab" href="#who-we" role="tab" aria-controls="who-we" aria-selected="true">
                            <div class="tab-info-block">
                                <div class="tab-info-icon"> <span class="icon"> <i class="fad fa-user-tag"></i></span> </div>
                                <div class="tab-info-text">
                                    <h2>PROPRIÉTAIRES</h2>
                                </div>
                            </div>
                        </a>
                        <a class="nav-item nav-link" id="what-we-tab" data-toggle="tab" href="#what-we" role="tab" aria-controls="what-we" aria-selected="false">
                            <div class="tab-info-block">
                                <div class="tab-info-icon"> <span class="icon"> <i class="fad fa-house-flood"></i></span> </div>
                                <div class="tab-info-text">
                                    <h2>ENTREPRISES IMMOBILIÈRES</h2>
                                </div>
                            </div>
                        </a>
                        <a class="nav-item nav-link" id="safety-tab" data-toggle="tab" href="#safety" role="tab" aria-controls="safety" aria-selected="false">
                            <div class="tab-info-block">
                                <div class="tab-info-icon"> <span class="icon"> <i class="fad fa-business-time"></i></span> </div>
                                <div class="tab-info-text">
                                    <h2>APPORTEURS D'AFFAIRES</h2>
                                </div>
                            </div>
                        </a>
                        <a class="nav-item nav-link" id="clients-tab" data-toggle="tab" href="#clients" role="tab" aria-controls="clients" aria-selected="false">
                            <div class="tab-info-block">
                                <div class="tab-info-icon"> <span class="icon"> <i class="fad fa-user-alt"></i></span> </div>
                                <div class="tab-info-text">
                                    <h2>PROMOTEURS HOTELIERS</h2>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="tab-content-block">
    <div class="container">
        <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="who-we" role="tabpanel" aria-labelledby="who-we-tab">
                <!-- PROPRIÉTAIRES -->
                <div class="col-12 col-lg-12 col-md-12">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="about-home-right-info">
                                <proprietaire />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="what-we" role="tabpanel" aria-labelledby="what-we-tab">
                <!--  -->
                <div class="col-12 col-lg-12 col-md-12">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="about-home-right-info">
                                <entreprise />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="safety" role="tabpanel" aria-labelledby="safety-tab">
                <!--  -->
                <div class="col-12 col-lg-12 col-md-12">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="about-home-right-info">
                                <affaires />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tab-pane fade" id="clients" role="tabpanel" aria-labelledby="clients-tab">
                <!--  -->
                <div class="col-12 col-lg-12 col-md-12">
                    <div class="about-home-right-info">
                        <h2 class="main-heading font-weight-bold" :style="{fontSize : '20px'}">PROMOTEUR HÔTELIER</h2>
                        <span class="av-sub-title">
                            <!-- Associer votre agence a votre plateforme en y referant vos <br> logements. Devenir partenaire -->
                        </span>
                        <div class="row">
                            <template v-for="(el, i) in promoH" :key="i">
                                <avantage :avantage="el.titre_avantage" :descrip="el.description_avantage" />
                            </template>
                        </div>

                        <div class="mt-4 row">
                            <a-button type="" class="a-button" size="large" @click="changeVisible ('PROMOTEUR HÔTELIER', 9) ">
                                DEVENIR PARTENAIRE
                                <ArrowRightOutlined style="position : relative; top : -4px" />
                            </a-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <a-modal v-model:visible="displayModal" :width="width" class="partenaire">
        <template #title>
            <h3> <strong>FORMULAIRE DE DEMANDE DE PARTENARIAT ({{ modalTitle }}) </strong> </h3>
        </template>

        <a-form class="form-demadne-location" :model="form">
            <div class="px-3 row">
                <div class="col-md-6">
                    <label for="">Nom</label>
                    <a-form-item>
                        <a-input v-model:value="form.nom_demandeur" class="inputItemField" placeholder="Nom" allow-clear />
                    </a-form-item>
                </div>

                <div class="col-md-6">
                    <label for="">Prénom(s)</label>
                    <a-form-item>
                        <a-input v-model:value="form.prenom_demandeur" class="inputItemField" placeholder="Prénom(s)" allow-clear />
                    </a-form-item>
                </div>

                <div class="col-md-6">
                    <label for="">Téléphone</label>
                    <a-form-item>
                        <a-input v-model:value="form.telephone_demandeur" class="inputItemField" placeholder="Téléphone" allow-clear />
                    </a-form-item>
                </div>

                <div class="col-md-6">
                    <label for="">Email</label>
                    <a-form-item>
                        <a-input v-model:value="form.email_demandeur" class="inputItemField" placeholder="Email" allow-clear />
                    </a-form-item>
                </div>

                <div class="col-md-6">
                    <label for="">Pays</label>
                    <a-form-item>
                        <a-select v-model:value="form.pays_demandeur" :options="pays" class="inputItemField" />
                    </a-form-item>
                </div>

                <div class="col-md-6">
                    <label for="">Ville</label>
                    <a-form-item>
                        <a-input v-model:value="form.ville_demandeur" class="inputItemField" placeholder="Ville" allow-clear />
                    </a-form-item>
                </div>
            </div>
        </a-form>

        <template #footer>
            <a-button @click="displayModal = false">ANNULER</a-button>
            <a-button type="primary" @click="handleSubmitDemande" :loading="loading">
                SOUMETTRE LES INFORMATIONS
            </a-button>
        </template>
    </a-modal>
</div>
</template>

<script>
import avantage from '../../components/Avantage.vue';
import {
    reactive,
    ref
} from '@vue/reactivity';
import {
    onMounted
} from '@vue/runtime-core';
import {
    processData
} from '../../data/process';
import {
    CREER_DEMANDE_PARTENAIRE,
    LISTE_AVANTAGE,
    LISTE_CIVILITE,
    LISTE_PAYS,
    LISTE_TYPE_PARTENAIRE
} from '../../router/APIrouter';
import {
    Form,
    notification
} from 'ant-design-vue';
import Proprietaire from '../Hotel/Proprietaire.vue';
import Entreprise from '../Hotel/Entreprise.vue';
import Affaires from '../Hotel/Affaires.vue';
import {
    listeLocaliteFetcher
} from '../../data/localite/localite-actions';

const useForm = Form.useForm;

export default {
    components: {
        avantage,
        Proprietaire,
        Entreprise,
        Affaires
    },
    setup() {
        const displayModal = ref(false);
        const width = ref('700px');
        const activeKey = ref('1')
        const activeKeyTabs2 = ref('3')
        const bienEnLocation = ref([])
        const bienEnVente = ref([])
        const AgenceImo = ref([])
        const promoImo = ref([])
        const entrepriseConst = ref([])
        const opeLotiss = ref([])
        const demarchImo = ref([])
        const particulier = ref([])
        const promoH = ref([])
        const modalTitle = ref('')
        const form = reactive({
            nom_demandeur: '',
            civilite_demandeur: '',
            prenom_demandeur: '',
            telephone_demandeur: '',
            email_demandeur: '',
            pays_demandeur: '',
            ville_demandeur: '',
            partenaire_type_id: '',
            profession : ''
        });
        const type_partenaire = ref()
        const loading = ref(false);

        const pays = ref([]);
        const civilite = ref([]);
        const partenaireType = ref([])

        const {
            resetFields
        } = useForm(form);

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

        const handleListeTypePartenaire = () => {
            listeLocaliteFetcher(LISTE_TYPE_PARTENAIRE).then((res) => {
                if (res) {
                    partenaireType.value = [];

                    res.map((value) => {
                        let el = {
                            value: value.id,
                            label: value.libelle_type_pat
                        }
                        partenaireType.value.push(el)
                    })
                }
            })
        }

        const changeVisible = (title, type) => {
            displayModal.value = true;
            modalTitle.value = title;
            type_partenaire.value = type;
        }

        const handleBienEnLocation = () => {

            // Bien en particulier
            let dataPH = new FormData();
            dataPH.append('type_avantage_id', 9)
            processData(LISTE_AVANTAGE, dataPH).then((res) => {
                promoH.value = res.resultat;
            })
        }

        const handleSubmitDemande = () => {
            loading.value = true
            let data = new FormData();
            data.append('civilite_demandeur', form.civilite_demandeur);
            data.append('nom_demandeur', form.nom_demandeur);
            data.append('prenom_demandeur', form.prenom_demandeur);
            data.append('telephone_demandeur', form.telephone_demandeur);
            data.append('email_demandeur', form.email_demandeur);
            data.append('ville_demandeur', form.ville_demandeur);
            data.append('profession', form.profession);
            data.append('partenaire_type_id', type_partenaire.value);

            processData(CREER_DEMANDE_PARTENAIRE, data).then((res) => {
                loading.value = false;
                if (res.status == "succes") {
                    displayModal.value = false;
                    resetFields();
                    notification.success({
                        message: 'Votre demande a bien été prise en compte. Vous serez contacté par un de nos conseillers.'
                    })
                } else {
                    notification.error({
                        message: res.message
                    })
                }
            })
        }

        onMounted(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            if (window.innerWidth < 800) {
                width.value = '400px';
            }

            handleBienEnLocation();
            handleListePays();
            handleListeCivilite();
            handleListeTypePartenaire()

        })

        return {
            displayModal,
            width,
            changeVisible,
            activeKey,
            activeKeyTabs2,
            bienEnLocation,
            bienEnVente,
            AgenceImo,
            promoImo,
            entrepriseConst,
            opeLotiss,
            demarchImo,
            particulier,
            promoH,
            modalTitle,
            handleSubmitDemande,
            form,
            loading,
            pays,
            civilite,
            partenaireType
        }
    },
}
</script>

<style>
.partenaire .ant-modal-content {
    background: #FFF !important;
}
</style>
