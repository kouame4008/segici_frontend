<template>
<a-layout class="pro-layout">
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }" :width="250" v-model:collapsed="collapsed" :trigger="null" collapsible>
        <div class="logo">
            <img src="@/assets/images/segici_logo_150.png" alt="">
        </div>
        <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
            <template v-for="(route,i) in routes" :key="i">
                <a-menu-item :key="route.meta.permission.menu_id" v-if="route.meta.permission && permission.includes(route.meta.permission.menu_id)">
                    <router-link :to="{name : route.name}">
                        <i class="mr-2" :class="route.meta.permission.icon" :style="{color : '#FFF', fontSize : '20px'}"></i>
                        <span class="nav-text"> {{ route.meta.permission.title }} </span>
                    </router-link>
                </a-menu-item>
            </template>
           
            <a-sub-menu v-if="[7,8].includes(user.profil_id)">
                <template #icon>
                    <i class="mr-2 fas fa-maximize" :style="{color : '#FFF', fontSize : '20px'}"></i>
                </template>
                <template #title>Gestion des réservations</template>
                <a-menu-item key="52">
                    <router-link :to="{name: 'EPDemandeReservation'}">
                        <span class="nav-text">Demande de réservation</span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="521">
                    <router-link :to="{name: 'EPReservationHotel'}">
                        <span class="nav-text">Liste réservations</span>
                    </router-link>
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: marginLeft }">
        <a-layout-header :style="{background:' #fff', padding: '0 16px', height: '70px', zIndex : 99}" class="navbar bg-dark">
            <div class="float-left">
                <img v-if="partenaire && partenaire.logo_pat" :src="API_STORAGE+'partenaires/'+partenaire.logo_pat" alt="" width="130">
                <span class="ml-3 logoPat d-none">
                    <menu-unfold-outlined v-if="collapsed" class="trigger" @click="handleCollasped" />
                    <menu-fold-outlined v-else class="trigger" @click="handleCollasped" />
                </span>
            </div>

            <div class="float-right">
                <a-space>
                    <span class="mr-3">
                      <alert-comp />
                    </span>
                    <a-dropdown :trigger="['click']">
                        <div>
                            <a-space>
                                <a class="ant-dropdown-link" @click.prevent>
                                    <a-typography-title :level="5"> {{user && user.nom_user +' '+ user.prenom_user}} </a-typography-title>
                                </a>
                                <a-avatar style="color: #f56a00; background-color: #fde3cf" shape="square">U</a-avatar>
                            </a-space>
                        </div>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item>
                                    <a href="javascript:;" @click.prevent="handleLogout">
                                        <LogoutOutlined /> Se déconnecter</a>
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </a-space>
            </div>
        </a-layout-header>
        <a-layout-content :style="{ margin: '70px 16px 0', overflow: 'initial', height: '100vh' }">
            <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
                <transition name="fade" mode="out-in">
                    <keep-alive>
                        <slot />
                    </keep-alive>
                </transition>
            </div>
        </a-layout-content>
    </a-layout>
</a-layout>
</template>

<script>
import {
    LogoutOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons-vue';
import {
    computed,
    defineComponent,
    ref
} from 'vue';

import {
    mapGetters,
    useStore
} from 'vuex';
import routes from '../router/routes';
import {
    API_STORAGE
} from '../router/APIrouter';
import alertComp from '../components/message/alert-comp.vue';

export default defineComponent({
    setup() {
        const collapsed = ref(false);
        const marginLeft = ref('250px')
        const store = useStore();

        const handleCollasped = () => {
            if (collapsed.value) {
                marginLeft.value = '250px'
            } else {
                marginLeft.value = '80px'
            }
            collapsed.value = !collapsed.value;

        }

        // console.log(store.getters.userPermission);

        return {
            selectedKeys: ref([1]),
            collapsed,
            handleCollasped,
            marginLeft,
            user: computed(() => store.getters.getUserInfo),
            permission: computed(() => store.getters.userPermission),
            partenaire: computed(() => store.getters.partenaireInfo),
            routes,
            handleLogout: () => store.dispatch('actionLogout'),
            API_STORAGE
        };
    },

    components: {
        LogoutOutlined,
        MenuUnfoldOutlined,
        MenuFoldOutlined,
        alertComp
    },
    created() {
        if (!this.isAuth) {
            this.$router.push({
                name: 'Login'
            })
        }
    },
    computed: {
        ...mapGetters(['isAuth'])
    },
    mounted() {
        // console.log(this.user)
    }
});
</script>

<style lang="scss">
@import '../scss/variable.scss';

#components-layout-demo-fixed-sider .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
}

.site-layout .site-layout-background,
.ant-layout {
    background: #fff !important;
}

.site-layout .site-layout-background {
    background: #141414;
}

.navbar.bg-dark {
    background-color: #fff !important;
    color: #002870 !important;
    box-shadow: rgba(0, 0, 0, 0.063) 0px 5px 20px;
    position: fixed;
    width: calc(100% - 250px);
}

.ant-layout-sider,
.ant-menu {
    background: $secondary_color !important;
}

.logo {
    height: 68px;
    background: #FFF;
    margin: 5px 15px;
    text-align: center;
}

.logo img {
    width: 50%
}

.logoPat {
    background: red;
    padding: 10px 15px;
    border-radius: 3px;
}

.pro-layout .ant-menu-item{
    padding: 0 !important;
}
.pro-layout .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background: transparent !important;
}

.pro-layout .ant-menu-title-content a{
    padding: 0 20px;
    display: block;
}

.pro-layout .ant-menu-title-content a{
    padding: 0 20px;
    display: block;
} 

.pro-layout .ant-menu-title-content a.router-link-active{
    background-color: #1890ff;
} 
</style>
