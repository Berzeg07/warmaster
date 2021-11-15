<template>
    <div class="horinis">
        <div class="horinis-inner">
            <div class="block-loc" v-if="HORINIS_SHOW_STATE">
                <Tooltip class="andreas">Андреас</Tooltip>
                <Tooltip class="tavern">Таверна</Tooltip>
                <Tooltip class="house" v-if="HEROHOUSE_SHOW_STATE">Дом</Tooltip>
                <Tooltip class="garold">Гарольд</Tooltip>
                <Tooltip class="shop">Лавка</Tooltip>
                <Tooltip class="bernard" v-if="BERNARD_SHOW_STATE">Бернард</Tooltip>
            </div>
            <Tooltip class="guard">Стража</Tooltip>
        </div>
    </div>
</template>

<script>
import Tooltip from '@/components/Buttons/Tooltip.vue';
// Vuex *
import { mapGetters } from 'vuex'

export default {
    name: 'Horinis',
    components: {
        Tooltip
    },
    computed: {
        ...mapGetters([
            'HORINIS_SHOW_STATE',
            'HEROHOUSE_SHOW_STATE',
            'BERNARD_SHOW_STATE'
        ]),
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