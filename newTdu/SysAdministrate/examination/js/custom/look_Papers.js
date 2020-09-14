var pageId=ChooseSubject;
var stuid=imgURL;
$(function(){
	
	$('li.option label').click(function() {
		debugger;
		var examId = $(this).closest('.test_content_nr_main').closest('li').attr('id'); // 得到题目ID
		var cardLi = $('a[href=#' + examId + ']'); // 根据题目ID找到对应答题卡
		// 设置已答题
		if(!cardLi.hasClass('hasBeenAnswer')) {
			cardLi.addClass('hasBeenAnswer');
		}
	});
	
	assemble_Pager();
})


//组装试卷
function assemble_Pager(){
	var id=pageId;
	$.ajax({
		type:"POST",
		url:"../../../KaoshiController/timu.action?id="+id,
		async:false,
		success:function(data){
			data=eval('('+data+')');
			var dataL=data.length;
			
			var danxuanHtml="";
			var duoxuanHtml="";
			var tiankongHtml="";
			var panduanHtml="";
			var wendaHtml="";
			
			var danxuanHerf="";
			var duoxuanHerf="";
			var tiankongHerf="";
			var panduanHerf="";
			var wendaHerf="";
			
			for(var i=0;i<dataL;i++){
				if(data[i].type=="单选题"){
					var neirongL=data[i].neirong.length;
					var j=0;
					var danxuanfenshu=0;
					var html="";
					var herf="";
					for(;j<neirongL;j++){
						danxuanfenshu+=data[i].neirong[j].questionScore;
						var timu=danxuanXml(data[i].neirong[j].questionContent);
						html +='<div id="'+data[i].neirong[j].questionKey+'">'+
							'<li id="qu_'+i+'_'+j+'">'+
						'<div class="test_content_nr_tt">'+
							'<i>'+(j+1)+'</i><span>('+data[i].neirong[j].questionScore+'分)</span><font>'+timu[0]+'</font><b class="icon iconfont">&#xe881;</b>'+
						'</div>'+
						'<div class="test_content_nr_main">'+
							'<ul>'+								
								'<li class="option">'+									
									'<input type="radio" class="radioOrCheck" name="'+i+'_answer'+j+'"'+
										'id="'+i+'_answer_'+j+'_option_1" value="A"/>'+
										'<label for="'+i+'_answer_'+j+'_option_1">'+
											'A.'+
											'<p class="ue" style="display: inline;">'+timu[1]+'</p>'+
										'</label>'+
								'</li>'+							
								'<li class="option">'+						
									'<input type="radio" class="radioOrCheck" name="'+i+'_answer'+j+'"'+
										'id="'+i+'_answer_'+j+'_option_2" value="B"/>'+									
										'<label for="'+i+'_answer_'+j+'_option_2">'+
											'B.'+
											'<p class="ue" style="display: inline;">'+timu[2]+'</p>'+
										'</label>'+
								'</li>'+												
								'<li class="option">'+
									'<input type="radio" class="radioOrCheck" name="'+i+'_answer'+j+'"'+
										'id="'+i+'_answer_'+j+'_option_3" value="C"/>'+
										'<label for="'+i+'_answer_'+j+'_option_3">'+
											'C.'+
											'<p class="ue" style="display: inline;">'+timu[3]+'</p>'+
										'</label>'+
								'</li>'+			
								'<li class="option">'+					
									'<input type="radio" class="radioOrCheck" name="'+i+'_answer'+j+'"'+
										'id="'+i+'_answer_'+j+'_option_4" value="D"/>'+
										'<label for="'+i+'_answer_'+j+'_option_4">'+
											'D.'+
											'<p class="ue" style="display: inline;">'+timu[4]+'</p>'+
										'</label>'+
								'</li>'+					
							'</ul>'+
						'</div>'+
					'</li>'+
					'</div>';
					herf+='<li>'+
						'<a href="#qu_'+i+'_'+j+'">'+(j+1)+'</a>'+
						'</li>';
					}
				var head='<div class="test_content">'+
					'<div class="test_content_title">'+
						'<h2>单选题</h2>'+
						'<p>'+
							'<span>共</span><i class="content_lit">'+j+'</i><span>题，</span><span>合计</span><i class="content_fs">'+danxuanfenshu+'</i><span>分</span>'+
						'</p>'+
					'</div>'+
				'</div>';
				danxuanHerf='<div class="rt_content">'+
							'<div class="rt_content_tt">'+
								'<h2>单选题</h2>'+
								'<p>'+
								'<span>共</span><i class="content_lit">'+j+'</i><span>题</span>'+
								'</p>'+
							'</div>'+
						'<div class="rt_content_nr answerSheet">'+herf+'</div>';
				danxuanHtml=head+html;
				}else if(data[i].type=="多选题"){
					var neirongL=data[i].neirong.length;
					var j=0;
					var duoxuanfenshu=0;
					var html="";
					var herf="";
					for(;j<neirongL;j++){
						duoxuanfenshu+=data[i].neirong[j].questionScore;
						var timu=duoxuanXml(data[i].neirong[j].questionContent);
						var timuL=timu.length;
						var xuanxiang=""
						var num=["A","B","C","D","E","F"];
						for(var x=1;x<timuL;x++){
							xuanxiang+='<li class="option">'+									
							'<input type="checkbox" class="radioOrCheck" name="'+i+'_answer'+j+'"'+
								'id="'+i+'_answer_'+j+'_option_'+x+'" value="'+num[x-1]+'"/>'+
								'<label for="'+i+'_answer_'+j+'_option_'+x+'">'+
									''+num[x-1]+'.'+
									'<p class="ue" style="display: inline;">'+timu[x]+'</p>'+
								'</label>'+
							'</li>';
						}
						html +='<div id="'+data[i].neirong[j].questionKey+'">'+
									'<li id="qu_'+i+'_'+j+'">'+
										'<div class="test_content_nr_tt">'+
											'<i>'+(j+1)+'</i><span>('+data[i].neirong[j].questionScore+'分)</span><font>'+timu[0]+'</font><b class="icon iconfont">&#xe881;</b>'+
										'</div>'+
										'<div class="test_content_nr_main">'+
											'<ul>'+xuanxiang+'</ul>'+
										'</div>'+
									'</li>'+
								'</div>';
						herf+='<li>'+
								'<a href="#qu_'+i+'_'+j+'">'+(j+1)+'</a>'+
							  '</li>';
					}
					var head='<div class="test_content">'+
					'<div class="test_content_title">'+
						'<h2>多选题</h2>'+
						'<p>'+
							'<span>共</span><i class="content_lit">'+j+'</i><span>题，</span><span>合计</span><i class="content_fs">'+duoxuanfenshu+'</i><span>分</span>'+
						'</p>'+
					'</div>'+
					'</div>';
					duoxuanHerf='<div class="rt_content">'+
							'<div class="rt_content_tt">'+
								'<h2>多选题</h2>'+
								'<p>'+
								'<span>共</span><i class="content_lit">'+j+'</i><span>题</span>'+
								'</p>'+
							'</div>'+
						'<div class="rt_content_nr answerSheet">'+herf+'</div>';
					duoxuanHtml=head+html;
				}else if(data[i].type=="填空题"){
					var neirongL=data[i].neirong.length;
					var j=0;
					var tiankongfenshu=0;
					var html="";
					var herf="";
					for(;j<neirongL;j++){
						tiankongfenshu+=data[i].neirong[j].questionScore;
						var input='<input type="text" class="tiankong" name="'+i+'_blanks_'+j+'" ">'
						var timu=tiankongXml(data[i].neirong[j].questionContent);
						timu=timu.replace(/______/g,input);
						html+='<div id="'+data[i].neirong[j].questionKey+'">'+
								'<li id="qu_'+i+'_'+j+'">'+
								'<div class="test_content_nr_tt">'+
									'<i>'+(j+1)+'</i><span>('+data[i].neirong[j].questionScore+'分)</span><font>'+timu+'</font><b class="icon iconfont">&#xe881;</b>'+
								'</div>'+
								'</li>'+
							  '</div>';
						
						herf+='<li>'+
								'<a href="#qu_'+i+'_'+j+'">'+(j+1)+'</a>'+
							'</li>';
					}
					var head='<div class="test_content">'+
					'<div class="test_content_title">'+
						'<h2>填空题</h2>'+
						'<p>'+
							'<span>共</span><i class="content_lit">'+j+'</i><span>题，</span><span>合计</span><i class="content_fs">'+tiankongfenshu+'</i><span>分</span>'+
						'</p>'+
					'</div>'+
					'</div>';
					tiankongHerf='<div class="rt_content">'+
							'<div class="rt_content_tt">'+
								'<h2>填空题</h2>'+
								'<p>'+
								'<span>共</span><i class="content_lit">'+j+'</i><span>题</span>'+
								'</p>'+
							'</div>'+
						'<div class="rt_content_nr answerSheet">'+herf+'</div>';
					tiankongHtml=head+html;
				}else if(data[i].type=="判断题"){
					var neirongL=data[i].neirong.length;
					var j=0;
					var panduanfenshu=0;
					var html="";
					var herf="";
					for(;j<neirongL;j++){
						panduanfenshu+=data[i].neirong[j].questionScore;
						var timu=tiankongXml(data[i].neirong[j].questionContent);
						html +='<div id="'+data[i].neirong[j].questionKey+'">'+
							'<li id="qu_'+i+'_'+j+'">'+
						'<div class="test_content_nr_tt">'+
							'<i>'+(j+1)+'</i><span>('+data[i].neirong[j].questionScore+'分)</span><font>'+timu+'</font><b class="icon iconfont">&#xe881;</b>'+
						'</div>'+
						'<div class="test_content_nr_main">'+
							'<ul>'+								
								'<li class="option">'+									
									'<input type="radio" class="radioOrCheck" name="'+i+'_answer'+j+'"'+
										'id="'+i+'_answer_'+j+'_option_1" value="A"/>'+
										'<label for="'+i+'_answer_'+j+'_option_1">'+
											'是.'+
										'</label>'+
								'</li>'+							
								'<li class="option">'+						
									'<input type="radio" class="radioOrCheck" name="'+i+'_answer'+j+'"'+
										'id="'+i+'_answer_'+j+'_option_2" value="B"/>'+									
										'<label for="'+i+'_answer_'+j+'_option_2">'+
											'否.'+
										'</label>'+
								'</li>'+
							'</ul>'+
						'</div>'+
					'</li>'+
					'</div>';
					herf+='<li>'+
						'<a href="#qu_'+i+'_'+j+'">'+(j+1)+'</a>'+
						'</li>';
					}
				var head='<div class="test_content">'+
					'<div class="test_content_title">'+
						'<h2>判断题</h2>'+
						'<p>'+
							'<span>共</span><i class="content_lit">'+j+'</i><span>题，</span><span>合计</span><i class="content_fs">'+panduanfenshu+'</i><span>分</span>'+
						'</p>'+
					'</div>'+
					'</div>';
				panduanHerf='<div class="rt_content">'+
					'<div class="rt_content_tt">'+
						'<h2>判断题</h2>'+
						'<p>'+
						'<span>共</span><i class="content_lit">'+j+'</i><span>题</span>'+
						'</p>'+
						'</div>'+
					'<div class="rt_content_nr answerSheet">'+herf+'</div>';
				panduanHtml=head+html;
				}else if(data[i].type=="问答题"){
					
				}
			}
			$('#timu').html(danxuanHtml+duoxuanHtml+tiankongHtml+panduanHtml);
			$('.rt_nr1').html(danxuanHerf+duoxuanHerf+tiankongHerf+panduanHerf);
			if(adminNum==3){
				stu_getAnswer();
			}else{
				tea_getAnswer();
			}
			
		}
	})
}

