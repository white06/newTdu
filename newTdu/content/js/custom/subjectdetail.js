var curMenu = null, zTree_Menu = null;
var gitid="";var type="";var clickId="";var contentChar;
//zTree模块
var zNodes =[];
var setting = {
	view: {
		showLine: false,
		showIcon: false,
		selectedMulti: false,
		dblClickExpand: true,
		// addDiyDom: null
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		onClick: zTreeOnClick,
		onNodeCreated: zTreeOnNodeCreated,
          beforeExpand: zTreeOnExpand
	}
};
function addDiyDom(treeId, treeNode) {
	// var spaceWidth = 5;
	// var switchObj = $("#" + treeNode.tId + "_switch"),
	// icoObj = $("#" + treeNode.tId + "_ico");
	// switchObj.remove();
	// icoObj.before(switchObj);
    //
	// if (treeNode.level > 1) {
	// 	var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level)+ "px'></span>";
	// 	switchObj.before(spaceStr);
	// }
}

function zTreeOnNodeCreated(event, treeId, treeNode) {
	if(treeNode.knowledgecontentId!='00000000-0000-0000-0000-000000000000'){
		var treeObj = $.fn.zTree.getZTreeObj("treeDemo");

		var node = treeObj.getNodeByTId(treeNode.tId);

		treeObj.hideNode(node);

	}
}
function zTreeOnExpand(event, treeId, treeNode){
    if(checkChildren(treeNode)){
        zTree.expandNode(treeNode);
    }
}
function checkChildren(treeNode){
    var char=[];
    var result=true;
    char=getChildren2(char,treeNode,0);

    for(var i=0;i<char.length;i++){
    	if(char[i].knowledgecontentId!='00000000-0000-0000-0000-000000000000'){
            result=false;
    		break;
		}
	}
	if(result==false){
    	return false;
	}else{
		return true;
	}


}
//鼠标点击事件
function zTreeOnClick(event, treeId, treeNode) {
	contentChar=new Array();
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");


    var char=[]
    char=getChildren(char,treeNode);
	if(checkChildren(treeNode)){
        zTree.expandNode(treeNode);
	}
    var charLength=char.length;
    for(i=0;i<charLength;i++){
    	if(char[i].knowledgecontentId!=="00000000-0000-0000-0000-000000000000"){
    		contentChar.push(char[i].id);
    	}
    }
    allContent();
    return false;
};
//查询单科目底下的节点
function getChildren(ids,treeNode){
	ids.push(treeNode);
    if (treeNode.isParent){
           for(var obj in treeNode.children){
               getChildren(ids,treeNode.children[obj]);
           }
       }
    return ids;
}
function getChildren2(ids,treeNode,num){

    if (treeNode.children.length>0){
        for(var i=0;i<treeNode.children.length;i++){
            ids.push(treeNode.children[i]);
		}
    }
    return ids;
}

//加载资源
function showCentent(){
	if(contentChar===undefined){
		$('.content').html("请先选择章节");
	}else if(contentChar.length===0){
		$('.content').html("此章节下还未有资源");
	}else if(contentChar.length!==0){
		var json=JSON.stringify(contentChar);
		$.ajax({
			type:"POST",
			url:"../SecondController/ziyuan.action",
			data:{"contentID":json,"type":type},
			success:function(data){
				if(data){
					var dataL=data.length;
					var html="";
					for(var i=0;i<dataL;i++){
						if(data[i].type=="素材"){
							html+='<div class="subjectname2" value="'+data[i].id+'" title="'+data[i].customname+'" ><img class="kuang" src="'+data[i].imageContentIcons+'" onclick="showbig(\''+data[i].nmae+'\',\''+data[i].customname+'\',\'素材\')"></img><div class="spankuang">'+data[i].customname+'</div></div>';
						}else if(data[i].type=="课件"){
							html+='<div class="subjectname2" value="'+data[i].id+'" title="'+data[i].customname+'" ><img class="kuang" src="'+data[i].imageContentIcons+'" onclick="showbig(\''+data[i].nmae+'\',\''+data[i].customname+'\',\'课件\')"><div class="spankuang">'+data[i].customname+'</div></div>';
						}else if(data[i].type=="文档"){
							html+='<div class="subjectname2" value="'+data[i].id+'" title="'+data[i].customname+'" ><img class="kuang" src="'+data[i].imageContentIcons+'" onclick="showbig(\''+data[i].nmae+'\',\''+data[i].customname+'\',\'文档\')"><div class="spankuang">'+data[i].customname+'</div></div>';
						}else if(data[i].type=="视频"){
							html+='<div class="subjectname2" value="'+data[i].id+'" title="'+data[i].customname+'" ><img class="kuang" src="'+data[i].imageContentIcons+'" onclick="showbig(\''+data[i].nmae+'\',\''+data[i].customname+'\',\'视频\')"></video><div class="spankuang">'+data[i].customname+'</div></div>'
						}else{
							
						}
					}
					$('.content').html(html);
				}
			}
		})
	}
}

