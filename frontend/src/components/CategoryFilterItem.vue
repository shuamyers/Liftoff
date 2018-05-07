<template>
        <li :class="{active: isActive}" > 
            {{category}}
        </li>
</template>

<script>
export default {
  props: ["category", 'isActive']
};
</script>

<style scoped>
    .active { 
        color: #2196f3;
    }
</style>
