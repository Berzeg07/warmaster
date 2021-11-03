<template>
    <div class="content" :style="{ backgroundImage: `url(${backgroundUrl})` }">
        <div class="box-shadow"></div>
        <div class="map-container">
            <div class="map-container__inner" :style="{ backgroundImage: `url(${backgroundMap})` }">
                <NorthForest />
                <MageHouse />
                <Horinis />
                <GeorgFarm />
                <FoggyHollow />
                <FridrickFarm />
            </div>
            <Hero />
            <HeroInfoBar />
        </div>
    </div>
</template>

<script>
// Места на карте *
import NorthForest from '@/components/MapPlaces/NorthForest.vue';
import MageHouse from '@/components/MapPlaces/MageHouse.vue';
import Horinis from '@/components/MapPlaces/Horinis.vue';
import GeorgFarm from '@/components/MapPlaces/GeorgFarm.vue';
import FoggyHollow from '@/components/MapPlaces/FoggyHollow.vue';
import FridrickFarm from '@/components/MapPlaces/FridrickFarm.vue';

// Герой *
import Hero from '@/components/Hero/Hero.vue';
import HeroInfoBar from '@/components/Hero/HeroInfoBar.vue';
// Фоновые картинки *
import backgroundUrl from "@/assets/img/bg-main.jpg";
import backgroundMap from "@/assets/img/map.png";

export default {
    name: 'layout',
    components: {
        NorthForest,
        Hero,
        HeroInfoBar,
        MageHouse,
        Horinis,
        GeorgFarm,
        FoggyHollow,
        FridrickFarm
    },
    data() {
        return {
            backgroundUrl,
            backgroundMap,
        };
    },
}
</script>

<style scoped>
.content {
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
    background-size: cover;
    height: 100%;
}
.box-shadow {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
}
.map-container {
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1280px;
    margin: 0 auto;
    position: relative;
}
.map-container__inner {
    width: 900px;
    height: 600px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
}
</style>