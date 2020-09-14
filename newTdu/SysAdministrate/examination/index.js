// JavaScript Document
var ChooseSubject="";//可以随意用的一个全部变量，在很多地方都用到了
	pathURL="../../../../";
//	filePath="C:/wamp/www/xuexiao/";
	filePath="E:/wamp/tomcat/webapps/quanzhouxuexiao/QZ/updata/";//文件储存路径
	adminNum=3;//角色权限，存成全局变量，方便使用
	officeURL1="http://192.168.0.63/";
	officeURL2="?WOPISrc=http://192.168.0.11/quanzhouxuexiao/wopi/files/updata/";
	imgURL="";
	Introduce=[];
	InNum=0;
	var logo1;var logo2;//用于保存图标URL
	var animateTime=0;
	var animateTime2=0;

//动态加载导航栏
function getNav(){
	$.ajax({
		type:"POST",
		url:"../../../../NavigationBarController/seleNavigation.action",
		success:function(data){
			var dataL=data.length;
			var html=""
			var j=0
			for(var i=0;i<dataL;i++){
				if(adminNum==1||adminNum==2){
					if(data[i].userrole!==2){
						if(data[i].columnLevel==1){
							if(j==0){
								html+='<li><a class="borderspan" onclick="showMenu(\''+data[i].id+'\')"><img src="'+data[i].columnPicture+'"  /><span >'+data[i].columnName+'</span></a>'+
										'<ul class="biheKaiguan" id="'+data[i].id+'" style="display:none">';
								j++;
							}else{
								html+='</ul>'+
									'</li>'+
									'<li><a class="borderspan" onclick="showMenu(\''+data[i].id+'\')"><img src="'+data[i].columnPicture+'"  /><span >'+data[i].columnName+'</span></a>'+
										'<ul class="biheKaiguan" id="'+data[i].id+'" style="display:none">';
							}
						}else if(data[i].columnLevel==2){
							html+='<li id="'+data[i].id+'"><a onclick="showUrl(\''+data[i].columnLink+'\',\''+data[i].columnName+'\')"><span class="childrenspan" >'+data[i].columnName+'</span></a></li>';
						}
					}
				}else if(adminNum==3){
					if(data[i].userrole!=1){
						if(data[i].columnLevel==1){
							if(j==0){
								html+='<li><a class="borderspan" onclick="showMenu(\''+data[i].id+'\')"><img src="'+data[i].columnPicture+'"  /><span >'+data[i].columnName+'</span></a>'+
										'<ul class="biheKaiguan" id="'+data[i].id+'" style="display:none">';
								j++;
							}else{
								html+='</ul>'+
									'</li>'+
									'<li><a class="borderspan" onclick="showMenu(\''+data[i].id+'\')"><img src="'+data[i].columnPicture+'"  /><span >'+data[i].columnName+'</span></a>'+
										'<ul class="biheKaiguan" id="'+data[i].id+'" style="display:none">';
							}
						}else if(data[i].columnLevel==2){
							html+='<li id="'+data[i].id+'"><a onclick="showUrl(\''+data[i].columnLink+'\',\''+data[i].columnName+'\')"><span class="childrenspan" >'+data[i].columnName+'</span></a></li>';
						}
					}else{
						continue;
					}
				}
			}
			html+='</ul>'+
				'</li>';
			$('.pageleftcontentul').html(html);
		}
	})
}

//修改左侧随动的宽度
function ChangedetailHead(){
		// if($(".detailHead").length>0){
		// 	$(".detailHead-right").animate({"width":$(".detailHead")[0].clientWidth-322,duration:100});
		// }
		animateTime=0;
		animateTime2=0;
}

function GetMessAgeNum(){
	$.ajax({
        url:"../../../../InformessagesController/selSomeInf.action",
		type:"POST",
		data:{page:1,size:5},
		success:function(data){
			if(data.length>0){
				console.log()
				$("#msgNum")[0].innerText=data.length;
			}
		}
	});
}
//右侧导航栏展开
function showMenu(id)
{
	if($("#"+id)[0].style.display=="none"){
		$("#"+id).css("display","block");
	}else{
		$("#"+id).css("display","none");
	}
}

//load加载页面
function showUrl(url,content){
	$("#contentDiv").load(url);		
//	$("#nowAddress")[0].innerText=content;
}

//正则表达式解析路径
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function updataCss(){
	try{
		$(".pagerightbottom1").css("height",(innerHeight-90)*0.94);
		$(".pageright").css("width",$("#ContentBody")[0].clientWidth-80);
		//$(".detailHead-right").css("width",(innerWidth-80)*0.98*0.9-340);


	}catch(e){
		
	}
	if(innerWidth<="1470px"){
		//$(".pageleftcontent").children().span.style.display="none";
	}
}

//点击遮罩，退出大图浏览
function tuichu(){
	$("#xianshiwenjian").html('');//清空div中的所有内容
	$("#VideoContent").html('');//清空div中的所有内容
	$("#myImg").html('');
	$("#xianshidiv,#zhaozi").hide();
	$("#wenjianming").html('');
	$("#Videodiv").hide();
}

