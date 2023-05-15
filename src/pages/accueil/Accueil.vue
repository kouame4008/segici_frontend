<template>
  <section id="Accueil">
    <Spin :spinning="loadingSlide">
      <div class="main-content-wrapper">
        <section class="slider-section">
          <div class="slider-container">
            <a-carousel arrows :autoplaySpeed="7000">
              <template #prevArrow>
                <div class="custom-slick-arrow" style="left: 10px; zindex: 1">
                  <left-circle-outlined />
                </div>
              </template>
              <template #nextArrow>
                <div class="custom-slick-arrow" style="right: 10px">
                  <right-circle-outlined />
                </div>
              </template>
              <!-- <ul class="site-slider"> -->
              <div
                v-for="(slide, i) in slides"
                :key="i"
                class="position-relative"
              >
                <div class="slider-img">
                  <img :src="API_STORAGE + 'slides/' + slide.ficher" />
                </div>
                <div class="slider-text"></div>
              </div>
            </a-carousel>
            <ul class="site-slider d-none"></ul>
          </div>
        </section>

        <div class="search">
          <search-component />
        </div>

        <section class="section">
          <div class="container">
            <div class="row" data-aos="fade-up">
              <page-title title="" subTitle="NOS RÉSIDENCES MEUBLÉES" />
            </div>
            <residences />
          </div>
        </section>

        <section class="home-aboutus">
          <div class="container">
            <a-skeleton :loading="loading">
              <div class="row">
                <div class="d-flex flex-column w-100">
                  <span class="page-sub-title"> </span>
                  <strong class="page-title">{{
                    accueil && accueil.texte_1
                  }}</strong>
                  <strong class="page-title">{{
                    accueil && accueil.texte_2
                  }}</strong>
                </div>
                <div class="text-begin">
                  {{ accueil && accueil.texte_3 }}
                </div>
              </div>
            </a-skeleton>
          </div>
          <devenir-patners />
        </section>

        <section class="pb-0 section" data-aos="fade-up">
            <div class="home-feature-bg">
                <div class="container">
                    <div class="row ">
                        <page-title title="Biens en vedette" subTitle="BIENS RÉCEMMENT MIS EN LIGNE" />
                    </div>
                    <div class="mt-4 row">
                        <div class="col-md-4" v-for="item in biens" :key="item.id">
                            <biens :item="item" />
                        </div>
                    </div>

                    <div class="mt-4 row">
                        <div class="d-flex justify-content-center w-100">
                            <a-button type="" class="a-button" size="large" @click="handleRedirect">
                                AFFICHER TOUS LES BIENS
                            </a-button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section" style="padding-bottom: 0;" data-aos="fade-up">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-lg-12">
                        <div class="latest-project-wrapper">
                            <!-- Project Carousel -->
                            <div class="row">
                                <div class="mt-3 col-md-4">
                                    <div class="box">
                                        <div class="content">
                                            <a href="/maisons">
                                                <div class="content-overlay"></div> <img class="content-image" src="@/assets/images/img/project-1.jpg" alt="project">
                                                <div class="content-details">
                                                    <div class="alert-icon">
                                                        <span class="as-icon">
                                                            <i class="fa fa-house-user" style="font-size : 30px"></i>
                                                        </span>
                                                    </div>
                                                    <h3 class="content-title">MAISONS</h3>
                                                    <a href="/maisons" class="learn-more-project-btn">
                                                        Plus d'infos
                                                        <ArrowRightOutlined style="position : relative; top : -4px" />
                                                    </a>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-3 col-md-4">
                                    <div class="box">
                                        <div class="content">
                                            <a href="/terrains">
                                                <div class="content-overlay"></div> <img class="content-image" src="@/assets/images/img/project-3.jpg" alt="project">
                                                <div class="content-details">
                                                    <div class="alert-icon">
                                                        <span class="as-icon">
                                                            <i class="fa fa-igloo" style="font-size : 30px"></i>
                                                        </span>
                                                    </div>
                                                    <h3 class="content-title">TERRAINS</h3>
                                                    <a href="/terrains" class="learn-more-project-btn">
                                                        Plus d'infos
                                                        <ArrowRightOutlined style="position : relative; top : -4px" />
                                                    </a>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-3 col-md-4">
                                    <div class="box">
                                        <div class="content">
                                            <a href="/residences-meublees">
                                                <div class="content-overlay"></div> <img class="content-image" src="@/assets/images/img/project-5.jpg" alt="project">
                                                <div class="content-details">
                                                    <div class="alert-icon">
                                                        <span class="as-icon">
                                                            <i class="fa fa-building" style="font-size : 30px"></i>
                                                        </span>
                                                    </div>
                                                    <h3 class="content-title">RESIDENCES MEUBLEES</h3>
                                                    <a href="/residences-meublees" class="learn-more-project-btn">
                                                        Plus d'infos
                                                        <ArrowRightOutlined style="position : relative; top : -4px" />
                                                    </a>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-3 col-md-4">
                                    <div class="box">
                                        <div class="content">
                                            <a href="/promotion-immobiliere">
                                                <div class="content-overlay"></div> <img class="content-image" src="@/assets/images/img/project-5.jpg" alt="project">
                                                <div class="content-details">
                                                    <div class="alert-icon">
                                                        <span class="as-icon">
                                                            <i class="fa fa-building" style="font-size : 30px"></i>
                                                        </span>
                                                    </div>
                                                    <h3 class="content-title">PROMOTION IMMOBILIERE</h3>
                                                    <a href="/promotion-immobiliere" class="learn-more-project-btn">
                                                        Plus d'infos
                                                        <ArrowRightOutlined style="position : relative; top : -4px" />
                                                    </a>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-3 col-md-4">
                                    <div class="box">
                                        <div class="content">
                                            <alerte-email />
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-3 col-md-4">
                                    <div class="box">
                                        <div class="content">
                                            <a href="" @click.prevent="handleOpenAvisModal">
                                                <div class="content-overlay"></div> <img class="content-image" src="@/assets/images/img/project-1.jpg" alt="project">
                                                <div class="content-details">
                                                    <div class="alert-icon">
                                                        <span class="as-icon">
                                                            <i class="fa fa-user" style="font-size : 30px"></i>
                                                        </span>
                                                    </div>
                                                    <h3 class="content-title">AVIS CLIENTS</h3>
                                                    <a href="@/pages/project-detail.html" class="learn-more-project-btn">
                                                        Plus d'infos
                                                        <ArrowRightOutlined style="position : relative; top : -4px" />
                                                    </a>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="mb-4 mt-4 contactus-ba" data-aos="fade-up">
            <div class="container">
                <div class="row space-align-container">
                    <div class="col-12 d-flex justify-content-center">
                        <div class="row">
                            <div class="mb-3 col-md-4 ">
                                <div class="d-flex justify-content-center">
                                    <a-button type="" class="a-button-rappel position-relative" size="large" @click="etre_rappeler = true">
                                        ÊTRE RAPPELÉ
                                    </a-button>
                                </div>
                            </div>

                            <div class="mb-3 col-md-4">
                                <div class="d-flex justify-content-center">
                                    <a-button type="" class="a-button-rappel position-relative" size="large" @click="prendre_rdv = true">
                                        PRENDRE RENDEZ-VOUS
                                    </a-button>
                                </div>
                            </div>

                            <div class="mb-3 col-md-4">
                                <div class="d-flex justify-content-center">
                                    <a-button type="" class="a-button-rappel position-relative" size="large" @click="envoi_msg = true">
                                        ENVOYER UN MESSAGE
                                    </a-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <a-modal v-model:visible="etre_rappeler" title="ÊTRE RAPPELÉ" :footer="false" @ok="handleOk" class="etre_rappeler" width="800px">
            <nous-contacter @close="closeModal" />
        </a-modal>

        <a-modal v-model:visible="prendre_rdv" title="PRENDRE RDV" :footer="false" @ok="handleOk" class="etre_rappeler" width="800px">
            <prendre-rdv @close="closeModal" />
        </a-modal>

        <a-modal v-model:visible="envoi_msg" title="ENVOYER UN MESSAGE" :footer="false" @ok="handleOk" class="etre_rappeler" width="800px">
            <envoi-message @close="closeModal" />
        </a-modal>

        <a-modal v-model:visible="avisModal" title="LAISSER UN AVIS" :footer="false" @ok="handleOk" class="etre_rappeler" width="800px">
            <avis-form-new @close="closeModal" />
        </a-modal>




      </div>
    </Spin>
  </section>
