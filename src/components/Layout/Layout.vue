<template>
    <div class="content" :style="{ backgroundImage: `url(${backgroundUrl})` }">
        <div class="map-container">
            <div class="map-container__inner" :style="{ backgroundImage: `url(${backgroundMap})` }">
                <NorthForest />
            </div>
            <Hero />
            <HeroInfoBar />
        </div>
    </div>
</template>

<script>
import NorthForest from '@/components/MapPlaces/NorthForest.vue';
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
        HeroInfoBar
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