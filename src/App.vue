<template>
	<div class="g-body">
		<app-header></app-header>
		<div class="g-content">
			<app-nav></app-nav>
			<router-view class="tab-content"></router-view>
		</div>
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
		width: 100%;
		height: 100%;
		font-size: 12px;
		color: #666;
		overflow-x: hidden;
	}
	.g-body {
		max-width: 640px;
		min-width: 320px;
		height: 100%;
		width: 100%;
		background: #FFF;
		.g-content {
			padding-top: 40px;
		}
	}
</style>
