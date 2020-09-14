var subUpId;
var treeName='场景库';
var IDMark_Swith = "_swith",
				IDMark_Icon = "_ico",
				IDMark_Span = "_span",
				IDMark_Input = "_input",
				IDMark_Check = "_check",
				IDMark_Edit = "_edit",
				IDMark_Remove = "_remove",
				IDMark_Ul = "_ul",
				IDMark_A= "_a",
				zTree;
//ztree的基础设置
var setting ={
			view:{
				addHoverDom:addHoverDom,
				removeHoverDom:removeHoverDom,
				selectedMulti:false,
				showIcon:true
		//		fontCss:{color:"blue",font-size:"16px"}
			},
			edit:{
				enable:true,
				editNameSelectAll:true,
				removeTitle:'删除',
				renameTitle:'重命名'
			},
			data:{
				keep:{
					leaf:true,
					parent:true
				},
				simpleData:{
				enable:true	
				}
			},
			callback: {
				beforeRemove:beforeRemove,//点击删除时触发，用来提示用户是否确定删除
				beforeEditName:beforeEditName,//点击编辑时触发，用来判断该节点是否能编辑
				beforeRename:beforeRename,//编辑结束时触发，用来验证输入的数据是否符合要求
				onRemove:onRemove,//删除节点后触发，用户后台操作
				onRename:onRename,//编辑后触发，用于操作后台
				beforeDrag:beforeDrag,
				beforeClick: beforeClick,
				onClick: onClick//点击打开页面
			}
	};

function beforeRemove(e,treeId,treeNode){
		return true;
}
function onRemove(e,treeId,treeNode){
	var typeId=treeNode.id;
	if(treeNode.isParent){
		 $.ajax({
		      type:"POST",
		      url: houtaiurl+"DevelopScenesController/delFirSceneTree.action?fId="+typeId,
		      success:function(res){
		    	  if(res){
		    		  layer.alert("删除成功！");
		    	  }
		      }
		  });
	}else{
		 $.ajax({
		      type:"POST",
		      url: houtaiurl+"DevelopScenesController/delFirSceneTree.action?fId="+typeId,
		      success:function(res){
		    	  if(res){
		    		  layer.alert("删除成功！");
		    	  }else{
		    		  layer.alert("删除失败！");
		    	  }
		      }
		  });
	}
}

function beforeEditName(treeId,treeNode){
	return true;
}
function beforeRename(treeId,treeNode,newName,isCancel){
	if(newName.length<0){
		 layer.alert("名称不能少于0个字符！");
		return false;
	}
	return true;
}
function  onRename(e,treeId,treeNode,isCancel){
	//var subId=$("#subject", parent.document).val();
    var subId=$('.choosesub',parent.document)[0].id;
	var tName=treeNode.name;
	var tId=treeNode.id;
		if(treeNode.isParent){
		 $.ajax({
		      type:"POST",
		      url: houtaiurl+"DevelopScenesController/upFirSceneTree.action",
		      data:{"fId":tId,"subName":tName,"subId":subId,"treeName":treeName},
		      success:function(res){
		    	  if(res){
		    		  layer.alert("修改成功！");
		    	  }else{
		    		  layer.alert("修改失败！");
		    	  } 
		      }
		  });
		}else{
			 $.ajax({
			      type:"POST",
			      url: houtaiurl+"DevelopScenesController/upFirSceneTree.action",
			      data:{"fId":tId,"subName":tName,"subId":subId,"treeName":treeName},
			      success:function(res){
			    	  if(res){
			    		  layer.alert("修改成功！");
			    	  }else{
			    		  layer.alert("修改失败！");
			    	  } 
			      }
			  });
		}
	}
function beforeDrag(treeId,treeNodes){
	return false;
}
var newCount=1;
//添加ztree
function addHoverDom(treeId,treeNode){
	var upId=treeNode.id;
	if(treeNode.isParent){
	var sObj=$("#"+treeNode.tId+"_span");
	if(treeNode.editNameFlag|| $("#addBtn_"+treeNode.tId).length>0) return;
	var addStr="<span class='button add' id='addBtn_"+treeNode.tId
				+"'title='添加子节点' onfocus='this.blur();'></span>";
	sObj.after(addStr);
	var btn=$("#addBtn_"+treeNode.tId);
	if(btn) btn.bind("click",function(){
			var typeName;
			 layer.prompt({formType:0,value:'',title:'请输入类别名称'},function(value,index){
				 typeName=value;
     			layer.close(index);
     			return addSubModel(typeName,upId);
     		})
			
		return false;
	})
	}
}
function addSubModel(typeName,upId){
	//var subId=$("#subject", parent.document).val();
    var subId=$('.choosesub',parent.document)[0].id;
if(typeName !=null||typeName.length>0){
	$.ajax({
	      type:"POST",
	      url: houtaiurl+"DevelopScenesController/addSubSceneTree.action",
	      data:{"fId":upId,"subName":typeName,"subId":subId,"treeName":treeName},
	      success:function(res){
	    	  if(res){
	    		  layer.alert("添加成功！");
	    		  getRootId();
	    	  }else{
	    		  layer.alert("添加失败！");
	    	  } 
	      }
	  });
	}else{
		layer.alert("请输入正确的类别名称");
	}
}
//鼠标事件
function removeHoverDom(treeId,treeNode){
	$("#addBtn_"+treeNode.tId).unbind().remove();
}


