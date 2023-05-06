<template>
<div class="col-12 col-lg-12">
    <a-form class="form-maison">
        <div class="row justify-content-center" style=" margin-top: 18px !important;">
            <div class="col-md-2 col-xs-6 mb-3" v-if="operation == 2">
                <label for="">Type de bien</label>
                <a-form-item>
                    <a-select v-model:value="form.type_bien" placeholder="" class="inputItemField" @change="handleChangeType">
                        <a-select-option value=""> </a-select-option>
                        <a-select-option value="1">Maison</a-select-option>
                        <a-select-option value="2">Terrain</a-select-option>
                    </a-select>
                </a-form-item>
            </div>
            <div class="col-md-2 col-xs-6 mb-3" v-if="type_bien == 1">
                <label for="">Standing </label>
                <a-form-item>
                    <a-select v-model:value="form.standing" class="inputItemField">
                        <a-select-option value="7"> Bas standing </a-select-option>
                        <a-select-option value="8"> Moyen standing </a-select-option>
                        <a-select-option value="9"> Haut standing </a-select-option>
                    </a-select>
                </a-form-item>
            </div>

            <div class="col-md-2 col-xs-6 mb-3" v-if="type_bien == 1">
                <label for="">Type de maison </label>
                <a-form-item>
                    <a-select v-model:value="form.categorie" class="inputItemField" :options="maison">
                        <a-select-option value=""></a-select-option>
                    </a-select>
                </a-form-item>
            </div>

            <div class="col-md-2" v-if="operation == 2 && type_bien == 2">
                <label for="">Type terrain</label>
                <a-form-item>
                    <a-select placeholder="Type opération" v-model:value="form.type_terrain_id" class="inputItemField" :options="terrain">
                    </a-select>
                </a-form-item>
            </div>

            <div class="col-md-2 mb-3" v-if="operation == 2 && type_bien == 2">
                <label for=""> Localité </label>
                <a-form-item>
                    <a-select class="inputItemField" :options="localite" v-model:value="form.localite">
                        <a-select-option value=""></a-select-option>
                    </a-select>
                </a-form-item>
            </div>

            <div class="col-md-2 col-xs-6 mb-3" v-if="type_bien == 1">
                <label for=""> Nombre de pièces </label>
                <a-form-item>
                    <a-select class="inputItemField" v-model:value="form.pieces">
                        <a-select-option value="1">1</a-select-option>
                        <a-select-option value="2">2</a-select-option>
                        <a-select-option value="3">3</a-select-option>
                        <a-select-option value="4">4</a-select-option>
                        <a-select-option value="5">5</a-select-option>
                    </a-select>
                </a-form-item>
            </div>

            <div class="col-md-2">
                <label for="">Budget min</label>
                <a-form-item>
                    <a-input-number v-model="form.prix_min" placeholder="Budget min" class="inputItemField" />
                </a-form-item>
            </div>

            <div class="col-md-2">
                <label for="">Budget max</label>
                <a-form-item>
                    <a-input-number v-model="form.prix_max" placeholder="Budget max" class="inputItemField" />
                </a-form-item>
            </div>

            <div class="col-md-2 ">
                <label for="" style="opacity: 0;">Tranche</label>
            </div>
        </div>
        <div class="row justify-content-center mb-3">
            <div class="d-flex justify-content-center">
                <a-space>
                    <a-button size="large" class="search-btn m-0" @click="handleSubmit" :loading="loading">
                        <template #icon>
                            <SearchOutlined style="position : relative; top : -3px; font-size: 20px" />
                        </template>
                        Rechercher
                    </a-button>

                    <a-button size="large" type="danger" class="btn-danger-ant m-0" style="background : #f22b27" @click="handleEmpty">
                        <template #icon>
                            <RedoOutlined style="position : relative; top : -3px; font-size: 20px" />
                        </template>
                        Reinitialiser
                    </a-button>
                </a-space>
            </div>
        </div>
    </a-form>
</div>
</template>

<script>
import {
    reactive,
    ref
} from '@vue/reactivity'
import {
    localisation
} from '../../helpers/static-data';
import useMaison from '../../data/maison/use-maison';
import useLocalite from '../../data/localite/use-localite';
import {
    formatteurMillier
} from '../../helpers/ServicesHelpers';
import {
    RedoOutlined,
    SearchOutlined
} from '@ant-design/icons-vue';
import useTerrain from '../../data/terrain/use-terrain';
import useBien from '../../data/biens/use-bien';
import {
    watchEffect
} from 'vue';
import {
    getPrixMax
} from '../../data/biens/bien-action';

export default {
    props: {
        method: Function,
        operation: Number
    },
    components: {
        RedoOutlined,
        SearchOutlined
    },
    setup(props) {

        const min = ref(0);
        const max = ref(0);
        const loading = ref(false);
        const type_bien = ref(props.operation);
        // alert (props.operation)
        const options2 = ref(localisation);
        const {
            maison,
            erreurMaison
        } = useMaison();

        const {
            localite,
            erreurLocalite
        } = useLocalite()

        const {
            terrain,
            erreurTerrain
        } = useTerrain();

        const {
            biens
        } = useBien();

        const Filter = ref(biens)

        const form = reactive({
            categorie: '',
            localite: '',
            pieces: '',
            type_bien: props.operation + '',
            type_terrain_id: '',
            prix_min: '',
            prix_max: '',

        });

        const change = (value) => {
            console.log(value)
        }

        const handleSubmit = () => {
            let data = new FormData();

            data.append('type_maison_id', form.categorie)
            data.append('localite', form.localite)
            data.append('prix_bien_min', form.prix_min)
            data.append('prix_bien_max', form.prix_max)
            data.append('nombre_piece_maison', form.pieces)
            data.append('type_bien', form.type_bien)
            data.append('type_terrain_id', form.type_terrain_id)

            props.method(data)
        }

        const handleEmpty = () => {
            form.categorie = '';
            form.localite = '';
            form.pieces = '';
            form.categorie = '';
            form.prix_min = '';
            form.prix_max = '';
        }

        const handleChangeType = (val) => {
            type_bien.value = val
        }

        watchEffect(() => {
            getPrixMax().then((res) => {
                max.value = res.prix_max.prix_max;
                min.value = res.prix_min.prix_min;
                form.prix_min = res.prix_min.prix_min
                form.prix_max = res.prix_max.prix_max
            })
        })

        return {
            form,
            type_bien,
            maison,
            erreurMaison,
            options2,
            localite,
            min,
            max,
            loading,
            terrain,
            erreurTerrain,
            change,
            formatteurMillier,
            handleSubmit,
            handleEmpty,
            handleChangeType,
            erreurLocalite,
            Filter,
        }
    }

}
</script>

<style>
.ant-form-item {
    margin-bottom: 0 !important;
}
</style>
