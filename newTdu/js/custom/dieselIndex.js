
pathURL = "../tdu-base/";
/**
 * 登录跳转
 */
function goIndex(){
	 $.ajax({
			url:pathURL+"SubjectController/getSubIdOne_develop.action",
			type:"POST",
			async:true,
			success:function(data){
				window.location.assign("index.html?majorId="+data);
			}
	 });
}
$(function() {
	
	//getUserName()
	
	$("#subject").bind("change", function() {
		$("#subject option[value='"+this.value+"']").prop("selected",true);
		
		window.location.href="index.html?majorId="+this.value;
	});
	
	
	
	var obj=getRequest();
	var majorId=obj['majorId'];
	
	//alert(majorId)
	 $.ajax({
			url:pathURL+"SubjectController/getSubIdOne_develop.action",
			type:"POST",
			async:false,
			success:function(data){
				//window.location.assign("index.php?majorId="+data);
				if(majorId==null||majorId==undefined||majorId=="undefined"){
					majorId=data;
				}else {
					$("#subject option[value='"+majorId+"']").prop("selected",true);
				}
			}
	 });
	 //alert(" majorId :"+majorId)
	showItem(majorId)
	
	
getUserId();
//
// document.getElementById('teamModles').style.visibility = "hidden"
// 	document.getElementById('teamScenes').style.visibility = "hidden"
		
		
		

	
	showHtml(majorId);
	//showTitle(majorId);
	console.log(majorId);
	
	
	
	
			
});


var userId;
function getUserId(){
	$.ajax({
        url:pathURL+"UsersController/getUserId.action",
        data: {},
        type: "post",
        async: true,
        success: function (data) {
        	$("#userId").text(data.id)
        	$("#userId").val(data.id)
        }
    });
	
}
function getUserName(){
	$.ajax({
        url:pathURL+"ShouyeController/sUserName.action",
        data: {},
        type: "post",
        async: true,
        success: function (data) {
        	$("#userName").text(data)
        }
    });
	
}
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

function showItem(majorId){
	 $.ajax({
	        url:pathURL+"ShouyeController/getSubjects_develop.action",
	        data: {},
	        type: "post",
	        async: false,
	        success: function (data) {
	            var keyList = Object.keys(data);
	            
	            var length  = Object.keys(data).length ;
	            
	            if(length>0){
	            	for (var i = 0; i < keyList.length; i++) {
	            		var subhtml='';
	            		
	            		for (var j = 0; j < Object.keys(data[keyList[i]]).length; j++) {
	            			var major = Object.keys(data[keyList[i]])[j];
	            			var arr=major.split(",");
	            			subhtml+='<optgroup label="'+arr[0]+'" >';  
	            			for (var m = 0; m < data[keyList[i]][Object.keys(data[keyList[i]])[j]].length; m++) {
	            				subhtml+='<option value="'+data[keyList[i]][Object.keys(data[keyList[i]])[j]][m].id+'">'+data[keyList[i]][Object.keys(data[keyList[i]])[j]][m].subjectName+'</option>';
	            				
	            			}
	            	}
	            		subhtml+="</optgroup>";
	            }
	            $("#subject").html("");
	            console.log(subhtml);
	            $("#subject").html(subhtml);
	            if(majorId!=null){
	            	$("#subject").val(majorId);
	            	}else{
	            		
	            		$("#subject").val(data[keyList[0]][Object.keys(data[keyList[i]])[j]][m].id);
	            	}
	            }
	        }
	    });	
}

//获取信息
function showHtml(majorId) {
	console.log(majorId);
	var url = pathURL+"SubjectTreeController/getUsersSub.action"
	$.post(url, {
		"majorId" : majorId
	}, function(result) {
		itemShow(result,majorId);
	});
}

