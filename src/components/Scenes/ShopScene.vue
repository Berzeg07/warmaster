<template>
    <div
        class="modal modal-show modal-loc shop-loc"
        :style="{ backgroundImage: `url(${background})` }"
    >
        <div class="modal-inner">
            <div class="dialogue">
                <p class="dialogue_article">
                    <b>Сантино:</b>
                    {{ sellerComment }}
                </p>
                <div class="btn-block btn-block_dialogue">
                    <Button @click.native="closeScene">Уйти</Button>
                </div>
            </div>
            <div class="modal-inner_item">
                <!-- Товары магазина -->
                <div class="modal-item">
                    <p class="modal-title">Товары</p>
                    <ul>
                        <li v-for="item in shop" :key="item.nameItem">
                            <label>
                                <input
                                    type="radio"
                                    :value="item.nameItem"
                                    name="shop_item"
                                    v-model="checkBuyProduct"
                                />
                                {{ item.nameItem }} -
                                <span>{{ item.priceItem }}</span>
                                ({{ item.typeItem }}:
                                <em>{{ item.propertiesItem }}</em>)
                            </label>
                        </li>
                    </ul>
                    <div class="btn-block btn-block_seller">
                        <Button @click.native="buyProduct">Купить</Button>
                    </div>
                </div>
                <!-- Предметы игрока -->
                <div class="modal-item">
                    <p class="modal-title">Инвентарь</p>
                    <ul id="inventory">
                        <li v-for="(item) in heroItems" :key="item.nameItem">
                            <label>
                                <input
                                    type="radio"
                                    :value="item.nameItem"
                                    name="hero_item"
                                    v-model="checkSellProduct"
                                />
                                {{ item.nameItem }}
                                <span>{{ item.priceItem }}</span>
                                ({{ item.typeItem }}:
                                <em>{{ item.propertiesItem }}</em>) -
                                <i>{{ item.countItem }}</i> шт.
                            </label>
                        </li>
                        <li v-if="checkHeroItems">Пусто</li>
                    </ul>
                    <div class="btn-block btn-block_buyer" v-if="!checkHeroItems">
                        <Button @click.native="sellItem">Продать</Button>
                    </div>
                </div>
                <!-- Кошелек игрока -->
                <div class="modal-item">
                    <p class="modal-title">Кошелек</p>
                    <ul id="purse">
                        <li>
                            <p>
                                Золото:
                                <span>{{ HERO_GOLD_STATE }}</span>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// Фоновые картинки *
import sceneImage from "@/assets/img/shop-loc.jpg";
// Кнопки *
import Button from '@/components/Buttons/Button.vue';
// Vuex *
import { mapGetters, mapActions } from 'vuex';
// Миксины *
import { findWithKey } from '@/mixins/mixins';


