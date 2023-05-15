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


export default {
    components: {
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
