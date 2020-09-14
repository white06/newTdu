var pageId="";
$(function(){
	$.ajax({
		type:"POST",
		url:"../../../../KaoshiController/getClassList.action?examId="+ChooseSubject,
		success:function(data){
			if(data){
				var html=""
				var dataL=data.length;
				for(var i=0;i<dataL;i++){
					pageId=data[i].major_id;
					html+='<option value="'+data[i].id+'">'+data[i].className+'</option>';
				}
				$('#classId').html(html);
				classname();
			}
		}
	})
})

function classname(){
	var classId=$('#classId').val();
	$("#chengji").datagrid({
		url:"../../../../KaoshiController/getStuScores.action?classId="+classId+"&pageId="+pageId,
		method:"post",
		loadFilter:pagerFilter,
		singleSelect: true,
		rownumbers: true,		
		pagination: true,
		pageSize: "10",
	})
}

function specific(value,rowData,index){
	var html='<button onclick="look_paper(\''+rowData.pagerKey+'\',\''+rowData.stuKey+'\')">查看试卷</button>';
	return html;
}

function look_paper(pagerKey,stuKey){
	$("#zhaozi,#xianshidiv").show();
	getHeight();
	//借用imgURL来存放一下学生的id，因为是load方法，无奈
	imgURL=stuKey;
	ChooseSubject=pagerKey;
	$("#xianshiwenjian").css("background","#FFFFFF");
	$("#xianshiwenjian").load('content/look_Papers.php?stuId='+stuKey);
}