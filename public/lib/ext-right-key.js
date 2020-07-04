/**
 * 大纲：
 * -------rightKeySearch()  //右键直接搜索,只有文字被选中才会生成
 * -------addRightMenu()    //添加右键菜单-稍后阅读和推送
 *   |----createOnlineUserMenu //推送回调方法,根据在线用户创建二级菜单
 *      |-----getCurrUrl()  //获取当前url创给后台
 *   |-----getCurrUrl() //稍后阅读测试方法后期会修改
 */
rightKeySearch();
addRightMenu();
function addRightMenu(){
    /**
     * 添加右键菜单-稍后阅读
     */
    chrome.contextMenus.create({
        title:'稍后阅读',
        onclick: function(){
            getCurrUrl();
        }
    });
    /**
     * 添加右键菜单-推送
     */
    chrome.contextMenus.create({
        id:'push_url',
        title: '推送至'
    });
    /**
     * 创建推送的子菜单
     */
    createOnlineUserMenu();
}


/**
 * 右键菜单，直接搜索选中文字，可选百度，必应，谷歌等搜索引擎
 */
function rightKeySearch(){
    var searchEngine = [{title: '使用百度搜索：%s',url:'https://www.baidu.com/s?ie=utf-8&wd='},
                        {title: '使用必应搜索：%s',url:'https://cn.bing.com/search?q='},
                        {title: '使用谷歌搜索：%s',url:'https://www.google.com.hk/search?q='},
                       ];
    for(var i = 0;i<searchEngine.length;i++){
        chrome.contextMenus.create({
            title: searchEngine[i].title, // %s表示选中的文字
            contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
            onclick: function(params)
            {
                chrome.tabs.create({url: searchEngine[i].url + encodeURI(params.selectionText)});
            }
        });
    }
}

/**
 * 根据当前在线的用户，创建右键子菜单
 */
function createOnlineUserMenu(){
    //获取在线的用户
    var online_users = ['东方不败','风清扬','独孤求败'];
    for(var i = 0;i<online_users.length;i++){
        chrome.contextMenus.create({
            title:'推送至'+online_users[i],
            parentId:'push_url',
            onclick: function(){
                getCurrUrl();
            }
        });
    }
}

/**
 * 获取当前URL
 */
function getCurrUrl(){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        //获取URL
        var request = {};
        request.title = tabs[0].url;
        request.url = tabs[0].url;
        //返回提醒
        success('推送成功',request.url);
    });
}

function success(title,message){
    chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: '../icons/icon-40.png',
        title: title,
        message:message
    });
}

function fail(title,message){
    chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: '../icons/icon-40.png',
        title: title,
        message:message
    });
}