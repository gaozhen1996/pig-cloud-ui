<template>
    <div>

        <div class="container">
            <el-form ref="note" :model="note" label-width="80px">
                <el-form-item label="文件名称" >
                    <el-input v-model="note.title"></el-input>
                </el-form-item>  
            </el-form>             
            <quill-editor ref="myTextEditor" v-model="note.content" :options="editorOption"></quill-editor>
            <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
    import axios from 'axios'
    import Global from '../common/Global'

    export default {
        name: 'editor',
        data: function(){
            return {
                uid:'',
                note:{
                    'id':'',
                    'uid':'',
                    'content':'',
                    'createTime':'',
                    'fromid':'',
                    'title':'新建文件',
                    'type':'',
                    'updateTime':''
                },
                editorOption: {
                    placeholder: ''
                }
            }
        },
        components: {
            quillEditor
        },
        mounted: function () {
            this.uid=JSON.parse(localStorage.getItem('user')).id;
        },   
        methods: {
            getData() {
                let startRow=10*(this.cur_page-1)+1;
                axios.get(Global.baseurl+"/video-service/web/rest/videoInfo/getVideoInfoByPage?startRow="
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
            onEditorChange({ editor, html, text }) {
                this.note.content = html;
                console.log('onEditorChange')
                console.log(this.note.content)
            },
            submit(){
                console.log(this.note.content);

                let request = {"uid":this.uid,"content":this.note.content,
                               "fromid":0,
                               "title":this.note.title};
                axios.post(Global.baseurl+"/plan-service/web/rest/note/addNote",request)
                .then(res=>{
                    if(res.data.code==2){
                        console.log(res.data.data);
                        this.$message.success('提交成功！');
                    }else{
                        console.log("新增失败")
                        this.$message.error('亲，错了哦，出了一点小异常');
                    }         
                })
            }
        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
</style>