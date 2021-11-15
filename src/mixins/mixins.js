// Возвращает индекс объекта в массиве по заданному ключу и значению *
export const findWithKey = {
    methods: {
        findWithKey(array, key, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] === value) {
                    return i;
                }
            }
            return -1;
        }
    }
}

// Вывод сцены *
export const sceneRender = {
    methods: {
        sceneRender(gameSceneNew) {
            if (localStorage.getItem('gameData') != null) {
                var gameDataResponse = JSON.parse(localStorage.getItem("gameData"));
                gameDataResponse.gameSceneCurrent = gameSceneNew;
                var serialDataBase = JSON.stringify(gameDataResponse);
                localStorage.setItem("gameData", serialDataBase);
                this.OVERLAY_SHOW_ACT();
                this.MODAL_SHOW_ACT();
                return gameDataResponse;
            } else {
                console.log('Ошибка в базе данных');
                return false;
            }
        }
    }
}

// Добавляет новый квест в журнал игрока *
export const questAddList = {
    methods: {
        questAddList(objectIndex, currentQuestList, {
            questTitle,
            questArticle
        }) {
            var gameDataResponse = JSON.parse(localStorage.getItem("gameData"));
            function addDataBase() {
                gameDataResponse.hero.questList = currentQuestList;
                localStorage.setItem("gameData", JSON.stringify(gameDataResponse));
            }
            if (gameDataResponse != null) {
                // Если такой квест есть, добавляем новый пункт в линейку прогресса *
                if (objectIndex != -1) {
                    //Проверка описания квеста, исключение дублирования *
                    var articleCheck = currentQuestList[objectIndex].questArticle.indexOf(questArticle);
                    if (articleCheck == -1) {
                        currentQuestList[objectIndex].questArticle.push(questArticle);
                        addDataBase();
                    }
                    return;
                } else {
                    // Если такого квеста нет, формируем новый заголовок и описание *
                    var questObj = [{}]
                    questObj[0].questTitle = questTitle;
                    questObj[0].questArticle = [questArticle];
                    currentQuestList.push(questObj[0]);
                    addDataBase();
                }
            } else {
                return;
            }
        }
    }
}
