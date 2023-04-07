<template>
  <div class="noxone-music" :style="globalSty">
    <div class="music-container" :class="{playing: isPlaying, hidden: isPlayerHidden}" >
      <div class="music-info">
        <div class="title">{{ curMusic.title }}</div>
        <div class="progress-container" @click="setProgress($event)">
          <div class="progress" :style="{width: playProgress}"></div>
        </div>
      </div>
      <div class="music-cover">
        <img :src="curMusic.cover"/>
      </div>
      <div class="control-pannel">
        <div class="hide-btn" @click="setPlayerStatus('hide')">x</div>
        <div class="action-btn fas fa-backward" @click="playMusic('pre')"></div>
        <div class="action-btn action-btn-big fas" :class="[isPlaying ? 'fa-pause' : 'fa-play']" @click="playMusic('play')"></div>
        <div class="action-btn fas fa-forward" @click="playMusic('next')"></div>
      </div>
      <audio
        ref="audio"
        :src="curMusic.link" 
        @timeupdate="updateProgress"
        @ended="playMusic('next')"
      />
    </div>
    <div class="small-container" :class="{show: isPlayerHidden, hidden: !isPlayerHidden}" @click="setPlayerStatus('show')">
      <div class="show-btn fas fa-angle-right"></div>
    </div>
  </div>
</template>
<script>
let AUDIO = null
export default {
  data() {
    return {
      isPlaying: false,
      isPlayerHidden: false,
      playProgress: 0,
      curMusicIdx: 0,
      musicList: MUSIC_LIST,

      globalSty: {
        zoom: CONTAINER.zoom,
        bottom: CONTAINER.bottom,
        '--container-bg-color': CONTAINER.containerBg,
        '--theme-color': CONTAINER.themeColor,
        '--music-info-bg-color': CONTAINER.musicInfoBg,
        '--music-title-color': CONTAINER.musicTitleColor
      }
    }
  },
  computed: {
    curMusic() {
      return this.musicList[this.curMusicIdx]
    },
  },
  mounted() {
    console.log('%c noxone音乐播放器已成功加载~，欢迎访问作者博客：https://dragon-chen777.github.io/NOxONE/','color: #00a1d6')
    const isMobile = !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (isMobile) this.globalSty.zoom *= 0.7
    AUDIO = this.$refs.audio
  },
  methods: {
    playMusic(cmd) {
      if (cmd === 'play') {
        this.isPlaying ? AUDIO.pause() : AUDIO.play()
        this.isPlaying = !this.isPlaying
        return
      }
      if (cmd === 'pre') {
        if (this.curMusicIdx === 0) this.curMusicIdx = this.musicList.length - 1
        else this.curMusicIdx--
        this.$nextTick(() => {
          AUDIO.play()
          this.isPlaying = true
        })
        return
      }
      if (cmd === 'next') {
        this.curMusicIdx = ++this.curMusicIdx % this.musicList.length
        this.$nextTick(() => {
          AUDIO.play()
          this.isPlaying = true
        })
        return
      }
    },
    updateProgress(e) {
      const { duration, currentTime } = e.target
      this.playProgress = `${(currentTime / duration) * 100}%`
    },
    setProgress(e) {
      const progressContainerWidth = e.target.clientWidth
      const clickX = e.offsetX
      const duration = AUDIO.duration
      AUDIO.currentTime = (clickX / progressContainerWidth) * duration
    },
    setPlayerStatus(cmd) {
      if (cmd === 'hide') return this.isPlayerHidden = true
      if (cmd === 'show') return this.isPlayerHidden = false
    }
  }
}
</script>
<style lang="stylus" scoped>
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap')
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css')

* 
  box-sizing border-box
  -webkit-tap-highlight-color rgba(0,0,0,0)

.noxone-music
  position fixed
  left 0

.music-container
  position relative
  display flex
  background var(--container-bg-color)
  border 4px solid rgba(0,0,0,.2)
  box-shadow 2.8px 2.8px 2.2px rgba(0,0,0,.02),6.7px 6.7px 5.3px rgba(0,0,0,.028),12.5px 12.5px 10px rgba(0,0,0,.035),22.3px 22.3px 17.9px rgba(0,0,0,.042),41.8px 41.8px 33.4px rgba(0,0,0,.05),100px 100px 80px rgba(0,0,0,.07)
  border-radius 15px
  padding 20px 20px
  z-index 1
  transition all 0.5s ease-out
  
.music-container.playing 
  .music-cover 
    img
      animation-play-state running
  .music-info
    opacity 1
    transform translateY(-100%)
.music-container.hidden
  opacity 0
  transform translateX(-110%)

.music-cover
  position relative
  width 110px
  &::after
    position absolute
    left 50%
    bottom 100%
    width 15px
    height 15px
    content ""
    background-color var(--container-bg-color)
    border-radius 50%
    transform translate(-50%,50%)
  img
    border-radius 50%
    height 110px
    width inherit
    -o-object-fit cover
    object-fit cover
    position absolute
    bottom 0
    left 0
    animation rotate 3s linear infinite
    animation-play-state paused

.control-pannel
  display flex
  align-items center
  justify-content center
  z-index 9
  .action-btn
    border 0
    color var(--theme-color)
    font-size 20px
    cursor pointer
    padding 10px
    margin 0 15px
  .action-btn-big
    font-size 30px
  .hide-btn
    position absolute
    top 0
    right 0
    width 30px
    height 30px
    line-height 30px
    text-align center
    font-size 24px
    font-weight 600
    cursor pointer
    color var(--theme-color)
.small-container
  position absolute
  top 50%
  left 0
  transform translate(-100%,-50%)
  width 25px
  height 45px
  border 1px solid rgba(0,0,0,.2)
  box-shadow 2.8px 2.8px 2.2px rgba(0,0,0,.02),6.7px 6.7px 5.3px rgba(0,0,0,.028),12.5px 12.5px 10px rgba(0,0,0,.035),22.3px 22.3px 17.9px rgba(0,0,0,.042),41.8px 41.8px 33.4px rgba(0,0,0,.05),100px 100px 80px rgba(0,0,0,.07)
  display flex
  align-items center
  justify-content center
  z-index 9
  cursor pointer
  background-color #fff
  border-radius 0 20px 20px 0
  overflow hidden
  color var(--theme-color)
  .show-btn
    font-size 24px
    font-weight 600
    color var(--theme-color)
.small-container.hidden
  opacity 0
  transition all 0.5s ease-out
.small-container.show
  opacity 1
  transform translate(0,-50%)
  transition all 0.4s ease-in 0.4s

.music-info
  position absolute
  top 0
  left 20px
  width calc(100% - 40px)
  background var(--music-info-bg-color)
  border 4px solid rgba(0,0,0,.2)
  border-bottom-color transparent
  border-radius 15px 15px 0 0
  padding 10px 10px 10px 150px
  opacity 0
  transform translateY(0)
  transition transform .3s ease-in,opacity .3s ease-in
  z-index 0
  .title
    color var(--music-title-color)
    font-weight 600

.progress-container
  background-color rgb(240,240,240)
  border-radius 5px
  cursor pointer
  margin 10px 0
  height 4px
  width 100%

  .progress
    background-color var(--theme-color)
    border-radius 5px
    height 100%
    width 0
    transition width .1s linear

@keyframes rotate
  0%
    transform rotate(0)
  to
    transform rotate(1turn)
</style>