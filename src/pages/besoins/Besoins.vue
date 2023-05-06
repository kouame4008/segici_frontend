<template>
<section id="Accueil">
    <!--div id="loading"> <img id="loading-image" src="@/assets/images/loader.svg" alt="Loading@." /> </div-->

    <div class="main-content-wrapper">
        <section class="breadcrumb-section about">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-lg-5">
                        <div class="breadcrumb-wrapper">
                            <h2>SOUMETTRE UN BESOIN</h2>
                            <nav>
                                <ul>
                                    <li class="breadcrumb-item"><a href="#">Accueil</a></li>
                                    <li class="breadcrumb-item active"><a href="#">Besoin</a></li>
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
                            <h2 class="main-heading m-0">  {{ accueil && accueil.besoin_titre }} </h2>
                            <hr />
                            <p>
                               {{ accueil && accueil.besoin_description }}
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
                            <img v-if="accueil && accueil.image_besoin" :src="API+'fichier/besoin/'+accueil.image_besoin" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <div class="row bg-white p-4">
                    <div class="col-xs-12 w-100">
                        <nav>
                            <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">SOUMETTRE UN BESOIN</a>
                                <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">NOUS CONTACTER</a>
                            </div>
                        </nav>
                        <div class="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <a-form class="form-maison">
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

                                        <div class="col-md-12">
                                            <label for="">Description du besoin </label>
                                            <a-form-item>
                                                <a-textarea v-model:value="form.description" placeholder="Description du besoin" class="textareaItemField" rows="6" />
                                            </a-form-item>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="d-flex justify-content-end">
                                                <a-button size="large" class="search-btn" @click="handleSubmitBesoin" :loading="loading">
                                                    SOUMETTRE MA DEMANDE
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
} from '@vue/reactivity';
import {
    useToast
} from 'primevue/usetoast';

import NousContacter from '../../components/form-component/Nous-contacter.vue';
import useMaison from '../../data/maison/use-maison';
import useOperation from '../../data/operation/use-operation';
import useTerrain from '../../data/terrain/use-terrain';
import useLocalite from '../../data/localite/use-localite';
import {
    processData
} from '../../data/residences/residence-action';
import {
    CREER_BESOIN,
    INFO_ACCUEIL,
    API
} from '../../router/APIrouter';
import {
    notification,
    Form
} from 'ant-design-vue';
import {
    processListeFetcher
} from '../../data/process';

const useForm = Form.useForm;

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = error => reject(error);
    });
}

export default {
    setup() {

        const activeFormItem = ref(1)
        const previewVisible = ref(false);
        const previewImage = ref('');
        const toast = useToast();
        const fileList = ref([]);
        const form = reactive({
            typebien: '1',
            titre: '',
            titrepropriete: '',
            superficie: '',
            typelogement: '',
            typeoperation: '',
            prix: '',
            localisation: '',
            nombrepiece: '',
            superficielot: '',
            superficiebatie: '',
            description: '',
            nom: '',
            prenom: '',
            telephone: '',
            email: '',
            checked: false,
        });
        const loading = ref(false)

        const {
            maison,
        } = useMaison();

        const {
            operation,
        } = useOperation()

        const {
            terrain,
        } = useTerrain()

        const {
            localite,
        } = useLocalite()

        const {
            resetFields
        } = useForm(form)

        const option3 = ref(operation);
        const options = ref(maison);
        const optionsTerrain = ref(terrain);
        const optionsLocalite = ref(localite);

        const handlePreview = async file => {
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
            activeFormItem.value = value
        }

        const handleCancel = () => {
            previewVisible.value = false;
        };

        const onUpload = () => {
            toast.add({
                severity: 'info',
                summary: 'Success',
                detail: 'File Uploaded',
                life: 3000
            });
        }

        const beforeUpload = (file) => {
            console.log(file)
            fileList.value = [...fileList.value, file];
            return false;
        };

        const handleSubmitBesoin = () => {
            loading.value = true;
            let data = new FormData();

            data.append('nom', form.nom);
            data.append('prenom', form.prenom);
            data.append('telephone', form.telephone);
            data.append('email', form.email);
            data.append('besoin', form.description);

            processData(CREER_BESOIN, data).then((res) => {
                loading.value = false;
                if (res.status == "succes") {
                    notification.success({
                        message: res.message
                    });
                    resetFields();
                } else {
                    notification.error({
                        message: res.message
                    });
                }
            })
        }

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
            handleSubmitBesoin,
            API
        }

    },
    components: {
        NousContacter,
    },
    data() {
        return {
            accueil: null
        }
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
}
</script>

<style lang="scss">
@import '../../scss/_variable.scss';

.text-begin {
    width: 100%;
    text-align: center;
    font-size: 16px;
    margin-top: 1rem;
}

.tab-content-block {
    background: url('../../assets/images/bg_agence.png');
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
