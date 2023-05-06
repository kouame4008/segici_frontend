<template>
<div class="q-pa-md row items-start q-gutter-md">

    <q-card class="my-card">
        <q-card-section horizontal>
            <q-img v-if="item && item.image_pro" class="col-5" :src="API+'fichier/promotion/'+item.image_pro" />

            <q-card-section>
                <div class="full-width el-title">
                    {{ item.nom_promo }}
                </div>

                <div class="full-width  row justify-end q-pa-lg">
                    <span class="full-width text-right"> à partir de </span>
                    <span class="el-partie-de full-width text-right">{{ formatteurMillier (item.prix_min_promo) }}</span>
                </div>

                <div class="q-pt-md article-descript">
                    {{ item.description }}
                </div>

                <div class="q-pt-md">
                    <strong>Livraison provisionnelle</strong> : à partir du {{ moment (item.date_livraison_promo).format ('DD-MM-YYYY') }}
                </div>

                <div class="q-pt-md q-pr-md full-width row justify-content-end">
                    <q-btn unelevated rounded color="primary" class="d-flex justify-content-center" @click="handleGoPageDetail (item) ">
                        Découvrir
                    </q-btn>
                </div>
            </q-card-section>

        </q-card-section>

    </q-card>
</div>
</template>

<script>
import {
    defineComponent
} from 'vue';
import {
    formatteurMillier
} from '../../helpers/ServicesHelpers';
import moment from 'moment';
import {
    API
} from '../../router/APIrouter';
import {
    useRouter
} from 'vue-router';

export default defineComponent({
    props: {
        item: {
            type: Object
        }
    },
    setup() {
        const router = useRouter();

        const handleGoPageDetail = (it) => {
            router.push({
                name: 'DetailsPromotionImmobiliere',
                params: {
                    slug: it.slug
                }
            })
        }

        return {
            formatteurMillier,
            moment,
            API,
            handleGoPageDetail
        }
    },
})
</script>

<style>

</style>
