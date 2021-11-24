<template>
    <div class="hero-item">
        <div class="hero-img">
            <img :src="heroImg" alt="герой" />
        </div>
        <div
            class="hero-armor"
            :class="EQUIP_CLASS_STATE"
            :style="{ backgroundImage: `url(${armorImage})` }"
        ></div>
        <div
            class="hero-weapon"
            :class="WEAPON_CLASS_STATE"
            :style="{ backgroundImage: `url(${weaponImage})` }"
        ></div>
    </div>
</template>

<script>
import heroImg from "@/assets/img/hero.png";
// import heroBg from "@/assets/img/hero-bg.jpg";
import destroyer from "@/assets/img/destroyer.png";
import leatherarmor from "@/assets/img/light-armor.png";
import axe from "@/assets/img/battle-axe.png";
import dragonarmor from "@/assets/img/dragon-armor.png";

// Vuex *
import { mapGetters, mapActions } from 'vuex'
// Миксины *
import { findWithKey } from '@/mixins/mixins';

export default {
    name: 'Hero',
    mixins: [findWithKey],
    data() {
        return {
            heroImg,
            // heroBg,
            hero: {},
            equipImage: {
                destroyer,
                leatherarmor,
                axe,
                dragonarmor
            }

        };
    },
    mounted() {
        if (localStorage.getItem('gameData') != null) {
            var gameDataResponse = JSON.parse(localStorage.getItem("gameData"));
            this.hero = gameDataResponse.hero;
            console.log(this.hero)
            var weapon = this.hero.heroWeapon,
                equip = this.hero.heroEquip,
                indexItem = this.findWithKey(this.hero.inventory, 'nameItem', weapon),
                indexItemEquip = this.findWithKey(this.hero.inventory, 'nameItem', equip);
            if (indexItem != -1) {
                var classItem = this.hero.inventory[indexItem].classItem;
                this.WEAPON_CLASS_ACT(classItem);
            }
            if (indexItemEquip != -1) {
                var classItemEquip = this.hero.inventory[indexItemEquip].classItem;
                this.EQUIP_CLASS_ACT(classItemEquip)
            }
        }
    },
    computed: {
        ...mapGetters([
            'WEAPON_CLASS_STATE',
            'EQUIP_CLASS_STATE'
        ]),
        weaponImage() {
            return this.equipImage[this.WEAPON_CLASS_STATE];
        },
        armorImage() {
            return this.equipImage[this.EQUIP_CLASS_STATE];
        },
    },
    methods: {
        ...mapActions([
            'WEAPON_CLASS_ACT',
            'EQUIP_CLASS_ACT'
        ]),
    }
}
</script>

<style scope>
.hero-item {
    width: 240px;
    position: relative;
    padding: 80px 15px 25px;
}
.hero-armor,
.hero-weapon {
    position: absolute;
}
.hero-armor {
    z-index: 3;
}

.hero-weapon {
    z-index: 4;
}
.dragonarmor {
    width: 163px;
    height: 405px;
    background-repeat: no-repeat;
    background-size: contain;
    top: 98px;
    left: 34px;
}
.leatherarmor {
    width: 175px;
    height: 300px;
    background-repeat: no-repeat;
    background-size: contain;
    top: 100px;
    left: 32px;
}
.destroyer {
    width: 193px;
    height: 251px;
    background-repeat: no-repeat;
    background-size: contain;
    top: 120px;
    left: 30px;
    z-index: 0;
}
.axe {
    width: 250px;
    height: 280px;
    background-repeat: no-repeat;
    background-size: contain;
    top: 94px;
    left: 3px;
    z-index: 0;
}
.hero-img {
    width: 150px;
    margin: 0 auto;
    position: relative;
    bottom: -20px;
    z-index: 1;
}
</style>