//等到组装完试卷，把答案加上去
function stu_getAnswer(){
	$.ajax({
		type:"POST",
		url:"../../../KaoshiController/seleAnswer.action?pageId="+pageId,
		async:false,
		success:function(data){
			if(data){
				var dataL=data.length;
				for(var i=0;i<dataL;i++){
					if(data[i].questionAnswer=="A"||data[i].questionAnswer=="B"||data[i].questionAnswer=="C"||data[i].questionAnswer=="D"){
						$('#'+data[i].questionKey+'').find("input[value="+data[i].questionAnswer+"]").attr("checked",true);
					}else{
						var answerChar=data[i].questionAnswer.split("______");
						var charL=answerChar.length;
						for(var j=0;j<charL;j++){
							console.log(answerChar[j]);
							if(answerChar[j]=="A"||answerChar[j]=="B"||answerChar[j]=="C"||answerChar[j]=="D"||answerChar[j]=="E"||answerChar[j]=="F"){
								$('#'+data[i].questionKey+'').find("input[value="+answerChar[j]+"]").attr("checked",true);
							}else{
								$('#'+data[i].questionKey+' input:nth-child('+ (j+1) +')').val(answerChar[j]);
							}
						}
					}
				}
				$('#Transparent_thin_film')[0].style.display="block";
			}
		}
	})
}

