<template>
<div class="main-content-wrapper">
    <section class="breadcrumb-section about">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-lg-5">
                    <div class="breadcrumb-wrapper">
                        <h2>NOS AGENCES</h2>
                        <nav>
                            <ul>
                                <li class="breadcrumb-item"><a href="#">Accueil</a></li>
                                <li class="breadcrumb-item active"><a href="#">Nos agences</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="section services1-section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-lg-6 col-md-6">
                    <div class="single-service-content-wrapper">
                        <a-skeleton :loading="loading">
                            <div class="single-service-content-body">
                                <h3 class="sub-heading-ss"></h3>
                                <h2 class="main-heading"> {{ agence && agence.libelle_agence }} </h2>
                                <p>
                                    {{ agence && agence.descrip_agence }}
                                </p>
                            </div>
                            <a-button type="" class="bien-btn" @click="openMaps"> Ouvrir dans Google Maps </a-button>
                        </a-skeleton>
                    </div>
                </div>
                <div class="col-12 col-lg-6 col-md-6">
                    <a-skeleton :loading="loading">
                        <div v-if="agence && agence.image_agence" class="single-service-content-wrapper"> <img :src="API_STORAGE+'agence/'+agence.image_agence">
                        </div>
                    </a-skeleton>
                </div>
            </div>
        </div>
    </section>

</div>
</template>

<script>
import {
    processData
} from '../../data/process';
import {
    API_STORAGE,
    SELECTIONNER_AGENCE,
} from '../../router/APIrouter';

export default {
    data() {
        return {
            agence: null,
            API_STORAGE,
            loading: true
        }
    },
    methods: {
        getService() {
            let data = new FormData();
            data.append('agence_id', this.$route.params.id);

            processData(SELECTIONNER_AGENCE, data).then((res) => {
                this.loading = false
                this.agence = res.resultat;
            })
        },
        openMaps() {
            window.open("https://maps.google.com?q="+this.agence.lat_agence+','+this.agence.lon_agence, '_bank')
        }
    },
    mounted() {
        this.getService()
    }
}
</script>

<style>

</style>
