<template>
        <li :class="{active: isActive}" > 
            {{status}}
        </li>
</template>

<script>
export default {
  props: ["status", 'isActive']
};
</script>

<style scoped>
    .active { 
        color: #2196f3;
    }
</style>