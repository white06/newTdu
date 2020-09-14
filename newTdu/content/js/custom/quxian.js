$(function(){
//	if(adminNum==3){
//		stuSeequxian();
//	}else{
		var teasquxian=document.getElementById("teasquxian");
		var stuquxian=document.getElementById("stuquxian");
		teasquxian.style.display="block";
		stuquxian.style.display="none";
		$("#quxian").datagrid({
			url:"../../../UsersController/seleAllStu.action",
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
//	}
})

function chakan(value,rowData,index){
	var html='<button class="customsubmitbutton" style="width:80px;height:35px;text-align:center;" onclick="seequxian(\''+rowData.id+'\',\''+rowData.name+'\')">查看曲线</button>';
	return html;
}

//教师查看学生的曲线
function seequxian(id,name){
	$.ajax({
		type:"POST",
		url:"../../../KaoshiController/quxian.action?stuId="+id,
		success:function(data){
			if(data){
			data=eval('('+data+')');
			var rs=[];
			var rs2=[];
			var dataL=data.length;
			for(var i=0;i<dataL;i++){
				rs.push(data[i].examName);
				rs2.push(data[i].score);
			}
			$('#rightHig').highcharts({
                title: {
                    text: '查看曲线',
                    x: -20 //center
                },
                subtitle: {
                    text: name + '的成绩曲线',
                    x: -20
                },
                xAxis: {
                    categories: rs
                },
                yAxis: {
                    title: {
                        text: '成绩'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: '分'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: name,
                    data: rs2
                },
                ]
            }); 
		  }
		}
	})
}

//学生查看曲线
function stuSeequxian(){
	$.ajax({
		type:"POST",
		url:"../../../KaoshiController/stuSeequxian.action",
		success:function(data){
			if(data){
			data=eval('('+data+')');
			var rs=[];
			var rs2=[];
			var dataL=data.length;
			for(var i=0;i<dataL;i++){
				rs.push(data[i].examName);
				rs2.push(data[i].score);
			}
			$('#stuHig').highcharts({
                title: {
                    text: '查看曲线',
                    x: -20 //center
                },
                subtitle: {
                    text: '成绩曲线',
                    x: -20
                },
                xAxis: {
                    categories: rs
                },
                yAxis: {
                    title: {
                        text: '成绩'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: '分'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    data: rs2
                },
                ]
            }); 
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
	     afterPageText : '页   ',  
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