//题干加载
function showsxml(value,rowData,index){
	var tigan=showXml(rowData.content,rowData.type);
	return tigan;
}

//解析xml文件
function showXml(content,type){
	var xml=new DOMParser().parseFromString(content,"text/xml");
	var wenzi=xml.getElementsByTagName("题干")[0].children[0].innerHTML;
	if(type==="单选题"){
		var tupian=xml.getElementsByTagName("题干")[0].children[1].innerHTML;
		var tigan="";
		if(tupian){
			tigan='<div><img style="height:50px;" src="examFile/'+tupian+'"></img><br/><span>'+wenzi+'</span></div>';
		}else{
			tigan='<div><span>'+wenzi+'</span></div>';
		}
		return tigan;
	}else if(type==="填空题"){
		tigan='<span>'+wenzi+'</span>';
		return tigan;
	}else if(type==="判断题"){
		var tupian=xml.getElementsByTagName("题干")[0].children[1].innerHTML;
		var tigan="";
		if(tupian){
			tigan='<div><img style="height:50px;" src="examFile/'+tupian+'"></img><br/><span>'+wenzi+'</span></div>';
		}else{
			tigan='<div><span>'+wenzi+'</span></div>';
		}
		return tigan;
	}else if(type==="问答题"){
		tigan='<span>'+wenzi+'</span>';
		return tigan;
	}else if(type==="多选题"){
		var tupian=xml.getElementsByTagName("题干")[0].children[1].innerHTML;
		var tigan="";
		if(tupian){
			tigan='<div><img style="height:50px;" src="examFile/'+tupian+'"></img><br/><span>'+wenzi+'</span></div>';
		}else{
			tigan='<div><span>'+wenzi+'</span></div>';
		}
		return tigan;
	}
}

//访问后台session，得到其中的name返回到前台
var xianzhi=0;
function getName(){
	//对用户名进行获取，要是session中无值，返回登录页面
	$.ajax({
		url:pathURL+"ShouyeController/sUserName.action",
		type:"POST",
		async:true,
		success:function(data){
			if(data=="err"){
				window.location.assign("login.php");
				return;
			}
			else{
				if(data=="管理员"){
					$("#nowUser").html('<a onclick="goToNav()">'+data+'</a>');
				}else{
					$("#nowUser").html(data);
				}
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

//跃迁门，跳转到后台导航栏控制中
function goToNav(){
	window.location.assign("SysAdministrate/index.php");
	return;
}

//注销功能
function zhuxiao(){
	$.ajax({
		type:"POST",
		url:"../UsersController/zhuxiao.action",
		success:function(data){
			if(data=="ture"){
				getName();
			}
		}
	})
}

//将特殊字符转义保存
function zhuanyi(zifu){
	zifu=zifu.replace(/&/g,"&#38;");
	zifu=zifu.replace(/</g,"&#60;");
	zifu=zifu.replace(/>/g,"&#62;");
	zifu=zifu.replace(/"/g,"&#34;");
	zifu=zifu.replace(/×/g,"&#215;");
	zifu=zifu.replace(/÷/g,"&#247;");
	zifu=zifu.replace(/¥/g,"&#165;");
	zifu=zifu.replace(/¯/g,"&#175;");
	zifu=zifu.replace(/´/g,"&#180;");
	return zifu;
}

//反转义
function nizhuanyi(zifu){
	zifu=zifu.replace(/&acute;/g,"´");
	zifu=zifu.replace(/&macr;/g,"¯");
	zifu=zifu.replace(/&yen;/g,"¥");
	zifu=zifu.replace(/&divide;/g,"÷");
	zifu=zifu.replace(/&times;/g,"×");
	zifu=zifu.replace(/&quot;/g,"\"");
	zifu=zifu.replace(/&gt;/g,">");
	zifu=zifu.replace(/&lt;/g,"<");
	zifu=zifu.replace(/&amp;/g,"&");
	return zifu;
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

//空内容检查
function spaceNo(myId){
	var getVal=$("#"+myId+"").val();
	if(getVal==""){
		return false;
	}else{
		return true;
	}
}

//获取此时框的高度，然后得到文件框的高度
function getHeight(){
	var getDiv=window.document.getElementById('xianshidiv');
	var getDiv1=window.document.getElementById('xianshiwenjian');
	var divHeight=getDiv.offsetHeight;
	getDiv1.style.height=(parseInt(divHeight)-parseInt(32))+'px';
}


function getSchoolLogo1(){
	$.ajax({
		type:"POST",
		url:"../../../../NavigationBarController/getimgUrl.action?imgKey=schoolLogo1",
		success:function(data){
			if(data){
				logo1=data;
			}
		}
	})
}

function getSchoolLogo2(){
	$.ajax({
		type:"POST",
		url:"../../../../NavigationBarController/getimgUrl.action?imgKey=schoolLogo2",
		async: false,
		success:function(data){
			if(data){
				logo2=data;
			}
		}
	})
}



/**********************************************/

var ReadExm=function(ExmFilePath){
    var settledValue="";
    var req = new XMLHttpRequest;
    req.open('GET', ExmFilePath, false);
    req.send(null);
    if (req.readyState == 4) {

        settledValue = req.responseText;
    }
    return settledValue;
};

