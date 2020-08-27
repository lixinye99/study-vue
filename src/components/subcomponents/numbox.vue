<template>
    <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1'>
        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
        <input class="mui-numbox-input" type="number" value="1" @change="countchange" ref="numbox"/>
        <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>

    
</template>

<script>
import mui from '../../lib/js/mui.min.js'

export default {
    mounted(){
        //初始化数字选择框
        mui('.mui-numbox').numbox()
    },
    methods:{
        countchange(){
            //每当监测到input中的值发生了改变的时候就把值传递给父组件
            this.$emit('getcount',parseInt(this.$refs.numbox.value))
        }
    },
    props:['max'],
    watch:{
       max:function(newVal,oldVal){
            if(newVal != oldVal){    
                mui(".mui-numbox").numbox().setOption('max',newVal)
            }                                   
        }
    }
}
</script>

<style lang="scss" scoped>

</style>