<template>
    <div
        class="modal modal-show modal-loc forest-loc"
        :style="{ backgroundImage: `url(${background})` }"
    >
        <div class="modal-inner">
            <div class="battle-block">
                <div class="modal-inner_item">
                    <div
                        class="overlay-battle overlay-battle_show"
                        v-if="battleResult.isShowResult"
                    >
                        <div class="battle-result">
                            <p>{{ battleResult.resultText }}</p>
                            <div class="btn-block">
                                <Button @click.native="closeScene">Уйти</Button>
                            </div>
                        </div>
                    </div>
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
                            <Button @click.native="battle">Атаковать</Button>
                            <Button @click.native="closeScene">Отступить</Button>
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
                                        <span>{{ heroHP }}</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="battle-options_inner">
                                <ul class="battle-list">
                                    <li>
                                        <p class="battle-list_title">{{ currentEnemy.name }}</p>
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
import senteza from "@/assets/img/gerhard.png";
import ork from "@/assets/img/orc.png";



// Vuex *
import { mapActions, mapGetters, } from 'vuex';
// Миксины *
import { findWithKey, dataResponse, updateDB } from '@/mixins/mixins';

export default {
    name: 'BattleScene',
    mixins: [findWithKey, dataResponse, updateDB],
    components: {
        Button,
        Hero
    },
    mounted() {
        this.dataResponse();
        this.heroData = this.gameData.hero;
        this.heroDamage = this.heroData.heroDamage + this.heroData.weaponDamage;
        this.heroHP = this.heroData.heroHP;
        this.enemy = this.gameData.enemy;
        this.currentEnemy = this.enemy[this.gameData.currentEnemy];
        if (this.ENEMY_STATE == false) {
            this.ENEMY_UPDATE_ACT(this.gameData.currentEnemy);
        }
    },
    data() {
        return {
            enemyImg: {
                rat,
                varg,
                vasilisk,
                senteza,
                ork
            },
            enemyClass: {
                rat: 'rat-battle',
                varg: 'varg-battle',
                vasilisk: 'vasilisk-battle',
                senteza: 'gerhard-battle',
                ork: 'orc-battle'
            },
            gameData: {},
            heroData: {},
            enemy: {},
            currentEnemy: {},
            heroDamage: '',
            heroHP: '',
            background: sceneImage,
            battleResult: {
                isHeroWinner: false,
                isShowResult: false,
                resultText: ''
            }
        }
    },
    computed: {
        ...mapGetters([
            'ENEMY_STATE',
            'GAME_DATA_STATE'
        ]),
    },
    methods: {
        ...mapActions([
            'OVERLAY_SHOW_ACT',
            'BATTLE_ACT',
            'OVERLAY_HIDE_ACT',
            'ENEMY_UPDATE_ACT',
            'HERO_HP_UPDATE_ACT',
            'HERO_GOLD_UPDATE_ACT',
            'FRIDRICKFARM_INNER_SHOW_ACT',
            'GAME_DATA_ACT'
        ]),
        critChance() {
            var rand = 1 - 0.5 + Math.random() * (100 - 1 + 1)
            rand = Math.round(rand);
            return rand;
        },
        closeScene() {
            this.gameData.gameFightScene = false;
            this.currentEnemy.hitPoint = 100;
            this.gameData.hero.heroHP = this.heroHP;

            this.updateDB();
            // var serialDataBase = JSON.stringify(this.gameData);
            // localStorage.setItem("gameData", serialDataBase);

            this.OVERLAY_HIDE_ACT();
            this.BATTLE_ACT();
            this.HERO_HP_UPDATE_ACT(this.heroHP);
        },
        battleActions(action, fightResult) {
            var res = fightResult;
            const actions = {
                isHollowAfterOrk: () => {
                    if (res == 'win') {
                        this.gameData.charactersNPC.hollow.dialogueLevel = 2;
                    }
                },
                paySenteza: () => {
                    if (res == 'win') {
                        this.gameData.hero.heroGold += 300;
                        this.HERO_GOLD_UPDATE_ACT(this.gameData.hero.heroGold);
                        this.battleResult.resultText = 'Ты навалял Сентезе и отжал кошелек (300 монет)';
                        this.gameData.charactersNPC.senteza.dialogueLevel = 5;
                        this.gameData.gameProgress.isSwowFarmInner = true;
                        this.FRIDRICKFARM_INNER_SHOW_ACT();
                    } else {
                        this.gameData.hero.heroGold = 0;
                        this.HERO_GOLD_UPDATE_ACT(0);
                        this.gameData.charactersNPC.senteza.dialogueLevel = 4;
                        this.battleResult.resultText = 'Сентеза навалял тебе, забрал все деньги и искупал в помойной яме'
                    }
                },
            }
            return actions[action]();
        },
        battle() {
            var heroDamage = this.heroDamage,
                enemyDamage = this.currentEnemy.damage,
                heroCritChance = this.critChance(),
                enemyCritChance = this.critChance(),
                actions = this.currentEnemy.action;
            // console.log(this.currentEnemy)

            if (heroCritChance <= this.heroData.heroCrit) {
                heroDamage *= 2;
            }
            if (enemyCritChance <= this.currentEnemy.crit) {
                enemyDamage *= 2;
            }

            // Вычитываем урон врагу *
            this.currentEnemy.hitPoint -= heroDamage;
            // Вычитываем урон герою *
            this.heroHP -= enemyDamage;

            if (this.heroHP <= 1) {
                this.heroHP = 1;
                this.battleResult.resultText = 'Поражение! Ты тяжело ранен и чудом сумел скрыться';
                this.battleResult.isShowResult = true;
                if (actions) {
                    this.battleActions(actions.typeAction, 'loose');
                }
            }

            if (this.currentEnemy.hitPoint <= 0) {
                this.currentEnemy.hitPoint = 1;
                this.battleResult.isHeroWinner = true;
                this.battleResult.resultText = 'Победа!';
                this.battleResult.isShowResult = true;

                var lootEnemy = this.currentEnemy.item;
                if (lootEnemy != undefined) {
                    var lootName = lootEnemy.nameItem;
                    var checkHeroLoot = this.findWithKey(this.heroData.inventory, 'nameItem', lootName);
                    if (checkHeroLoot != -1) {
                        this.heroData.inventory[checkHeroLoot].countItem += 1;
                    } else {
                        var clone = {};
                        for (var key in lootEnemy) {
                            clone[key] = lootEnemy[key];
                        }
                        this.heroData.inventory.push(clone);
                        this.gameData.hero.inventory = this.heroData.inventory;
                        console.log(this.heroData.inventory);
                    }
                    this.battleResult.resultText = `Победа! Добыча: ${lootName}`;
                }
                if (actions) {
                    this.battleActions(actions.typeAction, 'win');
                }
            }
            console.log(this.currentEnemy.hitPoint);
        }
    }
}
</script>

<style scoped>
.orc-battle {
    width: 370px;
    right: 30px;
    bottom: 20px;
}

.gerhard-battle {
    width: 205px;
    right: 30px;
    bottom: 45px;
}
.overlay-battle {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 50;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
    display: none;
}

.overlay-battle_show {
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    animation: fade 0.5s forwards ease-in-out;
}
.battle-result {
    font-size: 18px;
    padding: 5px 12px;
    border: 1px solid white;
    -webkit-box-shadow: 0 0 5px 0 white;
    -moz-box-shadow: 0 0 5px 0 white;
    box-shadow: 0 0 5px 0 white;
    border-radius: 10px;
    background: rgba(238, 210, 161, 0.9);
    text-align: center;
}

.battle-result .btn-block {
    justify-content: center;
}

.battle-result p {
    font-size: 18px;
    margin-bottom: 10px;
}

.battle-result b {
    font-weight: 600;
    color: brown;
    font-size: 20px;
}
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