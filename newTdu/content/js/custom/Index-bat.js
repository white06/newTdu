// JavaScript Document
var ChooseSubject="";//可以随意用的一个全部变量，在很多地方都用到了
	pathURL="../";
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
	var createRoomlock=0;
	var NowRoomType="";
	var roomid;
	var rtype;
	var NowIpAdress="";
$(function(){
	getName();
	getSchoolLogo1();
	getSchoolLogo2();
	$.ajax({
		type:"POST",
		url:pathURL+"UsersController/seleNum.action",
		success:function(data){
			showUrl('content/cz/zhuzhou.php','HQ800多功能工具机--主轴');
			adminNum=data;
			//getNav();
		}
	});

	$(".pagerightbottom").css("height",(innerHeight-78));
	
	$(".pageleft").mouseenter(function(){
		if(animateTime==0){
			animateTime=1;
			$(this).stop().animate({"width":"250px",queue:false,duration:500});
			$(".pageright").stop().animate({"width":$("#ContentBody")[0].clientWidth-250,queue:false,duration:500},function(){
				ChangedetailHead();
				
			});
			$(".pageleftcontentul span").show();		
			//$('.pagelefthead').css({'background':'url('+logo1+') no-repeat center center','background-size':'90%','background-color':'#073F72'});
		}
	});
	
	$(".pageleft").mouseleave(function(){	
		if(animateTime2==0){
			animateTime2=1;
			$(this).stop().animate({"width":"250px",queue:false,duration:500});	
			$(".pageright").stop().animate({"width":$("#ContentBody")[0].clientWidth-250,queue:false,duration:500},function(){
				ChangedetailHead();
		}); 
		}
	});	
	
	$("#xianshidiv").draggable({ containment: "#ContentBody", scroll: false,handle:".ClosePannel" });
	$("#Videodiv").draggable({ containment: "#ContentBody", scroll: false });
	
	$("#roomxianshidiv").draggable({ containment: "#ContentBody", scroll: false,handle:".ClosePannel" });	
	  $(".pageleft").animate({"width":"250px"});
	  $(".pageright").animate({"width":parseInt($("#ContentBody")[0].clientWidth)-250+"px"});
	//
	 /*$('.pagelefthead').css({"background":"url("+logo2+") no-repeat center center"});
	 $('.pagelefthead').css({'background-size':'auto 70%'});
	 $('.pagelefthead').css({'background-color':'#303030'});*/
	  $('.pagelefthead').css({'color':'#fff'});
	 $('.pagelefthead').css({'font-size':'16px'});
	//$(".pageleftcontentul span").hide();
	
	$('#win').panel({
		onBeforeClose:function(){
			 $('#win').html('');
			 return true;
		}, 
	}); 
	
	//-------------------------------------
	$(".childrenspan").on("mouseover",function(){
				 $(this).css("color","#2EA6C8");
				if($(this)[0].className.indexOf("chooseCss")>-1){
				
				}else{
					
					$($(this)[0].previousSibling)[0].src=$($(this)[0].previousSibling)[0].src.split('.png')[0]+"_1"+".png";	
				 }
			
			})
			$(".childrenspan").on("mouseout",function(){
				
				if($(this)[0].className.indexOf("chooseCss")>-1){
				
				}else{
					 $(this).css("color","white");
					 var front=$($(this)[0].previousSibling)[0].src.split('.png')[0];
				$($(this)[0].previousSibling)[0].src=front.substring(0,front.length-2)+".png";
				}
				
			})
			 $(".childrenspan").on("click",function(){
				 
				 $(".childrenspan").css("color","white");
				  $($(".childrenspan")[0].parentNode).css("background","#34393d")
				   $($(".childrenspan")[1].parentNode).css("background","#34393d")
				    $($(".childrenspan")[2].parentNode).css("background","#34393d")
				 $($(".childrenspan")[0].previousSibling)[0].src="img/ico/box01.png";
				 $($(".childrenspan")[1].previousSibling)[0].src="img/ico/knife01.png";
				 $($(".childrenspan")[2].previousSibling)[0].src="img/ico/tail01.png";
				 $($(".childrenspan")[3].previousSibling)[0].src="img/ico/tool.png";
				 $($(".childrenspan")[4].previousSibling)[0].src="img/ico/apron.png";
				 $($(".childrenspan")[5].previousSibling)[0].src="img/ico/case.png";
				 $($(".childrenspan")[6].previousSibling)[0].src="img/ico/shield.png";
				 $($(".childrenspan")[7].previousSibling)[0].src="img/ico/motor.png";
				 $(".childrenspan").removeClass("chooseCss")
				 $($(this)[0].previousSibling)[0].src=$($(this)[0].previousSibling)[0].src.split('.png')[0]+"_1"+".png";
				 
				 $(this).addClass("chooseCss");				 
				 $(this).css("color","#2EA6C8");
		    })
	
	//----------------------------------
	
	$("#roomxianshidiv").css("top",(innerHeight-600)/2);
	$("#roomxianshidiv").css("left",(innerWidth-800)/2);
	
});

