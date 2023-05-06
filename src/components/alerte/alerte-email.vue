<template>
<a href="" @click.prevent="handleOpenModal">
    <div class="content-overlay"></div> <img class="content-image" src="@/assets/images/img/project-5.jpg" alt="project">
    <div class="content-details">
        <div class="alert-icon">
            <span class="as-icon">
                <i class="fa fa-bell" style="font-size : 30px"></i>
            </span>
        </div>
        <h3 class="content-title">Alerte SMS/E-MAIL</h3>
        <a href="@/pages/project-detail.html" class="learn-more-project-btn">
            Plus d'infos
            <ArrowRightOutlined style="position : relative; top : -4px" />
        </a>
    </div>
</a>
<a-modal v-model:visible="modalOpen" width="60vw" :destroyOnClose="true" :afterClose="afterClose" :footer="false">
    <template #title>
        <h3> <strong>ALERT SMS/E-MAIL </strong> </h3>
    </template>
    <a-spin :spinning="spinning">
        <a-form class="form-demadne-alert" :model="form" @submit.prevent="handleSubmitForm">
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
                    <label for="">Ville</label>
                    <a-form-item>
                        <a-input v-model:value="form.ville" class="inputItemField" placeholder="Ville" allow-clear />
                    </a-form-item>
                </div>

                 <div class="col-md-4">
                    <label for="">Profession</label>
                    <a-form-item>
                        <a-input v-model:value="form.profession" class="inputItemField" placeholder="Profession" allow-clear />
                    </a-form-item>
                </div>

                <div class="col-md-4">
                    <label for="">Type de bien</label>
                    <a-form-item>
                        <a-select placeholder="" class="inputItemField" v-model:value="form.type_bien">
                            <a-select-option value=""> </a-select-option>
                            <a-select-option value="1">Maison</a-select-option>
                            <a-select-option value="2">Terrain</a-select-option>
                        </a-select>
                    </a-form-item>
                </div>

                <div class="col-md-4" v-if="form.type_bien == 1">
                    <label for="">Standing</label>
                    <a-form-item>
                        <a-select v-model:value="form.standing_id" placeholder="Type de standing" class="inputItemField" :options="standings"></a-select>
                    </a-form-item>
                </div>

                <div class="col-md-4" v-if="form.type_bien == 1">
                    <label for="">Type de maison</label>
                    <a-form-item>
                        <a-select v-model:value="form.type_maison" placeholder="Type de maison" class="inputItemField" :options="options"></a-select>
                    </a-form-item>
                </div>

                <div class="col-md-4" v-if="form.type_bien == 2">
                    <label for="">Type de terrain</label>
                    <a-form-item>
                        <a-select v-model:value="form.type_terrain_id" placeholder="Type de logement" class="inputItemField" :options="optionsTerrain"></a-select>
                    </a-form-item>
                </div>

                <div class="col-md-4" v-if="form.type_bien == 1">
                    <label for="">Nombre de pièces</label>
                    <a-form-item>
                        <a-input v-model:value="form.nombre_pieces" class="inputItemField" placeholder="Nombre de pièces" allow-clear />
                    </a-form-item>
                </div>

                <div class="col-md-4">
                    <label for="">Budget max</label>
                    <a-form-item>
                        <a-input v-model:value="form.budget" class="inputItemField" placeholder="Budget max" allow-clear />
                    </a-form-item>
                </div>

                <div class="col-md-4">
                    <label for="">Superficie min</label>
                    <a-form-item>
                        <a-input v-model:value="form.superficie_min" class="inputItemField" placeholder="Superficie min" allow-clear />
                    </a-form-item>
                </div>
                <div class="col-md-4">
                    <label for="">Superficie max</label>
                    <a-form-item>
                        <a-input v-model:value="form.superficie_max" class="inputItemField" placeholder="Superficie max" allow-clear />
                    </a-form-item>
                </div>

                <div class="mt-4 col-md-12">
                    <div class="d-flex justify-content-center">
                        <Space>
                            <Button type="" size="large" @click="handleModalCancel">
                                ANNULER
                            </Button>
                            <Button type="primary" size="large" html-type="submit" :loading="loading">
                                SOUMETTRE LES INFORMATIONS
                            </Button>
                        </Space>
                    </div>
                </div>
            </div>
        </a-form>
    </a-spin>

</a-modal>
</template>

