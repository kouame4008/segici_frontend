<template>
<a-badge :count="message">
    <a-button type="" shape="circle" @click="handleGoPage">
        <BellOutlined :style="{position : 'relative', top : '-4px'}" />
    </a-button>
</a-badge>
</template>

<script>
import {
    EP_TOTAL_MESSAGE_NO_LU
} from '../../router/APIrouter';
import useSWRV from 'swrv';
import {
    BellOutlined
} from '@ant-design/icons-vue';
import {
    swrvFetcher
} from '../../data/process';

export default {
    components: {
        BellOutlined
    },
    setup() {
        const {
            data: message,
            error: messageError
        } = useSWRV(EP_TOTAL_MESSAGE_NO_LU, swrvFetcher, {
            refreshInterval: 7000
        });

        // console.log (articles)

        return {
            message,
            messageError,
        }
    },
    data() {
        return {
            user: null
        }
    },
    methods: {
        handleGoPage() {
            this.$router.push({
                name : 'Message'
            })
        }
    }
}
</script>

<style>

</style>
