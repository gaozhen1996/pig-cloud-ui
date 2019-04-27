<template>
    <el-row>
      <el-col :span="24">
        <iframe
        src="http://47.94.131.201:8000/" 
        :width=winWidth height="1300"
        scrolling="no" >
        </iframe>
      </el-col>
    </el-row>

</template>
<script>
export default {
        data: function(){
            return {
              winWidth:1150,
            }
        },
        mounted () { 
            window.onresize = function(){
                let currWidth = document.body.clientWidth;
                this.winWidth=currWidth-200;
                console.log(this.winWidth);
            }
        },
        methods: {
        }
    }
</script>