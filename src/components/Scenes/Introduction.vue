<template>
    <div class="modal journal">
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
import { mapActions } from 'vuex'

export default {
    name: 'Introducion',
    components: {
        Button
    },
    data() {
        return {
            image,
            gameData: {}
        };
    },
    mounted() {
        // Получаем данные с сервера *
        var gameDataResponse = JSON.parse(localStorage.getItem("gameData"));
        this.gameData = gameDataResponse;
    },
    methods: {
        ...mapActions([
            // 'RUNOLV_SCENE_ACT',
            'MODAL_SHOW_ACT'
        ]),
        btnClick() {
            // Переход на сцену с Магом, сохранение данных в базе *
            // this.RUNOLV_SCENE_ACT();
            this.MODAL_SHOW_ACT();
            this.gameData.gameSceneCurrent = 'runolv';
            var serialDataBase = JSON.stringify(this.gameData);
            localStorage.setItem("gameData", serialDataBase);

            // Передача родителю события на закрытие вступительного окна *
            this.$emit('hideIntro', {
                intro: false
            });
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