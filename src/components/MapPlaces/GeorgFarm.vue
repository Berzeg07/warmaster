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
import { sceneRender } from '@/mixins/mixins';
export default {
    name: 'GeorgFarm',
    mixins: [sceneRender],
    components: {
        Tooltip
    },
    methods: {
        ...mapActions([
            'OVERLAY_SHOW_ACT',
            'MODAL_SHOW_ACT',
        ]),
        showScene() {
            this.sceneRender('georgFarm');
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