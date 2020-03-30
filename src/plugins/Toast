import Vue from 'vue'

const Style = '.toast {position: fixed;left: 50%;top: 50%;line-height: 1.5;box-sizing: border-box;color: #fff;transform: translate(-50%, -50%);z-index: 101;width: 100%;text-align: center;}.toast .info {padding: 1.6vw 5.3vw;font-size:4.267vw;border-radius: 1.067vw;max-width: 77.33%;background: rgba(0, 0, 0, 0.8);box-sizing: border-box;text-align: center;display: inline-block;word-break: break-all;max-height: 16vw;}'
const Toast = new Vue({
  data: function () {
    return {
      toast: null
    }
  },
  render (h) {
    return h('div', {
      style: {
        display: this.toast ? 'inline-block' : 'none'
      },
      class: {
        toast: true
      }
    }, [
      h('div', {
        class: {
          info: true
        },
        domProps: {
          innerHTML: this.toast
        }
      })
    ])
  },
  methods: {
    show (str, timeout = 2000) {
      const vm = this
      vm.toast = str
      setTimeout(() => {
        vm.toast = null
      }, timeout)
    }
  }
}).$mount()

let isAppend = false

export default function (Vue) {
  Vue.prototype.$Toast = function (...params) {
    Vue.nextTick(() => {
      if (!isAppend) {
        const styleDom = document.createElement('style')
        styleDom.type = 'text/css'
        styleDom.appendChild(document.createTextNode(Style))
        document.getElementsByTagName('head')[0].appendChild(styleDom)
        this.$root.$el.appendChild(Toast.$el)
        isAppend = true
      }
      Toast.show.apply(this, params)
    })
  }
}
