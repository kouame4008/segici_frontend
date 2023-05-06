<template>
<div class="main-content-wrapper">
    <section class="breadcrumb-section about">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-lg-12">
                    <div class="breadcrumb-wrapper text-left">
                        <h2>Recherchez une résidence à yamoussoukro</h2>
                        <span class="text-white">Indiquez vos dates afin de voir nos derniers tarifs et nos offres pour des résidences à yamoussoukro </span>
                        <div>
                            <form action="" class="form-inlin mt-3">
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="form-group my-2">
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1">
                                                        <EnvironmentFilled />
                                                    </span>
                                                </div>
                                                <input type="text" readonly class="form-control" value="YAMOUSSOUKRO">
                                            </div>

                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group my-2">
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1">
                                                        <CalendarFilled />
                                                    </span>
                                                </div>
                                                <a-range-picker class="form-control" :disabledDate="disabledDate" :locale="locale" :format="dateFormat" />
                                            </div>

                                        </div>
                                    </div>

                                    <div class="col-md-2">
                                        <div class="form-group my-2">
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1">
                                                        <UserSwitchOutlined />
                                                    </span>
                                                </div>
                                                <input type="number" class="form-control" min="1" placeholder="Nombre de personne">
                                            </div>

                                        </div>
                                    </div>

                                    <div class="col-md-3">
                                        <div class="form-group  my-2 w-100">
                                            <a-button type="" class="form-control w-100 btn-theme" :style="{padding : '0 2.4rem'}">Vérifier la disponibilité</a-button>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
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
                        <div class="col-md-4" v-for="item in residences" :key="item.id">
                            <card-residences :residence="item" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</div>
</template>

<script>
import cardResidences from '../../components/residences/card-residences.vue'
import useResidencePublier from '../../data/residences/use-residence-publier';
import locale from "ant-design-vue/es/date-picker/locale/fr_FR";
import moment from "moment";

export default {
    components: {
        cardResidences,
    },

    setup() {
        const {
            residences
        } = useResidencePublier();

        const disabledDate = current => {
            // Can not select days before today and today
            return current && current <= moment().startOf('day')
        };

        return {
            residences,
            dateFormat: "DD/MM/YYYY",
            locale,
            disabledDate,
            moment
        }
    }

}
</script>
