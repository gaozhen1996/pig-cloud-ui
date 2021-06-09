<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">欢迎登陆</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm()">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Global from '../common/Global'

    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm() {
                let request = {"username":this.ruleForm.username,"password":this.ruleForm.password};
                if(request.username!=""){
                    axios.post(Global.baseurl+"/auth-api/userWebRest/login",request)
                    .then(res=>{
                        if(res.data.code==Global.status_success){
                            var user = res.data.data;
                            localStorage.setItem('Authorization',user.token);
                            localStorage.setItem('menu',user.menu)
                            delete user.token
                            delete user.menu
                            localStorage.setItem('user',JSON.stringify(user));  
                            this.$router.push('/');
                        }else{
                            console.log("登录异常")
                            if(res.data.msg!=null){
                                this.$message.error(Global.message.error+res.data.msg);
                            }else{
                                this.$message.error(Global.message.error);
                            }
                        }         
                    })
                }else{
                    this.$message.error('亲，请输入账号！');
                }
            },
            article(){
                axios.get(Global.baseurl+"/auth-api/userWebRest/article")
                .then(res=>{
                    console.log(res.data.msg)
                })
            },
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        font-size:15px;
        color:black;
        margin-left: 30px;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:75%;
        top:55%;
        width:300px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background:white;
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>