function beforeClick(treeId,treeNode,clickFlag){
	var ticketBagNo =treeNode.phone;
	re=new RegExp(ticketBagNo);
	
	var accept =$("#accept").val();
	if(!re.test(accept)){
		$("#accept").val(accept+treeNode.name+"<"+ticketBagNo+">");
	}
}


	function onClick(event,treeId, treeNode){
		console.log(event,treeId,treeNode)
		//对是否父节点的判断
	//	if(treeNode.children==null){
			panduanAdmin(treeNode.id,treeNode.name);
	//	}
	}
function panduanAdmin(plugin,tabnaem){
	$.ajax({
	      type:"POST",
	      url: houtaiurl+"DevelopModelController/panduanAdmin.action",
	      success:function(res){
	    	  console.log(res)
	    	  if(res){
	    		  opentab(plugin,tabnaem);
	    	  }else{
	    		  opentabcommon(plugin,tabnaem);
	    	  } 
	      }
	  });
}
	//打开下一级显示页面
function opentab(plugin,tabnaem) {
        var tab = $('#tt').tabs('getSelected');
        if ($('#tt').tabs('exists', tabnaem)) {
            $('#tt').tabs('select', tabnaem);
        } else {
            $("#tt").tabs("add", {
                title: tabnaem,
                closable: true,
                content: '<iframe src="'+'../../SysAdministrate/Scene/sceneShow.html?subSceneId=' + plugin + '" style="width:100%;height:800px;border:none;overflow:hidden"></iframe>'

            });
        }
    }	
//打开下一级显示页面
function opentabcommon(plugin,tabnaem) {
    var tab = $('#tt').tabs('getSelected');
    if ($('#tt').tabs('exists', tabnaem)) {
        $('#tt').tabs('select', tabnaem);
    } else {
        $("#tt").tabs("add", {
            title: tabnaem,
            closable: true,
            content: '<iframe src="'+'../../SysAdministrate/scene/commonSceneShow.php?subSceneId=' + plugin + '" style="width:100%;height:800px;border:none;overflow:hidden"></iframe>'

        });
    }
}
//添加目录	
function addFirModelTree(){
		var firName;
		 layer.prompt({formType:0,value:'',title:'请输入类别名称'},function(value,index){
			 firName=value;
 			layer.close(index);
 			return addFirModel(firName);
 		})
		
}





function addFirModel(firName){
	//var subId=$("#subject", parent.document).val();
    var subId=$('.choosesub',parent.document)[0].id;
	if(firName !=null&&firName.length>0&&firName!=""){
		$.ajax({
		      type:"POST",
		      url: houtaiurl+"DevelopScenesController/addFirSceneTree.action",
		      data:{"firName":firName,"subId":subId,"treeName":treeName},
		      success:function(res){
		    	  if(res){
		    		  layer.alert("添加成功！");
		    		  getRootId();
		    	  }else{
		    		  layer.alert("添加失败！");
		    	  } 
		      }
		  });
	}else{
		layer.alert("请输入正确的类别名称");
	}
}

//得到一级分类信息(ceshi)
function getModelTree(rootId){
	//var subId=$("#subject", parent.document).val();
    var subId=$('.choosesub',parent.document)[0].id;
  $.ajax({
      type:"POST",
      url: houtaiurl+"DevelopScenesController/getSceneTree.action",
      data:{"subId":subId,"treeName":treeName,"rootId":rootId},
      success:function(res){
    	  console.log(res)
    	  showTree(res);
      }
  });
}
function gettScenesRootId(rootId){
	 $.ajax({
	      type:"POST",
	      url: houtaiurl+"DevelopScenesController/gettScenesRootId.action",
	      data:{"subId":rootId},
	      success:function(res){
	    	  console.log(res.id)
	    	  getModelTree(res.id);
	    	  
	    	  panduanAdmin(res.id,"Root");
	      }
	  });
}
function getRootId(subId){
    //固定subject  测试

    //var subId=$("#subject", parent.document).val();
    //var subId=$('.choosesub',parent.document)[0].id;
    //subId="ccabdcd3-9754-4426-9078-53ee4bd9d09c";
	$.ajax({
	      type:"POST",
	      url: houtaiurl+"DevelopScenesController/getSubjectScenesRootId.action",
	      data:{"subId":subId},
	      success:function(res){
	    	  console.log(res.id)
	    	  gettScenesRootId(res.id)
	      }
	  });
}
function showTree(res){
	console.log(res);
	treeNodes = res;
	$.fn.zTree.init($("#treeDemo"), setting, treeNodes);
}

$(document).ready(function(){
    var subjectid = $('.choosesub',parent.document)[0].id;
	getRootId(subjectid);
	//var odiv=document.getElementById("subject");

    var subject =  $(window.parent.document).find(".choosesub");
    console.log(subject);

    subject.bind('DOMNodeInserted',function(e) {
        console.log('DOMNodeInserted');
        console.log($(e.target));//change
        console.log()
        getRootId(subject.attr('id'))
    })

	//panduanAdmin("7fb53e8f-baf1-4c1e-8868-bad634e81461","Root");
//	$.fn.zTree.init($("#treeDemo"), setting, zNodes);
});
