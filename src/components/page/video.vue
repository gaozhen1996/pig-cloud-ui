<template>
    <div class="table">
        <div class="container">
            <el-row :gutter="20">
                <!-- 表格 -->
                <el-col :span="12">
                    <div>
                        <el-table :data="data" border class="table" @row-click="handleSelect">
                            <el-table-column prop="content" label="内容">
                            </el-table-column>
                        </el-table>
                        
                        <div class="pagination">
                            <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
                            </el-pagination>
                        </div>
                    </div>
                </el-col>
                <!-- video -->
                <el-col :span="12" class="center">
                    <div v-if="slectVisible">
                        <h3 class="center">{{video.content}}</h3>
                        <h3 class="center">{{video.createTime}}</h3>
                        <video :src="video.videoURL" height="500" autoplay="autoplay">
                            您的浏览器不支持 video 标签。
                        </video>
                        <el-form>
                            <el-button type="primary" @click="next()">下一个</el-button>
                            <el-button type="primary" @click="closeSelect">关闭</el-button>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </div>

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
                let startRow=10*(this.cur_page-1);
                axios.get(Global.baseurl+"/video-api/web/rest/videoInfo/getVideoInfoByPage?startRow="
                            +startRow+"&rowSize=10")
                .then((response) => {
                    var code = response.data.code;
                    if(code==0){
                       this.tableData=response.data.data;
                       this.total=response.data.count-1;
                    }else{
                        this.$message.error('亲，错了哦，出了一点小异常');
                    }
                })
                .catch(function (error) {
                console.log(error);
            });

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
            },
            next(){
                this.idx = this.idx+1;
                if(this.idx>=this.tableData.length){
                    this.cur_page++;
                    this.handleCurrentChange(this.cur_page);
                    this.idx = 0;
                }
                const item = this.tableData[this.idx];
                this.video = item;
                
            },
            handleSelect(row, event, column) {
                this.video = {
                    id:row.id,
                    createTime:row.createTime,
                    content:row.content,
                    videoURL:row.videoURL
                }
                this.slectVisible = true;
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
