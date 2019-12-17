<template>
    <div class="table">
        <div class="container">
            <el-row :gutter="20">

                <el-col :span="12">
                    <el-table :data="data" stripe class="table">
                        <el-table-column prop="id" label="id" sortable width="70">
                        </el-table-column>
                        <el-table-column prop="name" label="我的快捷方式" >
                        </el-table-column>
                        <el-table-column label="操作" width="180" align="center">
                            <template slot-scope="scope">
                                <el-button v-if="scope.row.relation==0" type="text" icon="el-icon-edit" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
                                <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>  

                <el-col :span="12">
                    <el-table :data="systemShortcuts" stripe class="table">
                        <el-table-column prop="id" label="id" sortable width="70">
                        </el-table-column>
                        <el-table-column prop="name" label="系统快捷方式" >
                        </el-table-column>
                        <el-table-column label="操作" width="180" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" icon="el-icon-plus" @click="saveAdd(scope.$index, scope.row)">加入</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>  

            </el-row>   


            
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑"  :visible.sync="updateVisible">
            <el-form ref="form" :model="shortcut" label-width="80px">
                <el-form-item label="id">
                    <el-input v-model="shortcut.id" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="shortcut.name"></el-input>
                </el-form-item>
                <el-form-item label="URL">
                    <el-input v-model="shortcut.url"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updateVisible=false">取消</el-button>
                <el-button type="primary" @click="saveUpdate">保存</el-button>
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
                updateVisible: false,
                delVisible: false,
                tableData: [],
                systemShortcuts:[],
                cur_page: 1,
                total:1000,
                shortcut:{
                    id:'',
                    name:'',
                    url:'',
                },
                user:{},
            }
        },
        created() {
            this.user = JSON.parse(localStorage.getItem('user'));
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
                axios.get(Global.baseurl+"/plan-api/web/rest/chortcut/selectChortcutByUid?uid="+this.user.id)
                    .then((response) => {
                        var code = response.data.code;
                        if(code==200){
                            this.tableData=response.data.data;
                            this.total=1;
                        }else{
                            this.$message.error('亲，获取用户快捷方式错了哦，出了一点小异常');
                        }
                    })
                    .catch(function (error) {
                    console.log(error);
                });

                axios.get(Global.baseurl+"/plan-api/web/rest/chortcut/selectSystemChortcutByUid?uid="+this.user.id)
                    .then((response) => {
                        var code = response.data.code;
                        if(code==200){
                            this.systemShortcuts=response.data.data;
                            this.total=1;
                        }else{
                            this.$message.error('亲，获取系统快捷方式错了哦，出了一点小异常');
                        }
                    })
                    .catch(function (error) {
                    console.log(error);
                });
            },
            handleUpdate(index, row) {
                this.shortcut = this.tableData[index];
                this.updateVisible = true;
            },
            handleDelete(index, row) {
                this.shortcut.id = row.id;
                this.delVisible = true;
            },
            // 确定删除
            deleteRow(){
                let request = {id:this.shortcut.id}
                axios.post(Global.baseurl+"/plan-api/web/rest/chortcut/deleteChortcut",request)
                .then(res=>{
                    this.updateVisible = false;
                    if(res.data.code==2){
                        this.getData();
                        this.$message.success('删除成功');
                        this.delVisible = false;
                    }else{
                        console.log(res.data.msg)
                        this.$message.error('亲，错了哦，出了一点小异常,请联系维护人员');
                    }         
                })
            },
            saveUpdate(){
                let request = {
                    id:this.shortcut.id,
                    name:this.shortcut.name,
                    url:this.shortcut.url
                };
                axios.post(Global.baseurl+"/plan-api/web/rest/chortcut/updateChortcut",request)
                .then(res=>{
                    this.updateVisible = false;
                    if(res.data.code==2){
                        this.updateVisible = false;
                        this.$message.success('修改成功');
                    }else{
                        console.log(res.data.msg)
                        this.$message.error('亲，错了哦，出了一点小异常,请联系维护人员');
                    }         
                })
            },
            saveAdd(index, row){
                let request = {
                    relation:row.id,
                    uid:this.user.id,
                    color:''
                };
                axios.post(Global.baseurl+"/plan-api/web/rest/chortcut/addChortcut",request)
                .then(res=>{
                    this.updateVisible = false;
                    if(res.data.code==2){
                        this.getData();
                        this.$message.success('删除成功');
                    }else{
                        console.log(res.data.msg)
                        this.$message.error('亲，错了哦，出了一点小异常,请联系维护人员');
                    }         
                })
            }
        },
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 100px;
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
