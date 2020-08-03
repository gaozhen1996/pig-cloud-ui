<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="search" @click="handleAdd">新建稍后阅读</el-button>
            </div>            
            <!-- 表格版本 -->
            <el-table :data="data" border class="table" stripe>
                <el-table-column prop="createTime" label="创建时间" width="200">
                </el-table-column>
                <el-table-column label="收藏内容">
                    <template slot-scope="scope">
                        <a :href="scope.row.url" target="_blank">{{ scope.row.title}}</a>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 新建弹出框 -->
        <el-dialog title="新建"  :visible.sync="addVisible">
            <el-form ref="obj" :model="obj" label-width="80px">
                <el-form-item label="内容">
                    <el-input v-model="obj.title"></el-input>
                </el-form-item>
                <el-form-item label="链接">
                    <el-input v-model="obj.url"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addVisible=false">取消</el-button>
                <el-button type="primary" @click="saveAdd">保存</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import Global from '../common/Global'
    import axios from 'axios'
    
    export default {
        name: 'basetable',
        data() {
            return {
                addVisible: false,
                delVisible: false,
                tableData: [],
                cur_page: 1,
                total:1000,
                obj:{
                    id:'',
                    createTime:'',
                    title:'',
                    url:''
                },
                idx: -1,
                uid:0,
            }
        },
        created() {
            this.uid=JSON.parse(localStorage.getItem('user')).id;
            this.getData();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
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
                axios.get(Global.baseurl+"/plan-api/web/rest/readlater/listReadlaterByUidAndPaging?uid="+this.uid+"&startRow="
                            +startRow+"&rowSize=10")
                .then((response) => {
                    let code = response.data.code;
                    let responseData = response.data.data;
                    if(code==2){
                        if(responseData.row>0){
                            this.tableData=responseData.data;
                            this.total=responseData.row-1;
                        }
                    }else{
                        this.$message.error('亲，错了哦，出了一点小异常');
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            handleAdd() {
                this.obj={
                    id:'',
                    createTime:'',
                    title:'',
                    url:''
                },
                this.addVisible=true;
            },
            //确认新建
            saveAdd(){
                let request = {"title":this.obj.title,
                               "uid":this.uid,
                               "url":this.obj.url};
                axios.post(Global.baseurl+"/plan-api/web/rest/readlater/addReadlater",request)
                .then(res=>{
                    if(res.data.code==2){
                        this.addVisible=false;
                        this.tableData.unshift(res.data.data);
                        this.$message.success('提交成功！');
                    }else{
                        console.log("新增失败")
                        this.$message.error('亲，错了哦，出了一点小异常');
                    }         
                })
            },                        
            handleDelete(index, row) {
                this.idx = index;
                this.obj=this.tableData[this.idx]
                this.delVisible = true;
            },
            // 确定删除
            deleteRow(){
                let request = {"id":this.obj.id};
                axios.post(Global.baseurl+"/plan-api/web/rest/readlater/deleteNoteById",request)
                .then(res=>{
                    if(res.data.code==2){
                        this.delVisible=false;
                        this.$message.success('删除成功！');
                        this.tableData.splice(this.idx, 1);
                        this.$message.success('删除成功');
                        this.delVisible = false;
                    }else{
                        console.log("删除失败")
                        this.$message.error('亲，错了哦，出了一点小异常');
                    }         
                })
            }
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
