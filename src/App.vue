<template>
	<div class="g-body">
		<router-view></router-view>
		<div class="audio-box">
			<audio id="myaudio"></audio>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'app'
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
		.loading-img {
			font-size: 0;
			text-align: center;
		}
	}
</style>
