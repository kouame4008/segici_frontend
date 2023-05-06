<template>
<div class="main-content-wrapper">
    <section class="breadcrumb-section about">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-lg-5">
                    <div class="breadcrumb-wrapper">
                        <h2>Biens à acheter</h2>
                        <nav>
                            <ul>
                                <li class="breadcrumb-item"><a href="#">Accueil</a></li>
                                <li class="breadcrumb-item active"><a href="#">acheter</a></li>
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
                <recherche-biens :method="handleRecherche" :operation="2" />
            </div>
        </div>
    </section>
    <section class="section bg-white">
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-12">
                    <div class="row">
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
import Biens from '../../components/card-bien/Biens.vue'
import RechercheBiens from '../../components/rechercher/recherche-biens.vue';
import useAchats from '../../data/biens/use-achats';

import {
    notification
} from 'ant-design-vue';
import {
    rechercherBien
} from '../../data/biens/bien-action';
import { ref } from '@vue/reactivity';

export default {
    setup() {
        const {
            biens,
            erreurBiens
        } = useAchats();

        const ListBien = ref(biens);

        const handleRecherche = (data) => {
            data.append('type_operation_id', 2)
            rechercherBien(data).then((res) => {
                ListBien.value = res.resultat
                if (res.resultat.length == 0) {
                    notification.info({
                        message: 'Aucun resultat trouvé !'
                    })
                }

            })
        }

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
