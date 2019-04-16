<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-select v-model="select_cate.status" placeholder="筛选状态" class="handle-select mr10">
                    <el-option key="1" label="已完成" value="1"></el-option>
                    <el-option key="2" label="未完成" value="0"></el-option>
                    <el-option key="3" label="不筛选" value=""></el-option>
                </el-select>
                <el-input v-model="select_cate.word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-date-picker type="date" placeholder="创建日期" v-model="select_cate.date" value-format="yyyy-MM-dd" style="width: 15%;" class="handle-select mr10"></el-date-picker>
                <el-button type="primary" icon="search" @click="getData">搜索</el-button>
            </div>
            <el-table :data="data" border class="table">
                <el-table-column prop="planType" label="类型" sortable width="110">
                </el-table-column>
                <el-table-column prop="content" label="内容" width="400">
                </el-table-column>
                <el-table-column prop="status" label="状态">
                </el-table-column>
                <el-table-column prop="createDate" label="创建日期">
                </el-table-column>
                <el-table-column prop="finishDate" label="计划完成日期">
                </el-table-column>
                <el-table-column prop="actualFinishDate" label="实际完成日期" width="200">
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import Global from '../common/Global'
    import axios from 'axios'
    
    export default {
        name: 'basetable',
        data() {
            return {
                select_cate:{
                    status:'',
                    word:'',
                    date:''
                },
                user:{},
                tableData: [],
                cur_page: 1,
                total:1000,
                plan:{
                    id:'',
                    planType:'',
                    content:'',
                    finishStatus:'',
                    createDate:'',
                    finishDate:'',
                    actualFinishDate:'',
                    publicFlag:''
                },
                idx: -1
            }
        },
        created() {
            this.user = JSON.parse(localStorage.getItem('user'));
            this.getData();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    //type
                    if(d.planType==0){
                       d.planType="重要且紧急"  
                    }else if(d.planType==1){
                        d.planType="重要不紧急" 
                    }else if(d.planType==2){
                        d.planType="紧急但不重要" 
                    }else if(d.planType==3){
                        d.planType="不重要不紧急" 
                    }
                    //status
                    if(d.status){
                        d.status="已完成";
                    }else{
                        d.status="未完成";
                    }
                    return d;
                })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            getData() {
                let startRow=10*(this.cur_page-1);
                var url = Global.baseurl+"/plan-service/web/rest/plan/listByUidAndPaging?uid="
                            +this.user.id+"&startRow="+startRow+"&rowSize=10";
                if(this.select_cate.date==null){
                    this.select_cate.date="";
                }
                url=url+"&sel_status="+this.select_cate.status
                    +"&sel_word="+this.select_cate.word+"&sel_date="+this.select_cate.date;
                console.log(url)
                axios.get(url)
                    .then((response) => {
                        var code = response.data.code;
                        if(code==2){
                        this.tableData=response.data.data.data;
                        this.total=response.data.data.row-1;
                        }else{
                            this.$message.error('亲，错了哦，出了一点小异常');
                        }
                    })
                    .catch(function (error) {
                    console.log(error);
                });
            },

        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
    .center{
        text-align: center;
    }
</style>
