
const MUTATE_RESULTAT_RECHERCHE = 'MUTATE_RESULTAT_RECHERCHE';
const MUTATE_EMPTY_RECHERCHE = 'MUTATE_EMPTY_RECHERCHE';

const state = {
   resultat : []
};
const getters = {
   getResultatData (state) {
       return state.resultat;
   }
};

const actions = {
    actionRechercheResultat ({commit}, resultat) {
        // console.log ('action', resultat)
        commit('MUTATE_RESULTAT_RECHERCHE', resultat)
    },

    actionEmptyResultat ({commit}) {
        // console.log ('action', resultat)
        commit('MUTATE_EMPTY_RECHERCHE')
    }
};
const mutations = {
    [MUTATE_RESULTAT_RECHERCHE] (state, resultat) {
        resultat.map((value) => {
            state.resultat.push(value);
        })
    },

    [MUTATE_EMPTY_RECHERCHE] (state) {
        state.resultat = [];
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};