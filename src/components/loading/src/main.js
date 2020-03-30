import Vue from 'vue'
import loadingVue from './main.vue'

const LoadingConstructor = Vue.extend(loadingVue)
let instance
const Loading = function (options = {}) {
  instance = new LoadingConstructor({
    data: options
  })
  instance.$mount()
  document.body.appendChild(instance.$el)
  instance.visible = true
  return instance
}

export default Loading
