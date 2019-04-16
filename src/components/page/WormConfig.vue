<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card shadow="hover" style="height:350px;">
                    <div slot="header" class="clearfix">
                        <span>最近一周爬取个数</span>
                    </div>
                    <div id="main" style="height:300px;"></div>
                </el-card>
            </el-col>
            <el-col :span="24">
                <el-card shadow="hover" style="height:250px;">
                    <div slot="header" class="clearfix">
                        <span>用户数量</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>

    </div>
  
</template>
<script>
import echarts from 'echarts'
import axios from 'axios'
import Global from '../common/Global'

export default {
    data() {
        return {
            today:'',
        }
    },
    mounted() {
        this.today=this.getNowFormatDate(0);
        this.createChart1();
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
            for(let i=-6;i<=0;i++){
                chartData.xdata.push(this.getNowFormatDate(i).substring(5,10));
            }
            var date = this.getNowFormatDate(-6);
            axios.get(Global.baseurl+"/video-service/web/rest/videoInfo/selectCountGreaterDate?date="+date)
                .then((response) => {
                    console.log(response)
                    var code = response.data.code;
                    if(code==2){
                        let less = 7-response.data.data.length;
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

    }

}
</script>
 <style>
  .el-col {
    margin-top: 10px;
  }
</style>