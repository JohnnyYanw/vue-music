<template>
	<div class="m-song">
		<a @click="$router.go(-1)" class="prev"></a>
		<div class="m-song-bg" :style="'background-image: url(' + songInfo.picUrl + '); opacity: 1;'"></div>
		<div class="m-song-container">
			<div class="m-song-wrap">
				<div class="m-song-disc" :class="{'m-song-stop': isStop, 'm-song-pause': isPaused}">
					<div class="m-song-turn" @click="pauseSong">
						<div class="m-song-img">
							<img :src="songInfo.picUrl">
						</div>
					</div>
					<span class="m-song-plybtn" v-if="isStop" @click="playSong"></span>
					<span class="m-song-plybtn" v-else-if="isPaused" @click="playSong"></span>
				</div>
			</div>
			<div class="m-song-info">
				<h2 class="title">
					<span class="song-name">{{songInfo.songName}}</span><i>-</i><b class="singer-name">{{songInfo.singer}}</b></h2>
				<div class="lrc-wrap">
					<ul class="lrc-ul" v-if="lrcList.length > 0">
						<li class="lrc" v-for="(item, index) in lrcList">{{item[1]}}</li>
					</ul>
					<div class="no-lrc" v-else-if="nolrc">纯音乐，无歌词</div>
					<div class="no-lrc" v-else-if="uncollected">暂无歌词</div>
				</div>
			</div>
		</div>
		<div class="audio-box">
			<audio id="myaudio" :src="audiourl" @ended="isStop = true"></audio>
		</div>
	</div>
</template>

