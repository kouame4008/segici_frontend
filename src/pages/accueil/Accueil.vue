<template>
<section id="Accueil">
    <Spin :spinning="loadingSlide">
        <div class="main-content-wrapper">
            <!-- content section -->

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
                        <div v-for="(slide, i) in slides" :key="i" class="position-relative">
                            <div class="slider-img">
                                <img :src="API_STORAGE+'slides/'+slide.ficher" />
                            </div>
                            <div class="slider-text">
                                <!-- <span class="text-left" v-html="slide.titre"></span> -->
                                <!-- <p class="ml-3"><span>Parcourez notre catalogue de maison et trouvez la maison qui vous correspond</span></p> -->
                                <!-- <div class="banner-btns"> <a href="@/pages/about-us.html" class="banner-learn-btn d-none">Louer un logement</a> </div> -->
                            </div>
                        </div>
                        <!-- </ul> -->
                    </a-carousel>
                    <ul class="site-slider d-none">
                        <!-- <li v-for="(slide, i) in slides" :key="i">
                        <div class="slider-img"><img :src="API_STORAGE+'slides/'+slide.ficher" alt="Sldie 2" /></div>
                        <div class="slider-text">
                            <span class="text-white" v-html="slide.titre"></span>
                            <p class="text-white"><span>Parcourez notre catalogue de maison et trouvez la maison qui vous correspond</span></p>
                            <div class="banner-btns"> <a href="@/pages/about-us.html" class="banner-learn-btn d-none">Louer un logement</a> </div>
                        </div>
                    </li> -->

                        <!-- <li>
                        <div class="slider-img">
                            <video style="width : 100%" muted autoplay loop>
                                <source src="https://www.paypalobjects.com/webstatic/mktg/wright/videos/home-signup.mp4" type="video/mp4">
                            </video>
                        </div>
                        <div class="slider-text">
                            <h3 class="text-white"></h3>
                        </div>
                    </li> -->

                        <!-- <li>
                        <div class="slider-img"><img src="@/assets/images/banner-3.jpg" alt="Sldie 3" /></div>
                        <div class="slider-text">
                            <h3>TROUVER VOTRE MAISON<br>A MOINDRE COÛT</h3>
                            <p><span>Parcourez notre catalogue de logements et trouvez la maison qui vous correspond</span></p>
                            <div class="banner-btns"> <a href="@/pages/about-us.html" class="banner-learn-btn d-none">Louer un logement</a> </div>
                        </div>
                    </li> -->
                    </ul>
                </div>
            </section>

            <!-- search component -->
            <div class="search">
                <!-- <div class="d-flex justify-content-end"> 
                <Button
                    type="primary"
                 >
                    <template #icon> <SearchOutlined /> </template>
                 </Button>

            </div> -->
                <search-component />
            </div>

            <!-- residence meublées -->
            <section class="section">
                <div class="container">
                    <div class="row" data-aos="fade-up">
                        <page-title title="" subTitle="NOS RÉSIDENCES MEUBLÉES" />
                    </div>
                    <residences />
                </div>
            </section>
            <!-- aboutus start -->
            <section class="home-aboutus">
                <div class="container">
                    <a-skeleton :loading="loading">
                        <div class="row">
                            <div class="d-flex flex-column w-100">
                                <span class="page-sub-title"> </span>
                                <strong class="page-title">{{ accueil && accueil.texte_1 }}</strong>
                                <strong class="page-title">{{ accueil && accueil.texte_2 }}</strong>
                            </div>
                            <div class="text-begin">
                                {{ accueil && accueil.texte_3 }}
                            </div>
                        </div>
                    </a-skeleton>
                </div>
                <devenir-patners />
            </section>

            <!-- Nos biens -->
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
            <!-- feature end -->
            <!-- counter start -->
            <section class="section counter-bg d-none" data-aos="fade-up">
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-lg-3 col-md-6 item">
                            <div class="company-counter-wrapper">
                                <div class="count-number-box">
                                    <h3>100+</h3>
                                </div>
                                <h2 class="count-info-name">Biens publiés</h2>
                            </div>
                        </div>
                        <div class="col-12 col-lg-3 col-md-6 item">
                            <div class="company-counter-wrapper">
                                <div class="count-number-box">
                                    <h3>90</h3>
                                </div>
                                <h2 class="count-info-name">Résidences Immobilière</h2>
                            </div>
                        </div>
                        <div class="col-12 col-lg-3 col-md-6 item">
                            <div class="company-counter-wrapper">
                                <div class="count-number-box">
                                    <h3>50</h3>
                                </div>
                                <h2 class="count-info-name">Partenaires</h2>
                            </div>
                        </div>
                        <div class="col-12 col-lg-3 col-md-6 item">
                            <div class="company-counter-wrapper">
                                <div class="count-number-box">
                                    <h3>50+</h3>
                                </div>
                                <h2 class="count-info-name">Clients satisfaits</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- services start -->

            <!-- latest project start -->
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

            <!-- latest project start -->
            <section class="section" data-aos="fade-up">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-12 col-lg-7">
                            <div class="">
                                <page-title subTitle="Avis clients" title="Ils sont satisfait" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-lg-12">
                            <avis-component />
                        </div>
                    </div>
                </div>
            </section>

            <!-- latest project end -->
            <section class="mb-4 contactus-ba" data-aos="fade-up">
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
import useSWRV from 'swrv';
import {
    ArrowRightOutlined,
    // SearchOutlined
} from '@ant-design/icons-vue';
import pageTitle from '../../components/page-title/page-title.vue';
import Residences from '../../components/residences/residences-meuble.vue';
// import avantage from '../../components/Avantage.vue';
import biens from '../../components/card-bien/Biens.vue';
import AvisComponent from '../../components/avis/avis-component.vue';
import searchComponent from '../../components/rechercher/search-component.vue';
import {
    ref
} from '@vue/reactivity';
import axios from 'axios';
import DevenirPatners from '../../components/patners/Devenir-patners.vue';
import {
    useStore
} from 'vuex';
import {
    onMounted
} from '@vue/runtime-core';
import alerteEmail from '../../components/alerte/alerte-email.vue';
import {
    API_STORAGE,
    INFO_ACCUEIL,
    LISTE_BIEN,
    LISTE_SLIDES,
} from '../../router/APIrouter';

