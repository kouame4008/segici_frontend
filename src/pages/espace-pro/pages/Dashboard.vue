<template>
<component :is="TableauDeBord"></component>
</template>

<script>
import tableauDeBordProprietaire from './components/tableau-de-bord-proprietaire.vue';
import tableauDeBordLocataire from './components/tableau-de-bord-locataire.vue';
import tableauDeBordEimmobiliaire from './components/tableau-de-bord-eimmobiliaire.vue';
import tableauDeBordApporteurAffaire from './components/tableau-de-bord-apporteur-affaire.vue';
import tableauDeBordClient from './components/tableau-de-bord-client.vue';
import {
    mapGetters
} from 'vuex';
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters(['getUserInfo']),
        TableauDeBord() {
            let element = 'tableauDeBordProprietaire';
            switch (this.getUserInfo.profil_id) {
                case 2:
                    element = 'tableauDeBordLocataire'
                    break;
                case 3:
                    element = 'tableauDeBordProprietaire'
                    break;
                case 4:
                    element = 'tableauDeBordEimmobiliaire'
                    break;
                case 5:
                    element = 'tableauDeBordApporteurAffaire'
                    break;
                case 6:
                    element = 'tableauDeBordClient'
                    break;

                default:
                    break;
            }
            return element;
        }
    },
    components: {
        tableauDeBordProprietaire,
        tableauDeBordLocataire,
        tableauDeBordEimmobiliaire,
        tableauDeBordApporteurAffaire,
        tableauDeBordClient
    },
    mounted() {
        if (this.getUserInfo.profil_id == 7) {
            this.$router.push({
                name: 'EPDemandeReservation'
            })
        }

    }
}
</script>

<style>
.ant-breadcrumb {
    text-align: left;
}
</style>
