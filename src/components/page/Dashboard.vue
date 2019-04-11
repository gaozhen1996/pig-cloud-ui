<template>
    <div>
        <el-col :span="11">
            <el-row :span="11">
                <el-card shadow="hover" style="height:300px;">
                    <div slot="header" class="clearfix">
                        <span>重要且紧急</span>
                        <el-button style="float: right; padding: 3px 0" type="text" v-on:click="handleAdd(0)">添加</el-button>
                    </div>
                    <div class="scroll">
                        <draggable :list="plans[0]" group="people" @change="log">
                            <div class="text item" v-for="(element) in plans[0]" :key="element.id">
                                <el-checkbox v-model="element.status" @change="changeStatus(element)"></el-checkbox>
                                <a class="todo-item" :class="{'del': element.status}">{{element.content}}</a>
                                <i class="el-icon-delete update" v-on:click="handleDelete(element)"></i>
                                <i class="el-icon-edit update" v-on:click="handleUpdate(element)"></i>
                            </div>
                        </draggable>
                    </div>
                </el-card>
            </el-row>
            <el-row :span="11">
                <el-card shadow="hover" style="height:300px;">
                    <div slot="header" class="clearfix">
                        <span>紧急但不重要</span>
                        <el-button style="float: right; padding: 3px 0" type="text" v-on:click="handleAdd(2)">添加</el-button>
                    </div>
                    <div class="scroll">
                        <draggable :list="plans[2]" group="people" @change="log">
                            <div class="text item" v-for="(element) in plans[2]" :key="element.id">
                                <el-checkbox v-model="element.status" @change="changeStatus(element)"></el-checkbox>
                                <a class="todo-item" :class="{'del': element.status}">{{element.content}}</a>
                                <i class="el-icon-delete update" v-on:click="handleDelete(element)"></i>
                                <i class="el-icon-edit update" v-on:click="handleUpdate(element)"></i>
                            </div>
                        </draggable> 
                    </div>
                </el-card>
            </el-row>
        </el-col>   

        <el-col :span="11">
            <el-row :span="11">
                <el-card shadow="hover" style="height:300px;">
                    <div slot="header" class="clearfix">
                        <span>重要不紧急</span>
                        <el-button style="float: right; padding: 3px 0" type="text" v-on:click="handleAdd(1)">添加</el-button>
                    </div>
                    <div class="scroll">
                        <draggable :list="plans[1]" group="people" @change="log">
                            <div class="text item" v-for="(element) in plans[1]" :key="element.id">
                                <el-checkbox v-model="element.status" @change="changeStatus(element)"></el-checkbox>
                                <a class="todo-item" :class="{'del': element.status}">{{element.content}}</a>
                                <i class="el-icon-delete update" v-on:click="handleDelete(element)"></i>
                                <i class="el-icon-edit update" v-on:click="handleUpdate(element)"></i>
                            </div>
                        </draggable>
                    </div>
                </el-card>
            </el-row>
            <el-row :span="11">
                <el-card shadow="hover" style="height:300px;">
                    <div slot="header" class="clearfix">
                        <span>不重要不紧急</span>
                        <el-button style="float: right; padding: 3px 0" type="text" v-on:click="handleAdd(3)">添加</el-button>
                    </div>
                    <div class="scroll">
                        <draggable :list="plans[3]" group="people" @change="log">
                            <div class="text item" v-for="(element) in plans[3]" :key="element.id">
                                <el-checkbox v-model="element.status" @change="changeStatus(element)"></el-checkbox>
                                <a class="todo-item" :class="{'del': element.status}">{{element.content}}</a>
                                <i class="el-icon-delete update" v-on:click="handleDelete(element)"></i>
                                <i class="el-icon-edit update" v-on:click="handleUpdate(element)"></i>
                            </div>
                        </draggable> 
                    </div>
                </el-card>
            </el-row>
        </el-col>   

        <!-- 时间选择 -->
        <el-col :span="2">
            <el-row>
                <el-card shadow="hover" style="height:605px;text-align:center;line-height:60px">
                    <el-button type="primary" icon="el-icon-arrow-up" circle v-on:click="toNextDay(-1)"></el-button>
                    <h1 style="color: #909399">今日事 今日毕</h1>
                    <el-button type="primary" icon="el-icon-arrow-down" circle v-on:click="toNextDay(1)"></el-button>
                </el-card>
            </el-row>
        </el-col> 


        <!-- 添加提示框 -->
        <el-dialog title="编辑" :visible.sync="addVisible" width="500px">
            <el-form ref="form" :model="plan" label-width="100px">
                <el-form-item label="计划内容">
                    <el-input v-model="plan.content"></el-input>
                </el-form-item>
                <el-form-item label="创建日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="plan.createDate" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="完成日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="plan.finishDate" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="addPlan">确 定</el-button>
            </span>
        </el-dialog>  

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deletePlan">确 定</el-button>
            </span>
        </el-dialog>


        <!-- 修改提示框 -->
        <el-dialog title="编辑" :visible.sync="updateVisible" width="500px">
            <el-form ref="form" :model="plan" label-width="100px">
                <el-form-item label="计划内容">
                    <el-input v-model="plan.content"></el-input>
                </el-form-item>
                <el-form-item label="创建日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="plan.createDate" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="完成日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="plan.finishDate" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateVisible = false">取 消</el-button>
                <el-button type="primary" @click="updatePlan">确 定</el-button>
            </span>
        </el-dialog>  

    </div>

