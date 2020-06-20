<template>
    <div class="wrap" :style="{backgroundImage:'url('+currbg+')'}"> 
        <!-- 头部 -->
        <div class="header">
            <div class="setting-btn" @click="hrefHome()"></div>
        </div>

        <!-- 搜索框 -->
        <div class="search-div">
            <el-select v-model="searchEngine" placeholder="请选择搜索引擎" @change="changeEngine()">
                <el-option
                v-for="item in options"
                :key="item.vaule"
                :label="item.label"
                :value="item.value">
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                
                </el-option>
            </el-select>

            <el-autocomplete
                class="search-input"
                size="large"
                v-model="wd"
                style=" borde:none"
                :fetch-suggestions="loadKeyWord"
                placeholder="输入并搜索..."
                :trigger-on-focus="false"
                @keyup.enter.native="searchWord()"
            ></el-autocomplete>
        </div> 

        <!-- 快捷方式 -->
        <div class="shortcutListDiv">
            <el-row :gutter="10">
                <el-col :span="6" v-for="(element) in shortcutList" :key="element.id">
                    <div v-if="element.rflag" class="shortcutDiv" @click="hrefIncon(element.url)">
                        <img :src="element.img" class="icon">
                        <div class="icon-name">{{element.name}}</div>
                    </div>     
                    <div v-if="!element.rflag" class="shortcutDiv" @click="hrefIncon(element.url)">
                        <div class="icon" :style="element.img">{{element.iconname}}</div>
                        <div class="icon-name">{{element.name}}</div>
                    </div>                      
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Global from '../common/Global'
    export default {
        data: function(){
            return {
                options: [{
                    value: '百度',
                    label: 'Baidu'
                    }, {
                    value: '谷歌',
                    label: 'Google'
                }],
                searchEngine: 'Google',
                loadwd: [],//动态提示
                wd: '',//搜索关键字
                shortcutList:[],
                user:{},
                currbg:'img/bg0.e6f83dd1.jpg'
            }
        },
        methods: {
            loadKeyWord(queryString, cb) {
                this.loadwd = [];
                if(queryString.indexOf('\\')==-1){
                    let request = {'wd':queryString}
                    let user = JSON.parse(localStorage.getItem('user'));
                    request.account = user.account;
                    axios.post(Global.baseurl+"/auth-api/ProxyBaiduWebRest/loadWd",request)
                    .then(res=>{
                        if(res.data.code==2){
                            let arr=res.data.data;
                            for(let i=0;i<arr.length;i++){
                                let obj = { "value": arr[i].q}
                                this.loadwd.push(obj);
                            }
                        }
                    })
                }
                // 调用 callback 返回建议列表的数据
                cb(this.loadwd);
            },
            searchWord() {
                if(this.searchEngine=='Google' || this.searchEngine=='谷歌'){
                    window.location.href='https://www.google.com/search?q='+this.wd;
                }else{
                    window.location.href='https://www.baidu.com/s?ie=UTF-8&wd='+this.wd;
                }
            },
            hrefHome(){
                this.$router.push('/');
            },
            hrefIncon(url){
                window.location.href=url;
            },
            getUserInfo(){
                var request = {};
                // request.outIp = returnCitySN["cip"];
                // request.city = returnCitySN["cname"];
                let user = JSON.parse(localStorage.getItem('user'));
                this.user = user;
                request.account = user.account;
                request.id = user.id;
                axios.post(Global.baseurl+"/auth-api/userWebRest/currentInfo",request)
                    .then(res=>{
                })
            },
            changeEngine(){
                if(this.searchEngine=='百度'){
                    localStorage.setItem('searchEngine','Baidu');
                }else if(this.searchEngine=='谷歌'){
                    localStorage.setItem('searchEngine','Google');
                }else{
                    //暂无
                }
            },
            getShortcutList(){
                //首先获取缓存里面的快捷方式,避免闪屏
                let temp = localStorage.getItem('shortcutList');
                if(temp!=null){
                    this.shortcutList = JSON.parse(temp);
                }
                axios.get(Global.baseurl+"/plan-api/web/rest/chortcut/selectChortcutByUid?uid="+this.user.id)
                    .then((response) => {
                        var code = response.data.code;
                        if(code==2){
                            this.shortcutList = [];
                            var list = response.data.data;
                            for(let i=0;i<list.length;i++){
                                let shortcut = list[i];
                                if(shortcut.relation!=0){
                                    let obj = {
                                        id:shortcut.id,                        
                                        img:require('../../assets/img/'+shortcut.imgUrl),
                                        name:shortcut.name,
                                        url:shortcut.url,
                                        rflag:true,
                                    }
                                    this.shortcutList.push(obj);
                                }else{
                                    let obj = {
                                        id:shortcut.id,                        
                                        img:"background-color:"+shortcut.imgUrl,
                                        name:shortcut.name,
                                        iconname:shortcut.name.substring(0,5),
                                        url:shortcut.url,
                                        rflag:false,
                                    }
                                    //汉字放2位长度就满了，字母可以放5位
                                    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
                                    if(reg.test(shortcut.name)){
                                        obj.iconname = shortcut.name.substring(0,2);
                                    }else{
                                        obj.iconname = shortcut.name.substring(0,5);
                                    }
                                    this.shortcutList.push(obj);
                                } 
                                localStorage.setItem('shortcutList',JSON.stringify(this.shortcutList));              
                            }
                        }else{
                            this.$message.error('亲，获取快捷方式错了哦，出了一点小异常,请联系管理员');
                        }
                    })
                    .catch(function (error) {
                    console.log(error);
                });

            }
        },
        created(){
            this.getUserInfo();
            this.getShortcutList();
            let searchEngine = localStorage.getItem('searchEngine')
            if(searchEngine != null){
                this.searchEngine = searchEngine;
            }
            // 获取背景
            let currbg = localStorage.getItem('bgimage');
            if(currbg!=null){
                this.currbg = currbg;
            }
        }
    }
