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
      bernard: false,
      isTrainAndreas: false
    },
    hero: {
      heroHP: 100,
      heroGold: 100,
      heroDamage: 10
    },
    // Вступительный экран *
    intro: true
  },
  mutations: {
    ANDREAS_TRAIN_UPDATE(state) {
      state.isShowPlace.isTrainAndreas = true;
    },
    HERO_DAMAGE_UPDATE(state, currentDamage) {
      state.hero.heroDamage = currentDamage;
    },
    HERO_GOLD_UPDATE(state, currentGold) {
      state.hero.heroGold = currentGold;
    },
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
    ANDREAS_TRAIN_UPDATE_ACT(context) {
      context.commit('ANDREAS_TRAIN_UPDATE');
    },
    HERO_GOLD_UPDATE_ACT(context, currentGold) {
      context.commit('HERO_GOLD_UPDATE', currentGold);
    },
    HERO_DAMAGE_UPDATE_ACT(context, currentDamage) {
      context.commit('HERO_DAMAGE_UPDATE', currentDamage);
    },
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
    ANDREAS_TRAIN_STATE(state) {
      return state.isShowPlace.isTrainAndreas
    },
    HERO_DAMAGE_STATE(state) {
      return state.hero.heroDamage;
    },
    HERO_GOLD_STATE(state) {
      return state.hero.heroGold;
    },
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
