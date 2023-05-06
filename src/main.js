import { createApp } from 'vue'
import App from './App.vue';

import Styles from '@/scss/styles.scss';
import router from '@/router/index';
import LoadScript from "vue-plugin-load-script";
import WebLayout from './layouts/web-layout.vue';
import LoginLayout from './layouts/login-layout.vue';
import EspaceLayout from './layouts/espace-layout.vue';
import Antd from 'ant-design-vue';
import "ant-design-vue/dist/antd.css";
import PrimeVue from 'primevue/config';
import PrimStyle from 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
import 'primeicons/primeicons.css';
import animateScroll from './directives/animate-scroll';

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas, faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
library.add(fas, faTachometerAlt);
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
import ToastService from 'primevue/toastservice';
import store from './store/index'
// import VueEasyLightbox from 'vue-easy-lightbox';
import withUUID from "vue-uuid";

// import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css


// import Vuesax from 'vuesax3'
// import StyleVuesax from 'vuesax3/'

dom.watch();



let app = withUUID(createApp(App));
app.directive('scroller', animateScroll);
app.component('Icon', FontAwesomeIcon)

app
    .use(Styles)
    // .use(VueEasyLightbox)
    .use(router)
    .use(LoadScript)
    .use(Antd)
    .use(store)
    .use(PrimeVue)
    .use(PrimStyle)
    .use(ToastService)
    // .use(Quasar, {
    //     plugins: {}, // import Quasar plugins and add here
    //   })
    // .use(Vuesax)
    // .use(StyleVuesax)
    .component("web-layout", WebLayout)
    .component("login-layout", LoginLayout)
    .component("espace-layout", EspaceLayout)
    .mount('#app');
