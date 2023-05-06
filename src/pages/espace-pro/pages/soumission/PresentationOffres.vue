<template>
<section v-if="!viewForm">
    <a-page-header :breadcrumb="{ routes }">
        <template #title>
            Liste des biens
        </template>
        <template #extra>
            <a-button type="primary" shape="round" @click="hanldeChangeView">Soumettre un bien</a-button>
        </template>
    </a-page-header>
    <section>
        <div class="row justify-content-center text-left">
            <a-form class="w-100 p-4" :model="search">
                <div class="row">
                    <div class="col-md-3">
                        <a-form-item>
                            <label for="" class="d-block text-left">Date début</label>
                            <a-date-picker v-model:value="search.dateDebut" class="inputItemField" :locale="locale" :format="dateFormat" />
                        </a-form-item>
                    </div>
                    <div class="col-md-3">
                        <a-form-item>
                            <label for="" class="d-block text-left">Date fin</label>
                            <a-date-picker v-model:value="search.dateFin" class="inputItemField" :locale="locale" :format="dateFormat" />
                        </a-form-item>
                    </div>
                    <div class="col-md-3">
                        <a-form-item>
                            <label for="" class="d-block text-left">Type Bien</label>
                            <a-select class="inputItemField" v-model:value="search.type_bien">
                                <a-select-option value=""></a-select-option>
                                <a-select-option value="1">MAISON</a-select-option>
                                <a-select-option value="2">TERRAIN</a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                    <div class="col-md-3">
                        <a-form-item>
                            <label for="" class="d-block text-left">Type Opération</label>
                            <a-select class="inputItemField" v-model:value="search.type_operation">
                                 <a-select-option value=""></a-select-option>
                                <a-select-option value="1">EN LOCATION</a-select-option>
                                <a-select-option value="2">EN VENTE</a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                    <div class="col-md-3">
                        <a-form-item>
                            <label for="" class="d-block text-left">Etat du bien</label>
                            <a-select class="inputItemField" v-model:value="search.etat_bien">
                                <a-select-option value="0">EN ATTENTE</a-select-option>
                                <a-select-option value="1">VALIDÉ</a-select-option>
                                <a-select-option value="2">PUBLIÉ</a-select-option>
                                <a-select-option value="3">EN VEDETTE</a-select-option>
                                <a-select-option value="4">EN PROMO</a-select-option>
                                <a-select-option value="10">REFUSÉ</a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                    <div class="col-md-2">
                        <a-form-item>
                            <label for="" class="d-block text-left" :style="{opacity : 0}">Date fin</label>
                            <a-space>
                                <a-button type="primary" size="large" @click="handleSearch" :loading="searchLoad">RECHERCHER</a-button>
                                <a-button type="link" size="large" class="text-danger" @click="handleSearch" :loading="searchLoad">réinitialiser</a-button>
                            </a-space>
                        </a-form-item>
                    </div>
                </div>
            </a-form>
        </div>
        <div class="row w-100">
            <div class="col-md-12">
                <a-table :loading="loading" :columns="columns" :data-source="biens" :row-key="record => record.id">
                    <template #indice="{index}">
                        <span style="color: #002870; font-weight: bold"> {{index+1}}</span>
                    </template>

                    <template #image_bien="{record}">
                        <span style="display:block; width: 60px; height: 60px">
                            <img v-if="record.image_bien != null" :src="API+'/fichier/photo_de_bien/'+record.image_bien" style="width: 60px; height: 60px; border-radius: 100px" @click="showImg (record)">
                            <img v-else :src="'/images/alouer.png'" style="width: 60px; height: 60px; border-radius: 100px">
                        </span>
                    </template>

                    <template #titre_bien="{record}">
                        <span style="color: #04a8fe; font-weight: bold; font-size: 12px">{{ record.titre_bien.slice(0, 30) }}</span>
                    </template>

                    <template #type_bien="{record}">
                        <a-tag v-if="record.type_bien==2" color="#87d068">
                            Terrain
                        </a-tag>
                        <a-tag v-else color="#108ee9">
                            Maison
                        </a-tag>
                    </template>

                    <template #prix_bien="{record}">
                        <span style="font-weight: bold; font-size: 12px"> {{ record.prix_bien }} FCFA </span>
                    </template>

                    <template #type_operation_id="{record}">
                        <a-tag v-if="record.type_operation_id==1" color="orange">
                            Location
                        </a-tag>
                        <a-tag v-else color="green">
                            Vente
                        </a-tag>
                    </template>

                    <template #etat_bien="{record}">
                        <a-tag v-if="record.etat_bien==0" color="purple">
                            <i class="feather icon-alert-circle"></i> En attente
                        </a-tag>
                        <a-tag v-if="record.etat_bien==1" color="pink">
                            <i class="feather icon-check"></i> Valider
                        </a-tag>
                        <a-tag v-if="record.etat_bien==2" color="blue">
                            <i class="feather icon-check-circle"></i> Publier
                        </a-tag>
                        <a-tag v-if="record.etat_bien==3" color="cyan">
                            <i class="feather icon-check-circle"></i> En vedette
                        </a-tag>
                        <a-tag v-if="record.etat_bien==10" color="red">
                            <i class="lnr lnr-cross"></i> Refuser
                        </a-tag>
                    </template>

                    <template #created_at="{record}">
                        <span>
                            {{moment(record.created_at).format ('DD/MM/YYYY') }}
                        </span>
                    </template>

                </a-table>
            </div>
        </div>
    </section>
