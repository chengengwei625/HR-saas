<template>
  <!-- $listeners可以把事件传递给子组件
    更多看这里: https://www.jb51.net/article/132371.htm
    如果是外链用div显示
   -->
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
  <!-- 针对浏览器识别读取内容时, aria-hidden为true不然浏览器读出这个标签 -->
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal } from '@/utils/validate'

export default {
  name: 'SvgIcon',
  props: {
    iconClass: { // icon字体类名
      type: String,
      required: true
    },
    className: { // 类名
      type: String,
      default: ''
    }
  },
  computed: {
    // 判断是否为外链地址
    isExternal() {
      return isExternal(this.iconClass)
    },
    // 字体图标名字-svg绘制图形的id选择器
    iconName() {
      return `#icon-${this.iconClass}`
    },
    // 返回svg类名
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className // 如果有字体图标类名, 返回字体样式
      } else {
        return 'svg-icon'
      }
    },
    // 外链蒙层样式控制器
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor; /*当前标签color值继承/父级color */
  mask-size: cover!important;
  display: inline-block;
}
</style>
