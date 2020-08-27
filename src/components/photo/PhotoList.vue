<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in category" :key="item.id" @click="getimages(item.id)">
                        {{ item.title }}
                    </a>
                    

                </div>
            </div>
		</div>

        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
            <img v-lazy="item.img_url">
            <div class="info">
                <h1 class="info-title">
                    {{ item.title }}
                </h1>
                <div class="info-body">
                    {{ item.content }}
                </div>
            </div>
        </router-link>
</ul>
    </div>
</template>

<script>
import mui from '../../lib/js/mui.js'


export default {
    data(){
        return{
            category:[],
            list:[]
        }
    },
    mounted(){// 当组件中的dom结构被渲染好，放在页面中会执行这个钩子函数
              // 如果要操作dom中的元素最好在mounted中，这个时候的dom元素是最新的
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    created(){
        this.getimages(0);
        this.getallcategory();
        
    },
    methods:{
        getallcategory(){
            this.$http.get('getimgcategory').then(result => {
                if (result.body != null )
                {
                    result.body.unshift({ title:"全部" , id:0 });
                    this.category = result.body
                }else{
                    Toast("获取图片列表失败")
                }
            })
        },
        getimages(id){
            this.$http.get('getimages/'+ id).then(result => {
                if (result.body != null )
                {
                    this.list = result.body.imgs
                }else{
                    Toast("获取图片失败")
                }
            })
        }
    }
}
</script>

<style scoped>
* {
    touch-action: pan-y;
}

img[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;

}

img{
    width: 100%;
    height: 100%;
    vertical-align: middle;
}
.photo-list{
    margin: 0px;
    padding: 10px;
    padding-bottom: 0px;
}

.photo-list li{
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    list-style: none;
    box-shadow: 0 0 9px #999;
    position: relative;
}

.info{
    color: white;
    text-align: left;
    position: absolute;
    bottom: 0px;
    background-color: rgba(0,0,0,0.4);
    max-height: 84px;
}

.info-title{
    font-size: 14px;
}

.info-body{
    font-size: 13px;
}
</style>