<template>
	<div class="m-play-list">
		<div class="loading-img" v-show="isLoading"></div>
		<section class="list-head">
			<a @click="$router.go(-1)" class="prev"></a>
			<div class="head-bg" :style="'background-image: url(' + coverImg + ')'"></div>
			<div class="head-wrap">
				<div class="head-fl">
					<img :src="coverImg">
				</div>
				<div class="head-fr">
					<h2 class="head-title">{{listTitle}}</h2>
					<div class="creator">
						<span class="avatar">
							<img :src="creatorAvatar">
						</span>
						<span class="name">{{creatorName}}</span>
					</div>
				</div>
			</div>
		</section>
		<section class="list-desc">
			<div class="desc-tags">
				标签：<em class="tag t-bd" v-for="item in tags">{{item}}</em>
			</div>
			<div class="desc-info">
				<pre>简介：{{desc}}</pre>
			</div>
		</section>
		<div class="play-list">
			<h3 class="list-title">歌曲列表</h3>
			<div class="list-songs">
				<router-link class="song-item" v-for="(item, index) in songsList" :to="{name: 'song', query: {id: item.id, imgUrl: item.al.picUrl}, params: {}}" :key="index">
					<div class="item-fl">{{index + 1}}</div>
					<div class="item-fr t-bd">
						<div class="item-left">
							<div class="song-info song-name">{{item.name}}</div>
							<div class="song-info song-singer">{{item.singer}}&nbsp;-&nbsp;{{item.al.name}}</div>
						</div>
						<div class="item-right">
							<i class="icon icon-play"></i>
						</div>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default({
		name: 'playlist',
		data() {
			return {
				isLoading: true,
				coverImg: '',
				listTitle: '',
				creatorAvatar: '',
				creatorName: '',
				tags: [],
				desc: '',
				songsList: []
			}
		},
		beforeCreate() {
			// this.getPlayList();
			// 路由传过来的参数
			// console.log(this.$route.query.id);
			this.$http.get(this.Api.getPlayListDetail(this.$route.query.id))
				.then(res => {
					let playList = res.data.playlist;
					// console.log(playList);
					this.coverImg = playList.coverImgUrl;
					this.listTitle = playList.name;
					this.creatorAvatar = playList.creator.avatarUrl;
					this.creatorName = playList.creator.nickname;
					this.tags = playList.tags;
					this.desc = playList.description;
					this.songsList = playList.tracks;
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
					// console.log(this.songsList);
					this.isLoading = false;
				})
				.catch(err => {
					console.log(err);
					this.isLoading = false;
				});
		},
		methods: {
			
		}
	});
</script>

<style lang="less" scoped>
	.t-bd {
		position: relative;
		&::after {
			position: absolute;
			left: 0;
			top: 0;
			content: '';
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			transform-origin: left top;
			border: solid 0 rgba(0, 0, 0, .1);
			pointer-events: none;
			z-index: 2;
		}
	}
	.m-play-list {
		background-color: #F8F8F8;
		min-height: 100%;
		.prev {
			position: absolute;
			left: 10px;
			top: 6px;
			display: block;
			width: 20px;
			height: 20px;
			background: url(../assets/images/back.png) no-repeat;
			background-size: 20px;
			z-index: 9;
		}
		.icon {
			background: url(../assets/images/index_icon.png) no-repeat;
			background-size: 166px 97px;
		}
		.list-head {
			position: relative;
			padding: 30px 10px 30px 15px;
			overflow: hidden;
			.head-bg, .head-bg::after {
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				z-index: 1;
			}
			.head-bg {
				background-repeat: no-repeat;
				background-size: cover;
				background-position: 50%;
				filter: blur(20px);
				transform: scale(1.5);
				&::after {
					content: '';
					background-color: rgba(0, 0, 0, .25);
				}
			}
			.head-wrap {
				position: relative;
				display: flex;
				z-index: 2;
				.head-fl {
					width: 114px;
					height: 114px;
					img {
						width: 100%;
					}
				}
				@media screen and (min-width: 360px) {
					.head-fl {
						width: 126px;
						height: 126px;
					}
				}
				.head-fr {
					flex: 1;
					width: 0%;
					margin-left: 15px;
					.head-title {
						height: 44px;
						padding-top: 1px;
						line-height: 1.3;
						font-size: 17px;
						color: #fefefe;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.creator {
						position: relative;
						display: flex;
						margin-top: 20px;
						color: #DDD;
						span {
							display: block;
						}
						.avatar {
							width: 30px;
							height: 30px;
							border-radius: 50%;
							margin-right: 5px;
							overflow: hidden;
							img {
								width: 100%;
							}
						}
						.name {
							flex: 1;
							width: 0%;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							line-height: 30px;
						}
					}
				}
			}
		}
		.list-desc {
			margin-left: 15px;
			margin-right: 10px;
			padding-top: 10px;
			font-size: 14px;
			color: #666;
			.desc-tags {
				margin-bottom: 10px;
				line-height: 20px;
				.tag {
					position: relative;
					display: inline-block;
					margin-right: 10px;
					padding: 1px 8px;
					font-size: 12px;
					&::after {
						border-width: 1px;
						border-radius: 999px;
						box-sizing: border-box;
					}
				}
			}
			.desc-info {
				line-height: 18px;
				padding-bottom: 18px;
				pre {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					white-space: normal;
				}
			}
		}
		.play-list {
			.list-title {
				height: 23px;
				line-height: 23px;
				padding: 0 10px;
				font-size: 12px;
				color: #666;
				background-color: #EEEFF0;
			}
			.song-item {
				display: flex;
				.item-fl {
					display: flex;
					width: 40px;
					align-items: center;
					justify-content: center;
					font-size: 17px;
					color: #999;
				}
				.item-fr {
					display: flex;
					flex: 1;
					width: 0%;
					&::after {
						border-bottom-width: 1px;
					}
					.item-left {
						flex: 1;
						width: 0%;
						padding: 5px 0;
						font-size: 17px;
						color: #333;
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
							span {
								display: inline-block;
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
					.item-fr::after {
						border-bottom-width: 0;
					}
				}
			}
		}
	}
</style>