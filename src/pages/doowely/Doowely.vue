<template>
<section id="Accueil">
    <!--div id="loading"> <img id="loading-image" src="@/assets/images/loader.svg" alt="Loading@." /> </div-->

    <div class="main-content-wrapper">
        <section class="breadcrumb-section about">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-lg-10">
                        <div class="breadcrumb-wrapper">
                            <h2 class="text-center">
                                Consulter vos documents en ligne
                            </h2>
                            <nav>
                                <ul>
                                    <li class="breadcrumb-item"><a href="#">Accueil</a></li>
                                    <li class="breadcrumb-item active">
                                        <a href="#">DOOWELY</a>
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
                <div class="row">
                    <div class="col-12 col-lg-6 col-md-6 mb-3" v-for="doo in doowelys" :key="doo.id">
                        <div class="services-box-wrapper border">
                            <div class="service-box-body doowely-box">
                                <a :href="API+'fichier/doowely/'+doo.document_pdf" target="_bank">
                                    <img :src="API+'fichier/doowely/'+doo.image_couverture" alt="img" />
                                </a>
                                <div class="service-box-info">
                                    <a :href="API+'fichier/doowely/'+doo.document_pdf" target="_bank">
                                        <h5 class="services-heaading">
                                            {{ doo.nom_document }}
                                        </h5>
                                    </a>
                                    <p class="services-sub-para"></p>
                                    <a-tooltip title="Lire en PDF">
                                        <a class="know-icon-btn" :href="API+'fichier/doowely/'+doo.document_pdf" target="_bank"><i class="material-icons">arrow_forward</i></a>
                                    </a-tooltip>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

    </div>
</section>
</template>

<script>
import {
    API,
    LISTE_DOOWELY
} from '../../router/APIrouter';
import {
    processListeFetcher
} from '../../data/process';

export default {
    data() {
        return {
            doowelys: [],
            loading: true,
            API
        }
    },
    methods: {
        handleListeDoowely() {
            processListeFetcher(LISTE_DOOWELY).then((res) => {
                this.loading = false;
                this.doowelys = res;
            })
        }
    },
    mounted() {
        this.handleListeDoowely();
    }
};
</script>

<style lang="scss">
@import "../../scss/_variable.scss";

.text-begin {
    width: 100%;
    text-align: center;
    font-size: 16px;
    margin-top: 1rem;
}

.tab-content-block {
    background: url("../../assets/images/bg_agence.png");
    background-size: cover;
}

.av-sub-title {
    font-family: $fontFamily;
    font-size: 16px;
    margin-bottom: 1rem;
    display: inline-flex;
}

.icon {
    font-size: 20px;
    padding-top: 5px;
    display: inline-block;
}

.doowely-box a img {
    height: 290px;
}
</style>
