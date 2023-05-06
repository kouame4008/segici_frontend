<template>
<section>
    <div class="main-content-wrapper">
        <section class="breadcrumb-section about">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-lg-5">
                        <div class="breadcrumb-wrapper">
                            <h2>NOS PROMOTIONS IMMOBILIERES</h2>
                            <nav>
                                <ul>
                                    <li class="breadcrumb-item"><a href="#">Accueil</a></li>
                                    <li class="breadcrumb-item active">
                                        <a href="#">NOS PROMOTIONS IMMOBILIERES</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="row mt-2">
                    <div class="col-md-6">
                        <div class="full-width">
                            <div class="q-pa-md">
                                <q-carousel swipeable animated v-model="slide" thumbnails infinite>
                                    <q-carousel-slide v-for="(image,i) in images" :key="image.id" :name="i" :img-src="API+'fichier/promotion/'+image.libelle_image" />
                                </q-carousel>
                            </div>

                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="full-width mt-2">
                            <header>
                                <h4 class="text-h4"> {{ promo && promo.nom_promo }} </h4>
                            </header>
                        </div>

                        <div class="full-width q-mt-md" v-if="promo">
                            <h6 class="text-h6"> à partir de </h6>
                            <h4 class="text-h4 text-color-b"> {{ promo && formatteurMillier (promo.prix_min_promo)  }} </h4>

                            <div class="full-width mt-2">
                                <h6 class="text-h6"> <span class="text-danger">Livraison :</span> <span class="text-bold"> a partir du {{ promo && moment (promo.date_livraison_promo).format ('DD-MM-YYYY') }} </span> </h6>
                            </div>

                            <div class="full-width mt-2">
                                <h6 class="text-h6"> <span class="text-danger">Statut :</span> <span class="text-bold">
                                        <span v-if="promo && promo.statut_promo == 0">Travaux en cours</span>
                                        <span v-if="promo && promo.statut_promo == 1">Travaux terminés</span>
                                    </span> </h6>
                            </div>

                            <div class="full-width mt-2">
                                <h6 class="text-h6"> <span class="text-danger">Typologie :</span> <span class="text-bold"> {{ promo && promo.typographie_promo }} </span> </h6>
                            </div>

                            <div class="full-width mt-2">
                                <h6 class="text-h6" style="color: #002870;"> de {{ promo && formatteurMillier (promo.prix_min_promo)  }} à {{ promo && formatteurMillier (promo.prix_max_promo)  }} , {{ promo && promo.nombre_loge_promo  }} logement(s) disponible(s) </h6>
                            </div>

                            <div class="full-width mt-2 d-flex justify-content-start">
                                <a-button type="primary" @click="handleNousContacter"> Contactez-nous </a-button>
                            </div>

                        </div>

                    </div>

                    <div class="col-md-12">
                        <div class="full-width mt-2">
                            <h5 class="text-h5 text-danger"> A PROXIMITE </h5>
                            <hr>

                            <table class="table table-hover">
                                <thead>
                                    <tr class="bg-light">
                                        <th>Eglise</th>
                                        <th>Mosquée</th>
                                        <th>Supermarché</th>
                                        <th>Ecole</th>
                                        <th>Hôpital</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td> {{ promo && promo.eglise }} </td>
                                        <td> {{ promo && promo.mosquee }} </td>
                                        <td> {{ promo && promo.supermarche }} </td>
                                        <td> {{ promo && promo.ecole }} </td>
                                        <td> {{ promo && promo.hopital }} </td>

                                    </tr>
                                </tbody>

                            </table>
                        </div>

                    </div>

                    <div class="col-md-12">
                        <div class="full-width mt-2">
                            <h5 class="text-h5 text-danger"> DESCRIPTION </h5>
                            <hr>

                            <div class="text-justify">
                                {{ promo && promo.description }}
                            </div>
                        </div>

                    </div>

                    <div class="col-md-12">
                        <div class="full-width mt-4">
                            <h5 class="text-h5 text-danger"> GRILLE TARIFAIRE </h5>
                            <hr>

                            <div class="">
                                <a-collapse v-model:activeKey="activeKey" :expand-icon-position="expandIconPosition">
                                    <a-collapse-panel v-for="el in typologies" :key="el.id">
                                        <template #key>1</template>
                                        <template #header>
                                            <h6 class="text-h6"><span> <strong>{{ el.libelle_typo }}</strong> à partie de <strong class="text-danger">{{formatteurMillier (el.prix_min_typo) }}</strong> de <strong>{{ el.superficie_typo }} m²</strong> </span></h6>
                                        </template>

                                        <table class="table table-striped table-hover" v-if="el.lots.length > 0">
                                            <thead>
                                                <tr class="bg-light">
                                                    <th> Type du bien </th>
                                                    <th>Surface (m2) </th>
                                                    <th> Étage </th>
                                                    <th> Plan </th>
                                                    <th> Prix(Fcfa) </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="lot in el.lots" :key="lot.id">
                                                    <td> {{ lot.libelle_type_maison }} </td>
                                                    <td> {{ lot.surface_lots }} </td>
                                                    <td> {{ lot.etage_lots }}</td>
                                                    <td>
                                                        <a-space v-if="lot.chemin_plan">
                                                            <FilePdfOutlined style="color : red" />
                                                            <a :href="API+'fichier/promotion/'+lot.chemin_plan" class="text-black" target="_blank">Télécharger Plan</a>
                                                        </a-space>
                                                    </td>
                                                    <td> {{ formatteurMillier (lot.prix_lots) }} </td>

                                                </tr>
                                            </tbody>
                                        </table>

                                    </a-collapse-panel>
                                </a-collapse>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    </div>
    <Modal v-model:visible="visible" :footer="false" width="800px" class="modalContact">
        <template #header> Formulaire de contact </template>
        <NousContacter />
    </Modal>

