import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Затемнение заднего фона *
    // Изначально true !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    overlay: false,
    // Вывод сцены *
    modalShow: false,
    // Журнал квестов *
    questListShow: false,
    // Доступность локаций на карте *
    isShowPlace: {
      horinis: false,
      fridrickFarm: false,
      fridrickFarmInner: false,
      heroHouse: false,
      bernard: false
    },
    hero: {
      heroHP: 100
    },
    // Вступительный экран *
    intro: true
  },
  mutations: {
    HERO_HP_UPDATE(state, currentHitpoint) {
      state.hero.heroHP = currentHitpoint;
    },
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
    HORINIS_SHOW(state) {
      state.isShowPlace.horinis = true;
    },
    FRIDRICKFARM_SHOW(state) {
      state.isShowPlace.fridrickFarm = true;
    },
    FRIDRICKFARM_INNER_SHOW(state) {
      state.isShowPlace.fridrickFarmInner = true;
    },
    HEROHOUSE_SHOW(state) {
      state.isShowPlace.heroHouse = true;
    },
    BERNARD_SHOW(state) {
      state.isShowPlace.bernard = true;
    },
  },
  actions: {
    HERO_HP_UPDATE_ACT(context, currentHitpoint) {
      context.commit('HERO_HP_UPDATE', currentHitpoint);
    },
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
    HORINIS_SHOW_ACT({ commit }) {
      commit('HORINIS_SHOW');
    },
    FRIDRICKFARM_SHOW_ACT({ commit }) {
      commit('FRIDRICKFARM_SHOW');
    },
    FRIDRICKFARM_INNER_SHOW_ACT({ commit }) {
      commit('FRIDRICKFARM_INNER_SHOW');
    },
    HEROHOUSE_SHOW_ACT({ commit }) {
      commit('HEROHOUSE_SHOW');
    },
    BERNARD_SHOW_ACT({ commit }) {
      commit('BERNARD_SHOW');
    },
  },
  getters: {
    HERO_HP_STATE(state) {
      return state.hero.heroHP;
    },
    QUEST_LIST_STATE(state) {
      return state.questListShow;
    },
    OVERLAY_STATE(state) {
      return state.overlay;
    },
    MODAL_SHOW_STATE(state) {
      return state.modalShow;
    },
    HORINIS_SHOW_STATE(state) {
      return state.isShowPlace.horinis;
    },
    FRIDRICKFARM_SHOW_STATE(state) {
      return state.isShowPlace.fridrickFarm;
    },
    FRIDRICKFARM_INNER_SHOW_STATE(state) {
      return state.isShowPlace.fridrickFarmInner;
    },
    HEROHOUSE_SHOW_STATE(state) {
      return state.isShowPlace.heroHouse;
    },
    BERNARD_SHOW_STATE(state) {
      return state.isShowPlace.bernard;
    },
  },
  modules: {
  }
})
