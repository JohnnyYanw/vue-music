const express = require('express')
const http = require('http')
const apicache = require('apicache')

const app = express()
let cache = apicache.middleware

// 跨域设置
// app.all('*', function (req, res, next) {
//   if (req.path !== '/' && !req.path.includes('.')) {
//     res.header('Access-Control-Allow-Credentials', true)
//     // 这里获取 origin 请求头 而不是用 *
//     res.header('Access-Control-Allow-Origin', req.headers['origin'] || '*')
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With')
//     res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
//     res.header('Content-Type', 'application/json;charset=utf-8')
//   }
//   next()
// })
const onlyStatus200 = (req, res) => res.statusCode === 200

app.use(cache('2 minutes', onlyStatus200))

app.use(express.static('public'))

// 获取专辑内容
app.use('/album', require('./static/router/album'))

// 获取歌手单曲
app.use('/artists', require('./static/router/artists'))

// 获取歌手专辑列表
app.use('/artist/album', require('./static/router/artist_album'))

//艺术家-信息
app.use('/artist/desc', require('./static/router/artists_desc'))

//艺术家-mv
app.use('/artist/mv', require('./static/router/artists_mv'))

// 获取 banner
app.use('/banner', require('./static/router/banner'))

app.use('/check/music', require('./static/router/check_music'))

app.use('/comment/music', require('./static/router/comment_music'))

app.use('/comment/mv', require('./static/router/comment_mv'))

app.use('/comment/album', require('./static/router/comment_album'))

app.use('/comment/playlist', require('./static/router/comment_playlist'))

//未知 api
app.use('/comment/like', require('./static/router/comment_like'))

app.use('/comment/dj', require('./static/router/comment_dj'))

//签到
app.use('/daily_signin', require('./static/router/daily_signin'))

//djradio detail
app.use('/dj/detail', require('./static/router/dj_detail'))

//dj主播 radio
app.use('/dj/program', require('./static/router/dj_program'))

app.use('/dj/program/detail', require('./static/router/dj_program_detail'))

app.use('/dj/sub', require('./static/router/dj_sub'))

app.use('/dj/catelist', require('./static/router/dj_catelist'))

app.use('/dj/hot', require('./static/router/dj_hot'))

// 精选电台
app.use('/dj/recommend', require('./static/router/dj_recommend'))

//精选电台-分类电台
app.use('/dj/recommend/type', require('./static/router/dj_recommend_type'))

//获取动态
app.use('/event', require('./static/router/event'))

//垃圾桶
app.use('/fm_trash', require('./static/router/fm_trash'))

app.use('/follow', require('./static/router/follow'))

// 喜欢歌曲
app.use('/like', require('./static/router/like'))

app.use('/likelist', require('./static/router/likelist'))

//手机登录
app.use('/login/cellphone', require('./static/router/loginCellphone'))

//邮箱登录
app.use('/login', require('./static/router/login'))

//登录刷新
app.use('/login/refresh', require('./static/router/login_refresh'))

// 不明 api
app.use('/log/web', require('./static/router/logWeb'))

// 获取歌词
app.use('/lyric', require('./static/router/lyric'))

// 获取音乐 url
app.use('/music/url', require('./static/router/musicUrl'))

//最新 mv
app.use('/mv/first', require('./static/router/mv_first'))

//播放 mv
app.use('/mv/url', require('./static/router/mv_url'))

//mv
app.use('/mv', require('./static/router/mv'))

// 私人 FM
app.use('/personal_fm', require('./static/router/personal_fm'))

//推荐歌单
app.use('/personalized', require('./static/router/personalized'))

//推荐dj
app.use('/personalized/djprogram', require('./static/router/personalized_djprogram'))

//推荐新音乐
app.use('/personalized/newsong', require('./static/router/personalized_newsong'))

//独家放送
app.use(
  '/personalized/privatecontent',
  require('./static/router/personalized_privatecontent')
)

//推荐mv
app.use('/personalized/mv', require('./static/router/personalized_mv'))

// 获取歌单内列表
app.use('/playlist/detail', require('./static/router/playlist_detail'))

//收藏单曲到歌单,从歌单删除歌曲 op=del,add;pid=歌单id,tracks=歌曲id
app.use('/playlist/tracks', require('./static/router/playlist_tracks'))

app.use('/playlist/hot', require('./static/router/playlist_hot'))

app.use('/playlist/catlist', require('./static/router/playlist_catlist'))

//推荐节目
app.use('/program/recommend', require('./static/router/program_recommend'))

// 获取每日推荐歌曲
app.use('/recommend/songs', require('./static/router/recommend_songs'))

// 获取每日推荐歌单
app.use('/recommend/resource', require('./static/router/recommend_resource'))

//取消推荐
app.use('/recommend/dislike', require('./static/router/recommend_dislike'))

app.use('/resource/like', require('./static/router/resource_like'))

// 搜索
app.use('/search', require('./static/router/search'))

//搜索 multimatch
app.use('/search/multimatch', require('./static/router/search_multimatch'))

// 搜索 suggest,搜索结果包含单曲,歌手,歌单,mv信息
app.use('/search/suggest', require('./static/router/search_suggest'))

//simi ,相似歌单
app.use('/simi/playlist', require('./static/router/simi_playlist'))

//simi ,相似歌曲
app.use('/simi/song', require('./static/router/simi_song'))

//相似 mv
app.use('/simi/mv', require('./static/router/simi_mv'))

//simi ,相似关注的用户
app.use('/simi/user', require('./static/router/simi_user'))

//相似歌手
app.use('/simi/artist', require('./static/router/simi_artists'))

// 获取音乐详情
app.use('/song/detail', require('./static/router/song_detail'))

// 新碟上架 http://music.163.com/#/discover/album/
app.use('/top/album', require('./static/router/top_album'))

// 热门歌手 http://music.163.com/#/discover/artist/
app.use('/top/artists', require('./static/router/top_artists'))

app.use('/top/list', require('./static/router/top_list'))

app.use('/top/mv', require('./static/router/top_mv'))

//分类歌单
app.use('/top/playlist', require('./static/router/top_playlist'))

//精品歌单
app.use(
  '/top/playlist/highquality',
  require('./static/router/top_playlist_highquality')
)

app.use('/top/song', require('./static/router/top_songs'))

app.use('/toplist', require('./static/router/toplist'))

app.use('/toplist/artist', require('./static/router/toplist_artist'))

app.use('/toplist/detail', require('./static/router/toplist_detail'))

// 获取用户歌单
app.use('/user/playlist', require('./static/router/user_playlist'))

// 获取用户电台
app.use('/user/audio', require('./static/router/user_audio'))

//云盘数据
app.use('/user/cloud', require('./static/router/user_cloud'))

//云盘数据详情? 暂时不要使用
app.use('/user/cloud/search', require('./static/router/user_cloud_search'))
//用户动态
app.use('/user/event', require('./static/router/user_event'))

app.use('/user/detail', require('./static/router/user_detail'))

app.use('/user/dj', require('./static/router/user_dj'))

app.use('/user/followeds', require('./static/router/user_followeds'))

app.use('/user/follows', require('./static/router/user_follows'))

app.use('/user/subcount', require('./static/router/user_subcount'))

app.use('/user/record', require('./static/router/user_playrecord'))

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`server running @${port}`)
})

module.exports = app
