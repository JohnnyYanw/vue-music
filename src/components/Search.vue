<template>
	<div class="tab-search">
		<div class="input-wrap">
			<div class="inputcover">
				<i class="svg-icon search-icon"></i>
				<input type="search" class="search-input" value="" autocomplete="off">
				<label class="holder" v-show="showHolder">搜索歌曲、歌手、专辑</label>
				<figure class="close"><i class="svg-icon close-icon"></i></figure>
			</div>
		</div>
		<div class="m-default" v-if="showDefault">
			<section class="m-hotlist">
				<h3 class="title">热门搜索</h3>
			</section>
		</div>
		<div class="m-result"></div>
	</div>
</template>

<script>
	export default({
		name: 'search',
		data() {
			return {
				showHolder: true,
				showDefault: true
			}
		},
		methods: {
			getResult() {
				this.$http.get(this.Api.search())
					.then(res => {
						console.log(res);
					})
					.catch(err => {
						console.log(err);
					})
			}
		}
	});
</script>

<style lang="less" scoped>
	.tab-search {
		.input-wrap {
			padding: 15px 10px;
			.inputcover {
				position: relative;
				width: 100%;
				height: 30px;
				padding: 0 30px;
				box-sizing: border-box;
				background-color: #ececec;
				border-radius: 30px;
				.svg-icon {
					display: inline-block;
					background-position: 0 0;
					background-size: contain;
					background-repeat: no-repeat;
				}
				.search-icon {
					position: absolute;
					left: 0;
					top: 9px;
					width: 13px;
					height: 13px;
					margin: 0 8px;
					background-image: url(../assets/images/search.svg);
				}
				.search-input {
					width: 100%;
					height: 30px;
					line-height: 18px;
					background: transparent;
					font-size: 13px;
					color: #333;
					&::-webkit-search-cancel-button {
						-webkit-appearance: none;
					}
				}
				.holder {
					position: absolute;
					left: 30px;
					top: 6px;
					font-size: 13px;
					color: #c9c9c9;
					background: transparent;
					pointer-events: none;
				}
			}
		}
	}
</style>