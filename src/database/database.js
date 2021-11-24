export var dataBase = {
    gameSceneCurrent: 'intro',
    gameFightScene: false,
    currentEnemy: false,
    shopShow: false,
    gameProgress: {
        isShowHorinis: true,
        isShowFarm: false,
        isSwowFarmInner: false,
        isShowHeroHouse: true,
        // Не забыть активировать Андреаса в разговоре с Фридриком !!!!!!!
        isTrainAndreas: true
    },
    newDialogueComments: {
        georgFarm: {
            entranceCity: {
                isAddDataBase: false,
                dialogueLevel: 0,
                targetForThisBranch: 'horinisGuard',
                textContent: {
                    // heroComments: ['У меня есть пропуск'],
                    heroActions: [
                        {
                            text: 'У меня есть пропуск',
                            attr: 'nextContent'
                        }
                    ],
                    // answearsNPC: {}
                }
            }
        }
    },
    shop: [
        {
            nameItem: 'Кожаная броня',
            typeItem: 'Броня',
            priceItem: '200',
            propertiesItem: 5,
            classItem: 'leatherarmor'
        },

        {
            nameItem: 'Пластинчатый доспех',
            typeItem: 'Броня',
            priceItem: '600',
            propertiesItem: 10,
            classItem: 'heavy-armor'
        },


        {
            nameItem: 'Дубинка',
            typeItem: 'Урон',
            priceItem: '130',
            propertiesItem: 5,
            classItem: 'club'
        },

        {
            nameItem: 'Полуторный меч',
            typeItem: 'Урон',
            priceItem: '250',
            propertiesItem: 10,
            classItem: 'sword'
        },

        {
            nameItem: 'Сокрушитель',
            typeItem: 'Урон',
            priceItem: '500',
            propertiesItem: 15,
            classItem: 'axe'
        },
        {
            nameItem: 'Меч Беллиара',
            typeItem: 'Урон',
            priceItem: '1000',
            propertiesItem: 30,
            classItem: 'destroyer'
        },
        {
            nameItem: 'Панцирь Дракона',
            typeItem: 'Броня',
            priceItem: '1000',
            propertiesItem: 15,
            classItem: 'dragonarmor'
        }
    ],
    enemy: {
        // Болотная крыса *
        rat: {
            name: 'Крыса',
            damage: 12,
            armor: 0,
            crit: 10,
            hitPoint: 100,
            item: {
                nameItem: 'Хвост крысы',
                typeItem: 'Предмет',
                priceItem: 80,
                propertiesItem: 'Для продажи',
                countItem: 1
            },
            image: '<div class="modal-enemy rat-battle" key="rat"><img src="img/rat.png" alt="Болотная крыса"></div>'
        },
        // Варг *
        varg: {
            name: 'Варг',
            damage: 30,
            armor: 0,
            crit: 10,
            hitPoint: 100,
            item: {
                nameItem: 'Шкура варга',
                typeItem: 'Предмет',
                priceItem: 100,
                propertiesItem: 'Для продажи',
                countItem: 1
            },
            image: '<div class="modal-enemy varg-battle" key="varg"><img src="img/varg.png" alt="Варг"></div>'
        },
        // Василиск *
        vasilisk: {
            name: 'Василиск',
            damage: 40,
            armor: 0,
            crit: 10,
            hitPoint: 100,
            item: {
                nameItem: 'Рог мракориса',
                typeItem: 'Предмет',
                priceItem: 150,
                propertiesItem: 'Для продажи',
                countItem: 1
            },
            image: '<div class="modal-enemy vasilisk-battle" key="vasilisk"><img src="img/vasilisk.png" alt="Василиск"></div>'
        },
        // Орк *
        ork: {
            name: 'Орк',
            damage: 45,
            armor: 5,
            crit: 20,
            hitPoint: 100,
            image: '<div class="modal-enemy orc-battle" key="ork"><img src="img/orc.png" alt="Орк"></div>'
        }
    },
    hero: {
        heroName: 'Герой',
        heroDamage: 10,
        weaponDamage: 0,
        heroArmor: 0,
        // equipArmor: 0,
        heroCrit: 20,
        heroHP: 100,
        heroGold: 1000,
        heroWeapon: 'Пусто',
        heroEquip: 'Пусто',
        inventory: [
            // {
            //     nameItem: 'Меч Беллиара',
            //     typeItem: 'Урон',
            //     priceItem: '1000',
            //     propertiesItem: 30,
            //     classItem: 'destroyer',
            //     countItem: 2
            // },
            // {
            //     nameItem: 'Сокрушитель',
            //     typeItem: 'Урон',
            //     priceItem: '1000',
            //     propertiesItem: 25,
            //     classItem: 'axe',
            //     countItem: 2
            // },
            // {
            //     nameItem: 'Кожаная броня',
            //     typeItem: 'Броня',
            //     priceItem: '1000',
            //     propertiesItem: 5,
            //     classItem: 'leatherarmor',
            //     countItem: 2
            // },
            // {
            //     nameItem: 'Панцирь Дракона',
            //     typeItem: 'Броня',
            //     priceItem: '1000',
            //     propertiesItem: 15,
            //     classItem: 'dragonarmor',
            //     countItem: 2
            // },
            // {
            //     nameItem: 'Шкура варга',
            //     typeItem: 'Предмет',
            //     priceItem: 150,
            //     propertiesItem: 'Для продажи',
            //     countItem: 2
            // },
            // {
            //     nameItem: 'Рог мракориса',
            //     typeItem: 'Предмет',
            //     priceItem: 150,
            //     propertiesItem: 'Для продажи',
            //     countItem: 10
            // },
            // {
            //     nameItem: 'Хвост крысы',
            //     typeItem: 'Предмет',
            //     priceItem: 150,
            //     propertiesItem: 'Для продажи',
            //     countItem: 3
            // }
        ],
        questList: [{
            questTitle: 'Начало',
            questArticle: ['Добрый маг привел меня в чувство и дал не много денег. Нужно добраться до города и осмотреться, может подвернеться какое ни будь дельце']
        }]
    },
    charactersNPC: {
        andreas: {
            npcName: 'Андреас',
            dialogueLevel: 0,
            sceneImage: 'andreas',
            textContent: [
                {
                    textNPC: 'Говори по делу',
                    heroComments: [],
                    shop: [
                        {
                            product: 'Тренироваться',
                            price: 200,
                            attr: 'traning'
                        }
                    ],
                    heroActions: [
                        {
                            text: 'Говорить',
                            attr: 'nextContent'
                        },
                        {
                            text: 'Уйти',
                            attr: 'closeScene',
                        },
                    ]
                },
                {
                    textNPC: 'Говори по делу',
                    heroComments: ['Чем ты занимаешься?', 'Чему ты можешь научить?', 'Какое примущество у критического удара?', 'Ты состоишь в обороне города?'],
                    answearsNPC: {
                        0: 'Жду торговое судно, чтобы свалить из этого гиблого места',
                        1: 'Я учу бить сильно и наверняка, после моих занятий твои удары станут сильнее',
                        2: 'Критический удар увеличит твою атаку вдвое, но и враги имеют эту особенность, тут уж как повезет',
                        3: 'Оно мне надо? я выжил в стольких битвах, что могу тебе точно сказать, город обречен. Оружия не хватает, продовольствия мало, людей мало, а половина из тех кто есть впервые взяли в руки оружие. Безрассудная смерть не в моих планах, скоро я покину это место погибели',
                        4: 'Чтобы стать гражданином ты должен себя в чем то проявить, показать, что способен принести городу пользу. Сгодится и охотничье дело, я поручусь за тебя, если добудешь мне три хвоста болотной крысы и две шкуры варга'
                    },
                    heroActions: [
                        {
                            text: 'Назад',
                            attr: 'prevContent'
                        },
                        {
                            text: 'Уйти',
                            attr: 'closeScene',
                        },
                    ]
                }
            ]
        },
        heroHouse: {
            dialogueLevel: 0,
            sceneImage: 'heroHouse',
            textContent: [
                {
                    textNPC: 'Дом, милый дом (отдых восстанавливает до 75% здоровья)',
                    heroComments: [],
                    heroActions: [
                        {
                            text: 'Отдыхать',
                            attr: 'rest'
                        },
                        {
                            text: 'Уйти',
                            attr: 'closeScene',
                        },
                    ]
                }
            ]
        },
        selina: {
            npcName: 'Селина',
            dialogueLevel: 0,
            sceneImage: 'selina',
            textContent: [
                {
                    textNPC: 'Добро пожаловать в таверну Олений рог :)',
                    heroComments: [],
                    heroActions: [
                        {
                            text: 'Говорить',
                            attr: 'nextContent'
                        },
                        {
                            text: 'Подкрепиться',
                            attr: 'nextContent',
                            level: 3
                        },
                        {
                            text: 'Аренда дома',
                            attr: 'nextContent',
                            level: 4
                        },
                        {
                            text: 'Уйти',
                            attr: 'closeScene'
                        }
                    ],
                },
                {
                    textNPC: 'Что тебя интересует?',
                    heroComments: ['Как обстановка в городе?', 'Что находится на востоке?', 'Что в южной стороне?'],
                    heroActions: [
                        {
                            text: 'Какие слухи в последнее время?',
                            attr: 'nextContent'
                        },
                        {
                            text: 'Назад',
                            attr: 'prevContent'
                        },
                    ],
                    answearsNPC: {
                        0: 'Тревожных слухов о надвигающейся войне с орками все больше, кто имел возможность уехать уже уплыли на континент, оставшиеся поступают в ополчение и готовятся оборонять город. Тут все, что у нас есть, мы будем защищать город до последнего',
                        1: 'Ферма Фридрика, самый крупный землевладелец в долине. Он нанял армию наемников и перестал платить городу налоги. В предверии нашествия орков, город не может позволить себе гражданскую войну и мы зависим от продовольственных поставок Фридрика',
                        2: 'Туманная лощина, смертельные топи, жуткие твари, даже не думай ходить в те месте, если не знаешь где именно ходить, из трясины не выбраться',
                    }
                },
                {
                    textNPC: 'На ферме Фридрика пропал его главный помощник. Важная персона, который вел все дела с городом. Фридрик назначил вознаграждение каждому кто поможет в поисках',
                    heroComments: ['Как насчет охраны на ферме, пускают ли туда чужаков?', 'Что еще мне нужно знать о Фридрике?'],
                    heroActions: [
                        {
                            text: 'Назад',
                            attr: 'prevContent'
                        },
                        {
                            text: 'Уйти',
                            attr: 'closeScene'
                        },
                    ],
                    answearsNPC: {
                        0: 'Наемники особо ни с кем не церемонятся, будь то чужак или житель города, тут уж как договоришься',
                        1: 'С ним нужно быть осторожным, те кто перешел ему дорогу просто пропадали'
                    },
                    gameProgressPoint: ['isShowFarm'],
                    questAdd: {
                        questTitle: 'Пропавший помощник',
                        questArticle: 'У местного зажиточного крестьянина пропал главный помощник, за расследование этого дела назначена награда. Ферма Фридрика находится на востоке'
                    },
                },
                {
                    textNPC: 'Лучшее жаркое в Хэртланде :)',
                    shop: [
                        {
                            product: 'Жаркое с шампиньонами',
                            price: 50,
                            attr: 'product'
                        },
                        {
                            product: 'Лосось с картофелем',
                            price: 25,
                            attr: 'product'
                        }
                    ],
                    heroActions: [
                        {
                            text: 'Назад',
                            attr: 'prevContent',
                            level: 0
                        },
                        {
                            text: 'Уйти',
                            attr: 'closeScene'
                        },
                    ],
                },
                {
                    textNPC: 'Просторное помещение, чистое постельное белье и никаких клопов :)',
                    shop: [
                        {
                            product: 'Аренда дома (отдых восстаналивает до 75% здоровья)',
                            price: 250,
                            attr: 'renta'
                        },
                    ],
                    heroActions: [
                        {
                            text: 'Назад',
                            attr: 'prevContent',
                            level: 0
                        }
                    ],
                }
            ]
        },
        runolv: {
            npcName: 'Рунольв',
            dialogueLevel: 0,
            sceneImage: 'runolv',
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
                        2: 'долина портового города Хоринис. В моем доме ты можешь оставаться сколько тебе угодно',
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
        },
        runolvHouseEmpty: {
            npcName: '',
            dialogueLevel: 0,
            sceneImage: 'runolvEmptyHouse',
            textContent: [
                {
                    textNPC: 'В доме никого нет ...',
                    heroComments: [],
                    heroActions: [
                        {
                            text: 'Уйти',
                            attr: 'closeScene'
                        }
                    ],
                    answearsNPC: {}
                }
            ]
        },
        horinisGuard: {
            npcName: 'Стражник',
            dialogueLevel: 0,
            sceneImage: 'horinisGuard',
            textContent: [
                {
                    textNPC: 'Ни шагу дальше, город в военном положении, не пускаем чужаков!',
                    heroComments: ['В чем причина военного положения?', 'Есть ли вообще возможность попасть в город?'],
                    heroActions: [
                        {
                            text: 'Уйти',
                            attr: 'closeScene'
                        }
                    ],
                    answearsNPC: {
                        0: 'Скоро война с орками, мы должны быть готовы отразить любой удар!',
                        1: 'Мы пускаем только граждан Хэртланда или крестьян, ты не относишься ни к тем, ни к другим',
                        2: 'Работаешь на Георга, можешь проходить, но смотри без глупостей тут! В тюрьме всегда есть свободные места',
                    }
                },
                {
                    textNPC: 'Работаешь на Георга, можешь проходить. Но смотри, без глупостей тут, в тюрьме всегда есть свободные места!',
                    heroActions: [
                        {
                            text: 'Уйти',
                            attr: 'closeScene',
                            dialogueLevelAfterClose: 2,
                        }
                    ],
                    gameProgressPoint: ['isShowHorinis'],
                    questAdd: {
                        questTitle: 'Начало',
                        questArticle: 'Я смог попасть в Хоринис, нужно искать работу'
                    },
                },
                {
                    textNPC: 'Если орки придут сюда я первым встречу их на стенах, наш город выстоит любой ценой!',
                    heroActions: [
                        {
                            text: 'Уйти',
                            attr: 'closeScene'
                        }
                    ],
                }
            ]
        },
        georgFarm: {
            npcName: 'Георг',
            dialogueLevel: 0,
            sceneImage: 'georgFarm',
            textContent: [
                {
                    textNPC: 'задумчиво смотрит в даль ...',
                    heroComments: ['Чем ты занимаешься?', 'Как обстановка на острове?'],
                    heroActions: [
                        {
                            text: 'Как мне попасть в город?',
                            attr: 'nextContent'
                        },
                        {
                            text: 'Уйти',
                            attr: 'closeScene'
                        }
                    ],
                    answearsNPC: {
                        0: 'собираю урожай, сдаю в город, времена нынче смутные, торговать все сложнее',
                        1: 'люди обеспокоены тревожными новостями с пограничья, орки готовятся к войне. А у меня все хозяйство в открытом поле, если орки нагрянут, мне остается только собрать пожитки и бежать на континент. И чем я там займусь? Моих сбережений не хватит на новое хозяйство, пошло все прахом...',
                    }
                },
                {
                    textNPC: 'в Хэртланд пускают только граждан или крестьян. Я могу помочь тебе с этим, если согласен на меня поработать',
                    heroActions: [
                        {
                            text: 'Что нужно делать?',
                            attr: 'nextContent'
                        },
                        {
                            text: 'Назад',
                            attr: 'prevContent'
                        }
                    ],
                },
                {
                    textNPC: 'Товар нужно поставить сегодня, а у меня не хватает рабочих рук, пройдоха Ханс опять упился, вторые сутки валяется на сене. Нужно собрать урожай, берешься?',
                    heroActions: [
                        {
                            text: 'Собрать урожай',
                            attr: 'workOnGeorgFarm'
                        },
                        {
                            text: 'Назад',
                            attr: 'prevContent'
                        }
                    ]
                },
                {
                    textNPC: 'Ты хорошо поработал. Возьми эту бумагу, там моя печать, стража пропустит тебя без проблем',
                    heroActions: [
                        {
                            text: 'Уйти',
                            attr: 'closeScene',
                            dialogueLevelAfterClose: 4
                        },
                    ],
                    questAdd: {
                        questTitle: 'Начало',
                        questArticle: 'Я помог собрать урожай Георга, за это он предоставил мне пропуск в город'
                    },
                    newDialogueBranches: 'entranceCity'
                },
                {
                    textNPC: 'У меня много работы, если ты по делу говори',
                    heroActions: [
                        {
                            text: 'Я просто проходил мимо',
                            attr: 'closeScene',
                            dialogueLevelAfterClose: 4
                        }
                    ]
                }

            ]
        },
        georgFarmWork: {
            npcName: '',
            dialogueLevel: 0,
            sceneImage: 'georgFarmWork',
            textContent: [
                {
                    textNPC: 'Ты собрал урожай, нужно возвращаться к Георгу за платой ...',
                    heroComments: [],
                    heroActions: [
                        {
                            text: 'Уйти',
                            attr: 'closeScene'
                        }
                    ],
                    answearsNPC: {}
                }
            ]
        },
    },
}