</section>

<section v-if="viewForm">
    <a-page-header :breadcrumb="{ routes }">
        <template #title>
            Formilaire de soumission de biens
        </template>
        <template #extra>
            <a-button type="primary" shape="round" @click="hanldeChangeView">revenir à la liste des biens</a-button>
        </template>
    </a-page-header>
    <section>
        <div class="row text-left">
            <div class="col-md-12">
                <a-form class="form-maison" @submit.prevent="handleSubmitBien">
                    <div class="row">
                        <div class="col-md-3">
                            <label for="">Type de bien</label>
                            <a-form-item>
                                <a-select v-model:value="form.typebien" placeholder="" class="inputItemField" @change="handleActiveItem">
                                    <a-select-option value=""> </a-select-option>
                                    <a-select-option value="1">Maison</a-select-option>
                                    <a-select-option value="2">Terrain</a-select-option>
                                </a-select>
                            </a-form-item>
                        </div>

                        <div class="col-md-3" v-if="activeFormItem == 2">
                            <label for="">Type de terrain</label>
                            <a-form-item>
                                <a-select v-model:value="form.type_terrain_id" placeholder="Type de logement" class="inputItemField" :options="optionsTerrain"></a-select>
                            </a-form-item>
                        </div>

                        <div class="col-md-3">
                            <label for=""> Titre du bien </label>
                            <a-form-item>
                                <a-input v-model:value="form.titre" placeholder="Titre" class="inputItemField" />
                            </a-form-item>
                        </div>

                        <div class="col-md-3" v-if="activeFormItem == 2">
                            <label for=""> Titre de propriété </label>
                            <a-form-item>
                                <a-input v-model:value="form.titrepropriete" placeholder="Titre propriété" class="inputItemField" />
                            </a-form-item>
                        </div>

                        <div class="col-md-3 col-xs-6">
                            <label for="">Type opération</label>
                            <a-form-item>
                                <a-select v-model:value="form.typeoperation" placeholder="Opération" class="inputItemField" :options="option3"></a-select>
                            </a-form-item>
                        </div>
                        <div class="col-md-3" v-if="activeFormItem == 1">
                            <label for="">Type de logement</label>
                            <a-form-item>
                                <a-select v-model:value="form.typelogement" placeholder="Type de logement" class="inputItemField" :options="options"></a-select>
                            </a-form-item>
                        </div>

                        <div class="col-md-3">
                            <label for="">Prix du bien</label>
                            <a-form-item>
                                <a-input-number v-model:value="form.prix" placeholder="Prix" class="inputItemField" />
                            </a-form-item>
                        </div>

                        <div class="col-md-3">
                            <label for="">Localisation</label>
                            <a-form-item>
                                <a-select v-model:value="form.localisation" placeholder="Localisation" class="inputItemField" :options="optionsLocalite">
                                </a-select>
                            </a-form-item>
                        </div>

                        <div class="col-md-2" v-if="activeFormItem == 1">
                            <label for="">Nombre de pièce </label>
                            <a-form-item>
                                <a-input v-model:value="form.nombrepiece" placeholder="Nombre de pièce" class="inputItemField" />
                            </a-form-item>
                        </div>

                        <div class="col-md-2">
                            <label for="">Superficie du lot </label>
                            <a-form-item>
                                <a-input v-model:value="form.superficielot" placeholder="Sueperficie" class="inputItemField" />
                            </a-form-item>
                        </div>

                        <div class="col-md-2" v-if="activeFormItem == 1">
                            <label for="">Superficie bâtie </label>
                            <a-form-item>
                                <a-input v-model:value="form.superficiebatie" placeholder="Sueperficie" class="inputItemField" />
                            </a-form-item>
                        </div>

                        <div class="col-md-12">
                            <label for="">Equipements </label>
                            <a-form-item>
                                <a-select v-model:value="form.equipement_maison" placeholder="Localisation" size="large" :options="equipements" mode="multiple">
                                </a-select>
                            </a-form-item>
                        </div>

                        <div class="col-md-12 mt-3">
                            <label for="">Télécharger des Images</label>
                            <div class="clearfix">
                                <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" list-type="picture-card" v-model:file-list="fileList" @preview="handlePreview" :multiple="true" :before-upload="beforeUpload">
                                    <div v-if="fileList.length < 12">
                                        <plus-outlined />
                                        <div class="ant-upload-text">Choisir</div>
                                    </div>
                                </a-upload>
                                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                                    <img alt="example" style="width: 100%" :src="previewImage" />
                                </a-modal>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <label for="">Description du bien </label>
                            <a-form-item>
                                <a-textarea v-model:value="form.description" placeholder="Description du bien" class="textareaItemField" :rows="3" />
                            </a-form-item>
                        </div>

                        <div class="col-md-3">
                            <div class="d-flex justify-content-end">
                                <a-button size="large" class="search-btn" htmlType="submit" :loading="chargement">
                                    SOUMETTRE MON BIEN
                                </a-button>
                            </div>
                        </div>
                    </div>
                </a-form>
            </div>
        </div>
    </section>
