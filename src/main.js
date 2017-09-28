// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'assets/less/reset';
import App from './App';
import router from './router';
import Axios from 'axios';
import Api from 'assets/js/api';
import VueLazyLoad from 'vue-lazyload';
// 预加载图片
import loadImg from 'assets/images/timg.jpg';

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
Vue.prototype.Api = Api;
Vue.use(VueLazyLoad, {
	preLoad: 1,
	loading: loadImg,
	attempt: 1
});
// 注册一个全局自定义指令
Vue.directive('focus', {
	// 当绑定元素插入到DOM中
	inserted(el) {
		// 聚焦元素
		el.focus();
	}
});

new Vue({
	router,
	render: h => h(App)
}).$mount('#app');
