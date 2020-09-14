var GongGaoArray=[];

$(function(){
	if(adminNum==3){
		
	}else{
		var newButton=document.getElementById("newButton");
		newButton.style.display="block";
	}
	selContent();
})

function selContent(){
	var page = 1;
	var size = 5;
	$.ajax({
		type:"POST",
		url:"../InformessagesController/selSomeInf.action",
		data:{page:page,size:size},
		success:function(res){
			if(res){
			var html='';
			var dataL=res.data.data.length;
			for(var i=0;i<dataL;i++){
				GongGaoArray[i]=res.data.data[i].content;
				 
				html+='<div class="GonggaoDiv page'+(parseInt(i*1/5)+1)+'"    onclick="seeAll(\''+res.data.data[i].title+'\',\''+i+'\',\''+res.data.data[i].createDate+'\')">'+
					'<div class="title" style="height: 35px;font-size: 20px;font-weight: bold;float:left;clear:both;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">●&nbsp;&nbsp;'+res.data.data[i].title+'</div>'+
					'<div class="title" style="height: 35px;font-size: 20px;font-weight: bold;min-width:220px;float:right;color:gray">'+res.data.data[i].createDate.split('.')[0]+'</div>'+
					
				'</div>'
			}
			//html+='<a style="clear:both;margin-left:20px;margin-top:15px;display:block;" onclick="chakan()">查看更多</a>'
			 
			$('#getXinXi').html(html);
			$('.M-box').pagination({				 
				totalData:res.data.total,
				showData:5,
				jump:true,
				coping:true,
				homePage:'首页',
				endPage:'末页',
				prevContent:'上页',
				nextContent:'下页',
				callback:function(index){
					$(".GonggaoDiv").hide();
					//$(".page"+index.getCurrent()).show();
					
					$.ajax({
						type:"POST",
						url:"../InformessagesController/selSomeInf.action",
						data:{page:index.getCurrent(),size:5},
						success:function(res){
							if(res){
							var html2='';
							var dataL=res.data.data.length;
							for(var i=0;i<dataL;i++){
								GongGaoArray[i]=res.data.data[i].content;
								 
								html2+='<div class="GonggaoDiv page'+(parseInt(i*1/5)+1)+'"   onclick="seeAll(\''+res.data.data[i].title+'\',\''+i+'\',\''+res.data.data[i].createDate+'\')">'+
									'<div class="title" style="height: 35px;font-size: 20px;font-weight: bold;float:left;clear:both;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">●&nbsp;&nbsp;'+res.data.data[i].title+'</div>'+
									'<div class="title" style="height: 35px;font-size: 20px;font-weight: bold;min-width:220px;float:right;color:gray">'+res.data.data[i].createDate.split('.')[0]+'</div>'+
									
								'</div>'
							}
							console.log(html2)
							$('#getXinXi').html(html2);
					}}});
					
				}
			});		
			 
			
		  }
		}
	})
}

function newXinxi(){
	$('#win').panel('open').panel('setTitle','添加公告');
	setXinxiHtml()
}

function tijiao(){
	var newtitle=$('#newtitle').val();
	var newcontent=$('#newcontent').val();
	$.ajax({
		type:"POST",
		url:"../InformessagesController/insInfor.action?title="+encodeURI(encodeURI(newtitle))+'&content='+encodeURI(encodeURI(newcontent)),
		success:function(data){
			if(data=="ture"){
				$('#win').panel('close');
				selContent();
			}
		}
	})
}

function chakan(){
	$("#zhaozi,#xianshidiv").show()
	$("#xianshiwenjian").load('content/xinxi2.php');
	$("#xianshiwenjian").css("height",$("#xianshidiv")[0].clientHeight-32);
	$("#xianshiwenjian").css("background","#FFFFFF");
}

function seeAll(title,i,date){
	$("#zhaozi,#xianshidiv").show();
	$("#xianshiwenjian").html('<div style="width:100%;height:80px;font-size:28px;font-weight:600;text-align:center;">'+title+'</div><div style="width:84%;margin-left:8%;font-size:20px;text-indent:10px;">'+GongGaoArray[i]+'</div><div style=width:80%;font-weight:600;margin-top:15px;text-align:right;font-size:20px;">'+date.split('.')[0]+'</div>');
	$("#wenjianming").html(title);
	$("#xianshiwenjian").css("height",$("#xianshidiv")[0].clientHeight-32);
	$("#xianshiwenjian").css("background","#FFFFFF");
}

function setXinxiHtml(){
	var html='<div style="width:680px;margin:0 auto;">'+
		'<div style="font-size:18px;width:100px;float:left;margin-top:15px;"><span>请输入标题:</span></div>'+
		'<div style="float:left;width:560px;margin-top:15px;"><input id="newtitle" style="width: 560px;height:25px;" onkeyup="inspect(\'newtitle\')"></div>'+
		'<div style="font-size:18px;width:100px;float:left;clear:both;margin-top:15px;"><span>请输入内容:</span></div>'+
		'<div style="float:left;width:560px;margin-top:15px;"><textarea id="newcontent" style="resize: none; width:560px;height:250px;" rows="" cols="" onkeyup="inspect(\'newcontent\')"></textarea></div>'+
		'<div style="clear:both;float:left;margin-left:100px;width:150px;margin-top:15px;"><button style="width:120px;height:30px" class="customsubmitbutton" id="" onclick="tijiao()">发布公告</button></div>'+
	'</div>';
	$('#win').html(html);
}