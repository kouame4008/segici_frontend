<template>
<section>
    <a-page-header :breadcrumb="{ routes }">
        <template #title>
            Consultation des offres
        </template>
    </a-page-header>
    <section>
        <div class="row">
            <div class="col-md-4" v-for="item in biens" :key="item.id">
                <biens :item="item" />
            </div>
        </div>
    </section>
</section>
</template>

<script>
import useBien from "../../../../data/biens/use-bien";
import biens from '../../../../components/card-bien/Biens.vue';

const routes = [{
    path: 'index',
    breadcrumbName: 'Offres SEGICI',
}, ];

export default {
    components: {
        biens
    },
    setup() {
        let etat_bien = 5;
        const {
            biens
        } = useBien(etat_bien);

        return {
            routes,
            biens,
        }
    }
}
</script>

<style>

</style>
