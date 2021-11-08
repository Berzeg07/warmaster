<template>
    <div class="modal journal" v-if="isShowIntro">
        <p class="journal-title">Начало</p>
        <div class="begin-img begin-img_start">
            <img :src="image" />
        </div>
        <div class="start-article">
            <p>В голове мрак и сумятица, раскалывается затылок, последнее, что ты помнишь это горный перевал и неожиданный камнепад, дальше только тьма. Ты очнулся в кровати, кто то тебя вытащил из злополучного перевала, можно встать и осмотреться...</p>
        </div>
        <div class="button-box">
            <Button class="start-game" @click.native="btnClick">Далее</Button>
        </div>
    </div>
</template>

<script>
import Button from '@/components/Buttons/Button.vue';
import image from "@/assets/img/bg-main.jpg";
import { dataBase } from '@/database/database';
import { mapActions } from 'vuex'

export default {
    name: 'Introducion',
    components: {
        Button
    },
    data() {
        return {
            isShowIntro: true,
            image,
            gameData: {}
        };
    },
    mounted() {
        // Отключаем стораж **** 
        // localStorage.clear();
        // !!!!!!!!

        console.log(localStorage.getItem('gameData'));

        // Заносим в locale storage первичную структуру базы данных *
        if (localStorage.getItem('gameData') == null) {
            var serialDataBase = JSON.stringify(dataBase);
            localStorage.setItem("gameData", serialDataBase);
        }

        // Получаем данные *
        var gameDataResponse = JSON.parse(localStorage.getItem("gameData"));
        this.gameData = gameDataResponse;

        // Проверка на стартовый экран *
        if (gameDataResponse) {
            var checkIntro = gameDataResponse.gameSceneCurrent;
            if (checkIntro != 'intro') {
                this.OVERLAY_HIDE_ACT();
                this.isShowIntro = false;
            }
        }
    },
    methods: {
        ...mapActions([
            'OVERLAY_HIDE_ACT',
            'RUNOLV_SCENE_ACT',
            'MODAL_SHOW_ACT'
        ]),
        btnClick() {
            this.isShowIntro = false;
            this.RUNOLV_SCENE_ACT();
            this.MODAL_SHOW_ACT();
            // Переход на сцену с Магом, сохранение данных в базе *
            this.gameData.gameSceneCurrent = 'runolv';
            var serialDataBase = JSON.stringify(this.gameData);
            localStorage.setItem("gameData", serialDataBase);
            console.log(this.gameData);
        }
    }
}
</script>

<style scoped>
.journal {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 18px;
    width: 700px;
    padding: 10px 15px;
    transform: translate(-50%, -50%);
    z-index: 30;
    border: 1px solid white;
    -webkit-box-shadow: 0 0 5px 0 white;
    -moz-box-shadow: 0 0 5px 0 white;
    box-shadow: 0 0 5px 0 white;
    border-radius: 10px;
    background: rgba(242, 213, 170, 0.8);
    /* display: none; */
}

.start-article {
    padding-top: 10px;
}

.button-box {
    text-align: center;
    padding-top: 10px;
}

.journal-title {
    font-weight: 600;
    font-size: 22px;
    text-align: center;
    color: brown;
    margin-bottom: 15px;
    margin-top: 10px;
}
</style>