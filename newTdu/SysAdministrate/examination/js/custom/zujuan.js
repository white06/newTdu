var gitid="";

var dataAll=[];

$(function(){
	
	$("#tm").datagrid({
			loadFilter:pagerFilter,
			onLoadSuccess:function(data){
			
			$('.datagrid-cell').css('font-size','16px');
			$('.datagrid-cell').css('text-align','center');
			$('.datagrid-row').css('height','50px');
			$('.datagrid-header .datagrid-cell span ').css('font-size','16px');
			$('.panel-title ').css('font-size','16px'); 
			}
	})
	
	//加载科目
	$.ajax({
		type:"POST",
		url:pathURL+"ShouyeController/getSubjects.action",
		success:function(data){
			if(data){
				var html="";
				var dataL=data.length;
				for(var i=0;i<dataL;i++){
					html+='<option class="subjectname1" value="'+data[i].id+'">'+data[i].subjectName+'</option>'
				}
				
				$('#subject').html(html);
				$("#subject").val("086e9c77-8f33-4b0a-b3a6-39f138f512a0");
				subjecttrees();
				$($("#subjectListImg")[0].children[0]).addClass("ChooseImg");
				$("#chooseKecheng").html("3Dmax 基础教程")
			}
		}
	})
})

//下拉框科目选中事件
function subjecttrees(){
	seleknow_id();
	$.ajax({
		type:"POST",
		url:pathURL+"ExamController/seleAllKnow.action?knowledgeId="+gitid,
		success:function(data){
			if(data){
				var dataL=data.length;
				var html="";
				for(var i=0;i<dataL;i++){
					html+='<option class="subjectname1" value="'+data[i].id+'">'+data[i].content+'</option>'
				}
				$('#knowId').html(html);
				$("#tm").datagrid("loadData",[]);
			}
		}
	})
}

//组卷
function zujuan(){
	var juanming=$('#juanming').val();
	if(juanming==""){
		alert("试卷名没填写");
		return;
	}
	var juanleixing=$('#juanleixing').val();
	var subject=$('#subject').val();
	var arr=$('#tm').datagrid('getData');
	if(arr.rows.length===0){
    	alert("请先挑选题目吧");
    	return;
    }else{
	var arrL=arr.originalRows.length;
	var arrId=[];
	for(var i=0;i<arrL;i++){
		arrId.push(arr.originalRows[i].id);
	}
	/*将数组转换为json类型的字符串*/
    var allJSON = JSON.stringify(arrId);
	$.ajax({
		type:"POST",
		url:pathURL+"ExamController/zujuan.action",
		data:"allJSON="+allJSON+"&juanming="+juanming+"&juanleixing="+juanleixing+"&subject="+subject,
		success:function(data){	
			if(data=="success"){
				alert("组卷成功");
				$("#contentDiv").load("content/zujuan.php");
			}else if(data=="NullforClass"){
				alert("抱歉，没有这个班级呀！！");
			}
		}
	})
    }
}

//操作
function caozuo(value,rowData,index){
	var anniu='<button class="customsubmitbutton" style="width:80px;height:40px;" onclick="delexam(\''+rowData.id+'\')">删除</button>';
	return anniu;
}

//删除功能
function delexam(rowId){
	var dataAllL=dataAll.length;
	for(var i=0;i<dataAllL;i++){
		if(dataAll[i].id===rowId){
			dataAll.splice(i,1);
			setTimeout(function(){
				$("#tm").datagrid("loadData",dataAll);
				//对删除之后的页面进行判断，如果页面没有数据了，那么就往前一页跳转
				if($("#tm").datagrid("getRows").length===0){
					var thisIndex=$("#tm").datagrid("getPager").data("pagination" ).options.pageNumber;
					var newIndex=parseInt(thisIndex);
					$("#tm").datagrid("loadData",dataAll);
					$("#tm").datagrid("gotoPage",newIndex);
				}
			},10);
			
			return;
		}
	}
}

