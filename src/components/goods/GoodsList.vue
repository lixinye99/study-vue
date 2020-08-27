<template>
    <div class="goods-list">
        <!-- 方式一 -->
        <!-- <router-link to="/home/goodsinfo/1" class="goods-item" tag="div">
            <img src="http://192.168.43.250:3001/images/a1.jpg">
            <h1 class="title">小米6</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥2199</span>
                    <span class="old">￥2399</span>
                </p>
                    
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </router-link> -->

        <!-- 在网页中有两种跳转方式 -->
        <!-- 方式一：通过 a 标签进行跳转叫做标签跳转 -->
        <!-- 方式二：使用 window.location.href 的形式叫做编程式导航 -->
        <!-- 方式二 -->
        <div class="goods-item" @click="goDetail(1)">
            <img src="http://localhost:3001/images/a1.jpg">
            <h1 class="title">小米6</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥2199</span>
                    <span class="old">￥2399</span>
                </p>
                    
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        goDetail(id){
            //注意一定要区分this.$router 和 this.$route 这两个对象
            //其中：this.$route 式路由参数对象，所有路由中的参数，parmas query 都属于他
            //其中：this.$router 是一个路由导航对象，用它可以方便的使用js 代，实现路由的前进 后退 跳转到新的url地址
            this.$router.push('/home/goodsinfo/'+id);
        }
    }
}
</script>

<style lang="scss" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
    .goods-item{
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 3px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 260px;

        img{
            width: 100%;
        }

        .title{
            font-size: 14px;
        }

        .info{
            background-color: #eee;
            p{
                margin: 0px;
                padding: 2px;
            }
            .price{
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration:line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 12px;
            }
        }
    }
}

</style>