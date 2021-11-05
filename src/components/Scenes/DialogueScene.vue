<template>
    <div
        class="modal modal-loc"
        v-if="MODAL_SHOW_STATE"
        :class="checkModalState"
        :style="{ backgroundImage: `url(${sceneClassAdd()})` }"
    >
        <div class="modal-inner">
            <div class="dialogue">
                <p class="dialogue_article" id="dialogue">
                    <b>{{ startText[0].npcName }}:</b>
                    {{ startText[0].textNPC }}
                </p>
                <div class="btn-block btn-block_dialogue">
                    <ul class="link-list" id="link_list">
                        <!-- Пункты диалога -->
                        <li v-for="item in startText[0].action" :key="item.message">- {{ item }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// Фоновые картинки *
import sceneImage from "@/assets/img/mage-loc.jpg";

import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'DialogueScene',
    data() {
        return {
            modalShow: 'modalshow',
            // sceneImage,
            sceneClasses: {
                runolvIntro: sceneImage
            },
            startText: [],
            textContent: {
                textObjRunolv: [{
                    npcName: 'Рунольв',
                    textNPC: 'Ты спал два дня, я смог вытащить тебя из под завала, камнями завалило половину перевала. Ты получил сильный удар по голове, но нам повезло. Как ты себя чувствуешь?',
                    action: ['Голова гудит, в целом не плохо, кто ты?', 'Как ты спас меня?', 'Я не помню куда шел, что это за место?', 'Мои вещи целы? У меня было оружие и походный мешок', 'Как быть дальше?'],
                    answearsNPC: {
                        0: 'я маг круга огня, наш монастырь выше в горах, не далеко от того перевала где ты проходил. Узкий проход между двумя скалами завалил камнепад, теперь я отрезан от свой обители. Мастера наверняка уже готовят ритуал, чтобы расчистить завал, но нужно быть осторожным, чтобы не вызвать повторный обвал камней, подготовка займет не одну неделю, пока я буду здесь',
                        1: 'я собирал в тех местах особую траву. Когда услышал грохот, то бежал со всех ног, камнепад не редкое явление в этих горах. Когда шум прекратился, я пошел посмотреть на последствия и обнаружил тебя, ты получил сильный удар по голове и чудом избежал погребения',
                        2: 'полуостров Хейдмарк, долина портового города Хэртланд. В моем доме ты можешь оставаться сколько тебе угодно',
                        3: 'я ничего не нашел возле тебя, вероятно ты бросил все, чтобы суметь уйти от комнепада и скажу тебе это удалось'
                    }
                }, {
                    textNPC: 'ты можешь остаться здесь или осмотреться в городе, будь осторожнее, в лесу водятся опасные твари. Не могу оставить тебя с пустыми руками, можешь взять кошелек на столе, там 100 монет, хватит на первое время',
                    action: ['Назад', 'Уйти']
                }],
            }
        }
    },

    computed: {
        ...mapGetters([
            'RUNOLV_SCENE_STATE'
        ]),
        ...mapGetters([
            'MODAL_SHOW_STATE'
        ]),

        checkModalState() {
            return this.MODAL_SHOW_STATE == true ? this.modalShow : '';
        },
    },
    methods: {
        ...mapActions([
            'RUNOLV_SCENE_ACT'
        ]),
        sceneClassAdd() {
            if (this.RUNOLV_SCENE_STATE) {
                this.startText = this.textContent.textObjRunolv;
                return this.sceneClasses.runolvIntro;
            }
        },
        // showStartingText() {
        //     if (this.RUNOLV_SCENE_STATE) {
        //         return this.textContent.textObjRunolv;
        //     }
        // }
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