<script>
	export default({
		name: 'song',
		data() {
			return {
				songInfo: {},
				audiourl: '',
				lrcList: [],
				nolrc: false,
				uncollected: false,
				isStop: false,
				isPaused: false
			}
		},
		created() {
			this.$nextTick(() => {
				this.songInfo = JSON.parse(window.sessionStorage.getItem('song_info'));
				this.getLrc();
				this.getSong();
			});
		},
		watch: {
			'$route'(to, from) {
				this.getSong();
			}
		},
		methods: {
			getLrc() {
				let that = this;
				let songId = this.$route.query.id;
				that.$http.get(this.Api.getLrc(songId))
					.then(res => {
						if(res.data.code === 200) {
							if(!res.data.nolyric && !res.data.uncollected) {
								console.log(res.data);
								let lrcInfoList = res.data.lrc.lyric.split('\n');
								lrcInfoList.forEach(function(item, index) {
									// console.log(item);
									let reg = /\]/i;
									if(reg.test(item)) {
										let lrcArr = item.split(reg);
										lrcArr[0] += ']';
										for(let i = 0; i < lrcArr.length; i++) {
											lrcArr[i] = lrcArr[i].replace(/(^\s*)|(\s*$)/g, '');
										}
										// console.log(lrcArr);
										that.lrcList.push(lrcArr);
										if(that.lrcList[0][1] === '') {
											that.lrcList.splice(0, 1);
										}
									}
								});
								console.log(that.lrcList);
							} else if(res.data.nolyric) {
								this.nolrc = true;
							} else {
								this.uncollected = true;
							}
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			getSong() {
				// console.log(this.$route);
				// this.bgImg = this.$route.query.imgUrl;
				let songId = this.$route.query.id;
				this.$http.get(this.Api.getSong(songId))
					.then(res => {
						// console.log(res.data);
						if(res.data.code === 200) {
							let resData = res.data.data;
							this.audiourl = resData[0].url;
							this.$nextTick(() => {
								this.playSong();
							});
						} else {
							this.isStop = true;
							alert('歌曲加载失败！');
						}
					})
					.catch(err => {
						this.isStop = true;
						console.log(err);
					});
			},
			playSong() {
				if(this.audiourl !== null) {
					document.getElementById('myaudio').play();
					this.isStop = false;
					this.isPaused = false;
				} else {
					this.isStop = true;
					alert('歌曲加载失败！');
				}
			},
			pauseSong() {
				document.getElementById('myaudio').pause();
				this.isPaused = true;
			},
			lrcScroll(sTime, eTime) {

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
		.m-song-bg, .m-song-bg::after {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			z-index: 2;
		}
		.m-song-bg {
			background-position: 50%;
			background-repeat: no-repeat;
			background-size: auto 100%;
			transform: scale(1.5);
			transform-origin: center top;
			transition: opacity .3s linear;
			filter: blur(5px);
			z-index: -1;
			&::after {
				content: '';
				background-color: rgba(0, 0, 0, .5);
			}
		}
		.m-song-wrap {
			padding-top: 63px;
			.m-song-disc {
				position: relative;
				width: 248px;
				height: 248px;
				margin: 0 auto;
				&::after {
					content: " ";
					position: absolute;
					top: -63px;
					left: 107px;
					width: 84px;
					height: 122px;
					background: url(../assets/images/needle.png) no-repeat;
					background-size: contain;
					z-index: 5;
					transition: transform .3s ease;
					transform-origin: left top;
				}
			}
			.m-song-turn {
				width: 100%;
				height: 100%;
				&::before, &::after {
					content: '';
					position: absolute;
					left: 0;
					right: 0;
					top: 0;
					bottom: 0;
				}
				&::before {
					background: url(../assets/images/disc.png) no-repeat;
					background-size: contain;
					z-index: 2;
				}
				&::after {
					background: url(../assets/images/disc_light.png) no-repeat;
					background-size: contain;
					z-index: 3;
					animation: circling 20s linear infinite;
				}
				.m-song-img {
					width: 150px;
					height: 150px;
					margin-top: -75px;
					margin-left: -75px;
					border-radius: 50%;
					overflow: hidden;
					background: url(../assets/images/disc_default.png) no-repeat;
					background-size: contain;
					z-index: 1;
					animation: circling 20s linear infinite;
					img {
						width: 100%;
						vertical-align: middle;
					}
				}
			}
			.m-song-img, .m-song-plybtn {
				position: absolute;
				left: 50%;
				top: 50%;
			}
			.m-song-plybtn {
				width: 50px;
				height: 50px;
				transform: translate(-50%, -50%);
				background: url(../assets/images/play-icon.png) left top no-repeat;
				background-size: contain;
				z-index: 10;
			}
			.m-song-stop, .m-song-pause {
				&::after {
					transform: rotate(-20deg);
				}
			}
			.m-song-pause {
				.m-song-turn::after {
					animation-play-state: paused;
				}
				.m-song-img {
					animation-play-state: paused;
				}
			}
			.m-song-stop {
				.m-song-turn::after {
					animation: none;
				}
				.m-song-img {
					animation: none;
				}
			}
		}
		.m-song-info {
			position: relative;
			padding: 0 30px;
			margin-top: 25px;
			text-align: center;
			color: #FFF;
			z-index: 9;
			.title {
				line-height: 1.1;
				font-size: 15px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				i {
					margin: 0 4px;
				}
				.singer-name {
					font-size: 13px;
					color: #ddd;
				}
			}
			.lrc-wrap {
				position: relative;
				height: 67px;
				margin-top: 15px;
				font-size: 13px;
				color: #ddd;
				overflow: hidden;
				.lrc-ul {
					width: 100%;
					transition: transform .3s ease-out;
					.lrc {
						padding-bottom: 5px;
					}
				}
			}

		}
		@media screen and (min-width: 360px) {
			.m-song-wrap {
				padding-top: 70px;
				.m-song-disc {
					width: 296px;
					height: 296px;
					&::after {
						top: -70px;
						left: 133px;
						width: 96px;
						height: 137px;
						background-image: url(../assets/images/needle-w.png);
					}
				}
				.m-song-turn {
					&::before {
						background-image: url(../assets/images/disc-w.png);
					}
					&::after {
						background-image: url(../assets/images/disc_light-w.png);
					}
					.m-song-img {
						width: 184px;
						height: 184px;
						margin-top: -92px;
						margin-left: -92px;
					}
				}
				.m-song-plybtn {
					width: 56px;
					height: 56px;
				}
			}
			.m-song-info {
				.title {
					font-size: 18px;
					.singer-name {
						font-size: 16px;
					}
				}
				.lrc-wrap {
					height: 88px;
					font-size: 16px;
					.lrc-ul .lrc {
						padding-bottom: 8px;
					}
				}
			}
		}
		@keyframes circling {
			from {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(360deg);
			}
		}
	}
</style>