//往表格中添加加入需要组卷的题目
function insQuestion(){
	var knowledgeId=$('#knowId').val();
	var nandu=$('#nandu').val();
	var shuliang=$('#shuliang').val();
	var type=$('#type').val();
	$.ajax({
		type:"POST",
		url:pathURL+"ExamController/chajuan.action?knowledgeId="+knowledgeId+"&nandu="+encodeURI(encodeURI(nandu))+"&fenye="+shuliang+"&type="+encodeURI(encodeURI(type)),
		success:function(data){
			var dataL=data.length;
			var dataAllL=dataAll.length;
			if(dataAllL===0){
				console.log(dataAll);
				dataAll=data;
			}else{
				for(var i=0;i<dataL;i++){
					var boolean=panduan(data[i]);
					if(boolean!==true){
						dataAll.push(data[i]);
					}
				}
			}
			$("#tm").datagrid("loadData",dataAll);
			//当全部内容删除重新查找是，要load两次才能加入，原因未知，只是试出这个方法可行
			$("#tm").datagrid("loadData",dataAll);
		}
	})
}

//判断是否新增的题目是不是已经有了
function panduan(obj){ 
	var dataAllL=dataAll.length;
	for(var i=0;i<dataAllL;i++){
		if(dataAll[i].id===obj.id){
			return true;
			break;
		}
	}
}

//写死每次获取到的科目树的知识树的id
function seleknow_id(){
	//写死每次获取到的科目树的知识树的id
	var id=$('#subject').val();
	//3DMAX
	if(id=="086e9c77-8f33-4b0a-b3a6-39f138f512a0"){
		gitid="75ae241b-8c07-496c-8d6a-c9e96cfcd5d9";
			return;
	}
	//AUTOCAD设计
	else if(id=="72a1bc9e-131d-4c13-a326-9faddeb17e9e"){
		gitid="c80bccfa-cdc5-47f1-864c-c8dacf115391";
			return;
	}
	//HTML5+CSS3基础
	else if(id=="745aac79-f1ef-476b-b57c-dc9d3472ec3a"){
		gitid="884f3131-a4c7-492f-9fe5-0cb7010f2fba";
			return;
	}
	//After Effects Cs5基础教程
	else if(id=="a1ffdc90-3f23-4d75-b9b9-c24b4870e03b"){
		gitid="4c878bd5-2317-43c4-97a4-924ae1f10746";
			return;
	}
	//网络综合布线设计与实施
	else if(id=="b386476e-a7cf-4992-946b-90ff0568a0d9"){
		gitid="4b82db76-1dbc-4972-8b3e-fb3b07aa7ba2";
			return;
	}
}

//分页插件
function pagerFilter(data){
    if (typeof data.length == 'number' && typeof data.splice == 'function'){    // 判断数据是否是数组
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

function ChangeZjSubject(object,sub){
	$("#subjectListImg").children().removeClass("ChooseImg")
	
	$(object).addClass("ChooseImg")
	switch(sub){
		case "max":
			$("#subject").val("086e9c77-8f33-4b0a-b3a6-39f138f512a0");
			subjecttrees();
			$("#chooseKecheng").html("3Dmax 基础教程")
			break;
		case "cad":
			$("#subject").val("72a1bc9e-131d-4c13-a326-9faddeb17e9e");
			subjecttrees();
			$("#chooseKecheng").html("AUTOCAD设计")
			break;
		case "html":
			$("#subject").val("745aac79-f1ef-476b-b57c-dc9d3472ec3a");
			subjecttrees();
			$("#chooseKecheng").html("HTML5+CSS3基础")
			break;
		case "ae":
			$("#subject").val("a1ffdc90-3f23-4d75-b9b9-c24b4870e03b");
			subjecttrees();
			$("#chooseKecheng").html("After Effects Cs6基础教程")
			break;
		case "bux":
			$("#subject").val("b386476e-a7cf-4992-946b-90ff0568a0d9");
			subjecttrees();
			$("#chooseKecheng").html("网络综合布线设计与实施")
			break;
		
	}
	
}