</section>
</template>

<script>
import {
    onBeforeMount,
    ref
} from '@vue/runtime-core';
import {
    useRoute
} from 'vue-router';
import {
    API,
    LISTE_TYPOGRAPHIE_PROMOTION_IMMO_URL,
    SELECTIONNEZ_PROMOTION_IMMO_URL
} from '../../router/APIrouter';
import {
    processData
} from '../../data/process';
import {
    formatteurMillier
} from '../../helpers/ServicesHelpers';
import moment from 'moment';
import {
    FilePdfOutlined,
} from '@ant-design/icons-vue';
import NousContacter from '../../components/form-component/Nous-contacter.vue';
import {
    Modal
} from 'ant-design-vue';

export default {
    components: {
        FilePdfOutlined,
        NousContacter,
        Modal
    },
    setup() {
        const route = useRoute();
        const promo = ref(null);
        const images = ref(null);
        const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
        const activeKey = ref(['1']);
        const typologies = ref([])
        const visible = ref(false)

        const handleGetElement = () => {
            let slug = route.params.slug;
            let data = {
                bien_slug: slug
            }

            processData(SELECTIONNEZ_PROMOTION_IMMO_URL, data).then((res) => {
                if (res.status == "succes") {
                    promo.value = res.resultat;
                    images.value = res.images;

                    let form = {
                        slug: slug
                    }

                    processData(LISTE_TYPOGRAPHIE_PROMOTION_IMMO_URL, form).then((res) => {
                        typologies.value = res.resultat;
                    })
                }
            })
        }

        const handleNousContacter = () => {
            visible.value = true;
        }

        onBeforeMount(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
            handleGetElement()
        })

        return {
            promo,
            slide: ref(0),
            images,
            API,
            formatteurMillier,
            moment,
            text,
            activeKey,
            typologies,
            expandIconPosition: ref('right'),
            handleNousContacter,
            visible
        }
    }
}
</script>

<style>
    .modalContact label{
        color: #FFF
    }
</style>
