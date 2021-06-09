<template>
    <div class="table">
        <div class="container">
            <!-- 表格版本 -->
            <el-table :data="data" border class="table">
                <el-table-column prop="roleId" label="id" sortable width="70">
                </el-table-column>
                <el-table-column prop="roleName" label="名称" width="200">
                </el-table-column>
                <el-table-column prop="roleDetail" label="详细">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑"  :visible.sync="updateVisible">
            <el-form ref="form" :model="from" label-width="80px">
                <el-form-item label="id">
                    <el-input v-model="from.roleId" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="roleName">
                    <el-input v-model="from.roleName" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="roleDetail">
                    <el-input v-model="from.roleDetail" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="权限">
                    <el-tag
                    :key="tag"
                    v-for="tag in from.permission"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                    {{tag}}
                    </el-tag>
                    <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>                
                </el-form-item>
                <el-form-item label="菜单">
                    <el-input class="textarea" type="textarea" v-model="from.menu"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updateVisible=false">取消</el-button>
                <el-button type="primary" @click="saveUpdate">保存</el-button>
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
                inputVisible: false,
                inputValue: '',
                tableData: [],
                cur_page: 1,
                total:1,
                from:{
                    roleId:'',
                    roleName:'',
                    roleDetail:'',
                    permission:'',
                    menu:''
                },
                idx: -1
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    if(d.permission == null){
                        d.permission = [];
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
                axios.get(Global.baseurl+"/auth-api/userWebRest/listAllRole")
                    .then((res) => {
                        var code = res.data.code;
                        if(code==Global.status_success){
                            this.tableData=res.data.data;
                        }else{
                            if(res.data.msg!=null){
                                this.$message.error(Global.message.error+res.data.msg);
                            }else{
                                this.$message.error(Global.message.error);
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                });
            },
            handleUpdate(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.from = {
                    roleId:item.roleId,
                    roleName:item.roleName,
                    roleDetail:item.roleDetail,
                    permission:item.permission,
                    menu:item.menu
                };
                this.updateVisible = true;
            },
            saveUpdate(){
                let request={
                    roleId:this.from.roleId,
                    permission:this.from.permission,
                    menu:this.from.menu
                }
                axios.post(Global.baseurl+"/auth-api/userWebRest/updateRoleById",request)
                .then(res=>{
                    this.updateVisible = false;
                    if(res.data.code==2){
                        this.$message.success('修改成功');
                    }else{
                        if(res.data.msg!=null){
                            this.$message.error(Global.message.error+res.data.msg);
                        }else{
                            this.$message.error(Global.message.error);
                        }
                    }         
                })
            },
            handleClose(tag) {
                this.from.permission.splice(this.from.permission.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.from.permission.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .table{
        width: 100%;
        font-size: 14px;
    }
    .mr10{
        margin-right: 10px;
    }
    .center{
        text-align: center;
    }

    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

    .el-textarea__inner{
        height: 100px;
    }

</style>
