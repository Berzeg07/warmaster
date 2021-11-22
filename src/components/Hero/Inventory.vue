<template>
    <div class="modal modal-show inv-block">
        <p class="modal-title">Инвентарь</p>
        <CloseModal modalElement="inventoryList" />
        <!-- <p>{{ checkedItem }}</p> -->
        <ul class="invlist">
            <li v-for="(item) in inventory" :key="item.nameItem">
                <label>
                    <input
                        type="radio"
                        :value="item.nameItem"
                        name="hero_item"
                        v-model="checkedItem"
                    />
                    {{ item.nameItem }}
                    <span>{{ item.priceItem }}</span>
                    ({{ item.typeItem }}:
                    <em>{{ item.propertiesItem }}</em>) -
                    <i>{{ item.countItem }}</i> шт.
                </label>
            </li>
        </ul>
        <div class="btn-block btn-block_inv">
            <div class="tooltip-inner" v-if="isEquip">
                <p>{{ isEquip }}</p>
            </div>
            <Button @click.native="equipItem(checkedItem)">Экипировать</Button>
        </div>
    </div>
</template>

<script>
// Кнопка закрытия окна *
import CloseModal from '@/components/Buttons/CloseModal.vue';
// Кнопки *
import Button from '@/components/Buttons/Button.vue';
// Vuex *
import { mapActions } from 'vuex'
// Миксины *
import { findWithKey } from '@/mixins/mixins';

export default {
    name: 'Inventory',
    mixins: [findWithKey],
    components: {
        CloseModal,
        Button
    },
    data() {
        return {
            gameData: {},
            inventory: [],
            checkedItem: false,
            isEquip: ''
        }
    },
    mounted() {
        if (localStorage.getItem('gameData') != null) {
            var gameDataResponse = JSON.parse(localStorage.getItem("gameData"));
            this.gameData = gameDataResponse;
            this.inventory = gameDataResponse.hero.inventory;
        }
    },
    methods: {
        ...mapActions([
            'HERO_DAMAGE_UPDATE_ACT',
            'HERO_ARMOR_ACT',
            'HERO_EQUIP_ACT',
            'HERO_WEAPON_ACT',
            'WEAPON_CLASS_ACT',
            'EQUIP_CLASS_ACT'
        ]),
        equipItem(itemName) {
            if (itemName) {
                var indexItem = this.findWithKey(this.inventory, 'nameItem', itemName),
                    checkItem = this.inventory[indexItem],
                    checkType = checkItem.typeItem;
                if (checkType == "Предмет") {
                    this.isEquip = 'Данный предмет невозможно экипировать';
                }
                if (checkType == 'Урон') {
                    var weaponClass = checkItem.classItem;
                    var weaponDamage = checkItem.propertiesItem;
                    var currentDamage = this.gameData.hero.heroDamage + weaponDamage;
                    this.HERO_DAMAGE_UPDATE_ACT(currentDamage);
                    this.WEAPON_CLASS_ACT(weaponClass);
                    this.HERO_WEAPON_ACT(itemName);
                    this.gameData.hero.heroWeapon = itemName;
                    this.gameData.hero.weaponDamage = weaponDamage;
                    localStorage.setItem("gameData", JSON.stringify(this.gameData));
                }
                if (checkType == 'Броня') {
                    var equipClass = checkItem.classItem;
                    var equipArmor = checkItem.propertiesItem;
                    this.HERO_ARMOR_ACT(equipArmor);
                    this.EQUIP_CLASS_ACT(equipClass);
                    this.HERO_EQUIP_ACT(itemName);
                    this.gameData.hero.heroEquip = itemName;
                    this.gameData.hero.heroArmor = equipArmor;
                    localStorage.setItem("gameData", JSON.stringify(this.gameData));
                }
            } else {
                this.isEquip = 'Выбери предмет';
            }
            if (this.isEquip != '') {
                setTimeout(() => {
                    this.isEquip = '';
                }, 2500);
            }
        }
    },
}
</script>

<style scoped>
.invlist label {
    display: inline-block;
    cursor: pointer;
}
.inv-block {
    position: absolute;
    bottom: 26px;
    left: 65px;
    display: none;
    min-width: 200px;
    font-size: 18px;
    color: white;
    padding: 6px 12px;
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid white;
    box-shadow: 0 0 5px 0 white;
    border-radius: 10px;
    margin: 10px;
    /* position: relative; */
    z-index: 10;
}

.inv-block span {
    color: orange;
}

.inv-block i,
.inv-block em {
    font-style: inherit;
}
.inv-block em {
    color: palegoldenrod;
    padding-left: 5px;
}

.inv-block i {
    color: yellowgreen;
}

.inv-block .modal-title {
    position: relative;
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
.modal-title {
    position: relative;
    border-bottom: 1px solid white;
    padding: 5px 0 10px;
    margin-bottom: 10px;
    color: orange;
}
.tooltip-inner {
    position: absolute;
    top: -35px;
    left: 20px;
    padding: 5px 7px;
    color: black;
    font-size: 17px;
    background: #f4c56f;
    text-align: center;
    display: inline-block;
    border-radius: 5px;
}
.tooltip-inner p {
    position: relative;
}
.tooltip-inner p:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -19px;
    width: 0;
    height: 0;
    border-top: 15px solid #f4c56f;
    border-right: 14px solid transparent;
}
</style>