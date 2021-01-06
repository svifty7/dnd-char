import { createStore } from 'vuex'
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

const Vuex = createStore({
    state,
    getters,
    actions,
    mutations
});

export default Vuex
