<template>
<section>
    <a-page-header :breadcrumb="{ routes }">
        <template #title>
            Avis du partenaire <span>
                <FormOutlined /></span>
        </template>
    </a-page-header>
    <section class=" pt-0">
        <div class="container">
            <div class="row bg-white p-4">
                <div class="col-xs-12 w-100">
                    <a-form class="form-maison text-left">
                        <div class="row">
                            <div class="col-md-12">
                                <label for="" v-if="!activeItem">Laisser un avis </label>
                                <label for="" v-else>Modifier avis </label>
                                <a-form-item>
                                    <a-textarea v-model:value="form.message" placeholder="Laisser un avis" class="textareaItemField" :rows="4" />
                                </a-form-item>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="d-flex justify-content-end" v-if="!activeItem">
                                    <a-button size="large" class="search-btn" @click="handleSubmitAvis" :loading="loading">
                                        SOUMETTRE MON AVIS
                                    </a-button>
                                </div>
                                <div class="d-flex justify-content-end" v-else>
                                    <a-button type="primary" size="large" class="search-btn" @click="handleModifierAvis" :loading="loading">
                                        MODIFIER MON AVIS
                                    </a-button>
                                </div>
                            </div>
                            <div class="col-md-3">

                                <div class="d-flex justify-content-end" v-if="activeItem">
                                    <a-button size="large" :style="{background : 'transparent !important', color : 'red !important'}" class="search-btn text-danger" @click="handleCancel" :loading="loading">
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
            <a-typography-title :level="3"> LISTE DES AVIS </a-typography-title>
        </div>
    </div>

    <section class="section text-left">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <a-list item-layout="horizontal" :data-source="avis">
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
                                        <strong>{{ item.nom_user }} {{ item.prenom_user }}</strong>
                                    </template>
                                </a-list-item-meta>
                                {{ item.message }}
                            </a-list-item>
                        </template>
                    </a-list>
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
    onMounted
} from '@vue/runtime-core';
import {
    processData
} from '../../../../data/process';
import {
    CREER_AVIS_PARTENAIRE,
    LISTE_AVIS_PARTENAIRE,
    MODIFIER_AVIS_PARTENAIRE,
    SUPPRIMER_AVIS_PARTENAIRE,
} from '../../../../router/APIrouter';
import {
    processListeFetcherAuth
} from '../../../../data/process-auth';
import moment from 'moment';

const routes = [{
    path: 'index',
    breadcrumbName: 'Avis du partenaire',
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
        const form = reactive({
            message: '',
        });
        const loading = ref(false);
        const avis = ref([])
        const activeItem = ref(false)
        const current = ref()

        const {
            resetFields
        } = useForm(form)

        const handleSubmitAvis = () => {
            loading.value = true;
            let data = new FormData();

            data.append('message', form.message);

            processData(CREER_AVIS_PARTENAIRE, data).then((res) => {
                loading.value = false;
                if (res.status == "succes") {
                    notification.success({
                        message: res.message
                    });
                    handleListeAvis()
                    resetFields();

                } else {
                    notification.error({
                        message: res.message
                    });
                }
            })
        }

        const handleModifierAvis = () => {
            loading.value = true;
            let data = new FormData();

            data.append('message', form.message);
            data.append('avis_id', current.value.id);

            processData(MODIFIER_AVIS_PARTENAIRE, data).then((res) => {
                loading.value = false;
                if (res.status == "succes") {
                    notification.success({
                        message: res.message
                    });
                    handleListeAvis()
                    resetFields();
                    handleCancel()
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

            data.append('avis_id', item.id);

            processData(SUPPRIMER_AVIS_PARTENAIRE, data).then((res) => {
                loading.value = false;
                if (res.status == "succes") {
                    notification.success({
                        message: res.message
                    });
                    handleListeAvis()
                } else {
                    notification.error({
                        message: res.message
                    });
                }
            })
        }

        const handleChangeEditView = (item) => {
            activeItem.value = true;
            current.value = item;
            form.message = item.message
            // alert ()
        }

        const handleCancel = () => {
            activeItem.value = false;
            current.value = null;
            resetFields()
            // alert ()
        }

        const handleListeAvis = () => {
            processListeFetcherAuth(LISTE_AVIS_PARTENAIRE).then((res) => {
                avis.value = res;
            });
        }

        onMounted(() => {
            handleListeAvis();
        })

        return {
            form,
            loading,
            handleSubmitAvis,
            avis,
            moment,
            handleChangeEditView,
            activeItem,
            handleCancel,
            handleModifierAvis,
            handleConfirmDelete
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
