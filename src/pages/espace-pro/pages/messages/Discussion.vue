<template>
<section id="messageBox">
    <div class="container-fluid h-100">
        <div class="row justify-content-center h-100">
            <div class="col-md-12 chat">
                <div class="card">
                    <div class="card-header msg_head" style="padding: 0.5rem 1rem;">
                        <div class="d-flex bd-highlight">
                            <div class="img_cont">
                                <img src="@/assets/149071.png" class="rounded-circle user_img" />
                                <span class="online_icon"></span>
                            </div>
                            <div class="user_info">
                                <span> {{ currentConversation && currentConversation.nom_user }} {{ currentConversation && currentConversation.prenom_user }}</span>
                                <p>{{ messagesList && messagesList.length }} Messages</p>
                            </div>
                        </div>
                        <span id="action_menu_btn"><i class="fas fa-ellipsis-v"></i></span>
                        <div class="action_menu">
                            <ul>
                                <li><i class="fas fa-user-circle"></i> View profile</li>
                                <li><i class="fas fa-users"></i> Add to close friends</li>
                                <li><i class="fas fa-plus"></i> Add to group</li>
                                <li><i class="fas fa-ban"></i> Block</li>
                            </ul>
                        </div>
                    </div>
                    <div class="card-body msg_card_body d-fle align-items-end" id="chatHistory">
                        <span class="w-100" style="max-height : 200px;display : grid">
                            <template v-for="message in messagesList" :key="message.id" class="d-block w-100">
                                <div class="d-flex justify-content-end mb-4 w-100 align-self-end " v-if="message.from_id == user.id">
                                    <div class="msg_cotainer" v-if="message.type_message == 0">
                                        {{ message.message }}
                                        <span class="msg_time"> {{ moment(message.created_at).format ('DD-MM-YYYY à HH:mm') }}</span>
                                    </div>
                                    <div class="msg_cotainer" v-if="message.type_message == 1">
                                        <template v-if="['jpg', 'png','jpeg','JPG','JPEG','PNG'].includes ((message.message).split('.')[1])">
                                            <img :src="API+'/fichier/messages/'+message.message" class="" :style="{maxWidth : '200px'}" />
                                            <span class="msg_time"> {{ moment(message.created_at).format ('DD-MM-YYYY à HH:mm') }} </span>
                                        </template>

                                        <template v-if="['pdf', 'PDF','docs'].includes ((message.message).split('.')[1])">
                                            <a :href="API+'/fichier/messages/'+message.message" target="_bank"> {{ message.message }} </a>
                                            <span class="msg_time"> {{ moment(message.created_at).format ('DD-MM-YYYY à HH:mm') }} </span>
                                        </template>
                                    </div>
                                    <div class="img_cont_msg d-none">
                                        <img src="@/assets/149071.png" class="rounded-circle user_img_msg" />
                                    </div>
                                </div>
                                <div class="d-flex justify-content-start mb-4 w-100 align-self-end" v-if="message.from_id !== user.id">
                                    <div class="img_cont_msg">
                                        <img src="@/assets/149071.png" class="rounded-circle user_img_msg" />
                                    </div>
                                    <div class="msg_cotainer_send" v-if="message.type_message == 1">
                                        <template v-if="['jpg', 'png','jpeg','JPG','JPEG','PNG'].includes ((message.message).split('.')[1])">
                                            <img :src="API+'/fichier/messages/'+message.message" class="" :style="{maxWidth : '200px'}" />
                                            <span class="msg_time_send"> {{ moment(message.created_at).format ('DD-MM-YYYY à HH:mm') }} </span>
                                        </template>

                                        <template v-if="['pdf', 'PDF','docs'].includes ((message.message).split('.')[1])">
                                            <a :href="API+'/fichier/messages/'+message.message" target="_bank"> {{ message.message }} </a>
                                            <span class="msg_time_send"> {{ moment(message.created_at).format ('DD-MM-YYYY à HH:mm') }} </span>
                                        </template>
                                    </div>
                                    <div class="msg_cotainer_send" v-if="message.type_message == 0">
                                        {{ message.message }}
                                        <span class="msg_time_send"> {{ moment(message.created_at).format ('DD-MM-YYYY à HH:mm') }}</span>
                                    </div>
                                </div>
                            </template>
                        </span>
                    </div>
                    <div class="card-footer" style="padding: 0.5rem 1rem;">
                        <div class="input-group">
                            <div class="input-group-append">
                                <a-button type="" class="button_old attach" @click="visibleModal">
                                    <span class="input-group-text attach_btn"><i class="fas fa-paperclip"></i></span>
                                </a-button>
                            </div>
                            <textarea name="" class="form-control type_msg" v-model="message" placeholder="Votre message message..." @keypress="handleKey"></textarea>
                            <div class="input-group-append">
                                <a-button type="" class="button_old sendy" @click="handleSendMessage">
                                    <span class="input-group-text send_btn">
                                        <i class="fas fa-location-arrow"></i>
                                        <i v-if="messageLoad">
                                            <LoadingOutlined />
                                        </i>
                                    </span>
                                </a-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<a-modal v-model:visible="chooseFileModal" title="Choir un fichier" :afterClose="afterClose" :maskClosable="false" @cancel="cancelModal" okText="Envoyer" cancelText="Annuler" @ok="handleSendMessage" :ok-button-props="{ loading: messageLoad }">
    <div class="clearfix">
        <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" list-type="picture-card" v-model:file-list="fileList" class="d-flex justify-content-center">
            <div v-if="fileList.length < 1">
                <plus-outlined />
                <div class="ant-upload-text">Upload</div>
            </div>
        </a-upload>
    </div>
