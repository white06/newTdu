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
				showIcon:true
			//	fontCss:{'color':'blue','font-size':'16px'}
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
	function onClick(event,treeId, treeNode){
		if(treeNode.children==null){
			opentab(treeNode.id,treeNode.name);
		}
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
                content: '<iframe src="'+'../../SysAdministrate/Model/modelShow.php?subModelId=' + plugin + '" style="width:100%;height:800px;border:none;overflow:hidden"></iframe>'

            });
        }
    }	
	
//全选功能(keshan)
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
//全选方法(keshan)
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


//得到一级分类信息(ceshi)
function getModelTree(){
  $.ajax({
      type:"POST",
      url:"../../../ModelController/getModelTree.action",
      success:function(res){
    	  showTree(res);
      }
  });
}

function showTree(res){
	console.log(res);
	$.fn.zTree.init($("#treeDemo"), setting, res);
}
//demo数据
var zNodes =[
	{id:"10a98ece-1dab-4ad1-ab45-5395f2d56e48",name:"家电",open:false,//这里false为默认关闭,true打开
	children:[
		
		{id:"1285a72b-3481-456c-8c82-06eb9e468879",name:"冰箱",parentId:"10a98ece-1dab-4ad1-ab45-5395f2d56e48"},
		{id:"16661497-d9d7-4f03-b179-42913f472783",name:"电风扇",parentId:"10a98ece-1dab-4ad1-ab45-5395f2d56e48"},
		{id:"182908c0-7966-4f0c-a4d8-7d7ddf602719",name:"电视电脑",parentId:"10a98ece-1dab-4ad1-ab45-5395f2d56e48"},
		{id:"2a0cf453-0d29-4da2-bbbd-d35ad2f4be13",name:"饮水机",parentId:"10a98ece-1dab-4ad1-ab45-5395f2d56e48"},
		{id:"3269d579-6e0f-43db-aa93-6a70f2b41466",name:"空调",parentId:"10a98ece-1dab-4ad1-ab45-5395f2d56e48"},
		{id:"3a74b4df-26fa-4de8-905e-6bb89c8851c5",name:"数码产品",parentId:"10a98ece-1dab-4ad1-ab45-5395f2d56e48"},
		{id:"46494925-e77d-433c-9524-0a5f2878fb1e",name:"洗衣机",parentId:"10a98ece-1dab-4ad1-ab45-5395f2d56e48"},
		{id:"5e7f59ea-5891-49b8-a327-0b80281379b5",name:"油烟机",parentId:"10a98ece-1dab-4ad1-ab45-5395f2d56e48"},
		{id:"6139e455-748a-4dd4-ac66-bbcfd31a4c39",name:"热水器",parentId:"10a98ece-1dab-4ad1-ab45-5395f2d56e48"},
		{id:"8efa0540-deb4-45d6-8ce3-d050a227b0d5",name:"燃气灶",parentId:"10a98ece-1dab-4ad1-ab45-5395f2d56e48"},
		{id:"9a87daa1-70de-4777-9588-e366e0e4cef4",name:"门铃电话",parentId:"10a98ece-1dab-4ad1-ab45-5395f2d56e48"},
		{id:"a233b89c-bddb-42b4-8e95-cf52539d127a",name:"烤箱",parentId:"10a98ece-1dab-4ad1-ab45-5395f2d56e48"},
		{id:"c5151441-cb41-4273-ab1d-27f8f5c1fd71",name:"其他家电",parentId:"10a98ece-1dab-4ad1-ab45-5395f2d56e48"},
	]
	},
	
	{id:"145d5930-81f8-49f1-812c-f03385dc0165",name:"卫浴",open:false,
	children:[
		
			]
    },

    {id:"1763b74f-97ca-4744-8b75-a8868409418d",name:"盆栽",open:false,
	    children:[
		
		{id:"b112436b-4dfd-40bd-978d-007e5e03b229",name:"盆栽",parentId:"1763b74f-97ca-4744-8b75-a8868409418d"}
			]
        },
        
    {id:"282dfcfe-3ff1-47e5-bc6d-1c333922a687",name:"床",open:false,//这里false为默认关闭,true打开
        	children:[
        		
        	{id:"3ead54b6-c3ae-4673-8cff-bd38214f669b",name:"单人床",parentId:"282dfcfe-3ff1-47e5-bc6d-1c333922a687"},
        	{id:"961e7cd2-6ac5-4be2-841c-96397bb78033",name:"单人床",parentId:"282dfcfe-3ff1-47e5-bc6d-1c333922a687"}
        	]
    	},
    	
    {id:"2835341b-b1c5-4818-a49e-569670bac3f5",name:"椅子",open:false,//这里false为默认关闭,true打开
        	children:[
        		
        	{id:"d9f262ec-278f-4d78-b068-d84de47c07a2",name:"椅子",parentId:"2835341b-b1c5-4818-a49e-569670bac3f5"}
        	]
        	},
        	
    {id:"3120274a-f88c-4709-b1e5-efbb8dbca981",name:"茶几",open:false,//这里false为默认关闭,true打开
            children:[
            		
            {id:"61cda318-f2c0-47c8-98fd-d667b70ce780",name:"圆形茶几",parentId:"3120274a-f88c-4709-b1e5-efbb8dbca981"},
            {id:"eaab069e-eb59-491f-af55-8c6a7a6f6b37",name:"方形茶几",parentId:"3120274a-f88c-4709-b1e5-efbb8dbca981"}
            ]
            },
            	
     {id:"3bb16095-1242-43bc-b4fd-b61bb8d9b40e",name:"户外小品",open:false,//这里false为默认关闭,true打开
            children:[
                		
                	]
                	},
                	
     {id:"4592b3cc-9b29-408d-b23a-be0c02cc3e28",name:"门",open:false,//这里false为默认关闭,true打开
            children:[
                    		
            {id:"19bd978a-34f6-4d45-a1bf-2882f2757ca8",name:"双开门",parentId:"4592b3cc-9b29-408d-b23a-be0c02cc3e28"},
            {id:"d494b303-27be-4cc1-ba31-71585d7e1dd3",name:"单开门",parentId:"4592b3cc-9b29-408d-b23a-be0c02cc3e28"}
                    	]
                    	},
     
     {id:"4bd09bec-45c6-4265-9696-1bdee8cbfd4c",name:"沙发",open:false,//这里false为默认关闭,true打开
            children:[
                        		
            	 {id:"08d76fa6-b61e-48bd-95f6-78d99e4cea11",name:"多人沙发",parentId:"4bd09bec-45c6-4265-9696-1bdee8cbfd4c"},
                 {id:"0ace8a68-0200-4989-8c79-bf36dc0b0edd",name:"单人沙发",parentId:"4bd09bec-45c6-4265-9696-1bdee8cbfd4c"},
            	 {id:"46d17657-2160-4b52-a7b1-12ab7f4912ec",name:"组合沙发",parentId:"4bd09bec-45c6-4265-9696-1bdee8cbfd4c"},
                 {id:"ae0e91ae-d881-4be3-811c-0c59a0fae26d",name:"懒人沙发",parentId:"4bd09bec-45c6-4265-9696-1bdee8cbfd4c"}
                        	]
                        	},
                        	
      {id:"67e09a61-2e6a-4b51-8c12-df7b17b22c50",name:"楼梯",open:false,//这里false为默认关闭,true打开
             children:[
                            		
            	 {id:"a7fe6a4e-5d82-4e41-9610-7b559dde1546",name:"楼梯",parentId:"67e09a61-2e6a-4b51-8c12-df7b17b22c50"}
                            	]
                            	},
                            	
      {id:"6f33001b-fd3f-4522-b381-af6f6a895ece",name:"梳妆台",open:false,//这里false为默认关闭,true打开
             children:[
                                		
            	 {id:"6e533bbd-b5d3-45df-b9f9-aae1b62c2ac4",name:"梳妆台",parentId:"6f33001b-fd3f-4522-b381-af6f6a895ece"}
                                	]
                                	},
                                	
      {id:"7645310a-a88c-4c25-a335-946969f3db60",name:"厨具",open:false,//这里false为默认关闭,true打开
             children:[
                                    		
             {id:"b4eccef3-a34b-4822-8dc7-9f1346d8abc5",name:"餐具",parentId:"7645310a-a88c-4c25-a335-946969f3db60"}
                                    	]
                                    	},
                                    	
      {id:"916c0e4d-d8a4-4f93-98c7-d9294877d32e",name:"装饰品",open:false,//这里false为默认关闭,true打开
              children:[
                                        		
                                        	]
                                        	},
                                        	
      {id:"9e8533c3-e809-42c5-a3f1-e38e96930159",name:"柜子",open:false,//这里false为默认关闭,true打开
             children:[
             {id:"551cc882-ba0c-4da4-96d6-e0eaeb8dd446",name:"鞋柜",parentId:"9e8533c3-e809-42c5-a3f1-e38e96930159"}
                                            	]
                                            	},
                                            	
      {id:"b00d2976-47df-4470-b976-586b7dc76af2",name:"桌子",open:false,//这里false为默认关闭,true打开
             children:[
                                                		
             {id:"1c8e2182-87d5-47d2-ad70-9babdaf0cdbf",name:"桌子",parentId:"b00d2976-47df-4470-b976-586b7dc76af2"}
                                                    	]
                                                	},
                                                	
      {id:"b5d128dc-c476-4a42-b0a8-e5dd26cce0a8",name:"家具组合",open:false,//这里false为默认关闭,true打开
             children:[
                                                    		
            {id:"59a68bfe-7733-4b15-b8fc-5518abdf8756",name:"餐桌椅组合",parentId:"b5d128dc-c476-4a42-b0a8-e5dd26cce0a8"},
            {id:"a8855007-1e93-48ae-bceb-1a9b702a40a4",name:"书桌椅组合",parentId:"b5d128dc-c476-4a42-b0a8-e5dd26cce0a8"},
            {id:"e60eebae-5e81-4fbe-bcb7-fd88a13c7ebc",name:"沙发茶几组合",parentId:"b5d128dc-c476-4a42-b0a8-e5dd26cce0a8"}
                                                    	]
                                                    	},
                                                    	
      {id:"b9906324-4638-449f-ba81-c21275290511",name:"窗帘",open:false,//这里false为默认关闭,true打开
             children:[
                                                        		
             {id:"c410c32a-3f02-4b33-bfb4-aeee460e01c5",name:"窗帘",parentId:"b9906324-4638-449f-ba81-c21275290511"}
                                                        	]
                                                        	},
                                                        	
     {id:"ee7bce14-fd46-4bc7-bc8f-5ae47ca1f50d",name:"背景墙",open:false,//这里false为默认关闭,true打开
             children:[
                                                            		
            {id:"03feec34-d7a1-470f-b98c-3da157e433e8",name:"现代风格电视墙",parentId:"ee7bce14-fd46-4bc7-bc8f-5ae47ca1f50d"},
            {id:"2610da80-bf82-4617-8c12-163bbcf11f20",name:"地中海电视墙",parentId:"ee7bce14-fd46-4bc7-bc8f-5ae47ca1f50d"},
            {id:"7e62d6e5-1e79-403f-a088-51e400d03dca",name:"新中式电视墙",parentId:"ee7bce14-fd46-4bc7-bc8f-5ae47ca1f50d"},
            {id:"a96a4604-00fe-4ae4-9d27-1892a4238809",name:"东南亚电视墙",parentId:"ee7bce14-fd46-4bc7-bc8f-5ae47ca1f50d"},
            {id:"c6c1d0fd-929c-4412-a9be-ee100e8adfe4",name:"欧式电视墙",parentId:"ee7bce14-fd46-4bc7-bc8f-5ae47ca1f50d"},
            {id:"d3e693e3-a293-4ad6-854e-4219d2744866",name:"美式电视墙",parentId:"ee7bce14-fd46-4bc7-bc8f-5ae47ca1f50d"}
                                                               	]
                                                            	},
                        	
     {id:"f8f92298-90a5-4dd1-9a1d-3021728fe808",name:"灯具",open:false,//这里false为默认关闭,true打开
             children:[
                                                                		
            	 {id:"2d7c772c-2228-427c-8b38-b943ffc01415",name:"筒灯射灯",parentId:"f8f92298-90a5-4dd1-9a1d-3021728fe808"},
                 {id:"3734df60-7709-4c6d-9642-8f01a142864d",name:"落地灯",parentId:"f8f92298-90a5-4dd1-9a1d-3021728fe808"},
                 {id:"58bbcac7-0f92-497e-ae8f-668ff601759b",name:"吸顶灯",parentId:"f8f92298-90a5-4dd1-9a1d-3021728fe808"},
                 {id:"9fec36dc-d2f8-4e55-96d5-3895698d4da7",name:"台灯",parentId:"f8f92298-90a5-4dd1-9a1d-3021728fe808"},
                 {id:"a9d1bb3f-d25f-44fd-8b4e-2892c8bedf44",name:"其他类型灯具",parentId:"f8f92298-90a5-4dd1-9a1d-3021728fe808"},
                 {id:"f52cb3a6-5b0e-4257-854b-55a7fa1207bf",name:"吊灯",parentId:"f8f92298-90a5-4dd1-9a1d-3021728fe808"},
                 {id:"fac4fbe9-33b5-45f5-85fa-33e7624face5",name:"壁灯",parentId:"f8f92298-90a5-4dd1-9a1d-3021728fe808"}
                               
                                                                	]
                                                                	}
                            	
                    	
] ;
$(document).ready(function(){
	
	getModelTree();

//	$.fn.zTree.init($("#treeDemo"), setting, zNodes);
});