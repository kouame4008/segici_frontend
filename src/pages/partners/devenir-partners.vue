<template>
<section id="Accueil">
    <!--div id="loading"> <img id="loading-image" src="@/assets/images/loader.svg" alt="Loading@." /> </div-->

    <div class="main-content-wrapper">
        <section class="breadcrumb-section about">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-lg-5">
                        <div class="breadcrumb-wrapper">
                            <h2>DEVENIR PARTENAIRES</h2>
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
                <div class="row justify-content-center">
                    <div class="col-12 col-lg-12">
                        <div class="d-flex justify-content-between w-100">
                            <div>
                                <h2 class="main-heading m-0">QUI PEUT ETRE PARTENAIRE</h2>
                                <hr>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <devenir-patners />
        </section>

        <section class="section">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-lg-12">
                        <div class="d-flex justify-content-between w-100">
                            <div>
                                <h2 class="main-heading m-0">ILS NOUS FONT CONFIANCE</h2>
                                <hr>
                            </div>
                        </div>
                    </div>
                </div>
                <partners />
            </div>
        </section>

    </div>

</section>
</template>

<script>
import partners from '../../components/patners/patners-component.vue';
import DevenirPatners from '../../components/patners/Devenir-patners.vue';
import {
    API_STORAGE
} from '../../router/APIrouter';
import usePatners from '../../data/patners/use-patners';

export default {
    setup() {
        const {
            patners
        } = usePatners()
        return {
            patners,
            API_STORAGE
        }

    },
    components: {
        partners,
        DevenirPatners
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
