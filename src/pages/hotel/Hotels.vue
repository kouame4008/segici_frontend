<template>
<div class="main-content-wrapper">
    <section class="breadcrumb-section about">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-lg-12">
                    <div class="text-left breadcrumb-wrapper">
                        <h2>Recherchez un hôtel</h2>
                        <span class="text-white"> </span>
                        <div>
                            <form action="" class="mt-3">
                                <section class="form-inlin">
                                    <div class="row">
                                        <div class="col-md-10">
                                            <div class="row">
                                                <div class="col-md-5">
                                                    <div class="m-0 form-group">
                                                        <div class="input-group">
                                                            <strong class="text-white"> <span for="">Selectionnez la localite</span></strong>
                                                            <a-select v-model:value="localite_id" size="large" class="w-100" :options="localite" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-5">
                                                    <div class="m-0 form-group">
                                                        <div class="input-group">
                                                            <strong class="text-white"> <span for="">Nom de l'hôtel</span></strong>
                                                            <a-input v-model:value="nom_hotel" size="large" class="w-100" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-md-2">
                                                    <div class="m-0 form-group">
                                                        <strong><span for="" style="opacity : 0">Nombre de pièce</span></strong>
                                                        <a-button type="danger" size="large" class="w-100" :loading="loading" @click="handleRechercher">
                                                            <template #icon>
                                                                <SearchOutlined /> </template> Rechercher</a-button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="bg-white section">
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-12">
                    <div class="row">
                        <div class="col-md-12">
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
                                                    <a :href="'/hotels/'+item.id" class="mr-2 text-theme" @click.prevent="handleGoDetails (item)"> {{ item.nom_hotel }} </a>
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
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</div>
</template>

<script>
import locale from "ant-design-vue/es/date-picker/locale/fr_FR";
import moment from "moment";
import useLocalite from '../../data/localite/use-localite';
import {
    SearchOutlined,
    StarOutlined,
    EnvironmentFilled
} from '@ant-design/icons-vue';

import {
    API,
    LISTE_HOTEL_URL
} from '../../router/APIrouter';

import {
    processListeFetcher
} from '../../data/process';
import {
    ref
} from '@vue/reactivity';
import {
    onMounted
} from '@vue/runtime-core';
import {
    processData
} from '../../data/residences/residence-action';
import {
    uuid
} from 'vue-uuid';

export default {
    components: {
        SearchOutlined,
        StarOutlined,
        EnvironmentFilled
    },

    setup() {
        const disabledDate = current => {
            // Can not select days before today and today
            return current && current <= moment().startOf('day')
        };
        const {
            localite
        } = useLocalite();
        const hotels = ref([]);
        // const router = useRouter()

        const localite_id = ref('')
        const nom_hotel = ref('')

        const handleRechercher = () => {
            let data = {
                localite_id: localite_id.value,
                nom_hotel: nom_hotel.value,
                etablissement_id: 1
            }

            processData(LISTE_HOTEL_URL, data).then((res) => {
                hotels.value = res.resultat;
            })
        };

        const handleListeHotel = () => {
            let etablissement_id = 1;
            processListeFetcher(LISTE_HOTEL_URL + '?etablissement_id=' + etablissement_id).then((res) => {
                hotels.value = res;
            })
        };

        const handleGoDetails = (item) => {
            // router.push({
            //     name: 'HotelsDetails',
            //     params: {
            //         id: item.id,
            //         uuid: uuid.v1()
            //     }
            // })
            window.location.href = '/hotels/' + item.id + '/' + uuid.v1()
        }

        onMounted(() => {
            handleListeHotel();
        });

        return {
            dateFormat: "DD/MM/YYYY",
            locale,
            disabledDate,
            moment,
            localite,
            loading: false,
            API,
            handleRechercher,
            hotels,
            localite_id,
            nom_hotel,
            handleGoDetails
        }
    }
}
</script>

<style lang="scss">
@import '../../scss/variable.scss';

form.form-inlin {
    background: $primary_color;
    padding: 5px;
    border-radius: 3px;
}

form.form-inlin .form-control {
    height: 45px;
}

.ant-calendar-picker-input.ant-input {
    height: 100% !important;
}


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