//动态加载导航栏
function getNav(){
	$.ajax({
		type:"POST",
		url:"../NavigationBarController/seleNavigation.action",
		success:function(data){
			var dataL=data.length;
			var html=""
			var j=0
			for(var i=0;i<dataL;i++){
				//var imghtml='<img src="'+data[i].columnPicture+'"  />';
				var imghtml='';
				
				if(data[i].columnPicture.length>0){
					imghtml='<img src="'+data[i].columnPicture+'"  />';
				} 
				
				if(adminNum==1||adminNum==2){
					if(data[i].userrole!==2){
						if(data[i].columnLevel==1){
							if(j==0){
								html+='<li><a class="borderspan" onclick="showMenu(this,\''+data[i].id+'\')">'+imghtml+'<span >'+data[i].columnName+'</span></a>'+
										'<ul class="biheKaiguan" id="'+data[i].id+'" style="display:none">';
								j++;
							}else{
								html+='</ul>'+
									'</li>'+
									'<li><a class="borderspan" onclick="showMenu(this,\''+data[i].id+'\')">'+imghtml+'<span >'+data[i].columnName+'</span></a>'+
										'<ul class="biheKaiguan" id="'+data[i].id+'" style="display:none">';
							}
						}else if(data[i].columnLevel==2){
							html+='<li id="'+data[i].id+'"><a onclick="showUrl(\''+data[i].columnLink+'\',\''+data[i].columnName+'\')">'+imghtml+'<span class="childrenspan" >'+data[i].columnName+'</span></a></li>';
						}
					}
				}else if(adminNum==3){
					if(data[i].userrole!=1){
						if(data[i].columnLevel==1){
							if(j==0){
								html+='<li><a class="borderspan" onclick="showMenu(this,\''+data[i].id+'\')">'+imghtml+'<span >'+data[i].columnName+'</span></a>'+
										'<ul class="biheKaiguan" id="'+data[i].id+'" style="display:none">';
								j++;
							}else{
								html+='</ul>'+
									'</li>'+
									'<li><a class="borderspan" onclick="showMenu(this,\''+data[i].id+'\')">'+imghtml+'<span >'+data[i].columnName+'</span></a>'+
										'<ul class="biheKaiguan" id="'+data[i].id+'" style="display:none">';
							}
						}else if(data[i].columnLevel==2){
							html+='<li id="'+data[i].id+'"><a onclick="showUrl(\''+data[i].columnLink+'\',\''+data[i].columnName+'\')">'+imghtml+'<span class="childrenspan" >'+data[i].columnName+'</span></a></li>';
						}
					}else{
						continue;
					}
				}
			}
			html+='</ul>'+
				'</li>';
			$('.pageleftcontentul').html(html);
			
			$(".childrenspan").on("mouseover",function(){
				 $(this).css("color","#2EA6C8");
				if($(this)[0].className.indexOf("chooseCss")>-1){
				
				}else{
					
					$($(this)[0].previousSibling)[0].src=$($(this)[0].previousSibling)[0].src.split('.png')[0]+"_1"+".png";	
				 }
			
			})
			$(".childrenspan").on("mouseout",function(){
				if($(this)[0].className.indexOf("chooseCss")>-1){
				
				}else{
					 $(this).css("color","white");
					 var front=$($(this)[0].previousSibling)[0].src.split('.png')[0];
				$($(this)[0].previousSibling)[0].src=front.substring(0,front.length-2)+".png";
				}
				
			})
			 $(".childrenspan").on("click",function(){
				 $(".childrenspan").css("color","white");
				  $($(".childrenspan")[0].parentNode).css("background","#34393d");
				   $($(".childrenspan")[1].parentNode).css("background","#34393d");
				    $($(".childrenspan")[2].parentNode).css("background","#34393d");
				 $($(".childrenspan")[0].previousSibling)[0].src="img/ico/box01.png";
				 $($(".childrenspan")[1].previousSibling)[0].src="img/ico/knife01.png";
				 $($(".childrenspan")[2].previousSibling)[0].src="img/ico/tail01.png";
				 $(".childrenspan").removeClass("chooseCss")
				 $($(this)[0].previousSibling)[0].src=$($(this)[0].previousSibling)[0].src.split('.png')[0]+"_1"+".png";
				 $(this).addClass("chooseCss");				 
				 $(this).css("color","#2EA6C8");
		    })
			
		}
	})
}

