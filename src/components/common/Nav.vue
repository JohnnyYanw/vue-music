<template>
	<nav class="nav-tab t-bd">
		<router-link class="tab-item" to="index">
			<span class="tab-txt">推荐音乐</span>
		</router-link>
		<router-link class="tab-item" to="hot">
			<span class="tab-txt">热歌榜</span>
		</router-link>
		<router-link class="tab-item" to="search">
			<span class="tab-txt">搜索</span>
		</router-link>
	</nav>
</template>

<script>
	export default({
		name: 'nav'
	});
</script>

<style lang="less" scoped>
	.nav-tab {
		position: fixed;
		top: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 40px;
		line-height: 40px;
		z-index: 99;
		&::after {
			border-bottom-width: 1px;
			border-color: #ccc;
			z-index: 0;
		}
		.tab-item {
			position: relative;
			flex: 1;
			width: 0%;
			text-align: center;
			font-size: 15px;
			color: #333;
			cursor: pointer;
			-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
			.tab-txt {
				position: relative;
				display: inline-block;
				height: 40px;
				box-sizing: border-box;
				padding: 0 5px;
			}
		}
		.active {
			color: #d33a31;
			.tab-txt {
				&::after {
					position: absolute;
					left: 0;
					bottom: -1px;
					content: '';
					display: block;
					width: 100%;
					height: 4px;
					transform: scaleY(.5);
					background: #d33a31;
					z-index: 3;
				}
			}
		}
	}
</style>