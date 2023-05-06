<template>
<section>
    <a-page-header :breadcrumb="{ routes }">
        <template #title>
            Tableau de bord
        </template>
    </a-page-header>
    <section class="d-none">
        <div class="px-3">
            <div class="alert alert-info w-100 text-left">
                10 nouvelle offres SEGICI. <a href="">Cliquez ici pour les consulter</a>
            </div>

            <div class="alert alert-danger w-100 text-left">
                1 alerte annonce. <a href="">Cliquez ici pour les consulter</a>
            </div>
        </div>
    </section>
    <section>
        <div class="row px-3">
            <div class="col-md-3">
                <div class="card mb-4 orange text-white text-left border-0">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-maximize" style="font-size : 25px"></i>
                            <div class="ml-4">
                                <div class="text-white "><strong>LOGEMENTS</strong></div>
                                <div class="text-large">  {{ logement && logement }} </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card mb-4 green text-white text-left border-0">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-maximize" style="font-size : 25px"></i>
                            <div class="ml-4">
                                <div class="text-white "><strong>CONTRAT DE LOCATION</strong></div>
                                <div class="text-large">{{ contrats && contrats }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card mb-4 red text-white text-left border-0">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-maximize" style="font-size : 25px"></i>
                            <div class="ml-4">
                                <div class="text-white "><strong>LOYERS IMPAYES</strong></div>
                                <div class="text-large"> {{ loyers && loyers }}  </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card mb-4 yellow text-white text-left border-0">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-maximize" style="font-size : 25px"></i>
                            <div class="ml-4">
                                <div class="text-white "><strong>LOCATAIRES</strong></div>
                                <div class="text-large"> {{ contrats && contrats }} </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
</section>
</template>

<script>
import { processFetcherAuth } from '../../../../data/process-auth';
import { STATS_PROPRIETAIRE } from '../../../../router/APIrouter';
const routes = [{
    path: 'index',
    breadcrumbName: 'Tableau de board',
}, ];
export default {
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
            logement : null,
            contrats : null,
            loyers : null,
        }
    },
    methods: {
        handleStatsProp() {
            processFetcherAuth (STATS_PROPRIETAIRE).then((res) => {
                console.log (res)
                this.logement = res.logements
                this.contrats = res.contrats
                this.loyers = res.loyers
            })
        }
    },
    mounted() {
        this.handleStatsProp ();
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
