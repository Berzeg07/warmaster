<template>
    <div class="horinis">
        <div class="horinis-inner">
            <div class="block-loc" v-if="HORINIS_SHOW_STATE">
                <Tooltip class="andreas">Андреас</Tooltip>
                <Tooltip class="tavern">Таверна</Tooltip>
                <Tooltip class="house" v-if="HEROHOUSE_SHOW_STATE">Дом</Tooltip>
                <Tooltip class="garold">Гарольд</Tooltip>
                <Tooltip class="shop">Лавка</Tooltip>
                <Tooltip class="bernard" v-if="BERNARD_SHOW_STATE">Бернард</Tooltip>
            </div>
            <Tooltip @click.native="showSceneGuard" class="guard">Стража</Tooltip>
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
    computed: {
        ...mapGetters([
            'HORINIS_SHOW_STATE',
            'HEROHOUSE_SHOW_STATE',
            'BERNARD_SHOW_STATE'
        ]),
    },
    methods: {
        ...mapActions([
            'OVERLAY_SHOW_ACT',
            'MODAL_SHOW_ACT',
        ]),
        showSceneGuard() {
            var gameDataResponse = this.sceneRender('horinisGuard');
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