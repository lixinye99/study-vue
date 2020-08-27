<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotuList" :key="item.img">
                <img :src="item.img" alt="" :class="{full:isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>

    <!-- 分析：为什么这个轮播图的样式这么丑 -->
    <!-- 1.首页中的图片的宽高都设置的100%，在swiper组件的样式中已经设置好了 -->
    <!-- 2.在商品的详情页轮播图的样式不应该和首页的一样 -->
    <!-- 3.我们希望的效果是高度100%，而宽度自适应 -->

</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{

    },
    props:['lunbotuList','isfull']
}
</script>

<style lang="scss" scoped>
.mint-swipe{
    height: 200px;
}


.mint-swipe-item{
    text-align: center
}

.mint-swipe-item img{
    height: 100%;
}

.full{
    width: 100%;
}
</style>