<template>
    <transition name="el-notification-fade">
        <!-- @mouseenter="clearTimer()"
            @mouseleave="startTimer()" -->
        <div
            v-show="visible"
            :class="['el-notification', customClass, horizontalClass]"
            :style="positionStyle"

            @click="click"
        >
            <i v-if="type || iconClass" class="el-notification__icon" :class="[ typeClass, iconClass ]"></i>
            <div class="el-notification__group" :class="{ 'is-with-icon': typeClass || iconClass }">
                <h2 class="el-notification__title" v-text="title"></h2>
                <div class="el-notification__content" v-show="message">
                    <slot>
                        <p v-if="!dangerouslyUseHTMLString">
                            {{ message }}
                        </p>
                        <p v-else v-html="message"></p>
                    </slot>
                </div>
                <div
                    class="el-notification__closeBtn el-icon-close"
                    v-if="showClose"
                    @click.stop="close"
                ></div>
            </div>
        </div>
    </transition>
</template>

<script>
let typeMap = {
    success:"success",
    info:"info",
    warning:"warning",
    error:"error"
}
export default {
    name:"Notification",
    data () {
        return {
            visible:false,
            title:"",
            message:"",
            duration:4500,
            type:"",
            showClose:true,
            customClass:"",
            iconClass:"",
            onClose:null,
            onClick:null,
            closed:false,
            verticalOffset:0,
            timer:null,
            dangerouslyUseHTMLString: false,
            position: "top-right"
        }
    },
    computed: {
        typeClass () {
            return this.type && typeMap[this.type] ?`el-icon-${typeMap[this.type]}`:""
        },
        horizontalClass () {
            return this.position.indexOf("right") > -1 ? "right" : "left"
        },
        verticalProperty () {
            return /^top-/.test(this.position) ? "top":"bottom"
        },
        positionStyle () {
            return {
                [this.verticalProperty] : `${ this.verticalOffset }px`
            }
        }

    },
    watch: {
        closed (newVal) {
            if (newVal) {
                this.visible = false
                this.$el.addEventListener("transitionend",this.destroyElement)

            }
        }
    },
    mounted () {
        if (this.duration > 0) {
            this.timer = setTimeout(() => {
                if (!this.closed) {
                    this.close()
                }
            }, this.duration)
        }
        document.addEventListener("keydown", this.keydown)
    },
    beforeDestroy () {
        document.removeEventListener("keydown", this.keydown)
    },
    methods: {
        destroyElement () {
            this.$el.removeEventListener("transitionend", this.destroyElement)
            this.$destroy(true)
            this.$el.parentNode.removeChild(this.$el)
        },
        close () {
            this.closed = true
            if (typeof this.onClose === "function") {
                this.onClose()
            }
        },
        click () {
            if (typeof this.onClick === "function") {
                this.onClick()
            }
        },
        clearTimer () {
            clearTimeout(this.timer)
        },
        startTimer () {
            this.timer = setTimeout(() => {
                if (!this.closed) {
                    this.close()
                }
            }, this.duration)
        },
        keydown (e) {
            let keyCode = e.keyCode
            switch (keyCode) {
            case 46: // delete
            case 8:  // backspace
                this.clearTimer()
                break
            case 27: // esc 关闭消息
                !this.closed && this.close()
                break
            default:
                this.startTimer()
                break
            }

        }
    }
}
</script>

<style lang="less" scoped type="text/less">
.el-notification {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 330px;
  padding: 14px 26px 14px 13px;
  border-radius: 8px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  position: fixed;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  -webkit-transition: opacity 0.3s, left 0.3s, right 0.3s, top 0.4s, bottom 0.3s,
    -webkit-transform 0.3s;
  transition: opacity 0.3s, left 0.3s, right 0.3s, top 0.4s, bottom 0.3s,
    -webkit-transform 0.3s;
  transition: opacity 0.3s, transform 0.3s, left 0.3s, right 0.3s, top 0.4s,
    bottom 0.3s;
  transition: opacity 0.3s, transform 0.3s, left 0.3s, right 0.3s, top 0.4s,
    bottom 0.3s, -webkit-transform 0.3s;
  overflow: hidden;
}
.el-notification.right {
  right: 16px;
}
.el-notification.left {
  left: 16px;
}
.el-notification__group {
  margin-left: 13px;
  margin-right: 8px;
}
.el-notification__title {
  font-weight: 700;
  font-size: 16px;
  color: #303133;
  margin: 0;
}
.el-notification__content {
  font-size: 14px;
  line-height: 21px;
  margin: 6px 0 0;
  color: #606266;
  text-align: justify;
}
.el-notification__content p {
  margin: 0;
}
.el-notification__icon {
  height: 24px;
  width: 24px;
  font-size: 24px;
}
.el-notification__closeBtn {
  position: absolute;
  top: 18px;
  right: 15px;
  cursor: pointer;
  color: #909399;
  font-size: 16px;
}
.el-notification__closeBtn:hover {
  color: #606266;
}
.el-notification .el-icon-success {
  color: #67c23a;
}
.el-notification .el-icon-error {
  color: #f56c6c;
}
.el-notification .el-icon-info {
  color: #909399;
}
.el-notification .el-icon-warning {
  color: #e6a23c;
}
.el-notification-fade-enter.right {
  right: 0;
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}
.el-notification-fade-enter.left {
  left: 0;
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
}
.el-notification-fade-leave-active {
  opacity: 0;
}
.el-notification-fade-leave-active {
  opacity: 0;
}
.el-alert__closebtn.is-customed {
  font-style: normal;
  font-size: 13px;
  top: 9px;
}
.el-notification {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 330px;
  padding: 14px 26px 14px 13px;
  border-radius: 8px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  position: fixed;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  -webkit-transition: opacity 0.3s, left 0.3s, right 0.3s, top 0.4s, bottom 0.3s,
    -webkit-transform 0.3s;
  transition: opacity 0.3s, left 0.3s, right 0.3s, top 0.4s, bottom 0.3s,
    -webkit-transform 0.3s;
  transition: opacity 0.3s, transform 0.3s, left 0.3s, right 0.3s, top 0.4s,
    bottom 0.3s;
  transition: opacity 0.3s, transform 0.3s, left 0.3s, right 0.3s, top 0.4s,
    bottom 0.3s, -webkit-transform 0.3s;
  overflow: hidden;
}
.el-notification.right {
  right: 16px;
}
.el-notification.left {
  left: 16px;
}
.el-notification__group {
  margin-left: 13px;
  margin-right: 8px;
}
.el-notification__title {
  font-weight: 700;
  font-size: 16px;
  color: #303133;
  margin: 0;
}
.el-notification__content {
  font-size: 14px;
  line-height: 21px;
  margin: 6px 0 0;
  color: #606266;
  text-align: justify;
}
.el-notification__content p {
  margin: 0;
}
.el-notification__icon {
  height: 24px;
  width: 24px;
  font-size: 24px;
}
.el-notification__closeBtn {
  position: absolute;
  top: 18px;
  right: 15px;
  cursor: pointer;
  color: #909399;
  font-size: 16px;
}
.el-notification__closeBtn:hover {
  color: #606266;
}
.el-notification .el-icon-success {
  color: #67c23a;
}
.el-notification .el-icon-error {
  color: #f56c6c;
}
.el-notification .el-icon-info {
  color: #909399;
}
.el-notification .el-icon-warning {
  color: #e6a23c;
}
.el-notification-fade-enter.right {
  right: 0;
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}
.el-notification-fade-enter.left {
  left: 0;
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
}
</style>
