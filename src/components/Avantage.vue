<template>
<div class="mb-4 col-md-6">
    <a-space class="w-100">
        <div class="av-icon"><StarOutlined style="font-size: 20px" /></div>
        <div class="av-content">
            <span class="av-title"> {{ avantage }} </span>
            <span class="av-desc">
                {{ descrip }}
            </span>
        </div>
    </a-space>
</div>
</template>

<script>
import {StarOutlined} from '@ant-design/icons-vue';
export default {
    props : ['avantage', 'descrip'],
    components: {
        StarOutlined
    }
}
</script>

<style lang="scss">
@import '../scss/_variable.scss';

.av-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #FFF;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;

}

.av-title {
    color: $primary_color;
    width: 100%;
    font-weight: 700;
    display: block;
}

.av-desc {
    display: inline-block;
}
</style>
