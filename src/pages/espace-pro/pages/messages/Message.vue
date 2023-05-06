<template>
<section id="conversation" v-if="!viewForm">
    <a-page-header :breadcrumb="{ routes }">
        <template #title> Liste conversation </template>
    </a-page-header>
    <section>
        <div class="row justify-content-center">
            <div class="col-md-10">
                <a-form :model="form" :rules="rules">
                    <div class="row text-left">
                        <div class="col-md-4">
                            <a-form-item name="objet" ref="objet" v-bind="validateInfos.objet">
                                <label for="" class="d-block text-left">Objet</label>
                                <a-input v-model:value="form.objet" class="inputItemField" />
                            </a-form-item>
                        </div>
                        <div class="col-md-3">
                            <a-form-item name="destinataire" ref="destinataire" v-bind="validateInfos.destinataire">
                                <label for="" class="d-block text-left">Destinataire</label>
                                <a-select v-model:value="form.destinataire" :options="users" class="inputItemField">
                                </a-select>
                            </a-form-item>
                        </div>
                        <div class="col-md-3">
                            <a-form-item name="priorite" ref="priorite" v-bind="validateInfos.priorite">
                                <label for="" class="d-block text-left">Niveau de priorité</label>
                                <a-select v-model:value="form.priorite" :options="priorites" class="inputItemField">
                                </a-select>
                            </a-form-item>
                        </div>
                        <div class="col-md-2">
                            <a-form-item>
                                <label for="" class="d-block text-left" :style="{ opacity: 0 }">Date fin</label>
                                <a-button type="primary" size="large" @click="handleCreateConversation" :loading="loading">ENREGISTRER</a-button>
                            </a-form-item>
                        </div>
                    </div>
                </a-form>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-md-12">
                <a-table :columns="columnData" :row-key="record => record.id" :data-source="conversations">
                    <template #nom="{ record }">{{ record.civilite_user }} {{ record.nom_user }} {{ record.prenom_user }}</template>
                    <template #priorite="{ record }">
                        <a-tag color="green" v-if="record.priorite == 1">
                            Normal
                        </a-tag>

                        <a-tag color="red" v-if="record.priorite == 2">
                            Urgent
                        </a-tag>

                        <a-tag color="red" v-if="record.priorite == 3">
                            Très urgent
                        </a-tag>
                    </template>
                    <template #action="{record}">
                        <a-badge :count="record.count">
                            <a-button type="primary" shape="circle" @click="handleOpenDiscussionView (record)">
                                <MailOutlined :style="{fontSize : '18px', position : 'relative', top : '-2px'}" />
                            </a-button>
                        </a-badge>
                    </template>
                </a-table>
            </div>
        </div>
    </section>
</section>
</template>

<script>
import {
    reactive,
    ref
} from "@vue/reactivity";
import useUsers from '../../../../data/maison/use-users';
import {
    Form,
    notification
} from 'ant-design-vue';
import {
    processDataAuth
} from '../../../../data/process-auth';
import {
    EP_CREER_CONVERSATION,
    EP_LIRE_MESSAGE
} from '../../../../router/APIrouter';
import useConversation from '../../../../data/conversation/use-conversation';
import {
    MailOutlined,
} from '@ant-design/icons-vue';
import {
    useRouter
} from 'vue-router';

const useForm = Form.useForm;

const routes = [{
    path: "index",
    breadcrumbName: "Conversation avec SEGICI",
}, ];

const priorites = [{
        label: "Normal",
        value: 1,
    },
    {
        label: "Urgent",
        value: 2,
    },
    {
        label: "Très urgent",
        value: 3,
    },
];

const columnData = [{
        dataIndex: 'id',
        key: 'id',
        title: '#',
        slots: {
            customRender: 'id'
        },
    },
    {
        dataIndex: 'name',
        key: 'nom',
        title: 'Emetteur',
        slots: {
            customRender: 'nom'
        },
    },
    {
        dataIndex: 'objet',
        key: 'objet',
        title: 'Objet',
        slots: {
            customRender: 'objet'
        },
    },
    {
        dataIndex: 'priorite',
        key: 'priorite',
        title: 'Priorité',
        slots: {
            customRender: 'priorite'
        },
    },
    {
        dataIndex: 'action',
        key: 'action',
        title: 'Action',
        align: 'right',
        slots: {
            customRender: 'action'
        },
    },
];

export default {
    components: {
        MailOutlined,
    },
    setup() {
        const viewForm = ref(false);
        const loading = ref(false);
        const currentConversation = ref();
        const router = useRouter();
        const {
            users
        } = useUsers();

        const form = reactive({
            objet: '',
            priorite: '',
            destinataire: ''
        });

        const rules = {
            objet: [{
                required: true,
                message: 'Champ obligatoire',
            }],
            destinataire: [{
                required: true,
                message: 'Champ obligatoire',
            }],
            priorite: [{
                required: true,
                message: 'Champ obligatoire',
            }]
        }

        const {
            conversations
        } = useConversation();

        const {
            resetFields,
            validateInfos,
            validate
        } = useForm(form, rules);

        const handleCreateConversation = () => {
            validate().then(() => {
                loading.value = true;
                let data = new FormData();
                data.append('objet', form.objet)
                data.append('destinataire_id', form.destinataire)
                data.append('priorite', form.priorite)

                processDataAuth(EP_CREER_CONVERSATION, data).then((res) => {
                    loading.value = true;
                    if (res.statut == "succes") {
                        notification.success({
                            message: res.message
                        });
                        resetFields();
                        viewForm.value = false
                    } else {
                        notification.error({
                            message: res.message,
                            placement: 'bottomRight'
                        });
                    }
                })
            })
        }

        const handleOpenDiscussionView = (record) => {
            let data = new FormData();
            data.append('conversation_id', record.id);

            processDataAuth(EP_LIRE_MESSAGE, data).then((res) => {
                if (res.statut == "succes") {
                    router.push({
                        name: 'Discussion',
                        params: {
                            id: record.id
                        }
                    })
                }
            })
        }

        return {
            routes,
            viewForm,
            priorites,
            users,
            form,
            handleCreateConversation,
            resetFields,
            rules,
            validateInfos,
            conversations,
            columnData,
            handleOpenDiscussionView,
            currentConversation,
        };
    },
};
</script>

<style>
.button_old {
    background-color: rgba(0, 0, 0, 0.3) !important;
    border: 0 !important;
    color: white !important;
    cursor: pointer !important;
    padding: 0 !important;
    height: 100% !important;
    border: 0 !important;
}

.button_old.sendy {
    border-radius: 0 15px 15px 0 !important;
}

.button_old.attach {
    border-radius: 15px 0 0 15px !important;
    border-right: 1px solid rgba(0, 0, 0, 0.3) !important;
}

.button_old:hover {
    background-color: #1890ff !important;
    transition: all .3s ease-in;
}
</style>