</script>

<style>
    .search-div .el-input__inner {
        border: none;
        font-size: 20px;
    }

    .search-div .el-input--small .el-input__inner{
        text-align: center;
        border-radius: 50px
    }

    .search-div .el-select{
        width:20%;
    }

    .search-div .el-autocomplete{
        width: 77%;
        font-size: 20px;
    }

    .shortcutListDiv{
        width: 70%;
        margin: 0 auto;
    }

    .shortcutDiv{
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        width: calc(100%/5);
        align-items: center;
        padding: 10px;
    }
</style>
<style scoped>

    .wrap{
	    height: 100%;
		background-image: url(../../assets/img/bg0.jpg);
		background-size:100% 100%;
    }

    .search-div{
        font-size: 20px;
		font-weight: 300;
		line-height: 62px;
		box-sizing: border-box;
		width: 50%;
		height: 62px;
		padding-right: 0px;
		padding-left: 0px;
		color: #555;
		border: none;
		border-radius: 50px;
		outline: 0;
		background-color: #fff;
        margin: 0 auto
    }

    .header{
        height:130px;
        background-color: #242f4200;
    }

    .setting-btn {
        position: fixed;
        z-index: 100;
        top: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        cursor: pointer;
        transition: background-color ease .35s;
        border-radius: 50%;
        background-color: rgba(0,0,0,.3);
        background-image: url(../../assets/img/home.png);
        background-repeat: no-repeat;
        background-position: center;
    }

    .icon{   
        font-size: 28px;
        display: flex;
        width: 100px;
        height: 100px;
        cursor: pointer;
        transition: transform .2s linear;
        transform: translate3d(0,0,0);
        letter-spacing: 1px;
        color: #fff;
        border-radius:27%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        box-shadow: 2px 2px 20px rgba(0,0,0,.06);
        justify-content: center;
        align-items: center;
    }

    .icon-name{
        font-size: 15px;
        overflow: hidden;
        box-sizing: border-box;
        max-width: 300%;
        padding-top: 20px;
        transform: translate3d(0,0,0);
        text-align: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: rgba(255,255,255,.9);
        font-family: 'PingFang SC', "Helvetica Neue", "microsoft yahei", arial, STHeiTi, sans-serif;
    }

    .el-row {
        margin: 30px;
    }

</style>