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
            <Hero />
            <HeroInfoBar />
        </div>
        <DialogueScene v-if="MODAL_SHOW_STATE" :class="checkModalState" />
    </div>
</template>

<script>
// Стартовый объект базы данных *
import { dataBase } from '@/database/database';

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

// Затемнение фона *
import Overlay from '@/components/Overlay/Overlay.vue';

// Герой *
import Hero from '@/components/Hero/Hero.vue';
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

export default {
    name: 'layout',
    components: {
        NorthForest,
        Hero,
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
        Inventory
    },
    data() {
        return {
            modalShow: 'modalshow',
            // Изначально true !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            isShowIntro: false,
            backgroundUrl,
            backgroundMap,
        };
    },
    mounted() {
        // Очистка базы для отладки **************** !!!
        localStorage.clear();

        // Запись в locale storage первичной структуры базы данных *
        if (localStorage.getItem('gameData') == null) {
            var serialDataBase = JSON.stringify(dataBase);
            localStorage.setItem("gameData", serialDataBase);
        }
        // Получаем данные *
        var gameDataResponse = JSON.parse(localStorage.getItem("gameData"));
        // Проверка на стартовый экран и состояние текущей сцены *
        if (gameDataResponse.gameSceneCurrent != 'intro') {
            this.isShowIntro = false;
            this.OVERLAY_HIDE_ACT();
            if (gameDataResponse.gameSceneCurrent != null) {
                if (this.MODAL_SHOW_STATE != true) {
                    this.OVERLAY_SHOW_ACT();
                    this.MODAL_SHOW_ACT();
                }
            }
        }
        // Проверка на доступность локации Фридрика *
        if (gameDataResponse.gameProgress.isShowFarm) {
            this.FRIDRICKFARM_SHOW_ACT();
        }
    },
    computed: {
        ...mapGetters([
            'MODAL_SHOW_STATE',
            'OVERLAY_STATE',
            'QUEST_LIST_STATE',
            'FRIDRICKFARM_SHOW_STATE',
            'INVENTORY_TOGGLE_STATE'
        ]),

        checkModalState() {
            return this.MODAL_SHOW_STATE == true ? this.modalShow : '';
        },
        checkQuestModalState() {
            return this.QUEST_LIST_STATE == true ? this.modalShow : '';
        },
        checkInvModalState() {
            return this.INVENTORY_TOGGLE_STATE == true ? this.modalShow : '';
        }
    },
    methods: {
        ...mapActions([
            'OVERLAY_HIDE_ACT',
            'OVERLAY_SHOW_ACT',
            'MODAL_SHOW_ACT',
            'FRIDRICKFARM_SHOW_ACT',
        ]),
        hideIntro(data) {
            this.isShowIntro = data.intro;
        }
    }
}
</script>

<style scoped>
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