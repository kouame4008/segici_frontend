<template>
<section>
    <div class="main-content-wrapper">
        <section class="breadcrumb-section about">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-lg-5">
                        <div class="breadcrumb-wrapper">
                            <h2>NOS TERRAINS</h2>
                            <nav>
                                <ul>
                                    <li class="breadcrumb-item"><a href="#">Accueil</a></li>
                                    <li class="breadcrumb-item active">
                                        <a href="#">NOS TERRAINS</a>
                                    </li>
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
                    <div class="col-md-10" style="position : relative; top : -20px">
                        <label for="">Rechercher un terrain</label>
                        <a-input v-model:value="rechercherBien" placeholder="Rechercher un terrain" size="large" @search="onSearch" allow-clear @change="handleSearch" />
                    </div>
                </div>
                <div class="row mt-2">

                    <div class="col-md-4" v-for="item in filterBien" :key="item.id">
                        <biens :item="item" />
                    </div>
                </div>
            </div>
        </section>
    </div>
</section>
</template>

<script>
import useBien from "../../data/biens/use-bien";
import biens from '../../components/card-bien/Biens.vue';
import {
    ref,
    computed
} from 'vue';

export default {
    setup() {
        let etat_bien = '';
        let type_bien = 2;
        const rechercherBien = ref('');
        const {
            biens
        } = useBien(etat_bien, type_bien);

        // const listeBiens = ref();
        const filterBien = computed(() => biens.value && biens.value.filter(item => (item.titre_bien).toLowerCase()
            .includes(rechercherBien.value.toLowerCase()) ||
            (item.prix_bien).toString().toLowerCase()
            .includes(rechercherBien.value.toLowerCase())
        ));

        const handleSearch = () => {
            //    rechercherBien.value = "hghghfgfhg"
        }

        return {
            biens,
            filterBien,
            rechercherBien,
            handleSearch
        };
    },
    components: {
        biens
    }
};
</script>

<style>
</style>
