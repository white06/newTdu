var IDMark_Swith = "_swith",
				IDMark_Icon = "_ico",
				IDMark_Span = "_span",
				IDMark_Input = "_input",
				IDMark_Check = "_check",
				IDMark_Edit = "_edit",
				IDMark_Remove = "_remove",
				IDMark_Ul = "_ul",
				IDMark_A= "_a";
//ztree的基础设置
var setting ={
			view:{
				addHoverDom: addHoverDom,
				removeHoverDom: removeHoverDom
			},
			callback: {
				beforeClick: beforeClick,
				onClick: onClick
			}
	};

function beforeClick(treeId,treeNode,clickFlag){
	var ticketBagNo =treeNode.phone;
	re=new RegExp(ticketBagNo);
	
	var accept =$("#accept").val();
	if(!re.test(accept)){
		$("#accept").val(accept+treeNode.name+"<"+ticketBagNo+">");
	}
}
	function onClick(event,treeId, treeNode,clickFlag){
		
	}
	
//全选功能
	function addHoverDom(treeId, treeNode) {
		if (!treeNode.children)return;
	if (treeNode.parentNode && treeNode.parentNode.id!=1 ) return;
	var aObj = $("#" + treeNode.tId + IDMark_A);
	if (treeNode.children.length>0) {
		if ($("#diyBtn1_"+treeNode.id).length>0) return;
		if ($("#diyBtn2_"+treeNode.id).length>0) return;//' onclick='allSelect("+treeNode+")
		var editStr = "<a id='diyBtn1_" +treeNode.id+ "' style='margin:0 0 0 5px;color:red;'>全选</a>";
		aObj.append(editStr);
		document.getElementById("diyBtn1_"+treeNode.id).onclick = function() {
             allSelect(treeNode);
                      };
	}
		
}
//全选方法
	function allSelect(treeNode){
		if (!treeNode.children)return;
		for(i=0;i<treeNode.children.length;i++){
			var ticketBagNo = treeNode.children[i].phone;
		re =new RegExp(ticketBagNo);  
		var accept = $("#accept").val();//找到文本框如果该记录未添加就添加
		if(!re.test(accept)){
			$("#accept").val(accept+treeNode.children[i].name+"<"+ticketBagNo+">,");
		}
		}
	}
//鼠标事件
function removeHoverDom(treeId, treeNode) {
		if (!treeNode.children)return;
		$("#diyBtn1_"+treeNode.id).unbind().remove();
}

//demo数据
var zNodes =[
	{id:1,name:"所有老师",open:false,//这里false为默认关闭,true打开
	children:[
		
		{id:2,name:"测试老师",phone:"123456789101"},
		{id:3,name:"大老师",phone:"15623545621"}
	]
	},
	{id:4,name:"一班",open:true,
	children:[
		
			 {id:5,name:"小花",phone:"25364215211"},
			{id:6,name:"小绿",phone:"365241253"}
			 ]
    },

    {id:7,name:"二班",open:true,
	children:[
		
			{id:8,name:"小家",phone:"25364215211"},
			{id:9,name:"小沙",phone:"365241253"}
			]
        }
] ;
$(document).ready(function(){

	$.fn.zTree.init($("#treeDemo"), setting, zNodes);
});