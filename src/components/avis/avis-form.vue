<template>
<section>
    <div v-if="data.length > 0">
        <a-list class="comment-list" :header="`${data.length} avis`" item-layout="horizontal" :data-source="data">
            <template #renderItem="{ item }">
                <a-list-item>
                    <a-comment :author="item.auteur_avis" :avatar="'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'">

                        <template #content>
                            <p>
                                {{ item.message_avis }}
                            </p>
                        </template>
                        <template #datetime>
                            <a-tooltip :title="moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')">
                                <span>{{ moment(item.created_at).fromNow() }}</span>
                            </a-tooltip>
                        </template>
                    </a-comment>
                </a-list-item>
            </template>
        </a-list>
    </div>

    <hr>

    <a-comment>
        <template #content>
            <a-form :model="formState" :rules="rules">
                <a-form-item>
                    <label for="" class="d-block">Votre note</label>
                    <span>
                        <a-rate v-model:value="formState.rate_avis" :tooltips="desc" />
                        <span class="ant-rate-text">{{ desc[formState.rate_avis - 1] }}</span>
                    </span>

                </a-form-item>
                <a-form-item ref="auteur_avis" name="auteur_avis" v-bind="validateInfos.auteur_avis">
                    <label for="">Nom</label>
                    <a-input class="inputItemField" v-model:value="formState.auteur_avis" placeholder="Nom" allow-clear />
                </a-form-item>

                <a-form-item ref="email_avis" name="email_avis" v-bind="validateInfos.email_avis">
                    <label for="">Email</label>
                    <a-input class="inputItemField" v-model:value="formState.email_avis" placeholder="email" allow-clear />
                </a-form-item>

                <a-form-item class="mt-3" ref="message_avis" name="message_avis" v-bind="validateInfos.message_avis">
                    <label for="">Message</label>
                    <a-textarea :rows="4" v-model:value="formState.message_avis" allow-clear class="textareaItemField" placeholder="Message" />
                </a-form-item>

                <a-form-item class="mt-3">
                    <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
                        DEPOSER VOTRE AVIS
                    </a-button>
                </a-form-item>
            </a-form>
        </template>
    </a-comment>
</section>
</template>

<script>
import moment from "moment";
import {
    defineComponent,
    onMounted,
    reactive,
    ref
} from "vue";
import {
    Form,
    notification
} from 'ant-design-vue';
import {
    processData
} from "../../data/residences/residence-action";
import {
    SELECTIONNER_AVIS
} from "../../router/APIrouter";

const useForm = Form.useForm;

export default defineComponent({
    props: {
        url: String,
        id: Number,
        type: String
    },
    setup(props) {
        const comments = ref([]);
        const submitting = ref(false);
        const value = ref("");
        const rate = ref(0);
        const desc = ref(['terrible', 'bad', 'normal', 'good', 'wonderful']);
        const formState = reactive({
            auteur_avis: '',
            email_avis: '',
            rate_avis: '',
            message_avis: ''
        });
        const rules = {
            auteur_avis: [{
                required: true,
                message: 'Champs obligatoire !',
            }],
            email_avis: [{
                required: true,
                message: 'Champs obligatoire !',
            }],
            message_avis: [{
                required: true,
                message: 'Champs obligatoire !',
            }],
        }
        const data = ref([])

        const {
            resetFields,
            validateInfos,
            validate
        } = useForm(formState, rules);

        const handleSubmit = () => {
            validate().then(() => {
                submitting.value = true;
                let data = new FormData();
                data.append('auteur_avis', formState.auteur_avis);
                data.append('note_avis', formState.rate_avis);
                data.append('email_avis', formState.email_avis);
                data.append('message_avis', formState.auteur_avis);

                if (props.type == "bien") {
                    data.append('bien_id', props.id);
                } else if (props.type == "residence") {
                    data.append('residence_id', props.id);
                } else {
                    data.append('hotel_id', props.id);
                }

                processData(props.url, data).then((res) => {
                    submitting.value = false;
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
            })
        };

        const handleListeAvis = () => {
            let dataForm = new FormData();
            if (props.type == "bien") {
                dataForm.append('bien_id', props.id);
            } else if (props.type == "residence") {
                dataForm.append('residence_id', props.id);
            } else {
                dataForm.append('hotel_id', props.id);
            }
            dataForm.append('type', props.type);

            processData(SELECTIONNER_AVIS, dataForm).then((res) => {
                data.value = res.resultat;
            })
        }

        onMounted(() => {
            handleListeAvis()
        })

        return {
            data,
            moment,
            comments,
            submitting,
            value,
            handleSubmit,
            rate,
            desc,
            rules,
            formState,
            validateInfos,
            resetFields,
            handleListeAvis

        };
    },
});
</script>
