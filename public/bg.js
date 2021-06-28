structConfig = {
	"type":"id",
	"name":"git-readme",
	"child":{
		"type":"class",
		"name":"ui flat nopadding segment file_holder",
		"child":{
			"type":"class",
			"name":"file_content markdown-body",
			"child":{}
		}		
	}
}
start()

/**
 * 如果type为则root可以不传
 */
function getElement(root,type,name){
	if(type=="id"){
		return document.getElementById(name)
	}else if(type=="class"){
		while(root.hasChildNodes()){
			if(root.firstChild.className==name){
				return root.firstChild
			}
			root.removeChild(root.firstChild);
		}
	}
}


function start(){
	host = window.location.host;
	if (host.indexOf("gitee.com")!= -1){
		var parseConfig = structConfig
		var rootDiv=getElement(rootDiv,parseConfig.type,parseConfig.name)
		var htmlStruct = rootDiv
		
		while(parseConfig.child!=undefined){
			htmlStruct = getElement(htmlStruct,parseConfig.type,parseConfig.name)
			parseConfig = parseConfig.child;
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
}


function changeToNaotu(){
	
}
