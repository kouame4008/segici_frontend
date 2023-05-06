<template>
<div class="main-content-wrapper">
    <section class="breadcrumb-section about">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-lg-5">
                    <div class="breadcrumb-wrapper">
                        <h2>Biens à louer</h2>
                        <nav>
                            <ul>
                                <li class="breadcrumb-item"><a href="#">Accueil</a></li>
                                <li class="breadcrumb-item active"><a href="#">Louer</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="section p-0" style="background: #F5F5F5;">
        <div class="container">
            <div class="row">
                <recherche-biens :method="handleRecherche" :operation="1" />
            </div>
        </div>
    </section>
    <section class="section bg-white">
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-12">
                    <div class="row" v-if="ListBien">
                        <div class="col-md-4" v-for="item in ListBien" :key="item.id">
                            <biens :item="item" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</div>
</template>

<script>
import {
    ref
} from '@vue/reactivity';
import Biens from '../../components/card-bien/Biens.vue'
import RechercheBiens from '../../components/rechercher/recherche-biens.vue';
import {
  getPrixMax,
    rechercherBien
} from '../../data/biens/bien-action';
import useLouer from '../../data/biens/use-location';
import {
    notification
} from 'ant-design-vue';
import { onMounted } from '@vue/runtime-core';
// import {mutate} from 'swrv';
// import { API_URL, RECHERCHER_BIEN } from '../../router/APIrouter';

export default {
    setup() {
        const {
            biens,
            erreurBiens,
        } = useLouer();

        const ListBien = ref(biens)

        const handleRecherche = (data) => {
            data.append('type_operation_id', 1)
            rechercherBien(data).then((res) => {
                ListBien.value = res.resultat
                if (res.resultat.length == 0) {
                    notification.info({
                        message: 'Aucun resultat trouvé !'
                    })
                }

            })
        }

        onMounted (()=> {
            getPrixMax ().then((res) => {
                console.log (res.prix_max.prix_max)
            })
        })

        return {
            ListBien,
            erreurBiens,
            handleRecherche
        }
    },
    components: {
        Biens,
        RechercheBiens
    },

}
</script>
