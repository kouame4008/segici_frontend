<template>
<transition name="fade" mode="out-in">
    <keep-alive>
        <slot />
    </keep-alive>
</transition>
</template>

<script>
export default {

}
</script>

<style>

</style>
