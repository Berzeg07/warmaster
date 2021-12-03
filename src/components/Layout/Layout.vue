<template>
    <div class="content" :style="{ backgroundImage: `url(${backgroundUrl})` }">
        <div class="box-shadow"></div>
        <div class="map-container">
            <div class="map-container__inner" :style="{ backgroundImage: `url(${backgroundMap})` }">
                <NorthForest />
                <MageHouse />
                <Horinis />
                <GeorgFarm />
                <FoggyHollow />
                <FridrickFarm v-if="FRIDRICKFARM_SHOW_STATE" />
                <Inventory v-if="INVENTORY_TOGGLE_STATE" :class="checkInvModalState" />
                <QuestList v-if="QUEST_LIST_STATE" :class="checkQuestModalState" />
                <Introduction v-if="isShowIntro" @hideIntro="hideIntro" />
            </div>
            <Overlay />
            <!-- <Hero /> -->
            <HeroBack />
            <HeroInfoBar />
        </div>
        <DialogueScene v-if="MODAL_SHOW_STATE" :class="checkModalState" />
        <ShopScene v-if="SHOP_SHOW_STATE" :class="checkShopState" />
        <BattleScene v-if="BATTLE_STATE" :class="checkBattleState" />
        <div class="restart">
            <button
                class="btn"
                @click="restartGame"
            >Начать сначала (После обвноления нужно сбросить кеш ctrl+F5)</button>
        </div>
    </div>
</template>

<script>
// Объекты на карте *
import NorthForest from '@/components/MapPlaces/NorthForest.vue';
import MageHouse from '@/components/MapPlaces/MageHouse.vue';
import Horinis from '@/components/MapPlaces/Horinis.vue';
import GeorgFarm from '@/components/MapPlaces/GeorgFarm.vue';
import FoggyHollow from '@/components/MapPlaces/FoggyHollow.vue';
import FridrickFarm from '@/components/MapPlaces/FridrickFarm.vue';

// Всплывающие сцены *
import Introduction from '@/components/Scenes/Introduction.vue';
import DialogueScene from '@/components/Scenes/DialogueScene.vue';
import ShopScene from '@/components/Scenes/ShopScene.vue';
import BattleScene from '@/components/Scenes/BattleScene.vue';

// Затемнение фона *
import Overlay from '@/components/Overlay/Overlay.vue';

// Герой *
// import Hero from '@/components/Hero/Hero.vue';
import HeroBack from '@/components/Hero/HeroBack.vue';
import HeroInfoBar from '@/components/Hero/HeroInfoBar.vue';

// Журнал квестов *
import QuestList from '@/components/Hero/QuestList.vue';

// Инвентарь *
import Inventory from '@/components/Hero/Inventory.vue';

// Фоновые картинки *
import backgroundUrl from "@/assets/img/bg-main.jpg";
import backgroundMap from "@/assets/img/map.png";

// Vuex *
import { mapGetters, mapActions } from 'vuex'
// Миксины *
import { dataResponse } from '@/mixins/mixins';

export default {
    name: 'layout',
    mixins: [dataResponse],

    components: {
        NorthForest,
        HeroBack,
        // Hero,
        HeroInfoBar,
        MageHouse,
        Horinis,
        GeorgFarm,
        FoggyHollow,
        FridrickFarm,
        Overlay,
        Introduction,
        DialogueScene,
        QuestList,
        Inventory,
        ShopScene,
        BattleScene
    },
    data() {
        return {
            gameData: {},
            modalShow: 'modalshow',
            // Изначально true !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            isShowIntro: true,
            backgroundUrl,
            backgroundMap,
        };
    },
    mounted() {
        // Получаем данные *
        this.dataResponse();
        // Проверка на стартовый экран и состояние текущей сцены *
        if (this.gameData.gameSceneCurrent != 'intro') {
            this.isShowIntro = false;
            this.OVERLAY_HIDE_ACT();
            if (this.gameData.gameSceneCurrent) {
                if (!this.MODAL_SHOW_STATE) {
                    this.OVERLAY_SHOW_ACT();
                    this.MODAL_SHOW_ACT();
                }
            }
        }
        if (this.gameData.shopShow) {
            if (this.SHOP_SHOW_STATE == false) {
                this.OVERLAY_SHOW_ACT();
                this.SHOP_SHOW_ACT();
            }
        }
        if (this.gameData.gameFightScene) {
            if (this.BATTLE_STATE == false) {
                this.OVERLAY_SHOW_ACT();
                this.BATTLE_ACT();
            }
        }
        // Проверка на доступность локации Фридрика *
        if (this.gameData.gameProgress.isShowFarm) {
            this.FRIDRICKFARM_SHOW_ACT();
        }
    },
    computed: {
        ...mapGetters([
            'MODAL_SHOW_STATE',
            'SHOP_SHOW_STATE',
            'OVERLAY_STATE',
            'QUEST_LIST_STATE',
            'FRIDRICKFARM_SHOW_STATE',
            'INVENTORY_TOGGLE_STATE',
            'BATTLE_STATE',
            'GAME_DATA_STATE'
        ]),
        checkShopState() {
            return this.SHOP_SHOW_STATE == true ? this.modalShow : '';
        },

        checkModalState() {
            return this.MODAL_SHOW_STATE == true ? this.modalShow : '';
        },
        checkQuestModalState() {
            return this.QUEST_LIST_STATE == true ? this.modalShow : '';
        },
        checkInvModalState() {
            return this.INVENTORY_TOGGLE_STATE == true ? this.modalShow : '';
        },
        checkBattleState() {
            return this.BATTLE_STATE == true ? this.modalShow : '';
        },
    },
    methods: {
        ...mapActions([
            'GAME_DATA_ACT',
            'OVERLAY_HIDE_ACT',
            'OVERLAY_SHOW_ACT',
            'MODAL_SHOW_ACT',
            'FRIDRICKFARM_SHOW_ACT',
            'SHOP_SHOW_ACT',
            'BATTLE_ACT'
        ]),
        hideIntro(data) {
            this.isShowIntro = data.intro;
        },
        restartGame() {
            localStorage.clear();
            // location.reload();
            window.location.reload(true)
        },
    }
}
</script>

<style scoped>
.btn {
    font-size: 17px;
    background: white;
    border: none;
    border-radius: 5px;
    border: 2px solid orange;
    cursor: pointer;
    padding: 4px 12px;
    margin-right: 4px;
    transition: 0.5s;
    color: black;
}

.btn:hover {
    background: rgba(0, 0, 0, 0.7);
    color: white;
}
.restart {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 50px;
    z-index: 9;
}

.content {
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
    background-size: cover;
    height: 100%;
}
.box-shadow {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
}
.map-container {
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1280px;
    margin: 0 auto;
    position: relative;
}
.map-container__inner {
    width: 900px;
    height: 600px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
}
</style>