<template>
    <div class="modal modal-loc" :style="{ backgroundImage: `url(${sceneData})` }">
        <div class="modal-inner">
            <div class="message-window" v-if="messWindow">{{ messWindow }}</div>
            <div class="dialogue">
                <p class="dialogue_article">
                    <b v-if="npcName">{{ npcName + ':' + ' ' }}</b>
                    <span ref="npcComment">{{ npcComment }}</span>
                </p>
                <div class="btn-block btn-block_dialogue">
                    <ul class="link-list">
                        <!-- Комментарии игрока -->
                        <li
                            @click="heroCommentlistClick"
                            v-for="(item, index) in heroComments"
                            :key="item"
                            actiontype="counterIndex"
                            :counter="index"
                        >- {{ item }}</li>
                        <!-- Магазин -->
                        <li
                            @click="shopEvent"
                            v-for="item in shop"
                            :key="item.product"
                            :price="item.price"
                            :data-type="item.attr"
                        >- {{ item.product }} ({{ item.price }} монет)</li>
                        <!-- Действия игрока -->
                        <li
                            @click="heroCommentlistClick"
                            v-for="item in heroActions"
                            :key="item.text"
                            :level="item.level"
                            :actiontype="item.attr"
                            :enemy="item.enemy"
                            :dialogueLevelAfterClose="item.dialogueLevelAfterClose"
                            :event="item.event"
                        >- {{ item.text }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// Фоновые картинки *
import sceneImage from "@/assets/img/mage-loc.jpg";
import runolvEmptyHouse from "@/assets/img/mage_house-loc.jpg";
import horinisGuard from "@/assets/img/guard-loc.jpg";
import georgFarm from "@/assets/img/georg-loc.jpg";
import georgFarmWork from "@/assets/img/farm-loc.jpg";
import selina from "@/assets/img/tavern-loc.jpg";
import heroHouse from "@/assets/img/house-loc.jpg";
import andreas from "@/assets/img/andreas-loc.jpg";
import senteza from "@/assets/img/gerhard-loc.jpg";
import onar from "@/assets/img/fridrick-loc.jpg";
import nagur from "@/assets/img/nagur-loc.jpg";
import hollow from "@/assets/img/hollow-loc.jpg";

// Миксины *
import { findWithKey, questAddList, sceneRender } from '@/mixins/mixins';

// Vuex *
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'DialogueScene',
    mixins: [findWithKey, questAddList, sceneRender],

    data() {
        return {
            messWindow: '',
            gameSceneCurrent: '',
            currentCharacter: '',
            dialogueLevel: 0,
            sceneImage: '',
            npcName: '',
            npcComment: '',
            heroComments: [],
            answearsNPC: {},
            heroActions: [],
            shop: [],
            gameData: {},
            questAdd: {},
            gameProgressPoint: [],
            newDialogueBranches: '',
            sceneClasses: {
                hollow,
                nagur,
                onar,
                runolv: sceneImage,
                runolvEmptyHouse,
                horinisGuard,
                georgFarm,
                georgFarmWork,
                selina,
                heroHouse,
                andreas,
                senteza
            },
        }
    },
    mounted() {
        if (localStorage.getItem('gameData') != null) {
            // Получаем данные *
            var gameDataResponse = JSON.parse(localStorage.getItem("gameData"));
            // Записвыаем данные с сервера в data *
            this.gameData = gameDataResponse;
            // Текущая игровая сцена (объект персонажа в charactersNPC)*
            this.gameSceneCurrent = this.gameData.gameSceneCurrent;
            // Объект текущего персонажа сцены *
            this.currentCharacter = this.gameData.charactersNPC[this.gameSceneCurrent];
            // Раскидываем данные для вывода по переменным *
            this.updateData();
        }
    },
    computed: {
        ...mapGetters([
            'MODAL_SHOW_STATE',
            'HEROHOUSE_SHOW_STATE',
            'ANDREAS_TRAIN_STATE',
            'HOLLOW_SHOW_STATE'
        ]),
        sceneData() {
            // Фоновая картинки сцены * 
            return this.sceneClasses[this.sceneImage];
        },
    },
    methods: {
        ...mapActions([
            'OVERLAY_SHOW_ACT',
            'MODAL_SHOW_ACT',
            'OVERLAY_HIDE_ACT',
            'HORINIS_SHOW_ACT',
            'FRIDRICKFARM_SHOW_ACT',
            'HERO_HP_UPDATE_ACT',
            'HERO_GOLD_UPDATE_ACT',
            'HEROHOUSE_SHOW_ACT',
            'HERO_DAMAGE_UPDATE_ACT',
            'FRIDRICKFARM_INNER_SHOW_ACT',
            'BATTLE_ACT',
            'ENEMY_UPDATE_ACT',
            'ANDREAS_TRAIN_UPDATE_ACT',
            'BERNARD_SHOW_ACT',
            'HOLLOW_SHOW_ACT'
        ]),
        shopActions(action, event) {
            var price = event.currentTarget.getAttribute('price');
            var heroGold = this.gameData.hero.heroGold;
            const actions = {
                bernardMap: () => {
                    if (!this.HOLLOW_SHOW_STATE) {
                        this.HOLLOW_SHOW_ACT();
                        if (price <= heroGold) {
                            heroGold = heroGold - price;
                            this.gameData.hero.heroGold = heroGold;
                            this.gameData.charactersNPC.hollow.dialogueLevel = 1;
                            this.gameData.gameProgress.isShowHollow = true;
                            this.messWindow = `Карта куплена`
                            this.HERO_GOLD_UPDATE_ACT(heroGold);
                        } else {
                            this.messWindow = `Недостаточно золота для покупки`
                        }
                    } else {
                        this.messWindow = `Ты уже купил карту`
                    }
                },
                paySenteza: () => {
                    if (heroGold < 100) {
                        this.gameData.charactersNPC[this.gameSceneCurrent].dialogueLevel = 2;
                    } else {
                        this.gameData.charactersNPC[this.gameSceneCurrent].dialogueLevel = 3;
                        heroGold = heroGold - 100;
                        this.gameData.hero.heroGold = heroGold;
                        this.HERO_GOLD_UPDATE_ACT(heroGold);
                        this.gameData.gameProgress.isSwowFarmInner = true;
                        this.FRIDRICKFARM_INNER_SHOW_ACT();
                    }
                    this.updateData();
                },
                traning: () => {
                    var heroCurrentDamage = this.gameData.hero.heroDamage;
                    console.log('Андреас ', this.ANDREAS_TRAIN_STATE)
                    if (this.ANDREAS_TRAIN_STATE) {
                        if (heroCurrentDamage < 15) {
                            if (price <= heroGold) {
                                heroGold = heroGold - price;
                                heroCurrentDamage++;
                                this.gameData.hero.heroDamage = heroCurrentDamage;
                                this.gameData.hero.heroGold = heroGold;
                                this.messWindow = `Ты хорошо потренировался, сила увеличена на 1`
                                this.HERO_DAMAGE_UPDATE_ACT(heroCurrentDamage);
                                this.HERO_GOLD_UPDATE_ACT(heroGold);
                            } else {
                                this.messWindow = `Недостаточно золота для тренировок`
                            }
                        } else {
                            this.messWindow = `Ты уже достаточно силен, больше учиться нечему`
                        }
                    } else {
                        this.messWindow = `Андреас: я не тренерую всех подряд! Тебя я незнаю`
                    }
                },
                product: () => {
                    var heroHP = this.gameData.hero.heroHP;
                    if (heroHP < 100) {
                        if (price <= heroGold) {
                            heroGold = heroGold - price;
                            this.messWindow = `Ты хорошо пообедал (Восстановлено ${price} здоровья)`
                            this.gameData.hero.heroGold = heroGold;
                            heroHP = heroHP + Number(price);
                            if (heroHP > 100) {
                                heroHP = 100;
                            }
                            this.gameData.hero.heroHP = heroHP;
                            this.HERO_HP_UPDATE_ACT(heroHP);
                            this.HERO_GOLD_UPDATE_ACT(heroGold);
                        } else {
                            this.messWindow = `Недостаточно золота для покупки`
                        }
                    } else {
                        this.messWindow = `Ты не голоден (Здоровье полное)`
                    }
                },
                renta: () => {
                    if (!this.HEROHOUSE_SHOW_STATE) {
                        if (price <= heroGold) {
                            heroGold = heroGold - price;
                            this.gameData.hero.heroGold = heroGold;
                            this.gameData.gameProgress.isShowHeroHouse = true;
                            this.messWindow = 'Дом арендован можно въезжать'
                            this.HERO_GOLD_UPDATE_ACT(heroGold);
                            this.HEROHOUSE_SHOW_ACT();
                        } else {
                            this.messWindow = 'Не достаточно денег для аренды'
                        }
                    } else {
                        this.messWindow = 'Дом уже арендован'
                    }
                }
            }
            setTimeout(() => {
                this.messWindow = '';
            }, 2500);
            return actions[action]();
        },
        shopEvent(event) {
            var action = event.currentTarget.getAttribute('data-type');
            this.shopActions(action, event);
        },
        updateData() {
            // Текущая ветка диалога (индекс массива textContent в объекте персонажа) *
            this.dialogueLevel = this.currentCharacter.dialogueLevel;
            // Возможный квест в текущей диалоговой ветке *
            this.questAdd = this.currentCharacter.textContent[this.dialogueLevel].questAdd;
            // Флаги прогресса элементов геймплея *
            this.gameProgressPoint = this.currentCharacter.textContent[this.dialogueLevel].gameProgressPoint;
            // Ключ возможного развития диалоговых веток в других сценах (пример: 'entranceCity')*
            this.newDialogueBranches = this.currentCharacter.textContent[this.dialogueLevel].newDialogueBranches;
            // Имя персонажа NPC *
            this.npcName = this.currentCharacter.npcName;
            // Комментарий NPC *
            this.npcComment = this.currentCharacter.textContent[this.dialogueLevel].textNPC;
            // Комментарии игрока *
            this.heroComments = this.currentCharacter.textContent[this.dialogueLevel].heroComments;
            // Ответы NPC на вопросы игрока *
            this.answearsNPC = this.currentCharacter.textContent[this.dialogueLevel].answearsNPC;
            // Действия игрока *
            this.heroActions = this.currentCharacter.textContent[this.dialogueLevel].heroActions;
            // Магазин *
            this.shop = this.currentCharacter.textContent[this.dialogueLevel].shop;
            // Фоновая картинка *
            this.sceneImage = this.currentCharacter.sceneImage;
            // console.log('this.newDialogueBranches ', this.newDialogueBranches);
        },
        closeEvents(action) {
            const actions = {
                farmWorker: () => {
                    this.gameData.hero.heroGold += 100;
                    this.HERO_GOLD_UPDATE_ACT(this.gameData.hero.heroGold);
                }
            }
            return actions[action]();
        },
        closeScene(currentDialogueLevel) {
            if (currentDialogueLevel) {
                this.gameData.charactersNPC[this.gameSceneCurrent].dialogueLevel = currentDialogueLevel;
            }
            this.gameData.gameSceneCurrent = null;
            var serialDataBase = JSON.stringify(this.gameData);
            localStorage.setItem("gameData", serialDataBase);
            // console.log(currentDialogueLevel)
            this.OVERLAY_HIDE_ACT();
            this.MODAL_SHOW_ACT();
        },
        vuexActions(action) {
            const actions = {
                isShowHorinis: () => {
                    this.HORINIS_SHOW_ACT();
                },
                isShowFarm: () => {
                    this.FRIDRICKFARM_SHOW_ACT();
                },
                isSwowFarmInner: () => {
                    this.FRIDRICKFARM_INNER_SHOW_ACT();
                },
                isTrainAndreas: () => {
                    this.ANDREAS_TRAIN_UPDATE_ACT();
                },
                isShowBernard: () => {
                    this.BERNARD_SHOW_ACT();
                }
            }
            this.gameData.gameProgress[action] = true;
            return actions[action]();
        },
        heroActionEvent(action, event) {
            var checkLevel = event.currentTarget.getAttribute('level');
            const actions = {
                battle: (event) => {
                    var target = event.target.getAttribute('enemy');
                    this.gameData.currentEnemy = target;
                    this.gameData.gameFightScene = true;

                    this.closeScene();

                    this.$nextTick(() => {
                        this.OVERLAY_SHOW_ACT();
                        this.BATTLE_ACT();
                        this.ENEMY_UPDATE_ACT(target);
                    });
                },
                // Отдых дома *
                rest: () => {
                    var heroHP = this.gameData.hero.heroHP;
                    if (heroHP < 75) {
                        heroHP = 75;
                        this.gameData.hero.heroHP = heroHP;
                        this.messWindow = 'Ты хорошо отдохнул, часть здоровья восстановлено';
                        this.HERO_HP_UPDATE_ACT(heroHP);
                    } else {
                        this.messWindow = 'Ты хорошо отдохнул';
                    }
                },
                // Работа на Георга *
                workOnGeorgFarm: () => {
                    this.closeScene(3);
                    this.$nextTick(() => {
                        this.sceneRender('georgFarmWork', event);
                    });
                },
                // Вывод комментариев NPC в текущей ветке *
                counterIndex: (event) => {
                    var targetIndex = event.currentTarget.getAttribute('counter');
                    this.npcComment = this.answearsNPC[targetIndex];
                },
                // Переход на новую ветку *
                nextContent: () => {
                    if (checkLevel) {
                        this.gameData.charactersNPC[this.gameSceneCurrent].dialogueLevel = checkLevel;
                    } else {
                        this.gameData.charactersNPC[this.gameSceneCurrent].dialogueLevel++;
                    }
                    this.updateData();
                },
                // Возврат к предыдущей *
                prevContent: () => {
                    if (checkLevel) {
                        this.gameData.charactersNPC[this.gameSceneCurrent].dialogueLevel = checkLevel;
                    } else {
                        this.gameData.charactersNPC[this.gameSceneCurrent].dialogueLevel--;
                    }
                    this.updateData();
                },
                // Закрытие сцены *
                closeScene: (event) => {
                    var dialogueLevelAfterClose = event.currentTarget.getAttribute('dialogueLevelAfterClose');
                    var checkEvent = event.currentTarget.getAttribute('event');
                    if (checkEvent) {
                        this.closeEvents(checkEvent);
                    }
                    // Если требуется при следующем запуске сцены открыть нужную диалоговую ветку *
                    if (dialogueLevelAfterClose) {
                        this.closeScene(dialogueLevelAfterClose);
                        return;
                    }
                    // Иначе, сцена всегда стартует с первой диалоговой ветки *
                    this.closeScene(0);
                }
            }
            setTimeout(() => {
                this.messWindow = '';
            }, 2500);
            return actions[action](event);
        },
        heroCommentlistClick(event) {
            // Вывод новых диалоговых веток для других сцен по клику на элемент текущей ветки, если такое имеется *
            if (this.newDialogueBranches != undefined) {
                // Объект новой диалоговой ветки *
                var currentNewBranch = this.gameData.newDialogueComments[this.gameSceneCurrent][this.newDialogueBranches];
                var addDataBase = () => {
                    this.gameData.newDialogueComments[this.gameSceneCurrent][this.newDialogueBranches].isAddDataBase = true;
                }
                // Если нет записи в базе *
                if (currentNewBranch.isAddDataBase != true) {
                    // Куда будет добавлена ветка *
                    var targetForBranch = currentNewBranch.targetForThisBranch;
                    // Уровень вложенности ветки *
                    var targetDialogueLevel = currentNewBranch.dialogueLevel;
                    // Если есть комментарий игрока *
                    if (currentNewBranch.textContent.heroComments != undefined) {
                        // Целевой объект (комментарии игрока)
                        var targetObject = this.gameData.charactersNPC[targetForBranch].textContent[targetDialogueLevel].heroComments;
                        // Объединяем данные *
                        var newArr = [...targetObject, ...currentNewBranch.textContent.heroComments];
                        // Запись в главный объект *
                        this.gameData.charactersNPC[targetForBranch].textContent[targetDialogueLevel].heroComments = newArr;
                        addDataBase();
                    }
                    // Если есть action *
                    if (currentNewBranch.textContent.heroActions != undefined) {
                        for (var i = 0; i < currentNewBranch.textContent.heroActions.length; i++) {
                            this.gameData.charactersNPC[targetForBranch].textContent[targetDialogueLevel].heroActions.unshift(currentNewBranch.textContent.heroActions[i]);
                        }
                        addDataBase();
                    }
                }
            }
            // Если есть квест в текущей ветке *
            if (this.questAdd != undefined) {
                var currentQuestList = this.gameData.hero.questList;
                var checkQuestList = this.findWithKey(currentQuestList, 'questTitle', this.questAdd.questTitle);
                this.questAddList(checkQuestList, currentQuestList, this.questAdd);
            }
            // Если есть флаг прогресса *
            if (this.gameProgressPoint != undefined) {
                for (var point = 0; point < this.gameProgressPoint.length; point++) {
                    var item = this.gameProgressPoint[point];
                    console.log(item);
                    if (this.gameData.gameProgress[item] != true) {
                        this.gameData.gameProgress[item] = true;
                        this.vuexActions(item);
                    }
                }
            }
            // Атрибут элемента по которому произошел клик *
            var target = event.currentTarget.getAttribute('actiontype');
            this.heroActionEvent(target, event)
        }
    }
}
</script>

<style scoped>
/* .modal-loc {
    width: 900px;
    height: 600px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid white;
    -webkit-box-shadow: 0 0 5px 0 white;
    -moz-box-shadow: 0 0 5px 0 white;
    box-shadow: 0 0 5px 0 white;
    border-radius: 10px;
    z-index: 20;
    display: none;
    overflow: hidden;
} */

.btn-block {
    border-top: 1px solid white;
    padding: 10px 0 5px;
    margin-top: 10px;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    position: relative;
}

.modal-inner {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.link-list li {
    cursor: pointer;
    /* transition: 0.3s; */
}

.link-list li:hover {
    color: brown;
}
.modal {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.modal.mage-loc_empty {
    /* background: url("../img/mage_house-loc.jpg") no-repeat center; */
    background-size: cover;
}
.dialogue,
.message-window {
    position: absolute;
    font-size: 18px;
    padding: 10px 15px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 30;
    border: 1px solid white;
    box-shadow: 0 0 5px 0 white;
    border-radius: 10px;
    background: rgba(238, 210, 161, 0.9);
}

.dialogue {
    width: 80%;
    bottom: 18px;
}

.message-window {
    top: 18px;
}

.dialogue b {
    color: brown;
    font-size: 20px;
}
</style>