</section>
<vue-easy-lightbox :visible="visibleImage" :imgs="imgs" :index="index" @hide="handleHide"></vue-easy-lightbox>
</template>

<script>
import {
    ref,
    reactive
} from '@vue/reactivity';
import {
    Form,
    notification
} from 'ant-design-vue';
import useMaison from "../../../../data/maison/use-maison";
import useEquipements from "../../../../data/maison/use-euipements";
import useOperation from "../../../..//data/operation/use-operation";
import useTerrain from "../../../../data/terrain/use-terrain";
import useLocalite from "../../../../data/localite/use-localite";
import {
    PlusOutlined
} from "@ant-design/icons-vue";
import {
    useStore,
} from 'vuex';
import {
    computed
} from '@vue/runtime-core';
import {
    processDataAuth
} from '../../../../data/process-auth';
import {
    EP_SOUMETTRE_BIEN,
    API,
    PHOTOS_BIEN,
    LISTE_BIEN_BACK_OFFICE
} from '../../../../router/APIrouter';
import useBienPatners from '../../../../data/biens/use-bien-patners';
import moment from 'moment';
import locale from "ant-design-vue/es/date-picker/locale/fr_FR";

const useForm = Form.useForm;

const routes = [{
    path: 'index',
    breadcrumbName: 'Presentation des offres',
}, ];

