<template>
    <div class="goodsinfo-container">
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ballflag" ref="ball"></div>
        </transition>
        

        <!-- 这是商品的轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner first">
                    <swiper :lunbotuList="lunbotu" :isfull="true"></swiper>
                </div>
            </div>
        </div>
        

        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{ info.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{ info.marker_price }}</del>&nbsp;&nbsp; 销售价：<span class="now_price">
                        ￥{{ info.sell_price }}</span>
                    </p>
                    <p>购买数量：<numbox @getcount = getselectconunt :max="info.stock_quantity"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addtoshopcar">加入购物车</mt-button>
                    </p>
                </div>
            </div> 
        </div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品的参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ info.goods_no }}</p>
                    <p>库存情况：{{ info.stock_quantity }}</p>
                    <p>上架时间：{{ info.add_time }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" @click="goDesc(id)" plain>图文介绍</mt-button>
                <mt-button type="danger" size="large" @click="goComment(id)" plain>商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import swiper from '../subcomponents/swiper.vue'
import numbox from '../subcomponents/numbox.vue'

export default {
    data(){
        return{
            id:this.$route.params.id,
            lunbotu:[],
            info:{},
            ballflag:false,
            count:1
        }
    },
    created(){
        this.getphoto()
        this.getinfo()
    },
    methods:{
        getphoto(){
            this.$http.get('getgoodsphoto/'+this.id).then(result => {
                if (result.body != null )
                {
                    result.body.photo.forEach(item=>{
                        item.img = item.src
                    })
                    this.lunbotu = result.body.photo

                }else{
                    Toast("获取商品轮播图失败")
                }
            })
        },
        getinfo(){
            this.$http.get('getinfo/'+this.id).then(result => {
                if (result.body != null )
                {   
                    this.info = result.body
                }else{
                    Toast("获取商品参数失败")
                }
            })
        },
        goDesc(id){
            this.$router.push('/home/goodsdesc/'+id);
        },
        goComment(id){
            this.$router.push('/home/goodscomment/'+id);
        },
        addtoshopcar(){
            this.ballflag = !this.ballflag
            var goodsinfo = {
                id:this.id,
                count:this.count,
                price:this.info.sell_price,
                selected:true
            }
            this.$store.commit('addtocar',goodsinfo)

        },
        beforeEnter(el){
            el.style.transform = "translate(0, 0)";
        },
        enter(el,done){
            el.offsetWidth;

            //小球动画优化思路（小球的半场动画要使用函数的形式）
            //我们不能吧这个改变的位移的像素写死，要随着分辨率的改变而改变
            //我们可以使用方法getBoundingClientRect()来得到元素距离顶部的距离和最左部的距离
            //相减得到小球应该改变的位移距离
            const ballp = this.$refs.ball.getBoundingClientRect();
            const badgep = document.getElementById("badge").getBoundingClientRect();
            const xdist = badgep.left - ballp.left
            const ydist = badgep.top - ballp.top

            el.style.transform = `translate(${xdist}px,${ydist}px)`;
            el.style.transition = "all 0.8s cubic-bezier(.4,-0.3,1,.68)"
            done()
        },
        afterEnter(el){
            this.ballflag = !this.ballflag
        },
        getselectconunt(count){
            this.count = count
        }
    },
    components:{
        swiper,
        numbox
    }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #ccc;
    overflow: hidden;

    .now_price{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }

    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }
}

.first{
    padding: 0px;
}

.ball{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top:360px;
    left: 146px;    
}



</style>