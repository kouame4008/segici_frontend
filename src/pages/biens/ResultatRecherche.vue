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
  
    <section class="section bg-white">
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-12">
                    <div class="row">
                        <div class="col-md-4" v-for="item in listeRecherche" :key="item.id">
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
import { computed } from '@vue/runtime-core';
import {useStore} from 'vuex';

import Biens from '../../components/card-bien/Biens.vue';

export default {
    components: {
        Biens,
    },
    setup () {
        const store = useStore ();

        const listeRecherche = computed(() => store.getters.getResultatData)

        console.log ('recherche',listeRecherche.value)

        return {
            listeRecherche,
        }
    }
    

}
</script>

