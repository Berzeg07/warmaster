<template>
    <div
        class="modal modal-show modal-loc forest-loc"
        :style="{ backgroundImage: `url(${background})` }"
    >
        <div class="modal-inner">
            <div class="battle-block">
                <div class="modal-inner_item">
                    <div class="modal-hero">
                        <div class="modal-hero_inner">
                            <Hero />
                        </div>
                    </div>
                    <div class="modal-enemy" :class="enemyClass[ENEMY_STATE]">
                        <img :src="enemyImg[ENEMY_STATE]" />
                    </div>
                    <div class="battle-options">
                        <div class="battle-options_inner battle-options_action">
                            <Button>Атаковать</Button>
                            <Button>Отступить</Button>
                        </div>
                        <div class="battle-options_flex">
                            <div class="battle-options_inner">
                                <ul class="battle-list">
                                    <li>
                                        <p class="battle-list_title">Герой</p>
                                    </li>
                                    <li>
                                        <b>Урон:</b>
                                        <span>{{ heroDamage }}</span>
                                    </li>
                                    <li>
                                        <b>Броня:</b>
                                        <span>{{ heroData.heroArmor }}</span>
                                    </li>
                                    <li>
                                        <b>Крит:</b>
                                        <span>{{ heroData.heroCrit }}%</span>
                                    </li>
                                    <li>
                                        <b>Здоровье:</b>
                                        <span>{{ heroData.heroHP }}</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="battle-options_inner">
                                <ul class="battle-list">
                                    <li>
                                        <p class="battle-list_title">Василиск</p>
                                    </li>
                                    <li>
                                        <b>Урон:</b>
                                        <span>???</span>
                                    </li>
                                    <li>
                                        <b>Броня:</b>
                                        <span>???</span>
                                    </li>
                                    <li>
                                        <b>Крит:</b>
                                        <span>???</span>
                                    </li>
                                    <li>
                                        <b>Здоровье:</b>
                                        <span>???</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// Фоновые картинки *
import sceneImage from "@/assets/img/forest-loc.jpg";
// Кнопки *
import Button from '@/components/Buttons/Button.vue';
// Герой *
import Hero from '@/components/Hero/Hero.vue';
// Враги *
import rat from "@/assets/img/rat.png";
import varg from "@/assets/img/varg.png";
import vasilisk from "@/assets/img/vasilisk.png";


// Vuex *
import { mapActions, mapGetters, } from 'vuex';

export default {
    name: 'BattleScene',
    components: {
        Button,
        Hero
    },
    mounted() {
        if (localStorage.getItem('gameData') != null) {
            var gameDataResponse = JSON.parse(localStorage.getItem("gameData"));
            this.gameData = gameDataResponse;
            this.heroData = gameDataResponse.hero;
            this.heroDamage = this.heroData.heroDamage + this.heroData.weaponDamage;
            this.enemy = this.gameData.enemy;
            this.currentEnemy = this.enemy[this.ENEMY_STATE];
            console.log('enemy', this.currentEnemy.damage)
        }
    },
    data() {
        return {
            enemyImg: {
                rat,
                varg,
                vasilisk
            },
            enemyClass: {
                rat: 'rat-battle',
                varg: 'varg-battle',
                vasilisk: 'vasilisk-battle'
            },
            gameData: {},
            heroData: {},
            currentEnemy: {},
            heroDamage: '',
            enemy: {},
            background: sceneImage,
        }
    },
    computed: {
        ...mapGetters([
            'ENEMY_STATE',
        ]),
    },
    methods: {
        ...mapActions([
            'OVERLAY_SHOW_ACT',
            'BATTLE_ACT',
            'ENEMY_UPDATE_ACT'
        ]),
    }
}
</script>

<style scoped>
.vasilisk-battle {
    width: 520px;
    right: 5px;
    bottom: -7px;
}
.varg-battle {
    right: 5px;
    bottom: 37px;
    width: 425px;
}
.modal-hero {
    position: absolute;
    left: 58px;
    top: 57px;
}
/* .modal-loc {
    display: block !important;
} */
.modal-enemy {
    position: absolute;
    z-index: 0;
}

.battle-block {
    height: 100%;
}

.vasilisk-battle {
    width: 520px;
    right: 5px;
    bottom: -7px;
}

.rat-battle {
    width: 333px;
    right: 11px;
    bottom: 44px;
}
.battle-options {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 25;
    text-align: center;
}
.battle-options_action {
    display: inline-block;
    margin: 0;
    padding: 3px 5px;
}
.battle-options_inner,
.modal-item {
    font-size: 18px;
    color: white;
    padding: 6px 12px;
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid white;
    -webkit-box-shadow: 0 0 5px 0 white;
    -moz-box-shadow: 0 0 5px 0 white;
    box-shadow: 0 0 5px 0 white;
    border-radius: 10px;
    margin: 10px;
    position: relative;
    z-index: 10;
}
.battle-options_flex {
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
    justify-content: center;
}
.battle-options_flex .battle-options_inner {
    width: 46%;
}
.battle-options_inner {
    margin-right: 5px;
    margin-left: 5px;
}
.battle-list {
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
.battle-list_title {
    font-size: 20px;
    color: burlywood;
}
.battle-list li {
    position: relative;
}
.battle-list li:not(:last-child)::after {
    content: "";
    position: absolute;
    right: -15px;
    top: 3px;
    width: 1px;
    height: 16px;
    background: white;
}
.battle-options_inner span {
    color: orange;
    display: inline;
    padding-left: 5px;
}
</style>