
var checkStuId=[];

$(function(){
	seleClass();
})

//显示所有的班级
function seleClass(){
	$("#stu_class").datagrid({
		url:"../UsersController/seleClassList.action", 
		method:"post",
		loadFilter:pagerFilter,
		toolbar:"#classtool",
		singleSelect: true,
		rownumbers: true,		
		pagination: true,
		pageSize: "10",
		onLoadSuccess:function(data){
			$('.datagrid-cell').css('font-size','16px'); 
			$('.datagrid-cell').css('text-align','center');
			$('.datagrid-row').css('height','50px');
			$('.datagrid-header .datagrid-cell span ').css('font-size','16px');
			$('.panel-title ').css('font-size','16px'); 
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

//新增班级按钮
function addClass(){
	$('#win').panel('open').panel('setTitle',"新增班级");
	setClassHtml();
}

//新增班级功能
function getNewName(){
	var className=$('#newName').val();
	$.ajax({
		type:"POST",
		url:"../UsersController/addClass.action?className="+encodeURI(encodeURI(className)),
		success:function(data){
			if(data=="ture"){
				alert("新增成功");
				seleClass();
				$('#win').panel('close');
				$('#newName').val('');
			}
		}
	})
}

//给每个班级加学生
function addstu(value,rowData,index){
	var html='<button class="customsubmitbutton" style="width:120px;height:30px;line-height:30xp" onclick="tianjia(\''+rowData.id+'\')">添加学生</button>'
	return html;
}

//添加学生
function tianjia(id){
	$('#win').panel('open').panel('setTitle',"选择学生");
	setStuHtml();
	$("#xuesheng").datagrid({
		url:"../UsersController/seleAllStu.action",
		method:"post",
		columns:[[
			{field:'id',title:'选择',width:'20%',checkbox:true},
	        {field:'name',title:'姓名',width:'40%',align:'center'}
		]],
		loadFilter:pagerFilter,
		//允许多选
		singleSelect: false,
		rownumbers: true,		
		pagination: true,
		pageSize: "10",
		onCheck:function(index, rowData){
			checkStuId.push(rowData.id);
			$.ajax({
				type:"POST",
				url:"../UsersController/insOrUp.action?classId="+id+"&stuId="+rowData.id,
				success:function(data){
				}
			})
		},
		onUncheck:function(index, rowData){
			var listL=checkStuId.length;
			for(var i=0;i<listL;i++){
				if(rowData.id==checkStuId[i]){
					checkStuId.splice(i,1);
				}
			}
			$.ajax({
				type:"POST",
				url:"../UsersController/delClassUsers.action?stuId="+rowData.id,
				success:function(data){
				}
			})
		}
	})
}

//将新增班级添加进小窗口
function setClassHtml(){
	var html='<div style="width:280px;heigth:40px;margin:0 auto;margin-top:20px;"><span>新增班级名:</span><input id="newName" style="display:inline-block"></div>'+
			 '<div style="width:30px;heigth:21px;margin:0 auto;margin-top:20px;"><button onclick="getNewName()">发布</button></div>';
	$('#win').html(html);
}

//将所有学生添加进小窗口
function setStuHtml(){
	var html='<table id="xuesheng" style="width:100%;height:540px;"></table>'+
			 '<button id="" onclick="baocun()">保存选择</button>';
	$('#win').html(html);
}

function baocun(){
	alert("保存成功");
	$('#win').panel('close');
}