const columns = [{
        title: '#',
        key: 'indice',
        slots: {
            customRender: 'indice'
        },
    },
    {
        title: 'Image',
        key: 'image_bien',
        dataIndex: 'image_bien',
        slots: {
            customRender: 'image_bien'
        },
    },
    {
        title: 'Titre du bien',
        key: 'titre_bien',
        dataIndex: 'titre_bien',
        slots: {
            customRender: 'titre_bien'
        },
    },
    {
        title: 'Type',
        key: 'type_bien',
        dataIndex: 'type_bien',
        slots: {
            customRender: 'type_bien'
        },
    },
    {
        title: 'Prix',
        key: 'prix_bien',
        dataIndex: 'prix_bien',
        slots: {
            customRender: 'prix_bien'
        },
    },
    {
        title: 'Opération',
        key: 'type_operation_id',
        dataIndex: 'type_operation_id',
        slots: {
            customRender: 'type_operation_id'
        },
    },
    {
        title: 'Etat',
        key: 'etat_bien',
        dataIndex: 'etat_bien',
        slots: {
            customRender: 'etat_bien'
        },
    },
    {
        title: 'Créer le',
        key: 'created_at',
        dataIndex: 'created_at',
        slots: {
            customRender: 'created_at'
        },
    },
];

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });
}

