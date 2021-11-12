<template>
    <div class="mage">
        <Tooltip @click.native="showScene" class="runolv">Рунольв</Tooltip>
    </div>
</template>

<script>
// Кнопка вызова сцены *
import Tooltip from '@/components/Buttons/Tooltip.vue';
// Vuex *
import { mapActions } from 'vuex'
// Миксины *
import { findWithKey, questAddList } from '@/mixins/mixins';

export default {
    name: 'MageHouse',
    mixins: [findWithKey, questAddList],
    data() {
        return {
            questJournal: []
        }
    },
    components: {
        Tooltip
    },
    methods: {
        ...mapActions([
            'OVERLAY_HIDE_ACT',
            'OVERLAY_SHOW_ACT',
            'MODAL_SHOW_ACT',
        ]),
        showScene() {
            if (localStorage.getItem('gameData') != null) {
                var gameDataResponse = JSON.parse(localStorage.getItem("gameData"));
                gameDataResponse.gameSceneCurrent = 'runolvHouseEmpty';
                var serialDataBase = JSON.stringify(gameDataResponse);
                localStorage.setItem("gameData", serialDataBase);
                this.OVERLAY_SHOW_ACT();
                this.MODAL_SHOW_ACT();

                var currentQuestList = gameDataResponse.hero.questList;
                var newQuest = {
                    questTitle: 'Начало',
                    questArticle: 'После моего убытия Рунольв куда то исчез, странно ...'
                }
                var checkQuestList = this.findWithKey(currentQuestList, 'questTitle', newQuest.questTitle);
                this.questAddList(checkQuestList, currentQuestList, newQuest);

            } else {
                console.log('Отсутствует база данных');
            }
        }
    }
}
</script>

<style scoped>
.mage {
    position: absolute;
    right: 280px;
    top: 66px;
    width: 100px;
}
</style>