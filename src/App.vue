<template>
	<div class="g-body">
		<router-view></router-view>
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
		background: #FFF;
		font-size: 12px;
		color: #666;
		overflow-x: hidden;
	}
	.g-body {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		.loading-img {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: url(./assets/images/loading.gif) 50% no-repeat;
			background-size: 20px;
			background-color: #FFF;
			z-index: 99;
		}
		.t-bd {
			position: relative;
			&::after {
				position: absolute;
				left: 0;
				top: 0;
				content: '';
				width: 100%;
				height: 100%;
				box-sizing: border-box;
				transform-origin: left top;
				border: solid 0 rgba(0, 0, 0, .1);
				pointer-events: none;
				z-index: 2;
			}
		}
	}
</style>
