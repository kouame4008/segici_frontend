<template>
<section id="Accueil">
    <!--div id="loading"> <img id="loading-image" src="@/assets/images/loader.svg" alt="Loading@." /> </div-->

    <div class="main-content-wrapper">
        <section class="breadcrumb-section about">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-lg-10">
                        <div class="breadcrumb-wrapper">
                            <h2>
                                Vous souhaitez vendre ou louer votre bien. Remplissez ce
                                formulaire de contact
                            </h2>
                            <nav>
                                <ul>
                                    <li class="breadcrumb-item"><a href="#">Accueil</a></li>
                                    <li class="breadcrumb-item active">
                                        <a href="#">Biens</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-lg-6 col-md-6">
                        <div class="about-home-right-info">
                            <h2 class="main-heading m-0"> {{ accueil && accueil.bien_titre }}</h2>
                            <hr />
                            <p>
                                {{ accueil && accueil.bien_description }}
                            </p>
                        </div>
                    </div>

                    <div class="col-12 col-lg-6 col-md-6">
                        <div class="about-info-left">
                            <!-- <div class="tab-content" id="nav-tabContent">
                                <div class="tab-pane fade show active" id="who-we" role="tabpanel" aria-labelledby="who-we-tab">
                                    <div class="tab-content-wrapper">
                                        <h2></h2>
                                    </div>
                                </div>
                            </div> -->
                             <img v-if="accueil && accueil.image_bien" :src="API+'fichier/besoin/'+accueil.image_bien" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <h2 class="main-heading m-0">FORMULAIRE DE PROPOSITION DE BIEN</h2>
                <hr />
                <div class="row bg-white p-4">
                    <div class="col-xs-12 w-100">
                        <nav>
                            <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">PROPOSER UN BIEN</a>
                                <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">NOUS CONTACTER</a>
                            </div>
                        </nav>
                        <div class="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <a-form class="form-maison" @submit.prevent="handleSubmitBien">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <label for=""> Nom </label>
                                            <a-form-item>
                                                <a-input v-model:value="form.nom" placeholder="Nom" class="inputItemField" />
                                            </a-form-item>
                                        </div>
                                        <div class="col-md-3">
                                            <label for=""> Prénom(s) </label>
                                            <a-form-item>
                                                <a-input v-model:value="form.prenom" placeholder="Prénom(s)" class="inputItemField" />
                                            </a-form-item>
                                        </div>
                                        <div class="col-md-3">
                                            <label for=""> Téléphone </label>
                                            <a-form-item>
                                                <a-input v-model:value="form.telephone" placeholder="Téléphone" class="inputItemField" />
                                            </a-form-item>
                                        </div>
                                        <div class="col-md-3">
                                            <label for=""> Email </label>
                                            <a-form-item>
                                                <a-input v-model:value="form.email" placeholder="Email" class="inputItemField" />
                                            </a-form-item>
                                        </div>
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
                                                <a-textarea v-model:value="form.equipement_maison" placeholder="Sueperficie" class="inputItemField" :rows="3" />
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
                                                <a-textarea v-model:value="form.description" placeholder="Description du bien" class="textareaItemField" rows="6" />
                                            </a-form-item>
                                        </div>

                                        <div class="col-md-12 mt-3">
                                            <label for=""> </label>
                                            <a-form-item>
                                                <a-checkbox v-model:checked="form.checked">
                                                    J'accepte le traitement de mes données
                                                    personnelles.</a-checkbox>
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
                            <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                <nous-contacter />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</section>
</template>

<script>
import {
    reactive,
    ref
} from "@vue/reactivity";
import {
    useToast
} from "primevue/usetoast";
import {
    PlusOutlined
} from "@ant-design/icons-vue";
import NousContacter from "../../components/form-component/Nous-contacter.vue";
import useMaison from "../../data/maison/use-maison";
import useOperation from "../../data/operation/use-operation";
import useTerrain from "../../data/terrain/use-terrain";
import useLocalite from "../../data/localite/use-localite";
import {
    creerBien
} from "../../data/biens/bien-action";
import {
    notification
} from 'ant-design-vue';
import {
    Form
} from 'ant-design-vue';
import {
    API, INFO_ACCUEIL
} from '../../router/APIrouter';
import { processListeFetcher } from '../../data/process';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });
}

const useForm = Form.useForm;

export default {
    setup() {
        const activeFormItem = ref(1);
        const previewVisible = ref(false);
        const previewImage = ref("");
        const toast = useToast();
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
            nom: "",
            prenom: "",
            telephone: "",
            email: "",
            type_terrain_id: "",
            civilite: "",
            equipement_maison: '',
            checked: false,
        });

        const chargement = ref(false);

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

        const onUpload = () => {
            toast.add({
                severity: "info",
                summary: "Success",
                detail: "File Uploaded",
                life: 3000,
            });
        };

        const beforeUpload = (file) => {
            console.log(file);
            fileList.value = [...fileList.value, file];
            return false;
        };

        const handleSubmitBien = () => {
            chargement.value = true;
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
            data.append("civilite_proprietaire_bien", form.civilite);
            data.append("nom_proprietaire_bien", form.nom);
            data.append("prenom_proprietaire_bien", form.prenom);
            data.append("telephone_proprietaire_bien", form.telephone);
            data.append("email_proprietaire_bien", form.email);
            data.append("type_terrain_id", form.type_terrain_id);

            // console.log(fileList)

            if (form.checked == true) {
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

                creerBien(data).then((res) => {
                    chargement.value = false;
                    if (res.status == "succes") {
                        notification.success({
                            message: res.message,
                        })
                        fileList.value = [];
                        resetFields();
                    } else {
                        notification.error({
                            message: res.message,
                            placement: 'bottomRight'
                        })
                    }
                });
            } else {
                chargement.value = false;
                notification.error({
                    message: 'Veuillez accepter les conditions de traitement de données personnelles avant de continuer',
                    placement: 'bottomRight'
                })
                return false
            }

        };

        return {
            activeFormItem,
            form,
            onUpload,
            handleActiveItem,
            previewVisible,
            previewImage,
            fileList,
            handleCancel,
            handlePreview,
            handleChange,
            beforeUpload,
            optionsTerrain,
            optionsLocalite,
            option3,
            options,
            cssProps: {
                backgroundImage: `url(${require("@/assets/images/product-1.jpg")})`,
            },
            handleSubmitBien,
            chargement,
            API
        };
    },
    components: {
        PlusOutlined,
        NousContacter,
    },
    data() {
        return {
            accueil: null
        };
    },
    methods: {
        getInfoAccueil() {
            processListeFetcher(INFO_ACCUEIL).then((res) => {
                this.accueil = res;
            })
        }
    },
    mounted() {
        this.getInfoAccueil();
    },
};
</script>

<style lang="scss">
@import "../../scss/_variable.scss";

.text-begin {
    width: 100%;
    text-align: center;
    font-size: 16px;
    margin-top: 1rem;
}

.tab-content-block {
    background: url("../../assets/images/bg_agence.png");
    background-size: cover;
}

.av-sub-title {
    font-family: $fontFamily;
    font-size: 16px;
    margin-bottom: 1rem;
    display: inline-flex;
}

.icon {
    font-size: 20px;
    padding-top: 5px;
    display: inline-block;
}
</style>
