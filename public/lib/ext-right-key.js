/**
 * 大纲：
 * -------rightKeySearch()  //右键直接搜索,只有文字被选中才会生成
 * -------addRightMenu()    //添加右键菜单-稍后阅读和推送
 *   |----createOnlineUserMenu //推送回调方法,根据在线用户创建二级菜单
 *      |-----getCurrUrl()  //获取当前url创给后台
 *   |-----getCurrUrl() //稍后阅读测试方法后期会修改
 */
// const ip = '127.0.0.1';
const ip = '47.94.131.201';
var stompClient;
connect();
rightKeySearch();
addRightMenu();
function addRightMenu(){
    /**
     * 添加右键菜单-稍后阅读
     */
    chrome.contextMenus.create({
        title:'稍后阅读',
        onclick: function(){
            alert('开发中。。。');
        }
    });
    /**
     * 添加右键菜单-推送
     */
    chrome.contextMenus.create({
        id:'push_url',
        title: '推送至'
    });
}

/**
 * 右键菜单，直接搜索选中文字，可选百度，必应，谷歌等搜索引擎
 */
function rightKeySearch(){ 
    chrome.contextMenus.create({
        title: '使用百度搜索：%s', // %s表示选中的文字
        contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
        onclick: function(params)
        {
            chrome.tabs.create({url: 'https://www.baidu.com/s?ie=utf-8&wd='+ encodeURI(params.selectionText)});
        }
    });

    chrome.contextMenus.create({
        title: '使用必应搜索：%s', // %s表示选中的文字
        contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
        onclick: function(params)
        {
            chrome.tabs.create({url: 'https://cn.bing.com/search?q='+ encodeURI(params.selectionText)});
        }
    });

    chrome.contextMenus.create({
        title: '使用谷歌搜索：%s', // %s表示选中的文字
        contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
        onclick: function(params)
        {
            chrome.tabs.create({url: 'https://www.google.com.hk/search?q='+ encodeURI(params.selectionText)});
        }
    });
    
}

/**
 * 根据当前在线的用户，创建右键子菜单
 */
function createOnlineUserMenu(online_users){
    //获取在线的用户
    // var online_users = ['东方不败','风清扬','独孤求败'];
    for(var i = 0;i<online_users.length;i++){
        var userid = online_users[i].id;
        var name = online_users[i].name;
        chrome.contextMenus.create({
            title:name,
            parentId:'push_url',
            onclick: function(id){
                getCurrUrl(userid);
            }
        });
    }
}

/**
 * 获取当前URL
 */
function getCurrUrl(toUser){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        console.log(toUser)
        //获取URL
        var request = {};
        request.title = tabs[0].url;
        request.url = tabs[0].url;
        sendmsg(toUser,request.url);
        //返回提醒
        notify('推送成功',request.url);
    });
}
function connect(){
    if(localStorage.getItem('user') == null){
        //如果没有用户没有登录，则不连接
        return;
    }
    var user = JSON.parse(localStorage.getItem('user'));
    var url = 'http://'+ip+':8081/endpointSang';
    var socket = new SockJS(url);  
    stompClient = Stomp.over(socket); 
    stompClient.connect({}, function(frame) { 
        //接收消息
        stompClient.subscribe('/topic/'+user.id, function(data){  
            console.log(JSON.parse(data.body))
            var msg = JSON.parse(data.body);
            if(msg.type == 'onlineUsers'){
                /**
                 * 创建推送的子菜单
                 */
                createOnlineUserMenu(msg.data);
            }else if(msg.type == 'sharePage'){
                notify('消息通知',msg.fromUser+'给您分享了链接');
                chrome.tabs.create({url: msg.url});
            }
        });  
        //发送上线消息
        stompClient.send("/accept", {}, JSON.stringify({
            msg: 'openSession',
            toUser: -1,
            fromUser: user.id,
            fromUserName:user.name,
            fromUserAccount:user.account
        }));
    });
}

function sendmsg(toUserId,message) {
    if(localStorage.getItem('user') == null){
        //如果没有用户没有登录，则不连接
        return;
    }
    var user = JSON.parse(localStorage.getItem('user'));
    console.log('发送消息:'+message)
    stompClient.send("/accept", {}, JSON.stringify({
        msg: message,
        toUser: toUserId,
        fromUser: user.id
    }));
}
//通知
function notify(title,message){
    chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: '../icons/icon-40.png',
        title: title,
        message:message
    });
}
//心跳
// var timer;
// timer = setInterval(function(){
//     sendmsg(-1,'ping');
// },10000);