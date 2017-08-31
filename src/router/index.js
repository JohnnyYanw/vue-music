import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const routes = [
	{
		path: '/',
		redirect: 'index'
	}, {
		path: '/index',
		component: resolve => require(['pages/Index'], resolve)
	}, {
		path: '/hot',
		component: resolve => require(['pages/Hot'], resolve)
	}, {
		path: '/search',
		component: resolve => require(['pages/Search'], resolve)
	}
];

export default new Router({
	base: __dirname,
	mode: 'history',
	linkActiveClass: 'active',
	routes
});
