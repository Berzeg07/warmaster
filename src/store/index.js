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
    // Вывод магазина *
    shopShow: false,
    // Журнал квестов *
    questListShow: false,
    // Инвентарь *
    inventoryShow: false,
    // Битва *
    battle: false,
    // Враг в текущей битве *
    currentEnemy: false,
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
      heroDamage: 10,
      heroArmor: 0,
      heroWeapon: 'Пусто',
      heroEquip: 'Пусто',
      weaponClass: '',
      equipClass: ''
    },
    // Вступительный экран *
    intro: true
  },
  mutations: {
    ENEMY_UPDATE(state, enemy) {
      state.currentEnemy = enemy;
    },
    HERO_DAMAGE_UPDATE(state, currentDamage) {
      state.hero.heroDamage = currentDamage;
    },
    HERO_ARMOR_UPDATE(state, currentArmor) {
      state.hero.heroArmor = currentArmor;
    },
    HERO_WEAPON_UPDATE(state, currentWeapon) {
      state.hero.heroWeapon = currentWeapon;
    },
    WEAPON_CLASS_UPDATE(state, className) {
      state.hero.weaponClass = className;
    },
    HERO_EQUIP_UPDATE(state, currentEquip) {
      state.hero.heroEquip = currentEquip;
    },
    EQUIP_CLASS_UPDATE(state, className) {
      state.hero.equipClass = className;
    },
    INVENTORY_TOGGLE(state) {
      state.inventoryShow = !state.inventoryShow;
    },
    ANDREAS_TRAIN_UPDATE(state) {
      state.isShowPlace.isTrainAndreas = true;
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
    SHOP_SHOW_TOGGLE(state) {
      state.shopShow = !state.shopShow;
    },
    BATTLE_TOGGLE(state) {
      state.battle = !state.battle;
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
    ENEMY_UPDATE_ACT(context, enemy) {
      context.commit('ENEMY_UPDATE', enemy);
    },
    WEAPON_CLASS_ACT(context, className) {
      context.commit('WEAPON_CLASS_UPDATE', className);
    },
    EQUIP_CLASS_ACT(context, className) {
      context.commit('EQUIP_CLASS_UPDATE', className);
    },
    HERO_ARMOR_ACT(context, currentArmor) {
      context.commit('HERO_ARMOR_UPDATE', currentArmor);
    },
    HERO_WEAPON_ACT(context, currentWeapon) {
      context.commit('HERO_WEAPON_UPDATE', currentWeapon);
    },
    HERO_EQUIP_ACT(context, currentEquip) {
      context.commit('HERO_EQUIP_UPDATE', currentEquip);
    },
    BATTLE_ACT(context) {
      context.commit('BATTLE_TOGGLE');
    },
    ANDREAS_TRAIN_UPDATE_ACT(context) {
      context.commit('ANDREAS_TRAIN_UPDATE');
    },
    INVENTORY_TOGGLE_ACT(context) {
      context.commit('INVENTORY_TOGGLE');
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
    SHOP_SHOW_ACT({ commit }) {
      commit('SHOP_SHOW_TOGGLE');
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
    ENEMY_STATE(state) {
      return state.currentEnemy;
    },
    BATTLE_STATE(state) {
      return state.battle;
    },
    WEAPON_CLASS_STATE(state) {
      return state.hero.weaponClass;
    },
    EQUIP_CLASS_STATE(state) {
      return state.hero.equipClass;
    },
    HERO_ARMOR_STATE(state) {
      return state.hero.heroArmor;
    },
    HERO_WEAPON_STATE(state) {
      return state.hero.heroWeapon;
    },
    HERO_EQUIP_STATE(state) {
      return state.hero.heroEquip;
    },
    INVENTORY_TOGGLE_STATE(state) {
      return state.inventoryShow
    },
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
    SHOP_SHOW_STATE(state) {
      return state.shopShow;
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
