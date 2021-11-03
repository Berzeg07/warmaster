<template>
    <div class="farm">
        <div class="farm-inner">
            <Tooltip class="gerhard" id="gerhard">Герхард</Tooltip>
            <Tooltip class="fridrick" id="fridrick">Фридрик</Tooltip>
            <Tooltip class="job" id="job">Ферма</Tooltip>
        </div>
    </div>
</template>

<script>
import Tooltip from '@/components/Buttons/Tooltip.vue';
export default {
    name: 'FridrickFarm',
    components: {
        Tooltip
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