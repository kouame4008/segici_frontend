const LOGIN_MUTATION = 'LOGIN_MUTATION';
const LOGOUT_MUTATION = 'LOGOUT_MUTATION';
const LOGOUT_WEB_MUTATION = 'LOGOUT_WEB_MUTATION';

const state = {
    user: null,
    isLogged: false,
    permission: [],
    partenaire : null
};

const getters = {
    getUserInfo: state => state.user,
    isAuth: state => state.isLogged,
    userPermission: state => state.permission,
    partenaireInfo : state => state.partenaire
};

const actions = {
    actionInLogged({ commit }, data) {
        commit('LOGIN_MUTATION', data);
    },

    actionLogout({ commit }) {
        commit('LOGOUT_MUTATION');
    },

    actionLogoutWeb({ commit }) {
        commit('LOGOUT_WEB_MUTATION');
    }
};
const mutations = {
    [LOGIN_MUTATION](state, data) {
        state.user = data.resultat;
        state.isLogged = true;
        state.partenaire = data.partenaire;

        // console.log ('Menus', data.menus)
        data.menus.map((item) => {
            state.permission.push(parseInt(item.id))
        });

        localStorage.setItem('accessToken', data.accessToken)
        // window.location.href = '/espace-pro/dashboard';
    },
    [LOGOUT_MUTATION](state) {
        state.user = null;
        state.isLogged = false;
        state.permission = [];
        state.partenaire = null;
        localStorage.clear();

        window.location.href = '/espace-pro/connexion';
    },
    
    [LOGOUT_WEB_MUTATION](state) {
        state.user = null;
        state.isLogged = false;
        state.permission = [];
        state.partenaire = null;
        localStorage.clear();

        window.location.href = '/';
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};