<template>
<carousel :settings="settings" :breakpoints="breakpoints">
    <slide v-for="slide in avisData" :key="slide">
        <div class="carousel__item">
            <Card class="avis-card" style="box-shadow : unset">
                <template #header>
                    <div class="position-relative " style="height : 50px">
                        <div class="d-flex position-absolute w-100 header" style="left : 0;top: .5rem;">
                            <span class="avis-head">
                                <UserOutlined style="color : #FFF; font-size: 2rem" />
                            </span>
                        </div>
                    </div>
                </template>
                <template #content>
                    <div class="position-relative">
                        <span class="p-content-text mt-4">
                            {{ slide.message_avis }}
                        </span>
                        <div class="d-flex flex-column avis-footer">
                            <div class="footer-txt">
                                <font>{{ slide.auteur_avis }} - <small></small> </font>
                            </div>
                            <div class="footer-star d-flex justify-content-between">
                                <span>
                                    <a-space>
                                        <template v-for="i in slide.note_avis" :key="i">
                                            <StarFilled style="font-size : 11px; color : #00A8FF" />
                                        </template>
                                    </a-space>
                                </span>
                                <span class="verif">
                                    <a-space :size="2">
                                        <CheckCircleOutlined style="font-size : 11px; color : #00A8FF" /> <i style="">Vérifié</i></a-space>
                                </span>
                            </div>
                        </div>
                    </div>
                </template>
            </Card>
        </div>

    </slide>

    <template #addons>
        <pagination />
    </template>
</carousel>
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import {
    Carousel,
    Slide,
    Pagination,
} from 'vue3-carousel';
import Card from 'primevue/card';
import {
    UserOutlined,
    StarFilled,
    CheckCircleOutlined
} from '@ant-design/icons-vue';
import {
    processListeFetcher
} from '../../data/process';
import {
    LISTE_AVIS_CLIENT
} from '../../router/APIrouter';

export default {
    components: {
        Card,
        UserOutlined,
        StarFilled,
        CheckCircleOutlined,
        Carousel,
        Slide,
        Pagination,
    },
    data() {
        return {
            avisData: [],
            settings: {
                itemsToShow: 3,
                snapAlign: 'center',
            },
            // breakpoints are mobile first
            // any settings not specified will fallback to the carousel settings
            breakpoints: {
                // 700px and up
                200: {
                    itemsToShow: 1,
                    snapAlign: 'center',
                },

                700: {
                    itemsToShow: 2,
                    snapAlign: 'center',
                },
                // 1024 and up
                1024: {
                    itemsToShow: 3,
                    snapAlign: 'start',
                },
            },
        }
    },
    methods: {
        getInfoAccueil() {
            processListeFetcher(LISTE_AVIS_CLIENT).then((res) => {
                this.avisData = res;
            })
        }
    },
    mounted() {
        this.getInfoAccueil();
    }
}
</script>

<style lang="scss">
@import '../../scss/_variable.scss';

.avis-card {
    margin: 10px 0;
    background: #91e3f126;
}

.avis-head {
    background: $primary_color;
    height: 80px;
    width: 80px;
    border-radius: 50%;
    border: 5px solid #FFF;
    display: flex;
    justify-content: center;
    align-items: center;
}

.avis-card .p-card-body {
    padding-top: 3rem !important;
    background: rgba(0, 208, 255, 0.04);
    box-shadow: 0 3px 10px rgba(0, 0, 0, .1);
}

.avis-card .p-card-body span {
    display: block;
    line-height: 20px;
    font-size: 13px;
    color: #000;
    font-weight: 600;
}

.avis-card .header {
    justify-content: center;
}

.p-content-text {
    position: relative;
}

.p-content-text::before {
    position: absolute;
    content: "";
    width: 70px;
    background: $primary_color;
    height: 3px;
    bottom: -8px;
    left: 0;
}

.footer-txt {
    margin-top: 10px;
}

.footer-txt font {
    font-weight: 700;
    font-size: 13px;
}

.verif i {
    color: $secondary_color;
    font-size: 11px;
}

.carousel__item {
    min-height: 200px;
    width: 100%;
    color: var(--vc-clr-white);
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.carousel__slide {
    padding: 10px;
}

.carousel__prev,
.carousel__next {
    box-sizing: content-box;
    border: 5px solid white;
}
</style>
