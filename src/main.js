import Vue from 'vue';
import App from './App';
import router from './router';
import VueRouter from 'vue-router';
import Axios from 'axios';
import Util from './lib/utils.js';
import VueAxios from 'vue-axios';
import Qs from 'qs';
import "@/assets/style/common.css";
import "@/assets/style/font.css";
import "@/assets/style/public.css";
import VueSocketio from 'vue-socket.io'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import i18n from './lang/lang';
Vue.use(VueRouter);
Vue.use(ElementUI);
import VueAwesomeSwiper from 'vue-awesome-swiper';
import store from './store';
Vue.use(VueAwesomeSwiper)
Vue.prototype.$ajax= Axios
var url;
var urls = "";
if(process.env.NODE_ENV=='development'){
	url="3.1.107.1";
	urls = 'http://3.1.107.1'
}else{
	url=location.host;
	var _PROTOCOL = window.location.protocol;
	var _HOST = window.location.host;
	urls = _PROTOCOL + '//' + _HOST;
}
Vue.prototype.API = urls;
//Vue.use(VueSocketio, url);
// Vue.use(VueSocketio, url);
// Vue.protocol.$store=store;
Vue.prototype.$store=store;
window.eventBus = new Vue()
if(localStorage.getItem('socketPort')){
	let ports = JSON.parse(localStorage.getItem('socketPort')).socketnum;
	// Vue.use(VueSocketio, 'http://www.hsfuture.net:' + ports);
	// Vue.use(VueSocketio, 'http://lever.mobile369.com:' + localStorage.getItem('socketPort'));
}else{
	Axios.get('/api/env.json').then(res=>{
		let socketPort = {
			socketnum:res.data.socket_io_port,
			smcode:res.data.login_need_smscode
		}
		socketPort = JSON.stringify(socketPort)
		localStorage.setItem('socketPort',socketPort);
		// Vue.use(VueSocketio, 'www.hsfuture.net');
		// Vue.use(VueSocketio, 'http://www.hsfuture.net:' + res.data.socket_io_port);
		// Vue.use(VueSocketio, 'http://lever.mobile369.com:' + res.data.socket_io_port);
	})
}
// Vue.use(VueSocketio, 'http://ice.adminchao.com:2120');

// Vue.use(VueSocketio, 'http://t.fuwuqian.cn:2120');

Vue.use(new VueSocketio({
	debug: true,
    connection:"http://3.1.107.1:2000",
}))

Vue.config.productionTip = false

Axios.defaults.baseURL = 'http://3.1.107.1/';
Axios.interceptors.request.use(function (config) {
	if (config.url.indexOf('?') === -1) {
		config.url = config.url + '?_timespan=' + (new Date()).getTime()
	} else {
		config.url = config.url + '&_timespan=' + (new Date()).getTime()
	}
	// 在发送请求之前做些什么
	return config
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error)
})
// 随机id
Vue.prototype.$makeSocketId = function () {
	var d = new Date().getTime()
	var ran = parseInt(Math.random() * 888 + 101 + '');
	d = d + '' + ran;
	return d;
}
Axios.interceptors.response.use(function(response){
	if(response.data.type == '999'){
		var lg=window.localStorage.getItem('locale') || '';
		if(lg=='jp'){
			layer.msg('ログイン時代遅れになっておりますので、再登録してください');
		}else if(lg=='zh'){
			layer.msg('登录过时，请重新登录');
		}else if(lg=='en'){
			layer.msg('Logon is out of date, please login again');
		}else{
			layer.msg('登入過時，請重新登入');
		}
		
		localStorage.clear();
		window.localStorage.setItem('locale',lg)
		router.push({
			name: "login",
			params: { type: 1 }
		});
	}
	if(response.data.type=='996'){
		layer.msg(response.data.message);
		setTimeout(() => {
			layer.msg('设置交易密码？', {
			time: 0 //不自动关闭
			,btn: ['是的','取消']
			,yes: function(index){
				layer.closeAll();
				router.push("/bindmpwd");
			}
			}); 
		}, 1000);
	}
	if(response.data.type == '997' || response.data.type == '555'){
		layer.msg(response.data.message);
		setTimeout(function(){
			router.push("/userSetting");
		},1000)
	}
	if(response.data.type == '998'){
		layer.msg(response.data.message);
		setTimeout(function(){
		  router.push("/authentication");
		},1000)
	}
	return response
},error=>{
	// console.log(error.response.status)
	// if(error.response.status==401){
	// 	setTimeout(() => {
	// 		layer.msg('设置交易密码？', {
	// 		time: 0 //不自动关闭
	// 		,btn: ['是的','取消']
	// 		,yes: function(index){
	// 			layer.closeAll();
	// 			router.push("/bindmpwd");
	// 		}
	// 		}); 
	// 	}, 1000);
	// }
})

Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//Axios.defaults.baseURL = ''Axios.defaults.headers = { 'Content-Type': 'application/json;charset=UTF-8' }
// Axios.defaults.withCredentials = true;
// Axios.defaults.transformRequest = [(data) => {
// 	return Qs.stringify(data)
// }]
Vue.use(Util);
Vue.filter('numFilter', function (value) {
	//截取当前数据到小数点后五位
	let transformVal = Number(value).toFixed(5)
	return Number(transformVal)
  })

let bus = new Vue()

Vue.prototype.bus = bus;
// router.beforeEach((to,from,next) => {
// 	Axios({
// 		url:'/api/currency/get_usdt_price'
// 	}).then(res => {
// 		var p  = 6.9;
// 		if(res.data.type == 'ok'){
// 			p = res.data.message;
// 		}
// 		Vue.prototype.usprice = p;
// 		next()
		
// 	})
	
	
	
// })
//Vue.use(Ws, 'http://test.maxf.pub/users/chatRoom');
/* eslint-disable no-new */
new Vue({
	el: '#app',
	i18n,
	router,
	store,
	components: { App },
	template: '<App/>',
	render: h => h(App)
})