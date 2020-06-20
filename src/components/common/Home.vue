<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}" ref='body'>
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import bus from './bus';
    export default {
        data(){
            return {
                tagsList: [],
                collapse: false,
                upDownStruct:true
            }
        },
        components:{
            vHead, vSidebar, vTags
        },
        methods:{
            changeBodyWidth(){
                /**
                 * 上下结构：left：0
                 * 左右结构：折叠：70px 展开200px
                 */
                if(this.upDownStruct){
                    this.$refs.body.style.left = '0px';
                }else{
                    if(this.collapse){
                        this.$refs.body.style.left = '70px';
                    }else{
                        this.$refs.body.style.left = '200px';
                    }
                }
            }
        },
        created(){
            bus.$on('collapse', msg => {
                this.collapse = msg;
                this.changeBodyWidth()
            })
            bus.$on('upDownStruct', msg => {
                this.upDownStruct = msg;
            })
            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        },
        mounted(){
            this.changeBodyWidth()
        }
    }
</script>

