var curMenu = null, zTree_Menu = null;
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
};

var zNodes =[
	{ id:1, pId:0, name:"第一章 概述", open:true},
	{ id:11, pId:1, name:"第一节 3Dmax的安装与配置"},
	{ id:12, pId:1, name:"第二节 3Dmax的安装与配置"},
	{ id:13, pId:1, name:"第三节 3Dmax的安装与配置"},
	{ id:14, pId:1, name:"第四节 3Dmax的安装与配置"},
	{ id:15, pId:1, name:"第五节 3Dmax的安装与配置"},
	{ id:2, pId:0, name:"第二章 安装与配置"},
	{ id:21, pId:2, name:"第一节 3Dmax的安装与配置"},
	{ id:22, pId:2, name:"第二节3Dmax的安装与配置"},
	{ id:3, pId:0, name:"第三章 安装与配置"},
	{ id:31, pId:3, name:"第一节 3Dmax的安装与配置"},
	{ id:32, pId:3, name:"第二节3Dmax的安装与配置"},
	{ id:4, pId:0, name:"第三章 安装与配置"},
	{ id:41, pId:4, name:"第一节 3Dmax的安装与配置"},
	{ id:42, pId:4, name:"第二节3Dmax的安装与配置"},
	{ id:5, pId:0, name:"第三章 安装与配置"},
	{ id:51, pId:5, name:"第一节 3Dmax的安装与配置"},
	{ id:52, pId:5, name:"第二节3Dmax的安装与配置"}
	
];
function addHoverDom(treeId, treeNode) {
	var aObj = $("#" + treeNode.tId + "_a");
	if ($("#diyBtn_"+treeNode.id).length>0) return;
	var editStr = "<span type='button' class='button edit' id='diyBtn_" + treeNode.id
		+ "' title='"+treeNode.name+"' onfocus='this.blur();'></span>";
	var editremove = "<span type='button' class='button remove' id='diyBtn_" + treeNode.id
	+ "' title='"+treeNode.name+"' onfocus='this.blur();'></span>";
	var editadd = "<span type='button' class='button add' id='diyBtn_" + treeNode.id
	+ "' title='"+treeNode.name+"' onfocus='this.blur();'></span>";
	aObj.append(editStr).append(editremove).append(editadd);
	var btn = $("#diyBtn_"+treeNode.id);
	if (btn) btn.bind("click", function(){alert("diy Button for " + treeNode.name);});
};
function removeHoverDom(treeId, treeNode) {
	$("#diyBtn_"+treeNode.id).unbind().remove();
	$("#diyBtn_"+treeNode.id).unbind().remove();
	$("#diyBtn_"+treeNode.id).unbind().remove();
};
$(function(){
	$.fn.zTree.init($("#treeDemo"), setting,zNodes);
})