<template>
<section class="main-search-area rechercher">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="main-search-area-inner">
                    <div class="row">
                        <div class="col-xs-12 w-100">
                            <nav>
                                <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                    <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">RECHERCHER UN BIEN</a>
                                </div>
                            </nav>
                            <div class="px-3 py-3 tab-content px-sm-0" id="nav-tabContent">
                                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                    <a-form :model="formMaison" ref="Formref" class="form-maison" @submit.prevent="handleRechercheMaison">
                                        <div class="row">
                                            <div class="col-md-3 col-xs-6">
                                                <label for="">Type de bien</label>
                                                <a-form-item>
                                                    <a-select v-model:value="formMaison.type_bien" placeholder="" class="inputItemField" @change="handleActiveItem" allowClear>
                                                        <a-select-option value=""> </a-select-option>
                                                        <a-select-option value="1">Maison</a-select-option>
                                                        <a-select-option value="2">Terrain</a-select-option>
                                                    </a-select>
                                                </a-form-item>
                                            </div>

                                            <div class="col-md-3" v-if="activeFormItem == 1">
                                                <label for="">Standing</label>
                                                <a-form-item>
                                                    <a-select v-model:value="formMaison.standing_id" placeholder="Type de standing" class="inputItemField" :options="standings" allowClear>
                                                    </a-select>
                                                </a-form-item>
                                            </div>

                                            <div class="col-md-3 col-xs-6">
                                                <label for="">Type opération</label>
                                                <a-form-item>
                                                    <a-select v-model.value="formMaison.type_operation_id" placeholder="Type opération" class="inputItemField" :options="operation" allowClear>
                                                    </a-select>
                                                </a-form-item>
                                            </div>

                                            <div class="col-md-3" v-if="activeFormItem == 1">
                                                <label for="">Type de logement</label>
                                                <a-form-item>
                                                    <a-select v-model:value="formMaison.type_maison_id" placeholder="Type de logement" class="inputItemField" :options="options" allowClear>
                                                    </a-select>
                                                </a-form-item>
                                            </div>

                                            <div class="col-md-3" v-if="activeFormItem == 2">
                                                <label for="">Type terrain</label>
                                                <a-form-item>
                                                    <a-select placeholder="Type opération" v-model:value="formMaison.type_terrain_id" class="inputItemField" :options="optionsTerrain" allowClear>
                                                    </a-select>
                                                </a-form-item>
                                            </div>

                                            <div class="col-md-3">
                                                <label for="">Localité</label>
                                                <a-form-item>
                                                    <a-select v-model:value="formMaison.localite" placeholder="Localité" class="inputItemField" :options="optionsLocalite" allowClear>
                                                    </a-select>
                                                </a-form-item>
                                            </div>

                                            <div class="col-md-3" v-if="activeFormItem == 1">
                                                <label for="">Nombre de pièce </label>
                                                <a-form-item>
                                                    <a-input v-model:value="formMaison.nombre_piece_maison" placeholder="Nombre de pièce" class="inputItemField" />
                                                </a-form-item>
                                            </div>

                                            <div class="col-md-3" v-if="activeFormItem == 2">
                                                <label for="">Superficie </label>
                                                <a-form-item>
                                                    <a-input v-model:value="formMaison.superficie_terrain" placeholder="Sueperficie" class="inputItemField" />
                                                </a-form-item>
                                            </div>

                                            <div class="col-md-3" v-if="activeFormItem == 1">
                                                <label for="">Superficie du lot </label>
                                                <a-form-item>
                                                    <a-input v-model:value="formMaison.superficie_lot_maison" placeholder="Sueperficie" class="inputItemField" />
                                                </a-form-item>
                                            </div>

                                            <div class="col-md-3" v-if="activeFormItem == 1">
                                                <label for="">Superficie bâtie </label>
                                                <a-form-item>
                                                    <a-input v-model:value="formMaison.superficie_batie" placeholder="Sueperficie" class="inputItemField" />
                                                </a-form-item>
                                            </div>

                                            <div class="col-md-3">
                                                <label for="">Budget min</label>
                                                <a-form-item>
                                                    <a-input-number v-model:value="formMaison.prix_bien_min" placeholder="Budget min" class="inputItemField" />
                                                </a-form-item>
                                            </div>

                                            <div class="col-md-3">
                                                <label for="">Budget max</label>
                                                <a-form-item>
                                                    <a-input-number v-model:value="formMaison.prix_bien_max" placeholder="Budget max" class="inputItemField" />
                                                </a-form-item>
                                            </div>

                                            <div class="col-md-3">
                                                <div class="d-flex justify-content-end">
                                                    <a-button size="large" class="search-btn" html-type="submit" :loading="chargement">
                                                        RECHERCHER
                                                    </a-button>
                                                </div>
                                            </div>
                                        </div>
                                    </a-form>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import {
    ref,
} from '@vue/reactivity';
import {
  onBeforeMount,
    reactive
} from 'vue';
import {
    rechercherBien
} from '../../data/biens/bien-action';
// import { useToast } from "primevue/usetoast";
import {
    notification
} from 'ant-design-vue';
import {
    useRouter
} from 'vue-router';
import {
    useStore
} from 'vuex';
import { LISTE_LOCALITE, LISTE_MAISON, LISTE_OPERATION, LISTE_STANDING, LISTE_TERRAIN } from '../../router/APIrouter';
import { listeLocaliteFetcher } from '../../data/localite/localite-actions';

