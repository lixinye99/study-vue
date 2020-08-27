import VueRouter from 'vue-router'
import HomeContainer from './components/tabber/HomeContainer.vue'
import SearchContainer from './components/tabber/SearchContainer.vue'
import MemberContainer from './components/tabber/MemberContainer.vue'
import ShopContainer from './components/tabber/ShopcartContainer.vue'
import NewsList from './components/news/NewsList.vue'
import Newsinfo from './components/news/Newsinfo.vue'
import PhotoList from './components/photo/PhotoList.vue'
import PhotoInfo from './components/photo/photoinfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'



var router = new VueRouter({
	routes:[//配置默认的路由规则
		{
			path:'/home',
			component: HomeContainer
		},
		{
			path:'/member',
			component: MemberContainer
		},
		{
			path:'/shopcart',
			component: ShopContainer
		},
		{
			path:'/search',
			component: SearchContainer
		},
		{
			path:'/',
			redirect:'/home'
		},
		{
			path:'/home/newlist',
			component: NewsList
		},
		{
			path:'/home/newsinfo/:id',
			component: Newsinfo
		},
		{
			path:'/home/photolist',
			component: PhotoList
		},
		{
			path:'/home/photoinfo/:id',
			component: PhotoInfo
		},
		{
			path:'/home/goodslist',
			component:GoodsList
		},
		{
			path:'/home/goodsinfo/:id',
			component:GoodsInfo
		},
		{
			path:'/home/goodsdesc/:id',
			component:GoodsDesc
		},
		{
			path:'/home/goodscomment/:id',
			component:GoodsComment
		}
	],
	//配置你要改变的类
	linkActiveClass:'mui-active'
})

export default router