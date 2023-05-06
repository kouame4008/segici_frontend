<template>
<a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="hotels">
    <template #renderItem="{ item }">
        <a-list-item key="item.title">
            <template #actions>
                <a-button type="" shape="round" class="btn-theme" @click.prevent="handleGoDetails (item)"> Voir les tarifs </a-button>
            </template>
            <template #extra>
                <img width="272" alt="logo" :src="API+'fichier/photo_de_bien/'+item.image_hotel">
            </template>
            <a-list-item-meta>
                <template #description>
                    <span :style="{color : '#000'}">
                        <EnvironmentFilled :style="{fontSize : '20px', position : 'relative', top : '-5px'}" class="text-danger" /> HOTEL A YAMOUSSOUKRO, {{ item.quartier_hotel }} </span>
                    <br> <a :href="'https://maps.google.com?q='+item.longitude_hotel+','+item.latitude_hotel" target="_bank"> <span> Afficher sur la carte </span></a>
                </template>
                <template #title>
                    <a-typography-title :level="3">
                        <a :href="'/hotels/'+item.id" class="text-theme mr-2" @click.prevent="handleGoDetails (item)"> {{ item.nom_hotel }} </a>
                        <StarOutlined :style="{fontSize : '15px', position : 'relative', top : '-5px'}" class="text-warning" />
                        <StarOutlined :style="{fontSize : '15px', position : 'relative', top : '-5px'}" class="text-warning" />
                        <StarOutlined :style="{fontSize : '15px', position : 'relative', top : '-5px'}" class="text-warning" />
                    </a-typography-title>
                </template>
            </a-list-item-meta>
            <p class="els">{{ item.description_hotel }}</p>
        </a-list-item>
    </template>
</a-list>
</template>

<script>
import {
    StarOutlined,
    EnvironmentFilled
} from '@ant-design/icons-vue';
import {
    defineComponent
} from 'vue';
import useHotels from '../../data/hotel/use-hotel';
import {
    API
} from '../../router/APIrouter';
import {
    useRouter
} from 'vue-router';

export default defineComponent({
    components: {
        StarOutlined,
        EnvironmentFilled
    },
    props : ['etablissementId'],
    setup(props) {
        const pagination = {
            onChange: page => {
                console.log(page);
            },
            pageSize: 3,
        };
        const router = useRouter();

        const {
            hotels
        } = useHotels(props.etablissementId);

        const handleGoDetails = (record) => {
            router.push({
                name: 'HotelsDetails',
                params: {
                    id: record.id
                }
            })
        }

        return {
            hotels,
            pagination,
            API,
            handleGoDetails
        };
    },
});
</script>

<style lang="scss">
@import '../../scss/variable.scss';

.ant-list-item:hover {
    background: #f6fcff;
    transition: all ease-in .3s;
}

.ant-list-item:nth-child(odd) {
    background: #f6fcff
}

.els {
    -webkit-box-orient: vertical;
    display: -webkit-box !important;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
}
</style>
