<template>
  <section id="Accueil">
    <!--div id="loading"> <img id="loading-image" src="@/assets/images/loader.svg" alt="Loading@." /> </div-->

    <div class="main-content-wrapper">
      <section class="breadcrumb-section about">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-lg-5">
              <div class="breadcrumb-wrapper">
                <h2>NOTRE EQUIPE</h2>
                <nav>
                  <ul>
                    <li class="breadcrumb-item"><a href="#">Accueil</a></li>
                    <li class="breadcrumb-item active">
                      <a href="#">EQUIPE</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section bg-white">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-lg-7">
              <div class="main-heading-block">
                <h2 class="main-heading">NOTRE ÉQUIPE</h2>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-lg-3 col-md-6 item" v-for="equipe in equipes" :key="equipe.id">
              <div class="experts-info-wrapper">
                <div class="content-experts">
                  <div class="content-experts-overlay"></div>
                  <img
                    v-if="equipe && equipe.image_membre"
                    class="content-experts-image"
                    :src="API_STORAGE+'equipes/'+equipe.image_membre"
                    alt="team"
                  />
                  <img
                    v-else
                    class="content-experts-image"
                    src="@/assets/images/default.jpg"
                    alt="team"
                  />
                  <div class="content-experts-details fadeIn-bottom d-none">
                    <ul>
                      <li>
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                      </li>
                      <li>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                      </li>
                      <li>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                      </li>
                      <li>
                        <a href="#"><i class="fab fa-linkedin"></i></a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="content-expert-info">
                  <h2> {{ equipe.nom_membre }}  {{ equipe.prenom_membre }} </h2>
                  <p>{{ equipe.fonction_membre }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  </section>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import { listeAproposFetcher } from "../../data/apropos/apropos-action";
import {API_STORAGE} from '../../router/APIrouter';
import useApropos from '../../data/apropos/use-apropos';
import useEquipe from '../../data/equipe/use-equipe';

export default {
  setup() {
    const Propos = ref({});
    let cssProps = ref({
      backgroundImage: "",
    });

    let cssPropsAmbition =  ref({
      backgroundImage: "",
    });

    const {equipes} = useEquipe ();

    const {apropos} = useApropos ()

    onMounted(() => {
      listeAproposFetcher().then((res) => {
        cssProps.value.backgroundImage = `url(${API_STORAGE+'pages/'+res.image_apropos})`;
        cssPropsAmbition.value.backgroundImage = `url(${API_STORAGE+'pages/'+res.image_ambition})`;
        Propos.value = res;
      });
    });

    return {
      cssProps,
      Propos,
      apropos,
      cssPropsAmbition,
      API_STORAGE,
      equipes
    };
  },

};
</script>

<style lang="scss">
@import "../../scss/_variable.scss";

.text-begin {
  width: 100%;
  text-align: center;
  font-size: 16px;
  margin-top: 1rem;
}

.tab-content-block {
  background: url("../../assets/images/bg_agence.png");
  background-size: cover;
}

.av-sub-title {
  font-family: $fontFamily;
  font-size: 16px;
  margin-bottom: 1rem;
  display: inline-flex;
}

.icon {
  font-size: 20px;
  padding-top: 5px;
  display: inline-block;
}
</style>
