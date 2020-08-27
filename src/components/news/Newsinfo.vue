<template>
    <div class="newsinfo-container">
        <h3 class="title">{{ newsinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ newsinfo.add_time | dataFormat}}</span>
            <span>点击：{{ newsinfo.click }}</span>
        </p>

        <hr>
        <div class="content">
            <p>{{ newsinfo.content }}</p>
        </div>

        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
import {Toast} from 'mint-ui'

export default {
    data(){
        return{
            // 将url地址中传递过来的id值挂载到data中方便调用
            id: this.$route.params.id,
            newsinfo:{

            }
        }
    },
    created(){
        this.getNewsinfo();
    },
    methods:{
        getNewsinfo(){
            this.$http.get('getnewsinfo/' + this.id).then(result => {
                 if (result.body != null )
                {
                    this.newsinfo = result.body
                }else{
                    Toast("获取新闻内容失败")
                } 
            })
        }
    },
    //用于注册子组件的节点
    components:{
        "comment-box":comment
    }
}
</script>

<style scope>
.newsinfo-container{
    padding: 0 4px;
}
.newsinfo-container .title{
    font-size:16px;
    text-align: center;
    margin: 15px 0;
    color: red; 
}

.newsinfo-container .subtitle{
    font-size:13px;
    color: #226aff;
    display: flex;
    justify-content: space-between; 
}
</style>