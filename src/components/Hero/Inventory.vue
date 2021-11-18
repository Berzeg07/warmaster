<template>
    <div class="modal modal-show inv-block">
        <p class="modal-title">Инвентарь</p>
        <CloseModal modalElement="inventoryList" />
        <p></p>
        <ul class="invlist">
            <li>
                <label>
                    <input type="radio" value="Кожаная броня" name="hero_item" /> Кожаная броня -
                    <span>100</span> (Броня:
                    <em>5</em>) -
                    <i>1</i> шт.
                </label>
            </li>
            <li>
                <label>
                    <input type="radio" value="Полуторный меч" name="hero_item" /> Полуторный меч -
                    <span>125</span> (Урон:
                    <em>10</em>) -
                    <i>1</i> шт.
                </label>
            </li>
        </ul>
        <div class="btn-block btn-block_inv">
            <Button>Экипировать</Button>
        </div>
    </div>
</template>

<script>
// Кнопка закрытия окна *
import CloseModal from '@/components/Buttons/CloseModal.vue';
// Кнопки *
import Button from '@/components/Buttons/Button.vue';

export default {
    name: 'Inventory',
    components: {
        CloseModal,
        Button
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
</style>