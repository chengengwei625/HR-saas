import router from './router'
import store from './store'
import { Message } from 'element-ui' // 消息提示框
import NProgress from 'nprogress' // 进度条插件
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // getToken方法
import getPageTitle from '@/utils/get-page-title' // 拿到获取标题的方法拼接后面settings里的title(用于设置浏览器标签栏上的title)

NProgress.configure({ showSpinner: false }) // 环形进度隐藏

const whiteList = ['/login'] // 不需要重定向的白名单

router.beforeEach(async(to, from, next) => { // 路由全局前置守卫
  NProgress.start() // 当路由页面切换时, 显示进度条

  document.title = getPageTitle(to.meta.title) // 用路由信息拿出设置浏览器标签栏上标题

  const hasToken = getToken() // 获取token

  if (hasToken) { // 如果有token
    if (to.path === '/login') { // 还想要去登录页面, 阻止下来
      next({ path: '/' })
      NProgress.done() // 关闭进度条
    } else { // 去其他页面
      const hasGetUserInfo = store.getters.name // 尝试提取用户信息从vuex
      if (hasGetUserInfo) { // 如果有放行
        next()
      } else { // 进行网络请求
        try {
          // get user info
          await store.dispatch('user/getInfo')

          next()
        } catch (error) { // 如果请求失败(例如401/报错, 返回登录页面, 清除本地token)
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else { // 如果没有token, 要去的路径是白名单里的
    if (whiteList.indexOf(to.path) !== -1) { // 正常放行
      // in the free login whitelist, go directly
      next()
    } else { // login页面带上之前未遂地址
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => { // 路由跳转成功, 关闭进度条
  NProgress.done()
})
