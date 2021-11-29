<template>
    <div class="forest">
        <div class="forest-inner">
            <Tooltip
                class="rat forest-battle"
                sceneType="battle"
                data-type="rat"
                @click.native="showScene(null, $event)"
            >Болотные крысы</Tooltip>
            <Tooltip
                class="varg forest-battle"
                data-type="varg"
                sceneType="battle"
                @click.native="showScene(null, $event)"
            >Варги</Tooltip>
            <Tooltip
                class="vasilisk forest-battle"
                data-type="vasilisk"
                sceneType="battle"
                @click.native="showScene(null, $event)"
            >Василиск</Tooltip>
        </div>
    </div>
</template>

<script>
import Tooltip from '@/components/Buttons/Tooltip.vue';
// Миксины *
import { sceneRender } from '@/mixins/mixins';
// Vuex *
import { mapActions, mapGetters, } from 'vuex';

export default {
    name: 'NorthForest',
    mixins: [sceneRender],
    components: {
        Tooltip
    },
    computed: {
        ...mapGetters([
            'ENEMY_STATE',
        ]),
    },
    methods: {
        ...mapActions([
            'OVERLAY_SHOW_ACT',
            'BATTLE_ACT',
            'ENEMY_UPDATE_ACT'
        ]),
        showScene(scene, event) {
            var gameDataResponse = this.sceneRender(scene, event);
            var target = event.target.getAttribute('data-type');
            if (gameDataResponse) {
                gameDataResponse.currentEnemy = target;
                localStorage.setItem("gameData", JSON.stringify(gameDataResponse));
                this.ENEMY_UPDATE_ACT(target);
                // console.log(this.ENEMY_STATE)
            }
        },
    }
}
</script>

<style scoped>
.forest {
    position: absolute;
    width: 340px;
    height: 180px;
    left: 126px;
    top: 90px;
}

.forest-inner {
    position: relative;
}
.rat {
    left: 120px;
    top: 130px;
}
.varg {
    right: 35px;
    top: 102px;
}
.vasilisk {
    left: 160px;
    top: 70px;
}
</style>