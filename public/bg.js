structConfig = [{
	"host":"gitee.com",
	"type":"id",
	"name":"file_content markdown-body"
}
]
start()

/**
* 
*/
function getElement(type,name){
if(type=="id"){
	return document.getElementById(name)
}else if(type=="class"){
	return document.getElementsByClassName('name')[0]
}
}


function start(){
host = window.location.host;
var htmlStruct;
for(var i=0;i<structConfig.length;i++){
	if(host==structConfig[i].host){
		htmlStruct = getElement(structConfig[i].type,structConfig[i].name)
		break
	}

}
console.log(htmlStruct)					

var minder =  new kityminder.Minder({
	renderTo: '#git-readme'
});
console.log(minder)
minder.importJson({
"root": {
	"data": {"text": "test111"},
	"children": [
	{"data": {"text": "网页"}},
	{"data": {"text": "贴吧"}},
	{"data": {"text": "知道"}},
	{"data": {"text": "音乐"}},
	{"data": {"text": "图片"}},
	{"data": {"text": "视频"}},
	{"data": {"text": "地图"}},
	{"data": {"text": "百科", "expandState": "collapse"}}
	]
},
"template": "default"
});	
}


function changeToNaotu(){

}
