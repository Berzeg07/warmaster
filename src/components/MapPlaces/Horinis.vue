<template>
    <div class="horinis">
        <div class="horinis-inner">
            <div class="block-loc" id="horinis_loc">
                <Tooltip class="andreas" id="andreas">Андреас</Tooltip>
                <Tooltip class="tavern" id="tavern">Таверна</Tooltip>
                <Tooltip class="house" id="house">Дом</Tooltip>
                <Tooltip class="garold" id="garold">Гарольд</Tooltip>
                <Tooltip class="shop" id="shop">Лавка</Tooltip>
                <Tooltip class="bernard" id="bernard">Бернард</Tooltip>
            </div>
            <Tooltip class="guard" id="guard">Стража</Tooltip>
        </div>
    </div>
</template>

<script>
import Tooltip from '@/components/Buttons/Tooltip.vue';
export default {
    name: 'Horinis',
    components: {
        Tooltip
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