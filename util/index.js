function setAnimation(dom, animationName, animationEndCb) {
  dom.classList.add(animationName)
  animationEndCb && dom.addEventListener('animationend', animationEndCb)
}

class Bus {
  constructor() {
    this.taskQueue = {}
    this.taskQueueOfOnce = {}
  }

  $on(event, listener) {
    let taskQueue = this.taskQueue
    if (!taskQueue[event]) taskQueue[event] = [] // 建立事件订阅队列
    if (!taskQueue[event].includes(listener)) taskQueue[event].push(listener) // 向队列添加事件订阅者
    console.log(`%c 已通过window.noxone.noxone.Bus.$on("${event}", ${listener.name|| '()=>{...}'})订阅事件`, 'color: #00a1d6')
    console.log(`%c 等待window.noxone.noxone.Bus.$emit("${event}")发布事件`, 'color: #00a1d6')
  }

  $once(event, listener) {
    let taskQueueOfOnce = this.taskQueueOfOnce
    if (!taskQueueOfOnce[event]) taskQueueOfOnce[event] = [] // 建立事件订阅队列
    if (!taskQueueOfOnce[event].includes(listener)) taskQueueOfOnce[event].push(listener) // 向队列添加事件订阅者
    console.log(`%c 已通过window.noxone.noxone.Bus.$on("${event}", ${listener.name || '()=>{...}'})订阅事件`, 'color: #00a1d6')
    console.log(`%c 等待window.noxone.noxone.Bus.$emit("${event}")发布事件`, 'color: #00a1d6')
  }

  $remove(event, listener) {
    let queue = this.taskQueue[event] || this.taskQueueOfOnce[event]
    if (!queue) return

    let idx = queue.indexOf(listener)
    idx > -1 && queue.splice(idx, 1) // 移除事件订阅者
  }

  $emit(event) {
    console.log(`%c 已通过window.noxone.noxone.Bus.$emit("${event}")发布事件`, 'color: #00a1d6')
    if (this.taskQueue[event]) {
      let queue = this.taskQueue[event]

      for (let listener of queue) {
        if (listener.name) console.log(`%c 触发${listener.name}事件 ^_^`, 'color: #00a1d6')
        else console.log(`%c 触发未知事件（某人定义了箭头函数或定义的函数没有名字） ^_^`, 'color: #00a1d6')
        listener()
      } 
    }
    if (this.taskQueueOfOnce[event]) {
      let queue = this.taskQueue[event]
      while (queue.length) {
        let listener = queue.unshift()
        listener()
        if (listener.name) console.log(`%c 触发${listener.name}事件 ^_^`, 'color: #00a1d6')
        else console.log(`%c 触发未知事件（某人定义了箭头函数或定义的函数没有名字） ^_^`, 'color: #00a1d6')

      }
    }
  }

  $has(event, listener) {
    return (this.taskQueue[event] && this.taskQueue.includes(listener)) || (this.taskQueueOfOnce[event] && this.taskQueueOfOnce.includes(listener))
  }
}

export {
  setAnimation,
  Bus
}