<template>
<div class="row">
    <div class="col-12 col-lg-12">

        <div class="latest-project-wrapper">
            <div class="latest-project">
                <div v-for="patner in patners" :key="patner.id">
                    <img v-if="logo_pat" :src="API_STORAGE+'partenaires/'+patner.logo_pat" alt="">
                </div>
            </div>
        </div>
        <!-- <div class="brand-carousel section-padding owl-carousel">

            <div class="single-logo" >  </div>
        </div> -->
    </div>
</div>
</template>

<script>
import {
    API_STORAGE
} from '../../router/APIrouter';
import usePatners from '../../data/patners/use-patners';

export default {
    setup() {
        const {
            patners
        } = usePatners()
        return {
            patners,
            API_STORAGE
        }

    },
}
</script>

<style>

</style>
