<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="search" @click="handleAdd">新建备忘录</el-button>
            </div>
            <el-table :data="data" border class="table">
                <el-table-column prop="title" label="标题" sortable width="250">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="250">
                </el-table-column>
                <el-table-column prop="updateTime" label="最后修改时间">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 修改弹出框 -->
        <el-dialog class="center" :visible.sync="updateVisible" :fullscreen="true">
            <el-form ref="note" :model="note" label-width="80px">
                <el-form-item label="文件名称" >
                    <el-input v-model="note.title"></el-input>
                </el-form-item>  
            </el-form>             
            <quill-editor ref="myTextEditor" v-model="note.content" :options="editorOption"></quill-editor>
            <el-button @click="updateVisible = false">取 消</el-button>
            <el-button class="editor-btn" type="primary" @click="updateNoteById">修改</el-button>
        </el-dialog>

        <!-- 添加弹出框 -->
        <el-dialog class="center" :visible.sync="addVisible" :fullscreen="true">
            <el-form ref="note" :model="note" label-width="80px">
                <el-form-item label="文件名称" >
                    <el-input v-model="note.title"></el-input>
                </el-form-item>  
            </el-form>             
            <quill-editor ref="myTextEditor" v-model="note.content" :options="editorOption"></quill-editor>
            <el-button @click="updateVisible = false">取 消</el-button>
            <el-button class="editor-btn" type="primary" @click="addNote">添加</el-button>
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
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
    import axios from 'axios'
    import Global from '../common/Global'
    
    export default {
        name: 'basetable',
        data() {
            return {
                slectVisible: false,
                updateVisible:false,
                delVisible: false,
                addVisible:false,
                tableData: [],
                cur_page: 1,
                total:1000,
                note:{
                    id:'',
                    uid:'',
                    content:'',
                    createTime:'',
                    fromid:'',
                    title:'新建文件',
                    type:'',
                    updateTime:''
                },                
                video:{
                    id:'',
                    createTime:'',
                    content:'',
                    videoURL:''
                },
                editorOption: {
                    placeholder: ''
                },
                idx: -1
            }
        },
        components: {
            quillEditor
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
                axios.get(Global.baseurl+"/plan-service/web/rest/note/listNoteByUidAndPaging?uid="+this.uid+"&startRow="
                            +startRow+"&rowSize=10")
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
            handleAdd() {
                this.addVisible = true;
            },
            handleUpdate(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.note = item;
                this.updateVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.note = item;
                this.delVisible = true;
            },
            // 确定删除
            deleteRow(){
                let request = {"id":this.note.id};
                axios.post(Global.baseurl+"/plan-service/web/rest/note/deleteNoteById",request)
                .then(res=>{
                    if(res.data.code==2){
                        this.tableData.splice(this.idx, 1);
                        this.$message.success('删除成功');
                        this.delVisible = false;
                    }else{
                        console.log("删除失败")
                        this.$message.error('亲，错了哦，出了一点小异常');
                    }         
                })
            },
            addNote(){
                let request = {"uid":this.uid,"content":this.note.content,
                               "fromid":0,
                               "title":this.note.title};
                axios.post(Global.baseurl+"/plan-service/web/rest/note/addNote",request)
                .then(res=>{
                    if(res.data.code==2){
                        this.addVisible = false;
                        this.tableData.unshift(res.data.data);
                        this.$message.success('提交成功！');
                    }else{
                        console.log("新增失败")
                        this.$message.error('亲，错了哦，出了一点小异常');
                    }         
                })
            },
            updateNoteById(){
                let request = {"id":this.note.id,"content":this.note.content,
                               "title":this.note.title};
                axios.post(Global.baseurl+"/plan-service/web/rest/note/updateNoteById",request)
                .then(res=>{
                    if(res.data.code==2){
                        this.updateVisible = false;
                        this.$message.success('修改成功！');
                    }else{
                        console.log("新增失败")
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
