<template>
    <div>
        <!-- 设置结构：左右还是上下  -->
        <el-row :gutter="10">
            <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>结构设置</span>
            </div>
            <div class="text item">
            <template>
                <div>
                    <p>修改请刷新之后即可看到效果</p>
                    <el-radio v-model="upDownStruct" label="true" border  @change="saveUpDownStruct">上下结构</el-radio>
                    <el-radio v-model="upDownStruct" label="false" border @change="saveUpDownStruct">左右结构</el-radio>
                </div>
            </template>  
            </div>
            </el-card>
        </el-row>
        <!-- 背景设置start -->
        <el-row :gutter="10">
            <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>背景设置</span>
            </div>
            <div  class="text item">
                <el-row>
                    <p>提示：此处壁纸是搜索界面的背景的缩略图</p>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <span>当前：</span>
                        <div class='img' :style="{backgroundImage:'url('+currbg+')'}"></div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">   
                    <el-col :span="6" v-for="(element) in bgs" :key="element.name">
                        <span>{{element.name}}</span>
                        <el-image :src="element.path" @click="saveBgimage(0,element.path)">
                        </el-image>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <span>自定义:</span>
                        <el-input v-model="selfpath" @change="saveBgimage(1,selfpath)" placeholder="如果您想自定义背景，请填入图片的全路径，如：F:\asd.jpeg"></el-input>
                    </el-col>
                </el-row>      
            </div>
            </el-card>
        </el-row>
        <!-- 背景设置end -->
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                upDownStruct:true,
                currbg:'img/bg0.e6f83dd1.jpg',
                selfpath:'',
                bgs:[{name:'默认',path:require('@/assets/img/bg0.jpg')}
                    ,{name:'深思',path:require('@/assets/img/深思.jpg')}
                    ,{name:'海岸',path:require('@/assets/img/海岸.jpg')}],
            }
        },
        methods:{
            saveBgimage(type,path) {
                let currBgPath = path.trim();
                if(currBgPath!=''){
                    if(type == 1){
                        currBgPath = currBgPath.replace(/\\/g, '/');
                    } 
                    localStorage.setItem('bgimage',currBgPath);
                    this.currbg = currBgPath; 
                }
            },
            saveUpDownStruct(){
                localStorage.setItem('upDownStruct',this.upDownStruct);
            }
        },
        created(){
            /**
             * 1.获取结构
             */
            this.upDownStruct = localStorage.getItem('upDownStruct');
            /**
             * 2.获取背景 
             */
            let currbg = localStorage.getItem('bgimage');
            if(currbg!=null){
                this.currbg = currbg;
            }
        }
    }
</script>

<style scoped>
	.img{
	    width: 239.25px;
        height: 139.58px;
        background-size:100% 100%;
	}
    
    .el-row {
        margin-bottom: 20px;
    }
    .el-col {
        border-radius: 4px;
    }
    
</style>