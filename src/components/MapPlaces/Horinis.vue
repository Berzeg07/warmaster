<template>
    <div class="horinis">
        <div class="horinis-inner">
            <div class="block-loc" v-if="HORINIS_SHOW_STATE">
                <Tooltip @click.native="showScene('andreas', $event)" class="andreas">Андреас</Tooltip>
                <Tooltip @click.native="showScene('selina', $event)" class="tavern">Таверна</Tooltip>
                <Tooltip
                    @click.native="showScene('heroHouse', $event)"
                    class="house"
                    v-if="HEROHOUSE_SHOW_STATE"
                >Дом</Tooltip>
                <!-- <Tooltip class="garold">Гарольд</Tooltip> -->
                <Tooltip @click.native="showScene(null, $event)" class="shop" sceneType="shop">Лавка</Tooltip>
                <Tooltip
                    class="bernard"
                    @click.native="showScene('bernard', $event)"
                    v-if="BERNARD_SHOW_STATE"
                >Бернард</Tooltip>
            </div>
            <Tooltip
                @click.native="showScene('horinisGuard', $event)"
                data-type="cityguard"
                class="guard"
            >Стража</Tooltip>
        </div>
    </div>
</template>

<script>
import Tooltip from '@/components/Buttons/Tooltip.vue';
// Vuex *
import { mapActions, mapGetters } from 'vuex'
// Миксины *
import { findWithKey, questAddList, sceneRender } from '@/mixins/mixins';

export default {
    name: 'Horinis',
    mixins: [findWithKey, questAddList, sceneRender],
    components: {
        Tooltip
    },
    mounted() {
        if (localStorage.getItem('gameData') != null) {
            var gameDataResponse = JSON.parse(localStorage.getItem("gameData"));
            if (gameDataResponse.gameProgress.isShowHorinis) {
                this.HORINIS_SHOW_ACT();
            }
            if (gameDataResponse.gameProgress.isShowHeroHouse) {
                this.HEROHOUSE_SHOW_ACT();
            }
            if (gameDataResponse.gameProgress.isTrainAndreas) {
                this.ANDREAS_TRAIN_UPDATE_ACT();
            }
            if (gameDataResponse.gameProgress.isShowBernard) {
                this.BERNARD_SHOW_ACT();
            }
        }
    },
    computed: {
        ...mapGetters([
            'HORINIS_SHOW_STATE',
            'HEROHOUSE_SHOW_STATE',
            'BERNARD_SHOW_STATE',
            'ANDREAS_TRAIN_STATE'
        ]),
    },
    methods: {
        ...mapActions([
            'OVERLAY_SHOW_ACT',
            'MODAL_SHOW_ACT',
            'HORINIS_SHOW_ACT',
            'HEROHOUSE_SHOW_ACT',
            'ANDREAS_TRAIN_UPDATE_ACT',
            'SHOP_SHOW_ACT',
            'BERNARD_SHOW_ACT'
        ]),
        showScene(scene, event) {
            var gameDataResponse = this.sceneRender(scene, event);
            var target = event.target.getAttribute('data-type');
            if (gameDataResponse) {
                if (target == 'cityguard') {
                    var currentQuestList = gameDataResponse.hero.questList;
                    var newQuest = {
                        questTitle: 'Начало',
                        questArticle: 'В Хоринис не пускают чужаков, нужно найти способ попасть в город'
                    }
                    var checkQuestList = this.findWithKey(currentQuestList, 'questTitle', newQuest.questTitle);
                    this.questAddList(checkQuestList, currentQuestList, newQuest);
                }
            }
        },
    }

}
</script>

<style scoped>
.guard {
    top: 160px;
    left: 24px;
}
.horinis {
    position: absolute;
    left: 193px;
    bottom: 220px;
    width: 188px;
    height: 124px;
    height: 150px;
}

.horinis-inner {
    position: relative;
}

.andreas {
    top: 63px;
}

.tavern {
    left: 2px;
    top: 107px;
}

.house {
    right: 21px;
    top: 80px;
}

.garold {
    left: 65px;
    top: 36px;
}

.shop {
    left: 70px;
    top: 72px;
}

.bernard {
    right: 42px;
    top: 112px;
}
</style>