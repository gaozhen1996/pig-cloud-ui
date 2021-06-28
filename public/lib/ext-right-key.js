/**
 * 大纲：
 * -------connect()连接socket
 * -------rightKeySearch()  //右键直接搜索,只有文字被选中才会生成
 * -------addRightMenu()    //添加右键菜单-稍后阅读和推送
 *   |----createOnlineUserMenu //推送回调方法,根据在线用户创建二级菜单
 *      |-----getCurrUrl()  //获取当前url创给后台
 *   |-----getCurrUrl() //稍后阅读测试方法后期会修改
 */
rightKeySearch();

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
