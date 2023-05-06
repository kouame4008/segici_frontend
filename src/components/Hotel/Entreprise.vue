<template>
<ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item">
        <a class="nav-link active" id="agence-tab" data-toggle="tab" href="#agence" role="tab" aria-controls="agence" aria-selected="true">AGENCE IMMOBILIÈRE</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" id="promoteur-tab" data-toggle="tab" href="#promoteur" role="tab" aria-controls="promoteur" aria-selected="false">PROMOTEUR IMMOBILIER</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" id="construct-tab" data-toggle="tab" href="#construct" role="tab" aria-controls="construct" aria-selected="false">ENTREPRISE DE CONSTRUCTION</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" id="operateur-tab" data-toggle="tab" href="#operateur" role="tab" aria-controls="operateur" aria-selected="false">OPERATEUR DE LOTISSEMENT</a>
    </li>
</ul>

<div class="tab-content">
    <div class="tab-pane active" id="agence" role="tabpanel" aria-labelledby="agence-tab">
        <div class="mt-3">
            <div class="row">
                <template v-for="(el, i) in AgenceImo" :key="i">
                    <avantage :avantage="el.titre_avantage" :descrip="el.description_avantage" />
                </template>
            </div>

            <div class="mt-4 row">
                <a-button type="" class="a-button" size="large" @click="changeVisible ('AGENCE IMMOBILIÈRE', 3) " style="margin-left: 20px;">
                    DEVENIR PARTENAIRE
                    <ArrowRightOutlined style="position : relative; top : -4px" />
                </a-button>
            </div>
        </div>
    </div>
    <div class="tab-pane" id="promoteur" role="tabpanel" aria-labelledby="promoteur-tab">
        <div class="mt-3">
            <div class="row">
                <template v-for="(el, i) in promoImo" :key="i">
                    <avantage :avantage="el.titre_avantage" :descrip="el.description_avantage" />
                </template>
            </div>

            <div class="mt-4 row">
                <a-button type="" class="a-button" size="large" @click="changeVisible ('PROMOTEUR IMMOBILIER', 4) " style="margin-left: 20px;">
                    DEVENIR PARTENAIRE
                    <ArrowRightOutlined style="position : relative; top : -4px" />
                </a-button>
            </div>
        </div>
    </div>
    <div class="tab-pane" id="construct" role="tabpanel" aria-labelledby="construct-tab">
        <div class="mt-3">
            <div class="row">
                <template v-for="(el, i) in entrepriseConst" :key="i">
                    <avantage :avantage="el.titre_avantage" :descrip="el.description_avantage" />
                </template>
            </div>

            <div class="mt-4 row">
                <a-button type="" class="a-button" size="large" @click="changeVisible ('ENTREPRISE DE CONSTRUCTION', 5) " style="margin-left: 20px;">
                    DEVENIR PARTENAIRE
                    <ArrowRightOutlined style="position : relative; top : -4px" />
                </a-button>
            </div>
        </div>
    </div>
    <div class="tab-pane" id="operateur" role="tabpanel" aria-labelledby="operateur-tab">
        <div class="mt-3">
            <div class="row">
                <template v-for="(el, i) in opeLotiss" :key="i">
                    <avantage :avantage="el.titre_avantage" :descrip="el.description_avantage" />
                </template>
            </div>

            <div class="mt-4 row">
                <a-button type="" class="a-button" size="large" @click="changeVisible ('OPERATEUR DE LOTISSEMEN', 6) " style="margin-left: 20px;">
                    DEVENIR PARTENAIRE
                    <ArrowRightOutlined style="position : relative; top : -4px" />
                </a-button>
            </div>
        </div>
    </div>
</div>

<div class="tab-content-block" :style="{background : 'transparent !important', border : 0 }">
    <a-modal v-model:visible="displayModal" :width="width" class="partenaire">
        <template #title>
            <h3> <strong>FORMULAIRE DE DEMANDE DE PARTENARIAT ({{ modalTitle }}) </strong> </h3>
        </template>

        <a-form class="form-demadne-location" :model="form">
            <div class="px-3 row">
                <div class="col-md-6">
                    <label for="">Civilité</label>
                    <a-form-item>
                        <a-select v-model:value="form.civilite_demandeur" :options="civilite" class="inputItemField"></a-select>
                    </a-form-item>
                </div>

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
                    <label for="">Profession</label>
                    <a-form-item>
                        <a-input v-model:value="form.profession" class="inputItemField" placeholder="Profession" allow-clear />
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
import {
    listeLocaliteFetcher
} from '../../data/localite/localite-actions';

const useForm = Form.useForm;

export default {
    components: {
        avantage,
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
            profession: ''
        });
        const type_partenaire = ref()
        const loading = ref(false);

        const {
            resetFields
        } = useForm(form)

        const pays = ref([]);
        const civilite = ref([]);
        const partenaireType = ref([])

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

            // Bien en agence imo
            let dataAI = new FormData();
            dataAI.append('type_avantage_id', 3)
            processData(LISTE_AVANTAGE, dataAI).then((res) => {
                AgenceImo.value = res.resultat;
            })

            // Bien en promo imo
            let dataPI = new FormData();
            dataPI.append('type_avantage_id', 4)
            processData(LISTE_AVANTAGE, dataPI).then((res) => {
                promoImo.value = res.resultat;
            })

            // Bien en Entreprise de construction
            let dataEC = new FormData();
            dataEC.append('type_avantage_id', 5)
            processData(LISTE_AVANTAGE, dataEC).then((res) => {
                entrepriseConst.value = res.resultat;
            })

            // Bien en Operateur lotisse
            let dataOL = new FormData();
            dataOL.append('type_avantage_id', 6)
            processData(LISTE_AVANTAGE, dataOL).then((res) => {
                opeLotiss.value = res.resultat;
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

            // console.log(pays.value)

            handleBienEnLocation();

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
