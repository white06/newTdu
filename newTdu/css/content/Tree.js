/// <reference path="jquery.ztree.core-3.5.js" />

var Id = $('.choosesub',parent.document)[0].id;//parentwindow.find("#subject option:selected").val();
//Id="ccabdcd3-9754-4426-9078-53ee4bd9d09c";
var treetype=$("#sourcetree option:selected").val();
//treetype="bbb25171-3ba7-47f9-8834-ac637337e842";

var setting = {
	view: {
        showIcon: true,
		addHoverDom: addHoverDom,
		removeHoverDom: removeHoverDom,
		selectedMulti: false
	},
	edit: {
		enable: true,
		editNameSelectAll: true
	},
	callback: {
		beforeEditName: beforeEditName,
		beforeRename: beforeRename,
		beforeRemove: beforeRemove,
		onClick: onClick,
		beforeDrag: beforeDrag,
		onDrop: onDrop,
		beforeDrop: beforDrop
	},
	data: {
		simpleData: {
			enable: true
		}
	},
};
var abc;
var ztreeobj = $.fn.zTree.getZTreeObj("treeDemo");
var selectlist;
//当鼠标放在树上时新增图标的显示和图标绑定新增函数！
function addHoverDom(treeId, treeNode) {
	/*//console.log("****")
	//console.log(treeId)
	//console.log(treeNode.knowledgecontentId)*/
	if(treeNode.knowledgecontentId == "00000000-0000-0000-0000-000000000000") {
		var sObj = $("#" + treeNode.tId + "_span");
		if(treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
		var addStr = "<span class='button add' id='addBtn_" + treeNode.tId +
			"' title='add node'onfocus='this.blur();'></span>";
		sObj.after(addStr); //添加新增的图标！
		//console.log("添加新增按钮");
		var btn = $("#addBtn_" + treeNode.tId);
		if(btn) btn.bind("click", {
			isParent: false,
			parentNode: treeNode
		}, add);
	} else {

	}

	if(treeNode.level==0&&treeNode.isParent==true){
        var sObj = $("#" + treeNode.tId + "_span");
        if(treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
        var addStr = "<span class='button add' id='addBtn_" + treeNode.tId +
            "' title='add node'onfocus='this.blur();'></span>";
        sObj.after(addStr); //添加新增的图标！
        //console.log("添加新增按钮");
        var btn = $("#addBtn_" + treeNode.tId);
        if(btn) btn.bind("click", {
            isParent: false,
            parentNode: treeNode
        }, add);
	}
	//$.ajax({
	//    url: houtaiurl+PoolName+'/subjectTree/IsKnowledgeContent',
	//    data: { id:treeNode.id },
	//    type: "Post",
	//    async: false,        
	//    success: function (data) {
	//        if (data == "ok") {
	//        }
	//        else
	//        {              
	//        }
	//    }
	//});

};

//当鼠标离开树时新增图标的隐藏和图标绑定事件的解除！
function removeHoverDom(treeId, treeNode) {
	/*//console.log("----")*/
	$("#addBtn_" + treeNode.tId).unbind().remove();
};
var childCount = 0;
var parentcount = 0;
var parentwindow = $(window.parent.document);

//新增科目节点的函数在这里！
function add(e) {
	$("span.add,span.remove,span.edit").hide();
	var selectedtree = $("#sourcetree option:selected").val();
	if($.trim(selectedtree).length > 0) {
		str = "",
			isParent = e.data.isParent;
		var parentId = "";
		var preknowledge;
		//console.log($("#rootid").val())
		if(isParent) {
			newNode = ztreeobj.addNodes(e.data.parentNode, {
				id: "",
				isParent: isParent,
				name: "new node" + (++parentcount)
			});
			preknowledge = newNode[0].getPreNode();
			str = "random=" + Math.random() + "&Content=" + newNode[0].name + "&ParentKnowledge=" + $("#rootid").val() + "&PreKnowledge=" + ((preknowledge == undefined) ? "" : preknowledge.id) +
				"&treeId=" + selectedtree;
		} else {
			newNode = ztreeobj.addNodes(e.data.parentNode, {
				id: "",
				isParent: isParent,
				name: ""
			});
			newNode[0].name = newNode[0].getParentNode().name + "-" + (++childCount);
			parentId = newNode[0].getParentNode().id;
			preknowledge = newNode[0].getPreNode();
			str = "random=" + Math.random() + "&Content=" + newNode[0].name + "&ParentKnowledge=" + parentId + "&PreKnowledge=" + ((preknowledge == undefined) ? "" : preknowledge.id) +
				"&treeId=" + selectedtree;
			ztreeobj.updateNode(newNode[0]);
		}
		ztreeobj.editName(newNode[0]);
		$.ajax({
			type: "Get",
			url: houtaiurl + "/Knowledge/addKnowledge",
			data: str,
			async: false,
			success: function(data) {
				if(data.Key) {
					newNode[0].id = data.Value;
					selectlist = [];
					$("#saveTreeNode").val(data.Value);
					//GetNewDatas(true, "");
					$("span.add,span.remove,span.edit").show();
				}
			}
		});
	} else {
		$.messager.alert("提示", "请选择添加知识点的科目树");
	}
};

//删除节点的操作函数在这里！
function beforeRemove(treeId, treeNode) {
	ztreeobj.selectNode(treeNode);
	$("#saveTreeNode").val(treeNode.id);
	//GetNewDatas(true, "");
	selectlist = ztreeobj.getSelectedNodes();
	var parentdata = false;
	$.messager.confirm('系统提示', "确认删除该知识点？",
		function(r) {
			selectlist = [];
			$("#saveTreeNode").val($("#rootid").val());
			//GetNewDatas(true, "");
			var oldName = treeNode;
			var Id = treeNode.id;
			//console.log("Id:" + Id);

			if(r) {
				$.ajax({
					url: houtaiurl+"SubjectTreeController/Remove.action?random=" + Math.random(),
					data: {
						Id: Id,
						parent: true,
						subjectId: $('.choosesub',parent.document)[0].id//parentwindow.find("#subject option:selected").val()
					},
					type: "get",
					async: false,
					dataType: "json",
					success: function(data) {
						$("#sourcetree").trigger("change");
						//console.log(data.Key);
						if(data.Key) {
							parentdata = true;
							$.messager.alert("提示", data.Key);
							$("#sourcetree").off("change").on("change", function() {
								GetSubjectRootId($("#sourcetree option:selected").val());
								$.get(houtaiurl+"SubjectTreeController/seleKnowledges.action?random=" + Math.random(), data = {
									Id:Id,
									treetype: treetype
								}, function(data) {
									//$.get(PoolName + "/Home/GetSubjectKnowledges?random=" + Math.random(), data = { subjectId: parentwindow.find("#subject option:selected").val(), treetype: $("#sourcetree option:selected").val() }, function (data) {
									var zNodes = data;
									//console.log("addnode");
									$.fn.zTree.init($("#treeDemo"), setting, zNodes);
									//$("#uploadtoolbars").css("display", "none");
									ztreeobj = $.fn.zTree.getZTreeObj("treeDemo");
									selectlist = ztreeobj.getSelectedNodes();
									$("#addKnowledge").unbind("click").bind("click", {
										isParent: true,
										parentNode: ztreeobj.getNodeByParam("id", $("#rootid").val(), null)
									}, add);
									$("#saveTreeNode").val($("#rootid").val());
									$("#addcontent").trigger("click");
									//GetNewDatas(true, "");                   
								});
							});
						} else {
							parentdata = false;
							$.messager.alert("提示", data.Value);
							$("#sourcetree").off("change").on("change", function() {
								GetSubjectRootId($("#sourcetree option:selected").val());
								$.get(houtaiurl+"SubjectTreeController/seleKnowledges.action?random=" + Math.random(), data = {
									Id: Id,
									treetype: treetype
								}, function(data) {
									//$.get(PoolName + "/Home/GetSubjectKnowledges?random=" + Math.random(), data = { subjectId: parentwindow.find("#subject option:selected").val(), treetype: $("#sourcetree option:selected").val() }, function (data) {
									var zNodes = data;
									$.fn.zTree.init($("#treeDemo"), setting, zNodes);
									//$("#uploadtoolbars").css("display", "none");
									ztreeobj = $.fn.zTree.getZTreeObj("treeDemo");
									selectlist = ztreeobj.getSelectedNodes();
									$("#addKnowledge").unbind("click").bind("click", {
										isParent: true,
										parentNode: ztreeobj.getNodeByParam("id", $("#rootid").val(), null)
									}, add);
									$("#saveTreeNode").val($("#rootid").val());
									$("#addcontent").trigger("click");
									//GetNewDatas(true, "");                   
								});
							});
						}

					}
				});
			}
			$("#btnUploadAll").hide();
			$("#simuliteform").hide();
			$("#Quesform").hide();
			$("#HomeWorkform").hide();
			$("#fileuploadform").hide();
			$("#customform").hide();
			$('#filelistholder').addClass('hide');
			$("#fileupload").val("");
			$('#brosweFile').val("");
			$('#filelistholder').children().remove();

		});
	return parentdata;
}
//点击编辑按钮的出发事件！
function beforeEditName(treeId, treeNode) {
	$("#saveTreeNode").val(treeNode.id);
	//GetNewDatas(true, "");

}
//编辑节点的操作函数在这里！
function beforeRename(treeId, treeNode, newName) {
	console.log(newName)
	selectlist = ztreeobj.getSelectedNodes();
	if($.trim(newName).length <= 0) {
		$.messager.alert("提示", "节点名称不能为空");
//		setTimeout(function() {
//			ztreeobj.editName(treeNode)
//		}, 10);
		//返回false不允许tree的数据更新！
		GetNewDatasRename();
		return true;
	} else {
		ztreeobj = $.fn.zTree.getZTreeObj("treeDemo");
		var Id = treeNode.id;
		//newName=encodeURI(encodeURI(newName));
		console.log(newName);
		$.ajax({
		      type:"POST",
		      url:houtaiurl+"TreesController/beforeRename.action?",
            	data :{
                newname: newName,
                    Id: Id
				},
		      success:function(res){
		      }
		  });
//		$.getJSON("TreesController/beforeRename.action?random=" + Math.random(), data = {
//			newname: newName,
//			Id: Id
//		}, function(data) {
//			//console.log(data.Key);
//			if(data.Key) {
//
//				return data.Key;
//			}
//			//else {
//			//    $.messager.alert("提示",data.Value);
//			//    treeNode.name = oldname;
//			//    ztreeobj.updateNode(treeNode);
//			//}
//		});
		//返回true允许tree的数据更新！
		return true;
	}
}
//节点拖拽完成调用的函数在这里！
var beforedragnextnode = null;

function beforeDrag(treeId, treeNodes) {

	beforedragnextnode = treeNodes[0].getNextNode();
	return true;
}

function beforDrop(treeId, treeNodes, targetNode, moveType) {
	//console.log(targetNode.Contentid);
	if(targetNode.Contentid != "00000000-0000-0000-0000-000000000000" && moveType == "inner") {

		return false;
	} else if(targetNode.Contentid == "00000000-0000-0000-0000-000000000000") {

		return true;
	} else {
		return true;
	}
}

function onDrop(event, treeId, treeNodes, targetNode, moveType) {
	if(moveType != null) {
		$.get(houtaiurl + "/Knowledge/Drag", data = {
			nextId: (treeNodes[0].getNextNode() === null) ? "" : treeNodes[0].getNextNode().id,
			nextprevknowledgeId: (treeNodes[0].getNextNode() === null) ? "" : treeNodes[0].id,
			prevId: (beforedragnextnode === null) ? "" : beforedragnextnode.id,
			prevprevknowledgeId: (beforedragnextnode === null) ? "" : ((beforedragnextnode.getPreNode() === null) ? "" : beforedragnextnode.getPreNode().id),
			selfId: treeNodes[0].id,
			selfprevknowledgeId: (treeNodes[0].getPreNode() === null) ? "" : treeNodes[0].getPreNode().id,
			selfparentknowledgeId: (treeNodes[0].pId === null) ? $("#rootid").val() : treeNodes[0].pId
		});
	}

}
//节点被点击后的事件函数在这里！
function onClick(event, treeId, treeNode) {
	//console.log(event)
	//console.log(treeId)
	//console.log(treeNode)
	abc = treeNode;
	//$("#uploadtoolbars").css("display", "block");
	$("#addcontent").trigger("click");
	ztreeobj.updateNode(treeNode);
	$("#saveTreeNode").val(treeNode.id);
	//console.log(event.target.className.indexOf("add"))
	if(event.target.className.indexOf("add") == -1) {
		if(selectlist.length > 0) {

			if(selectlist[0].id == treeNode.id) {
				//取消选中
				ztreeobj.cancelSelectedNode(selectlist[0]);
				selectlist = []
				$("#saveTreeNode").val($("#rootid").val());
				$("#addDocument,#addPDF,#addSimulite,#addQues,#addExamList,#addCustom").show();
				$("#addDocument,#addPDF,#addsimulite,#addQues,#addExamList,#addCusto").removeClass("active");
				$("#simuliteform,#Quesform,#fileuploadform,#HomeWorkform,#Examform,#customform").hide();
			} else {
				showSource(treeNode.knowledgecontentId)
				selectlist = ztreeobj.getSelectedNodes();
			}
		} else {
			//第一次选中
			showSource(treeNode.knowledgecontentId)
			selectlist = ztreeobj.getSelectedNodes();
		}
	} else {

	}
	// GetNewDatas(true, "");
}

function showSource(contentid) {
	console.log(contentid)
	//隐藏内容
	$("#addDocument,#addPDF,#addSimulite,#addQues,#addExamList,#addCustom").hide();
	if(contentid == "00000000-0000-0000-0000-000000000000") {
		//展示内容
		$("#addDocument,#addPDF,#addSimulite,#addQues,#addExamList,#addCusto").show();
		$("#addDocument,#addPDF,#addsimulite,#addQues,#addExamList,#addCust").removeClass("active");
		//隐藏框
		$("#simuliteform,#Quesform,#fileuploadform,#HomeWorkform,#Examform,#customform").hide();
	} else {
		$.ajax({
			url: houtaiurl+"SubjectTreeController/getType.action",
			data: {
				contentid: contentid
			},
			type: "post",
			async: false,
			success: function(data) {
				//console.log(data.data);
				//console.log(contentid)
				switch(data.data) {
					/*case "图片":
						bindPrevSourceEvent("addPhoto", contentid);
						$("#addPhoto").show();
						break;*/
					case "video":
						bindPrevSourceEvent("addVideo", contentid);
						$("#addVideo").show();
						break;
					case "音频":
						bindPrevSourceEvent("addVideo", contentid);
						$("#addVideo").show();
						break;
					case "Office":
						bindPrevSourceEvent("addDocument", contentid);
						$("#addDocument").show();
						break;
					case "PDF":
						bindPrevSourceEvent("addPDF", contentid);
						$("#addPDF").show();
						break;
					/*case "Swf":
						bindPrevSourceEvent("addFlash", contentid);
						$("#addFlash").show();
						break;*/
					case "仿真":
						//console.log("真:" + data);
						bindPrevSourceEvent("addSimulite", contentid);
						$("#addSimulite").show();
						break;
					case "错题库":
						bindPrevSourceEvent("addQues", contentid);
						$("#addQues").show();
						break;
					/*case "作业":
						bindPrevSourceEvent("addHomeWork", contentid);
						$("#addHomeWork").show();
						break;*/
					case "考试":
						bindPrevSourceEvent("addExamList", contentid);
						$("#addExamList").show();
						break;
					case "自定义":
						bindPrevSourceEvent("addCustom", contentid);
						$("#addCustom").show();
						break;
					/*case "HTML":
						bindPrevSourceEvent("addHtml", contentid);
						$("#addHtml").show();
						break;
					case "模型":
						bindPrevSourceEvent("addModel", contentid);
						$("#addModel").show();
						break;
					case "场景":
						bindPrevSourceEvent("addView", contentid);
						$("#addView").show();
						break;
					case "贴图":
						bindPrevSourceEvent("addChartlet", contentid);
						$("#addChartlet").show();
						break;
					case "声音":
						bindPrevSourceEvent("addVoice", contentid);
						$("#addVoice").show();
						break;*/
				}

			}
		});
	}
}

function GetSubjectRootId(treety) {
    var subjectId = $('.choosesub',parent.document)[0].id;
	$.ajax({
		type: "Get",
		url: houtaiurl+"SubjectTreeController/GetSubjectRootId.action",
		data: {
			//subjectId: parentwindow.find("#subject option:selected").val(),
            //treetype:"36c8c7c2-8aaf-44c9-b6c8-53e0e3fa3a68",
            subjectId: subjectId,
			treetype: treety,
			random: Math.random()
		},
		async: false,
		dataType: "json",
		success: function(data) {
			if(data.Key) {
				$("#rootid").val(data.Value);
			}

		}
	});
}

function GetSourceList() {
	//var subjectid = parentwindow.find("#subject option:selected").val();
	var subjectid=$('.choosesub',parent.document)[0].id;

    //subjectid="ccabdcd3-9754-4426-9078-53ee4bd9d09c"
	$.ajax({
		url: houtaiurl+"SubjectTreeController/getSourceList.action",
		type: "POST",
		data: {
			subjectid: subjectid
		},
        async: false,
		success: function(res) {
			var html = '';
			for(var i = 0; i < res.length; i++) {
				// 0-模型库 1-场景库 2-题库 3-考试 4-资源类
                if(res[i].style==2||res[i].style==3||res[i].style==4){
                    html += '<option value="' + res[i].id + '" title="">' + res[i].treeName + '</option>'
				}
			}
			$("#sourcetree").html(html);
		}
	});

}

$(function() {
	//获取资源树
	GetSourceList();
	//获取当前的科目
	var subject =  $(window.parent.document).find(".choosesub");//$(window.parent.document).find("#subject");
    console.log(subject);
	//展开或折叠全部节点
	$.fn.zTree.init($("#treeDemo"), setting, []);
	//获取科目根id
	GetSubjectRootId($("#sourcetree option:selected").val());
	//设置隐藏框的值
	$("#saveTreeNode").val($("#rootid").val());

    $.get(houtaiurl+"SubjectTreeController/seleKnowledges.action?random=" + Math.random(), data = { subjectId: $('.choosesub',parent.document)[0].id, treetype: $("#sourcetree option:selected").val() }, function (data) {
        var zNodes = data;
        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        //$("#uploadtoolbars").css("display", "none");
        ztreeobj = $.fn.zTree.getZTreeObj("treeDemo");
        selectlist = ztreeobj.getSelectedNodes();
        $("#addKnowledge").unbind("click").bind("click", {
            isParent: true,
            parentNode: ztreeobj.getNodeByParam("id", $("#rootid").val(), null)
        }, add);
        $("#saveTreeNode").val($("#rootid").val());
        $("#addcontent").trigger("click");
        //GetNewDatas(true, "");
    });


    subject.bind('DOMNodeInserted',function(e) {
        console.log('DOMNodeInserted');
        console.log($(e.target).html());//change
        $("#prevlist tbody").html("");
        //获取科目id
        var selectedvalue = $('.choosesub',parent.document)[0].id;//parentwindow.find("#subject option:selected").val();
        if($.trim(selectedvalue).length > 0) {
            $.get(houtaiurl+"SubjectTreeController/treeChange.action", data = {
                id: selectedvalue
            }, function(datas) {
                if(datas.length > 0) {
                    $("#sourcetree").html("");
                    for(var item in datas) {
                        if(datas[item].status < 2) {
                            // 0-模型库 1-场景库 2-题库 3-考试 4-资源类
                            if(datas[item].style==2||datas[item].style==3||datas[item].style==4){
                                $("#sourcetree").append(' <option value="' + datas[item].id + '" title="">' + datas[item].treeName + '</option>');
							}
                        }
                    }
                    $("#sourcetree").trigger("change");
                }
            });
        } else {
            $.fn.zTree.init($("#treeDemo"), setting, []);
            if($("#addcontent").length > 0) {
                $("#loaduppartail").hide();
                $("#addVideo,#addDocument,#addPDF").removeClass("selecteda");
            }
        }


    })

	/*subject.off("change.Tree").on("change.Tree", function() {

	});*/
	subject.trigger("change.Tree");
	$("#sourcetree").off("change").on("change", function() {
		GetSubjectRootId($("#sourcetree option:selected").val());
		/*$.get(houtaiurl+"SubjectTreeController/seleKnowledges.action?random=" + Math.random(), data = {
			Id: Id,
			treetype: treetype
		}, function(data) {*/
			$.get(houtaiurl+"SubjectTreeController/seleKnowledges.action?random=" + Math.random(), data = { subjectId: $('.choosesub',parent.document)[0].id, treetype: $("#sourcetree option:selected").val() }, function (data) {
			var zNodes = data;
			$.fn.zTree.init($("#treeDemo"), setting, zNodes);
			//$("#uploadtoolbars").css("display", "none");
			ztreeobj = $.fn.zTree.getZTreeObj("treeDemo");
			selectlist = ztreeobj.getSelectedNodes();
			$("#addKnowledge").unbind("click").bind("click", {
				isParent: true,
				parentNode: ztreeobj.getNodeByParam("id", $("#rootid").val(), null)
			}, add);
			$("#saveTreeNode").val($("#rootid").val());
			$("#addcontent").trigger("click");
			//GetNewDatas(true, "");                   
		});
	});
	$("#updateJS").click(function() {
		//选择当前窗口的父窗口的相应的子元素并展示
		parentwindow.find("#update_modal").show();
		parentwindow.find("#updatemodal").show();
		if($.trim($('.choosesub',parent.document)[0].id).length > 0) {
			$.post(houtaiurl+"SubjectTreeController/UpdateJS.action?Id=" + $('.choosesub',parent.document)[0].id, data = {
				treetype: $("#sourcetree option:selected").val()
			}, function(data) {
				if(data.Key == "success") {
					parentwindow.find("#updatemodal").hide();
					parentwindow.find("#update_modal").hide();

					$.messager.confirm('系统提示', data.Key, function(r) {
						if(r) {
							window.location.reload();
							$.fn.zTree.init($("#treeDemo"), setting, []);
						}
					});

				}
			});
		} else {
			$.messager.alert("提示", "请选择要更新的科目");
		}
	});
	$("#ChangeOldToNew").click(function() {
		parentwindow.find("#update_modal").show();
		parentwindow.find("#updatemodal").show();
		if($.trim(parentwindow.find("#subject option:selected").val()).length > 0) {
			$.post(PoolName + "/Knowledge/ChangeOldToNew", data = {}, function(data) {
				$.messager.alert("提示", data);
			});
		}

	});

});

function bindPrevSourceEvent(id, clickid) {
	////console.log(abc);
	$("#sourcelist tbody").html("");
	$("#addDocument,#addPDF,#addSimulite,#addQues,#addCustom,#addExamList").removeClass("active");
	$("#" + id).addClass("active");
	$("#btnUploadAll").hide();
	$("#simuliteform").hide();
	$("#Quesform").hide();
	$("#HomeWorkform").hide();
	$("#fileuploadform").hide();
	$("#customform").hide();
	$('#filelistholder').addClass('hide');
	$("#fileupload").val("");
	$('#brosweFile').val("");
	$('#filelistholder').children().remove();
	if(id == "addSimulite") {
        $("#editsimulate,#newsimulate,#newaddQues,#editQues,#newaddcustom,#editcustom,#addmyexam,#Seeseesimulate,#SeeseeQues,#Seeseecustom,#seemyexam").remove();
		$.get(houtaiurl+"SubjectTreeController/GetSimulateParams.action", data = {
			id: clickid
		}, function(data) {
			//将数据nmae解析成text/xml文件
			//var xml = new DOMParser().parseFromString(data.nmae, "text/xml");
			//获取以url标签名的第一个元素的文本内容
			//var url = xml.getElementsByTagName("url")[0].textContent;
			//获取以params标签名的第一个元素的文本内容
			//var params = xml.getElementsByTagName("params")[0].textContent;
			//获取以step标签名的第一个元素的文本内容
			//var step = xml.getElementsByTagName("step")[0].textContent;
			//获取以substep标签名的第一个元素的文本内容
			//var substep = xml.getElementsByTagName("substep")[0].textContent;
			//获取该标签名的第一个元素的文本内容
			//var TDuViewerFolder = xml.getElementsByTagName("TDuViewerFolder")[0].textContent;
			//从数据中获取各个参数
			var custname = data.customname;
			//console.log("custname:" + custname);
			var cusstyle = data.customstyle;
			//console.log("cusstyle:" + cusstyle);
			var imageicon = data.imageContentIcons;
			//console.log("imageicon:" + imageicon);
            var url = data.nmae;
			$("#simulname").val(custname);
			$("#style option").each(function() {
				var $this = $(this);
				if($this.val() == cusstyle) {
					$this.prop({
						selected: "true"
					});
				}
			});

			//给给个id的位置设置相应参数
			$("#urladdress").val(url);
			//$("#scan").val(params);
			//$("#step").val(step);
			//$("#substep").val(substep);
			//$("#TDuViewerFolder").val(TDuViewerFolder)
		
		});
		//在表单后追加提交等按钮
		$("#simuliteform form").append('<div class="form-group" id="editsimulate">'+
									'<a class="col-md-offset-5 col-lg-offset-5 col-xs-offset-5 col-sm-offset-5" href="javascript:;">'+
								//	'<input  id="downloadModel" style="position:relative;right:30px;" class="btn btn-primary" type="button" value="下载场景" onclick="downloadModel();" />'+
									'<input  id="editSimulation" style="position:relative;right:30px;" class="btn btn-primary" type="button" value="编辑场景" onclick="openRoom2();" /></a>'+
									'<input  id="savesimulate" class="btn btn-primary" type="button" value="保存" /></a>'+
									/*'<a href="javascript:;" style="margin-left:30px"><input id="deletsimulate" class="btn btn-primary" type="button" value="删除" /></a>'+*/
									/*'<a id="downloadModel"  style="margin-left:30px"><input id="Seeseesimulate" class="btn btn-primary" type="button" value="下载场景" /></a>'+*/
								//	'<a href="content/cz/'+sence+'" download="'+sence+'" style="margin-left:30px"><input id="downloadModel" class="btn btn-primary" type="button" value="下载场景" /></a>'+
									'<input id="beforesetting" class="btn btn-primary" value="前置" type="button" style="margin-left:20px;" /></div>');
		//关闭点击事件避免重复提交并将数据传递给后台
		$("#savesimulate").off("click").on("click", function() {
			var parasxml = "<PARAS><url>" + $("#urladdress").val() + "</url><params>" + $("#scan").val() + "</params><step>" + $("#step").val() + "</step><substep>" + $("#substep").val() + "</substep><TDuViewerFolder>" + $("#TDuViewerFolder").val() + "</TDuViewerFolder></PARAS>";
			$.post(houtaiurl+"SubjectTreeController/SaveSimulateModel.action", data = {
				simulate: $("#urladdress").val(),
				sourceid: clickid,
				name: $("#simulname").val(),
				cusstyle: $("#style option:selected").val()
			}, function(data) {
				//console.log("shuju:" + data);
				if(data.Key) {
					$.messager.alert("提示", data.Value);
					// GetNewDatas(false, clickid);
					$("#simuliteform,#Quesform,#fileuploadform").hide();
					$("#addSimulite").removeClass("active");
				}
			});
		});
		//移除点击事件并绑定新的点击事件
		$("#Seeseesimulate").off("click").on("click", function() {
				var sence = $("#scan").val();
				var downloadUrl="content/cz/"+sence;
				var downloadModel=document.getElementById("downloadModel");
				downloadModel.setAttribute("href", downloadUrl);
				downloadModel.setAttribute("download", sence);
		});
		$("#deletsimulate").off("click").on("click", function() {
			if(confirm("确定删除该资源？")) {
				$.get(houtaiurl+"SubjectTreeController/DeleteSimulateModel.action", data = {
					sourceid: clickid
				}, function(data) {
					if(data.Key) {
						$.messager.alert("提示", data.Value);
						$("#prevlist tbody").find("#" + clickid).remove();
						$("#addSimulite").trigger("click");
						$("#simuliteform,#Quesform,#fileuploadform").hide();
						$("#addSimulite").removeClass("active");
					}
				});
			}
		});
		$("#beforesetting").off("click").on("click", function() {

			var photohtml = '<div><input type="hidden" id="settingobjectid" value="' + $("#saveTreeNode").val() + '"/>前置方式：<select id="beforeWay" onchange="changeHtml()"><option value="1">预览过资源</option><option value="2">作业或考试达到一定分数</option></select></div><div id="beforeContent"></div>';

			$("#dlgbeforsetting").html(photohtml);
			$("#dlgbeforsetting").dialog('open');

			$("#beforeWay").trigger("change");

		});

		$("#simuliteform").show();
	} else if(id == "addQues") {
        $("#editsimulate,#newsimulate,#newaddQues,#editQues,#newaddcustom,#editcustom,#addmyexam,#Seeseesimulate,#SeeseeQues,#Seeseecustom,#seemyexam").remove();
		$.get(houtaiurl+"SubjectTreeController/GetParams.action", data = {
			id: clickid
		}, function(data) {
			var xml = new DOMParser().parseFromString(data.filename, "text/xml");
			var url = xml.getElementsByTagName("url")[0].textContent;
			var num = xml.getElementsByTagName("num")[0].textContent;
			var custname = data.customname;
			var cusstyle = data.customstyle;
			var imagicon = data.imageicon;
			$("#Quesname").val(custname);
			$("#Quesstyle option").each(function() {
				var $this = $(this);
				if($this.val() == cusstyle) {
					$this.prop({
						selected: "true"
					});
				}
			});
			$("#QuesType option").each(function() {
				var $this = $(this);
				var op;
				if(url.indexOf("RandomQuestions") > 0) {
					if(url.length > 34) {
						op = "1"
					} else {
						op = "3"
					}
				} else {
					op = "2"
				}
				if($this.val() == op) {
					$this.prop({
						selected: "true"
					});
				}
			});
			$("#Quesnum").val(num);

		});
		$("#Quesform form").append('<div class="form-group" id="editQues"><a class="col-md-offset-5 col-lg-offset-5 col-xs-offset-5 col-sm-offset-5" href="javascript:;"><input  id="saveQues" class="btn btn-primary" type="button" value="保存" /></a><a href="javascript:;" style="margin-left:30px"><input id="deletQues" class="btn btn-primary" type="button" value="删除" /></a><a href="javascript:;" style="margin-left:30px"><input id="SeeseeQues" class="btn btn-primary" type="button" value="预览" /></a><input id="beforesetting" class="btn btn-primary" value="前置" type="button" style="margin-left:20px;" /></div>');
		$("#saveQues").off("click").on("click", function() {
			var parasxml;
			if($("#QuesType").val() == 1) {
				parasxml = "<PARAS><url>/ErrorQues/RandomQuestions/?kcid=" + $("#saveTreeNode").val() + "</url><num>" + $("#Quesnum").val() + "</num></PARAS>";
			} else if($("#QuesType").val() == 2) {
				parasxml = "<PARAS><url>/ErrorQues/ErrorQuestionlist/?kcid=" + $("#saveTreeNode").val() + "</url><num>" + $("#Quesnum").val() + "</num></PARAS>";
			} else if($("#QuesType").val() == 3) {
				parasxml = "<PARAS><url>/ErrorQues/RandomQuestions/?kcid=</url><num>" + $("#Quesnum").val() + "</num></PARAS>";
			}
			$.get(PoolName + "/Training/SaveQuesModel", data = {
				errorques: parasxml,
				sourceid: clickid,
				name: $("#Quesname").val(),
				cusstyle: $("#Quesstyle option:selected").val()
			}, function(data) {
				if(data.Key) {
					$.messager.alert("提示", data.Value);
					//GetNewDatas(false, clickid);
					$("#simuliteform,#Quesform,#fileuploadform").hide();
					$("#addQues").removeClass("active");
				}
			});
		});
		$("#SeeseeQues").off("click").on("click", function() {
			var parasxml;
			if($("#QuesType").val() == 1) {
				parasxml = PoolName + "/ErrorQues/RandomQuestionsSee/?kcid=" + $("#saveTreeNode").val() + "&num=" + $("#Quesnum").val();
			} else if($("#QuesType").val() == 2) {
				parasxml = PoolName + "/ErrorQues/ErrorQuestionlistSee/?kcid=" + $("#saveTreeNode").val() + "&num=" + $("#Quesnum").val();
			} else if($("#QuesType").val() == 3) {
				parasxml = PoolName + "/ErrorQues/RandomQuestionsSee/?kcid=&num=" + $("#Quesnum").val();
			}
			parentwindow.find("#dlg").html("");
			parentwindow.find("#dlg").append('<div class="ptwindow_bg" id="randomexam-shadow"></div>' +
				'<div class="ptwindow_shadow" style="height:100%;top:10px;" id="randomexammodal">' +
				'<div class="win_con ulib-r3" style="height:100%;width:100%;">' +
				'<div class="win_bg ulib-r3" style="width:600px;height:600px;margin:auto">' +
				'<a href="javascript:;" onclick="if (confirm(\'确定离开作答？\')) { $(\'#randomexammodal\').hide(); $(\'#randomexam-shadow\').hide(); $(\'#randomexam_iframe\').prop({ src: \'\' });  }" class="btn-close" style="position:initial;float:right">x</a>' +
				'<div class="massege-tt ulib-r3">模拟作答</div>' +
				'<div class="massege-tx" style="height:90%;">' +
				'<iframe id="randomexam_iframe" src="" style="width:100%;height:100%;overflow:hidden" hidden></iframe>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>');

			parentwindow.find('#randomexammodal').show();
			parentwindow.find('#randomexam-shadow').show();
			parentwindow.find("#randomexammodal div").show();
			parentwindow.find("#randomexam_iframe").prop({
				src: parasxml
			}).show();
			parent.openmydlg(id, "Ques");

		});
		$("#deletQues").off("click").on("click", function() {
			if(confirm("确定删除该资源？")) {
				$.get(PoolName + "/Training/DeleteQuesModel", data = {
					sourceid: clickid
				}, function(data) {
					if(data.Key) {
						$.messager.alert("提示", data.Value);
						$("#prevlist tbody").find("#" + clickid).remove();
						$("#addques").trigger("click");
						$("#simuliteform,#Quesform,#fileuploadform").hide();
						$("#addQues").removeClass("active");
					}
				});
			}
		});
		$("#beforesetting").off("click").on("click", function() {

			var photohtml = '<div><input type="hidden" id="settingobjectid" value="' + $("#saveTreeNode").val() + '"/>前置方式：<select id="beforeWay" onchange="changeHtml()"><option value="1">预览过资源</option><option value="2">作业或考试达到一定分数</option></select></div><div id="beforeContent"></div>';

			$("#dlgbeforsetting").html(photohtml);
			$("#dlgbeforsetting").dialog('open');

			$("#beforeWay").trigger("change");

		});
		$("#Quesform").show();
	}
	//-
	else if(id == "addCustom") {
        $("#editsimulate,#newsimulate,#newaddQues,#editQues,#newaddcustom,#editcustom,#addmyexam,#Seeseesimulate,#SeeseeQues,#Seeseecustom,#seemyexam").remove();
		$.get(houtaiurl+"SubjectTreeController/GetParams.action", data = {
			id: clickid
		}, function(data) {
			var xml = new DOMParser().parseFromString(data.filename, "text/xml");
			var url = xml.getElementsByTagName("url")[0].textContent;
			var type = xml.getElementsByTagName("type")[0].textContent;
			var custname = data.customname;
			var cusstyle = data.customstyle;
			var imagicon = data.imageicon;
			$("#customName").val(custname);
			$("#customaddress").val(url);
			$("#customstyle option").each(function() {
				var $this = $(this);
				if($this.val() == cusstyle) {
					$this.prop({
						selected: "true"
					});
				}
			});

		});
		$("#customform form").append('<div class="form-group" id="editcustom"><a class="col-md-offset-5 col-lg-offset-5 col-xs-offset-5 col-sm-offset-5" href="javascript:;"><input  id="savecustom" class="btn btn-primary" type="button" value="保存" /></a><a href="javascript:;" style="margin-left:30px"><input id="deletcustom" class="btn btn-primary" type="button" value="删除" /></a><a href="javascript:;" style="margin-left:30px"><input id="Seeseecustom" class="btn btn-primary" type="button" value="预览" /></a><input id="beforesetting" class="btn btn-primary" value="前置" type="button" style="margin-left:20px;" /></div>');
		$("#savecustom").off("click").on("click", function() {
			//console.log($("#customaddress").val());
			//console.log($("#customaddress").val().indexOf("http"))
			if($("#customaddress").val().indexOf("http") < 0) {
				var parasxml = "<PARAS><type>2</type><url>" + $("#customaddress").val() + "</url></PARAS>";
			} else {
				var parasxml = "<PARAS><type>1</type><url>" + $("#customaddress").val() + "</url></PARAS>";
			}

			$.get(houtaiurl+"SubjectTreeController/SaveCustomModel.action", data = {
				errorques: parasxml,
				sourceid: clickid,
				name: $("#customName").val(),
				cusstyle: $("#customstyle option:selected").val()
			}, function(data) {
				//console.log(name);
				if(data.Key) {
					$.messager.alert("提示", data.Value);
					//GetNewDatas(false, clickid);
					$("#simuliteform,#Quesform,#fileuploadform,#customform").hide();
					$("#addCustom").removeClass("active");
				}
			});
		});
		$("#Seeseecustom").off("click").on("click", function() {
			parentwindow.find("#dlg").html("");
			if($("#customaddress").val().indexOf("http") < 0) {
				var parasxml = PoolName + $("#customaddress").val();
			} else {
				var parasxml = $("#customaddress").val();
			}
			parentwindow.find("#dlg").append('<iframe style="width:100%;height:100%" id="customSee" src="' + parasxml + '"></iframe>');

			parent.openmydlg(id, "custom");
		});
		$("#deletcustom").off("click").on("click", function() {
			if(confirm("确定删除该资源？")) {
				$.get(PoolName + "/Training/DeleteCustomModel", data = {
					sourceid: clickid
				}, function(data) {
					if(data.Key) {
						$.messager.alert("提示", data.Value);
						$("#prevlist tbody").find("#" + clickid).remove();
						$("#addcustom").trigger("click");
						$("#simuliteform,#Quesform,#fileuploadform,#customform").hide();
						$("#addCustom").removeClass("active");
					}
				});
			}
		});
		$("#beforesetting").off("click").on("click", function() {

			var photohtml = '<div><input type="hidden" id="settingobjectid" value="' + $("#saveTreeNode").val() + '"/>前置方式：<select id="beforeWay" onchange="changeHtml()"><option value="1">预览过资源</option><option value="2">作业或考试达到一定分数</option></select></div><div id="beforeContent"></div>';

			$("#dlgbeforsetting").html(photohtml);
			$("#dlgbeforsetting").dialog('open');

			$("#beforeWay").trigger("change");

		});
		$("#customform").show();
	}
	//-
	else if(id == "addExamList") {
		$("#editsimulate,#newsimulate,#newaddQues,#editQues,#newaddcustom,#editcustom,#addmyexam,#Seeseesimulate,#SeeseeQues,#Seeseecustom,#seemyexam").remove();
		$("#myeditframeexam").remove();
		$("#myframeexam").remove();
		$("#Examform form").append('<input id="seemyexam" class="btn btn-primary" type="button" value="提交修改" style="margin-left:45%;" />');
		$("#HomeWorkform").hide();
		$("#Examform").show();
		console.log($("#saveTreeNode").val())
		getExamName($("#saveTreeNode").val());
		showExamInfo();

	} else {
		 $("#sourcelist tbody").append('<tr><td style="max-width:160px"></td><td></td><td></td><td><input id="startUpload" class="btn btn-primary btn-large" value="编辑上传" type="button" onclick="editorLoading()"/></td></tr>');

		setTimeout(function() {
			$("#fileuploadform").show();
			if(id === "addPhoto") {
				$("#btnUploadAll").show();

			}
		}, 100);
	}

}
//刷新功能
function updatePage(){
	$("#treeDemo").empty();
	$(function () {
		//获取资源树
		GetSourceList();
		//获取当前的科目
		var subject = $('.choosesub',parent.document)//$(window.parent.document).find("#subject");
		//console.log("----")
		//展开或折叠全部节点
		$.fn.zTree.init($("#treeDemo"), setting, []);
		//获取科目根id
		GetSubjectRootId($("#sourcetree option:selected").val());
		//设置隐藏框的值
		$("#saveTreeNode").val($("#rootid").val());
		subject.off("change.Tree").on("change.Tree", function () {
			$("#prevlist tbody").html("");
			//获取科目id
			var selectedvalue = $('.choosesub',parent.document)[0].id;
			//parentwindow.find("#subject option:selected").val();
			if ($.trim(selectedvalue).length > 0) {
				$.get(houtaiurl+"SubjectTreeController/treeChange.action", data = { id: selectedvalue }, function (datas) {
					if (datas.length > 0) {
						$("#sourcetree").html("");
						for (var item in datas) {
							if (datas[item].status< 2) {
                                // 0-模型库 1-场景库 2-题库 3-考试 4-资源类
                                if(datas[item].style==2||datas[item].style==3||datas[item].style==4){
                                    $("#sourcetree").append(' <option value="' + datas[item].id + '" title="">' + datas[item].treeName + '</option>');
								}
							}
						}
						$("#sourcetree").trigger("change");
					}
				});
			}
			else {
				$.fn.zTree.init($("#treeDemo"), setting, []);
				if ($("#addcontent").length > 0) {
					$("#loaduppartail").hide();
					$("#addVideo,#addDocument,#addPDF").removeClass("selecteda");
				}
			}
		});
		subject.trigger("change.Tree");
		$("#sourcetree").off("change").on("change", function () {
			GetSubjectRootId($("#sourcetree option:selected").val());
			//$.get("SubjectTreeController/seleKnowledges.action?random=" + Math.random(), data = { Id: Id, treetype: treetype }, function (data) {
				$.get(houtaiurl+"SubjectTreeController/seleKnowledges.action?random=" + Math.random(), data = { subjectId: $('.choosesub',parent.document)[0].id, treetype: $("#sourcetree option:selected").val() }, function (data) {
				var zNodes=data;
				$.fn.zTree.init($("#treeDemo"), setting, zNodes);
				//$("#uploadtoolbars").css("display", "none");
				ztreeobj = $.fn.zTree.getZTreeObj("treeDemo");
				selectlist = ztreeobj.getSelectedNodes();
				$("#addKnowledge").unbind("click").bind("click", { isParent: true, parentNode: ztreeobj.getNodeByParam("id", $("#rootid").val(), null) }, add);
				$("#saveTreeNode").val($("#rootid").val());
				$("#addcontent").trigger("click");
				//GetNewDatas(true, "");                   
			});
		});
		$("#updateJS").click(function () {
			parentwindow.find("#update_modal").show();
			parentwindow.find("#updatemodal").show();
			if ($.trim(parentwindow.find("#subject option:selected").val()).length > 0) {
				$.post(houtaiurl+"SubjectTreeController/UpdateJS?Id=" + $('.choosesub',parent.document)[0].id, data = { treetype: $("#sourcetree option:selected").val() }, function (data) {
					if (data.Key) {
						parentwindow.find("#updatemodal").hide();
						parentwindow.find("#update_modal").hide();

						$.messager.confirm('系统提示', data.Value, function (r) {
							if (r) {
								window.location.reload();
								$.fn.zTree.init($("#treeDemo"), setting, []);
							}
						});

					}
				});
			}
			else {
				$.messager.alert("提示","请选择要更新的科目");
			}
		});
		$("#ChangeOldToNew").click(function () {
			parentwindow.find("#update_modal").show();
			parentwindow.find("#updatemodal").show();
			if ($.trim($('.choosesub',parent.document)[0].id).length > 0) {
				$.post(PoolName + "/Knowledge/ChangeOldToNew", data = {  }, function (data) {
					$.messager.alert("提示",data);
				});
			}

		});

	});
}

function hidenform() {
	 $("#editsimulate,#newsimulate,#newaddQues,#editQues,#newaddcustom,#editcustom,#editHomeWork,#myframeexam,#addmyexam").remove();
}
function changeHtml() {
	$("#beforeContent").html("");
	var way = $("#beforeWay").val();
	var thtml1 = '<script type="text/javascript">' +
		'var settingphoto = {view: {selectedMulti: false}, edit: {enable: false, editNameSelectAll: false }, callback: {onClick: onClickPhoto,}, data: {simpleData: {enable: true}},};' +
		'var ztreeobjphoto = $.fn.zTree.getZTreeObj("treeDemobefore");' +
		'function onClickPhoto(event, treeId, treeNode){//console.log(treeNode);$("#chooseid").val(treeNode.id)} ' +
		'function gettree(){$.get(PoolName + "/Subject/TsubjectChange?random=" + Math.random(), data = { Id: $(window.parent.document).find("#subject").val(), knowledgetype: "' +
		"图片HTMLOFFICE文档PDF仿真自定义错题库" + '" }, function (data) {data;$.fn.zTree.init($("#treeDemobefore"), settingphoto, zNodes); ' +
		'ztreeobjphoto= $.fn.zTree.getZTreeObj("treeDemobefore");     });}</script>' +
		'<h3 style="margin-left:10%；font-size:18px;">' + "预览过某个资源" + '</h3><input type="hidden" id="chooseid"/><hr/><ul id="treeDemobefore" class="ztree" style="margin-left:0%;width:100%"></ul><hr/>' +
		'<button style="width:100%;height:100px;border-radius:5px;margin-left:0%;font-size:22px;font-family:\'微软雅黑\';background:#00A1FF;" onclick="settingbeforesee()">设置选中项为前置</button>';
	var thtml2 = '<script type="text/javascript">' +
		'var settingphoto = {view: {selectedMulti: false}, edit: {enable: false, editNameSelectAll: false }, callback: {onClick: onClickPhoto,}, data: {simpleData: {enable: true}},};' +
		'var ztreeobjphoto = $.fn.zTree.getZTreeObj("treeDemobefore");' +
		'function onClickPhoto(event, treeId, treeNode){//console.log(treeNode);$("#chooseid").val(treeNode.id)} ' +
		'function gettree(){$.get(PoolName + "/Subject/TsubjectChange?random=" + Math.random(), data = { Id: $(window.parent.document).find("#subject").val(), knowledgetype: "' +
		"考试作业" + '" }, function (data) {data;$.fn.zTree.init($("#treeDemobefore"), settingphoto, zNodes); ' +
		'ztreeobjphoto= $.fn.zTree.getZTreeObj("treeDemobefore");     });}</script>' +
		'<h3 style="margin-left:10%；font-size:18px;">' + "考试作业成绩达到分数" + '</h3><input type="hidden" id="chooseid"/><hr/><ul id="treeDemobefore" class="ztree" style="margin-left:0%;width:100%"></ul><hr/><span>分数达到：</span><input type="number" id="gradenum"/>' +
		'<button style="width:100%;height:100px;border-radius:5px;margin-left:0%;font-size:22px;font-family:\'微软雅黑\';background:#00A1FF;" onclick="settingbeforeGrade()">设置选中项为前置</button>';
	if(way == 1) {
		$("#beforeContent").append(thtml1);

	} else if(way == 2) {
		$("#beforeContent").append(thtml2);
	}
	gettree();

}
var settingbeforesee = function() {
	if($("#chooseid").val().length < 5) {
		$.messager.alert("信息提示", " 未选中资源", "error");
	} else {
		$.ajax({
			url: houtaiurl + "/Knowledge/SetBeforeCondition",
			data: {
				seeid: $("#chooseid").val(),
				Beforeid: $("#settingobjectid").val()
			},
			type: "POST",
			async: false,
			success: function(response) {
				if(response == "1") {
					$.messager.alert("信息提示", " 设置成功", "ok", function() {

					});
				}
			}
		});
	}
}
var settingbeforeGrade = function() {
	if($("#chooseid").val().length < 5) {
		$.messager.alert("信息提示", " 未选中资源", "error");
	} else {
		$.ajax({
			url: houtaiurl + "/Knowledge/SetBeforeConditionGrade",
			data: {
				homeexamid: $("#chooseid").val(),
				Beforeid: $("#settingobjectid").val(),
				gradenum: $("#gradenum").val()
			},
			type: "POST",
			async: false,
			success: function(response) {

			}
		});
	}
}
function GetNewDatas(isnew, strid,index_id) {
	/*$.get(houtaiurl+"SubjectTreeController/seleKnowledges.action?random=" + Math.random(), data = {
		Id: Id,
		treetype: treetype
	}, function(data) {*/
		$.get(houtaiurl+"SubjectTreeController/seleKnowledges.action?random=" + Math.random(), data = { subjectId: $('.choosesub',parent.document)[0].id, treetype: $("#sourcetree option:selected").val() }, function (data) {
		var zNodes = data;
		$.fn.zTree.init($("#treeDemo"), setting, zNodes);
		//$("#uploadtoolbars").css("display", "none");
		ztreeobj = $.fn.zTree.getZTreeObj("treeDemo");
		selectlist = ztreeobj.getSelectedNodes();
		$("#addKnowledge").unbind("click").bind("click", {
			isParent: true,
			parentNode: ztreeobj.getNodeByParam("id", $("#rootid").val(), null)
		}, add);
		$("#saveTreeNode").val($("#rootid").val());
		$("#addcontent").trigger("click");
		//GetNewDatas(true, "");                   
	});
}
function GetNewDatasRename() {
	/*$.get(houtaiurl+"SubjectTreeController/seleKnowledges.action?random=" + Math.random(), data = {
		Id: Id,
		treetype:treetype
	}, function(data) {*/
		$.get(houtaiurl+"SubjectTreeController/seleKnowledges.action?random=" + Math.random(), data = { subjectId: $('.choosesub',parent.document)[0].id, treetype: $("#sourcetree option:selected").val() }, function (data) {
		var zNodes = data;
		$.fn.zTree.init($("#treeDemo"), setting, zNodes);
		//$("#uploadtoolbars").css("display", "none");
		ztreeobj = $.fn.zTree.getZTreeObj("treeDemo");
		selectlist = ztreeobj.getSelectedNodes();
		$("#addKnowledge").unbind("click").bind("click", {
			isParent: true,
			parentNode: ztreeobj.getNodeByParam("id", $("#rootid").val(), null)
		}, add);
		$("#saveTreeNode").val($("#rootid").val());
		$("#addcontent").trigger("click");
		//GetNewDatas(true, "");                   
	});
}


function prevSourceListDefault() {
	$("#prevlist tbody").find("button").each(function() {
		if($(this).hasClass("btn-danger")) {
			$(this).removeClass("btn-danger");
			$(this).addClass("btn-primary")
		}
	});
}

function openRoom2() {
	var sence = $("#scan").val();
	////console.log(navigator.cookieEnabled);
	//document.cookie = "scene="+sence+";path=/";
	////console.log(document.cookie);
	window.location.href = "content/fangzhen/test.php?saveparam="+sence;
	//$("#uploadtoolbars").load('content/fangzhen/test.php');
}
function downloadModel() {
	alert("111");
}

//编辑pdf上传功能
function editorLoading(){
	var url=houtaiurl+"addKnowledge/editorLoading.action";
	//资源名
	var customname=$("#customname").val();
	//资源介绍
	var introduce=$("#introduce").val();
	//资源样式
	var customstyle=$("#customstyle2").val();
	//添加文件
	var brosweFile=$("#brosweFile").val();
	
	var File1 = $("#fileupload")[0].files[0];
	if(File1==undefined){
		$.messager.alert("提示","上传的文件不存在！");
		return ;
	}
	//获取科目树id
	var subjectTreeId=$("#sourcetree").val();
	var treeNodeId=$("#saveTreeNode").val();
	//console.log(subjectTreeId,treeNodeId);
	var data= new FormData;
	var type=$(".active");
	for(var i=0;i<type.length;i++){
		var typeid=$(type[i])[0].id;
		if(typeid=="addPhoto"||typeid=="addVideo"||typeid=="addDocument"||typeid=="addPDF"||typeid=="addFlash"||typeid=="addOSGJS"){
    		data.append("customname",customname);
    		data.append("introduce",introduce);
    		data.append("customstyle",customstyle);
    		data.append("brosweFile",brosweFile);
    		data.append("subjectTreeId",subjectTreeId);
    		data.append("treeNodeId",treeNodeId);
    		data.append("type",typeid);
    		data.append("file",File1);
    		$.ajax({
    			type:"POST",
    			url:url,
    			data:data,
    			contentType:false,
    			processData:false,
    			success:function(data){
    				if(data=="ok"){
    					$.messager.alert("提示","上传成功！");
    					updatePage();
    				}else{
    					$.messager.alert("提示","上传失败!");
    				}
    			}
    		});
    	}
	}
	
}

//考试下拉框选择
function showExamInfo(){
    var subjectid = $('.choosesub',parent.document)[0].id;//$(window.parent.document).find("#subject").val();
 	var url = houtaiurl+"ExamController/getPages.action";
 	var html='';
 		$.post(url, {
 			"subjectid" : subjectid
 		}, function(result) {
 			for(var i=0;i<result.length;i++){
 				
 				html+='<option value="'+result[i].id+'">'+result[i].name+'</option>';
 			}
 			//console.log(html);
 			$("#examType").empty();
 			$("#examType").append(html);
 		});
 }
//获取名称
function getExamName(examId){
	//console.log(examId);
	var url = houtaiurl+"addKnowledge/getExamName.action"
		$.post(url, {
			"examId" : examId
		}, function(result) {
			//console.log(result);
		}); 
}