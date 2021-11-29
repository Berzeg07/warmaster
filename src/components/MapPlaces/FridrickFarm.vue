<template>
    <div class="farm">
        <div class="farm-inner">
            <Tooltip class="gerhard" @click.native="showScene('senteza', $event)">Сентеза</Tooltip>
            <Tooltip class="fridrick" v-if="FRIDRICKFARM_INNER_SHOW_STATE">Фридрик</Tooltip>
            <Tooltip class="job" v-if="FRIDRICKFARM_INNER_SHOW_STATE">Ферма</Tooltip>
        </div>
    </div>
</template>

<script>
import Tooltip from '@/components/Buttons/Tooltip.vue';
// Vuex *
import { mapActions, mapGetters } from 'vuex'
// Миксины *
import { sceneRender } from '@/mixins/mixins';

export default {
    name: 'FridrickFarm',
    mixins: [sceneRender],
    components: {
        Tooltip
    },
    mounted() {
        if (localStorage.getItem('gameData') != null) {
            var gameDataResponse = JSON.parse(localStorage.getItem("gameData"));
            if (gameDataResponse.gameProgress.isSwowFarmInner) {
                this.FRIDRICKFARM_INNER_SHOW_ACT();
            }
        }
    },
    computed: {
        ...mapGetters([
            'FRIDRICKFARM_INNER_SHOW_STATE'
        ]),
    },
    methods: {
        ...mapActions([
            'FRIDRICKFARM_INNER_SHOW_ACT',
            'OVERLAY_SHOW_ACT',
            'MODAL_SHOW_ACT',
        ]),
        showScene(scene, event) {
            this.sceneRender(scene, event);
        },
    }
}
</script>

<style scoped>
.farm {
    position: absolute;
    width: 200px;
    height: 100px;
    right: 151px;
    bottom: 128px;
}

.farm-inner {
    position: relative;
}
.gerhard {
    right: 91px;
    top: 30px;
}
.fridrick {
    left: 116px;
    top: -100px;
}

.job {
    left: 140px;
    top: 60px;
}
</style>