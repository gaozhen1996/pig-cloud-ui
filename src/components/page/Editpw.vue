<template>
    <div>
        <div class="container">

            <div class="form-box">
                <el-form ref="form" :model="userInfo" label-width="80px">
                    <el-form-item label="账号">
                        <el-input v-model="userInfo.account" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input type="password" v-model="userInfo.passwd"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input type="password" v-model="userInfo.passwdCheck"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="savePasswd">提交保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Global from '../common/Global'

    export default {
        name: 'upload',
        data: function(){
            return {
                userInfo: {
                    userId:'',
                    passwd:'',
                    passwdCheck: '',
                }

            }
        },
        methods:{
            savePasswd(){
                if(this.userInfo.passwd!=''){
                    if(this.userInfo.passwd==this.userInfo.passwdCheck){
                        // 发送请求
                        let request = this.userInfo;
                        axios.post(Global.baseurl+"/auth-api/userWebRest/updatePasswdById",request)
                        .then(res=>{
                            if(res.data.code==200){
                                this.$message.success('修改成功!请重新登录');
                                this.$router.push('/login');
                            }else{
                                this.$message.error(res.data.msg);
                            }         
                        })
                    }else{
                      this.$message.error("两次密码不一致"); 
                    }
                }else{
                   this.$message.error("密码不能为空"); 
                }
            }
        },
        created(){
            //填充基本信息
            let user = JSON.parse(localStorage.getItem('user'));
            this.userInfo = {
                userId:user.id,
                account:user.account,
            };
        },
    }
</script>
