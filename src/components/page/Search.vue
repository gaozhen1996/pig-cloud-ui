<template>
    <div class="wrap"> 
        <!-- 头部 -->
        <div class="header">
            <div class="setting-btn" @click="hrefHome()"></div>
        </div>
        <!-- 搜索框 -->
        <div class="search-div">
            <el-select v-model="value" placeholder="请选择搜索引擎">
                <el-option
                v-for="item in options"
                :key="item.value"
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
        <div class="shortcut">
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
                value: '百度',
                loadwd: [],
                wd: ''
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
                window.location.href='https://www.baidu.com/s?ie=UTF-8&wd='+this.wd;
            },
            hrefHome(){
                this.$router.push('/');
            }
        },
    }
</script>

<style>

    .wrap{
	    height: 100%;
		background-image: url(../../assets/img/bg2.jpg);
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
    .el-input__inner {
        border: none;
        font-size: 20px;
    }

    .el-input--small .el-input__inner{
        text-align: center;
        width:150px;
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
		border-radius: 10px;
		outline: 0;
		background-color: #fff;
        margin: 0 auto
    }

    .header{
        height:150px;
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
</style>