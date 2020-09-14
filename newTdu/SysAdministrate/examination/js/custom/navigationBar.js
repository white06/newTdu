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

$(function(){
	getNavigation();
})

//Easyui的方式得到导航栏列表
function getNavigation(){
	$('#navigationList').datagrid({
		url:"../NavigationBarController/seleNavigation.action",
		method:"post",
		loadFilter:pagerFilter,
		singleSelect: true,
		rownumbers: true,		
        pagination: true,
        pageSize: "10"
	})
}

//操作
function caozuo(value,rowData,index){
	var html='<button onclick="updata(\''+rowData.id+'\',\''+rowData.columnName+'\',\''+rowData.columnLink+'\',\''+rowData.columnPicture+'\')">修改</button><button onclick="delect(\''+rowData.id+'\',\''+index+'\')">删除</button>'
	return html;
}

//修改功能
function updata(id,columnName,columnLink,columnPicture){
	$('#win').panel('open').panel('setTitle',"修改导航");
	setHtml(id);
	$('#columnName').val(columnName);
	$('#columnLink').val(columnLink);
	$('#columnPicture').val(columnPicture);
}

//向小弹窗中加修改的html
function setHtml(id){
	$('#win').panel('clear');
	var html='<div class="updataInput">'+
				'导&nbsp;&nbsp;航&nbsp;名<input id="columnName" type="text" onkeyup="inspect(\'columnName\')"/>'+
			'</div>'+
			'<div class="updataInput">'+
				'导航链接<input id="columnLink" type="text" onkeyup="inspect(\'columnLink\')"/>'+
			'</div>'+
			'<div class="updataInput">'+
				'栏目图片<input id="columnPicture" type="text" onkeyup="inspect(\'columnPicture\')"/>'+
			'</div>'+
			'<div>'+
				'<select id="userrole">'+
					'<option>0</option>'+
					'<option>1</option>'+
					'<option>2</option>'+
				'</select>'+
			'</div>'+
			'<div class="updataInput">'+
				'<button onclick="getUpata(\''+id+'\')">修改完成</button>'+
			'</div>';
	$('#win').html(html);
}

//向弹窗中加新增的html
function setHtml1(){
	$('#win').panel('open').panel('setTitle',"新增导航");
	$('#win').panel('clear');
	var html='<div class="updataInput">'+
				'导&nbsp;&nbsp;航&nbsp;名<input type="text" id="columnName" onkeyup="inspect(\'columnName\')"/>'+
			'</div>'+
			'<div class="updataInput">'+
				'导航链接<input type="text" id="columnLink" onkeyup="inspect(\'columnLink\')"/>'+
			'</div>'+
			'<div class="updataInput">'+
				'栏目图片<input type="text" id="columnPicture" onkeyup="inspect(\'columnPicture\')"/>'+
			'</div>'+
			'<div>'+
				'<span>是否是父级导航栏:</span>'+
				'<input type="radio" value="1" name="level" onchange="unLevel1()"/>是'+
				'<input type="radio" value="2" name="level" onchange="getLevel1()"/>不是'+
			'</div>'+
			'<div id="level2" style="display: none;">'+
				'<select id="level1">'+
					
				'</select>'+
			'</div>'+
			'<div>'+
				'<select id="userrole">'+
					'<option>0</option>'+
					'<option>1</option>'+
					'<option>2</option>'+
				'</select>'+
			'</div>'+
			'<div class="updataInput">'+
				'<button onclick="getAdd()">提交新增</button>'+
			'</div>';
	$('#win').html(html);
}

//当导航栏是父级时，隐藏下拉框
function unLevel1(){
	$("#level2")[0].style.display="none";
}

//新增时，当导航栏是子级时，显示下拉框
function getLevel1(){
	$("#level2")[0].style.display="block";
	$.ajax({
		type:"POST",
		url:"../NavigationBarController/seleLevel1.action",
		success:function(data){
			console.log(data);
			var dataL=data.length;
			var html="";
			for(var i=0;i<dataL;i++){
				html+='<option value="'+data[i].id+'">'+data[i].columnName+'</option>'
			}
			$('#level1').html(html);
		}
	})
}

//得到导航栏等级
function getLevel(value,rowData,index){
	var html=""
	if(rowData.columnLevel==1){
		html="父级导航栏"
	}else{
		html="子级导航栏"
	}
	return html;
}

//提交修改
function getUpata(id){
	var columnName=$('#columnName').val();
	var columnLink=$('#columnLink').val();
	var columnPicture=$('#columnPicture').val();
	var userrole=$('#userrole').val();
	console.log(userrole);
	$.ajax({
		type:"POST",
		url:"../NavigationBarController/upNavigation.action",
		data:{id:id,columnName:columnName,columnLink:columnLink,columnPicture:columnPicture,userrole:userrole},
		success:function(data){
			if(data=="ture"){
				alert("修改成功");
				$('#win').panel('clear');
				$('#win').panel('close');
				getNavigation();
			}
		}
	})
}

//删除功能
function delect(id,index){
	$.ajax({
		type:"POST",
		url:"../NavigationBarController/delNav.action?id="+id,
		success:function(data){
			if(data=="ture"){
				alert("删除成功");
				getNavigation();
			}
		}
	})
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
		url:"../NavigationBarController/addNavigation.action",
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