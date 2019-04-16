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
        <div class="time">{{this.time}}</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
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
                <div class="user-avator"><img src="../../assets/img/img.jpg"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
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
                time:'人生不要错过两样东西：最后一班回家的车和一个深爱你的人',
                collapse: false,
                fullscreen: false,
                name: 'linxin',
                message: 2
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
            dateFilter(date){
                if(date < 10){return "0"+date;}
                return date;
            },          
            getLangDate(){
                var dateObj = new Date(); //表示当前系统时间的Date对象
                var year = dateObj.getFullYear(); //当前系统时间的完整年份值
                var month = dateObj.getMonth()+1; //当前系统时间的月份值
                var date = dateObj.getDate(); //当前系统时间的月份中的日
                var day = dateObj.getDay(); //当前系统时间中的星期值
                var weeks = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
                var week = weeks[day]; //根据星期值，从数组中获取对应的星期字符串
                var hour = dateObj.getHours(); //当前系统时间的小时值
                var minute = dateObj.getMinutes(); //当前系统时间的分钟值
                var second = dateObj.getSeconds(); //当前系统时间的秒钟值
                var timeValue = "" +((hour >= 12) ? (hour >= 18) ? "晚上" : "下午" : "上午" ); //当前时间属于上午、晚上还是下午
                let newDate = this.dateFilter(year)+"年"+this.dateFilter(month)+"月"+this.dateFilter(date)+"日 "+" "+this.dateFilter(hour)+":"+this.dateFilter(minute)+":"+this.dateFilter(second);
                this.time =  newDate+"　"+week;
            },            
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('user')
                    this.$router.push('/login');
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
            }
        },
        mounted(){
            if(document.body.clientWidth < 1200){
                this.collapseChage();
            }
            setInterval(this.getLangDate, 1000);
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

    .time{
        float: left;
        padding: 0 21px;
        line-height: 70px;
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
</style>
