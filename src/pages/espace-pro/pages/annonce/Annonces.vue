<template>
<section>
    <a-page-header :breadcrumb="{ routes }">
        <template #title>
            Alerte anonnce
        </template>
    </a-page-header>
    <section class="text-left">
        <div class="px-3">
            <a-list item-layout="horizontal" :data-source="annonces">
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
                                <strong>{{ item.titre_annonce }}</strong>
                            </template>
                        </a-list-item-meta>
                       {{ item.description_annonce }}
                    </a-list-item>
                </template>
            </a-list>
        </div>
    </section>

</section>
</template>

<script>
import {
    processListeFetcherAuth
} from '../../../../data/process-auth';
import {
    LISTE_ANNONCE
} from '../../../../router/APIrouter';
import moment from 'moment';
import {CalendarOutlined} from '@ant-design/icons-vue';

const routes = [{
    path: 'index',
    breadcrumbName: 'Annonce',
}, ];
export default {
    components: {
        CalendarOutlined
    },
    data() {
        return {
            routes,
            loading: true,
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
            },
            annonces: [],
            moment
        }
    },
    methods: {
        handleListeAnnonce() {
            processListeFetcherAuth(LISTE_ANNONCE).then((res) => {
                this.annonces = res;
            })
        }
    },
    mounted() {
        this.handleListeAnnonce();
    }
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
