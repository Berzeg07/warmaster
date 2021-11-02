<template>
    <div class="forest">
        <div class="forest-inner">
            <Tooltip class="rat forest-battle" id="rat">Болотные крысы</Tooltip>
            <Tooltip class="varg forest-battle" id="varg">Варги</Tooltip>
            <Tooltip class="vasilisk forest-battle" id="vasilisk">Василиск</Tooltip>
        </div>
    </div>
</template>

<script>
import Tooltip from '@/components/Buttons/Tooltip.vue';
export default {
    name: 'NorthForest',
    components: {
        Tooltip
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