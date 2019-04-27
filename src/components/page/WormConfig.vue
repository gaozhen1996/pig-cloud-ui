<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card shadow="hover" style="height:350px;">
                    <div slot="header" class="clearfix">
                        <span>最近一个月爬取个数</span>
                    </div>
                    <div id="main" style="height:300px;"></div>
                </el-card>
            </el-col>
            <el-col :span="24">
                <el-card shadow="hover" style="height:250px;">
                    <div slot="header" class="clearfix">
                        <span>爬虫总控</span>
                    </div>
                    <el-form ref="form" :model="wormInfo" label-width="80px">
                        <el-row>
                            <el-col :span="8">
                                <div>
                                    <el-form-item label="URL">
                                        <el-input v-model="wormInfo.url" style="width:250px"></el-input>
                                    </el-form-item> 
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div>
                                    <el-form-item label="爬取数量">
                                        <el-select v-model="wormInfo.num" placeholder="请选择爬取数量">
                                        <el-option label="1" value="1"></el-option>
                                        <el-option label="2" value="2"></el-option>
                                        <el-option label="3" value="3"></el-option>
                                        <el-option label="5" value="5"></el-option>
                                        <el-option label="10" value="10"></el-option>
                                        <el-option label="20" value="20"></el-option>
                                        </el-select>
                                    </el-form-item>   
                                
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <div>
                                    <el-form-item label="自动爬取">
                                        <el-switch v-model="wormInfo.autoFlag"></el-switch>
                                    </el-form-item> 
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div>
                                    <el-form-item label="">
                                        <el-button type="primary" @click="getWormInfo">取消</el-button>
                                        <el-button type="primary" @click="setWormInfo">确认</el-button>
                                    </el-form-item>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <div>
                                    <el-form-item label="爬去数量">
                                        <el-input v-model="num" style="width:300px"></el-input>
                                    </el-form-item>
                                </div>
                            </el-col> 
                            <el-col :span="12">
                                <div>
                                    <el-button type="primary" @click="startWorm">开始爬取</el-button>
                                </div>
                            </el-col> 
                        </el-row>
                    </el-form>                   
                </el-card>
            </el-col>
        </el-row>

    </div>
  
</template>
<script>
import echarts from 'echarts'
import axios from 'axios'
import Global from '../common/Global'
import { Loading } from 'element-ui';

export default {
    data() {
        return {
            today:'',
            wormInfo:{
                autoFlag:true,
                num:0,
                url:""
            },
            num:1//手工爬取数量
        }
    },
    mounted() {
        this.today=this.getNowFormatDate(0);
        this.createChart1();
        this.getWormInfo();
    },
    methods: {
        ChartConfig(chartData) {
            let option= {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['bar','line']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data:chartData.legend
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: chartData.xdata,
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '个',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series:chartData.ydata
            };

            var myChart = echarts.init(document.getElementById('main'));
            myChart.setOption(option);
            return option;     
        },
        createChart1(){
            var chartData = {
                "legend":['爬取个数'],
                "xdata":[],
                "ydata":{
                        name:'爬取个数',
                        type:'line',
                        data:[]
                }

            };
            for(let i=-29;i<=0;i++){
                chartData.xdata.push(this.getNowFormatDate(i).substring(5,10));
            }
            var date = this.getNowFormatDate(-29);
            axios.get(Global.baseurl+"/video-api/web/rest/videoInfo/selectCountGreaterDate?date="+date)
                .then((response) => {
                    var code = response.data.code;
                    if(code==2){
                        let less = 30-response.data.data.length;
                        if(less>0){
                            for(let i = 0 ; i<less ; i++){
                                response.data.data.push(0);
                            }
                        }
                        chartData.ydata.data = response.data.data;
                        this.ChartConfig(chartData);
                    }else{
                        this.$message.error('亲，错了哦，出了一点小异常');
                    }
                })
                .catch(function (error) {
                console.log(error);
            });
        },
        getNowFormatDate(changeDay){
            var date = new Date();
            date.setDate(date.getDate()+changeDay)
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            return currentdate;
        },
        getWormInfo(){
            axios.get(Global.baseurl+"/worm-api/web/rest/setting/getWormInfo")
                .then((response) => {
                    var code = response.data.code;
                    if(code==2){
                        this.wormInfo = response.data.data;
                    }else{
                        this.$message.error('亲，错了哦，出了一点小异常');
                    }
                })
                .catch(function (error) {
                console.log(error);
            });            
        },
        setWormInfo(){
            axios.get(Global.baseurl+"/worm-api/web/rest/setting/setWormInfo?flag="+this.wormInfo.autoFlag
                        +"&num="+this.wormInfo.num+"&url="+this.wormInfo.url)
                .then((response) => {
                    var code = response.data.code;
                    if(code==2){
                        this.$message.success('设置成功');
                    }else{
                        this.$message.error('亲，错了哦，出了一点小异常');
                    }
                })
                .catch(function (error) {
                console.log(error);
            });            
        },
        startWorm(){
            let options = {};
            let loadingInstance = Loading.service(options);
            axios.get(Global.baseurl+"/worm-api/worm/"+this.num)
                .then((response) => {
                    this.$nextTick(() => {
                        loadingInstance.close();
                    });
                    this.$message.success(response.data);
                    // const h = this.$createElement;
                    // this.$notify({
                    // title: '爬取结果',
                    // message: h('i', { style: 'color: teal'},response.data)
                    // });
                    console.log(response.data)
                })
                .catch(function (error) {
                console.log(error);
            });             
        }
    }

}
</script>
 <style>
  .el-col {
    margin-top: 10px;
  }
</style>