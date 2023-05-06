<template>
<div class="mt-3 row" v-if="hotels && hotels.length > 0">
    <div class="mb-3 col-md-6" v-if="hotels && hotels[0]">
        <div class="card-residence-left">
            <div class="residence-image">
                <img v-if="hotels && hotels[0]" :src="API+'fichier/photo_de_bien/'+hotels[0].image_hotel" alt="">
            </div>
            <div class="residence-footer">
                <header class="residence-name">
                    {{ hotels[0].nom_hotel }}
                </header>
                <small class="residence-desc">
                    {{ hotels[0].description_hotel }}
                </small>
                <div class="d-flex justify-content-between">
                    <div class="residence-prise">
                        <!-- <font>{{ formatteurMillier (hotels[0].tarif) }}</font><span>/nuit</span> -->
                    </div>
                    <a-button type="" style="background : #00A8FF; color: #FFF; border : 0;font-weight: bold" @click="openPage(hotels[0] && hotels[0].id)">
                        AFFICHER
                        <ArrowRightOutlined style="position : relative; top : -4px" />
                    </a-button>
                </div>
            </div>
        </div>
    </div>
    <div class="mb-3 col-md-6">
        <a-space direction="vertical" class="w-100">
            <div class="card-residence-right" v-if="hotels && hotels[1]">
                <div class="residence-image">
                    <img v-if="hotels && hotels[1]" :src="API+'fichier/photo_de_bien/'+hotels[1].image_hotel" alt="">
                </div>
                <div class="residence-footer">
                    <header class="residence-name">
                        {{hotels &&  hotels[1].nom_hotel }}
                    </header>
                    <small class="residence-desc">
                        {{hotels &&  hotels[1].description_hotel }}
                    </small>
                    <div class="d-flex justify-content-between">
                        <div class="residence-prise">
                            <!-- <font>{{ formatteurMillier (residences[1].tarif) }}</font><span>/nuit</span> -->
                        </div>
                        <a-button type="" style="background : #00A8FF; color: #FFF; border : 0;font-weight: bold" @click="openPage(hotels[1] && hotels[1].id)">
                            AFFICHER
                            <ArrowRightOutlined style="position : relative; top : -4px" />
                        </a-button>
                    </div>
                </div>
            </div>

            <div class="card-residence-right" v-if="hotels && hotels[2]">
                <div class="residence-image">
                    <img v-if="hotels && hotels[2]" :src="API+'fichier/photo_de_bien/'+hotels[2].image_hotel" alt="">
                </div>
                <div class="residence-footer">
                    <header class="residence-name">
                        {{hotels &&  hotels[2].nom_hotel }}
                    </header>
                    <small class="residence-desc">
                        {{hotels &&  hotels[2].description_hotel }}
                    </small>
                    <div class="d-flex justify-content-between">
                        <div class="residence-prise">
                            <!-- <font>
                                {{ formatteurMillier (residences[2].tarif) }}
                            </font><span>/nuit</span> -->
                        </div>
                        <a-button type="" style="background : #00A8FF; color: #FFF; border : 0;font-weight: bold" @click="openPage(hotels[2] && hotels[2].id)">
                            AFFICHER
                            <ArrowRightOutlined style="position : relative; top : -4px" />
                        </a-button>
                    </div>
                </div>
            </div>
        </a-space>
    </div>
</div>
</template>

<script>
import {
    ArrowRightOutlined
} from '@ant-design/icons-vue';
import {
    API
} from '../../router/APIrouter';

import useHotels from '../../data/hotel/use-hotel';
import {
    uuid
} from 'vue-uuid';

export default {
    setup() {
        const {
            hotels,
            chargement
        } = useHotels(2);

        return {
            hotels,
            API,
            chargement
        }
    },
    methods: {
        openPage(residenceId) {
            window.location.href = "/hotels/" + residenceId+'/'+uuid.v1 ()
        }
    },

    components: {
        ArrowRightOutlined,
    }

}
</script>

<style lang="scss">
@import '../../scss/_variable.scss';

.card-residence-left,
.card-residence-right {
    position: relative;
    overflow: hidden;
}

.card-residence-left .residence-image {
    background-color: transparent;
    width: 100%;
    height: 408px;
}

.residence-image img {
    width: 100%;
    height: 100%;
    transition: all ease-in .3s;
}

.card-residence-left:hover img,
.card-residence-right:hover img {
    transition: all ease-in .3s;
    transform: scale(1.1);
}

.card-residence-right .residence-image {
    background-color: transparent;
    width: 100%;
    height: 200px;
}

.residence-footer {
    position: absolute;
    bottom: 0;
    right: 0;
    background: #002870b8;
    padding: 1rem;
}

.residence-footer .residence-name {
    font-family: $fontFamily;
    color: #FFF;
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 1px;
}

.residence-footer .residence-desc {
    color: #FFFFFFB3;
    margin-bottom: 1rem;
    line-height: 15px;
    display: block;
    -webkit-box-orient: vertical;
    display: -webkit-box !important;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
}

.residence-prise font {
    font-family: $fontFamily;
    color: #FFF;
    font-weight: 700;
    font-size: 16px;
}

.residence-prise span {
    font-family: $fontFamily;
    color: #FFFFFFB3;
    font-size: 14px;
}
</style>
