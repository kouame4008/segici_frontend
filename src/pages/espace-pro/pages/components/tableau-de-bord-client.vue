<template>
<section>
    <a-page-header :breadcrumb="{ routes }">
        <template #title>
            Tableau de board Entreprise Client
        </template>
    </a-page-header>
    <section>
        <div class="row">
            <div class="col-md-6">
            </div>
        </div>
    </section>
</section>
</template>

<script>
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
            }
        }
    },
}
</script>

<style>
.ant-breadcrumb {
    text-align: left;
}
</style>
