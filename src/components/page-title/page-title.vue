<template>
<div class="d-flex flex-column w-100">
    <span class="page-sub-title"> {{ title }} </span>
    <strong class="page-title">{{ subTitle }}</strong>
    <strong class="page-title">{{ xTitle }}</strong>
</div>
</template>

<script>
export default {
    props : ['title', 'subTitle', 'xTitle']
}
</script>

<style lang="scss">
    @import '../../scss/_variable.scss';

    .page-sub-title {
        color: $primary_color;
        width : 100%;
        text-align: center;
        font-size: 20px;
    }

     .page-title {
        color: $secondary_color;
        width : 100%;
        text-align: center;
        font-size: 1.5rem;
        text-transform: uppercase;
    }
</style>
