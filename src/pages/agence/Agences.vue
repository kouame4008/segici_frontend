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

    <section class="section bg-white">
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-12 col-md-12 item">
                    <div class="company-overview-wrapper">
                        <h2 class="main-heading m-0">NOS AGENCES</h2>
                        <hr />
                        <div class="row">
                            <div class="col-md-4 mb-3" v-for="agence in agences" :key="agence.id">
                                <div class="services-box-wrapper border">
                                    <div class="service-box-body">
                                        <router-link :to="{name:  'AgencesDetail', params: {id :agence.id}}">
                                        <img :src="API_STORAGE+'agence/'+agence.image_agence" alt="img" /></router-link>
                                        <div class="service-box-info">
                                            <router-link :to="{name:  'AgencesDetail', params: {id :agence.id}}">
                                                <h5 class="services-heaading">
                                                    {{ agence.libelle_agence }}
                                                </h5>
                                            </router-link>
                                            <p class="services-sub-para"></p>
                                            <router-link :to="{name:  'AgencesDetail', params: {id :agence.id}}" class="know-icon-btn"><i class="material-icons">arrow_forward</i></router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</div>
</template>

<script>
import useAgence from '../../data/agences/use-agence';
import {
    API_STORAGE
} from '../../router/APIrouter';

export default {
    setup() {
        const {
            agences
        } = useAgence();

        return {
            agences,
            API_STORAGE
        }
    }
}
</script>

<style>

</style>
