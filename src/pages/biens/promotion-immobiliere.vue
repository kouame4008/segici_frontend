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
                <div class="row justify-content-center d-none">
                    <div class="col-md-10" style="position : relative; top : -20px">
                        <label for="">Rechercher une maison</label>
                        <a-input v-model:value="rechercherBien" placeholder="Rechercher une maison" size="large" @search="onSearch" allow-clear @change="handleSearch" />
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6" v-for="item in typologies" :key="item.id">
                        <P_Card :item="item" />
                    </div>
                </div>
            </div>
        </section>
    </div>
</section>
</template>

<script>
import P_Card from '../../components/promo/P_Card.vue';
import {
    onBeforeMount,
    ref,
} from 'vue';
import {
    LISTE_PROMOTION_IMMO_URL
} from '../../router/APIrouter';
import {
    processListeFetcher
} from '../../data/process';

export default {
    setup() {
        const rechercherBien = ref('');
        const typologies = ref([])

        const handleGetListe = () => {
            processListeFetcher(LISTE_PROMOTION_IMMO_URL).then((res) => {
                typologies.value = res
            })
        }

        const handleSearch = () => {
            //    rechercherBien.value = "hghghfgfhg"
        }

        onBeforeMount(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
            handleGetListe();
        })

        return {
            rechercherBien,
            handleSearch,
            typologies
        };
    },
    components: {
        P_Card
    }
};
</script>

<style>
</style>
