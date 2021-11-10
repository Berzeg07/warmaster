<template>
    <div class="modal modalshow journal">
        <p class="journal-title">Журнал</p>
        <CloseModal />
        <div class="journal-item">
            <div class="quest-box" v-for="item in gameData" :key="item.questTitle">
                <p class="quest-title">{{ item.questTitle }}</p>
                <ul class="journal-list">
                    <li v-for="itemList in item.questArticle" :key="itemList">- {{ itemList }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
// Кнопка закрытия окна *
import CloseModal from '@/components/Buttons/CloseModal.vue';

export default {
    name: 'QuestList',
    data() {
        return {
            upHere: false,
            gameData: {}
        }
    },
    components: {
        CloseModal
    },
    mounted() {
        if (localStorage.getItem('gameData') != null) {
            // Получаем данные *
            var gameDataResponse = JSON.parse(localStorage.getItem("gameData"));
            this.gameData = gameDataResponse.hero.questList;
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
    display: none;
}

.journal-item {
    margin-bottom: 15px;
}

.journal-title {
    font-weight: 600;
    font-size: 22px;
    text-align: center;
    color: brown;
    margin-bottom: 15px;
    margin-top: 10px;
}
.quest-title {
    font-weight: 600;
    padding-bottom: 5px;
    font-size: 20px;
}

.quest-box {
    margin-bottom: 17px;
}
</style>