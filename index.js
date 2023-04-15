const { resolve } = require('path')
module.exports = (opts, ctx) => ({
  define() {
    const { musicList, containerBg, themeColor, musicInfoBg, titleColor, zoom, bottom, zIndex } = opts
    
    if (!musicList || !Array.isArray(musicList)) return console.error('@noxone/vuepress-plugin-music-player：', 'musicList is needed!')
    
    const CONTAINER = {
      containerBg: containerBg || '#fff',
      themeColor: themeColor || '#0cdae9',
      musicInfoBg: musicInfoBg || 'rgba(255, 255, 255, 0.5)',
      musicTitleColor: titleColor || '#000',
      zoom: zoom || 0.7,
      bottom: bottom || '50px',
      zIndex: zIndex || 1
    }
    return {
      CONTAINER,
      MUSIC_LIST:musicList
    }
  },
  enhanceAppFiles: resolve(__dirname, './bin/enhanceAppFile.js'),
  globalUIComponents: 'MusicPlayer'
})
