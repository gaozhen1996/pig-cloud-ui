<script type="text/javascript">
const baseurl = "http://47.94.131.201:9050"
// const baseurl = "http://127.0.0.1:9050"
const sayings = ['岁月催人老，风月花鸟一笑尘缘了',
                 '人生不要错过两样东西：最后一班回家的车和一个深爱你的人',
                 '山有木兮木有枝，心悦君兮君不知',
                 '半城烟雨半城风沙，一方清澈一方浮华',
                 '人生若只如初见，何事秋风悲画扇',
                 '得未曾有,心净踊跃。',
                 '浮生若梦，别多会少，不如莫遇。',
                 '山一程，水一程。身向榆关那畔行，夜深千帐灯。',
                 '我是人间惆怅客，知君何事泪纵横，断肠声里忆生平。',
                 '宠辱不惊，看庭前花开花落；去留无意，望天上云卷云舒'
                ]
const shortcutList = [{
                        id:1,                        
                        img:require('../../assets/img/ext.png'),
                        name:'chrome扩展',
                        url:'https://chrome.google.com/webstore/category/extensions',
                    },{
                        id:2,                        
                        img:require('../../assets/img/zhihu.png'),
                        name:'知乎',
                        url:'https://www.zhihu.com/',
                    },{
                        id:3,
                        img:require('../../assets/img/douban.png'),
                        name:'豆瓣',
                        url:'https://www.douban.com/',
                    },{
                        id:4,
                        img:require('../../assets/img/jianshu.png'),
                        name:'简书',
                        url:'https://www.jianshu.com/',
                    },{
                        id:5,
                        img:require('../../assets/img/qqmail.png'),
                        name:'QQ邮箱',
                        url:'https://mail.qq.com/',
                    },{
                        id:6,
                        img:require('../../assets/img/zuimei.png'),
                        name:'最美应用',
                        url:'http://zuimeia.com/',
                    }
                ]
export default{
    baseurl,
    sayings,
    shortcutList
}
</script>