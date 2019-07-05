<template>
    <div class='container'>
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
                <el-image :src="element.path" @click="saveBgimage(element.path)">
                </el-image>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <span>自定义:</span>
                <el-input v-model="selfpath" @change="saveBgimage(selfpath)" placeholder="如果您想自定义背景，请填入图片的全路径，如：F:\asd.jpeg"></el-input>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'upload',
        data: function(){
            return {
                currbg:'img/bg0.e6f83dd1.jpg',
                selfpath:'',
                bgs:[{name:'默认',path:require('@/assets/img/bg0.jpg')}
                    ,{name:'深思',path:require('@/assets/img/深思.jpg')}
                    ,{name:'海岸',path:require('@/assets/img/海岸.jpg')}],
            }
        },
        methods:{
            saveBgimage(path) {
                localStorage.setItem('bgimage',path);
                this.currbg = path;     
            },
        },
        created(){
            // 获取背景
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