//显示具体内容时放大
/**
 * 
 * @param {Object} nmae	文件存储名称
 * @param {Object} customname	文件名
 * @param {Object} sType		文件类型
 */
function showbig(nmae,customname,sType){
	if(sType=="素材"){
		var agrs="updata/"+ChooseSubject+"/"+gitid+"/source/"+nmae;
		var html="<a download="+customname+" href="+agrs+" id='getFile' onclick='remo()'></a>";
		$('body').append(html);
		$('#getFile').get(0).click();//模拟点击
		return;
	}
	if(sType=="视频"){
		$("#zhaozi,#xianshidiv").show()
		$("#xianshidiv").hide()
		$("#Videodiv").show()
		var agrs={"file":"updata/"+ChooseSubject+"/"+gitid+"/video/"+nmae};
		$("#VideoContent").load("content/Video.php",agrs,function(){
			$("#jquery_jplayer_1").jPlayer({
				ready: function () {
					$(this).jPlayer("setMedia", {
						title: "Video Player",
						m4v: agrs.file,
					}).jPlayer("play");;
				},
				swfPath: "../../dist/jplayer",
				supplied: "webmv, ogv, m4v",
				size: {
					   width: "100%",
					   height: "100%",
					cssClass: "jp-video-360p"
				},
				useStateClassSkin: true,
				autoBlur: false,
				smoothPlayBar: true,
				keyEnabled: true,
				remainingDuration: true,
				toggleDuration: true
			});
		});
		$("#wenjianming2").html(customname);
		$("#Videodiv").css("top",(innerHeight-596)/2);
		$("#Videodiv").css("left",(innerWidth-640)/2);

		return;
	}
	else if(sType=="课件"){
		$("#zhaozi,#xianshidiv").show();
		//var agrs=checkWordEXT(nmae);
		var args = 'updata/'+ChooseSubject+'/'+gitid+'/word/'+nmae;
		console.info(args);
		var xianshi='<iframe id="xianshikuang" class="xianshikuang"></iframe>';
		$("#xianshiwenjian").html(xianshi);
		$("#wenjianming").html(customname);
		console.info("课件："+args);
		$("#xianshikuang").prop("src",args);
		return;
	}
	else if(sType=="文档"){
		$("#zhaozi,#xianshidiv").show();
		//var agrs=checkWordEXT(nmae);
		var xianshi='<iframe id="xianshikuang" class="xianshikuang"></iframe>';
		$("#xianshiwenjian").html(xianshi);
		$("#wenjianming").html(customname);
		var args='http://192.168.0.57/op/view.aspx?src=192.168.0.63/'+customname;
		console.info("subjesg");
		console.info(args);
		$("#xianshikuang").prop("src",args);
		//window.open(args,'new','location=no,toolbar=no,titlebar=no,menubar=no');
		return;
	}
}

//webOffice后缀
function checkWordEXT(filename){
    setSubId();
    //取出上传文件的扩展名
    var index = filename.lastIndexOf(".");
    var ext = filename.substr(index+1).toLowerCase();
    var officeURL3=officeURL2+ChooseSubject+"/"+gitid+"/word/";
    var arr="";
    switch(ext){
        case "doc":
            arr= officeURL1+"wv/wordviewerframe.aspx"+officeURL3+filename;
            break;
        case "docx":
            arr= officeURL1+"wv/wordviewerframe.aspx"+officeURL3+filename;
            break;
        case "xlsx":
            arr= officeURL1+"x/_layouts/xlviewerinternal.aspx"+officeURL3+filename;
            break;
        case "xls":
            arr= officeURL1+"x/_layouts/xlviewerinternal.aspx"+officeURL3+filename;
            break;
        case "ppt":
            arr= officeURL1+"p/PowerPointFrame.aspx"+officeURL3+filename;
            break;
        case "pptx":
            arr= officeURL1+"p/PowerPointFrame.aspx"+officeURL3+filename;
            break;
        case "pdf":
            arr= "updata/"+filename;
            break;
    }
    return arr;
}