//修改左侧随动的宽度
function ChangedetailHead(){
		 
		animateTime=0;
		animateTime2=0;
}

//右侧导航栏展开
function showMenu(object,id)
{
	$(".borderspan").css("background","#34393d")
	$(object).css("background","#E8950B")
	if($("#"+id)[0].style.display=="none"){
		$("#"+id).css("display","block");
	}else{
		$("#"+id).css("display","none");
	}
}

//load加载页面
function showUrl(url,content){
	$("#contentDiv").load(url);		
	$("#nowAddress")[0].innerText=content;
}

//正则表达式解析路径
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function updataCss(){
	try{
		$(".pagerightbottom").css("height",(innerHeight-78));
		$(".pageright").css("width",$("#ContentBody")[0].clientWidth-250);
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
	$("#Videodiv").hide();
	$("#roomxianshidiv,#roomzhaozi").hide();
	$("#roomxianshiwenjian").html('');
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
		url:"../NavigationBarController/getimgUrl.action?imgKey=schoolLogo1",
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
		url:"../NavigationBarController/getimgUrl.action?imgKey=schoolLogo2",
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


function showRoom(sence,auto)
{
	var agrs="";
	var customname="";
	switch(sence)
	{
		case "zz":
			if(auto=="zdc")
			{
				customname="主轴自动拆";
					
			}else if(auto=="zdz")
			{
				customname="主轴自动装";
					
			}else if(auto=="z")
			{
				customname="主轴手动拆";
					
			}else{
				customname="主轴手动装"
			}
				
			break;
		case "weijia":
			if(auto=="zdc")
			{
				customname="尾架自动拆";
					
			}else if(auto=="zdz")
			{
				customname="尾架自动装";
					
			}else if(auto=="z")
			{
				customname="尾架手动拆";
					
			}else{
				customname="尾架手动装"
			}
				
				
			break;
		case "daojia":
			if(auto=="zdc")
			{
				customname="刀架自动拆";
					
			}else if(auto=="zdz")
			{
				customname="刀架自动装";
					
			}else if(auto=="z")
			{
				customname="刀架手动拆";
					
			}else{
				customname="刀架手动装"
			}
				
			break;
	}
	$("#roomzhaozi").show();
	$("#roomxianshidiv").show();
	
	$("#roomzhaozi,#roomxianshidiv").show();
		
		GetRoomList(customname)
    NowRoomType=customname;
	
	 
		
}


function jionRoom(jionRoom,id){
	
	 
	
}

function GetRoomList(roomType){
	$("#roomxianshiwenjian").html("");
	$("#roomwenjianming").html("");
	$.ajax({
		url:pathURL+"simlaterooms/selectAll.action",
		type:"POST",
		data:{operationType:roomType},
		success:function(res){
			console.log(res)
			var xianshi='<div class="CreateRoom" onclick="CreateRooms(\'房间-'+roomType+'\',\''+roomType+'\')">创建房间</div><hr style="margin-bottom:0"/>'+
					'<div class="RoomList">'+
					'<div class="RoomListhead">房间列表</div>'+
						'<ul class="RoombuttonList">';
			
				for(var i=0;i<res.data.length;i++)
				{
					xianshi+='<li onclick="openRoom(\''+roomType+'\',\''+res.data[i].id+'\',2)"><img src="img/fanj.png"/><a>'+roomType+'</a></li>';
					
				}
					 
				xianshi+='</ul></div>';
				$("#roomxianshiwenjian").html(xianshi);
				$("#roomwenjianming").html(roomType);
		}
		
	});

	 
	}
function CreateRooms(roomName,roomType){
	if(createRoomlock==0){
		createRoomlock=1;
		$.ajax({
		url:pathURL+"simlaterooms/addRoom.action",
		type:"POST",
		data:{name:roomName,operationType:roomType,operationMode:"1"},
		success:function(res){
			 
			if(res.message=="OK")
			{	
				openRoom(roomType,res.data,1)	
				alert("创建成功");
				createRoomlock=0;
				GetRoomList(roomType);
			}
		}
		
		});
	}else{
		alert("创建中请稍后");
	}
	
}
//----------------------------------
function openRoom(roomType,id,type){
	$("#roomxianshidiv,#roomzhaozi").hide();
	$("#roomxianshiwenjian").html('');
	rtype=type;
	roomid=id;
	switch(roomType)
	{
		case "主轴自动拆":
			showUrl('content/fangzhen/zhuzhouzdc.php')
			break;
		case "主轴自动装":
			showUrl('content/fangzhen/zhuzhouzdz.php')
			break;
		case "主轴手动拆":
			showUrl('content/fangzhen/zhuzhouc.php')
			break;
		case "主轴手动装":
			showUrl('content/fangzhen/zhuzhouz.php')
			break;
		case "刀架自动拆":
			showUrl('content/fangzhen/daojiazdc.php')
			break;
		case "刀架自动装":
			showUrl('content/fangzhen/daojiazdz.php')
			break;
		case "刀架手动拆":
			showUrl('content/fangzhen/daojiac.php')
			break;
		case "刀架手动装":
			showUrl('content/fangzhen/daojiaz.php')
			break;
		case "尾架自动拆":
			showUrl('content/fangzhen/weijiazdc.php')
			break;
		case "尾架自动装":
			showUrl('content/fangzhen/weijiazdz.php')
			break;
		case "尾架手动拆":
			showUrl('content/fangzhen/weijiac.php')
			break;
		case "尾架手动装":
			showUrl('content/fangzhen/weijiaz.php')
			break;
			
	}
}
function openRoom2(roomType){
	$("#roomxianshidiv,#roomzhaozi").hide();
	$("#roomxianshiwenjian").html('');
	rtype = 1;
	switch(roomType){
		case "主轴自动拆":
			roomid='55e6daea-7bba-4a50-8bc3-af1a107f6550';
			showUrl('content/fangzhen/zhuzhouzdc.php')
			break;
		case "主轴自动装":
			roomid='a3f871f0-6f9f-4a8c-9777-b5860c1d41ea';
			showUrl('content/fangzhen/zhuzhouzdz.php')
			break;
		case "主轴手动拆":
			roomid='b74a6a76-6673-402c-a970-8fee373b28e1';
			showUrl('content/fangzhen/zhuzhouc.php')
			break;
		case "主轴手动装":
			roomid='b9e0ecaf-4f3f-4bf1-8004-5e70491e1622';
			showUrl('content/fangzhen/zhuzhouz.php')
			break;
		case "刀架自动拆":
			roomid='eb290f7f-22e5-4b56-84a0-1a3f038e1b5f';
			showUrl('content/fangzhen/daojiazdc.php')
			break;
		case "刀架自动装":
			roomid='c3cc7b15-591e-4a37-8202-810577dc5b75';
			showUrl('content/fangzhen/daojiazdz.php')
			break;
		case "刀架手动拆":
			roomid='d9b92888-c5cd-4e94-a6f9-52d6cc36a356';
			showUrl('content/fangzhen/daojiac.php')
			break;
		case "刀架手动装":
			roomid='848832ed-492d-49f9-94d0-10ed24e449ad';
			showUrl('content/fangzhen/daojiaz.php')
			break;
		case "尾架自动拆":
			roomid='80796bfb-fb55-4d12-9903-5398e7264fb3';
			showUrl('content/fangzhen/weijiazdc.php')
			break;
		case "尾架自动装":
			roomid='3c90e756-6635-4fcf-9ce1-98982c48efe3';
			showUrl('content/fangzhen/weijiazdz.php')
			break;
		case "尾架手动拆":
			roomid='5400127e-aa0f-4b4d-af53-3945a43f20e2';
			showUrl('content/fangzhen/weijiac.php')
			break;
		case "尾架手动装":
			roomid='a47efa07-a96c-48ce-aa3d-8c39e3e5357b';
			showUrl('content/fangzhen/weijiaz.php')
			break;
	}
}