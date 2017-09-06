<template>
	<div class="m-song">
		<a @click="$router.go(-1)" class="prev"></a>
		<div class="m-song-bg" :style="'background-image: url(' + bgImg + '); opacity: 1;'"></div>
		<div class="m-song-container">
			<div class="m-song-wrap">
				<div class="m-song-disc">
					<div class="m-song-turn">
						<div class="m-song-img">
							<img :src="bgImg">
						</div>
					</div>
					<span class="m-song-plybtn"></span>
				</div>
			</div>
			<div class="m-song-info"></div>
		</div>
		<div class="audio-box">
			<audio id="myaudio" :src="audiourl"></audio>
		</div>
	</div>
</template>

<script>
	export default({
		name: 'song',
		data() {
			return {
				bgImg: '',
				audiourl: '',
				lrcTxt: ''
			}
		},
		created() {
			this.$nextTick(() => {
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
				let songId = this.$route.query.id;
				this.$http.get(this.Api.getLrc(songId))
					.then(res => {
						console.log(res.data);
						// this.lrcTxt = 
					})
					.catch(err => {
						console.log(err);
					});
			},
			getSong() {
				// console.log(this.$route);
				this.bgImg = this.$route.params.imgUrl;
				let songId = this.$route.query.id;
				this.$http.get(this.Api.getSong(songId))
					.then(res => {
						console.log(res.data);
						if(res.data.code === 200) {
							let resData = res.data.data;
							this.audiourl = resData[0].url;
							// console.log(this.audiourl);
							if(this.audiourl !== null) {
								this.$nextTick(() => {
									this.playSong();
								});
							} else {
								alert('歌曲加载失败！');
							}
						} else {
							alert('歌曲加载失败！');
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			playSong() {
				document.getElementById('myaudio').play();
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
				.m-song-img, .m-song-plybtn {
					position: absolute;
					left: 50%;
					top: 50%;
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
		}
		@media screen and (min-width: 360px) {
			.m-song-wrap {
				padding-top: 70px;
				.m-song-disc {
					width: 296px;
					height: 296px;
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