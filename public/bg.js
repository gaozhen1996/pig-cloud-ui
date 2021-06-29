structConfig = [{
	"host":"gitee.com",
	"type":"class",
	"name":"file_content markdown-body"
}]


start()

/**
* 
*/
function getElement(type,name){
	if(type=="id"){
		return document.getElementById(name)
	}else if(type=="class"){
		return document.getElementsByClassName(name)[0]
	}
}

var Util = {
	
	htmlToJSON:function(htmlStruct){
		console.log("---"+htmlStruct)
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

	util = Util();	
	util.htmlToJSON(htmlStruct.children)
	var minder =  new kityminder.Minder({
		renderTo: '#git-readme'
	});
	console.log(minder)
	minder.importJson(
	{"root": {
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

function Util(){
	var util = {};
	util.jsonStruct = {}
	util.level=0
	util.htmlToJSON = function(htmlStruct){
		for(var i=0;i<htmlStruct.length;i++){
			if(htmlStruct[i].children){
				//util.level++
				//console.log(util.level)
				util.htmlToJSON(htmlStruct[i].children)
			}
			
			//util.level--
			console.log(htmlStruct[i].tagName != 'UL' && htmlStruct[i].tagName != 'A')
			if(htmlStruct[i].tagName != 'UL' && htmlStruct[i].tagName != 'A'){
				console.log(htmlStruct[i].tagName)
				console.log(htmlStruct[i])
				console.log(htmlStruct[i].textContent)
			}

		}
		
	}
	return util;
}