<template>
    <div class="hero-infobar">
        <div class="hero-infobar_btn">
            <Button @click.native="questListToggle" class="panel-journal_btn">Журнал</Button>
            <Button class="panel-inv_btn">Инвентарь</Button>
        </div>
        <ul class="hero-skill">
            <li>
                <span>Урон:</span>
                <span>{{ gameData.heroDamage }}</span>
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
                <span>{{ gameData.heroHP }}</span>
            </li>
            <li>
                <span>Золото:</span>
                <span>{{ gameData.heroGold }}</span>
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
import { mapActions } from 'vuex'

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
            // Получаем данные *
            var gameDataResponse = JSON.parse(localStorage.getItem("gameData"));
            this.gameData = gameDataResponse.hero;
        }
    },
    methods: {
        ...mapActions([
            'QUEST_LIST_TOGGLE_ACT',
            'OVERLAY_SHOW_ACT'
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