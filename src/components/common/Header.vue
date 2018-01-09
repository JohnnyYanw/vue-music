<template>
	<header class="header">
		<div class="header-fix">
			<h1>My Music</h1>
		</div>
	</header>
</template>

<script>
	export default({
		name: 'header'
	});
</script>

<style lang="less" scoped>
	.header {
		width: 100%;
		height: 60px;
		.header-fix {
			position: fixed;
			top: 0;
			left: 50%;
			transform: translateX(-50%);
			width: 100%;
			height: 60px;
			min-width: 320px;
			max-width: 640px;
			padding: 0 10px;
			box-sizing: border-box;
			background: #d43c33;
			z-index: 100;
			h1 {
				line-height: 60px;
				font-size: 20px;
				color: #FFF;
				padding-left: 30px;
			}
		}
	}
</style>