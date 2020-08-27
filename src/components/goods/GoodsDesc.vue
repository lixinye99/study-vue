<template>
    <div class="goodsdesc-container">
        <h3>{{ info.title }}</h3>

        <hr>

        <div class="content">
            {{ info.content }}
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            id:this.$route.params.id,
            info:{}
        }
    },
    created(){
        this.getgoodsdesc();
    },
    methods:{
        getgoodsdesc(){
            this.$http.get('getgoodsdesc/'+this.id).then(result => {
                if (result.body != null )
                {   
                    this.info = result.body
                }else{
                    Toast("获取商品参数失败")
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .goodsdesc-container{
        padding: 4px;
        h3{
            font-size: 16px;
            color: #226aff;
            text-align: center;
            margin: 15px 0;
        }
    }
</style>