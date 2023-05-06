<template>
<section>
    <a-page-header :breadcrumb="{ routes }">
        <template #title>
            Liste des besoins <span>
                <FormOutlined /></span>
        </template>
    </a-page-header>
    <section class=" pt-0">
        <div class="container">
            <div class="row bg-white p-4">
                <div class="col-xs-12 w-100">
                    <a-form class="form-maison text-left">
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
                                    <a-textarea v-model:value="form.description" placeholder="Description du besoin" class="textareaItemField" :rows="4" />
                                </a-form-item>
                            </div>

                            <div class="col-md-3">
                                <div class="d-flex justify-content-end">
                                    <a-button size="large" class="search-btn" @click="handleSubmitBesoin" :loading="loading" v-if="!activeItem">
                                        SOUMETTRE MA DEMANDE
                                    </a-button>

                                    <a-button size="large" class="search-btn" @click="handleModifier" :loading="loading" v-if="activeItem">
                                        MODIFIER
                                    </a-button>

                                    <a-button size="large" class="search-btn" @click="handleCancel" :loading="loading" v-if="activeItem">
                                        ANNULER
                                    </a-button>
                                </div>
                            </div>
                        </div>
                    </a-form>
                </div>
            </div>
        </div>
    </section>

    <div class="row justify-content-center">
        <div class="col-md-8">
            <a-typography-title :level="3"> LISTE DES BESOINS </a-typography-title>
        </div>
    </div>

    <section class="section text-left">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <a-tabs v-model:activeKey="activeKey">
                        <a-tab-pane key="1">
                            <template #tab>
                                <strong>BESOIN ÉMIS</strong>
                            </template>
                            <a-list item-layout="horizontal" :data-source="besoins">
                                <template #renderItem="{ item }">
                                    <a-list-item>
                                        <template #actions>
                                            <span>
                                                <CalendarOutlined />
                                                {{ moment (item.created_at).format ('DD-MM-YYYY') }}
                                            </span>
                                            <a-space>
                                                <a-button type="primary" shape="circle" @click="handleChangeEditView (item)">
                                                    <template #icon>
                                                        <EditOutlined :style="{position : 'relative', top : '-5px'}" /></template>
                                                </a-button>

                                                <a-popconfirm title="Voulez-vous vraiment supprimer ?" @confirm="handleConfirmDelete(item)" okText="Supprimer" cancelText="Annuler">
                                                    <a-button type="danger" shape="circle">
                                                        <template #icon>
                                                            <DeleteOutlined :style="{position : 'relative', top : '-5px'}" /></template>
                                                    </a-button>
                                                </a-popconfirm>
                                            </a-space>
                                        </template>
                                        <a-list-item-meta>
                                            <template #title>
                                                <strong>{{ item.nom_demandeur }}</strong>
                                            </template>
                                        </a-list-item-meta>
                                        {{ item.besoin_demandeur }}
                                    </a-list-item>
                                </template>
                            </a-list>
                        </a-tab-pane>
                        <a-tab-pane key="3">
                            <template #tab>
                                <strong>BESOIN RÉÇU</strong>
                            </template>
                            <a-list item-layout="horizontal" :data-source="besoinsRecu">
                                <template #renderItem="{ item }">
                                    <a-list-item>
                                        <template #actions>
                                            <span>
                                                <CalendarOutlined />
                                                {{ moment (item.created_at).format ('DD-MM-YYYY') }}
                                            </span>
                                        </template>
                                        <a-list-item-meta>
                                            <template #title>
                                                <strong>{{ item.nom_demandeur }}</strong>
                                            </template>
                                        </a-list-item-meta>
                                        {{ item.besoin_demandeur }}
                                    </a-list-item>
                                </template>
                            </a-list>
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </div>
        </div>

    </section>

</section>
</template>

