<template>
    <div class="shopcar-container">

        <!-- 商品列表区域 -->
        <div class="goods-list">
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="$store.getters.getgoodselected[1]" @change="selectedchange(1,$store.getters.getgoodselected[1])"></mt-switch>   
                        <img src="http://localhost:3001/images/a1.jpg" alt=""> 
                        <div>
                            <h1>小米6 小米note 16g全网通</h1>
                            <p>
                                <span class="price">
                                    ￥2199
                                </span>
                                <numbox :initcount = $store.getters.getgoodscount[1] :id = "1"></numbox>
                                <a href="#" @click.prevent="deletegoods(1)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 商品结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content ">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品 <span>{{ $store.getters.getgoodscountandamout.count }}</span> 件，
                        总价 <span>￥{{ $store.getters.getgoodscountandamout.amount }}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>   
    </div>    
</template>

<script>
import numbox from '../subcomponents/shopcar_numbox.vue'

export default {
    components:{
        numbox
    },
    methods:{
        deletegoods(id){
            this.$store.commit('deletefromcar',id)
        },
        selectedchange(id,value){
            //每当点击开关把最新的开关状态同步到我们的store中
            this.$store.commit('updategoodsselected',{id, selected:value})
        }
    }
}
</script>


<style lang="scss" scoped>
.shopcar-container{
    background-color: #eee;
    overflow: hidden;
}

.goods-list{
    img{
        width: 60px;
        height: 60px;
    }
    h1{
        font-size: 13px;
        padding: 10px 0; 
    }
    .info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .price{
            color: red;
            font-weight: bold;
        }
    }

    .mui-card-content-inner{
        display: flex;
        align-items: center;
    }
}

.jiesuan{
    display: flex;
    justify-content: space-between;
    align-items: center;

    span{
        color: red;
        font-weight: bold;
        font-size: 16px;
    }
}
</style>
