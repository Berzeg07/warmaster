<template>
    <div class="georg-farm">
        <Tooltip class="georg" id="georg">Двор Георга</Tooltip>
    </div>
</template>

<script>
import Tooltip from '@/components/Buttons/Tooltip.vue';
export default {
    name: 'GeorgFarm',
    components: {
        Tooltip
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