</template>

<script>
    import draggable from 'vuedraggable'
    import axios from 'axios'

    export default {
    display: "Plan",
    order: 1,
    components: {
        draggable
    },
    data() {
        return {
            addVisible: false,
            delVisible: false,
            updateVisible:false,
            uid:'',
            today:'',
            changeDay:0,//上一天，下一天
            // url:"http://47.94.131.201:9050/plan-service/web/rest",
            url:"http://47.94.131.201:8081/web/rest",
            plan: {},
            plans:[],
            lastArrLen: [],
        };
    },
    mounted: function () {
        //init
        this.today=this.getNowFormatDate();
        this.initPlan();
        this.uid=JSON.parse(localStorage.getItem('user')).id;
        //获取plan数据
        this.getPlansGroupType();
    },    
    methods: {
        getPlansGroupType: function(){
            axios.get(this.url+"/plan/getVideoInfoByPage?today="+this.today+"&uid="+this.uid)
                .then((response) => {
                    var code = response.data.code;
                    if(code==2){
                       this.plans = response.data.data;
                       this.lastArrLen = response.data.lastArrLen;
                    }else{
                        this.$message.error('亲，错了哦，出了一点小异常');
                    }
                })
                .catch(function (error) {
                console.log(error);
            });

        },
        log: function(evt) {
            if(evt.moved!=undefined){
                /**
                 * 不需要修改类别
                 */
                let request = {"id":evt.moved.element.id,"uid":evt.moved.element.uid,
                               "newType":evt.moved.element.planType,
                               "oldType":evt.moved.element.planType,
                               "newIndex":evt.moved.newIndex,"oldIndex":evt.moved.oldIndex};
                axios.post(this.url+"/plan/updatePlanType",request)
                .then(res=>{
                    if(res.data.code==2){
                        this.getPlansGroupType();
                    }else{
                        console.log("移动失败")
                        this.$message.error('亲，错了哦，出了一点小异常');
                    }         
                })
            }else{
                /**
                 * 需要修改类别  
                 */
                //修改后的list的length
                var currlength = [this.plans[0].length,this.plans[1].length
                                ,this.plans[2].length,this.plans[3].length];
                /**
                 * 获取变化的索引
                 */
                var addIndex = -1;
                var removeIndex = -1;
                for(var i = 0;i<this.lastArrLen.length;i++){
                    if(this.lastArrLen[i]<currlength[i]){
                        addIndex = i;
                    }else if(this.lastArrLen[i]>currlength[i]){
                        removeIndex = i;
                    }else{
                        //没有变化
                    }
                }
                //last=curr
                this.lastArrLen=currlength;
                if(addIndex==-1 && removeIndex==-1){
                    //没有变化
                }else{
                    //发送请求
                    let request = {"id":evt.added.element.id,"uid":evt.added.element.uid,
                                   "newType":addIndex,"oldType":removeIndex,
                                   "newIndex":evt.added.newIndex,"oldIndex":evt.added.element.planIndex};
                    axios.post(this.url+"/plan/updatePlanType",request)
                    .then(res=>{
                        if(res.data.code==2){
                            this.getPlansGroupType();
                        }else{
                            console.log("移动失败")
                            this.$message.error('亲，错了哦，出了一点小异常');
                        }         
                    })
                }
            }

        },
        changeStatus:function(element){
            
            let request = {"id":element.id,"status":element.status};
            console.log(request)
            axios.post(this.url+"/plan/updatePlanStatus",request)
            .then(res=>{
                if(res.data.code==2){
                   
                }else{
                    console.log("修改状态失败")
                    this.$message.error('亲，错了哦，出了一点小异常');
                }         
            })

        },
        handleAdd: function(planType) {
            this.plan.planType=planType;
            this.addVisible = true;           
        },
        handleDelete(element) {
            this.plan=element;
            this.delVisible = true;
        },
        handleUpdate(element){
            this.plan=element;
            this.updateVisible=true;
        },
        addPlan() {
            this.addVisible=false;
            
            let request = {"uid":this.uid , 
                           "createDate":this.plan.createDate,
                           "finishDate":this.plan.finishDate,
                           "planIndex":this.plans[this.plan.planType].length,
                           "planType":this.plan.planType,
                           "content":this.plan.content};
            axios.post(this.url+"/plan/addPlan",request)
            .then(res=>{
                if(res.data.code==2){
                    var obj = res.data.data;
                    console.log(obj)
                    this.plans[obj.planType].push(obj);
                    this.initPlan();
                }else{
                    console.log("添加失败")
                    this.$message.error('亲，错了哦，出了一点小异常');
                }         
            })
        },
        // 确定删除
        deletePlan(){
            let request = {"id":this.plan.id,
                           "uid":this.plan.uid,
                           "planType":this.plan.planType,
                           "planIndex":this.plan.planIndex};
            axios.post(this.url+"/plan/deletePlanById",request)
            .then(res=>{
                if(res.data.code==2){
                    this.$message.success('删除成功');
                    this.getPlansGroupType();
                }else{
                    console.log("删除失败")
                    this.$message.error('亲，错了哦，出了一点小异常');
                }         
            })
            this.delVisible = false;
        },
        updatePlan(){
            let request = this.plan;
            console.log(request)
            axios.post(this.url+"/plan/updateNonEmptyPlanById",request)
            .then(res=>{
                if(res.data.code==2){
                    this.$message.success('修改成功');
                    // this.getPlansGroupType();
                    this.initPlan();
                }else{
                    console.log("修改失败")
                    this.$message.error('亲，错了哦，出了一点小异常');
                }         
            })
            this.updateVisible = false;
        },
        toNextDay(num){
            this.changeDay+=num;
            this.today = this.getNowFormatDate(this.changeDay)
            this.$message.info("当前选择日期:"+this.today);
            this.getPlansGroupType();
            this.initPlan();
        },
        //获取当前日期
        getNowFormatDate(){
            var date = new Date();
            date.setDate(date.getDate()+this.changeDay)
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
        initPlan(){
            this.plan={
                id:'',
                uid:'',
                planType:'',
                planIndex:'',
                content: '',
                createDate:this.getNowFormatDate(),
                finishDate:this.getNowFormatDate(),
            }
        }

    }
    };

</script>

<style scoped>
    .el-row {
        margin: 5px;
    }

    .text {
        font-size: 14px;
        border-bottom:1px solid #a1a1a152;
        padding: 10px;
    }

    .del {
        text-decoration: line-through;
        color: #999;
    }

    .update {
        float:right;
    }

    .scroll {
        width: 100%;
        height: 180px;
        overflow: auto;
    }
</style>
