<template>
	<div class="m-song">
		<a @click="$router.go(-1)" class="prev"></a>
		<div class="m-song-bg"></div>
	</div>
</template>

<script>
	export default({
		name: 'songs',
		data() {
			return {
				bgImg: ''
			}
		}

	});
</script>

<style lang="less" scoped>
	.m-song {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: rgba(0, 0, 0, .3);
		.prev {
			position: absolute;
			left: 10px;
			top: 6px;
			display: block;
			width: 20px;
			height: 20px;
			background: url('../assets/images/back.png') no-repeat;
			background-size: 20px;
			z-index: 9;
		}
	}
</style>