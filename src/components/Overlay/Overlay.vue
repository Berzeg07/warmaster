<template>
    <div class="overlay" v-if="OVERLAY_STATE"></div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Overlay',
    computed: {
        ...mapGetters([
            'OVERLAY_STATE'
        ])
    },
}
</script>

<style scoped>
.overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10;
    /* display: none; */
}
/* .overlay.modal-show {
    display: block;
    animation: fade 0.5s forwards ease-in-out;
} */
</style>