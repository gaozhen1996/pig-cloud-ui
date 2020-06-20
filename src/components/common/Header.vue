<template>
    <div class="header">
        <!-- logo -->
        <transition name="el-zoom-in-center" >
            <div class="logo1" v-if="this.collapse" :style="{background:this.upDownStruct?'#ffffff':'#000000'}">
                <font>PLAN</font>
        </div>
        </transition>
        <transition name="el-zoom-in-center">
            <div class="logo2" v-if="!this.collapse" :style="{background:this.upDownStruct?'#ffffff':'#000000'}">
                <font>计划助手</font>
            </div>
        </transition>
        <!-- 折叠按钮,左右结构显示-->
        <div class="collapse-btn" v-if="!this.upDownStruct" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div> 
         <!-- 菜单start,上下结构显示 -->
        <div class="menu" v-if="this.upDownStruct">
            <el-menu  class="sidebar-el-menu" mode="horizontal" :default-active="onRoutes" :collapse="collapse" 
                text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
                <template v-for="item in menu">
                    <template v-if="item.subs">
                        <el-submenu :index="item.index" :key="item.index">
                            <template slot="title">
                                <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                            </template>
                            <template v-for="subItem in item.subs">
                                <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                    <template slot="title">{{ subItem.title }}</template>
                                    <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                        {{ threeItem.title }}
                                    </el-menu-item>
                                </el-submenu>
                                <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                    {{ subItem.title }}
                                </el-menu-item>
                            </template>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.index" :key="item.index">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </el-menu-item>
                    </template>
                </template>
            </el-menu> 
        </div>
        <!-- 菜单end -->
        <!-- 诗句，左右结构显示 -->
        <div class="saying" v-if="!this.upDownStruct">{{this.saying}}</div>
        <!-- 右侧工具start -->
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 跳转搜索页 -->
                 <div class="search">
                    <i class="el-icon-search" @click="hrefSearch()"></i>
                </div>               
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator"><img :src="defaultSrc"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided  command="toUserInfo">个人资料</el-dropdown-item>
                        <el-dropdown-item divided  command="editpw">修改密码</el-dropdown-item>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <!-- 右侧工具end -->
    </div>
</template>
<script>
    import bus from '../common/bus';
    import axios from 'axios'
    import Global from '../common/Global'

    export default {
        data() {
            return {
                saying:'人生不要错过两样东西：最后一班回家的车和一个深爱你的人',
                collapse: false,
                fullscreen: false,
                upDownStruct:false,
                name: 'gz',
                message: 0, //消息
                defaultSrc:require('../../assets/img/img.jpg'),
                menu:[]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            },
            username(){
                let user = JSON.parse(localStorage.getItem('user'));
                let username = user.name ? user.name : user.account;
                return username ? username : this.name;
            }
        },
        methods:{
            setSaying(){
                let index=Math.floor(Math.random()*10);
                this.saying =  Global.sayings[index];
            },            
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('user')
                    localStorage.removeItem('Authorization')
                    this.$router.push('/login');
                }else if(command == 'toUserInfo'){
                    this.$router.push('userInfo');
                }else if(command == 'editpw'){
                    this.$router.push('editpw');
                }
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
                // this.myCollapse = !this.myCollapse
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            },
            hrefSearch(){
                this.$router.push('/search');
            }
        },
        mounted(){
            if(document.body.clientWidth < 1000){
                this.collapseChage();
            }
            /**
             * 通知Home调整侧边栏
             */
            bus.$emit('upDownStruct', this.upDownStruct);
            /**
             * 填充诗句,左右结构显示
             */
            if(!this.upDownStruct){
                this.setSaying();
            }
            //获取用户头像
            let user = JSON.parse(localStorage.getItem('user'));
            if(user.logo!=undefined){
                this.defaultSrc=user.logo;
            }
            /**
             * 获取菜单只从缓存中取
             */
            let cacheMenu = JSON.parse(localStorage.getItem('menu'));
            if(cacheMenu != null){
                this.menu = cacheMenu;
            } 
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 60px;
        font-size: 22px;
        /* color: #000000; */
        background:#ffffff
    }

    .header .logo1 {
        float: left;
        width:64px;
        line-height: 60px;
        text-align: center;
    }

    .header .logo1 font{
        color: white;
    }
    .header .logo2 {
        float: left;
        width:200px;
        line-height: 60px;
        text-align: center;
    }
    .header .logo2 font{
        /* color: white; */
        color: #bfcbd9;
    }


    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }

    .saying{
        float: left;
        padding: 0 21px;
        line-height: 60px;
        color:#7B7B7B
    }

    .menu{
        float: left;
        padding: 0px;
    }

    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 60px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        margin-right: 5px;
        font-size: 24px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #000000;
    }
    .btn-bell .el-icon-bell{
        color: #000000;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #000000;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }

    .search{
        margin-right: 5px;
        font-size: 24px;
        cursor: pointer;
    }
</style>
