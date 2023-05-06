<template>
<Card style="box-shadow: 0 4px 25px 0 rgba(0,0,0,.1)" class="mb-3">
    <template #header>
        <div class="card-img">
            <a :href="'/detail-biens/'+item.bien_slug"> <img alt="user header" :src="API_FICHIER+item.image_bien"></a>
        </div>
        <div class="premium"> {{ item.type_operation_id == 2 ? 'A acheter' : 'A louer' }} </div>
        <div class="locate d-flex justify-content-between w-100">
            <span class="badge badge-danger" style="padding-top: 7px;"> <i class="fas fa-location-dot"></i> {{ item.libelle_localite }} </span>
            <span> <i class="fas fa-camera"></i></span>
        </div>

    </template>
    <template #content>
        <div class="d-flex position-relative justify-content-between" style="top : -8px">
            <span class="typeBien"> {{ item.type_bien == 1 ? 'Maison':'Terrain' }} </span>
            <span class="typeBien ref"> REF-{{ item.reference_bien }} </span>
        </div>
        <header class="p-caTitle"> {{ item.titre_bien }} </header>
        <div class="card-raison">
            <span class="p-card-prise">
                <font> {{ formatteurMillier (item.prix_bien) }}</font> <small v-if="item.type_bien == 1">/mois</small>
            </span>

        </div>
        <div class="mt-2 d-flex justify-content-between">
            <span>
                <span class="p-card-m" v-if="item.superficie_terrain">
                    <a-tag class="p-tags">
                        <LayoutOutlined style="position : relative; top : -3px" />
                        {{ item.superficie_terrain }} m² </a-tag>
                </span>
                <span class="p-card-m" v-if="item.type_bien == 1">
                    <a-tag class="p-tags">
                        3 pièces </a-tag>
                </span>
            </span>
            <a-button type="" size="small" class="bien-btn"></a-button>
            <a :href="'/detail-biens/'+item.bien_slug" class="bien-btn" style="padding : 0 10px" @click.prevent="handleDetailBien (item) ">Détails</a>
        </div>
    </template>
</Card>
</template>

<script>
import Card from 'primevue/card';
import {
    formatteurMillier
} from '../../helpers/ServicesHelpers';
import {
    LayoutOutlined
} from '@ant-design/icons-vue';
import {
    API_FICHIER
} from '../../router/APIrouter';

export default {
    name: 'Biens',
    props: ['item'],
    components: {
        Card,
        LayoutOutlined
    },
    setup() {
        // const router = useRouter();

        const handleDetailBien = (item) => {
            // router.push('');
            window.location.href = "/detail-biens/" + item.bien_slug
        }
        return {
            formatteurMillier,
            handleDetailBien,
            API_FICHIER
        }
    },
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

.p-card-header img {
    height: 230px;
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

.typeBien {
    background: #0073e1;
    font-size: 12px;
    padding: 0 10px;
    border-radius: 3px;
    font-weight: 700;
    color: #FFF;
}

.premium {
    font-size: 12px;
    position: absolute;
    right: 0;
    background-color: #0073e1;
    background-color: rgba(0, 115, 225, 0.85);
    color: #fff;
    padding: 4px 15px;
    top: 20px;
    text-align: center;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    font-weight: 600;
}
.typeBien.ref {
    background: transparent;
    color: $secondary_color;
}
</style>
