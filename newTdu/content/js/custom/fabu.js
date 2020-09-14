//在弹出的表格中每次勾选中班级就记录下
var checkClassId=[];

$(function(){
	jiazai();
	teachExam();
})

//加载所有的未发布的试卷
function jiazai(){
	$("#fabu").datagrid({
		url:"../../../KaoshiController/seleExamAll.action",
		method:"post",
		loadFilter:pagerFilter,
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

//加载所有已经发布的考试
function teachExam(){
	$("#teachExam").datagrid({
		url:"../../../KaoshiController/seleExamFabu.action",
		method:"post",
		loadFilter:pagerFilter,
		singleSelect: true,
		rownumbers: true,		
        pagination: true,
        pageSize: "10",
		onLoadSuccess:function(data){
			
			$('.datagrid-cell').css('font-size','16px');
			$('.datagrid-cell').css('text-align','left');
			$('.datagrid-row').css('height','50px');
			$('.datagrid-header .datagrid-cell span ').css('font-size','16px');
			$('.panel-title ').css('font-size','16px'); 
			}
	})
}

//点击查看成绩按钮，然后将exam.id保留，然后跳转页面
function teacaozuo(value,rowData,index){
	var html='<button class="customsubmitbutton" style="width:100%;height:35px;"  onclick="jump(\''+rowData.examId+'\')">查看成绩</button>';	
	return html;
}

//查看成绩的跳转页面
function jump(examId){
	ChooseSubject=examId;
	$("#contentDiv").load('chengji.php');
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

//返回发布按钮
function caozuo(value,rowData,index){
	var fabuButton='<button class="customsubmitbutton" style="width:100%;height:35px;" onclick="fabuchuang(\''+rowData.examId+'\',\''+rowData.examName+'\')">发布</button>';
	return fabuButton;
}

//按发布，弹出窗口
function fabuchuang(id,examName){
	checkClassId=[];
	$('#win').panel('open').panel('setTitle',examName);
	setHtml();
	$('#examId').val(id);
	getClass();
	setTime();
}

//向小弹窗中加html
function setHtml(){
	var html='<input type="text" id="examId" hidden>'+
			'<div id="leftClass" style="float: left;width:400px;height:280px;margin-top:10px;">'+
				'<table id="getClass" title="班级表"  style="width:100%;height:280px"></table>'+
			'</div>'+
			'<div id="rightTime" style="float: left;width:260px;height:280px;margin-top:10px;"">'+
				'<div id="setstart" style="width:260px;heigth:25px;margin-top:20px;line-height:25px;"><span style="display:block;float:left;margin-left:15px;font-size:16px;">开始时间:&nbsp;</span><input id="startTime" type="text" style="width:150px;float:left;margin-left:5px;display:block"/></div>'+
				'<div id="setend" style="width:260px;heigth:25px;margin-top:20px;line-height:25px;"><span style="display:block;float:left;margin-left:15px;font-size:16px;">截至时间:&nbsp;</span><input id="endTime" type="text" style="width:150px;float:left;margin-left:5px;display:block"></div>'+
				'<div style="width:260px;heigth:40px;margin:0 auto;margin-top:20px;"><span style="display:block;float:left;margin-left:15px;font-size:16px;">截至时间:&nbsp;</span><select style="width:80px;float:left;" id="examTime"><option>120</option><option>100</option><option>90</option><option>60</option><option>30</option></select><span>分钟</span></div>'+
				'<div style="width:100%;height:35px;margin:0 auto;margin-top:20px;"><button class="customsubmitbutton" style="width:150px;height:35px;margin-left:15px;" onclick="fabu()">发布</button></div>'+
			'</div>';
	$('#win').html(html);
}

//将试卷的状态改为已发布
function fabu(){
	var endTime = $('#endTime').datebox('getValue');
	var startTime=$('#startTime').datebox('getValue');
	var d1 = new Date(startTime.replace(/\-/g, "\/"));    
	var d2 = new Date(endTime.replace(/\-/g, "\/"));    
	if(startTime!=""&&endTime!=""&&d1 >=d2){    
	  alert("开始时间不能大于结束时间！");    
	  return false;
	}else if(startTime==""||endTime==""){
		alert("请选择时间");
		return;
	}
	var examId=$('#examId').val();
	var classList=getList();
	if(classList==""||classList==null){
		alert("没有选择班级");
		return;
	}
	var examTime=$('#examTime').val();
	$.ajax({
		type:"POST",
		url:"../../../KaoshiController/fabu.action?endDate="+endTime+"&examId="+examId+"&startDate="+startTime+"&classKey="+classList+"&examTime="+examTime,
		success:function(data){
			if(data=="ture"){
				alert("发布成功");
				$('#win').panel('close');
				jiazai();
				teachExam()
				return;
			}
		}
	})
}

//分拆数据，将它变成字符串
function getList(){
	var checkClassIdL=checkClassId.length;
	var classList='';
	for(var i=0;i<checkClassIdL;i++){
		if(i===0){
			classList=checkClassId[i];
		}else{
			classList+=("______")+checkClassId[i];
		}
	}
	return classList;
}

//对班级列表的处理
function getClass(){
	$('#getClass').datagrid({
		url:"../../../UsersController/seleClassList.action",
		method:"post",
		columns:[[
			{field:'id',title:'选择',width:'20%',checkbox:true},
	        {field:'className',title:'班级名',width:'80%',align:'center'}
		]],
		loadFilter:pagerFilter,
		//允许多选
		singleSelect: false,
		fitColumns:true,
		rownumbers: true,		
		pagination: true,
		pageSize: "10",
		onCheck:function(index, rowData){
			checkClassId.push(rowData.id);
		},
		onUncheck:function(index, rowData){
			var listL=checkClassId.length;
			for(var i=0;i<listL;i++){
				if(rowData.id==checkClassId[i]){
					checkClassId.splice(i,1);
				}
			}
		},
		onCheckAll:function(rowData){
			checkClassId.splice(0,checkClassId.length);
			var rowDataL=rowData.length;
			for(var i=0;i<rowDataL;i++){
				checkClassId.push(rowData[i].id);
			}
		},
		onUncheckAll:function(rowData){
			checkClassId.splice(0,checkClassId.length);
		},
		onLoadSuccess:function(data){
			
			$('.datagrid-cell').css('font-size','16px');
			$('.datagrid-cell').css('text-align','left');
			$('.datagrid-row').css('height','50px');
			$('.datagrid-header .datagrid-cell span ').css('font-size','16px');
			$('.panel-title ').css('font-size','16px'); 
			}
	})
}

//处理时间
function setTime(){
	$('#startTime,#endTime').datetimebox({    
	    required: true,    
	    showSeconds: false
	});
}



