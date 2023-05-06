<template>
<div class="main-content-wrapper">
    <section class="breadcrumb-section about">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-lg-5">
                    <div class="breadcrumb-wrapper">
                        <h2>NOS SERVICES</h2>
                        <nav>
                            <ul>
                                <li class="breadcrumb-item"><a href="#">Accueil</a></li>
                                <li class="breadcrumb-item active"><a href="#">Nos services</a></li>
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
                                <h2 class="main-heading"> {{ service && service.libelle_service }} </h2>
                                <p>
                                    {{ service && service.description_service }}
                                </p>
                            </div>
                        </a-skeleton>
                    </div>
                </div>
                <div class="col-12 col-lg-6 col-md-6">
                    <a-skeleton :loading="loading">
                        <div v-if="service && service.image_service" class="single-service-content-wrapper"> <img :src="API_STORAGE+'services/'+service.image_service">
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
    SELECTIONNER_SERVICE
} from '../../router/APIrouter';

export default {
    data() {
        return {
            service: null,
            API_STORAGE,
            loading: true
        }
    },
    methods: {
        getService() {
            let data = new FormData();
            data.append('service_id', this.$route.params.id);

            processData(SELECTIONNER_SERVICE, data).then((res) => {
                this.loading = false
                this.service = res.resultat;
            })
        }
    },
    mounted() {
        this.getService()
    }
}
</script>

<style>

</style>