<script>
import {
    FormOutlined,
    CalendarOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons-vue';
import {
    Form,
    notification
} from 'ant-design-vue';
import {
    reactive,
    ref
} from '@vue/reactivity';
import {
    computed,
    onMounted
} from '@vue/runtime-core';
import {
    useStore
} from 'vuex';
import {
    processData
} from '../../../../data/process';
import {
    CREER_BESOIN,
    LISTE_BESOIN_RECU,
    LISTE_BESOIN_USER,
    MODIFIER_BESOIN,
    SUPPRIMER_BESOIN
} from '../../../../router/APIrouter';
import {
    processListeFetcherAuth
} from '../../../../data/process-auth';
import moment from 'moment';

const routes = [{
    path: 'index',
    breadcrumbName: 'Emission de besoin',
}, ];

const useForm = Form.useForm;

export default {
    components: {
        FormOutlined,
        CalendarOutlined,
        EditOutlined,
        DeleteOutlined
    },
    setup() {
        const store = useStore();
        const user = computed(() => store.getters.getUserInfo)
        const form = reactive({
            description: '',
            nom: user.value.nom_user,
            prenom: user.value.prenom_user,
            telephone: user.value.telephone_user,
            email: user.value.email_user,
            user_id: user.value.id
        });
        const loading = ref(false);
        const besoins = ref([])
        const besoinsRecu = ref([])
        const activeItem = ref(false)
        const current = ref();

        const {
            resetFields
        } = useForm(form)

        const handleSubmitBesoin = () => {
            loading.value = true;
            let data = new FormData();

            data.append('nom', form.nom);
            data.append('prenom', form.prenom);
            data.append('telephone', form.telephone);
            data.append('email', form.email);
            data.append('besoin', form.description);
            data.append('user_id', form.user_id);

            processData(CREER_BESOIN, data).then((res) => {
                loading.value = false;
                if (res.status == "succes") {
                    notification.success({
                        message: res.message
                    });
                    resetFields();
                    handleListeBesoin();
                } else {
                    notification.error({
                        message: res.message
                    });
                }
            })
        }

        const handleListeBesoin = () => {
            processListeFetcherAuth(LISTE_BESOIN_USER).then((res) => {
                besoins.value = res;
            });

            processListeFetcherAuth(LISTE_BESOIN_RECU).then((res) => {
                besoinsRecu.value = res;
            })
        }

        const handleChangeEditView = (item) => {
            activeItem.value = true;
            current.value = item;
            form.description = item.besoin_demandeur
        }

        const handleCancel = () => {
            activeItem.value = false;
            current.value = '';
            form.description = ''
        }

        const handleModifier = () => {
            loading.value = true;
            let data = new FormData();

            data.append('nom', form.nom);
            data.append('prenom', form.prenom);
            data.append('telephone', form.telephone);
            data.append('email', form.email);
            data.append('besoin', form.description);
            data.append('user_id', form.user_id);
            data.append('besoin_id', current.value.id);

            processData(MODIFIER_BESOIN, data).then((res) => {
                loading.value = false;
                if (res.status == "succes") {
                    notification.success({
                        message: res.message
                    });
                    resetFields();
                    handleListeBesoin();
                    activeItem.value = false
                } else {
                    notification.error({
                        message: res.message
                    });
                }
            })
        }

        const handleConfirmDelete = (item) => {
            loading.value = true;
            let data = new FormData();
            data.append('besoin_id', item.id);

            processData(SUPPRIMER_BESOIN, data).then((res) => {
                loading.value = false;
                if (res.status == "succes") {
                    notification.success({
                        message: res.message
                    });
                    handleListeBesoin();
                } else {
                    notification.error({
                        message: res.message
                    });
                }
            })
        }

        onMounted(() => {
            handleListeBesoin();
        })

        return {
            form,
            loading,
            handleSubmitBesoin,
            activeKey: ref('1'),
            besoins,
            moment,
            besoinsRecu,
            handleChangeEditView,
            handleConfirmDelete,
            activeItem,
            handleCancel,
            handleModifier
        }
    },
    data() {
        return {
            routes,
            bar: {
                title: {
                    text: 'ECharts'
                },
                tooltip: {},
                xAxis: {
                    data: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN']
                },
                yAxis: {},
                series: [{
                    name: 'Clouds',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            }
        }
    },
}
</script>

<style>
.ant-breadcrumb {
    text-align: left;
}

.orange {
    background-color: #ff4a00 !important;
    color: #FFF
}

.green {
    background-color: #62d493 !important;
    color: #FFF
}

.red {
    background-color: #FF4961 !important;
    color: #FFF
}

.yellow {
    background-color: #f4ab55 !important;
    color: #FFF
}
</style>
