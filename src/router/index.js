import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/planMange',
                    component: resolve => require(['../components/page/PlanManage.vue'], resolve),
                    meta: { title: '计划管理' }
                },
                {
                    path: '/video',
                    component: resolve => require(['../components/page/Video.vue'], resolve),
                    meta: { title: '视频浏览' }
                },
                {
                    path: '/videoManage',
                    component: resolve => require(['../components/page/VideoManage.vue'], resolve),
                    meta: { title: '视频管理' }
                },
                {
                    path: '/roleManage',
                    component: resolve => require(['../components/page/RoleManage.vue'], resolve),
                    meta: { title: '角色管理' }
                },
                {
                    path: '/euraka',
                    component: resolve => require(['../components/page/Euraka.vue'], resolve),
                    meta: { title: 'Euraka服务' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: '消息中心' }
                },
                {
                    path: '/userInfo',
                    component: resolve => require(['../components/page/UserInfo.vue'], resolve),
                    meta: { title: '个人资料' }
                },
                {
                    path: '/editpw',
                    component: resolve => require(['../components/page/Editpw.vue'], resolve),
                    meta: { title: '修改密码' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }    
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }   
                },
                {
                    // userActivity
                    path: '/userActivity',
                    component: resolve => require(['../components/page/UserActivity.vue'], resolve),
                    meta: { title: '活跃日志' }   
                },
                {
                    // note
                    path: '/note',
                    component: resolve => require(['../components/page/Note.vue'], resolve),
                    meta: { title: '笔记' }   
                },
                {
                    // shortcutManage
                    path: '/shortcutManage',
                    component: resolve => require(['../components/page/ShortcutManage.vue'], resolve),
                    meta: { title: '快捷方式' }   
                },
                {
                    // 壁纸设置
                    path: '/bgimage',
                    component: resolve => require(['../components/page/Bgimage.vue'], resolve),
                    meta: { title: '壁纸设置' }   
                },
                {
                    // 稍后阅读
                    path: '/readlater',
                    component: resolve => require(['../components/page/Readlater.vue'], resolve),
                    meta: { title: '稍后阅读' }   
                },                
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/search',
            component: resolve => require(['../components/page/Search.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
