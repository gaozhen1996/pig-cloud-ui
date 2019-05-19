<template>
    <div class="header">
        <transition name="el-zoom-in-center">
            <div class="logo1" v-if="this.collapse"><font>PLAN</font></div>
        </transition>
        <transition name="el-zoom-in-center">
            <div class="logo2" v-if="!this.collapse"><font>后台管理系统</font></div>
        </transition>
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="saying">{{this.saying}}</div>
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
                    <i class="el-icon-location" @click="hrefSearch()"></i>
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
                name: 'gz',
                message: 0, //消息
                defaultSrc:require('../../assets/img/img.jpg')
            }
        },
        computed:{
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
            if(document.body.clientWidth < 1200){
                this.collapseChage();
            }
            //填充诗句
            this.setSaying();
            //获取用户头像
            let user = JSON.parse(localStorage.getItem('user'));
            if(user.logo!=undefined){
                this.defaultSrc=user.logo;
            }
            // setInterval(this.setSaying, 1000);
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #000000;
        background:#F8F8F8
    }

    .header .logo1 {
        float: left;
        width:64px;
        line-height: 70px;
        background:#000000;
        text-align: center;
    }

    .header .logo1 font{
        color: white;
    }
    .header .logo2 {
        float: left;
        width:250px;
        line-height: 70px;
        background:#000000;
        text-align: center;
    }
    .header .logo2 font{
        color: white;
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
        line-height: 70px;
        color:#7B7B7B
    }


    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
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
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
        cursor: pointer;
    }
</style>
