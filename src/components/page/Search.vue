<template>
    <div class="wrap"> 
        <!-- 头部 -->
        <div class="header">
            <div class="setting-btn" @click="hrefHome()"></div>
        </div>

        <!-- 搜索框 -->
        <div class="search-div">
            <el-select v-model="searchEngine" placeholder="请选择搜索引擎">
                <el-option
                v-for="item in options"
                :key="item.label"
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
            <el-row :gutter="20">
                <el-col :span="6" v-for="(element,index) in shortcutList" :key="element.id">
                    <div class="shortcutDiv" @click="hrefIncon(element.url)">
                        <img :src="element.img" class="icon">
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
            }
        },
        methods: {
            loadKeyWord(queryString, cb) {
                this.loadwd = [];
                console.log("queryString:"+queryString);
                if(queryString.indexOf('\\')==-1){
                    let request = {'wd':queryString}
                    axios.post(Global.baseurl+"/auth-api/ProxyBaiduWebRest/loadWd",request)
                    .then(res=>{
                        if(res.data.code==2){
                            let arr=res.data.data;
                            console.log("queryresult:")
                            console.log(arr);
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
                if(this.searchEngine=='Google'){
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
            }
        },
        created(){
            this.shortcutList = Global.shortcutList;
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
        width:150px;
        border-radius: 50px
    }
    .search-div .el-select-dropdown__item{
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

    /* .wrap{
        display: flex; 
	    align-items: center;
	    justify-content: center;
	    height: 100%;
	    font-size: 48px;
		background-image: url(../../assets/img/bg0.jpg);
		background-size:100% 100%;
    } */

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
        background-image: url(../../assets/img/setting.png);
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
        max-width: 70%;
        padding-top: 20px;
        transform: translate3d(0,0,0);
        text-align: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: rgba(255,255,255,.9);
    }

    .el-row {
        margin: 30px;
    }

</style>