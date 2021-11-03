<template>
    <div class="foggy-hollow">
        <Tooltip class="hollow" id="hollow">Туманная лощина</Tooltip>
    </div>
</template>

<script>
import Tooltip from '@/components/Buttons/Tooltip.vue';
export default {
    name: 'FoggyHollow',
    components: {
        Tooltip
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