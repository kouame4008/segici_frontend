<template>
<section id="Accueil">
    <!--div id="loading"> <img id="loading-image" src="@/assets/images/loader.svg" alt="Loading@." /> </div-->

    <div class="main-content-wrapper">
        <section class="breadcrumb-section about">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-lg-5">
                        <div class="breadcrumb-wrapper">
                            <h2>A PROPOS DE SEGICI</h2>
                            <nav>
                                <ul>
                                    <li class="breadcrumb-item"><a href="#">Accueil</a></li>
                                    <li class="breadcrumb-item active">
                                        <a href="#">SEGECI</a>
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
                    <div class="col-12 col-lg-6 col-md-6">
                        <div class="about-info-left" :style="cssProps">
                            <div class="tab-content" id="nav-tabContent">
                                <div class="tab-pane fade show active" id="who-we" role="tabpanel" aria-labelledby="who-we-tab">
                                    <div class="tab-content-wrapper">

                                        <h2>ANY KIND PROJECT PLANNING</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-6 col-md-6">
                        <div class="about-home-right-info">
                            <h3 class="sub-heading-small">QUI SOMMES-NOUS ?</h3>
                            <h2 v-html="Propos && Propos.titre_apropos"></h2>
                            <hr />
                            <p v-html="Propos && Propos.desc_apropos"></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section bg-white" data-aos="zoom-in">
            <div class="container">
                <div class="row row-eq-height mt-4">
                    <div class="col-12 col-lg-6 col-md-6">
                        <div class="company-overview-wrapper">
                            <h2 class="main-heading m-0" v-html="Propos && Propos.titre_valeur"></h2>
                            <hr />
                            <p v-html="Propos && Propos.desc_valeur"></p>

                            <div class="collapse-paneel-wrapper">
                                <div class="accordion" id="accordionExample">
                                    <div class="card">
                                        <div class="card-header" id="headingOne">
                                            <h5 class="mb-0">
                                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    {{ Propos && Propos.valeur_ecoute_titre }}
                                                    <i class="material-icons">expand_more</i>
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                            <div class="card-body">
                                                <p v-html="Propos && Propos.valeur_ecoute"></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="headingTwo">
                                            <h5 class="mb-0">
                                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    {{ Propos && Propos.valeur_qualite_titre }}
                                                    <i class="material-icons">expand_more</i>
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                            <div class="card-body">
                                                <p v-html="Propos && Propos.valeur_qualite"></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="headingThree">
                                            <h5 class="mb-0">
                                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    {{ Propos && Propos.valeur_confiance_titre }}
                                                    <i class="material-icons">expand_more</i>
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                            <div class="card-body">
                                                <p v-html="Propos && Propos.valeur_confiance"></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="headingThree">
                                            <h5 class="mb-0">
                                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    {{ Propos && Propos.valeur_trans_titre }}
                                                    <i class="material-icons">expand_more</i>
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                            <div class="card-body">
                                                <p v-html="Propos && Propos.valeur_trans"></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-6 col-md-6">
                        <div class="company-overview-wrapper">
                            <div class="overview-image-top d-none">
                                <div class="overview-top-image item">
                                    <img src="@/assets/images/img/project-1.jpg" alt="img" />
                                </div>
                                <div class="overview-top-image item">
                                    <img src="@/assets/images/img/project-2.jpg" alt="img" />
                                </div>
                            </div>
                            <div class="overview-image-bottom item" v-if="Propos">
                                <img :src="API_STORAGE+'pages/'+Propos.image_valeur" alt="img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section" data-aos="zoom-in">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-lg-6 col-md-6">
                        <div class="about-home-right-info">
                            <h2 class="main-heading m-0" v-html="Propos && Propos.titre_ambition"></h2>
                            <hr />
                            <p v-html="Propos && Propos.desc_ambition"> </p>
                        </div>
                    </div>

                    <div class="col-12 col-lg-6 col-md-6">
                        <div class="about-info-left" :style="cssPropsAmbition">
                            <div class="tab-content" id="nav-tabContent">
                                <div class="tab-pane fade show active" id="who-we" role="tabpanel" aria-labelledby="who-we-tab">
                                    <div class="tab-content-wrapper">

                                        <h2></h2>
                                    </div>
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
    onMounted,
    ref
} from "@vue/runtime-core";
import {
    listeAproposFetcher
} from "../../data/apropos/apropos-action";
import {
    API_STORAGE
} from '../../router/APIrouter';
import useApropos from '../../data/apropos/use-apropos';

export default {
    setup() {
        const Propos = ref({});
        let cssProps = ref({
            backgroundImage: "",
        });

        let cssPropsAmbition = ref({
            backgroundImage: "",
        });

        const {
            apropos
        } = useApropos()

        onMounted(() => {
            listeAproposFetcher().then((res) => {
                cssProps.value.backgroundImage = `url(${API_STORAGE+'pages/'+res.image_apropos})`;
                cssPropsAmbition.value.backgroundImage = `url(${API_STORAGE+'pages/'+res.image_ambition})`;
                Propos.value = res;
            });
        });

        return {
            cssProps,
            Propos,
            apropos,
            cssPropsAmbition,
            API_STORAGE
        };
    },
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
</style>
