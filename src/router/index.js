import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const routes = [
	{
		path: '/',
		redirect: 'index'
	}, {
		path: '/medium',
		component: resolve => require(['pages/Medium'], resolve),
		children: [
			{
				path: '/index',
				component: resolve => require(['pages/Index'], resolve)
			}, {
				path: '/hot',
				component: resolve => require(['pages/Hot'], resolve)
			}, {
				path: '/search',
				component: resolve => require(['pages/Search'], resolve)
			}
		]
	}, {
		path: '/playlist',
		component: resolve => require(['pages/Playlist'], resolve)
	}, {
		path: '/song',
		name: 'song',
		component: resolve => require(['pages/Song'], resolve)
	}
];

export default new Router({
	// 是否使用 HTML5 history 模式 ==> 使用该模式时，打包后页面打开空白(???)
	// mode: 'history',
	linkActiveClass: 'active',
	routes
});