export default {
    name: 'Shop',
    mixins: [findWithKey],
    components: {
        Button,
    },
    mounted() {
        if (localStorage.getItem('gameData') != null) {
            var gameDataResponse = JSON.parse(localStorage.getItem("gameData"));
            this.gameData = gameDataResponse;
            this.shop = gameDataResponse.shop;
            this.heroItems = gameDataResponse.hero.inventory;
            this.HERO_GOLD_UPDATE_ACT(this.gameData.hero.heroGold);
        }
    },
    data() {
        return {
            background: sceneImage,
            gameData: {},
            shop: [],
            heroItems: [],
            sellerComment: 'Продаю по полной цене, выкупаю за половину :)',
            checkBuyProduct: false,
            checkSellProduct: false
        }
    },
    computed: {
        ...mapGetters([
            'HERO_GOLD_STATE',
            'HERO_DAMAGE_STATE',
            'HERO_WEAPON_STATE',
            'HERO_EQUIP_STATE',
            'HERO_ARMOR_STATE'
        ]),
        checkHeroItems() {
            return this.heroItems.length == 0 ? true : false;
        },
    },
    methods: {
        ...mapActions([
            'OVERLAY_SHOW_ACT',
            'HERO_GOLD_UPDATE_ACT',
            'HERO_DAMAGE_UPDATE_ACT',
            'HERO_EQUIP_ACT',
            'HERO_ARMOR_ACT',
            'HERO_WEAPON_ACT',
            'WEAPON_CLASS_ACT',
            'EQUIP_CLASS_ACT',
            'OVERLAY_HIDE_ACT',
            'SHOP_SHOW_ACT'
        ]),
        closeScene() {
            this.gameData.shopShow = false;
            var serialDataBase = JSON.stringify(this.gameData);
            localStorage.setItem("gameData", serialDataBase);
            this.OVERLAY_HIDE_ACT();
            this.SHOP_SHOW_ACT();
        },
        sellItem() {
            if (!this.checkSellProduct) {
                this.sellerComment = 'Выбери предмет, который хочешь продать';
            } else {
                var indexSellItem = this.findWithKey(this.heroItems, 'nameItem', this.checkSellProduct);
                if (indexSellItem != -1) {
                    this.heroItems[indexSellItem].countItem -= 1;
                    var heroGold = this.gameData.hero.heroGold;
                    var priceSellItem = this.heroItems[indexSellItem].priceItem;
                    this.gameData.hero.heroGold = Number(heroGold) + Number(priceSellItem);
                    this.HERO_GOLD_UPDATE_ACT(this.gameData.hero.heroGold);
                    if (this.heroItems[indexSellItem].countItem == 0) {
                        this.heroItems.splice(indexSellItem, 1);
                        this.gameData.hero.heroItems = this.heroItems;
                        if (this.HERO_WEAPON_STATE == this.checkSellProduct) {
                            this.HERO_WEAPON_ACT('Пусто');
                            this.WEAPON_CLASS_ACT('');
                            this.HERO_DAMAGE_UPDATE_ACT(this.gameData.hero.heroDamage);
                            this.gameData.hero.weaponDamage = 0;
                        }
                        if (this.HERO_EQUIP_STATE == this.checkSellProduct) {
                            this.HERO_EQUIP_ACT('Пусто');
                            this.EQUIP_CLASS_ACT('');
                            this.HERO_ARMOR_ACT(0);
                            this.gameData.hero.heroArmor = 0;
                        }
                    }
                    localStorage.setItem("gameData", JSON.stringify(this.gameData));
                }
            }
        },
        buyProduct() {
            if (!this.checkBuyProduct) {
                this.sellerComment = 'Выбери предмет, который хочешь купить';
            } else {
                var indexItem = this.findWithKey(this.shop, 'nameItem', this.checkBuyProduct);
                var priceItem = this.shop[indexItem].priceItem;
                var heroGold = this.gameData.hero.heroGold;
                if (priceItem > heroGold) {
                    this.sellerComment = 'К сожалению эта вещь стоит больше чем ты можешь предложить';
                } else {
                    heroGold -= priceItem;
                    this.gameData.hero.heroGold = heroGold;
                    this.HERO_GOLD_UPDATE_ACT(heroGold);
                    var checkHeroItem = this.findWithKey(this.heroItems, 'nameItem', this.checkBuyProduct);
                    if (checkHeroItem != -1) {
                        this.heroItems[checkHeroItem].countItem += 1;
                        this.gameData.hero.heroItems = this.heroItems;
                    } else {
                        var newPrice = this.shop[indexItem].priceItem / 2;
                        var clone = {};
                        for (var key in this.shop[indexItem]) {
                            clone[key] = this.shop[indexItem][key];
                        }
                        clone.priceItem = newPrice;
                        clone.countItem = 1;
                        this.heroItems.push(clone);
                        this.gameData.hero.inventory = this.heroItems;
                    }
                    localStorage.setItem("gameData", JSON.stringify(this.gameData));
                }
            }
        }
    }
}
</script>

<style scoped>
.modal-item em,
.modal-item i {
    color: palegoldenrod;
    padding-left: 5px;
    font-style: normal;
}
.modal-item span {
    color: orange;
    display: inline-block;
    padding-right: 5px;
}
.modal-title {
    border-bottom: 1px solid white;
    padding: 5px 0 10px;
    margin-bottom: 10px;
    color: orange;
}
.modal-item {
    font-size: 18px;
    color: white;
    padding: 6px 12px;
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid white;
    -webkit-box-shadow: 0 0 5px 0 white;
    -moz-box-shadow: 0 0 5px 0 white;
    box-shadow: 0 0 5px 0 white;
    border-radius: 10px;
    margin: 10px;
    position: relative;
    z-index: 10;
}
.modal-inner_item {
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
    z-index: 25;
}
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