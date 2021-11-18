<template>
    <div class="hero-infobar">
        <div class="hero-infobar_btn">
            <Button @click.native="questListToggle" class="panel-journal_btn">Журнал</Button>
            <Button class="panel-inv_btn">Инвентарь</Button>
        </div>
        <ul class="hero-skill">
            <li>
                <span>Урон:</span>
                <span>{{ HERO_DAMAGE_STATE }}</span>
            </li>
            <li>
                <span>Броня:</span>
                <span>{{ gameData.heroArmor }}</span>
            </li>
            <li>
                <span>Крит:</span>
                <span>{{ gameData.heroCrit }}%</span>
            </li>
            <li>
                <span>Здоровье:</span>
                <span>{{ HERO_HP_STATE }}</span>
            </li>
            <li>
                <span>Золото:</span>
                <span>{{ HERO_GOLD_STATE }}</span>
            </li>
        </ul>
        <ul class="hero-equip">
            <li>
                <span>Оружие:</span>
                <span>{{ gameData.heroWeapon }}</span>
            </li>
            <li>
                <span>Доспех:</span>
                <span>{{ gameData.heroEquip }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import Button from '@/components/Buttons/Button.vue';
// Vuex *
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'HeroInfoBar',
    data() {
        return {
            gameData: {}
        }
    },
    components: {
        Button
    },
    mounted() {
        if (localStorage.getItem('gameData') != null) {
            var gameDataResponse = JSON.parse(localStorage.getItem("gameData"));
            this.gameData = gameDataResponse.hero;
            this.HERO_HP_UPDATE_ACT(this.gameData.heroHP);
            this.HERO_GOLD_UPDATE_ACT(this.gameData.heroGold);
            this.HERO_DAMAGE_UPDATE_ACT(this.gameData.heroDamage);
        }
    },
    computed: {
        ...mapGetters([
            'HERO_HP_STATE',
            'HERO_GOLD_STATE',
            'HERO_DAMAGE_STATE'
        ]),
    },
    methods: {
        ...mapActions([
            'QUEST_LIST_TOGGLE_ACT',
            'OVERLAY_SHOW_ACT',
            'HERO_HP_UPDATE_ACT',
            'HERO_GOLD_UPDATE_ACT',
            'HERO_DAMAGE_UPDATE_ACT'
        ]),
        questListToggle() {
            this.QUEST_LIST_TOGGLE_ACT();
            this.OVERLAY_SHOW_ACT();
        }
    }
}
</script>

<style scoped>
.hero-infobar {
    width: 1140px;
    position: absolute;
    bottom: -16px;
    left: 50%;
    transform: translateX(-50%);
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    border: 1px solid white;
    -webkit-box-shadow: 0 0 5px 0 white;
    -moz-box-shadow: 0 0 5px 0 white;
    box-shadow: 0 0 5px 0 white;
}

.hero-infobar ul {
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
}

.hero-infobar ul li {
    position: relative;
    padding-right: 7px;
    margin-right: 7px;
}

.hero-infobar ul li:not(:last-child):after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 20px;
    background: white;
}

.hero-infobar ul li span {
    color: white;
    display: inline-block;
    margin-right: 5px;
    font-size: 18px;
}

.hero-infobar ul li span:first-child {
    color: orange;
}
</style>