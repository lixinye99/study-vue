<template>
    <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1' style="height:25px;">
        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
        <input class="mui-numbox-input" type="number" :value="initcount" @change="countchange" ref="numbox"/>
        <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from '../../lib/js/mui.js'

export default {
    mounted(){
        //初始化数字选择框
        mui('.mui-numbox').numbox()
    },
    methods:{
        countchange(){
            this.$store.commit('updategoodsinfo',{id:this.id,count:this.$refs.numbox.value})
        }
    },
    props:['initcount','id']
}
</script>

<style lang="scss" scoped>

</style>