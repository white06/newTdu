$(function(){
	getImgList();
})

function getImgList(){
	$('#imgist').datagrid({
		url:"../NavigationBarController/seleImgURL.action",
		method:"post",
		loadFilter:pagerFilter,
		singleSelect: true,
		rownumbers: true,		
        pagination: true,
        pageSize: "10"
	})
}

function caozuo(value,rowData,index){
	var html='<button onclick="upImg(\''+rowData.id+'\',\''+rowData.useName+'\',\''+rowData.imgURL+'\')">修改</button>';
	return html;
}

function upImg(id,name,imgURL){
	$('#win').panel('open');
	$('#win').panel('clear');
	var html='<div>'+name+'</div>'+
			 '<input id="getId" style="display:none" value=\''+id+'\'>'+
			'<div>图片地址:<input type="text" id="getImgURL" value=\''+imgURL+'\'></div>'+
			'<div><button onclick="getUpdate()">提交修改</button></div>';
	$('#win').html(html);
}

function getUpdate(){
	var id=$('#getId').val();
	var imgURL=$('#getImgURL').val();
	$.ajax({
		type:"POST",
		url:"../NavigationBarController/upImgURL.action?id="+id+"&imgURL="+encodeURI(encodeURI(imgURL)),
		success:function(data){
			if(data=="ture"){
				alert("修改成功");
				$('#win').panel('close');
				$('#win').panel('clear');
				getImgList();
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