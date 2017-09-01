<template>
	<div>
		<div class="tab-recommend">
			<div class="remd-item">
				<h2 class="item-title">推荐歌单</h2>
				<div class="remd-songs"></div>
				<h2 class="item-title">最新音乐</h2>
				<div class="new-songs">
					<router-link class="song-item" :to="{path: 'hot', query: {id: item.id}}" v-for="(item, index) in songsList" :key="index">
						<div class="item-bd">
							<div class="item-left">
								<div class="song-info song-name">{{item.name}}</div>
								<div class="song-info song-singer" v-if="item.song.artists.length > 1">
									<i class="icon icon-hot"></i>{{item.song.artists[0].name}} / {{item.song.artists[0].name}} - {{item.song.album.name}}
								</div>
								<div class="song-info song-singer" v-else>
									<i class="icon icon-hot"></i>{{item.song.artists[0].name}} - {{item.song.album.name}}
								</div>
							</div>
							<div class="item-right">
								<i class="icon icon-play"></i>
							</div>
						</div>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'index',
		data() {
			return {
				songsList: []
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.getSongs();
			});
		},
		methods: {
			getSongs() {
				this.$http.get('../../../static/songsList.json')
					.then(res => {
						console.log(res.data);
						if(res.data.code === 200) {
							this.songsList = res.data.result;
						}
					})
					.catch(err => {
						console.log(err);
					})
			}
		}
	}
</script>

<style lang="less" scoped>
	.tab-recommend {
		width: 100%;
		height: 100%;
		.icon {
			background: url(../assets/images/index_icon.png) no-repeat;
			background-size: 166px 97px;
		}
		.remd-item {
			padding-top: 20px;
			font-size: 17px;
			.item-title {
				position: relative;
				padding-left: 9px;
				line-height: 20px;
				margin-bottom: 14px;
				&::before {
					content: '';
					position: absolute;
					left: 0;
					top: 50%;
					margin-top: -9px;
					width: 2px;
					height: 16px;
					background-color: #d33a31;
				}
			}
			.new-songs {
				position: relative;
				.song-item {
					display: flex;
					padding-left: 10px;
					color: #333;
					.item-bd {
						position: relative;
						display: flex;
						flex: 1;
						width: 0;
						&::after {
							position: absolute;
							top: 0;
							left: 0;
							content: "";
							width: 100%;
							height: 100%;
							pointer-events: none;
							box-sizing: border-box;
							width: 100%;
							height: 100%;
							transform-origin: top left;
							border-bottom: 1px solid rgba(0, 0, 0, .1);
							z-index: 2;
						}
						.item-left {
							flex: 1;
							width: 0;
							padding: 5px 0;
							.song-info {
								width: 100%;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}
							.song-singer {
								font-size: 12px;
								color: #888;
								.icon-hot {
									display: inline-block;
									width: 12px;
									height: 8px;
									margin-right: 4px;
								}
							}
						}
						.item-right {
							display: flex;
							align-items: center;
							padding: 0 10px;
							.icon-play {
								display: block;
								width: 22px;
								height: 22px;
								background-position: -24px 0;
							}
						}
					}
					&:last-child {
						.item-bd::after {
							border-bottom: none;
						}
					}
				}
			}
		}
	}
</style>