</template>
<script>
import { Spin } from "ant-design-vue";
import { processListeFetcher } from "../../data/process";
import { LISTE_SLIDES, API_STORAGE, INFO_ACCUEIL, LISTE_BIEN } from "../../router/APIrouter";
import { LeftCircleOutlined, RightCircleOutlined, ArrowRightOutlined } from "@ant-design/icons-vue";
import searchComponent from "../../components/rechercher/search-component.vue";
import pageTitle from "../../components/page-title/page-title.vue";
import Residences from "../../components/residences/residences-meuble.vue";
import DevenirPatners from '../../components/patners/Devenir-patners.vue';
import biens from '../../components/card-bien/Biens.vue';
import alerteEmail from '../../components/alerte/alerte-email.vue';
// import AvisComponent from '../../components/avis/avis-component.vue';

import nousContacter from '../../components/form-component/Nous-contacter.vue';
import prendreRdv from '../../components/form-component/prendre-rdv.vue';
import envoiMessage from '../../components/form-component/envoi-message.vue';
import avisFormNew from '../../components/avis/avis-form-new.vue';









export default {
  components: {
    Spin,
    LeftCircleOutlined,
    RightCircleOutlined,
    searchComponent,
    pageTitle,
    Residences,
    DevenirPatners,
    biens,
    ArrowRightOutlined,
    alerteEmail,
    nousContacter,
    prendreRdv,
    envoiMessage,
    avisFormNew

  },
  data() {
    return {
      loadingSlide: false,
      slides: [],
      API_STORAGE,
      accueil: null,
      loading: false,
      biens : [],
      etre_rappeler : false,
      prendre_rdv : false,
      envoi_msg : false,
      avisModal : false,
    };
  },
  methods: {
    getSlides() {
      this.loadingSlide = true;
      processListeFetcher(LISTE_SLIDES).then((res) => {
        this.loadingSlide = false;
        this.slides = res;
      });
    },
    getInfoAccueil() {
      this.loading = true;

      processListeFetcher(INFO_ACCUEIL).then((res) => {
        this.loading = false;
        this.accueil = res;
      });
    },
    getListeBiens () {
        processListeFetcher(`${LISTE_BIEN}?etat_bien=3`).then((res) => {
            this.biens = res;
        })
    },
    handleRedirect () { window.location.href = '/tous-les-biens'},
    closeModal () {
       this.envoi_msg = false
       this.prendre_rdv = false;
       this.etre_rappeler = false;
       this.avisModal = false;
    },
    handleOk () {}
  },
  mounted() {
    this.getSlides();
    this.getInfoAccueil ();
    this.getListeBiens ()
  },
};
</script>
<style lang="scss">
@import '../../scss/_variable.scss';
    
.text-begin {
    width: 100%;
    text-align: center;
    font-size: 16px;
    margin-top: 1rem;
}

.tab-content-block {
    background: url('../../assets/images/bg_agence.png');
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

.ant-carousel .slick-slide {
    text-align: center;
    overflow: hidden;
}

.ant-carousel .slick-arrow.custom-slick-arrow {
    width: 45px;
    height: 45px;
    font-size: 25px;
    color: #fff;
    background-color: $primary_color;
    z-index: 9;
    display: flex !important;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
}

.ant-carousel .custom-slick-arrow:before {
    display: none;
}

.ant-carousel .custom-slick-arrow:hover {
    color: #fff !important;
    background-color: $primary_color !important;
    z-index: 9 !important;
}

.ant-carousel .slick-slide h3 {
    color: #fff;
}

.etre_rappeler .ant-modal-body {
    background: #FFF !important;
}</style>
