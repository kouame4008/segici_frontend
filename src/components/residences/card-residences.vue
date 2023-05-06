<template>
<Card style="box-shadow: 0 4px 25px 0 rgba(0,0,0,.1)" class="mb-3 residence-card">
    <template #header>
        <div class="card-img">
            <a :href="'/residences-meublees/'+residence.id"> <img alt="user header" :src="API+'fichier/photo_de_bien/'+residence.image_residence"></a>
        </div>
        <div class="premium" :class="residence.etat_occupation == 1 ? 'red' : ''"> {{ residence.etat_occupation == 1 ? 'Occupé' : 'Libre' }} </div>
        <div class="locate d-flex justify-content-between w-100">
            <span> <i class="fas fa-location-dot"></i> {{ residence.libelle_localite }}</span>
            <span> <i class="fas fa-camera"></i> {{ residence.nbr_fichier }}</span>
        </div>
    </template>
    <template #content>
        <header class="p-caTitle"> {{ residence.titre_residence }} </header>
        <div class="card-raison">
            <span class="p-card-prise">
                <font> {{ formatteurMillier (residence.tarif) }} </font> <small>/Nuitée</small>
            </span>
        </div>
        <div class="mt-2 d-flex justify-content-between">
            <span>
                <span class="p-card-m" v-for="(eq, i) in residence.equipements" :key="i">
                    <a-tag class="p-tags" v-if="i < 2">
                        <CheckCircleOutlined style="position : relative; top : -3px" />
                        {{ eq.libelle_equipement}}
                    </a-tag>
                </span>
            </span>
            <!-- <a-button type="" size="small" class="bien-btn"></a-button>
            <a :href="'/residences-meublees/'+residence.id" class="bien-btn" style="padding : 0 10px">Détails</a> -->
        </div>
        <div class="mt-2 d-flex justify-content-center">
            <a-space>
                <a-button type="primary" shape="round" style="background : #002870; border : 0;" @click="handleRedirect (residence)" :loading="loading">
                    <EyeOutlined style="position : relative; top : -3px" /> Détails
                </a-button>

                <a-button type="primary" shape="round" @click="handleReserver (residence)">
                    <AliyunOutlined style="position : relative; top : -3px" /> Réserver
                </a-button>
            </a-space>
            <!-- <a :href="'/residences-meublees/'+residence.id" class="bien-btn" style="padding : 0 10px">Détails</a> -->
        </div>
    </template>
</Card>
</template>

<script>
import Card from 'primevue/card';
import {
    CheckCircleOutlined,
    AliyunOutlined,
    EyeOutlined
} from '@ant-design/icons-vue';

import {
    listeResidenceFetcher
} from '../../data/residences/residence-action';
import {
    API
} from '../../router/APIrouter';
import {
    formatteurMillier
} from '../../helpers/ServicesHelpers';
import {
    useRouter
} from 'vue-router';
import {
    ref
} from '@vue/reactivity';
import { notification } from 'ant-design-vue';
export default {
    name: 'Biens',
    props: ['image', 'residence'],
    components: {
        Card,
        CheckCircleOutlined,
        AliyunOutlined,
        EyeOutlined
    },
    setup() {
        const loading = ref(false);
        const router = useRouter();
        const handleRedirect = (record) => {
            loading.value = true;
            router.push('/residences-meublees/' + record.id)
            // console.log (record)
        }

        const handleReserver = (record) => {
            if (record.etat_occupation == 1) {
                notification.error ({
                    message : 'Cette est résidence est occupé !'
                })
            } else {
                loading.value = true;
                router.push('/residences-meublees/' + record.id)
                // console.log (record)
            }
        }
        return {
            API,
            formatteurMillier,
            listeResidenceFetcher,
            handleRedirect,
            handleReserver
        }
    }
}
</script>

<style lang="scss">
@import '../../scss/_variable.scss';

.p-card.p-component:hover {
    transform: translate(0, -10px);
    transition: all .3s ease;
}

.p-card.p-component {
    transition: all .3s ease;

}

.p-card-header {
    position: relative;
}

.p-card.p-component .card-img {
    overflow: hidden;
}

.p-card.p-component:hover img {
    opacity: 0.8;
    transform: scale(1.1);
    -moz-transform: scale(1.1);
    -webkit-transform: scale(1.1);
    -o-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -ms-filter: "progid:DXImageTransform.Microsoft.Matrix(M11=1.1, M12=0, M21=0, M22=1.1, SizingMethod='auto expand')";
    filter: progid:DXImageTransform.Microsoft.Matrix(M11=1.1, M12=0, M21=0, M22=1.1, SizingMethod='auto expand');
    transition: all .3s ease;
}

.p-caTitle {
    // padding: 10px;
    width: 100%;
    // text-align: center;
    color: #000;
    font-weight: 700;
    font-family: $fontFamily;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    -webkit-line-clamp: 2;
    display: -webkit-box !important;
    -webkit-box-orient: vertical;
    margin-bottom: 10px;
}

.p-card-content {
    padding: 0 !important;
}

.p-card .p-card-body {
    padding: 1rem !important;
}

.p-card-prise font {
    font-family: $fontFamily;
    color: $secondary_color;
    font-weight: 700;
    font-size: 16px;
    vertical-align: top;
}

.p-card-prise small {
    vertical-align: top;
    color: #000;
    font-size: 14px;
}

.p-tags {
    border-radius: 20px !important;
    font-family: $fontFamily;
    color: $secondary_color !important;
    border: 0 !important;
    background: #eeecec !important;
}

.locate {
    position: absolute;
    bottom: 0;
    padding: 5px 15px;
    color: #FFF;
}

.residence-card .premium {
    font-size: 12px;
    position: absolute;
    right: 0;
    background-color: #0073e1;
    background-color: rgba(17, 208, 109, 0.85);
    color: #fff;
    padding: 4px 15px;
    top: 20px;
    text-align: center;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    font-weight: 600;
}

.premium.red {
    background: rgba(208, 17, 17, 0.85) !important;
}
</style>
