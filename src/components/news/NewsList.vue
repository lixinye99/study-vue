<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newlist" :key="item.id">
					<router-link :to="'/home/newsinfo/' + item.id ">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{ item.title }}</h1>
							<p class='mui-ellipsis'>
                                <span>发表时间：{{ item.add_time | dataFormat }}</span>
                                <span>点击 : {{ item.click }}次</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'

export default{
    data(){
        return {
            newlist:[

            ]
        }
    },
    created(){
        this.getNewList();
    },
    methods:{
        getNewList(){
            this.$http.get('getNewList').then(result => {
               if (result.body != null )
                {
                    this.newlist = result.body
                }else{
                    Toast("获取新闻列表失败")
                } 
            })
        }
    }
}
</script>

<style scoped>
.mui-table-view li h1{
    font-size: 14px;
}

.mui-table-view li .mui-ellipsis{
    font-size: 12px;
    color: skyblue;
    display: flex;
    justify-content: space-between;
}
</style>