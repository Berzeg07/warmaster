<template>
    <div class="hero" :style="{ backgroundImage: `url(${heroBg})` }">
        <!-- <span class="hero-name">Герой</span> -->
        <Hero />
    </div>
</template>

<script>
import Hero from '@/components/Hero/Hero.vue';
import heroBg from "@/assets/img/hero-bg.jpg";

export default {
    name: 'HeroBack',
    components: {
        Hero
    },
    data() {
        return {
            heroBg
        }
    },
}
</script>

<style scoped>
.hero {
    /* width: 240px; */
    border: 1px solid white;
    box-shadow: 0 0 5px 0 white;
    background-size: cover;
    /* padding: 25px 15px; */
    text-align: center;
    border-radius: 10px;
    /* position: relative; */
}

/* .hero-name {
    background: rgba(0, 0, 0, 0.8);
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 20px;
    display: inline-block;
    margin-top: 20px;
    margin: 0 10px 25px;
    color: orange;
} */
</style>