export default {
    setup() {
        const Formref = ref();
        const chargement = ref(false);
        const router = useRouter();
        const store = useStore();
        // const toast = useToast();

        const operation = ref([]);
        const options = ref([]);
        const optionsTerrain = ref([]);
        const optionsLocalite = ref([]);
        const standings = ref([]);
        const activeFormItem = ref(1);

        const formMaison = reactive({
            type_operation_id: '',
            type_bien: '1',
            type_terrain_id: '',
            type_maison_id: '',
            localite: '',
            superficie_terrain: '',
            superficie_lot_maison: '',
            superficie_batie: '',
            prix_bien_min: '',
            prix_bien_max: '',
            nombre_piece_maison: '',
            standing_id : ''
        });

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

         const handleListeLocalite = () => {
            listeLocaliteFetcher(LISTE_LOCALITE).then((res) => {
                if (res) {
                    optionsLocalite.value = [];

                    res.map((value) => {
                        let el = {
                            value: value.id,
                            label: value.libelle_localite
                        }
                        optionsLocalite.value.push(el)
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

        onBeforeMount(() => {
            handleListeLocalite()
            handleListeTerrain()
            handleListeMaison()
            handleListeOperation();
            handleListeStanding ()
        })
        

        // Methods
        const handleRechercheMaison = () => {
            chargement.value = !chargement.value
            let data = new FormData();
            data.append('type_operation_id', formMaison.type_operation_id)
            data.append('type_bien', formMaison.type_bien)
            data.append('type_terrain_id', formMaison.type_terrain_id)
            data.append('type_maison_id', formMaison.type_maison_id)
            data.append('superficie_terrain', formMaison.superficie_terrain)
            data.append('localite', formMaison.localite)
            data.append('superficie_lot_maison', formMaison.superficie_lot_maison)
            data.append('superficie_batie', formMaison.superficie_batie)
            data.append('prix_bien_min', formMaison.prix_bien_min)
            data.append('prix_bien_max', formMaison.prix_bien_max)
            data.append('nombre_piece_maison', formMaison.nombre_piece_maison)
            data.append('standing_id', formMaison.standing_id)

            rechercherBien(data).then((res) => {
                chargement.value = !chargement.value
                if (res.status === 'succes') {
                    if (res.resultat.length == 0) {
                        notification.info({
                            message: 'Information',
                            description: 'Aucun resultat trouvé pour cette recherche'
                        })
                    }

                    if (res.resultat.length > 0) {
                        // let data = res.resultat;
                        console.log('recherche1', res.resultat)
                        store.dispatch('actionRechercheResultat', res.resultat);
                        router.push({
                            name: 'ResultatListeBien',
                            params: {
                                data: 'rechercher_un_bien'
                            }
                        })
                        
                    }
                } else {
                    console.log(res)
                }
            })
        }

        const handleActiveItem = (value) => {
            // alert()
            activeFormItem.value = value
        }

        return {
            options,
            optionsLocalite,
            optionsTerrain,
            formMaison,
            Formref,
            chargement,
            activeFormItem,
            handleRechercheMaison,
            handleActiveItem,
            operation,
            standings
        }
    }
}
</script>

<style>

</style>