$(function(){

	var leftimg=document.getElementById("leftimg");

	leftimg.src=""+imgURL+"";
	$(".introduce").html('<h3 style="font-family: \'Microsoft YaHei\'">教程介绍</h3><p>&nbsp;&nbsp;&nbsp;&nbsp;'+Introduce[InNum]+'</p>')
	// $(".detailcontent").css("height",$(".pagerightbottom")[0].clientHeight-350);
	// $(".detailHead-right").css("width",(innerWidth-80)*0.98*0.9-340);


	$(".typebutton,.typebutton2").on("click",function(){
		$(".detailchoosetype").children().removeClass("choosetype");
		$(this).addClass("choosetype");
	});
	setSubId();
	mulu();
    var theTree = $.fn.zTree.getZTreeObj("treeDemo");
    var nodes=theTree.getNodes();
    $("#"+nodes[0].tId+"_a").click();
	//changeMyHeight();
});

//修改高度
function changeMyHeight(){
	//$(".detailcontent,.contentDiv").css("height",$(".pagerightbottom")[0].clientHeight-300+'px');
	//$(".content").css("height",$(".contentDiv")[0].clientHeight-70+'px');
}

//获取树内容
function mulu(){
	//清空内容
	$('#treeDemo').html("");
	//var fileWay=filePath+"/"+ChooseSubject+"/"+gitid+"/"+ChooseSubject+".js";

    var data=ReadExm("../QZ/updata/"+ChooseSubject+"/"+gitid+"/"+ChooseSubject+".js");
    if(data){
        data=eval("("+data+")");
        //zTree初始化
        zNodes=data;
    }else{
        zNodes=[];
    }
    var treeObj = $("#treeDemo");
    $.fn.zTree.init(treeObj, setting, zNodes);
    treeObj.hover(function () {
        if (!treeObj.hasClass("showIcon")) {
            treeObj.addClass("showIcon");
        }
    }, function() {
        treeObj.removeClass("showIcon");
    });


	//获取内容
	/*$.ajax({
		type:"POST",
		url:pathURL+"SecondController/selknowledges.action?ChooseSubject="+fileWay,
		success:function(data){
			if(data){
				data=eval("("+data+")");
				//zTree初始化
				zNodes=data;
			}else{
				zNodes=[];
			}
			var treeObj = $("#treeDemo");
			$.fn.zTree.init(treeObj, setting, zNodes);
			treeObj.hover(function () {
				if (!treeObj.hasClass("showIcon")) {
					treeObj.addClass("showIcon");
				}
			}, function() {
				treeObj.removeClass("showIcon");
			});
			var theTree = $.fn.zTree.getZTreeObj("treeDemo");
			var nodes=theTree.getNodes();
			theTree.expandNode(nodes[0],true);
		}
	});*/
}

//添加框的内容添加
function allContent(){
	type="全部";
	showCentent();
};
/*function tupian1(){
	type="素材";
	showCentent();
}*/
function shipin1(){
	type="视频";
	showCentent();
}
function kejian1(){
	type="课件";
	showCentent();
}
function wendang1(){
	type="文档";
	showCentent();
}


//写死每次获取到的科目树的id
function setSubId(){
	var id=ChooseSubject;
	//3DMAX
	if(id=="086e9c77-8f33-4b0a-b3a6-39f138f512a0"){
			gitid="d8cb7a8d-8668-4d30-89b5-c2470f7a2767";
			return;
	}
	//AUTOCAD设计
	else if(id=="72a1bc9e-131d-4c13-a326-9faddeb17e9e"){
			gitid="d56945c3-e182-4eb7-b2ac-65176a492a47";
			return;
	}
	//HTML5+CSS3基础
	else if(id=="745aac79-f1ef-476b-b57c-dc9d3472ec3a"){
			gitid="b89ea3cc-1536-4e83-a3a7-c67725450050";
			return;
	}
	//After Effects Cs5基础教程
	else if(id=="a1ffdc90-3f23-4d75-b9b9-c24b4870e03b"){
			gitid="c6244e89-270c-4131-a851-fc3436c79e8c";
			return;
	}
	//网络综合布线设计与实施
	else if(id=="b386476e-a7cf-4992-946b-90ff0568a0d9"){
			gitid="96a632ad-a64d-4103-ab11-a24f7ec05f91";
			return;
	}
}