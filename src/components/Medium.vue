<template>
	<div class="tab-content">
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

	export default({
		name: 'medium',
		components: {
			'app-header': Header,
			'app-nav': Nav
		}
	});
</script>

<style lang="less" scoped>
	.g-content {
		padding-top: 40px;
		.tab-content {
			width: 100%;
			height: 100%;
		}
	}
</style>