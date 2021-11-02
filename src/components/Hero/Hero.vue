<template>
    <div class="hero">
        <div class="hero-item" :style="{ backgroundImage: `url(${heroBg})` }">
            <span class="hero-name">Герой</span>
            <div class="hero-img">
                <img :src="heroImg" alt="герой" />
            </div>
            <div class="hero-armor" id="heroArmor"></div>
            <div class="hero-weapon" id="heroWeapon"></div>
        </div>
    </div>
</template>

<script>
import heroImg from "@/assets/img/hero.png";
import heroBg from "@/assets/img/hero-bg.jpg";

export default {
    name: 'Hero',
    data() {
        return {
            heroImg,
            heroBg
        };
    },
}
</script>

<style scope>
.hero-item {
    width: 240px;
    border: 1px solid white;
    -webkit-box-shadow: 0 0 5px 0 white;
    -moz-box-shadow: 0 0 5px 0 white;
    box-shadow: 0 0 5px 0 white;
    background-size: cover;
    padding: 25px 15px;
    text-align: center;
    border-radius: 10px;
    position: relative;
}

.hero-name {
    background: rgba(0, 0, 0, 0.8);
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 20px;
    display: inline-block;
    margin: 0 10px 25px;
    color: orange;
}

.hero-img {
    width: 150px;
    margin: 0 auto;
    position: relative;
    bottom: -20px;
    z-index: 1;
}
</style>