<template>
	<div class="g-body">
		<app-header></app-header>
		<div class="g-content">
			<app-nav></app-nav>
			<router-view class="tab-content"></router-view>
		</div>
		<audio id="myaudio" src="http://music.163.com/m/song?id=502238220"></audio>
	</div>
</template>

<script>
	import Header from 'pages/common/Header';
	import Nav from 'pages/common/Nav';

	export default {
		name: 'app',
		components: {
			'app-header': Header,
			'app-nav': Nav
		}
	};
</script>

<style lang="less">
	html {
		height: 100%;
	}
	body {
		max-width: 640px;
		min-width: 320px;
		height: 100%;
		margin: 0 auto;
		font-size: 12px;
		color: #666;
		overflow-x: hidden;
		// 父元素添加该属性，子元素绝对定位时
		// 相对于该元素定位，而不是浏览器窗口
		transform: translate(0, 0);
	}
	.g-body {
		height: 100%;
		width: 100%;
		background: #FFF;
		.g-content {
			padding-top: 40px;
		}
	}
</style>
