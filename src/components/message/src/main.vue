<template>
    <transition name="el-message-fade" @after-leave = "handleAfterLeave">
        <div
        :class="[
        'el-message',
        type ? `el-message--${ type }` : '',
        center? 'is-center' : '',
        showClose ? 'is-closable' : '',
        customClass]"
        :style="positionStyle"
        v-show = "visible"
        @mouseenter="clearTimer"
        @mouseleave="startTimer"
        >
            <slot>
                <p v-if="!dangerouslyUseHTMLString" class="el-message__content">
                    {{message}}
                </p>
                <p v-else v-html="message" class="el-message__content"></p>
            </slot>
            <i v-if="showClose" class="el-message__closeBtn el-icon-close" @click="close"></i>
        </div>
    </transition>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: {},
  directives: {},
  data () {
    return {
      visible: false,
      message: '',
      duration: 3000,
      customClass: '',
      type: 'info',
      timer: null,
      verticalOffset: 20,
      onClose: null,
      dangerouslyUseHTMLString: false,
      center: false,
      showClose: true
    }
  },
  components: {},
  computed: {
    positionStyle () {
      return {
        top: `${this.verticalOffset}px`
      }
    }
  },
  methods: {
    handleAfterLeave () {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
    close () {
      this.visible = false
    },
    clearTimer () {
      clearTimeout(this.timer)
    },
    startTimer () {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.duration)
      }
    },
    keydown (e) {
      if (e.keyCode === 27) { // esc 关闭消息
        if (!this.closed) {
          this.visible = false
        }
      }
    }
  },
  mounted () {
    this.startTimer()
    document.addEventListener('keydown', this.keydown)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.keydown)
  }
}
</script>

<style lang="less" scoped type="text/less">
.el-message__closeBtn:focus,
.el-message__content:focus {
  outline-width: 0;
}
.el-message {
  min-width: 380px;
  box-sizing: border-box;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: #ebeef5;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  background-color: #edf2fc;
  transition: opacity 0.3s, transform 0.4s, top 0.4s;
  overflow: hidden;
  padding: 15px 15px 15px 20px;
  display: flex;
  align-items: center;
}
.el-message.is-center {
  justify-content: center;
}
.el-message.is-closable .el-message__content {
  padding-right: 16px;
}
.el-message p {
  margin: 0;
}
.el-message--info .el-message__content {
  color: #909399;
}
.el-message--success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}
.el-message--success .el-message__content {
  color: #67c23a;
}
.el-message--warning {
  background-color: #fdf6ec;
  border-color: #faecd8;
}
.el-message--warning .el-message__content {
  color: #e6a23c;
}
.el-message--error {
  background-color: #fef0f0;
  border-color: #fde2e2;
}
.el-message--error .el-message__content {
  color: #f56c6c;
}
.el-message__icon {
  margin-right: 10px;
}
.el-message__content {
  padding: 0;
  font-size: 14px;
  line-height: 1;
}
.el-message__closeBtn {
  position: absolute;
  top: 50%;
  right: 15px;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  cursor: pointer;
  color: #c0c4cc;
  font-size: 16px;
}
.el-message__closeBtn:hover {
  color: #909399;
}
.el-message .el-icon-success {
  color: #67c23a;
}
.el-message .el-icon-error {
  color: #f56c6c;
}
.el-message .el-icon-info {
  color: #909399;
}
.el-message .el-icon-warning {
  color: #e6a23c;
}
.el-message-fade-enter,
.el-message-fade-leave-active {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>
