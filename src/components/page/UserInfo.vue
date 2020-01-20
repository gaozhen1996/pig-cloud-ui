<template>
    <div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="userInfo" label-width="80px">
                    <el-form-item label="账号">
                        <el-input v-model="userInfo.account" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="userInfo.name"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                        <div class="crop-demo">
                            <img :src="cropImg" class="pre-img">
                            <div class="crop-demo-btn">选择图片
                                <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage"/>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="userInfo.sex">
                            <el-radio label="我是小哥哥"></el-radio>
                            <el-radio label="我是小姐姐"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveUserInfo">提交保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        
            <!-- 裁剪头像弹出层 -->
            <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%">
                <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" style="width:100%;height:300px;"></vue-cropper>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelCrop">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import VueCropper  from 'vue-cropperjs';
    import axios from 'axios'
    import Global from '../common/Global'

    export default {
        name: 'upload',
        data: function(){
            return {
                defaultSrc: require('../../assets/img/img.jpg'),
                imgSrc: '',
                cropImg: '',
                dialogVisible: false,
                userInfo: {
                    id:'',
                    account:'',
                    name: '',
                    sex:'我是小哥哥',
                }

            }
        },
        components: {
            VueCropper
        },
        methods:{
            setImage(e){
                const file = e.target.files[0];
                if (!file.type.includes('image/')) {
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.dialogVisible = true;
                    this.imgSrc = event.target.result;
                    this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
            },
            cropImage () {
                this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
            },
            cancelCrop(){
                this.dialogVisible = false;
                this.cropImg = this.defaultSrc;
            },
            saveUserInfo(){
                let request = {
                    userId:this.userInfo.id,
                    name:this.userInfo.name,
                    sex:this.userInfo.sex=="我是小哥哥"?0:1,
                    logo:this.cropImg
                }
                axios.post(Global.baseurl+"/auth-api/userWebRest/updateUserById",request)
                .then(res=>{
                    if(res.data.code==2){
                        this.$message.success('修改成功!请重新登录');
                        this.$router.push('/login');
                    }else{
                        this.$message.error(res.data.msg);
                    }         
                })

            }
        },
        created(){
            //填充基本信息
            let user = JSON.parse(localStorage.getItem('user'));
            this.userInfo = {
                id:user.id,
                account:user.account,
                name: user.name,
                sex:user.sex==0?'我是小哥哥':'我是小姐姐',
            };
            //获取用户头像
            if(user.logo!=undefined){
                this.defaultSrc=user.logo;
            }
            this.cropImg = this.defaultSrc;
        },
    }
</script>

<style scoped>
    .pre-img{   
        width: 100px;
        height: 100px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 5px;
    }
    .crop-demo{
        display: flex;
        align-items: flex-end;
    }
    .crop-demo-btn{
        position: relative;
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .crop-input{
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
</style>