# vue20200324

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 强大的vue仪表盘
vue ui


this.$router.push({
    path: '/ccc',
    query: {
        page: 1
    }
})

vm.$Toast(ret.msg)

import Vue from 'vue'
import Main from './main.vue'

const MessageConstructor = Vue.extend(Main)
let instance
const Message = function () {
  instance = new MessageConstructor()
  instance.$mount()
  document.body.appendChild(instance.$el)
}
export default Message
