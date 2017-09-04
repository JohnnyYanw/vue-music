// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'assets/less/reset';
import App from './App';
import router from './router';
import Axios from 'axios';
import Api from 'assets/js/api';

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
Vue.prototype.Api = Api;

new Vue({
	router,
	render: h => h(App)
}).$mount('#app');
