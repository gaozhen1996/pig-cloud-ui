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
                    // chart
                    path: '/wormConfig',
                    component: resolve => require(['../components/page/WormConfig.vue'], resolve),
                    meta: { title: '爬虫控制' }   
                },
                {
                    // note
                    path: '/note',
                    component: resolve => require(['../components/page/Note.vue'], resolve),
                    meta: { title: '笔记' }   
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
            path: '*',
            redirect: '/404'
        }
    ]
})
