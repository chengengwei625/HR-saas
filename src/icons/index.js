import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally-全局注册svg-icon名字组件(在登录页面使用)
Vue.component('svg-icon', SvgIcon)

// 为了自动引入svg/所有.svg文件(被webpack打包处理)-输出到浏览器
// svg标签中use, 使用对应名字即可显示图标
const req = require.context('./svg', false, /\.svg$/) // 返回一个引入函数
const requireAll = requireContext => { // requireContext就是req
  console.log(requireContext.keys())// 数组里面是所有引入的文件相对路径
  requireContext.keys().map(requireContext) // 把req函数里所有路径取出, 再用这个函数自己本身执行引入注册所有.svg图标
}
requireAll(req)

// 这块代码意思可以看这里: https://juejin.cn/post/6844903517564436493#heading-9
