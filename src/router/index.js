import { createWebHistory, createRouter } from "vue-router";
import routes from './routes';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';


const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeResolve((to, from, next) => {
    if (to.path) {
        nprogress.start();
    }
    next();
});

router.afterEach(() => {
    nprogress.done()
})

export default router;