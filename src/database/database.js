export var dataBase = {
    gameSceneCurrent: 'intro',
    gameFightScene: false,
    charactersNPC: {
        runolv: {
            npcName: 'Рунольв',
            dialogueLevel: 0,
            textContent: [
                {
                    textNPC: 'Ты спал два дня, я смог вытащить тебя из под завала, камнями завалило половину перевала. Ты получил сильный удар по голове, но нам повезло. Как ты себя чувствуешь?',
                    heroComments: ['Голова гудит, в целом не плохо, кто ты?', 'Как ты спас меня?', 'Я не помню куда шел, что это за место?', 'Мои вещи целы? У меня было оружие и походный мешок'],
                    heroActions: [
                        {
                            text: 'Как быть дальше?',
                            attr: 'nextContent'
                        }
                    ],
                    answearsNPC: {
                        0: 'я маг круга огня, наш монастырь выше в горах, не далеко от того перевала где ты проходил. Узкий проход между двумя скалами завалил камнепад, теперь я отрезан от свой обители. Мастера наверняка уже готовят ритуал, чтобы расчистить завал, но нужно быть осторожным, чтобы не вызвать повторный обвал камней, подготовка займет не одну неделю, пока я буду здесь',
                        1: 'я собирал в тех местах особую траву. Когда услышал грохот, то бежал со всех ног, камнепад не редкое явление в этих горах. Когда шум прекратился, я пошел посмотреть на последствия и обнаружил тебя, ты получил сильный удар по голове и чудом избежал погребения',
                        2: 'полуостров Хейдмарк, долина портового города Хэртланд. В моем доме ты можешь оставаться сколько тебе угодно',
                        3: 'я ничего не нашел возле тебя, вероятно ты бросил все, чтобы суметь уйти от комнепада и скажу тебе это удалось'
                    }
                }, {
                    textNPC: 'ты можешь остаться здесь или осмотреться в городе, будь осторожнее, в лесу водятся опасные твари. Не могу оставить тебя с пустыми руками, можешь взять кошелек на столе, там 100 монет, хватит на первое время',
                    heroActions: [
                        {
                            text: 'Назад',
                            attr: 'prevContent'
                        },
                        {
                            text: 'Уйти',
                            attr: 'closeScene'
                        }
                    ],
                },
            ]
        }
    },
    hero: {
        heroName: 'Герой',
        heroDamage: 10,
        heroArmor: 0,
        heroCrit: 20,
        heroHP: 100,
        heroGold: 1000,
        heroWeapon: 'Пусто',
        heroEquip: 'Пусто',
        inventory: [{}],
        questList: [{
            questTitle: 'Начало',
            questArticle: ['Добрый маг привел меня в чувство и дал не много денег. Нужно добраться до города и осмотреться, может подвернеться какое ни будь дельце']
        }]
    }
}