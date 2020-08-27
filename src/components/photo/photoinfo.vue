<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photoinfo.add_time | dataFormat }}</span>
            <span>点击：{{ photoinfo.click }}次</span>
        </p>

        <hr>

        <!-- 缩略图的区域 -->
        <div class="thumbs">
            <img class="preview-img" v-for="(item,index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src">
        </div>

        <!-- 图片的内容区域 -->
        <div class="content">
            {{ photoinfo.content }}
        </div>

        <!-- 放置一个现成的评论 -->
        <cmt-box :id=id-9></cmt-box>
    </div>
</template>

<script>

import comment from '../subcomponents/comment.vue'

export default {
    data(){
        return{
            id:this.$route.params.id,
            photoinfo:{},
            list:[]
        }
    },
    created(){
        this.getPhotoinfo();
        this.getThumbs()
    },
    methods:{
        getPhotoinfo(){
            this.$http.get('getphotoinfo/'+this.id).then(result => {
                if (result.body != null )
                {
                    this.photoinfo = result.body    
                    console.log(this.list)               
                }else{
                    Toast("获取信息失败")
                }
            })
        },
        handleClose () {
        console.log('close event')
        },
        getThumbs(){
            this.$http.get('getthumbs/'+this.id).then(result => {
                if (result.body != null )
                    {
                        this.list = result.body.thumb  
                        console.log(this.list)                
                    }else{
                        Toast("获取图片失败")
                    }
            })
        }
    },
    components:{
        'cmt-box':comment
    }
}
</script>

<style scoped>
.photoinfo-container{
    padding: 3px;
}

h3{
    color: #26A2FF;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
}

/* 设置左右显示 */
.subtitle{
    display: flex;
    justify-content: space-between;
    font-size: 13px;
}

.content{
    font-size: 13px;
    line-height: 30px;
}

.thumbs img{
    margin: 10px;
    box-shadow: 0 0 8px #999;
    border-radius: 4px; 
}

</style>