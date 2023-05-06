<template>
<div class="top-header  d-none d-lg-block">
    <div class="container-fluid">
        <div class="row">
            <div class="col-xl-5  col-lg-6 col-md-7 col-12 col-sm-5">
                <div class="header-top-left"> <span class="d-m-none">
                        <i class="far fa-envelope"></i>
                        <a href="#"><b>infos@segici.com</b></a>
                    </span> <span class="d-m-none">
                        <i class="fal fa-phone"></i>
                        <a href="#"><b> (+225) 0767090967</b></a>
                    </span> </div>
            </div>
            <div class="col-xl-4  col-lg-6 col-md-12 col-12 col-sm-12">
                <div class="header-top-right">

                    <div class="header-top-right-social f_right d-md-block">
                        <ul>
                            <li>
                                <a-space>

                                    <a-space>
                                        <a href="/espace-pro/connexion" v-if="getUserInfo">
                                            <a-typography-title :level="5">
                                                {{getUserInfo && getUserInfo.nom_user}} </a-typography-title>
                                        </a>
                                        <PoweroffOutlined class="text-danger" :style="{position : 'relative', top : '-5px'}" @click="handleLogout" v-if="getUserInfo" />
                                    </a-space>

                                    <a href="/espace-pro/connexion" v-if="!getUserInfo">
                                        <a-button type="" style="background : #00A8FF; color: #FFF; border : 0;font-weight: bold">ESPACE PRO</a-button>
                                    </a>

                                </a-space>
                            </li>
                        </ul>
                    </div>
                    <div class="header-top-right-social f_right d-none">
                        <ul>
                            <li>

                                <a-button type="">ESPACE PRO</a-button>
                            </li>
                            <li>
                                <a href="#"> <i class="fab fa-twitter"></i> </a>
                            </li>
                            <li>
                                <a href="#"> <i class="fab fa-instagram"></i> </a>
                            </li>
                            <li>
                                <a href="#"> <i class="fab fa-linkedin"></i> </a>
                            </li>
                            <li>
                                <a href="#"> <i class="fab fa-youtube"></i> </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex';
import {
    PoweroffOutlined
} from '@ant-design/icons-vue';

export default {
    components: {
        PoweroffOutlined
    },
    created() {
        if (this.isAuth) {
            console.log(this.getUserInfo)
        }
    },
    computed: {
        ...mapGetters(['isAuth', 'getUserInfo'])
    },
    methods: {
        ...mapActions(['actionLogoutWeb']),
        handleLogout() {
            this.actionLogoutWeb();
        }

    }
}
</script>

<style>

</style>
