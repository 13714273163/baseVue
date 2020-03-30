<template>
<div class="login-wrapper">
  <div class="form-wrapper">
    <div class="field">
      <div class="form-item user-item">
          <input type="text" class="field-ipt" v-model="username" placeholder="请输入会员名" autocomplete="off">
      </div>
      <div class="form-item pwd-item">
          <input type="password" class="field-ipt" v-model="password" placeholder="请输入登录密码" autocomplete="off">
      </div>
      <div class="form-item">
        <button type="button" class="field-btn" :class="{'disable': username === '' || password === ''}" @click="onSubmit">登录</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { login } from '@/api/login'
export default {
  data () {
    return {
      username: 'madsports_xiezg',
      password: 'hzi*JQJx4W'
    }
  },
  watch: {

  },
  created () {
  },
  methods: {
    async onSubmit () {
    //   debugger
      const vm = this
      if (vm.username === '') {
        return vm.$Toast('请输入用户名')
      }

      if (vm.password === '') {
        return vm.$Toast('请输入密码')
      }
      const ret = await login({
        username: vm.username,
        password: vm.password
      }, {
        isShowLoading: false
      })
      vm.$store.dispatch('user/setInfo', ret)
      vm.$router.push('/home')
    }
  }
}
</script>
<style lang="less" scoped>
.form-wrapper {
  padding: 8vw;
}

.form-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  font-size: 3.467vw;
  min-height: 6.667vw;
  line-height: 6.667vw;
  margin-bottom: 4vw;
}

.field-ipt {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: transparent;
  outline: 0;
  font-size: 4.267vw;
}

.field-btn,
.field-ipt {
  width: 100%;
  padding: 0 4vw;
}

.field-btn {
  border: 0;
  outline: none;
  border-radius: 1.6vw;
  font-size: 4.8vw;
  background-color: #e6ae66;
  display: inline-block;
  height: 9.6vw;
  line-height: 9.6vw;
  color: #fff;
}

.field-btn.disable {
  opacity: 0.6;
}

.login-wrapper .field-ipt {
  height: 11.733vw;
  line-height: 11.733vw;
  padding-left: 8vw;
  border-bottom: 1px solid #e8e8e8;
}

.login-wrapper .form-item:last-child {
  margin-bottom: 0;
  margin-top: 12vw;
}

.login-wrapper .user-item {
  position: relative;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAiCAYAAACnSgJKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRFQUE2MzMyNDYxMDExRTlCNTg5RkYwOTI4MDlBQjg1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRFQUE2MzMzNDYxMDExRTlCNTg5RkYwOTI4MDlBQjg1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REVBQTYzMzA0NjEwMTFFOUI1ODlGRjA5MjgwOUFCODUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REVBQTYzMzE0NjEwMTFFOUI1ODlGRjA5MjgwOUFCODUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6pcR/PAAAC0ElEQVR42ryWS2gTURSGp2mtWqG0IFgfKBRBqdZuFOlCK/FZUKmiglBdVIkvili1waUbwRS1+E7oUhdqfa1868KFFbQFxbqwCIoiWQluiorG/8I3EsdJZibT5MDHTWbuPf/cuWfOOWWZTMZyWiqVsnJYpWiDZjFN/BCfxJC4KW5z7T+LxWL//K+w/NsGkRCzXR5oLmwVIyIubng5jPgQLRfHcWaEh0WXaBAToIFrw8y5zpryfI797PyY6Baj4qA5FfHLMectnBZ7xAnWWLyFgna+CSfmDNeLCy7C2WbunRVrWdONj8Di5ixP8dvs+GGA+HjAMRjrxVcg8c1ihnjDjoPaRdZOF1uCircx9nm86nxH0Ofw5Vt8EeM9q3C7y7gwqHgd4/sQ4vbaqUHF7SyVCSFeWWiS+cJYH0J8lsOXb/FXjGtCiK9gfBFU/BbjDq80mSct73T48i1+jWo1X+wuQHwXaz/jK3DA2VnqpFgeQHhlVnY8IL67TSpLJpNejkwZPUxh6aKw/M4TwHspLCbSe7IKTEEl9QjFYiJp9rXYL+aIcWKSmMc1c+8MwudYG6qkmjTZSck8Su3uzTP/gzgk+seimYiKR+x+so/5M6npUa+JFR7p9Tztk7Gf5Pn74iVR/E1U08uZ/L1KrEY4Sk+3L1eSySW+RFzlAUbZtQmitMvcr7zqZ5z3FAKzkwdvpqQ+9fPaW9mhER4QTURs2udnlqZ1WsD6Ovy1eokvJlBMZF8WLeJdganVdLFLxSX89ePfVbxWXBFVCG/L1X8HMBMn2/FXxVHWuoknqEKDoiNkKc22DP4G+RISTvEmJpgnbR+DHbul6nb8d6D3VzzO7xTJpBhm/CbRidviNWIj+TphFdd60DF6NREa/PHiifhYZHHj/zF664z4Mm7csUpjtk6LEW/kz0CJxJ8zNkayGsSREonbOvURCoOdo0thtk71HwEGAPsFns1OwvW3AAAAAElFTkSuQmCC)
    no-repeat 1.333vw 50%;
  background-size: 4.133vw 4.533vw;
}

.login-wrapper .pwd-item {
  position: relative;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAlCAYAAAC+uuLPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU1OTUwQUI1NDYxMDExRTk5Q0E4QjI3QUFEODJEM0E3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU1OTUwQUI2NDYxMDExRTk5Q0E4QjI3QUFEODJEM0E3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTU5NTBBQjM0NjEwMTFFOTlDQThCMjdBQUQ4MkQzQTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTU5NTBBQjQ0NjEwMTFFOTlDQThCMjdBQUQ4MkQzQTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4+cao2AAABwElEQVR42uyXP0gCURzH310RFRFN/ZGWKInWpmiMKAjJaIiorcGG0NaoNaSloqHBP40NBQVtGe41RaNDUUFgY2aDlHV9H3yN4zj1Or0Uui98eM/T9/vce+i9p6JpmigkGo2KEmkCfjANRoEHfIAncA3OyLvZ4EAg8NNvFNYyB8Kg33C9GQyRRXAH1sFxqWLlpA1gHyzz9S04BAlwz2t9YJLSAXAExsAK+LQj3aUwD9bAHvv6PINLsAlWwRbHyGUOmRVVSwjlnQc52Ae2TYT65PkZH8cEWcOytBXssB/iclpNQjdDeRMtVqXzoBPcgJj4fWIc2wUWrEpn2B6ALxtSOSbOvt+qdJhtUthP0lCrrLSH7UMF0kdDrbLSwvVcBdJcMYcqapD/Iy32GFSqVN+0jhKJRGq2vF5wAjJAc4AM63sLyzsIrkCHg5NrB7Pc8kZUbs5SeM7TgOIAHtaXnrCUjvNulkDaoZmmWV9mQuXUhYNCYajf5j6RrKTwc3Cfva60vrY229uWu7x1IX0tdj6tcrrZvqm6k3hc90a108u/KDIX8tu7wR196g+2txfpkzNNySMEOAVZh2RZ1pee1LcAAwBDXGv10vUkJwAAAABJRU5ErkJggg==)
    no-repeat 1.333vw 50%;
  background-size: 3.867vw 4.933vw;
}
</style>
