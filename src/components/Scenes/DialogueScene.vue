<template>
    <div class="modal modal-loc" :style="{ backgroundImage: `url(${sceneData})` }">
        <div class="modal-inner">
            <div class="dialogue">
                <p class="dialogue_article" id="dialogue">
                    <b v-if="npcName != ''">{{ npcName + ':' + ' ' }}</b>
                    <span>{{ npcComment }}</span>
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
                        <!-- Действия игрока -->
                        <li
                            @click="heroCommentlistClick"
                            v-for="item in heroActions"
                            :key="item.text"
                            :actiontype="item.attr"
                            :dialogueLevelAfterClose="item.dialogueLevelAfterClose"
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

// Миксины *
import { findWithKey, questAddList, sceneRender } from '@/mixins/mixins';

// Vuex *
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'DialogueScene',
    mixins: [findWithKey, questAddList, sceneRender],

    data() {
        return {
            gameSceneCurrent: '',
            currentCharacter: '',
            dialogueLevel: 0,
            sceneImage: '',
            npcName: '',
            npcComment: '',
            heroComments: [],
            answearsNPC: {},
            heroActions: [],
            gameData: {},
            questAdd: {},
            newDialogueBranches: '',
            sceneClasses: {
                runolv: sceneImage,
                runolvEmptyHouse,
                horinisGuard,
                georgFarm,
                georgFarmWork
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
            'MODAL_SHOW_STATE'
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
            'OVERLAY_HIDE_ACT'
        ]),
        updateData() {
            // Текущая ветка диалога (индекс массива textContent в объекте персонажа) *
            this.dialogueLevel = this.currentCharacter.dialogueLevel;
            // Возможный квест в текущей диалоговой ветке *
            this.questAdd = this.currentCharacter.textContent[this.dialogueLevel].questAdd;
            // Возможное развитие диалоговых веток в других сценах *
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
            // Фоновая картинка *
            this.sceneImage = this.currentCharacter.sceneImage;
            console.log('this.newDialogueBranches ', this.newDialogueBranches);
        },
        closeScene(currentDialogueLevel) {
            this.gameData.charactersNPC[this.gameSceneCurrent].dialogueLevel = currentDialogueLevel;
            this.gameData.gameSceneCurrent = null;
            var serialDataBase = JSON.stringify(this.gameData);
            localStorage.setItem("gameData", serialDataBase);
            this.OVERLAY_HIDE_ACT();
            this.MODAL_SHOW_ACT();
        },
        heroActionEvent(action, event) {
            const actions = {
                workOnGeorgFarm: () => {
                    this.closeScene(3);
                    this.$nextTick(() => {
                        this.sceneRender('georgFarmWork');
                    });
                },
                counterIndex: (event) => {
                    var targetIndex = event.currentTarget.getAttribute('counter');
                    this.npcComment = this.answearsNPC[targetIndex];
                },
                nextContent: () => {
                    this.gameData.charactersNPC[this.gameSceneCurrent].dialogueLevel++;
                    this.updateData();
                },
                prevContent: () => {
                    this.gameData.charactersNPC[this.gameSceneCurrent].dialogueLevel--;
                    this.updateData();
                },
                closeScene: (event) => {
                    var dialogueLevelAfterClose = event.currentTarget.getAttribute('dialogueLevelAfterClose');
                    if (dialogueLevelAfterClose) {
                        this.closeScene(dialogueLevelAfterClose);
                        return;
                    }
                    this.closeScene(0);
                }
            }
            return actions[action](event);
        },
        heroCommentlistClick(event) {
            if (this.newDialogueBranches != undefined) {
                var currentNewBranch = this.gameData.newDialogueComments[this.gameSceneCurrent][this.newDialogueBranches];
                console.log(currentNewBranch);
                if (currentNewBranch.isAddDataBase != true) {
                    var targetForBranch = currentNewBranch.targetForThisBranch;
                    var targetDialogueLevel = currentNewBranch.dialogueLevel;
                    var targetObject = this.gameData.charactersNPC[targetForBranch].textContent[targetDialogueLevel].heroComments;
                    if (currentNewBranch.textContent.heroComments != undefined) {
                        var newArr = [...targetObject, ...currentNewBranch.textContent.heroComments];
                        console.log('arr ', newArr);
                        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        // есть контакт доработать !!!!! +===============================!!!!!!!!!!
                    }

                    console.log(targetObject.textNPC);
                }
            }
            if (this.questAdd != undefined) {
                var currentQuestList = this.gameData.hero.questList;
                var checkQuestList = this.findWithKey(currentQuestList, 'questTitle', this.questAdd.questTitle);
                this.questAddList(checkQuestList, currentQuestList, this.questAdd);
            }
            var target = event.currentTarget.getAttribute('actiontype');
            this.heroActionEvent(target, event)
        }
    }
}
</script>

<style scoped>
.modal-loc {
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
}

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
.dialogue {
    position: absolute;
    bottom: 18px;
    font-size: 18px;
    width: 80%;
    padding: 10px 15px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 30;
    border: 1px solid white;
    -webkit-box-shadow: 0 0 5px 0 white;
    -moz-box-shadow: 0 0 5px 0 white;
    box-shadow: 0 0 5px 0 white;
    border-radius: 10px;
    background: rgba(238, 210, 161, 0.9);
}

.dialogue b {
    color: brown;
    font-size: 20px;
}
</style>