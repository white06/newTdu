//定义zTree的全局变量zNodes
var zNodes =[	];var type="";var upnum=0;var gitid="";var shipin="";
//设置zTree的基础设置
var setting = {
	view: {
		addHoverDom:addHoverDom,
		removeHoverDom:removeHoverDom,
		showLine: true,
		showIcon:true,
		selectedMulti: true,
	},
	data: {
		simpleData: {
			enable: true,
		}
	},
	callback:{//编辑功能和删除功能的回掉事件
		beforeRename:zTreeBeforeRename,
		onRemove:zTreeOnRemove,
		onRename:zTreeOnRename,
		beforeDrag: zTreeBeforeDrag,
        onDrop: zTreeOnDrop,
        beforeDrop:zTreeBeforDrop
	},
	edit: {//加此属性就能过够新增删除按钮和编辑按钮，同时可以添加两个按钮功能
		enable: true,
		drag:{
			isMove:true,
			isCopy:false,
		}
	},
};
function zTreeBeforeDrop(){
	return false;
}
//鼠标移动可见按钮的Hover事件
function addHoverDom(treeId, treeNode) {
	var aObj = $("#" + treeNode.tId + "_a");
	if ($("#diyBtn_"+treeNode.id).length>0) return;
	else if(treeNode.knowledgecontentId == "00000000-0000-0000-0000-000000000000"){
	var editadd = "<span type='button' class='button add' id='diyBtn_" + treeNode.id
	+ "' title='"+treeNode.name+"' onfocus='this.blur();'onclick=\"add(id);\"></span>";
	aObj.append(editadd);
	return;
	}
 };
//鼠标离开按钮不可见的Hover事件
function removeHoverDom(treeId, treeNode) {
	$("#diyBtn_"+treeNode.id).unbind().remove();
};
//删除
function zTreeOnRemove(event,treeId,treeNode){
	if(upnum==0){
	    upnum=1;
	    for(var i=0;i<zNodes.length;i++){
			if(treeNode.id==zNodes[i].id){
				zNodes.splice(i,1);
			}
		}
	    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
		treeObj.removeNode(treeNode);
		var fileWay=filePath+$('#subject').val()+"/"+gitid+"/";
		$.ajax({
			type:"POST",
			url:"../TreesController/deTree.action?id="+treeNode.id+"&filePath="+filePath,
			success:function(data){
				if(data=="true"){
					upnum=0;
					return;
				}
			},
			error:function(){
				alert("删除失败");
				upnum=0;
				return;
			}
		  })
	}else{
		alert("别着急，页面反应不过来了");
	}
};
//编辑
function zTreeOnRename(event, treeId, treeNode){
	var name=treeNode.name;
	//转码
	name=encodeURI(name);
	name=encodeURI(name);
	$.ajax({
		type:"POST",
		url:pathURL+"TreesController/upRandom.action?id="+treeNode.id+"&name="+name,
		success:function(data){
			if(data=="true"){
				alert("编辑成功");
			}
			
		}
	})
};
var beforedragnextnode = null;
//拖动开始之前
function zTreeBeforeDrag(treeId, treeNodes){
	beforedragnextnode = treeNodes[0].getNextNode();
  return true;
}
//拖动结束之前
function zTreeBeforDrop(treeId, treeNodes, targetNode, moveType){
	if(targetNode.knowledgecontentId=="00000000-0000-0000-0000-000000000000"){
		return true;
	}else{
		return false;
	}
}
//结束拖动之后
function zTreeOnDrop(event, treeId, treeNodes, targetNode, moveType){
	if(upnum==0){
		upnum=1;
		var fatherId="";
		if(treeNodes[0].getParentNode()!==null){
			fatherId=treeNodes[0].getParentNode().id;//父节点
		}
		if (moveType != null) {
	        $.ajax({
	        	type:"POST",
	        	url:"../TreesController/drop.action", 
	        	async:false,
	        	data: {
		            nextId: (treeNodes[0].getNextNode() === null) ? "" : treeNodes[0].getNextNode().id,//所移动到的位置的下一个节点的ID
		            nextprevknowledgeId: (treeNodes[0].getNextNode() === null) ? "" : treeNodes[0].id,//所移动到的位置的下一个节点的现在的上一节点应该是移动的节点
		            prevId: (beforedragnextnode === null) ? "" : beforedragnextnode.id,//移动点原本的下一节点ID
		            prevprevknowledgeId: (beforedragnextnode === null) ? "" : ((beforedragnextnode.getPreNode() === null) ? "" : beforedragnextnode.getPreNode().id),//移动点原本的上一节点ID
		            selfId: treeNodes[0].id,//移动的节点ID
		            selfprevknowledgeId: (treeNodes[0].getPreNode() === null) ? "" : treeNodes[0].getPreNode().id,//移动节点现在的上一节点
		            selfparentknowledgeId: fatherId,
		            },
	            
	        });
		 }
		upnum=0
	}
}

