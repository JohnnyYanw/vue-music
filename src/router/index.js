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
	}
];

export default new Router({
	base: __dirname,
	mode: 'history',
	linkActiveClass: 'active',
	routes
});
