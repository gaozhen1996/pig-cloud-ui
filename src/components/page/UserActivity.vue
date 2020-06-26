<template>
  <!--    <div style="height:100%;">
        <el-col :span="12">
            <el-row :span="11">
                <el-card shadow="hover" style="height:95%;">
                    <div slot="header" class="clearfix">
                    </div>
                    <div id="totalDailyChart" style="30%;"></div>
                </el-card>
            </el-row>
            <el-row :span="11">
                <el-card shadow="hover" style="height:95%;">
                    <div slot="header" class="clearfix">
                    </div>
                    <div class="scroll">
                    </div>
                </el-card>
            </el-row>
        </el-col>   

        <el-col :span="12">
            <el-row :span="11">
                <el-card shadow="hover" style="height:95%;">
                    <div slot="header" class="clearfix">
                    </div>
                    <div class="scroll">
     
                    </div>
                </el-card>
            </el-row>
            <el-row :span="11">
                <el-card shadow="hover" style="height:95%;">
                    <div slot="header" class="clearfix">
                    </div>
                    <div class="scroll">
                     
                    </div>
                </el-card>
            </el-row>
        </el-col> -->         
      <el-row :gutter="10">
            <el-col :span="24">
                <el-card shadow="hover" style="height:350px;">
                    <div slot="header" class="clearfix">
                        <span>最近一周访问趋势</span>
                    </div>
                    <div id="totalDailyChart" style="height:300px"></div>
                </el-card>
            </el-col>
            <el-col :span="24">
                <el-card shadow="hover" style="height:95%;">
                    <div slot="header" class="clearfix">
                        <span>一天详细访问用户</span>
                    </div> 
                    <div id="detailDailyChart" style="height:300px"></div>
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
            newTabDetailCounts:[]
        }
    },
    mounted() {
        this.today=this.getNowFormatDate(0);
        this.createTotalDailyChart();
    },
    methods: {
        chartTotalDailyConfig(chartData,createDetailDailyChart) {
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
                            name: '次',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series:chartData.ydata
            };

            var myChart = echarts.init(document.getElementById('totalDailyChart'));
		    myChart.on('click', function(param) {
                //创建改日期详细图表
                createDetailDailyChart(param.name);
			});               
            myChart.setOption(option);
            return option;     
        },
        detailDailyChart(chartData) {
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
                            name: '次',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series:chartData.ydata
            };

            var myChart = echarts.init(document.getElementById('detailDailyChart'));            
            myChart.setOption(option);
            return option;     
        },     
        createTotalDailyChart(){
            var chartData = {
                "legend":['访问次数'],
                "xdata":[],
                "ydata":{
                        name:'访问次数',
                        type:'line',
                        data:[]
                }

            };
            var currDate = this.getNowFormatDate(1);
            var before7Date = this.getNowFormatDate(-7);
            axios.get(Global.baseurl+"/auth-api/userActivityRest/listNewTabCountByDate?startDate="+before7Date+"&endDate="+currDate)
                .then((response) => {
                    var code = response.data.code;
                    if(code==2){
                        let data = response.data.data;
                        chartData.xdata = data.total_x;
                        chartData.ydata.data = data.total_y;
                        this.chartTotalDailyConfig(chartData,this.createDetailDailyChart);
                        //详细newTab数据
                        this.newTabDetailCounts = data.newTabDetailCounts;
                    }else{
                        this.$message.error('亲，错了哦，出了一点小异常');
                    }
                })
                .catch(function (error) {
                console.log(error);
            });
        },
        createDetailDailyChart(date){
            let chartData = {
                "legend":['访问次数'],
                "xdata":[],
                "ydata":{
                        name:'访问次数',
                        type:'bar',
                        data:[]
                }

            };            
            for(let i = 0;i< this.newTabDetailCounts.length;i++){
                let newTabCount = this.newTabDetailCounts[i];
                if(newTabCount.strDate==date){
                    chartData.xdata.push(newTabCount.account);
                    chartData.ydata.data.push(newTabCount.count);
                }
            }
            this.detailDailyChart(chartData);
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
        }

    }

}
</script>
 <style>
  .el-col {
    margin-top: 10px;
  }
</style>