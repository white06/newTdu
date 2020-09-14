$(function(){
	selContent();
})

function selContent(){
	$.ajax({
		type:"POST",
		url:"../InformessagesController/selAllInf.action",
		success:function(data){
			if(data){
			var html='';
			var dataL=data.length;
			for(var i=0;i<dataL;i++){
				html+='<div style="width: 800px;margin: 0 auto;">'+
				'<div class="title" style="height: 25px;font-size: 20px;font-weight: bold;">'+data[i].title+'</div>'+
				'<div class="content" style="width:800px;height:62px;overflow : hidden;-webkit-line-clamp:3;text-overflow:ellipsis;display: -webkit-box;-webkit-box-orient: vertical;">'+data[i].content+'</div>'+
				'</div>'
			}
			$('#getXinXi2').html(html);
		  }
		}
	})
}