$(function(){
	//进入页面就加载所有的科目
	var html="";
	$.ajax({
		type:"POST",
		url:pathURL+"ShouyeController/getSubjects.action",
		async:false,
		success:function(data){
			if(data){
				var d1=document.getElementById("bianji");
				if(adminNum=="1"){
					d1.style.display="block";
				}else if(adminNum=="2"){
					d1.style.display="block";
				}else if(adminNum=="3"){
				}
				for(var i=0;i<data.length;i++){
					html+='<option class="subjectname1" value="'+data[i].id+'">'+data[i].subjectName+'</option>'
				}
				$('#subject').html(html);
				subjecttrees();
			}else{
				alert("别急，正在加载呢！要不您刷新一下");
			}
		}
	});
	
})

//选中科目之后加载科目中的所有资源
function subjecttrees(){
	
	var id=$('#subject').val();
	tupian="";
	shipin="";
	kejian="";
	wendang="";
	dianzishu="";
	var d1=document.getElementById("bianji");
	$("#xuanze").children().removeClass("background");
	$("#xuanze1").children().removeClass("background");
	$("#tianjiakuang").html("");
	if(d1.value == "编辑"){		
	  $.ajax({
		type:"POST",
		url:pathURL+"TreesController/treKnowlegcontent.action?id="+id,
		success:function(data){			
			if(data){			
				var dataL=data.length;
				for(var i=0;i<dataL;i++){
					if(data[i].type=="视频"){
						shipin+='<div class="subjectname2" value="'+data[i].id+'" title="'+data[i].customname+'" ><img class="kuang" src="'+data[i].imageContentIcons+'" onclick="showbig(\''+data[i].nmae+'\',\''+data[i].customname+'\',\'视频\')"></video><div class="spankuang">'+data[i].customname+'</div></div>'
					}
				}
			
			}
			Allresource();
			shipin1();
		}
	})
	}else{
		setSubId();
			$.ajax({
				type:"POST",
				url:pathURL+"SecondController/selTheKnow.action?ChooseSubject="+gitid,
				success:function(data){
					console.log(data);
					if(data){
						zNodes=data;
					}else{
						//清空zNodes
						zNodes=[];
					}
					var treeObj = $("#treeDemo");
					$.fn.zTree.init(treeObj, setting, zNodes);
				}
			})	
	}
}

//用于点击图片视频等选项时显示CSS
function chuxian(){
	//在编辑时，点击就显示上传框
	var tianjia=document.getElementById("upkuang");
	tianjia.style.display="block";
	//清除class用于调整css
	$("#xuanze").children().removeClass("background");
	$("#xuanze1").children().removeClass("background");
}

function ChangeAtext(){
	
	var fileName=$("#file").val();
	if(fileName.length>0){
		fileName=fileName.split("C:\\fakepath\\")[1]
		$("#fileNames")[0].innerText=fileName;
	}
	
}

//添加框的内容添加
function Allresource(){
	chuxian();
	$("#Allsource").addClass("background");	
	//加入内容	
	$('#tianjiakuang').html(shipin);
	
	
}

function shipin1(){
	chuxian();
	$("#video").addClass("background");
	$("#video1").addClass("background");
	$('#tianjiakuang').html(shipin);
	type="视频";
	setSubId();
}

//保存js文件
function setContentJS(){
	setSubId();
	var fileWay=filePath+"/"+$('#subject').val()+"/"+gitid;
	$.ajax({
		type:"post",
		url:"../SecondController/updateJs.action?ChooseSubject="+fileWay,
		success:function(data){
			if(data){
				alert(data);
			}
		}
	})
}

//编辑权限设置
function bianji(){
	var bianji=document.getElementById("bianji");
	var subint=document.getElementById("subint");
	var subjectfile=document.getElementById("subjectfile");
	if(bianji.value == "编辑"){
		bianji.value="完成";
		subjecttrees();
		subint.style.display="block";
		subjectfile.style.display="none";
		var tianjia=document.getElementById("upkuang");
		tianjia.style.display="none";
		shipin1();
	}else{
		bianji.value="编辑";
		subjecttrees();
		subint.style.display="none";
		subjectfile.style.display="block";
		
	}
}

