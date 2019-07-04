<template>
    <div class='container'>
        <el-row :gutter="20">
            <el-col :span="6">
                <span>当前</span>
                <el-image :src="currbg"></el-image>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6" v-for="(element,index) in bgs" :key="element.name">
                <span>{{element.name}}</span>
                <el-image :src="element.path" @click="saveBgimage('public',element.id)">
                </el-image>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <span>自定义</span>
                <el-input v-model="selfpath"></el-input>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'upload',
        data: function(){
            return {
                selfpath:'',
                currbg:require('../../assets/img/bg0.jpg'),
                bgs:[{name:'默认',path:require('@/assets/img/bg0.jpg'),id:1}
                    ,{name:'深思',path:require('@/assets/img/深思.jpg'),id:2}
                    ,{name:'海岸',path:require('@/assets/img/海岸.jpg'),id:3}]
            }
        },
        components: {
        },
        methods:{
            saveBgimage(type,path) {
                if(type=='public'){
                    var bgimage = {type:'public',id:path}
                    localStorage.setItem('bgimage',bgimage);
                    if(path==2){
                        this.currbg = require('@/assets/img/深思.jpg')
                    }else if(path==3){
                        this.currbg = require('@/assets/img/海岸.jpg')
                    }else{
                        this.currbg = require('@/assets/img/bg0.jpg')
                    }
                }else{
                    
                }
            },
        },
        created(){
            
        }
    }
</script>

<style scoped>
    .block{
        width: 300px;
    }
    
    .el-row {
        margin-bottom: 20px;
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }    
</style>