<template>
    <div class="table">
        <div class="container">
            <el-table :data="data" border class="table">
                <el-table-column prop="id" label="id" sortable width="70">
                </el-table-column>
                <el-table-column prop="createTime" label="时间" width="200">
                </el-table-column>
                <el-table-column prop="content" label="内容">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-caret-right" @click="handleSelect(scope.$index, scope.row)">查询</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 查看弹出框 -->
        <el-dialog class="center" :visible.sync="slectVisible" :before-close="closeSelect" :fullscreen="true">
            <video :src="video.videoURL" height="520" controls="controls" autoplay="autoplay">
                您的浏览器不支持 video 标签。
            </video>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closeSelect">关闭</el-button>
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
                slectVisible: false,
                delVisible: false,
                tableData: [],
                cur_page: 1,
                total:1000,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                video:{
                    id:'',
                    createTime:'',
                    content:'',
                    videoURL:''
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
                let startRow=10*(this.cur_page-1)+1;
                axios.get(Global.baseurl+"/video-api/web/rest/videoInfo/getVideoInfoByPage?startRow="
                            +startRow+"&rowSize=10")
                .then((response) => {
                    var code = response.data.code;
                    if(code==0){
                       this.tableData=response.data.data;
                       this.total=response.data.count-1;
                       console.log(this.tableData);
                    }else{
                        this.$message.error('亲，错了哦，出了一点小异常');
                    }
                })
                .catch(function (error) {
                console.log(error);
            });

            },
            handleSelect(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.video = {
                    id:item.id,
                    createTime:item.createTime,
                    content:item.content,
                    videoURL:item.videoURL
                }
                this.slectVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            //关闭视频遮藏
            closeSelect(){
                this.video.videoURL="";
                this.slectVisible = false;
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
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