//教师查看时得到成绩并解析
function tea_getAnswer(){
	$.ajax({
		type:"POST",
		url:"../../../KaoshiController/seleTeaAnswer.action?pageId="+pageId+"&stuId="+stuid,
		async:false,
		success:function(data){
			if(data){
				var dataL=data.length;
				for(var i=0;i<dataL;i++){
					if(data[i].questionAnswer=="A"||data[i].questionAnswer=="B"||data[i].questionAnswer=="C"||data[i].questionAnswer=="D"){
						$('#'+data[i].questionKey+'').find("input[value="+data[i].questionAnswer+"]").attr("checked",true);
					}else{
						var answerChar=data[i].questionAnswer.split("______");
						var charL=answerChar.length;
						for(var j=0;j<charL;j++){
							if(answerChar[j]=="A"||answerChar[j]=="B"||answerChar[j]=="C"||answerChar[j]=="D"||answerChar[j]=="E"||answerChar[j]=="F"){
								$('#'+data[i].questionKey+'').find("input[value="+answerChar[j]+"]").attr("checked",true);
							}else{
								$('#'+data[i].questionKey+' input:nth-child('+ (j+1) +')').val(answerChar[j]);
							}
						}
					}
				}
				$('#Transparent_thin_film')[0].style.display="block";
			}
		}
	})
}

