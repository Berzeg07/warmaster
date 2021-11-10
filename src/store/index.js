import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Затемнение заднего фона *
    overlay: true,
    // Вывод сцены *
    modalShow: false,
    // Журнал квестов *
    questListShow: false,
    // Диалоговые сцены *
    // scenesObj: { runolvFirtsScene: false },
    // Вступительный экран *
    intro: true
  },
  mutations: {
    QUEST_LIST_TOGGLE(state) {
      state.questListShow = !state.questListShow;
    },
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
    QUEST_LIST_TOGGLE_ACT({ commit }) {
      commit('QUEST_LIST_TOGGLE');
    },
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
    QUEST_LIST_STATE(state) {
      return state.questListShow;
    },
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
