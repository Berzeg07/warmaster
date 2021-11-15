<template>
    <div class="georg-farm">
        <Tooltip @click.native="showScene" class="georg">Двор Георга</Tooltip>
    </div>
</template>

<script>
import Tooltip from '@/components/Buttons/Tooltip.vue';
// Vuex *
import { mapActions } from 'vuex'
// Миксины *
import { findWithKey, questAddList, sceneRender } from '@/mixins/mixins';
export default {
    name: 'GeorgFarm',
    mixins: [findWithKey, questAddList, sceneRender],
    components: {
        Tooltip
    },
    methods: {
        ...mapActions([
            'OVERLAY_SHOW_ACT',
            'MODAL_SHOW_ACT',
        ]),
        showScene() {
            var gameDataResponse = this.sceneRender('georgFarm');
            if (gameDataResponse) {
                var currentQuestList = gameDataResponse.hero.questList;
                var newQuest = {
                    questTitle: 'Начало',
                    questArticle: 'В Хэртланд не пускают чужаков, нужно найти способ попасть в город'
                }
                var checkQuestList = this.findWithKey(currentQuestList, 'questTitle', newQuest.questTitle);
                this.questAddList(checkQuestList, currentQuestList, newQuest);
            }
        }
    }
}
</script>

<style>
.georg-farm {
    position: absolute;
    width: 200px;
    left: 270px;
    bottom: 150px;
}
</style>