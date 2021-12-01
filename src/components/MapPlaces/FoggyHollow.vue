<template>
    <div class="foggy-hollow">
        <Tooltip class="hollow" @click.native="showScene('hollow', $event)">Туманная лощина</Tooltip>
    </div>
</template>

<script>
import Tooltip from '@/components/Buttons/Tooltip.vue';
// Миксины *
import { sceneRender } from '@/mixins/mixins';
// Vuex *
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'FoggyHollow',
    mixins: [sceneRender],
    components: {
        Tooltip
    },
    data() {
        return {
            gameData: {}
        }
    },
    mounted() {
        if (localStorage.getItem('gameData') != null) {
            var gameDataResponse = JSON.parse(localStorage.getItem("gameData"));
            this.gameData = gameDataResponse;
            console.log(gameDataResponse.gameProgress.isShowHollow)
            if (gameDataResponse.gameProgress.isShowHollow) {
                this.gameData.charactersNPC.hollow.dialogueLevel = 1;
                this.HOLLOW_SHOW_ACT();
            }
        }
    },
    computed: {
        ...mapGetters([
            'HOLLOW_SHOW_STATE'
        ]),
    },
    methods: {
        ...mapActions([
            'OVERLAY_SHOW_ACT',
            'MODAL_SHOW_ACT',
            'HOLLOW_SHOW_ACT'
        ]),
        showScene(scene, event) {
            this.sceneRender(scene, event);
        },
    }
}
</script>
<style>
.foggy-hollow {
    position: absolute;
    left: 440px;
    bottom: 110px;
}
</style>