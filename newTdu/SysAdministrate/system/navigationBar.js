//定义zTree的全局变量zNodes
var zNodes =[	];var upnum=0;
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
		beforeRemove:zTreeBeforeRemove,
		onRemove:zTreeOnRemove,
		beforeDrag: zTreeBeforeDrag,
        onDrop: zTreeOnDrop,
        beforeDrop:zTreeBeforDrop,
        onClick:zTreeOnClick,
	},
	edit: {//加此属性就能过够新增删除按钮和编辑按钮，同时可以添加两个按钮功能
		enable: true,
		drag:{
			isMove:true,
			isCopy:false,
		},
		showRenameBtn:false,
	},
};

function zTreeBeforeDrop(){
	return false;
}
//鼠标移动可见按钮的Hover事件
function addHoverDom(treeId, treeNode) {
	var aObj = $("#" + treeNode.tId + "_a");
	if ($("#diyBtn_"+treeNode.id).length>0) return;
	else{
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
//删除之前的再次确认
function zTreeBeforeRemove(treeId, treeNode){
	return true;
}
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
		$.ajax({
			type:"POST",
			url:houtaiurl+"NavigationBarController/delNav.action?id="+treeNode.id,
			success:function(data){
				if(data=="ture"){
					alert("删除成功");
					getNavigation();
					upnum=0;
				}
			}
		})
	}else{
		alert("别着急，页面反应不过来了");
	}
};
var beforedragnextnode = null;
//拖动开始之前
function zTreeBeforeDrag(treeId, treeNodes){
	beforedragnextnode = treeNodes[0].getNextNode();
    return true;
}
//拖动结束之前
function zTreeBeforDrop(treeId, treeNodes, targetNode, moveType){
    return true;
}
//结束拖动之后
function zTreeOnDrop(event, treeId, treeNodes, targetNode, moveType){
	if(upnum==0){
		upnum=1;
		var fatherId="";
		if(treeNodes[0].getParentNode()!==null){
			fatherId=treeNodes[0].getParentNode().id;
		}
		if (moveType != null) {
	        $.ajax({
	        	type:"POST",
	        	url:houtaiurl+"NavigationBarController/drop.action",
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
//点击事件，让树结构展开并且出现内容框
function zTreeOnClick(event, treeId, treeNode){
	$(".contentInput").val("");
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	if(treeNode.open===true){
		treeObj.expandNode(treeNode,false,false);
	}else{
		treeObj.expandNode(treeNode,true,false);
	}
	$("#columnName").val(treeNode.name);
	$("#columnLink").val(treeNode.columnLink);
	$("#columnPicture").val(treeNode.icon);
	$("#id").val(treeNode.id);
}

$(function(){
	getNavigation();
})

//新增功能
function add(id){
	//var subjectId = $(window.parent.document).find('#subject option:selected').val();
    var subjectId=$('.choosesub',parent.document)[0].id;
	console.info(subjectId);
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
		url:houtaiurl+"NavigationBarController/insertTree.action?id="+id.substring(7)+"&lei="+lei+"&subjectId="+subjectId,
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
	//var subjectId = $(window.parent.document).find('#subject option:selected').val();
    var subjectId=$('.choosesub',parent.document)[0].id;
	var url = houtaiurl+"NavigationBarController/ins.action";
	$.post(url,{subjectId:subjectId},function(data){
		//console.log(data);
				if(0==zNodes.length){
					zNodes=[];
				}
				zNodes.push(data);
				var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
				var nodes=null;
				nodes=treeObj.getNodeByParam("id",id);
				//console.log(nodes);
				var kk=treeObj.addNodes(nodes,-1,data);
				//console.log(zNodes);
				upnum=0;
				return;
	});
	/*if(upnum==0){
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
		url:"../../../NavigationBarController/ins.action?id="+id+"&lei="+lei,
		success:function(data){
				//console.log(data);
				if(0==zNodes.length){
					zNodes=[];
				}
				zNodes.push(data);
				var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
				var nodes=null;
				nodes=treeObj.getNodeByParam("id",id);
				//console.log(nodes);
				var kk=treeObj.addNodes(nodes,-1,data);
				//console.log(zNodes);
				upnum=0;
				return;
	}
	})
	}*/
	
}

//得到导航栏列表
function getNavigation(){
	//var subjectId = $(window.parent.document).find("#subject option:selected").val();
    var subjectId=$('.choosesub',parent.document)[0].id;
	$.ajax({
		type:"GET",
		url:houtaiurl+"NavigationBarController/seleNavigation2.action?subjectId="+subjectId,
		success:function(data){
			if(data){
				if(data){
					zNodes=data;
					console.info(data);
				}else{
					//清空zNodes
					zNodes=[];
				}
				var treeObj = $("#treeDemo");
				$.fn.zTree.init(treeObj, setting, zNodes);
			}
		}
	})
}

//提交修改
function getUpata(){
	var id=$('#id').val();
	var columnName=$('#columnName').val();
	var columnLink=$('#columnLink').val();
	var columnPicture=$('#columnPicture').val();
	//var userrole=$('#userrole').val();
	//var subjectId =$(window.parent.document).find("#subject option:selected").val();
    var subjectId=$('.choosesub',parent.document)[0].id;
	$.ajax({
		type:"POST",
		url:houtaiurl+"NavigationBarController/upNavigation.action",
		data:{id:id,columnName:columnName,columnLink:columnLink,columnPicture:columnPicture,subjectId:subjectId},
		success:function(data){
			if(data=="ture"){
				alert("修改成功");
				getNavigation();
			}
		}
	})
}

//键盘按键检查
function inspect(myId){
	var getVal=$("#"+myId+"").val();
	var valL=getVal.length;
	if(getVal.indexOf("&")>-1){
		if(valL===1){
			getVal="";
		}else{
			getVal=getVal.substring(0,getVal.length-1);
		}
		$("#"+myId+"").val(getVal);
		alert("不允许输入非法字符");
		return;
	}
}

//新增栏目的提交
function getAdd(){
	var columnName=$('#columnName').val();
	var columnLink=$('#columnLink').val();
	var columnPicture=$('#columnPicture').val();
	var userrole=$('#userrole').val();
	var columnLevel=$("input[name='level']:checked").val();
	var columnPid="";
	if(columnLevel==1){
		columnPid="0e2c5ec4-dd2a-41fe-8c3f-3022927ac883";
	}else{
		columnPid=$("#level1").val();
	}
	var fd=new FormData;
	fd.append("columnName",columnName);
	fd.append("columnLink",columnLink);
	fd.append("columnPicture",columnPicture);
	fd.append("columnLevel",columnLevel);
	fd.append("columnPid",columnPid);
	fd.append("userrole",userrole);
	$.ajax({
		type:"POST",
		url:houtaiurl+"NavigationBarController/addNavigation.action",
		data:fd,
		contentType: false,
		processData: false,
		success:function(data){
			if(data=="ture"){
				alert("新增成功");
				$('#win').panel('clear');
				$('#win').panel('close');
				getNavigation();
			}
		}
	})
}

//分页功能
function pagerFilter(data){
	//判断是否是数组
	if (typeof data.length == 'number' && typeof data.splice == 'function'){	// is array
		data = {
			total: data.length,
			rows: data
		}
	}
	var dg = $(this);
	var opts = dg.datagrid('options');
	var pager = dg.datagrid('getPager');
	pager.pagination({
		onSelectPage:function(pageNum, pageSize){
			opts.pageNumber = pageNum;
			opts.pageSize = pageSize;
			pager.pagination('refresh',{
				pageNumber:pageNum,
				pageSize:pageSize
			});
			//等待重写，形成列表
			dg.datagrid('loadData',data);
		},
		 beforePageText : '第', //页数文本框前显示的汉字             
	     afterPageText : '页    共 {pages} 页',  
	     displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录',
	});
	if (!data.originalRows){
		data.originalRows = (data.rows);
	}
	var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
	var end = start + parseInt(opts.pageSize);
	data.rows = (data.originalRows.slice(start, end));
	return data;
}