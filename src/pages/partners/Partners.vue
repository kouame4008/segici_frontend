<template>
<section id="Accueil">
    <!--div id="loading"> <img id="loading-image" src="@/assets/images/loader.svg" alt="Loading@." /> </div-->

    <div class="main-content-wrapper">
        <section class="breadcrumb-section about">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-lg-5">
                        <div class="breadcrumb-wrapper">
                            <h2>Nos Partenaires</h2>
                            <nav>
                                <ul>
                                    <li class="breadcrumb-item"><a href="#">Accueil</a></li>
                                    <li class="breadcrumb-item active"><a href="#">Partenaires</a></li>
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
                    <div class="col-md-12">
                        <div class="d-flex justify-content-between w-100">
                            <div>
                                <h2 class="main-heading m-0">LISTE DES PARTENAIRES</h2>
                                <hr>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 col-lg-3 col-md-6 item" v-for="record in patners" :key="record.id">
                            <div class="experts-info-wrapper">
                                <div class="content-experts">
                                    <div class="content-experts-overlay"></div>
                                    <img v-if="record.image_pat" class="content-experts-image" :src="API_STORAGE+'partenaires/'+record.image_pat" alt="team" />
                                    <img v-else class="content-experts-image" src="@/assets/images/default.jpg" alt="team" />

                                    <div class="content-experts-details fadeIn-bottom d-none">
                                        <ul>
                                            <li>
                                                <a href="#"><i class="fab fa-facebook-f"></i></a>
                                            </li>
                                            <li>
                                                <a href="#"><i class="fab fa-twitter"></i></a>
                                            </li>
                                            <li>
                                                <a href="#"><i class="fab fa-instagram"></i></a>
                                            </li>
                                            <li>
                                                <a href="#"><i class="fab fa-linkedin"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="content-expert-info">
                                    <h2> {{ record.nom_pat }} {{ record.prenom_pat }} {{ record.raison_social_pat }} </h2>
                                    <p>{{ record.libelle_type_pat }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="d-flex justify-content-between w-100">
                            <div>
                                <h2 class="main-heading m-0">LOGO DES PARTENAIRES</h2>
                                <hr>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-lg-12">
                        <!-- Project Carousel -->
                        <div class="">
                            <!-- Project -->
                            <patners-component />
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
    API_STORAGE
} from '../../router/APIrouter';
import usePatners from '../../data/patners/use-patners';
import PatnersComponent from '../../components/patners/patners-component.vue';

const columns = [{
        title: "#",
        key: "indice",
        slots: {
            customRender: "indice",
        },
    },
    {
        title: "Image",
        key: "image_bien",
        dataIndex: "image_bien",
        slots: {
            customRender: "image_bien",
        },
    },
    {
        title: "Raison sociale",
        key: "raison",
        dataIndex: "raison_social_pat",
        slots: {
            customRender: "raison",
        },
    },
    {
        title: "Téléphone",
        key: "telephone",
        dataIndex: "telephone_pat",
        slots: {
            customRender: "telephone",
        },
    },
    {
        title: "Email",
        key: "email",
        dataIndex: "email_pat",
        slots: {
            customRender: "email",
        },
    },
    {
        title: "Ville",
        key: "ville",
        dataIndex: "ville_pat",
        slots: {
            customRender: "ville",
        },
    },
    {
        title: "Logo",
        key: "logo_pat",
        dataIndex: "logo_pat",
        slots: {
            customRender: "logo",
        },
    },
];

export default {
    setup() {
        const {
            patners
        } = usePatners()
        return {
            patners,
            API_STORAGE,
            columns
        }

    },

    data() {
        return {
            API: 'https://segici.fyle-group.com/js/main.js',
            swiperJs: 'https://segici.fyle-group.com/js/swiper.js',
        }
    },
    mounted() {
        this.$loadScript('https://code.jquery.com/jquery-2.2.4.js').then(() => {
            this.$loadScript('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.0.0-beta.2.4/owl.carousel.js').then(() => {
                this.$loadScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js').then(() => {
                    this.$loadScript('https://unpkg.com/swiper/swiper-bundle.js');
                    this.$loadScript('https://unpkg.com/aos@2.3.1/dist/aos.js');
                    this.$loadScript('https://unpkg.com/swiper/swiper-bundle.min.js').then(() => {

                    })

                    this.$loadScript('https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js');
                    this.$loadScript('https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js')
                    this.$loadScript(this.API).then(() => {
                        console.log('Chargement JS')
                    })
                })
            })
        }).catch((e) => {
            console.log(e)
        });
    },
    components: {
        PatnersComponent
    }

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
</style>
