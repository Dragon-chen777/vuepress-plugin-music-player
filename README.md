## 0. 欢迎在vuepress中使用noxone-music-player
嗯... 这是我的第一个音乐播放器插件，基于2020年自己写的[音乐播放器demo](https://dragon-chen777.github.io/Music-player/)进行重构， 喜欢的话，给个⭐⭐噢，您的支持就是我创作的最大动力！

插件github仓库：[Dragon-chen777](https://github.com/Dragon-chen777/vuepress-plugin-music-player)

同时欢迎各位到访我的小破站：[NOxONE](https://dragon-chen777.github.io/NOxONE/)
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
