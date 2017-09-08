<template>
	<div class="tab-search">
		<div class="input-wrap t-bd">
			<div class="inputcover">
				<i class="svg-icon search-icon"></i>
				<input type="search" class="search-input" v-model="keyWords" autocomplete="off" @input="getResult(keyWords, $event)" v-focus>
				<label class="holder" v-show="showHolder">搜索歌曲、歌手、专辑</label>
				<figure class="close" @click="delKeyWords">
					<i class="svg-icon close-icon" v-show="!showDefault"></i>
				</figure>
			</div>
		</div>
		<div class="m-default" v-if="showDefault">
			<section class="m-hotlist">
				<h3 class="title">热门搜索</h3>
				<ul class="list">
					<li class="item t-bd" v-for="(item, index) in hotList" :key="index">
						<a href="javascript: void(0);" class="link">{{item.first}}</a>
					</li>
				</ul>
			</section>
			<section class="m-history" v-if="hisList.length > 0">
				<ul class="list">
					<li class="item">
						<i class="svg-icon history-svg"></i>
						<div class="history t-bd">
							<span class="his-txt t-hide"></span>
							<figure class="del">
								<i class="svg-icon del-svg"></i>
							</figure>
						</div>
					</li>
				</ul>
			</section>
		</div>
		<div class="m-list" v-if="!showDefault">
			<section class="list-wrap">
				<h3 class="title t-bd">搜索“{{keyWords}}”</h3>
				<ul>
					<li class="item">
						<i class="svg-icon search-svg"></i>
						<span class="t-bd t-hide">韩国</span>
					</li>
				</ul>
			</section>
		</div>
	</div>
</template>

<script>
	export default({
		name: 'search',
		data() {
			return {
				showDefault: true,
				keyWords: '',
				hotList: [],
				hisList: []
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.getHotList();
			})
		},
		computed: {
			showHolder: {
				get() {
					return this.showDefault;
				},
				set(bool) {
					this.showDefault = bool;
				}
			}
		},
		methods: {
			getHotList() {
				this.$http.get('/static/hot.json')
					.then(res => {
						console.log(res.data);
						if(res.data.code === 200) {
							this.hotList = res.data.result.hots;
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			getResult(keyWords, evt) {
				console.log(evt.target.value);
				if(evt.target.value !== '') {
					this.showDefault = false;
					this.keyWords = evt.target.value;
					this.$http.get(this.Api.search(keyWords))
						.then(res => {
							console.log(res);
						})
						.catch(err => {
							console.log(err);
						})
				} else {
					this.showDefault = true;
				}
			},
			delKeyWords() {
				this.keyWords = '';
				this.showDefault = true;
			}
		}
	});
</script>

<style lang="less" scoped>
	.tab-search {
		.svg-icon {
			display: inline-block;
			vertical-align: middle;
			background-position: 0 0;
			background-size: contain;
			background-repeat: no-repeat;
		}
		.t-hide {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.input-wrap {
			padding: 15px 10px;
			&::after {
				border-bottom-width: 1px;
				border-color: rgba(0, 0, 0, .1);
			}
			.inputcover {
				position: relative;
				width: 100%;
				height: 30px;
				padding: 0 30px;
				box-sizing: border-box;
				background-color: #ececec;
				border-radius: 30px;
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
				.close {
					position: absolute;
					right: 0;
					top: 0;
					width: 30px;
					height: 30px;
					line-height: 28px;
					text-align: center;
					.close-icon {
						width: 14px;
						height: 14px;
						background-image: url(../assets/images/cancel.svg);
						vertical-align: middle;
					}
				}
			}
		}
		.m-hotlist {
			padding: 15px 10px 0;
			.title {
				line-height: 1;
			}
			.list {
				margin: 10px 0 7px;
				.item {
					display: inline-block;
					height: 32px;
					padding: 0 14px;
					margin-right: 8px;
					margin-bottom: 8px;
					line-height: 32px;
					font-size: 14px;
					&::after {
						border-width: 1px;
						border-color: #d3d4da;
						border-radius: 32px;
					}
					.link {
						color: #333;
					}
				}
			}
		}
		.m-history {
			.item {
				display: flex;
				align-items: center;
				height: 45px;
				.history-svg {
					width: 15px;
					height: 15px;
					margin: 0 10px;
					background-image: url(../assets/images/history.svg);
				}
				.history {
					flex: 1;
					width: 0%;
					display: flex;
					align-items: center;
					height: 45px;
					font-size: 14px;
					color: #333;
					&::after {
						border-bottom-width: 1px;
						border-color: rgba(0, 0, 0, .1);
					}
					.his-txt {
						flex: 1;;
						width: 0%;
						margin-right: 10px;
					}
					.del {
						width: 32px;
						height: 32px;
						line-height: 32px;
						.del-svg {
							width: 12px;
							height: 12px;
							background-image: url(../assets/images/del.svg);
							margin-right: 2px;
						}
					}
				}
			}
		}
		.m-list {
			.title {
				height: 50px;
				line-height: 50px;
				margin-left: 10px;
				padding-right: 10px;
				font-size: 15px;
				color: #507daf;
				&::after {
					border-bottom-width: 1px;
					border-color: rgba(0, 0, 0, .1);
				}
			}
			.item {
				display: flex;
				align-items: center;
				height: 45px;
				padding-left: 10px;
				.search-svg {
					width: 15px;
					height: 15px;
					margin-right: 7px;
					background-image: url(../assets/images/search.svg);
				}
				span {
					flex: 1;
					width: 0%;
					line-height: 45px;
					padding-right: 10px;
					font-size: 15px;
					color: #333;
					&::after {
						border-bottom-width: 1px;
						border-color: rgba(0, 0, 0, .1)
					}
				}
			}
		}
	}
</style>