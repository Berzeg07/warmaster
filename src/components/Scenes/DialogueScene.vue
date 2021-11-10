<template>
    <div class="modal modal-loc" :style="{ backgroundImage: `url(${sceneData})` }">
        <div class="modal-inner">
            <div class="dialogue">
                <p class="dialogue_article" id="dialogue">
                    <b>{{ npcName + ':' + ' ' }}</b>
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
// Vuex *
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'DialogueScene',
    data() {
        return {
            gameSceneCurrent: '',
            currentCharacter: '',
            dialogueLevel: 0,
            npcName: '',
            npcComment: '',
            heroComments: [],
            answearsNPC: {},
            heroActions: [],
            gameData: {},
            sceneClasses: {
                runolv: sceneImage
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
            // 'RUNOLV_SCENE_STATE',
            'MODAL_SHOW_STATE'
        ]),
        sceneData() {
            // Фоновая картинки сцены * 
            return this.sceneClasses[this.gameSceneCurrent];
        },
    },
    methods: {
        ...mapActions([
            // 'RUNOLV_SCENE_ACT',
            'MODAL_SHOW_ACT',
            'OVERLAY_HIDE_ACT'
        ]),
        updateData() {
            // Текущая ветка диалога (индекс массива textContent в объекте персонажа) *
            this.dialogueLevel = this.currentCharacter.dialogueLevel;
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
        },
        heroCommentlistClick(e) {
            var target = e.currentTarget.getAttribute('actiontype');
            var targetIndex = e.currentTarget.getAttribute('counter');
            // Клик по комментариям игрока *
            if (target == 'counterIndex') {
                this.npcComment = this.answearsNPC[targetIndex];
            }
            // Переход на следующую диалоговую ветку *
            if (target == 'nextContent') {
                this.gameData.charactersNPC[this.gameSceneCurrent].dialogueLevel++;
                this.updateData();
            }
            // Возврат в предыдущую диалоговую ветку *
            if (target == 'prevContent') {
                this.gameData.charactersNPC[this.gameSceneCurrent].dialogueLevel--;
                this.updateData();
            }
            // Закрыть сцену *
            if (target == 'closeScene') {
                this.gameData.gameSceneCurrent = null;
                this.OVERLAY_HIDE_ACT();
                this.MODAL_SHOW_ACT();
                var serialDataBase = JSON.stringify(this.gameData);
                localStorage.setItem("gameData", serialDataBase);
            }
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