//文件上传
function fileup(){
	//禁止多次点击上传，以免系统处理不过来导致数据库出错
	if(upnum==0){
		upnum=1;
	var file=$("#file")[0].files[0];
	if(file!=undefined){
	if(checkFileExt(file.name)){
	//新建一个FormData参数
	var fd=new FormData;
	//得到此刻knowledge_Id
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes=treeObj.getSelectedNodes();
	if(nodes[0].knowledgecontentId=="00000000-0000-0000-0000-000000000000"){
	var lei="";
	for(var i=0;i<zNodes.length;i++){
		if(zNodes[i].pId==nodes[0].id){
			lei=zNodes[i].id;
		}
	}
	nodes=nodes[0].id;
	fd.append("file",file);
	fd.append("parentKnowledge",nodes);
	fd.append("type",type);
	fd.append("lei",lei);
	fd.append("subid",gitid);
	fd.append("filePath",filePath);
	$.ajax({
		type:"POST",
		url: pathURL+"FileUpController/fileIn.action",
		data:fd,
		contentType: false,
		processData: false,
		success:function(data){
			if(data){
				zNodes.push(data);
				var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
				var nodess=treeObj.getNodeByParam("id",nodes);
				var kk=treeObj.addNodes(nodess,-1,data);
				
				//清空上传框
				$('#file').val("");
				$('#fileNames').html("");
				//允许开始下次上传
				upnum=0;
			}
		 } 
	   })
	  }else{
		  alert("请在文件夹里面传文件，别往文件里面传文件啊死蠢");
		  upnum=0;
	  }
	 }else{
		 alert("您传的文件类型不符合");
		upnum=0;
	 }
	}else{
		alert("您传个文件呗");
		upnum=0;
	}
	}else{
		alert("您别急，刷新一下页面试试！");
	}
}

//新增功能
function add(id){
	if(upnum==0){
		upnum=1;
	var lei="";
	for(var i=0;i<zNodes.length;i++){
		if(zNodes[i].pId==id.substring(7)){
			lei=zNodes[i].id;
		}
	}
	$.ajax({
		type:"POST",
		url:pathURL+"TreesController/ins.action?id="+id.substring(7)+"&lei="+lei+"&subid="+gitid,
		success:function(data){
				zNodes.push(data);
				var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
				var nodes=treeObj.getNodeByParam("id",id.substring(7));
				var kk=treeObj.addNodes(nodes,-1,data);
				upnum=0;
				return;
		}
	})
	}
}

//新增按钮新增
function addniu(){
	if(upnum==0){
		upnum=1;
	var lei="";
	var id="";
	if(0!=zNodes.length){
		for(var i=0;i<zNodes.length;i++){
			if(zNodes[i].pId==0){
				lei=zNodes[i].id;
			}
		}
	}
	$.ajax({
		type:"POST",
		url:pathURL+"TreesController/ins.action?id="+id+"&lei="+lei+"&subid="+gitid,
		success:function(data){
				if(0==zNodes.length){
					zNodes=[];
				}
				zNodes.push(data);
				var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
				var nodes=null;
				nodes=treeObj.getNodeByParam("id",id);
				var kk=treeObj.addNodes(nodes,-1,data);
				upnum=0;
				return;
	}
	})
	}
}

//显示具体内容时放大
function showbig(nmae,customname,sType){	
	$("#zhaozi,#xianshidiv").show()
	if(sType=="视频"){
		$("#xianshidiv").hide()
		$("#Videodiv").show()
		var agrs={"file":'updata/'+nmae};
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
}

//检查文件类型
function checkFileExt(filename)
{
	 var arr = [];
	switch(type){
		case "图片":
		arr= ["jpg","png","gif"];
		break;
		case "视频":
		arr= ["mp4","wmv","swf","rmvb","asf","wma","mp3"];
		break;
		case "课件":
		arr= ["doc","docx","xls","xlsx","ppt","pptx","pdf"];
		break;
		case "文档":
		arr= ["doc","docx","xls","xlsx","ppt","pptx","pdf"];
		break;
		
	}
 var flag = false; //状态

 //取出上传文件的扩展名
 var index = filename.lastIndexOf(".");
 var ext = filename.substr(index+1);
 //循环比较
 for(var i=0;i<arr.length;i++)
 {
  if(ext == arr[i])
  {
   flag = true; //一旦找到合适的，立即退出循环
   break;
  }
 }
 //条件判断
 return flag;
}

//写死每次获取到的科目树的id
function setSubId(){
	var id=$('#subject').val();
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