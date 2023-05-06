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
                <div class="col-12 col-lg-9">
                    <div class="main-heading-block">
                        <h2 class="main-heading">
                            Nous offrons les meilleurs <br /> services et solutions
                        </h2>
                        <p class="white-color"></p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-lg-4 col-md-6 item" v-for="service in services" :key="service.id">
                    <div class="services-box-wrapper border">
                        <div class="service-box-body">
                            <router-link :to="{name:  'ServicesDetails', params: {id :service.id}}" ><img :src="API_STORAGE+'services/'+service.image_service" alt="img" /></router-link>
                            <div class="service-box-info">
                                <router-link :to="{name:  'ServicesDetails', params: {id :service.id}}" >
                                    <h5 class="services-heaading">
                                        {{ service.libelle_service }}
                                    </h5>
                                </router-link>
                                <p class="services-sub-para"></p>
                                <router-link :to="{name:  'ServicesDetails', params: {id :service.id}}" class="know-icon-btn"><i class="material-icons">arrow_forward</i></router-link>
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
import useService from '../../data/service/use-service';
import {API_STORAGE} from '../../router/APIrouter';

export default {
    setup () {
        const {services} = useService ();

        return {
            services,
            API_STORAGE
        }
    }
}
</script>

<style>

</style>
