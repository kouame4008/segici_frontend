<template>
<div class="mt-3 row" v-if="hotels && hotels.length > 0"> 
        <div class="mb-3 col-md-6" v-for="(item, i) in hotels" :key="i">
            <div class="card-residence-left" v-if="i<2">
                <div class="residence-image">
                    <img  :src="API+'fichier/photo_de_bien/'+item.image_hotel" alt="">
                </div>
                <div class="residence-footer">
                    <header class="residence-name">
                        {{ item.nom_hotel }}
                    </header>
                    <small class="residence-desc">
                        {{ item.description_hotel }}
                    </small>
                    <div class="d-flex justify-content-between">
                        <div class="residence-prise">
                            <!-- <font>{{ formatteurMillier (item.tarif) }}</font><span>/nuit</span> -->
                        </div>
                        <a-button type="" style="background : #00A8FF; color: #FFF; border : 0;font-weight: bold" @click="openPage(item && item.id)">
                            AFFICHER
                            <ArrowRightOutlined style="position : relative; top : -4px" />
                        </a-button>
                    </div>
                </div>
            </div>
        </div> 
</div>
</template>

<script>
import {
    ArrowRightOutlined
} from '@ant-design/icons-vue';
import {
    API, LISTE_HOTEL_URL
} from '../../router/APIrouter';

import {
    uuid
} from 'vue-uuid';
import { processListeFetcher } from '../../data/process';

export default {

    data () {
        return {
            hotels: [],
            API,
        }
    },
    methods: {
        openPage(residenceId) {
            window.location.href = "/hotels/" + residenceId+'/'+uuid.v1 ()
        },
        gerResidences () {
            processListeFetcher(`${LISTE_HOTEL_URL}?etablissement_id=2`).then((res) => {
                this.hotels = res;
            });
        },
    },

    components: {
        ArrowRightOutlined,
    },
    mounted () {
        this.gerResidences ()
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
