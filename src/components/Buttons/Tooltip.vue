<template>
    <div class="tooltip">
        <slot>Место</slot>
    </div>
</template>

<script>
export default {
    name: 'Tooltip'
}
</script>

<style scoped>
.tooltip {
    padding: 5px 7px;
    background: white;
    border: 2px solid orange;
    text-align: center;
    display: inline-block;
    border-radius: 5px;
    cursor: pointer;
    position: absolute;
    transition: 0.5s;
    line-height: 16px;
}

.tooltip:hover {
    background: rgba(0, 0, 0, 0.7);
    color: white;
}
</style>