export default {
    components: {
        PlusOutlined
    },
    setup() {
        const viewForm = ref(false);
        const visibleImage = ref(false)
        const activeFormItem = ref(1);
        const previewVisible = ref(false);
        const previewImage = ref("");
        const fileList = ref([]);
        const form = reactive({
            typebien: "1",
            titre: "",
            titrepropriete: "",
            superficie: "",
            typelogement: "",
            typeoperation: "",
            prix: "",
            localisation: "",
            nombrepiece: "",
            superficielot: "",
            superficiebatie: "",
            description: "",
            type_terrain_id: "",
            equipement_maison: [],
        });
        const imgs = ref([])
        const index = ref(0)
        const store = useStore();
        const chargement = ref(false);
        const user = computed(() => store.getters.getUserInfo);
        const search = reactive({
            dateDebut: '',
            dateFin: '',
            type_bien: '',
            type_operation: '',
            etat_bien: ''
        });
        const searchLoad = ref(false)

        const {
            biens,
        } = useBienPatners(user.value.partenaire_id);
        const {
            equipements
        } = useEquipements()

        const {
            resetFields
        } = useForm(form)

        const {
            maison
        } = useMaison();

        const {
            operation
        } = useOperation();

        const {
            terrain
        } = useTerrain();

        const {
            localite
        } = useLocalite();

        const option3 = ref(operation);
        const options = ref(maison);
        const optionsTerrain = ref(terrain);
        const optionsLocalite = ref(localite);

        const filterBien = computed(() => biens.value && biens.value.filter(item => item))

        const hanldeChangeView = () => {
            viewForm.value = !viewForm.value
        }

        const handlePreview = async (file) => {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }

            previewImage.value = file.url || file.preview;
            previewVisible.value = true;
        };

        const handleChange = ({
            fileList: newFileList
        }) => {
            fileList.value = newFileList;
        };

        const handleActiveItem = (value) => {
            activeFormItem.value = value;
        };

        const handleCancel = () => {
            previewVisible.value = false;
        };

        const handleSubmitBien = () => {
            chargement.value = true;

            let text = form.titre;
            let slugReplace = text.replace(/[, +()$~%.'":*?<>{}!]/g, '-');
            let slug = (slugReplace.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toLowerCase();

            let data = new FormData();
            data.append("type_bien", form.typebien);
            data.append("titre_bien", form.titre);
            data.append("prix_bien", form.prix);
            data.append("titre_propriete", form.titrepropriete);
            data.append("superficie_lot_maison", form.superficielot);
            data.append("type_maison_id", form.typelogement);
            data.append("type_operation_id", form.typeoperation);
            data.append("localite_id", form.localisation);
            data.append("nombre_piece_maison", form.nombrepiece);
            data.append("superficie_batie", form.superficiebatie);
            data.append("equipement_maison", form.equipement_maison);
            data.append("description_bien", form.description);
            data.append("type_terrain_id", form.type_terrain_id);
            data.append("bien_slug", slug);
            data.append("pomotion_immobiliere", 0);
            data.append("partenaire_id", user.value.partenaire_id);

            // console.log(fileList)
            let nbr_fichier = 0;
            const images = fileList.value;
            for (let index = 0; index < images.length; index++) {
                nbr_fichier++;
                const it = index + 1;
                // console.log ()
                // const element = images[index];
                // console.log (element)
                data.append(
                    "images_bien_" + it,
                    images[index].originFileObj,
                    images[index].originFileObj.name
                );
            }
            data.append('nbr_fichier', nbr_fichier);

            // , nbr_fichier, images_bien_1,

            processDataAuth(EP_SOUMETTRE_BIEN, data).then((res) => {
                chargement.value = false;
                if (res.status == "succes") {
                    notification.success({
                        message: res.message,
                    })
                    fileList.value = [];
                    resetFields();
                    viewForm.value = !viewForm.value;
                } else {
                    notification.error({
                        message: res.message,
                        placement: 'bottomRight'
                    })
                }
            });

        };

        const showImg = (record) => {
            imgs.value = [];
            let data = new FormData();
            data.append('bien_id', record.id);

            processDataAuth(PHOTOS_BIEN, data).then((res) => {
                if (res.status == "succes") {
                    res.resultat.forEach((item) => {
                        imgs.value.push(API + 'fichier/photo_de_bien/' + item.nom_image)
                    })
                    index.value = 0
                    visibleImage.value = true
                }
            })

        }

        const handleHide = () => {
            visibleImage.value = false;
        }

        const handleSearch = () => {
            searchLoad.value = true;
            let data = new FormData();
            if (search.dateDebut !== '') {
                data.append('date_fin', moment(search.dateFin).format('YYYY-MM-DD'));
            }
            if (search.dateFin !== '') {
                data.append('date_debut', moment(search.dateDebut).format('YYYY-MM-DD'));
            }

            if (search.type_bien !== '') {
                data.append('type_bien', search.type_bien);
            }

            if (search.etat_bien !== '') {
                data.append('etat_bien', search.etat_bien);
            }

            if (search.type_operation !== '') {
                data.append('type_operation_id', search.type_operation);
            }

            data.append('partenaire_id', user.value.partenaire_id);

            processDataAuth(LISTE_BIEN_BACK_OFFICE, data).then((res) => {
                searchLoad.value = false;
                if (res.status == "succes") {
                    biens.value = res.resultat
                }
            })
        }

        return {
            routes,
            viewForm,
            hanldeChangeView,
            activeFormItem,
            previewVisible,
            previewImage,
            fileList,
            form,
            chargement,
            resetFields,
            maison,
            operation,
            terrain,
            localite,
            option3,
            options,
            optionsTerrain,
            optionsLocalite,
            handlePreview,
            handleChange,
            handleActiveItem,
            handleCancel,
            handleSubmitBien,
            equipements,
            filterBien,
            columns,
            moment,
            API,
            visibleImage,
            imgs,
            index,
            handleHide,
            showImg,
            dateFormat: "DD/MM/YYYY",
            locale,
            search,
            handleSearch,
            searchLoad,
            biens
        }
    }
}
</script>

<style>

</style>
