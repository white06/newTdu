
$(function(){
	$.ajax({
		type:"POST",
		url:pathURL+"ShouyeController/getSubjects.action",
		async:false,
		success:function(data){
			var html="";
			if(data){
				for(var i=0;i<data.length;i++){
					html+='<option class="subjectname1" value="'+data[i].id+'">'+data[i].subjectName+'</option>'
				}
				$('#subjectDropBox').html(html);
				getStuAllExam();
			}
		}
	})
})

function getStuAllExam(){
	$('#testList').html("");
	var subId=$('#subjectDropBox').val();
	console.log(subId);
	$.ajax({
		type:"POST",
		url:"../KaoshiController/Newkaoshi.action?subId="+subId,
		success:function(data){
            $('#testList').html('');
			if(data){
				console.log(data)
				var dataL=data.length;
				var html="";
				for(var i=0;i<dataL;i++){
					html+='<div class="subjectname2"><img class="kuang" src="img/'+data[i].subjectkey+'.jpg" onclick="errortrue(\''+data[i].name+'\',\''+data[i].id+'\')"><div class="spankuang">'+data[i].name+'</div></div>';
				}
				$('#testList').html(html);
			}else{
                $('#testList').html("此科目之下暂时还没有考试");
			}
		}
	})
}

//该学生是否做过该试卷的判断
function errortrue(examname,examPager){
	$.ajax({
		type:"POST",
		url:"../KaoshiController/checked.action?pageId="+examPager,
		success:function(data){
			if(data=="ture"){
				ChooseSubject=examPager;
				$("#zhaozi,#xianshidiv").show();
				getHeight();
				console.log(2222);
				$("#xianshiwenjian").css("background","#FFFFFF");
				$("#xianshiwenjian").load('content/newkaoshi.php');
                $("#wenjianming").html(examname);
			}else if(data=="error"){
				console.log(3333);
				ChooseSubject=examPager;
				$("#zhaozi,#xianshidiv").show();
				getHeight();
				$("#xianshiwenjian").css("background","#FFFFFF");
				$("#xianshiwenjian").load('content/newlook_Papers.php');
                $("#wenjianming").html(examname);

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