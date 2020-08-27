<template>
    <div class="cmt-container">
        <h3>发表评论</h3>

        <hr>

        <textarea placeholder="请输入要BB的内容（最多吐槽120字）" maxlength="120" v-model="msg"></textarea>

        <mt-button type="primary" size="large" @click="postcommit">发表评论</mt-button>
        <div class="cmt-list" >
            <div class="cmt-item" v-for='(item, i) in commits' :key='i'>
                <div class="cmt-title">
                   第{{ i+1 }}楼 &nbsp;&nbsp;用户：{{ item.username }}  &nbsp;&nbsp;发表时间：{{ item.add_time | dataFormat }}
                </div>
                <div class="cmt-body">
                    {{ item.content }}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain>加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'

export default {
    data(){
        return{
            commits:[],
            msg:''
        }
    },
    created(){
        this.getcommits();
    },
    methods:{
        getcommits(){
            this.$http.get('getcommits/'+ this.id).then(result => {
                if (result.body != null )
                {
                   // this.commits = result.body.commits
                   // 在这里如果有更多的数据就可以把新的数据和已经获取到的数据进行拼接
                   this.commits = this.commits.concat(result.body.commits)
                }else{
                    Toast("获取新闻评论失败")
                } 
            })
        },
        postcommit(){
            //post第一个参数是url地址，第二个参数是提交给服务器的数据对象，参数三定义提交的时候表单的数据格式
            if (this.msg.trim().length == 0 )
            {
                return Toast("输入的内容不能为空！")
            }
            
            this.$http.post('postcommit/'+this.id,{ content: this.msg.trim() }).then(result => {
                Toast(result.bodyText)
                this.commits.unshift({
                username:'匿名用户',
                add_time:new Date,
                content:this.msg
                })
            this.msg = ''
            })
        }
    },
    props:["id"]
}
</script>

<style scoped>
.cmt-container h3{
    font-size: 18px;
}

.cmt-container textarea{
    font-size: 14px;
    height: 85px;
    margin: 0;
}

.cmt-item{
    font-size: 13px;
}

.cmt-title{
    line-height: 30px;
    background-color: #ccc;
}

.cmt-body{
    line-height: 35px;
    text-indent: 2em;
}

.cmt-list{
    margin: 5px 0;
}
</style>