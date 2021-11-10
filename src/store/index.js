import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Затемнение заднего фона *
    overlay: true,
    // Вывод сцены *
    modalShow: false,
    // Диалоговые сцены *
    // scenesObj: { runolvFirtsScene: false },
    // Вступительный экран *
    intro: true
  },
  mutations: {
    OVERLAY_HIDE(state) {
      state.overlay = false;
    },
    OVERLAY_SHOW(state) {
      state.overlay = true;
    },
    MODAL_SHOW_TOGGLE(state) {
      state.modalShow = !state.modalShow;
    },
    // RUNOLV_SCENE_END(state) {
    //   state.scenesObj.runolvFirtsScene = !state.scenesObj.runolvFirtsScene;
    // },
  },
  actions: {
    OVERLAY_HIDE_ACT({ commit }) {
      commit('OVERLAY_HIDE');
    },
    OVERLAY_SHOW_ACT({ commit }) {
      commit('OVERLAY_SHOW');
    },
    MODAL_SHOW_ACT({ commit }) {
      commit('MODAL_SHOW_TOGGLE');
    },
    // RUNOLV_SCENE_ACT({ commit }) {
    //   commit('RUNOLV_SCENE_END');
    // },
  },
  getters: {
    OVERLAY_STATE(state) {
      return state.overlay;
    },
    // RUNOLV_SCENE_STATE(state) {
    //   return state.scenesObj.runolvFirtsScene;
    // },
    MODAL_SHOW_STATE(state) {
      return state.modalShow;
    }
  },
  modules: {
  }
})
