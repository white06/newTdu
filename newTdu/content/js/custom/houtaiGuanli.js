$(function(){
	getName();
})


function showUrl(url){
	$("#rightPageBody").load(url);
}

//非法字符检测
function inspect(myId){
	var getVal=$("#"+myId+"").val();
	var valL=getVal.length;
	if(getVal.indexOf("&")>-1||getVal.indexOf("?")>-1){
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

//跃迁门，返回主页
function fanhuiPingtai(){
	window.location.assign("index.php");
}

//登陆判断
var xianzhi=0;
function getName(){
	//对用户名进行获取，要是session中无值，返回登录页面
	$.ajax({
		url:"../ShouyeController/sUserName.action",
		type:"POST",
		async:true,
		success:function(data){
			if(data=="err"){
				window.location.assign("login.php");
				return;
			}
			else{
				xianzhi=1;
				setTimeout(function(){
					if(xianzhi===1){
						getName();
						xianzhi=0;
					}
				},780000);
			}
		},
		error:function(){
			window.location.assign("login.php");
			return;
		}
	});	
}

