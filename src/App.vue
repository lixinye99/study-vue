<template>
	<div class="app-container">
		<!-- 顶部header区域 -->
		<mt-header title="vue项目">		
		<router-link to="" slot="left" v-show="flag">
			<mt-button icon="back" @click="goback()" >返回</mt-button>
		</router-link>
		<mt-button icon="more" slot="right"></mt-button>
		</mt-header>
				
		<!-- 中间的路由 router-view 区域 -->
		<transition>
			<router-view></router-view>
		</transition>
		

		<!-- 底部的tabbar区域 -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-lxy" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-lxy" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-lxy" to="/shopcart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{ $store.getters.getallcount }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-lxy" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
	</div>
</template>

<script>
export default {
	data(){
		return{
			flag:false
		}
	},
	created(){
		this.flag = this.$route.path == '/home'?false:true
	},
	methods:{
		goback(){
			this.$router.go(-1);
		}
	},
	watch:{
		'$route.path':function(newVal){
			if(newVal == '/home')
			this.flag = false
			else
			this.flag = true
		}
	}
}
</script>

<style>
.app-container{
	padding-bottom: 50px;
	overflow-x: hidden ;
}

.v-entry
{
	opacity: 0;
	transform: translateX(100%);
	position: absolute;
}

.v-leave-to{
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;
}

.v-entry-activ,
.v-leave-active{
	transition:all 0.5s ease
}
/* 修改类名解决tabber点击无法切换的问题 */
.mui-bar-tab .mui-tab-item-lxy.mui-active {
    color: 
    #007aff;
}

.mui-bar-tab .mui-tab-item-lxy{
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item-lxy .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-lxy .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
