<template>
	<div class="tab-search">
		<div class="input-wrap t-bd">
			<div class="inputcover">
				<i class="svg-icon search-icon"></i>
				<input type="search" class="search-input" v-model="keyWords" autocomplete="off" @input="getResult(keyWords, $event)" @keyup.enter="showResult(keyWords)" v-focus>
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
					<li class="item t-bd" v-for="(item, index) in hotList" @click="showResult(item.first)" :key="index">
						<a href="javascript: void(0);" class="link">{{item.first}}</a>
					</li>
				</ul>
			</section>
			<section class="m-history" v-if="hisList.length > 0">
				<ul class="list">
					<li class="item" v-for="(item, index) in hisList" :key="index">
						<i class="svg-icon history-svg"></i>
						<div class="history t-bd">
							<span class="his-txt t-hide" @click="showResult(item)">{{item}}</span>
							<figure class="del" @click="delHistory(index)">
								<i class="svg-icon del-svg"></i>
							</figure>
						</div>
					</li>
				</ul>
			</section>
		</div>
		<div class="m-list" v-if="showResults">
			<section class="list-wrap">
				<h3 class="title t-bd" @click="showResult(keyWords)">搜索“{{keyWords}}”</h3>
			</section>
		</div>
		<div class="loading-img" v-if="isLoading"></div>
		<div class="m-search-result" v-if="showList">
			<section class="m-song-list">
				<div class="song-item" v-for="(item, index) in songsList" @click="saveSession(item)" :key="index">
					<div class="item-wrap t-bd">
						<div class="item-img">
							<img :src="item.al.picUrl">
						</div>
						<div class="item-info">
							<div class="song-info song-name">{{item.name}}</div>
							<div class="song-info song-singer">{{item.singer}}&nbsp;-&nbsp;{{item.al.name}}</div>
						</div>
						<div class="item-icon">
							<i class="icon icon-play"></i>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
	export default({
		name: 'search',
		data() {
			return {
				keyWords: '',
				isLoading: false,
				showDefault: true,
				showResults: false,
				showList: false,
				hotList: [],
				songsList: [],
				hisList: []
			}
		},
		mounted() {
			this.getHotList();
			if(!!window.localStorage.getItem('search_history')) {
				this.hisList = JSON.parse(window.localStorage.getItem('search_history'));
			} else {
				this.hisList = [];
			}
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
						if(res.data.code === 200) {
							this.hotList = res.data.result.hots;
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			getResult(keyWords, evt) {
				if(evt.target.value !== '') {
					this.showDefault = false;
					this.showResults = true;
					this.showList = false;
					this.keyWords = evt.target.value;
				} else {
					this.showDefault = true;
					this.showResults = false;
				}
			},
			showResult(keyWords) {
				this.isLoading = true;
				this.showDefault = false;
				this.showResults = false;
				this.keyWords = keyWords;
				this.$http.get(this.Api.search(keyWords))
					.then(res => {
						// console.log(res.data);
						if(res.data.code === 200) {
							this.songsList = res.data.result.songs;
							// console.log(this.songsList);
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
								this.isLoading = false;
								this.showList = true;
							});
						}
					})
					.catch(err => {
						console.log(err);
					});
				if(this.hisList.length === 0) {
					this.hisList.push(this.keyWords);
				} else {
					this.hisList.forEach((item, index) => {
						// 如果历史记录中已有该元素，则先删除，再添加
						if(this.hisList.indexOf(this.keyWords) > -1) {
							this.hisList.splice(this.hisList.indexOf(this.keyWords), 1);
						}
						this.hisList.push(this.keyWords);
					})
				}
				window.localStorage.setItem('search_history', JSON.stringify(this.hisList));
			},
			delKeyWords() {
				this.keyWords = '';
				this.showDefault = true;
				this.showResults = false;
				this.showList = false;
			},
			delHistory(index) {
				this.hisList.splice(index, 1);
				window.localStorage.setItem('search_history', JSON.stringify(this.hisList));
			},
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
			}
		}
	});
</script>

<style lang="less" scoped>
	.tab-search {
		position: relative;
		.icon {
			background: url(../assets/images/index_icon.png) no-repeat;
			background-size: 166px 97px;
		}
		.loading-img {
			top: 60px;

		}
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
		.m-song-list {
			padding-top: 8px;
			.song-item {
				display: block;
				padding-left: 10px;
				color: #333;
				.item-wrap {
					display: flex;
					width: 100%;
					align-items: center;
					height: 60px;
					padding: 5px 10px 5px 0;
					box-sizing: border-box;
					&::after {
						border-bottom-width: 1px;
					}
					.item-img {
						display: flex;
						align-items: center;
						width: 50px;
						height: 50px;
						margin-right: 10px;
						img {
							width: 100%;
						}
					}
					.item-info {
						flex: 1;
						width: 0%;
						.song-info {
							width: 100%;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
						.song-name {
							font-size: 17px;
						}
						.song-singer {
							position: relative;
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
					.item-icon {
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
			}
		}
	}
</style>