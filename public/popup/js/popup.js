var request = {
    "imgUrl":"#1abc9c"
};
$("#tipsView").hide();
chrome.tabs.getSelected(null, function (tab) {
    $("#addBu").val("添加")
    $("#addTitle").val(tab.title)
    request.name = tab.title;
    request.url = tab.url;
    $("#icon").append(tab.title.substring(0,2))
});

// var tab = {"title":"赋值 val()方法 - Stephen__Wu的博客 - CSDN博客"}
// if(tab!=null){
//     $("#addTitle").val(tab.title)
//     $("#addBu").val("添加")
//     $("#icon").append(tab.title.substring(0,2))
// }


$('#addBu').click(function(){
    $("#addView").hide();
    request.name = $("#addTitle").val();
    //获取uid
    var userStr = localStorage.getItem('user');
    if(userStr != null){
        request.uid = JSON.parse(userStr).id;
        $.ajax({
            type: "POST",
            url: "http://47.94.131.201:9050/plan-api/web/rest/chortcut/addChortcut",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(request),
            dataType: "json",
            success: function (message) {
                console.log(message)
                if(message.code==2){
                    $("#tipsView").show();
                }else{
                    $("#tipsView").html("添加失败");
                    $("#tipsView").show();
                }
            },
            error: function (message) {
                
            }
        });
    }
    
})

$(".icobgColor").click(function(){
    $(this).click(function(){
        var color = $(this).css("background-color");
        //转十六进制
        var rgb = color.split(',');
        var r = parseInt(rgb[0].split('(')[1]);
        var g = parseInt(rgb[1]);
        var b = parseInt(rgb[2].split(')')[0]);
        var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        $("#icon").css('background-color',hex);
        request.imgUrl = hex;
    })
})

$("#addTitle").bind("input propertychange",function(event){
    var text = $("#addTitle").val();
    $("#icon").text(text.substring(0,2));
});