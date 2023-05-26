import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { store } from '../store'
import layout from '../layout/index.vue'
// 静态路由
export const constantRoutes: Array<RouteRecordRaw> = [

  {
    path: '/',
    component: layout,
    redirect: '/raceConfig',
    meta: {
      title: {
        '/zh-CN': '比赛配置',
        '/en-US': 'Race Config'
      },
      icon: 'iconfont  icon-5'
    },
    children: [
      {
        path: '/raceConfig',
        name: 'raceConfig',
        component: () => import(/* webpackChunkName: "home" */ '@/views/raceConfig/index.vue'),
        meta: {
          title: {
            '/zh-CN': '比赛配置',
            '/en-US': 'Race Config'
          },
          icon: 'iconfont icon-5'
        }
      }
    ]
  },

  {
    path: '/largeScreenConfig',
    component: layout,
    meta: {
      title: {
        '/zh-CN': '大屏配置',
        '/en-US': 'Large Screen Config'
      },
      icon: 'iconfont icon-dapingpeizhi'
    },
    children: [
      {
        path: '/largeScreenConfig',
        name: 'LargeScreenConfig',
        component: () => import('@/views/largeScreenConfig/index'),
        meta: {
          title: {
            '/zh-CN': '大屏配置',
            '/en-US': 'Large Screen Config'
          },
          icon: 'iconfont icon-dapingpeizhi'
        },
      },
    ],
  },
  {
    path: '/exportList',
    component: layout,
    meta: {
      title: {
        '/zh-CN': '导出名单',
        '/en-US': 'Export List'
      },
      icon: 'iconfont icon-jurassic_export-form'
    },
    children: [
      {
        path: '/exportList',
        name: 'ExportList',
        component: () => import('@/views/exportList/index'),
        meta: {
          title: {
            '/zh-CN': '导出名单',
            '/en-US': 'Export List'
          },
          icon: 'iconfont icon-jurassic_export-form'
        },
      },
    ],
  },
  {
    path: '/gradeModification',
    component: layout,
    meta: {
      title: {
        '/zh-CN': '成绩修改',
        '/en-US': 'Grade Modification'
      },
      icon: 'iconfont icon-chengji'
    },
    children: [
      {
        path: '/gradeModification',
        name: 'GradeModification',
        component: () => import('@/views/gradeModification/index'),
        meta: {
          title: {
            '/zh-CN': '成绩修改',
            '/en-US': 'Grade Modification'
          },
          icon: 'iconfont icon-chengji'
        },
      },
    ],
  },

  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login/index.vue'),
    meta: {
      title: {
        '/zh-CN': '登录',
        '/en-US': 'Login'
      },
      hidden: true,
      hiddenTab: true
    }
  },
  {
    path: '/noFound',
    name: 'NoFound',
    component: () => import(/* webpackChunkName: "noFound" */ '@/views/noFound.vue'),
    meta: {
      title: {
        '/zh-CN': '404',
        '/en-US': '404'
      },
      hidden: true,
      hiddenTab: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "noFound" */ '@/views/noFound.vue'),
    meta: {
      title: {
        '/zh-CN': '未找到',
        '/en-US': 'NOT FOUND'
      },
      hidden: true,
      hiddenTab: true
    }
  }
]

// 异步路由
// 异步路由
export const asyncRoutes: Array<RouteRecordRaw> = [

]
const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  scrollBehavior: () => ({
    top: 0
  }),
  routes: constantRoutes
})
router.beforeEach((to, from, next) => {
  const options = ['login'];
  // 登录校验
  if (!options.includes(to.name)) {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = router.resolve({
        name: 'login',
      }).href;
    }
  }

  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})

export default router
