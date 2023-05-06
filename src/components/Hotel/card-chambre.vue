<template>
<Card style="box-shadow: 0 4px 25px 0 rgba(0,0,0,.1)" class="mb-3">
    <template #header>
        <div class="card-img">
            <a :href="'/detail-biens/'+item.bien_slug" @click.prevent="showImg (item)"> <img :src="API + 'fichier/photo_de_salle/' + item.image_salle" alt=""></a>
        </div>
        <div class="premium"> {{ item.type_operation_id == 2 ? 'A acheter' : 'A louer' }} </div>
        <div class="locate d-flex justify-content-between w-100">
            <span> <i class="fas fa-location-dot"></i> {{ item.secteur_hotel }} </span>
            <span> <i class="fas fa-camera"></i></span>
        </div>

    </template>
    <template #content>
        <div class="d-flex d-flex position-relative justify-content-between" style="top : -8px">
            <span class="typeBien"> {{ item.libelle_type_maison }} {{ item.libelle_type_salle }} </span>
            <span class="typeBien ref"> <i class="fas fa-location-dot"></i> {{ item.libelle_commune }} {{ item.quartier_hotel }} </span>
        </div>
        <header class="p-caTitle"> {{ item.libelle_salle }} </header>
        <div class="card-raison">
            <span class="p-card-prise">
                <font> {{ formatteurMillier (item.prix_salle) }}</font>
            </span>

        </div>
        <div class="mt-2 d-flex justify-content-between">
            <span>
                <span class="p-card-m" v-for="(op,i) in JSON.parse(item.options)" :key="i" :style="{color: 'green'}">
                    <a-tag class="p-tags" v-if="i ==0">
                        <LayoutOutlined style="position : relative; top : -3px" />
                        {{ op }}
                    </a-tag>
                </span>
                <a-tag class="p-tags" v-if="(JSON.parse(item.options)).length > 1">
                    <a-popover>
                        <template #content>
                            <span class="p-card-m" v-for="(op,i) in JSON.parse(item.options)" :key="i" :style="{color: 'green'}">
                                <a-tag class="p-tags">
                                    <LayoutOutlined style="position : relative; top : -3px" />
                                    {{ op }}
                                </a-tag><br>
                            </span> 
                        </template>
                        <PlusCircleOutlined style="position : relative; top : -3px" />
                    </a-popover>
                    <!-- {{ op }} -->
                </a-tag>
            </span>
            <div>
                <a :href="'/detail-biens/'+item.bien_slug" class="bien-btn" style="padding : 0 10px;border-radius: 3px;" @click.prevent="handleDetailBien (item) ">Reserver</a>
            </div>
        </div>
    </template>
</Card>
<vue-easy-lightbox :visible="visible" :imgs="imgs" :index="index" @hide="handleHide"></vue-easy-lightbox>
</template>

<script>
import Card from 'primevue/card';
import {
    formatteurMillier
} from '../../helpers/ServicesHelpers';
import {
    LayoutOutlined,
    PlusCircleOutlined
} from '@ant-design/icons-vue';
import {
    API_FICHIER,
    API,
    LISTE_IMAGE_CHAMBRE
} from '../../router/APIrouter';
import {
    ref
} from '@vue/reactivity';
import {
    processData
} from '../../data/residences/residence-action';

export default {
    name: 'Biens',
    props: {
        item : Object,
        method : Function
    },
    components: {
        Card,
        LayoutOutlined,
        PlusCircleOutlined
    },
    setup(props, context) {
        // const router = useRouter();
        const imgs = ref([])
        const index = ref()
        const visible = ref(false)

        const handleDetailBien = (item) => {
            // router.push('');
            // window.location.href = "/detail-biens/" + item.bien_slug
            console.log (item)
            context.emit ('method')
        }

        const showImg = (item) => {
            imgs.value = [];
            // alert ()
            let data = new FormData();
            data.append('salle_id', item.id);

            processData(LISTE_IMAGE_CHAMBRE, data).then((res) => {
                if (res.status == "succes") {
                    let result = res.resultat;

                    result.map((value) => {
                        // alert (value.image_salle)
                        imgs.value.push(
                            API + 'fichier/photo_de_salle/' + value.image_salle
                        )
                    })
                    index.value = 0
                    visible.value = true;
                }
            })

            // console.log(this.imgs)

        }

        const handleHide = () => {
            visible.value = false;
        }
        return {
            formatteurMillier,
            handleDetailBien,
            API_FICHIER,
            API,
            showImg,
            handleHide,
            imgs,
            index,
            visible
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
