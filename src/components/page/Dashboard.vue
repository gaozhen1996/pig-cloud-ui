<template>
    <div style="height:100%;">
        <el-col :span="11">
            <el-row :span="11">
                <el-card shadow="hover" style="height:95%;">
                    <div slot="header" class="clearfix">
                        <span>{{planTypeNames[0]}}</span>
                        <el-button style="float: right; padding: 3px 0" type="text" v-on:click="handleAdd(0)">添加</el-button>
                        <i class="el-icon-full-screen" style="float: right; padding: 3px 10px;cursor:pointer" v-on:click="handleFullScreen(0)"></i>
                    </div>
                    <div class="scroll">
                        <draggable :list="plans[0]" group="people" @change="log">
                            <div class="text item" v-for="(element) in plans[0]" :key="element.id" @dblclick="showPlan(element)">
                                <el-checkbox v-model="element.status" @change="changeStatus(element)"></el-checkbox>
                                <a class="todo-item" :class="{'del': element.status}">{{element.showContent}}</a>
                                <i class="el-icon-delete update" v-on:click="handleDelete(element)"></i>
                                <i class="el-icon-edit update" v-on:click="handleUpdate(element)"></i>
                                <a class="todo-item update" :class="{'delay': element.delay}">{{element.delayDay}}</a> 
                            </div>
                        </draggable>
                    </div>
                </el-card>
            </el-row>
            <el-row :span="11">
                <el-card shadow="hover" style="height:95%;">
                    <div slot="header" class="clearfix">
                        <span>{{planTypeNames[2]}}</span>
                        <el-button style="float: right; padding: 3px 0" type="text" v-on:click="handleAdd(2)">添加</el-button>
                        <i class="el-icon-full-screen" style="float: right; padding: 3px 10px;cursor:pointer" v-on:click="handleFullScreen(2)"></i>
                    </div>
                    <div class="scroll">
                        <draggable :list="plans[2]" group="people" @change="log">
                            <div class="text item" v-for="(element) in plans[2]" :key="element.id" @dblclick="showPlan(element)">
                                <el-checkbox v-model="element.status" @change="changeStatus(element)"></el-checkbox>
                                <a class="todo-item" :class="{'del': element.status}">{{element.showContent}}</a>
                                <i class="el-icon-delete update" v-on:click="handleDelete(element)"></i>
                                <i class="el-icon-edit update" v-on:click="handleUpdate(element)"></i>
                                <a class="todo-item update" :class="{'delay': element.delay}">{{element.delayDay}}</a> 
                            </div>
                        </draggable> 
                    </div>
                </el-card>
            </el-row>
        </el-col>   

        <el-col :span="11">
            <el-row :span="11">
                <el-card shadow="hover" style="height:95%;">
                    <div slot="header" class="clearfix">
                        <span>{{planTypeNames[1]}}</span>
                        <el-button style="float: right; padding: 3px 0" type="text" v-on:click="handleAdd(1)">添加</el-button>
                        <i class="el-icon-full-screen" style="float: right; padding: 3px 10px;cursor:pointer" v-on:click="handleFullScreen(1)"></i>
                    </div>
                    <div class="scroll">
                        <draggable :list="plans[1]" group="people" @change="log">
                            <div class="text item" v-for="(element) in plans[1]" :key="element.id" @dblclick="showPlan(element)">
                                <el-checkbox v-model="element.status" @change="changeStatus(element)"></el-checkbox>
                                <a class="todo-item" :class="{'del': element.status}">{{element.showContent}}</a>
                                <i class="el-icon-delete update" v-on:click="handleDelete(element)"></i>
                                <i class="el-icon-edit update" v-on:click="handleUpdate(element)"></i>
                                <a class="todo-item update" :class="{'delay': element.delay}">{{element.delayDay}}</a> 
                            </div>
                        </draggable>
                    </div>
                </el-card>
            </el-row>
            <el-row :span="11">
                <el-card shadow="hover" style="height:95%;">
                    <div slot="header" class="clearfix">
                        <span>{{planTypeNames[3]}}</span>
                        <el-button style="float: right; padding: 3px 0" type="text" v-on:click="handleAdd(3)">添加</el-button>
                        <i class="el-icon-full-screen" style="float: right; padding: 3px 10px;cursor:pointer" v-on:click="handleFullScreen(3)"></i>
                    </div>
                    <div class="scroll">
                        <draggable :list="plans[3]" group="people" @change="log">
                            <div class="text item" v-for="(element) in plans[3]" :key="element.id" @dblclick="showPlan(element)">
                                <el-checkbox v-model="element.status" @change="changeStatus(element)"></el-checkbox>
                                <a class="todo-item" :class="{'del': element.status}">{{element.showContent}}</a>
                                <i class="el-icon-delete update" v-on:click="handleDelete(element)"></i>
                                <i class="el-icon-edit update" v-on:click="handleUpdate(element)"></i>
                                <a class="todo-item update" :class="{'delay': element.delay}">{{element.delayDay}}</a> 
                            </div>
                        </draggable> 
                    </div>
                </el-card>
            </el-row>
        </el-col>   

        <!-- 时间选择 -->
        <el-col :span="2">
            <el-row style="height:98%;">
                <el-card shadow="hover" style="height:100%;text-align:center;line-height:60px">
                    <el-button type="primary" icon="el-icon-arrow-up" circle v-on:click="toNextDay(-1)"></el-button>
                    <h1 style="color: #909399">今日事 今日毕</h1>
                    <el-button type="primary" icon="el-icon-arrow-down" circle v-on:click="toNextDay(1)"></el-button>
                </el-card>
            </el-row>
        </el-col> 

        <!-- 全屏框 -->
        <el-dialog class="fullScreenDiv" title="全屏显示" :visible.sync="fullScreenVisible" fullscreen>
            <el-card shadow="hover" style="height:600px;">
                <div slot="header" class="clearfix">
                    <span>{{planTypeNames[fullScreenPalnType]}}</span>
                    <i class="el-icon-close" style="float: right; padding: 3px 0px;cursor:pointer" @click="fullScreenVisible = false"></i>
                    <el-button style="float: right; padding: 3px 10px" type="text" v-on:click="handleAdd(fullScreenPalnType)">添加</el-button>
                </div>
                <div class="scroll" style="height:500px;">
                    <draggable :list="plans[fullScreenPalnType]" group="people" @change="log">
                        <div class="text item" v-for="(element) in plans[fullScreenPalnType]" :key="element.id" @dblclick="showPlan(element)">
                            <el-checkbox v-model="element.status" @change="changeStatus(element)"></el-checkbox>
                            <a class="todo-item" :class="{'del': element.status}">{{element.content}}</a>
                            <i class="el-icon-delete update" v-on:click="handleDelete(element)"></i>
                            <i class="el-icon-edit update" v-on:click="handleUpdate(element)"></i>
                            <a class="todo-item update" :class="{'delay': element.delay}">{{element.delayDay}}</a> 
                        </div>
                    </draggable>
                </div>
            </el-card>
        </el-dialog>  

        <!-- 查看提示框 -->
        <el-dialog title="查看" :visible.sync="showVisible" width="500px">
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
        </el-dialog>  

        <!-- 添加提示框 -->
        <el-dialog title="添加" :visible.sync="addVisible" width="500px">
            <el-form ref="form" :model="plan" label-width="100px">
                <el-form-item label="计划内容">
                    <el-input v-model="plan.content" @keyup.enter.native="addPlan()"></el-input>
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
    import Global from '../common/Global'

    export default {
    display: "Plan",
    order: 1,
    components: {
        draggable
    },
    data() {
        return {
            showVisible:false,
            addVisible: false,
            delVisible: false,
            updateVisible:false,
            fullScreenVisible:false,
            uid:'',
            today:'',
            changeDay:0,//上一天，下一天
            plan: {},
            plans:[],
            lastArrLen: [],
            // planTypeNames:['重要且紧急','重要不紧急','紧急但不重要','不重要不紧急'], //计划类型名称
            planTypeNames:['今日计划','学习目标','长期目标','项目计划'], //计划类型名称
            fullScreenPalnType:0,//默认计划类型
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
            axios.get(Global.baseurl+"/plan-api/web/rest/plan/getPlansGroupType?today="+this.today+"&uid="+this.uid)
                .then((response) => {
                    var code = response.data.code;
                    if(code==200){
                        this.plans = response.data.data;
                        /**
                         * 1.添加过期标识
                         * 2.检查内容长度
                         * 3.填充lastArrLen,lastArrLen这个字段主要是在移动数据的时候，判断误拖拽的时候用
                         **/
                        for(let i = 0;i<4;i++){
                            let tArr = this.plans[i];
                            this.lastArrLen[i]=tArr.length;
                            for(let j =0 ; j<tArr.length;j++){
                                let tPlan = tArr[j];
                                //完成1.添加过期标识2.检查内容长度的方法
                                tPlan = this.planToShowPlan(tPlan);
                            }
                        }
                    }else if(code==401){
                        // this.$router.push('/login');
                    }else{
                        this.$message.error('亲，获取计划错了哦，出了一点小异常，请联系维护人员');
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
                axios.post(Global.baseurl+"/plan-api/web/rest/plan/updatePlanType",request)
                .then(res=>{
                    if(res.data.code==200){
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
                    axios.post(Global.baseurl+"/plan-api/web/rest/plan/updatePlanType",request)
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
            this.planToShowPlan(element);
            let request = {"id":element.id,"status":element.status};
            axios.post(Global.baseurl+"/plan-api/web/rest/plan/updatePlanStatus",request)
            .then(res=>{
                if(res.data.code==2){
                    // this.getPlansGroupType();
                }else{
                    console.log("修改状态失败")
                    this.$message.error('亲，错了哦，出了一点小异常,请刷新试试哟！');
                }         
            })

        },
        handleFullScreen:function(planType){
            this.fullScreenVisible = true;
            this.fullScreenPalnType = planType;
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
            axios.post(Global.baseurl+"/plan-api/web/rest/plan/addPlan",request)
            .then(res=>{
                if(res.data.code==200){
                    var obj = res.data.data;
                    obj = this.planToShowPlan(obj);
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
            axios.post(Global.baseurl+"/plan-api/web/rest/plan/deletePlanById",request)
            .then(res=>{
                if(res.data.code==200){
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
            axios.post(Global.baseurl+"/plan-api/web/rest/plan/updateNonEmptyPlanById",request)
            .then(res=>{
                if(res.data.code==200){
                    this.$message.success('修改成功');
                    this.plan = this.planToShowPlan(this.plan);
                    // this.getPlansGroupType();
                    this.initPlan();
                }else{
                    console.log("修改失败")
                    this.$message.error('亲，错了哦，出了一点小异常');
                }         
            })
            this.updateVisible = false;
        },
        //弹出详细信息
        showPlan(element){
            this.plan=element;
            this.showVisible = true;
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
        },
        //plan对象转化为需要显示的plan对象
        planToShowPlan(obj){
            //1.添加过期标识
            let dateStart = new Date(this.today);
            let dateEnd = new Date(obj.finishDate);
            let difValue = ((dateEnd - dateStart) / (1000 * 60 * 60 * 24));
            if(obj.status==false){
                if(difValue>0){
                    obj.delay = false;
                    obj.delayDay = "剩余"+difValue+"天";
                }else if(difValue == 0){
                    obj.delay = false;
                    obj.delayDay = "今天需完成";
                }else{
                    obj.delay = true;
                    obj.delayDay = "延期"+(-difValue)+"天";
                }               
            }else{
                obj.delay = false;
                obj.delayDay = "";
            }
            //2.检查内容长度
            if(obj.content.length>20){
                obj.showContent = obj.content.substring(0,20)+"......"
            }else{
                obj.showContent = obj.content
            }
            return obj;
        }

    }
    };

</script>
<style>
    .fullScreenDiv .el-dialog{
        background-color:aliceblue;
    }

    .fullScreenDiv .el-dialog__header{
        display:none;
    }

</style>

<style scoped>
    .el-row {
        margin: 5px;
        height: 50%;
    }

    .el-col{
        height: 100%;
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

    .delay {
        color: red;
    }  

    .update {
        float:right;
        margin-right: 5px;
    }

    .scroll {
        width: 100%;
        height: 24vh;
        overflow: auto;
    }
</style>