//单选题的xml解析
function danxuanXml(content){
	var xml=new DOMParser().parseFromString(content,"text/xml");
	var tigan_wenzi = xml.getElementsByTagName("题干")[0].children[0].innerHTML;
	var xuanxiang1_wenzi = xml.getElementsByTagName("选项1")[0].children[1].innerHTML;
	var xuanxiang2_wenzi = xml.getElementsByTagName("选项2")[0].children[1].innerHTML;
	var xuanxiang3_wenzi = xml.getElementsByTagName("选项3")[0].children[1].innerHTML;
	var xuanxiang4_wenzi = xml.getElementsByTagName("选项4")[0].children[1].innerHTML;
	var timu=[];
	timu.push(tigan_wenzi);
	timu.push(xuanxiang1_wenzi);
	timu.push(xuanxiang2_wenzi);
	timu.push(xuanxiang3_wenzi);
	timu.push(xuanxiang4_wenzi);
	return timu;
}

//多选题的xml解析
function duoxuanXml(content){
	var timu=[];
	var xml=new DOMParser().parseFromString(content,"text/xml");
	var tigan_wenzi = xml.getElementsByTagName("题干")[0].children[0].innerHTML;
	var xuanxiang1_wenzi = xml.getElementsByTagName("选项1")[0].children[1].innerHTML;
	var xuanxiang2_wenzi = xml.getElementsByTagName("选项2")[0].children[1].innerHTML;
	var xuanxiang3_wenzi = xml.getElementsByTagName("选项3")[0].children[1].innerHTML;
	var xuanxiang4_wenzi = xml.getElementsByTagName("选项4")[0].children[1].innerHTML;
	var xuanxiang5_wenzi = xml.getElementsByTagName("选项5")[0].children[1].innerHTML;
	var xuanxiang6_wenzi = xml.getElementsByTagName("选项6")[0].children[1].innerHTML;
	timu.push(tigan_wenzi);
	timu.push(xuanxiang1_wenzi);
	timu.push(xuanxiang2_wenzi);
	timu.push(xuanxiang3_wenzi);
	timu.push(xuanxiang4_wenzi);
	if(xuanxiang5_wenzi!=""){
		timu.push(xuanxiang5_wenzi);
	}
	if(xuanxiang6_wenzi!=""){
		timu.push(xuanxiang6_wenzi);
	}
	return timu;
}

//填空题、判断题的xml解析
function tiankongXml(content){
	var timu="";
	var xml=new DOMParser().parseFromString(content,"text/xml");
	var tigan_wenzi = xml.getElementsByTagName("题干")[0].children[0].innerHTML;
	timu=tigan_wenzi;
	return timu;
}