<script>
import {
    reactive,
    ref
} from '@vue/reactivity';
import {
    Button,
    Space,
    Form,
    notification
} from 'ant-design-vue';
import {
    processData
} from '../../data/process';
import {
    CREER_ALERTE,
    LISTE_CIVILITE,
    LISTE_MAISON,
    LISTE_OPERATION,
    LISTE_STANDING,
    LISTE_TERRAIN
} from '../../router/APIrouter';
import {
    listeLocaliteFetcher
} from '../../data/localite/localite-actions';
import {
    onBeforeMount
} from '@vue/runtime-core';
// import { processListeFetcher } from '../../data/process';

const {
    useForm
} = Form

export default {
    components: {
        Button,
        Space
    },
    setup() {
        const modalOpen = ref(false);
        const spinning = ref(false);
        const loading = ref(false);
        const form = reactive({
            civilite_demandeur: '',
            email_demandeur: '',
            telephone_demandeur: '',
            nom_demandeur: '',
            prenom_demandeur: '',
            superficie_max: '',
            superficie_min: '',
            budget: '',
            nombre_pieces: '',
            type_maison: '',
            type_bien: '',
            type_terrain_id: '',
            standing_id : '',
            ville : '',
            profession : ''
        });
        const civilite = ref([])
        const optionsTerrain = ref([])
        const operation = ref([])
        const options = ref([])
        const standings = ref([])


        const {
            resetFields
        } = useForm(form)


        const handleOpenModal = () => {
            modalOpen.value = true;
        }

        const handleModalCancel = () => {
            modalOpen.value = false;
            resetFields()
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

        const handleListeStanding = () => {
            listeLocaliteFetcher(LISTE_STANDING).then((res) => {
                if (res) {
                    standings.value = [];

                    res.map((value) => {
                        let el = {
                            value: value.id,
                            label: value.libelle_standing
                        }
                        standings.value.push(el)
                    })
                }
            })
        }

        const handleListeTerrain = () => {
            listeLocaliteFetcher(LISTE_TERRAIN).then((res) => {
                if (res) {
                    optionsTerrain.value = [];

                    res.map((value) => {
                        let el = {
                            value: value.id,
                            label: value.libelle_type_terrain
                        }
                        optionsTerrain.value.push(el)
                    })
                }
            })
        }

        const handleListeOperation = () => {
            listeLocaliteFetcher(LISTE_OPERATION).then((res) => {
                if (res) {
                    operation.value = [];

                    res.map((value) => {
                        let el = {
                            value: value.id,
                            label: value.libelle_type_operation
                        }
                        operation.value.push(el)
                    })
                }
            })
        }

        const handleListeMaison = () => {
            listeLocaliteFetcher(LISTE_MAISON).then((res) => {
                if (res) {
                    options.value = [];

                    res.map((value) => {
                        let el = {
                            value: value.id,
                            label: value.libelle_type_maison
                        }
                        options.value.push(el)
                    })
                }
            })
        }

        onBeforeMount(() => {
            handleListeCivilite()
            handleListeTerrain()
            handleListeMaison()
            handleListeOperation ();
            handleListeStanding ()
        })

        const handleSubmitForm = () => {
            loading.value = true;

            if (form.civilite_demandeur == "") {
                notification.error({
                    message: "Le champs Civilité est obligatoire"
                });
                loading.value = false;

                return false;
            }

            if (form.nom_demandeur == "") {
                notification.error({
                    message: "Le champs nom est obligatoire"
                });
                loading.value = false;
                return false;
            }

            if (form.prenom_demandeur == "") {
                notification.error({
                    message: "Le champs prenom est obligatoire"
                });
                loading.value = false;
                return false;
            }

            if (form.telephone_demandeur == "") {
                notification.error({
                    message: "Le champs téléphone est obligatoire"
                });
                loading.value = false;
                return false;
            }

            processData(CREER_ALERTE, form).then((res) => {
                if (res.status == "succes") {
                    loading.value = false;
                    resetFields();
                    modalOpen.value = false;
                    notification.success({
                        message: res.message
                    })
                } else {
                    loading.value = false;
                    notification.error({
                        message: res.message
                    })
                }
            });
        }

        return {
            modalOpen,
            spinning,
            form,
            civilite,
            operation,
            handleOpenModal,
            handleSubmitForm,
            optionsTerrain,
            options,
            loading,
            handleModalCancel,
            standings
        }
    }
}
</script>

<style>

</style>
