## 0. 欢迎在vuepress中使用noxone-music-player
嗯... 这是我的第一个音乐播放器插件，基于2020年自己写的[音乐播放器demo](https://dragon-chen777.github.io/Music-player/)进行重构， 喜欢的话，这里是[Github传送门](https://github.com/Dragon-chen777/vuepress-plugin-music-player)，求求大佬在右上角点个⭐⭐噢，您的支持就是我创作的最大动力！

效果图如下： 

**播放器展开**

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6fb27c713dd4fb186f5f9052c691e28~tplv-k3u1fbpfcp-zoom-1.image)

**播放器隐藏**

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12e346847bc44a17bc1193fc277d0747~tplv-k3u1fbpfcp-zoom-1.image)

交互效果强烈推荐到我的小破站去体验喔~ 

喏，这里是传送门：[NOxONE](https://dragon-chen777.github.io/NOxONE/)

## 1. 导入
```sheel
npm i @noxone/vuepress-plugin-music-player
```
## 2. 配置
```js
// ./docs/.vuepress/config.js
module.exports = {
  // ...
  plugins: [
    [
      "vuepress-plugin-music-player", // 导入noxone播放器
      {
        musicList: [ // 音乐列表 必填
          { 
            cover: 'https://dragon-chen777.github.io/Music-player/img/Mojito.jpg', // 音乐封面 
            title: 'Mojito', // 音乐标题
            link: 'https://dragon-chen777.github.io/Music-player/music/Mojito.mp3', // 音乐路径
          },
          // 或者，在 ./docs/.vuepress/public文件夹存放资源，使用相对路径的方式配置
          { 
            cover: '/imgs/Mojito.jpg', 
            title: 'Mojito',
            link: '/music/Mojito.mp3',
          },
        ],
      containerBg: '#fff', // 播放器背景色 可选
      themeColor: '#0cdae9', // 主题色 可选
      musicInfoBg: 'rbga(255,255,255)', // 音乐信息背景 可选
      musicTitleColor: '#000', // 音乐标题颜色 可选
      zoom: 0.7, // 播放器缩放大小 可选（默认移动端尺寸缩小一半）
      bottom: '50px', // 播放器的bottom值 可选（默认采用fiex定位，bottom为50px）
    }
  ]
}
```
## 3.新增

1. 向全局`window`挂载`noxone`以实现事件发布订阅
`订阅播放事件`
```js
window.noxone.Bus.$on(
	'playNoxoneMusic',
	function musicPlay(){
		_this.playMusic('play')
	}
)
```
`订阅上下切换歌曲事件`
```js
    window.noxone.Bus.$on(
  'playPreNoxoneMusic',
  function musicPlay(){
    _this.playMusic('pre')
  }
)
window.noxone.Bus.$on(
  'playNextNoxoneMusic',
  function musicPlay(){
    _this.playMusic('next')
  }
)
```
意味着，您可以通过例如`window.onxone.$emit('playNoxoneMusic')`的方式让音乐组件播放
2. 修复移动端noxoneMuiscPlayer组件初始显示尺寸异常问题

