var request = {
    "color":"#1abc9c"
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
    console.log(request);
    $("#addView").hide();
    $("#tipsView").show();
})

function setColor(index){
    var bgcolors = $('.icobgColor');
    var bgcolor = bgcolors[index].style.backgroundColor;
    //转十六进制
    var rgb = bgcolor.split(',');
    var r = parseInt(rgb[0].split('(')[1]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2].split(')')[0]);
    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    $("#icon").css('background-color',hex);
    request.color = hex;
}

$("#addTitle").bind("input propertychange",function(event){
    var text = $("#addTitle").val();
    $("#icon").text(text.substring(0,2));
});