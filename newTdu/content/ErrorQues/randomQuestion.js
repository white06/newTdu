var daan="";
var shoucang="shou";
function shou(timuId){
	 $.ajax({
		 url: dapartmenturl+ "ExercisesController/addPersonal.action",
       data: { timuId: timuId,useType: "收藏"},
       type: "Post",
       async: false,
       success: function (data) {
      	 	if(data){
      	 		layer.alert("收藏成功");
      	 	}
       }
	 });
	
}

$(document).ready(function(){
	var b=getRequest();
	var index_i=b['knowledgeId'];
	getQuestion(index_i);
});

//获取网址后面id信息
	function getRequest(){
	var url=location.search;
	var	theRequest= new Object();
	var strs="";
	if(url.indexOf("?")!=-1){
		var str= url.substr(1);
		strs=str.split("&");
		for(var i=0; i<strs.length; i++ ){
			theRequest[strs[i].split("=")[0]]= decodeURIComponent(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

//下一题功能实现
function xiayiti(tid){
	//题目排序
		var chooseQuestion=$("#current_index").val();
	//获取题目类型
		var questionType=$("#"+chooseQuestion).find("#leixing").attr("data-type");
	//答案
		var xuanzedaan="";
	if(questionType=="单选题"){
	xuanzedaan= $("input:radio[name='"+tid+"']:checked").val();
	}else if(questionType=="填空题"){
		$("input[name='"+tid+"']").each(function(){
			xuanzedaan+=$(this).val()+";";
		});
		console.log(xuanzedaan);
	}else if(questionType=="判断题"){
		xuanzedaan= $("input:radio[name='"+tid+"']:checked").val();
	}else if(questionType=="多选题"){
		$("input[name='"+tid+"']:checked").each(function(){
			xuanzedaan+=$(this).val();
		});
	}
	//所选择的答案
	var chooseObj=document.getElementById(chooseQuestion);
	var  chooseDaan=chooseObj.getAttribute("value");
	//判断作答是否为空
	if(xuanzedaan==null){
		layer.alert("未作答");
	}else{
	//判断答案是否正确
	if(xuanzedaan==chooseDaan){
		var zuodui=parseInt($("#get_score").val())+1;
		$("#get_score").val(zuodui);
		var allQuestion=$("#datino").attr("class");
		var index_id=$("#current_index").val();
		//判断是否是最后一道题
		if(parseInt(allQuestion)==parseInt(index_id)){
			layer.alert("没有了");
		}else{
			$("#card"+chooseQuestion).css("background","rgb(16, 171, 245)");
			$("#"+chooseQuestion).css("display","none");
			$("#current_index").val(parseInt(chooseQuestion)+1);
			$("#"+(parseInt(chooseQuestion)+1)).css("display","block");
			
			$("#next").attr("onclick","xiayiti('"+$("#"+(parseInt(chooseQuestion)+1)).find("#hideid").val()+"')");
			$("#shoucang").attr("onclick",shoucang+"('"+$("#"+(parseInt(chooseQuestion)+1)).find("#hideid").val()+"')");
		}
	}else if(xuanzedaan!=chooseDaan){
		var jiexi=$("#"+chooseQuestion).find(".error_ans").css("display");
		//答错时，显示答案跟解析
		if(jiexi=="none"){
			$("#"+chooseQuestion).find(".error_ans").css("display","block");
			$("#card"+chooseQuestion).css("background","rgb(255, 72, 94)");
			addError($("#"+parseInt(chooseQuestion)).find("#hideid").val());
		//已显示的情况下跳到下一题
		}else if(jiexi=="block"){
			var allQuestion=$("#datino").attr("class");
			var index_id=$("#current_index").val();
			if(parseInt(allQuestion)==parseInt(index_id)){
				layer.alert("没有了");
			}else{
				$("#"+chooseQuestion).css("display","none");
				$("#current_index").val(parseInt(chooseQuestion)+1);
				$("#"+(parseInt(chooseQuestion)+1)).css("display","block");
				$("#next").attr("onclick","xiayiti('"+$("#"+(parseInt(chooseQuestion)+1)).find("#hideid").val()+"')");
				$("#shoucang").attr("onclick",shoucang+"('"+$("#"+(parseInt(chooseQuestion)+1)).find("#hideid").val()+"')");
				}
			}
		}
	}
}
//点击右边题目列表跳转到指定题目
function ShowQuestionByid(tid){
	//获取所有题目数量
	var allQuestion=$("#datino").attr("class");
	//当前题目下标
	var index_id=$("#current_index").val();
	//控制跳转题目时页面的变换
	$("#"+index_id).css("display","none");
	$("#"+tid).css("display","block");
	$("#current_index").val(tid);
	$("#next").attr("onclick","xiayiti('"+$("#"+tid).find("#hideid").val()+"')");
	$("#shoucang").attr("onclick",shoucang+"('"+$("#"+tid).find("#hideid").val()+"')");
}

//初始化展示
function getQuestion(knowId){
	//获取随即题
	 $.ajax({
		 url: dapartmenturl+ "ExercisesController/getRandomQuestion.action",
         data: { knowId: knowId },
         type: "Post",
         async: false,
         success: function (data) {
        	 show(data);
         }
	 });
}

//初始化显示
function show(data){
	var result=data[1];
	console.log(result);
	if(result[0].personalId!=null){
		var a=$("#shoucang");
		a.empty();
		a.append("移除");
		shoucang="yichuShoucang";
	}
	for(var i=0;i<result.length;i++){
		var xml = new DOMParser().parseFromString(result[i].content, "text/xml");
//0表示第一题
		if(i==0){
			//判断题目类型区分
			
			
			//第一道（单选题）
			if(result[i].type=="单选题"){
				//获取需要的值并写入html中展示出来
				var timu=xml.getElementsByTagName("文字")[0].textContent;
				daan=xml.getElementsByTagName("答案")[0].textContent;
				var jiexi=xml.getElementsByTagName("解析")[0].textContent;
				var timuId=result[i].id;
				var A=xml.getElementsByTagName("文字")[1].textContent;
				var B=xml.getElementsByTagName("文字")[2].textContent;
				var C=xml.getElementsByTagName("文字")[3].textContent;
				var D=xml.getElementsByTagName("文字")[4].textContent;
				if(xml.getElementsByTagName("文字").length>5){
					var E=xml.getElementsByTagName("文字")[5].textContent;
				}
				if(xml.getElementsByTagName("文字").length>6){
					var F=xml.getElementsByTagName("文字")[6].textContent;
				}
				var html='<div class="AllQuestion" id="'+(i+1)+'" style="overflow-y:auto;max-height:500px;width:570px;overflow-x:hidden;display: block" value="'+daan+'">'
			+'<input id="hideid" value="'+timuId+'" type="text" hidden /><div style="width: 570px"><div style="width:553px;">  </div></div>'
			+'  <div class="ques_body" data-type="单选题" id="leixing">'
			+'<div style="word-break:break-all;font-size:18px;">'
			+'('+result[i].type+')'+timu+'</div>'
			+'<ul class="dks-pdkey clear" style="margin-top:10px;">'
			+'<li><label><input type="radio" value="A" name="'+timuId+'" />A、'+A+'</label></li>'
			+'<li><label><input type="radio" value="B" name="'+timuId+'" />B、'+B+'</label></li>'
			+'<li><label><input type="radio" value="C" name="'+timuId+'" />C、'+C+'</label></li>'
			+'<li><label><input type="radio" value="D" name="'+timuId+'" />D、'+D+'</label></li>';
			if(xml.getElementsByTagName("文字").length>5){
				html+='<li><label><input type="radio" value="E" name="'+timuId+'" />E、'+E+'</label></li>';
			}
			if(xml.getElementsByTagName("文字").length>6){
				html+='<li><label><input type="radio" value="F" name="'+timuId+'" />F、'+F+'</label></li>';
			}
			html+='</ul><div><div class="error_ans" style="margin-top:10px;display: none"><div  id="daan"  style="color:#ff485E">正确答案：'+daan+'</div><div>'
			+'解析：'+jiexi+'</div></div>'
			+'</div></div>';
			
			//第一道（填空题）
			}else if(result[i].type=="填空题"){
				daan=xml.getElementsByTagName("答案")[0].textContent;
				tiankongDaan=daan.split("______");
				daan=""
				for(var l=0;l<tiankongDaan.length;l++){
					daan+=tiankongDaan[l]+";";
				}
				var jiexi=xml.getElementsByTagName("解析")[0].textContent;
				var timuId=result[i].id;
				var html='<div class="AllQuestion" id="'+(i+1)+'" style="overflow-y:auto;max-height:500px;width:570px;overflow-x:hidden;display: block" value="'+daan+'">'
				+'<input id="hideid" value="'+timuId+'" type="text" hidden /><div style="width: 570px"><div style="width:553px;">  </div></div>'
				+'  <div class="ques_body" data-type="填空题" id="leixing">'
				+'<div class="fillit_que" style="font-size:18px;">'
				+'('+result[i].type+')'+result[i].title+"</br>请填写答案为：";
				for(var k=0;k<tiankongDaan.length;k++){
					html+=(k+1)+'.<input class="tk-insty" type="text" name="'+timuId+'"/></br>';
				}
				html+='</div></div>'
				+'<div><div class="error_ans" style="margin-top:10px;display: none"><div  id="daan"  style="color:#ff485E">正确答案：'+daan+'</div><div>'
				+'解析：'+jiexi+'</div></div>'
				+'</div></div>';
				
			//第一道（判断题）
			}else if(result[i].type=="判断题"){
				daan=xml.getElementsByTagName("答案")[0].textContent;
				var jiexi=xml.getElementsByTagName("解析")[0].textContent;
				var timuId=result[i].id;
				var html='<div class="AllQuestion" id="'+(i+1)+'" style="overflow-y:auto;max-height:500px;width:570px;overflow-x:hidden;display: block" value="'+daan+'">'
				+'<input id="hideid" value="'+timuId+'" type="text" hidden /><div style="width: 570px"><div style="width:553px;">  </div></div>'
				+'  <div class="ques_body" data-type="判断题" id="leixing">'
				+'<div style="word-break:break-all;font-size:18px;">'
				+'('+result[i].type+')'+result[i].title+'</div>'
				+'<ul class="dks-pdkey clear" style="margin-top:10px;">'
				+'<li><label><input type="radio" name="'+timuId+'" value="A" />正确</label></li>'
                +'<li><label><input type="radio" name="'+timuId+'" value="B" />错误</label></li></ul>'
				+'<div><div class="error_ans" style="margin-top:10px;display: none"><div  id="daan" style="color:#ff485E" >正确答案：'+daan+'</div><div>'
				+'解析：'+jiexi+'</div></div>'
				+'</div></div>';
				
			//第一道（多选题）	
			}else if(result[i].type=="多选题"){
				var A=xml.getElementsByTagName("文字")[1].textContent;
				var B=xml.getElementsByTagName("文字")[2].textContent;
				var C=xml.getElementsByTagName("文字")[3].textContent;
				var D=xml.getElementsByTagName("文字")[4].textContent;
				var E=xml.getElementsByTagName("文字")[5].textContent;
				var F=xml.getElementsByTagName("文字")[6].textContent;
				daan=xml.getElementsByTagName("答案")[0].textContent;
				daan=daan.split("______");
				var duoxuanDaan="";
				for(var j=0;j<daan.length;j++){
					duoxuanDaan=duoxuanDaan+daan[j];
				}
				var jiexi=xml.getElementsByTagName("解析")[0].textContent;
				var timuId=result[i].id;
				var html='<div class="AllQuestion" id="'+(i+1)+'" style="overflow-y:auto;max-height:500px;width:570px;overflow-x:hidden;display: block" value="'+duoxuanDaan+'">'
				+'<input id="hideid" value="'+timuId+'" type="text" hidden /><div style="width: 570px"><div style="width:553px;">  </div></div>'
				+'  <div class="ques_body" data-type="多选题" id="leixing">'
				+'<div style="word-break:break-all;font-size:18px;">'
				+'('+result[i].type+')'+result[i].title+'</div>'
				+'<ul class="dks-pdkey clear" style="margin-top:10px;">'
				+'<li><label><input type="checkbox" value="A" name="'+timuId+'" />A、'+A+'</label></li>'
				+'<li><label><input type="checkbox" value="B" name="'+timuId+'" />B、'+B+'</label></li>'
				+'<li><label><input type="checkbox" value="C" name="'+timuId+'" />C、'+C+'</label></li>'
				+'<li><label><input type="checkbox" value="D" name="'+timuId+'" />D、'+D+'</label></li>'
				if(E!=""){
					html+='<li><label><input type="checkbox" value="E" name="'+timuId+'" />E、'+E+'</label></li>'
				}
				if(F!=""){
					html+='<li><label><input type="checkbox" value="F" name="'+timuId+'" />F、'+F+'</label></li>'
				}
				html+='</ul><div><div class="error_ans" style="margin-top:10px;display: none"><div  id="daan" style="color:#ff485E" >正确答案：'+daan+'</div><div>'
				+'解析：'+jiexi+'</div></div>'
				+'</div></div>';
			}
			//控制右边框答题卡的展示
			var answerHtml='<li onclick="ShowQuestionByid('+(i+1)+')" id="card'+(i+1)+'" class="datika" style="border:1px solid #dfdfdf;width:40px;height:40px;float:left;text-align:center;line-height:40px">'+(i+1)+'</li>';
			//提供下一题的点击事件，以及参数
			$("#next").attr("onclick","xiayiti('"+timuId+"')");
			$("#shoucang").attr("onclick",shoucang+"('"+timuId+"')");
		}else{
			//非第一题展示
			if(result[i].type=="单选题"){
				var timu=xml.getElementsByTagName("文字")[0].textContent;
				daan=xml.getElementsByTagName("答案")[0].textContent;
				var jiexi=xml.getElementsByTagName("解析")[0].textContent;
				var timuId=result[i].id;
				var A=xml.getElementsByTagName("文字")[1].textContent;
				var B=xml.getElementsByTagName("文字")[2].textContent;
				var C=xml.getElementsByTagName("文字")[3].textContent;
				var D=xml.getElementsByTagName("文字")[4].textContent;
				var html='<div class="AllQuestion" id="'+(i+1)+'" style="overflow-y:auto;max-height:500px;width:570px;overflow-x:hidden;display: none" value="'+daan+'">'
					+'<input id="hideid" value="'+timuId+'" type="text" hidden /><div style="width: 570px"><div style="width:553px;">  </div></div>'
					+'  <div class="ques_body" data-type="单选题" id="leixing">'
					+'<div style="word-break:break-all;font-size:18px;">'
					+'('+result[i].type+')'+timu+'</div>'
					+'<ul class="dks-pdkey clear" style="margin-top:10px;">'
					+'<li><label><input type="radio" value="A" name="'+timuId+'" />A、'+A+'</label></li>'
					+'<li><label><input type="radio" value="B" name="'+timuId+'" />B、'+B+'</label></li>'
					+'<li><label><input type="radio" value="C" name="'+timuId+'" />C、'+C+'</label></li>'
					+'<li><label><input type="radio" value="D" name="'+timuId+'" />D、'+D+'</label></li></ul>'
					+'<div><div class="error_ans" style="margin-top:10px;display: none"><div  id="daan" style="color:#ff485E" >正确答案：'+daan+'</div><div>'
					+'解析：'+jiexi+'</div></div>'
					+'</div></div>';
				
			//非第一道，填空题
			}else if(result[i].type=="填空题"){
				daan=xml.getElementsByTagName("答案")[0].textContent;
				tiankongDaan=daan.split("______");
				daan=""
				for(var l=0;l<tiankongDaan.length;l++){
					daan+=tiankongDaan[l]+";";
				}
				var jiexi=xml.getElementsByTagName("解析")[0].textContent;
				var timuId=result[i].id;
				var html='<div class="AllQuestion" id="'+(i+1)+'" style="overflow-y:auto;max-height:500px;width:570px;overflow-x:hidden;display: none" value="'+daan+'">'
				+'<input id="hideid" value="'+timuId+'" type="text" hidden /><div style="width: 570px"><div style="width:553px;">  </div></div>'
				+'  <div class="ques_body" data-type="填空题" id="leixing">'
				+'<div class="fillit_que" style="font-size:18px;">'
				+'('+result[i].type+')'+result[i].title+"</br>请填写答案为：";
				for(var k=0;k<tiankongDaan.length;k++){
					html+=(k+1)+'.<input class="tk-insty" type="text" name="'+timuId+'"/></br>';
				}
				html+='</div></div>'
				+'<div><div class="error_ans" style="margin-top:10px;display: none"><div  id="daan"  style="color:#ff485E">正确答案：'+daan+'</div><div>'
				+'解析：'+jiexi+'</div></div>'
				+'</div></div>';
			
			//非第一道，判断题
			}else if(result[i].type=="判断题"){
				daan=xml.getElementsByTagName("答案")[0].textContent;
				var jiexi=xml.getElementsByTagName("解析")[0].textContent;
				var timuId=result[i].id;
				var html='<div class="AllQuestion" id="'+(i+1)+'" style="overflow-y:auto;max-height:500px;width:570px;overflow-x:hidden;display: none" value="'+daan+'">'
				+'<input id="hideid" value="'+timuId+'" type="text" hidden /><div style="width: 570px"><div style="width:553px;">  </div></div>'
				+'  <div class="ques_body" data-type="判断题" id="leixing">'
				+'<div style="word-break:break-all;font-size:18px;">'
				+'('+result[i].type+')'+result[i].title+'</div>'
				+'<ul class="dks-pdkey clear" style="margin-top:10px;">'
				+'<li><label><input type="radio" name="'+timuId+'" value="A" />正确</label></li>'
                +'<li><label><input type="radio" name="'+timuId+'" value="B" />错误</label></li></ul>'
				+'<div><div class="error_ans" style="margin-top:10px;display: none"><div  id="daan" style="color:#ff485E" >正确答案：'+daan+'</div><div>'
				+'解析：'+jiexi+'</div></div>'
				+'</div></div>';
				
			//非第一道，多选题	
			}else if(result[i].type=="多选题"){
				var A=xml.getElementsByTagName("文字")[1].textContent;
				var B=xml.getElementsByTagName("文字")[2].textContent;
				var C=xml.getElementsByTagName("文字")[3].textContent;
				var D=xml.getElementsByTagName("文字")[4].textContent;
				var E=xml.getElementsByTagName("文字")[5].textContent;
				var F=xml.getElementsByTagName("文字")[6].textContent;
				daan=xml.getElementsByTagName("答案")[0].textContent;
				daan=daan.split("______");
				var duoxuanDaan="";
				for(var j=0;j<daan.length;j++){
					duoxuanDaan=duoxuanDaan+daan[j];
				}
				var jiexi=xml.getElementsByTagName("解析")[0].textContent;
				var timuId=result[i].id;
				var html='<div class="AllQuestion" id="'+(i+1)+'" style="overflow-y:auto;max-height:500px;width:570px;overflow-x:hidden;display: none" value="'+duoxuanDaan+'">'
				+'<input id="hideid" value="'+timuId+'" type="text" hidden /><div style="width: 570px"><div style="width:553px;">  </div></div>'
				+'  <div class="ques_body" data-type="多选题" id="leixing">'
				+'<div style="word-break:break-all;font-size:18px;">'
				+'('+result[i].type+')'+result[i].title+'</div>'
				+'<ul class="dks-pdkey clear" style="margin-top:10px;">'
				+'<li><label><input type="checkbox" value="A" name="'+timuId+'" />A、'+A+'</label></li>'
				+'<li><label><input type="checkbox" value="B" name="'+timuId+'" />B、'+B+'</label></li>'
				+'<li><label><input type="checkbox" value="C" name="'+timuId+'" />C、'+C+'</label></li>'
				+'<li><label><input type="checkbox" value="D" name="'+timuId+'" />D、'+D+'</label></li>'
				if(E!=""){
					html+='<li><label><input type="checkbox" value="E" name="'+timuId+'" />E、'+E+'</label></li>'
				}
				if(F!=""){
					html+='<li><label><input type="checkbox" value="F" name="'+timuId+'" />F、'+F+'</label></li>'
				}
				html+='</ul><div><div class="error_ans" style="margin-top:10px;display: none"><div  id="daan" style="color:#ff485E" >正确答案：'+daan+'</div><div>'
				+'解析：'+jiexi+'</div></div>'
				+'</div></div>';
			}
		var answerHtml='<li onclick="ShowQuestionByid('+(i+1)+')" id="card'+(i+1)+'" class="datika" style="border:1px solid #dfdfdf;width:40px;height:40px;float:left;text-align:center;line-height:40px">'+(i+1)+'</li>';
		}
		//初始化显示
		var testObj=$("#show");
		testObj.append(html);
		//答题卡显示
		var answer=$("#answer");
		answer.append(answerHtml);
		var answerNo=$("#datino");
		answerNo.text("答题卡（共 "+result.length+" 题）");
		answerNo.attr("class",result.length);
	}
	
}


function yichuShoucang(timuId){
	 $.ajax({
		 url: dapartmenturl+ "ExercisesController/deleteShoucang.action",
        data: { timuId: timuId},
        type: "Post",
        async: false,
        success: function (data) {
       	 	if(data){
       	 		layer.alert("移除成功 ");
       	 		location.reload();
       	 	}
        }
	 });
	
}

function addError(timuId){
	$.ajax({
		 url: dapartmenturl+ "ExercisesController/addPersonal.action",
       data: { timuId: timuId,useType: "错题"},
       type: "Post",
       async: false,
       success: function (data) {
    	   if(data){
    		   console.log("错题添加成功")
    	   }
       }
	 });
}


