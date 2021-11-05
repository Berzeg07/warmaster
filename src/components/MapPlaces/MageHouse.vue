<template>
    <div class="mage">
        <Tooltip class="runolv" id="runolv">Рунольв</Tooltip>
    </div>
</template>

<script>
import Tooltip from '@/components/Buttons/Tooltip.vue';

export default {
    name: 'MageHouse',
    components: {
        Tooltip
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