</a-modal>
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
    EP_ENREGISTRER_MESSAGE,
    EP_SELECTIONNER_CONVERSATION,
    API
} from '../../../../router/APIrouter';
import useConversation from '../../../../data/conversation/use-conversation';
import {
    PlusOutlined,
    LoadingOutlined
} from '@ant-design/icons-vue';
import {
    computed,
    onMounted
} from '@vue/runtime-core';
import {
    useStore
} from 'vuex';
import useMessages from '../../../../data/conversation/use-messages';
import {
    useRouter,
    useRoute
} from 'vue-router';
import moment from 'moment';

const useForm = Form.useForm;

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = error => reject(error);
    });
}

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
        title: 'Destinataire',
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
        PlusOutlined,
        LoadingOutlined
    },
    setup() {
        const viewForm = ref(false);
        const loading = ref(false);
        const currentConversation = ref();
        const previewVisible = ref(false);
        const previewImage = ref('');
        const fileList = ref([])
        const chooseFileModal = ref(false)
        const message = ref('');
        const messageLoad = ref(false)
        const messages = ref([]);
        const {
            users
        } = useUsers();
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const conversation = ref();

        const user = computed(() => store.getters.getUserInfo);

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
            messagesList
        } = useMessages(route.params.id)

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

        const handleOpenDiscussionView = record => {
            currentConversation.value = record;
            const {
                messagesList
            } = useMessages(currentConversation.value.id)
            messages.value = messagesList.value;
            viewForm.value = true;
        }

        const handlereturnBack = () => {
            router.back()
        }

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

        const visibleModal = () => {
            // alert ()
            chooseFileModal.value = true;
        }

        const cancelModal = () => {
            chooseFileModal.value = false;
            fileList.value = []
        }

        const afterClose = () => {
            fileList.value = []
        }

        const handleSendMessage = () => {
            messageLoad.value = true;

            // return false;
            let data = new FormData();
            let fichier = fileList.value;

            if (fileList.value.length == 0) {
                data.append('message', message.value);
            } else {
                for (let index = 0; index < fichier.length; index++) {
                    data.append('fichier', fichier[index].originFileObj, fichier[index].originFileObj.name)
                }
                data.append('nbr_fichier', fichier.length);
            }

            // console.log (user.value);
            // console.log (EP_ENREGISTRER_MESSAGE);

            data.append('from_id', user.value.id);
            data.append('to_id', currentConversation.value.id);
            data.append('conversation_id', conversation.value.id);

            processDataAuth(EP_ENREGISTRER_MESSAGE, data).then((res) => {

                if (res.statut == 'succes') {
                    setTimeout(() => {
                        recursiveFun()
                    }, 5000)
                    messageLoad.value = false;
                    chooseFileModal.value = false;
                    message.value = '';
                    fileList.value = [];
                }
                // console.log(res);
            })
        }

        const handleCurrentConversation = () => {
            let data = new FormData();
            data.append('conversationId', route.params.id);

            processDataAuth(EP_SELECTIONNER_CONVERSATION, data).then((res) => {
                if (res.statut == 'succes') {
                    currentConversation.value = res.resultat;
                    conversation.value = res.conversation;
                }
            })
        }

        const recursiveFun = () => {
            document.getElementById('chatHistory').scrollTop = 100001
        }

        const handleKey = (e) => {
            if (e.keyCode == 13) {
                handleSendMessage()
            }
        }

        onMounted(() => {
            handleCurrentConversation();
            recursiveFun()
            setTimeout(() => {
                recursiveFun()
            }, 1000)
        })

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
            handlereturnBack,
            currentConversation,
            message,
            handleSendMessage,
            handlePreview,
            handleChange,
            chooseFileModal,
            visibleModal,
            cancelModal,
            fileList,
            afterClose,
            messageLoad,
            messages,
            messagesList,
            user,
            API,
            moment,
            handleKey
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
