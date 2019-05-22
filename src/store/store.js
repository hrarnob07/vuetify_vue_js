import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        buttonClicked: false
    },
    mutations: {
        SET_BUTTON_CLICKED: (state, data) => {
            state.buttonClicked = data;
        }
    },
    actions: {}
})
