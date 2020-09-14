//当前的页数
var pageNum=0;
/**
 * checkNum用于存放用户的选择
 * 上一页：checkNum=-1;
 * 下一页：checkNum= 1;
 */
var checkNum=1;

function tijiao(){
	var biaoti=$('#biaoti').val();
	var neirong=$('#neirong').val();
	if(biaoti==""){
		aler("请写标题");
		return;
	}
	if(neirong==""){
		alert("请写内容");
		return;
	}
	$.ajax({
		type:"POST",
		url:"../InformessagesController/insMessage.action?title="+biaoti+"&content="+neirong,
		success:function(data){
			if(data=="ture"){
				alert("留言添加成功");
				$('#biaoti').val("");
				$('#neirong').val("");
				return;
			}else if(data=="err"){
				alert("留言失败，请联系管理员");
				return;
			}
		}
	})
}

$(function(){
	if(adminNum==1||adminNum==2){
		$('#stuMessage')[0].style.display="none";
		$('#adminMessage')[0].style.display="block";
		getStuMessage();
	};
})



//选择上一页
function changeUp(){
	checkNum=-1;
	getStuMessage();
}

//选择下一页
function changedown(){
	checkNum=1;
	getStuMessage();
}

function getStuMessage(){
	$.ajax({
		type:"POST",
		url:"../InformessagesController/selStuMessage.action?checkNum="+checkNum+"&pageNum="+pageNum,
		async:false,
		success:function(data){
			if(data){
				var dataL=data.length;
				var html='<div style="margin-top: 50px;overflow-y: auto;">'
				for(var i=0;i<dataL;i++){
					html+='<div style="width: 600px;height: 50px;margin: 0 auto;margin-top: 20px;border: 1px solid black;">'+
							'<div style="width:100%;height: 100%;font-size: 22px;font-weight: 200;">'+data[i].title+'</div>'+
							'<button style="width: 70px;height: 21px;margin-top: -35px;float: right;" onclick="teaSee(\''+data[i].id+'\')" >查看详情</button>'+
						  '</div>'
				}
				pageNum+=1;
				if(pageNum===1){
					html+='<div style="width: 600px;height: 30px;margin: 0 auto;margin-top: 5px;">'+
							'<div style="width: 120px;height: 30px;float: right;">'+
								'<a onclick="changedown()">下一页</a>'+
							'</div>'+
						  '</div>';
				}else{
					html+='<div style="width: 600px;height: 30px;margin: 0 auto;margin-top: 0px;">'+
							'<div style="width: 120px;height: 30px;float: right;">'+
								'<a onclick="changeUp()">上一页</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><a onclick="changedown()">下一页</a>'+
							'</div>'+
						  '</div>';
				}
				html+='</div>';
				$('#adminMessage').html(html);
			}else if(data==""){
				alert("没有留言了");
			}
		}
	})
}

function teaSee(messageId){
	$.ajax({
		type:"POST",
		url:"../InformessagesController/seltheMessage.action?messageId="+messageId,
		async:false,
		success:function(data){
			$("#zhaozi,#xianshidiv").show()
			$("#xianshiwenjian").load('content/seeMessage.php',function(){
				$('#seebiaoti').val(data.title);
				$('#seeneirong').val(data.content);
				$('#messageId').val(data.id);
				$('#userKey').val(data.userKey);
			});
			$("#xianshiwenjian").css("height",$("#xianshidiv")[0].clientHeight-32);
			$("#xianshiwenjian").css("background","#FFFFFF");
			
		}
	})
}

function huifu(){
	var huifu=$('#teaHuifu').val();
	var messageId=$('#messageId').val();
	var userKey=$('#userKey').val();
	$.ajax({
		type:"POST",
		url:"../InformessagesController/inTeaReply.action?huifu="+huifu+"&messageId="+messageId+"&userKey="+userKey,
		success:function(data){
			if(data=="ture"){
				alert("回复成功");
				tuichu();
				getStuMessage();
			}
		}
	})
}

