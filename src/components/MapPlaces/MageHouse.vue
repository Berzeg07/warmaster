<template>
    <div class="mage">
        <Tooltip @click.native="showScene('runolvHouseEmpty', $event)" class="runolv">Рунольв</Tooltip>
    </div>
</template>

<script>
// Кнопка вызова сцены *
import Tooltip from '@/components/Buttons/Tooltip.vue';
// Vuex *
import { mapActions } from 'vuex'
// Миксины *
import { findWithKey, questAddList, sceneRender } from '@/mixins/mixins';

export default {
    name: 'MageHouse',
    mixins: [findWithKey, questAddList, sceneRender],
    components: {
        Tooltip
    },
    methods: {
        ...mapActions([
            'OVERLAY_SHOW_ACT',
            'MODAL_SHOW_ACT',
        ]),
        showScene(scene, event) {
            var gameDataResponse = this.sceneRender(scene, event);
            if (gameDataResponse) {
                var currentQuestList = gameDataResponse.hero.questList;
                var newQuest = {
                    questTitle: 'Начало',
                    questArticle: 'После моего убытия Рунольв куда то исчез, странно ...'
                }
                var checkQuestList = this.findWithKey(currentQuestList, 'questTitle', newQuest.questTitle);
                this.questAddList(checkQuestList, currentQuestList, newQuest);
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