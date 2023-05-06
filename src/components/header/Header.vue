<template>
<top-header />
<div class="penta__header header-menu">
    <div class="container-fluid d-none d-lg-block">
        <div class="row">
            <div class="col-lg-2 col-8 col-md-5">
                <div class="header-logo">
                    <a href="/"> <img src="@/assets/images/segici_logo_150.png" alt="logo"> </a>
                </div>
            </div>
            <div class="col-lg-10 d-none d-lg-block">
                <div class="main-menu h-100">
                    <nav class="main-menu-nav h-100">
                        <ul class="h-100">
                            <li class="sub-menu-parent" :class="getClass('Accueil')"> <a href="/">ACCUEIL</a> </li>
                            <li class="sub-menu-parent" :class="getClass('Presentation')"> <a href="#">SEGICI <i class="material-icons">add</i></a>
                                <ul class="sub-menu">
                                    <li><a href="/a-propos">Présentation</a></li>
                                    <li><a href="/notre-equipe">Notre équipe</a></li>
                                    <li><a href="/services">Nos services</a></li>
                                    <li><a href="/agences">Nos agences</a></li>
                                </ul>
                            </li>
                            <li class="sub-menu-parent" :class="getClass('Location')"> <a href="/biens-a-louer">LOUER </a>

                            </li>
                            <li class="sub-menu-parent" :class="getClass('Acheter')"> <a href="/biens-a-acheter">ACHETER </a>
                            </li>
                            <li class="sub-menu-parent" :class="getClass('Biens')"> <a href="#">BIENS <i class="material-icons">add</i></a>
                                <ul class="sub-menu">
                                    <li><a href="/proposer-un-bien">PROPOSER UN BIEN</a></li>
                                </ul>
                            </li>
                             <li class="sub-menu-parent" :class="getClass('Besoin')"> <a href="#">BESOINS <i class="material-icons">add</i></a>
                                <ul class="sub-menu">
                                    <li><a href="/proposer-un-besoin">SOUMETTRE UN BESOIN</a></li>
                                </ul>
                            </li>
                            <li class="sub-menu-parent" :class="getClass('Partners')"> <a href="#">PARTENAIRES <i class="material-icons">add</i></a>
                                <ul class="sub-menu">
                                    <li><a href="/devenir-partenaires">DEVENIR PARTENAIRE</a></li>
                                    <li><a href="/partenaires">NOS PARTENAIRES</a></li>
                                </ul>
                            </li>
                            <li class="sub-menu-parent" :class="getClass('Residences')"> <a href="#">RESIDENCES & HOTELS <i class="material-icons">add</i></a>
                                <ul class="sub-menu">
                                    <li><a href="/residences-meublees">RESIDENCE MEUBLEES</a></li>
                                    <li><a href="/hotels">HOTELS</a></li>
                                </ul>
                            </li>
                            <li class="sub-menu-parent" :class="getClass('Doowely')"> <a href="/doowely">DOOWELLY</a> </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- mobile header start -->
<div class="mobile-header-menu d-lg-none d-block">
    <div class="container-fluid">
        <div class="row">
            <div class="col-9">
                <div class="mobile-menu-logo">
                    <a href="@/index.html"> <img src="@/assets/images/construct-logo.png" alt="logo"> </a>
                </div>
            </div>
            <div class="col-3">
                <div class="mobile-menu-toggler">
                    <a href="#" data-toggle="collapse" data-target="#navbar-main"> <i class="fal fa-bars"></i> </a>
                </div>
            </div>
            <div id="navbar-main" class="navbar-collapse mobile-collapse-menu collapse">
                <div class="mobile-menu-wrapper">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <div class="mobile-menu-header">
                                    <a href="#" data-toggle="collapse" data-target="#navbar-main"> <i class="material-icons">close</i> </a> <img src="@/assets/images/construct-logo.png" alt="img"> </div>
                            </div>
                            <div class="col-12">
                                <ul class="nav navbar-nav navbar-right mobile-menu">
                                    <li class="sub-menu-parent" :class="getClass('Accueil')"> <a href="/">ACCUEIL</a> </li>
                                    <li class="sub-menu-parent" :class="getClass('Presentation')"> <a href="#">SEGICI <i class="material-icons">add</i></a>
                                        <ul class="sub-menu">
                                            <li><a href="/a-propos">Présentation</a></li>
                                            <li><a href="/notre-equipe">Notre équipe</a></li>
                                            <li><a href="/services">Nos services</a></li>
                                            <li><a href="/agences">Nos agences</a></li>
                                        </ul>
                                    </li>
                                    <li class="sub-menu-parent" :class="getClass('Location')"> <a href="/biens-a-louer">LOUER </a>

                                    </li>
                                    <li class="sub-menu-parent" :class="getClass('Acheter')"> <a href="/biens-a-acheter">ACHETER </a>
                                    </li>
                                    <li class="sub-menu-parent" :class="getClass('Biens')"> <a href="/proposer-un-bien">BIENS</a> </li>
                                    <li class="sub-menu-parent" :class="getClass('Besoin')"> <a href="/proposer-un-besoin">BESOINS</a> </li>
                                    <li class="sub-menu-parent" :class="getClass('Partners')"> <a href="#">PARTENAIRES <i class="material-icons">add</i></a>
                                        <ul class="sub-menu">
                                            <li><a href="/devenir-partenaires">DEVENIR PARTENAIRE</a></li>
                                            <li><a href="/partenaires">NOS PARTENAIRES</a></li>
                                        </ul>
                                    </li>
                                    <li class="sub-menu-parent" :class="getClass('Residences')"> <a href="#">RESIDENCES & HOTELS <i class="material-icons">add</i></a>
                                        <ul class="sub-menu">
                                            <li><a href="/residences-meublees">RESIDENCE MEUBLEES</a></li>
                                            <li><a href="/hotels">HOTELS</a></li>
                                        </ul>
                                    </li>
                                    <li class="sub-menu-parent"> <a href="">DOOWELLY</a> </li>
                                </ul>
                            </div>
                            <div class="col-12">
                                <div class="mobile-menu-contact">
                                    <h2 class="mobile-menu-heading">Contact Info</h2>
                                    <ul>
                                        <li>
                                            <a href="#"> <i class="material-icons">map</i> <span>YAMOUSSOUKRO</span> </a>
                                        </li>
                                        <li>
                                            <a href="#"> <i class="material-icons">phone</i> <span>(+225) 0767090967</span> </a>
                                        </li>
                                        <li>
                                            <a href="#"> <i class="material-icons">email</i> <span>infos@segici.com</span> </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import TopHeader from './Top-header.vue'
import {
    useRoute
} from 'vue-router';
import {
    ref
} from '@vue/reactivity';
import {
    onMounted
} from '@vue/runtime-core';

export default {
    components: {
        TopHeader
    },
    setup() {
        const route = useRoute();
        const routeName = ref('');

        onMounted(() => {
            routeName.value = route.name;
            // alert (route.name)
        })

        const getClass = value => {
            return value == routeName.value ? 'activeLink' : ''
        }

        return {
            routeName,
            getClass
        }
    }

}
</script>

<style>

</style>
