<template>
    <div
        class="modal-close"
        @click="clickClose"
        @mouseover="upHere = true"
        @mouseleave="upHere = false"
        :style="{ backgroundImage: `url(${closeIconBg()})` }"
    ></div>
</template>

<script>
// Фоновые картинки *
import closeIcon from "@/assets/img/close.png";
import closeIconHover from "@/assets/img/close-white.png";
// Vuex *
import { mapActions } from 'vuex'

export default {
    name: 'CloseModal',
    props: {
        modalElement: {
            type: String,
        }
    },
    data() {
        return {
            upHere: false,
            iconBg: closeIcon,
            iconBgHover: closeIconHover
        }
    },
    methods: {
        ...mapActions([
            'QUEST_LIST_TOGGLE_ACT',
            'OVERLAY_HIDE_ACT',
            'INVENTORY_TOGGLE_ACT'
        ]),
        closeIconBg() {
            if (this.upHere != true) {
                return this.iconBg;
            } else {
                return this.iconBgHover;
            }
        },
        clickClose() {
            if (this.modalElement == 'questList') {
                this.QUEST_LIST_TOGGLE_ACT();
                this.OVERLAY_HIDE_ACT();
            }
            if (this.modalElement == 'inventoryList') {
                this.INVENTORY_TOGGLE_ACT();
            }
        }
    }
}
</script>
<style scoped>
.modal-close {
    position: absolute;
    right: 10px;
    top: 10px;
    text-align: center;
    line-height: 19px;
    width: 25px;
    height: 24px;
    padding: 3px;
    border: 2px solid orange;
    border-radius: 10em;
    background-color: white;
    background-repeat: no-repeat;
    background-position: center;
    transition: 0.5s;
    color: black;
    cursor: pointer;
    z-index: 35;
}

.modal-close:hover {
    background-color: black;
}
</style>