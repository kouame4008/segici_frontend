<template>
<a-form class="form-terrain" :model="contactValues" @submit.prevent="handleNousContacter">
    <div class="row">
        <div class="col-md-4">
            <label for="">Nom & prénom(s)</label>
            <a-form-item>
                <a-input v-model:value="contactValues.nom" placeholder="Nom & prénom(s)" class="inputItemField" />
            </a-form-item>
        </div>

        <div class="col-md-4">
            <label for="">Téléphone </label>
            <a-form-item>
                <a-input v-model:value="contactValues.telephone" placeholder="Téléphone" class="inputItemField" />
            </a-form-item>
        </div>
        <div class="col-md-4">
            <label for="">Email </label>
            <a-form-item>
                <a-input v-model:value="contactValues.email" placeholder="Email" class="inputItemField" />
            </a-form-item>
        </div>

        <div class="col-md-4">
            <label for="">Ville </label>
            <a-form-item>
                <a-input v-model:value="contactValues.ville" placeholder="Ville" class="inputItemField" />
            </a-form-item>
        </div>
        <div class="col-md-4">
            <label for="">Profession </label>
            <a-form-item>
                <a-input v-model:value="contactValues.profession" placeholder="Profession" class="inputItemField" />
            </a-form-item>
        </div>

        <div class="col-md-12">
            <label for="">Message </label>
            <a-form-item>
                <a-textarea v-model:value="contactValues.message" placeholder="Message" class="textareaItemField" rows="3" />
            </a-form-item>
        </div>

        <div class="col-md-12">
            <div class="d-flex justify-content-end">
                <a-button size="large" class="search-btn" :loading="spinning" htmlType="submit">
                    SOUMETTRE MES INFORMATIONS
                </a-button>
            </div>
        </div>
    </div>
</a-form>
</template>

<script>
import {
    reactive,
    ref
} from '@vue/reactivity';
import {
    processData
} from '../../data/residences/residence-action';
import {
    NOUS_CONTACTER
} from '../../router/APIrouter';
import {
    notification
} from 'ant-design-vue';

export default {
    props: {
        close: Function
    },
    setup(props, context) {

        const spinning = ref(false);
        const contactValues = reactive({
            nom: '',
            telephone: '',
            email: '',
            message: '',
            ville: '',
            profession: ''
        })

        const handleNousContacter = () => {
            if (contactValues.nom == '') {
                notification.error({
                    message: 'Le champs nom & prenom(s) est obligatoire',
                    placement: 'bottomRight'
                });
                return false;
            }

            if (contactValues.telephone == '') {
                notification.error({
                    message: 'Le champs téléphone est obligatoire',
                    placement: 'bottomRight'
                });
                return false;
            }

            if (contactValues.email == '') {
                notification.error({
                    message: 'Le champs email est obligatoire',
                    placement: 'bottomRight'
                });
                return false;
            }

            if (contactValues.message == '') {
                notification.error({
                    message: 'Le champs message est obligatoire',
                    placement: 'bottomRight'
                });
                return false;
            }

            // resetFields ()

            spinning.value = !spinning.value;

            processData(NOUS_CONTACTER, contactValues).then((res) => {
                spinning.value = !spinning.value;
                if (res.statut == 'succes') {
                    notification.success({
                        message: res.message
                    })
                    contactValues.nom = '';
                    contactValues.telephone = '';
                    contactValues.email = '';
                    contactValues.message = '';
                    contactValues.ville = '';
                    contactValues.profession = '';

                    context.emit('close');
                } else {
                    notification.error({
                        message: res.message,
                        placement: 'bottomRight'
                    })
                }
            })
        }

        return {
            spinning,
            contactValues,
            handleNousContacter,

        }
    }
}
</script>

<style>

</style>
