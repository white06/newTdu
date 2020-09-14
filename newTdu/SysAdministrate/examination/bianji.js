var gitid="";
var dataAll=[];//搜索结果
var datainput=[];//试题列表
var pathURL="../../../../";
var parentwindow = $(window.parent.document);

var subjecttreeId = "";

var setting = {
		view: {
			selectedMulti: false
			
		},
		edit: {
			enable: true,
	        showRenameBtn: false,
	        showRemoveBtn: false,
	        editNameSelectAll: true
		},
		callback: {
			onClick: onClick
		},
		data: {
			simpleData: {
				enable: true
			}
		},
	};
var abc;
var ztreeobj = $.fn.zTree.getZTreeObj("treeDemo");
var selectlist;


//节点被点击后的事件函数在这里！
function onClick(event, treeId, treeNode) {
	console.log(treeNode)
	$('#kId').val(treeNode.id);
	$('#knowId').val(treeNode.name);

    $("#chooseKecheng").html(treeNode.name)
	console.log($('#knowId').val())
}
//键盘按键检查
function inspect(myId){
	var getVal=$("#"+myId+"").val();
	var valL=getVal.length;
	if(getVal.indexOf("&")>-1){
		if(valL===1){
			getVal="";
		}else{
			getVal=getVal.substring(0,getVal.length-1);
		}
		$("#"+myId+"").val(getVal);
		alert("不允许输入非法字符");
		return;
	}
}
function getSubjectName(){
	/*  12.7  写死 subjeckId */
	var id = "6050b62c-4afd-4cab-94c6-57b5c9578f10"//parentwindow.find("#subject option:selected").val();
    id=$('.choosesub',parent.document)[0].id;
	$.ajax({
		type:"POST",
		url: houtaiurl+"ShouyeController/getSubjects.action",
		data: {
			id:id
		},
		success:function(data){
			console.log(data)
		}
    })
}
//写死每次获取到的科目树的知识树的id
function seleknow_id(subjectkey){
    $.ajax({
        url: houtaiurl+"SubjectTreeController/GetSubjectTree.action",
        type:"POST",
        async:false,
        data:{SubjectKey:subjectkey},
        success:function(res){
            var html='';
            for(var i=0;i<res.length;i++){
                if(res[i].style=="2"){
                    gitid=res[i].id;
                }
            }
        }
    });

}
function GetSubjectRootId(treety) {
    var subjectKeyid=$('.choosesub',parent.document)[0].id;
	console.log(treety);
	$.ajax({
		type: "Get",
		url: houtaiurl+"nanjingController/GetSubjectRootId2.action",
		data: {
			subjectId: subjectKeyid,//parentwindow.find("#subject option:selected").val(),
			treetype: treety,
			random: Math.random()
		},
		async: false,
		dataType: "json",
		success: function(data) {
			console.log(data)
			$("#rootid").val(data.subjectId);
		}
	});
}


function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}








var examId="";
var examName="";

$(function(){

    var str = GetRequest();
    eval(str)
    examId = str.examKey
    examName = str.examName
    $('#juanming').val(examName)

	$("#lower").css("display","none")
		var subject =$('.choosesub',parent.document)[0].id;
    var subjectObj =  $(window.parent.document).find(".choosesub");
	seleknow_id(subject)

		//展开或折叠全部节点
		var objcet = $.fn.zTree.init($("#treeDemo"), setting, []);
		GetSubjectRootId(gitid);
		//设置隐藏框的值
		$("#saveTreeNode").val($("#rootid").val());

    	$.ajaxSettings.async = false;
		$.get( houtaiurl+"nanjingController/seleKnowledgesNan.action?random=" + Math.random(), data = {
			//11.28   ID写死
			Id:subject,
			treetype: gitid
		}, function(data) {
			console.log(data)
			var zNodes = data;
			$.fn.zTree.init($("#treeDemo"), setting, zNodes);
			ztreeobj = $.fn.zTree.getZTreeObj("treeDemo");
			selectlist = ztreeobj.getSelectedNodes();
		});
    $.ajaxSettings.async = true;

    subjectObj.bind('DOMNodeInserted',function(e) {
        console.log('DOMNodeInserted');
        console.log($(e.target).html());//change

        var selectedvalue =subjectObj.attr('id');
        seleknow_id(selectedvalue);
        getSubjectName();
        if ($.trim(gitid).length > 0) {
            GetSubjectRootId(gitid);
            $.get(houtaiurl+"nanjingController/seleKnowledgesNan.action?random=" + Math.random(), data = {
                Id: selectedvalue,//parentwindow.find("#subject option:selected").val(),
                treetype: gitid
            }, function(data) {
                var ztreeobj = $.fn.zTree.getZTreeObj("treeDemo");
                console.log(data)
                var zNodes = data;
                $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                selectlist = ztreeobj.getNodes();
                $("#saveTreeNode").val($("#rootid").val());
            });
        }
        else {
            $.fn.zTree.init($("#treeDemo"), setting, []);
        }
    });
})
//组卷
function zujuan(){
	var juanming=$('#juanming').val();
	if(juanming==""){
		alert("试卷名没填写");
		return;
	}
	var juanleixing=$('#juanleixing').val();
	//var subject=$('#subject').val();
	var subject='086e9c77-8f33-4b0a-b3a6-39f138f512a0';
	subject=$('.choosesub',parent.document)[0].id;
	//var arr=$('#tm').datagrid('getData');
    if(datainput.length===0){
        alert("请先挑选题目吧");
        return;
    }
    var arrL=datainput.length;
    var arrId=[];
    for(var i=0;i<arrL;i++) {
        arrId.push(datainput[i].id);
    }
	/*将数组转换为json类型的字符串*/
    var allJSON = JSON.stringify(arrId);
    alert(allJSON)
	$.ajax({
		type:"POST",
		url:houtaiurl+"ExamController/updateExam.action",
		data:"allJSON="+allJSON+"&juanming="+juanming+"&examId="+examId,
		success:function(data){
			window.location.href="fabu.html";
		}
	})
    //}
}

