// 整个程序的入口文件

import Vue from 'vue'
import app from './App.vue'
import './lib/css/mui.min.css'
import './lib/css/icons-extra.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import Vuex from 'vuex'
Vue.use(Vuex)
var store = new Vuex.Store({
	state:{
		//我们可以吧这个当成data用来存储数据
		//如果在组件中想要访问store中的数据，只能通过this.$store.state.*** 来访问
		car:[
			
		]
	},
	mutations:{
		//注意：如果要操作store中的state值，只能通过调用mutations提供的方法，才能操作对应的数据
		//不推荐直接操作state中的数据，万一导致了数据的紊乱不能快速的定位到错误的原因
		//r如果要调用mutations中的方法，只能使用this.$store.commit('方法名')
		addtocar(state,goodsinfo){
			var flag = false
			state.car.some(item => {
				if(item.id == goodsinfo.id){
					item.count += parseInt(goodsinfo.count)
					flag = true
					return true
				}
			})
			if (!flag){
				state.car.push(goodsinfo)
			}
		},
		updategoodsinfo(state,goodsinfo){
			state.car.some(item => {
				if(item.id == goodsinfo.id ){
					item.count = parseInt(goodsinfo.count)
					return true;
				}
			})
		},
		deletefromcar(state,id){
			state.car.some((item,i) => {
				if(item.id == id){
					state.car.splice(i,1)
					return true;
				}
			})
		},
		updategoodsselected(state,info){
			state.car.some(item => {
				if(item.id == info.id){
					item.selected = info.selected
				}
			})
		}
	},
	getters:{
		//这里的getters只是负责对外提供数据，不负责修改数据，如果要修改state中的数据，情趣mutations
		//getters中的方法和过滤器比较雷类似，只要state中的数据发生了变化，如果getters也引用了或者数据
		//就会触发getters中的函数重新求值
		getallcount(state){
			var c = 0;
			state.car.forEach(item => {
				c += item.count 
			})
			return c
		},
		getgoodscount(state){
			var o ={}
			state.car.forEach(item => {
				o[item.id] = item.count
			})
			return o
		},
		getgoodselected(state){
			var o = {} 
			state.car.forEach(item => {
				o[item.id] = item.selected
			})
			return o;
		},
		getgoodscountandamout(state){
			var o = {
				count:0,
				amount:0
			}
			state.car.forEach(item => {
				if(item.selected == true){
					o.count += item.count
					o.amount += item.price * item.count 
				}
			})
			return o;
		}
	}
}) 

//导入路由的包

import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.use(MintUI)

//导入自己的router.js模块
import router from './router.js'


import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:3001';
Vue.http.options.emulateJSON = true;

import VuePreview from 'vue-preview'
Vue.use(VuePreview)


// 定义全局的过滤器
import moment from 'moment'
Vue.filter('dataFormat',function(datastr,pattern = 'YYYY-MM-DD HH:mm:ss'){
	return moment(datastr).format(pattern)
})

var vm = new Vue({
	el:'#app',
	render: c => c(app),
	router,
	store
})