import 'vue3-carousel/dist/carousel.css';

import {
    LeftCircleOutlined,
    RightCircleOutlined
} from '@ant-design/icons-vue';
import {
    processListeFetcher
} from '../../data/process';
import nousContacter from '../../components/form-component/Nous-contacter.vue';
import prendreRdv from '../../components/form-component/prendre-rdv.vue';
import envoiMessage from '../../components/form-component/envoi-message.vue';
import avisFormNew from '../../components/avis/avis-form-new.vue';
import {
    isMobile
} from '../../helpers/ServicesHelpers';
// import {
//     Skeleton
// } from 'ant-design-vue';

import {
    Spin
} from 'ant-design-vue';

const fetcher = (url) => axios.get(url).then((res) => res.data.resultat);

export default {
    components: {
        pageTitle,
        Residences,
        // avantage,
        ArrowRightOutlined,
        biens,
        AvisComponent,
        searchComponent,
        DevenirPatners,
        alerteEmail,
        LeftCircleOutlined,
        RightCircleOutlined,
        nousContacter,
        prendreRdv,
        envoiMessage,
        avisFormNew,
        Spin
        // Skeleton
        // Button,
        // SearchOutlined
    },
    setup() {

        const url = ref('https://femmes-tic.fyle-group.com/api/liste');
        const images = ref(['@/assets/images/img/project-1.jpg', '@/assets/images/img/project-2.jpg', '@/assets/images/img/project-3.jpg', '@/assets/images/img/project-4.jpg', '@/assets/images/img/project-5.jpg', '@/assets/images/img/project-5.jpg'])
        const {
            data: articles,
            error: articlesError
        } = useSWRV(url.value, fetcher);
        
        const etre_rappeler = ref(false);
        const prendre_rdv = ref(false)
        const envoi_msg = ref(false)
        const avisModal = ref(false)

        const store = useStore();

        const handleRedirect = () => {
            window.location.href = '/tous-les-biens'
        }

        const closeModal = () => {
            envoi_msg.value = false
            prendre_rdv.value = false;
            etre_rappeler.value = false;
            avisModal.value = false;
        }

        const handleOpenAvisModal = () => {
            avisModal.value = true
        }

        onMounted(() => {
            store.dispatch('actionEmptyResultat');
        })

        return {
            articles,
            articlesError,
            images,
            API_STORAGE,
            handleRedirect,
            accueil: null,
            etre_rappeler,
            prendre_rdv,
            envoi_msg,
            closeModal,
            handleOpenAvisModal,
            avisModal,
            isMobile: isMobile()
        }
    },
    data() {
        return {
            API: 'https://segici.fyle-group.com/js/main.js',
            swiperJs: 'https://segici.fyle-group.com/js/swiper.js',
            avisData: [],
            loading: false,
            loadingSlide: false,
            slides: [],
            biens : []
        }
    },
    methods: {
        getInfoAccueil() {
            this.loading = true;
           
            processListeFetcher(INFO_ACCUEIL).then((res) => {
                this.loading = false;
                this.accueil = res;
            })
        },
        getSlides () {
             this.loadingSlide = true;
             processListeFetcher(LISTE_SLIDES).then((res) => {
                this.loadingSlide = false;
                this.slides = res;
            })

           
        },
         getListeBiens () {
            let etat_bien = 3;

            processListeFetcher(LISTE_BIEN+'?etat_bien='+etat_bien).then((res) => {
                this.loading = false;
                this.biens = res;
            })
        }
    },
    beforeMount() {
        // alert (process.env)
        // console.log (process.env)

        // alert(isMobile ())
        this.getInfoAccueil();
        this.getSlides ();
        this.getListeBiens ();

        // this.$loadScript('https://code.jquery.com/jquery-2.2.4.js').then(() => {
        //     this.$loadScript('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.0.0-beta.2.4/owl.carousel.js').then(() => {
        //         this.$loadScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js').then(() => {
        //             this.$loadScript('https://unpkg.com/swiper/swiper-bundle.js');
        //             this.$loadScript('https://unpkg.com/aos@2.3.1/dist/aos.js');
        //             this.$loadScript('https://unpkg.com/swiper/swiper-bundle.min.js').then(() => {
        //                 console.log('Chargement Js')
        //             })

        //             this.$loadScript('https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js');
        //             this.$loadScript('https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js')
        //             this.$loadScript(this.API).then(() => {
        //                 console.log('Chargement JS')
        //             })
        //         })
        //     })
        // }).catch((e) => {
        //     console.log(e)
        // });
    },
}
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
}
</style>
