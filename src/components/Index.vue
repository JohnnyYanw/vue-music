<template>
	<div class="tab-recommend">
		<div class="remd-item">
			<h2 class="item-title">推荐歌单</h2>
			<div class="remd-songs">
				<div class="loading-img" v-if="isLoading"></div>
				<div class="remd-ul" v-for="(list, index) in remdList" :key="index">
					<router-link class="remd-li" v-for="(item, i) in list" :to="{path: 'playlist', query: {id: item.id}}" :key="i">
						<dl>
							<dt>
								<img v-lazy="item.coverImgUrl">
								<span class="audience-count">{{item.playCount | formatCount('万')}}</span>
							</dt>
							<dd>{{item.name}}</dd>
						</dl>
					</router-link>
				</div>
			</div>
			<h2 class="item-title">最新音乐</h2>
			<div class="new-songs">
				<div class="loading-img" v-if="loading"></div>
				<div class="song-item" v-for="(item, index) in songsList" @click="saveSession(item)" :key="index">
					<div class="item-bd">
						<div class="item-left">
							<div class="song-info song-name">{{item.name}}</div>
							<div class="song-info song-singer">
								<i class="icon icon-hot"></i>{{item.singer}}&nbsp;-&nbsp;{{item.al.name}}
							</div>
						</div>
						<div class="item-right">
							<i class="icon icon-play"></i>
						</div>
					</div>
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
				isLoading: false,
				loading: false,
				remdList: [],
				songsList: []
			}
		},
		beforeCreate() {

		},
		created() {
			this.get();
			this.getSongsList();
		},
		methods: {
			// sessionStorage存储相应歌曲的信息
			saveSession(item) {
				let songInfo = {
					"resId": item.id,
					"songName": item.name,
					"picUrl": item.al.picUrl,
					"singer": item.singer
				};
				window.sessionStorage.setItem("song_info", JSON.stringify(songInfo));
				this.$router.push({path: 'song', query: {id: item.id}});
			},
			get() {
				this.isLoading = true;
				this.$http.get(this.Api.getPlayListByWhere('全部', 'hot', 0, true))
					.then(res => {
						// console.log(res);
						if(res.status === 200) {
							// 将数组打乱
							function randomArr() {
								return Math.random() - 0.5;
							};
							let dataList = res.data.playlists.sort(randomArr);
							for(let i = 0; i < dataList.length; i += 3) {
								this.remdList.push(dataList.slice(i, i + 3));
							}
							this.remdList = this.randomNum(this.remdList, 2);
							// console.log(this.remdList);
							this.isLoading = false;
						}
					})
					.catch(err => {
						console.log(err);
						this.isLoading = false;
					});
			},
			getSongsList() {
				this.loading = true;
				this.$http.get(this.Api.getPlayListDetail(900009693))
					.then(res => {
						// console.log(res);
						if(res.data.code === 200) {
							this.songsList = res.data.playlist.tracks;
							this.songsList.forEach((item, index) => {
								let singers = [];
								for(let i = 0; i < item.ar.length; i++) {
									singers.push(item.ar[i].name);
								}
								for(let j = 0; j < singers.length - 1; j++) {
									if(singers.length > 1) {
										singers[j] += ' /';
										singers[singers.length - 1] = ' ' + singers[singers.length - 1];
									}
								}
								item.singer = singers.join('');
							});
							this.loading = false;
						}
					})
					.catch(err => {
						console.log(err);
						this.loading = false;
					});
			},
			// 随机取数组中的元素，且不重复
			randomNum(arr, num) {
				let newArr = [];
				for(let k in arr) {
					newArr.push(arr[k]);
				}
				let resultArr = [];
				for(let i = 0; i < num; i++) {
					if(newArr.length > 0) {
						let oIndex = Math.floor(Math.random() * newArr.length);
						// 随机取一个元素放入结果数组中
						resultArr[i] = newArr[oIndex];
						// 把放到结果数组中的元素删除
						newArr.splice(oIndex, 1);
					} else {
						break;
					}
				}
				return resultArr;
			}
		},
		filters: {
			formatCount(val, type) {
				return (val / 10000).toFixed(1) + type;
			}
		}
	}
</script>

<style lang="less" scoped>
	.tab-recommend {
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
			.remd-songs {
				position: relative;
				min-height: 20px;
				padding-bottom: 20px;
				.remd-ul {
					display: flex;
					display: -webkit-flex;
					padding-bottom: 15px;
					.remd-li {
						flex: 1;
						-webkit-flex: 1;
						color: #333;
						&:nth-child(2) {
							padding: 0 2px;
						}
						dt {
							position: relative;
							font-size: 0;
							img {
								width: 100%;
							}
							.audience-count {
								position: absolute;
								top: 2px;
								right: 5px;
								font-size: 12px;
								color: #FFF;
								text-shadow: 1px 0 0 rgba(0, 0, 0, .15);
								z-index: 2;
							}
							&::after {
								content: '';
								position: absolute;
								top: 0;
								left: 0;
								width: 100%;
								height: 20px;
								background-image: linear-gradient(180deg, rgba(0, 0, 0, .2), transparent);
							}

						}
						dd {
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							overflow: hidden;
							padding: 5px 2px 0 5px;
							line-height: 1.2;
							font-size: 13px;
						}
					}
				}
			}
			.new-songs {
				position: relative;
				min-height: 20px;
				.song-item {
					display: flex;
					display: -webkit-flex;
					padding-left: 10px;
					color: #333;
					.item-bd {
						position: relative;
						display: flex;
						display: -webkit-flex;
						flex: 1;
						-webkit-flex: 1;
						width: 0%;
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
							-webkit-flex: 1;
							width: 0%;
							padding: 5px 0;
							.song-info {
								width: 100%;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}
							.song-singer {
								position: relative;
								padding-left: 16px;
								font-size: 12px;
								color: #888;
								.icon-hot {
									position: absolute;
									left: 0;
									top: 5px;
									display: inline-block;
									width: 12px;
									height: 8px;
								}
							}
						}
						.item-right {
							display: flex;
							display: -webkit-flex;
							align-items: center;
							-webkit-align-items: center;
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
