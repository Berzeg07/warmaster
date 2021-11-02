<template>
    <button class="btn">
        <slot>Кнопка</slot>
    </button>
</template>

<script>
export default {
    name: 'Button'
}
</script>

<style scoped>
.btn {
    font-size: 17px;
    background: white;
    border: none;
    border-radius: 5px;
    border: 2px solid orange;
    cursor: pointer;
    padding: 4px 12px;
    margin-right: 4px;
    transition: 0.5s;
    color: black;
}

.btn:hover {
    background: rgba(0, 0, 0, 0.7);
    color: white;
}
</style>