//操作
function caozuo(value,rowData,index){
	var anniu='<button class="customsubmitbutton" style="width:80px;height:40px;" onclick="delexam(\''+rowData.id+'\')">删除</button>';
	return anniu;
}

function add(value,rowData,index){
    var anniu='<button class="customsubmitbutton" style="width:80px;height:40px;" onclick="addexam(\''+rowData.id+'\',\''+rowData+'\')">删除</button>';
    return anniu;
}

//判断是否新增的题目是不是已经有了
function panduanInput(rowId){
    var dataAllL=datainput.length;
    for(var i=0;i<dataAllL;i++){
        if(datainput[i].id===rowId){
            return true;
            break;
        }
    }
}

//增加功能
function addexam(rowId){
    var dataAllL=dataAll.length;
    var boolean=false;
    if(panduanInput(rowId)){
        boolean=true;
	}
    var flag = false;
	var count;
	var obj;
	console.log(boolean);
    for(var i=0;i<dataAllL;i++){
            if(dataAll[i].id===rowId){
                    obj = dataAll[i];
                	flag=true;
                	count =i;

            }
    }
        if(boolean!==true){
            datainput.push(obj);
        }else{
        	alert("-------")
		}

    if(flag){
        dataAll.splice(count,1);
	}
    showQuestions(dataAll);
    showPageQuestions(datainput)
}

//删除功能
function delexam(rowId){
    var flag = false;
    var count;
    for(var i=0;i<datainput;i++){
        if(datainput[i].id===rowId){
            flag=true;
            count =i;
        }
    }
    if(flag){
        datainput.splice(count,1);
    }
	/*var dataAllL=datainput.length;
	for(var i=0;i<dataAllL;i++){
		if(datainput[i].id===rowId){
            datainput.splice(i,1);
			setTimeout(function(){
				$("#tm").datagrid("loadData",datainput);
				//对删除之后的页面进行判断，如果页面没有数据了，那么就往前一页跳转
				if($("#tm").datagrid("getRows").length===0){
					var thisIndex=$("#tm").datagrid("getPager").data("pagination" ).options.pageNumber;
					var newIndex=parseInt(thisIndex);
					$("#tm").datagrid("loadData",datainput);
					$("#tm").datagrid("gotoPage",newIndex);
				}
			},10);
			return;
		}
	}*/
}

//往表格中添加加入需要组卷的题目
function insQuestion(){
	//var knowledgeId=$('#knowId').val();
	var knowledgeId=$('#kId').val();
	console.log(knowledgeId)
	var nandu=$('#nandu').val();
	var shuliang=$('#shuliang').val();
	var type=$('#type').val();
	$.ajax({
		type:"POST",
		url:houtaiurl+"ExamController/chajuan.action?knowledgeId="+knowledgeId+"&nandu="+encodeURI(encodeURI(nandu))+"&fenye="+shuliang+"&type="+encodeURI(encodeURI(type)),
		success:function(data){
            console.log(data)
			var dataL=data.length;
			var dataAllL=dataAll.length;
			if(dataAllL===0){
				console.log(dataAll);
				dataAll=data;
			}else{
				for(var i=0;i<dataL;i++){
					/*var boolean=panduan(data[i]);
					if(boolean!==true){
						dataAll.push(data[i]);
					}*/
                    dataAll.push(data[i]);
				}
			}
            console.log("------")
			console.log(dataAll)
            console.log("------")
            $("#lower").css("display","block")
            showQuestions(dataAll)
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