//展示页面
function itemShow(result,majorId) {
	console.log(result+"展示页面");
	 var html='';
	 
	 var treeHtml='';
	 
	 /*html+='<li><a class="borderspan" onclick="showMenu(this,'+"'"+majorId+"'"
	 	+')" style="background: rgb(52, 57, 61);"><span>教学系统</span></a><ul class="biheKaiguan" id="'+majorId
	 	+'" style="display: black;">';*/
	 for(var i=0;i<result.length;i++){
		 var url='';
		 if(result[i].columnLink==null){
			 url='content/cz/item.html';
		 }else{
			 url=result[i].columnLink;
		 }
		 console.log(url)
		 console.log(result[i].treeName)
		 if(result[i].treeName=="仿真操作"){
		 html+='<li onmouseout=leave("' + (i + 1) +'","'+ result[i].id+'") onclick="showUrl('+"'"+url+"','"+result[i].treeName+"','"
		 	+result[i].id+"','"+(i+1)+"'"+')"  onmouseover=test("' + (i + 1) + '","'+ result[i].id+ '") id="'+result[i].id+'"><a style="background: rgb(52, 57, 61);"><img src="img/ico/zhanshi0'+(i+1)+'.png"><span id="childrenspan" class="childrenspan" style="color: white;">'
		 	+result[i].treeName+'</span></a></li>';
		 }else{
			 if(result[i].treeName=="双子叶植物"){
				 html+='<li  onclick="showUrl('+"'"+url+"','"+result[i].treeName+"','"
				 	+result[i].id+"','"+(i+1)+"'"+')" id="'+result[i].id+'"><a  style="background: rgb(52, 57, 61);"><img src="img/ico/双子叶植物.png"><span id="childrenspan" class="childrenspan" style="color: white;">'
				 	+result[i].treeName+'</span></a></li>';
			 }else if(result[i].treeName=="裸子植物"){
				 html+='<li  onclick="showUrl('+"'"+url+"','"+result[i].treeName+"','"
				 	+result[i].id+"','"+(i+1)+"'"+')" id="'+result[i].id+'"><a  style="background: rgb(52, 57, 61);"><img src="img/ico/裸子植物.png"><span id="childrenspan" class="childrenspan" style="color: white;">'
				 	+result[i].treeName+'</span></a></li>';
			 }else if(result[i].treeName=="单子叶植物"){
				 html+='<li  onclick="showUrl('+"'"+url+"','"+result[i].treeName+"','"
				 	+result[i].id+"','"+(i+1)+"'"+')" id="'+result[i].id+'"><a  style="background: rgb(52, 57, 61);"><img src="img/ico/单子叶植物.png"><span id="childrenspan" class="childrenspan" style="color: white;">'
				 	+result[i].treeName+'</span></a></li>';
			 }else if(result[i].treeName=="被子植物"){
				 html+='<li  onclick="showUrl('+"'"+url+"','"+result[i].treeName+"','"
				 	+result[i].id+"','"+(i+1)+"'"+')" id="'+result[i].id+'"><a  style="background: rgb(52, 57, 61);"><img src="img/ico/被子植物.png"><span id="childrenspan" class="childrenspan" style="color: white;">'
				 	+result[i].treeName+'</span></a></li>';
			 }else{
				 html+='<li style="margin-top: 10px;margin-bottom: 10px;" onmouseout=leave("' + (i + 1) +'","'+ result[i].id+ '") onclick="showUrl('+"'"+url+"','"+result[i].treeName+"','"
				 	+result[i].id+"','"+(i+1)+"'"+')" onmouseover=test("' + (i + 1) + '","'+ result[i].id+ '") id="'+result[i].id+'"><a  style="position: relative"><img src="img/ico/zhanshi0'+(i+1)+'.png"><span id="childrenspan" class="childrenspan" style="color: white;">'
				 	+result[i].treeName+'</span><img style="z-index: 2;position:absolute;top: 20%;right: 0px;height: 50%;width: auto" src="img/ico/icon_reat.png" alt=""/></a></li>';
			 }
			 
			 if(result[i].treeName=="模型库"){
				 treeHtml+= '<span id="modelSpan" style="color:#0087ff;font-size:18px;Font-weight:bold;">模型库</span>'
				 +'<ul id="treeDemo" class="ztree" ></ul>'
				 +'<hr id="hr1"/>'
			 }else if(result[i].treeName=="场景库"){
				 treeHtml+= '<span id="sceneSpan"style="color:#0087ff;font-size:18px;Font-weight:bold;">场景库</span>'
				 +'<ul id="tree" class="ztree" ></ul>'
				 +'<hr id="hr2"/>'
			 }
		 }
	 }
	 $("#showTree").append(treeHtml);
	 html+='</ul></li>'
	$(".pageleftcontentul").append(html);


	 document.getElementById('modelSpan').style.visibility = "hidden"
			document.getElementById('sceneSpan').style.visibility = "hidden"
				document.getElementById("hr1").style.visibility = "hidden"
					document.getElementById("hr2").style.visibility = "hidden"
	 
}



function test(i,id) {
	var k = parseInt(i);
	var string=new Array();
	var path = "img/ico/zhanshi0"+k+".png";
	string=path.split('.');
	var str = string[0]+"_1."+string[1];
	$("#"+id).find("img")[0].attr("src",str);
	$("#"+id).find("a").css("background","linear-gradient(337deg,rgba(92,205,177,1) 0%,rgba(92,205,178,1) 0%,rgba(89,208,207,1) 100%)");
	$("#"+id).find("span").css("color","rgb(52,57,61)");
}
function leave(i,id) {
	var k = parseInt(i);
	var path = "img/ico/zhanshi0"+k+".png";
	$("#"+id).find("img")[0].attr("src",path);
	$("#"+id).find("a").css("background","rgb(52,57,61)");
	$("#"+id).find("span").css("color","rgb(242,255,255)");
}



function showTitle(majorId){
	var url = pathURL+"DepartmentController/seleMajorName.action"
		$.post(url, {
			"majorId" : majorId
		}, function(result) {
			if(result=="ME与RT-FLEⅩ智能柴油机虚拟拆装"){
				result="ME与RT-FLEⅩ智能柴油机";
			}
			$("title").html(result);
			$("#test1").text(result);
		});
	
}