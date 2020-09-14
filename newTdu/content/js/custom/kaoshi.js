var pageId = ChooseSubject;

$(function() {

	$('li.option label').click(function() {
		debugger;
		var examId = $(this).closest('.test_content_nr_main').closest('li').attr('id'); // 得到题目ID
		var cardLi = $('a[href=#' + examId + ']'); // 根据题目ID找到对应答题卡
		// 设置已答题
		if(!cardLi.hasClass('hasBeenAnswer')) {
			cardLi.addClass('hasBeenAnswer');
		}
	});

	var id = pageId;
	console.log(id);
	$.ajax({
		type: "POST",
		url: "../KaoshiController/timu.action?id=" + id,
		success: function(data) {
			data = eval('(' + data + ')');
			var dataL = data.length;

			var danxuanHtml = "";
			var duoxuanHtml = "";
			var tiankongHtml = "";
			var panduanHtml = "";
			var wendaHtml = "";

			var danxuanHerf = "";
			var duoxuanHerf = "";
			var tiankongHerf = "";
			var panduanHerf = "";
			var wendaHerf = "";

			for(var i = 0; i < dataL; i++) {
				if(data[i].type == "单选题") {
					var neirongL = data[i].neirong.length;
					var j = 0;
					var danxuanfenshu = 0;
					var html = "";
					var herf = "";
					for(; j < neirongL; j++) {
						danxuanfenshu += data[i].neirong[j].questionScore;
						var timu = danxuanXml(data[i].neirong[j].questionContent);
						html += '<div id="'+data[i].neirong[j].questionKey+'">'+
						'<li id="qu_' + i + '_' + j + '">' +
							'<div class="test_content_nr_tt">' +
							'<i>' + (j + 1) + '</i><span>(' + data[i].neirong[j].questionScore + '分)</span><font>' + timu[0] + '</font><b class="icon iconfont">&#xe881;</b>' +
							'</div>' +
							'<div class="test_content_nr_main">' +
							'<ul>' +
							'<li class="option">' +
							'<input type="radio" class="radioOrCheck" name="' + i + '_answer' + j + '"' +
							'id="' + i + '_answer_' + j + '_option_1"' +
							'onchange="danpanChange(this.value,\'' + data[i].neirong[j].questionKey + '\')" value="A"/>' +
							'<label for="' + i + '_answer_' + j + '_option_1">' +
							'A.' +
							'<p class="ue" style="display: inline;">' + timu[1] + '</p>' +
							'</label>' +
							'</li>' +
							'<li class="option">' +
							'<input type="radio" class="radioOrCheck" name="' + i + '_answer' + j + '"' +
							'id="' + i + '_answer_' + j + '_option_2"' +
							'onchange="danpanChange(this.value,\'' + data[i].neirong[j].questionKey + '\')" value="B"/>' +
							'<label for="' + i + '_answer_' + j + '_option_2">' +
							'B.' +
							'<p class="ue" style="display: inline;">' + timu[2] + '</p>' +
							'</label>' +
							'</li>' +
							'<li class="option">' +
							'<input type="radio" class="radioOrCheck" name="' + i + '_answer' + j + '"' +
							'id="' + i + '_answer_' + j + '_option_3"' +
							'onchange="danpanChange(this.value,\'' + data[i].neirong[j].questionKey + '\')" value="C"/>' +
							'<label for="' + i + '_answer_' + j + '_option_3">' +
							'C.' +
							'<p class="ue" style="display: inline;">' + timu[3] + '</p>' +
							'</label>' +
							'</li>' +
							'<li class="option">' +
							'<input type="radio" class="radioOrCheck" name="' + i + '_answer' + j + '"' +
							'id="' + i + '_answer_' + j + '_option_4"' +
							'onchange="danpanChange(this.value,\'' + data[i].neirong[j].questionKey + '\')" value="D"/>' +
							'<label for="' + i + '_answer_' + j + '_option_4">' +
							'D.' +
							'<p class="ue" style="display: inline;">' + timu[4] + '</p>' +
							'</label>' +
							'</li>' +
							'</ul>' +
							'</div>' +
							'</li>'+
							'</div>';
						herf += '<li>' +
							'<a href="#qu_' + i + '_' + j + '">' + (j + 1) + '</a>' +
							'</li>';
					}
					var head = '<div class="test_content">' +
						'<div class="test_content_title">' +
						'<h2>单选题</h2>' +
						'<p>' +
						'<span>共</span><i class="content_lit">' + j + '</i><span>题，</span><span>合计</span><i class="content_fs">' + danxuanfenshu + '</i><span>分</span>' +
						'</p>' +
						'</div>' +
						'</div>';
					danxuanHerf = '<div class="rt_content">' +
						'<div class="rt_content_tt">' +
						'<h2>单选题</h2>' +
						'<p>' +
						'<span>共</span><i class="content_lit">' + j + '</i><span>题</span>' +
						'</p>' +
						'</div>' +
						'<div class="rt_content_nr answerSheet">' + herf + '</div>';
					danxuanHtml = head + html;
				} else if(data[i].type == "多选题") {
					var neirongL = data[i].neirong.length;
					var j = 0;
					var duoxuanfenshu = 0;
					var html = "";
					var herf = "";
					for(; j < neirongL; j++) {
						duoxuanfenshu += data[i].neirong[j].questionScore;
						var timu = duoxuanXml(data[i].neirong[j].questionContent);
						var timuL = timu.length;
						var xuanxiang = ""
						var num = ["A", "B", "C", "D", "E", "F"];
						for(var x = 1; x < timuL; x++) {
							xuanxiang += '<li class="option">' +
								'<input type="checkbox" class="radioOrCheck" name="' + i + '_answer' + j + '"' +
								'id="' + i + '_answer_' + j + '_option_' + x + '"' +
								'onchange="duoxuanChange(this.name,\'' + data[i].neirong[j].questionKey + '\')" value="' + num[x - 1] + '"/>' +
								'<label for="' + i + '_answer_' + j + '_option_' + x + '">' +
								'' + num[x - 1] + '.' +
								'<p class="ue" style="display: inline;">' + timu[x] + '</p>' +
								'</label>' +
								'</li>';
						}
						html += '<div id="'+data[i].neirong[j].questionKey+'">'+
							'<li id="qu_' + i + '_' + j + '">' +
							'<div class="test_content_nr_tt">' +
							'<i>' + (j + 1) + '</i><span>(' + data[i].neirong[j].questionScore + '分)</span><font>' + timu[0] + '</font><b class="icon iconfont">&#xe881;</b>' +
							'</div>' +
							'<div class="test_content_nr_main">' +
							'<ul>' + xuanxiang + '</ul>' +
							'</div>' +
							'</li>'+
							'</div>';
						herf += '<li>' +
							'<a href="#qu_' + i + '_' + j + '">' + (j + 1) + '</a>' +
							'</li>';
					}
					var head = '<div class="test_content">' +
						'<div class="test_content_title">' +
						'<h2>多选题</h2>' +
						'<p>' +
						'<span>共</span><i class="content_lit">' + j + '</i><span>题，</span><span>合计</span><i class="content_fs">' + duoxuanfenshu + '</i><span>分</span>' +
						'</p>' +
						'</div>' +
						'</div>';
					duoxuanHerf = '<div class="rt_content">' +
						'<div class="rt_content_tt">' +
						'<h2>多选题</h2>' +
						'<p>' +
						'<span>共</span><i class="content_lit">' + j + '</i><span>题</span>' +
						'</p>' +
						'</div>' +
						'<div class="rt_content_nr answerSheet">' + herf + '</div>';
					duoxuanHtml = head + html;
				} else if(data[i].type == "填空题") {
					var neirongL = data[i].neirong.length;
					var j = 0;
					var tiankongfenshu = 0;
					var html = "";
					var herf = "";
					for(; j < neirongL; j++) {
						tiankongfenshu += data[i].neirong[j].questionScore;
						var input = '<input type="text" class="tiankong" name="' + i + '_blanks_' + j + '" onchange="tiankongChange(this.name,\'' + data[i].neirong[j].questionKey + '\') ">'
						var timu = tiankongXml(data[i].neirong[j].questionContent);
						timu = timu.replace(/______/g, input);
						html += '<div id="'+data[i].neirong[j].questionKey+'">'+
							'<li id="qu_' + i + '_' + j + '">' +
							'<div class="test_content_nr_tt">' +
							'<i>' + (j + 1) + '</i><span>(' + data[i].neirong[j].questionScore + '分)</span><font>' + timu + '</font><b class="icon iconfont">&#xe881;</b>' +
							'</div>' +
							'</li>'+
							'</div>';
						herf += '<li>' +
							'<a href="#qu_' + i + '_' + j + '">' + (j + 1) + '</a>' +
							'</li>';
					}
					var head = '<div class="test_content">' +
						'<div class="test_content_title">' +
						'<h2>填空题</h2>' +
						'<p>' +
						'<span>共</span><i class="content_lit">' + j + '</i><span>题，</span><span>合计</span><i class="content_fs">' + tiankongfenshu + '</i><span>分</span>' +
						'</p>' +
						'</div>' +
						'</div>';
					tiankongHerf = '<div class="rt_content">' +
						'<div class="rt_content_tt">' +
						'<h2>填空题</h2>' +
						'<p>' +
						'<span>共</span><i class="content_lit">' + j + '</i><span>题</span>' +
						'</p>' +
						'</div>' +
						'<div class="rt_content_nr answerSheet">' + herf + '</div>';
					tiankongHtml = head + html;
				} else if(data[i].type == "判断题") {
					var neirongL = data[i].neirong.length;
					var j = 0;
					var panduanfenshu = 0;
					var html = "";
					var herf = "";
					for(; j < neirongL; j++) {
						panduanfenshu += data[i].neirong[j].questionScore;
						var timu = tiankongXml(data[i].neirong[j].questionContent);
						html += '<div id="'+data[i].neirong[j].questionKey+'">'+
							'<li id="qu_' + i + '_' + j + '">' +
							'<div class="test_content_nr_tt">' +
							'<i>' + (j + 1) + '</i><span>(' + data[i].neirong[j].questionScore + '分)</span><font>' + timu + '</font><b class="icon iconfont">&#xe881;</b>' +
							'</div>' +
							'<div class="test_content_nr_main">' +
							'<ul>' +
							'<li class="option">' +
							'<input type="radio" class="radioOrCheck" name="' + i + '_answer' + j + '"' +
							'id="' + i + '_answer_' + j + '_option_1"' +
							'onchange="danpanChange(this.value,\'' + data[i].neirong[j].questionKey + '\')" value="A"/>' +
							'<label for="' + i + '_answer_' + j + '_option_1">' +
							'是.' +
							'</label>' +
							'</li>' +
							'<li class="option">' +
							'<input type="radio" class="radioOrCheck" name="' + i + '_answer' + j + '"' +
							'id="' + i + '_answer_' + j + '_option_2"' +
							'onchange="danpanChange(this.value,\'' + data[i].neirong[j].questionKey + '\')" value="B"/>' +
							'<label for="' + i + '_answer_' + j + '_option_2">' +
							'否.' +
							'</label>' +
							'</li>' +
							'</ul>' +
							'</div>' +
							'</li>'+
							'</div>';
						herf += '<li>' +
							'<a href="#qu_' + i + '_' + j + '">' + (j + 1) + '</a>' +
							'</li>';
					}
					var head = '<div class="test_content">' +
						'<div class="test_content_title">' +
						'<h2>判断题</h2>' +
						'<p>' +
						'<span>共</span><i class="content_lit">' + j + '</i><span>题，</span><span>合计</span><i class="content_fs">' + panduanfenshu + '</i><span>分</span>' +
						'</p>' +
						'</div>' +
						'</div>';
					panduanHerf = '<div class="rt_content">' +
						'<div class="rt_content_tt">' +
						'<h2>判断题</h2>' +
						'<p>' +
						'<span>共</span><i class="content_lit">' + j + '</i><span>题</span>' +
						'</p>' +
						'</div>' +
						'<div class="rt_content_nr answerSheet">' + herf + '</div>';
					panduanHtml = head + html;
				} else if(data[i].type == "问答题") {
					console.log(data[i]);
					var neirongL = data[i].neirong.length;
					var j = 0;
					var wendafenshu = 0;
					var html = "";
					var herf = "";
					for(; j < neirongL; j++) {
						wendafenshu += data[i].neirong[j].questionScore;
						var timu = tiankongXml(data[i].neirong[j].questionContent);
						html += '<div id="'+data[i].neirong[j].questionKey+'">'+
							'<li id="qu_' + i + '_' + j + '">' +
							'<div class="test_content_nr_tt">' +
							'<i>' + (j + 1) + '</i><span>(' + data[i].neirong[j].questionScore + '分)</span><font>' + timu + '</font><b class="icon iconfont">&#xe881;</b>' +
							'</div>' +
							'<div class="test_content_nr_main">' +
							
							'</div>' +
							'</li>'+
							'</div>';
						herf += '<li>' +
							'<a href="#qu_' + i + '_' + j + '">' + (j + 1) + '</a>' +
							'</li>';
					}
					var head = '<div class="test_content">' +
						'<div class="test_content_title">' +
						'<h2>问答题</h2>' +
						'<p>' +
						'<span>共</span><i class="content_lit">' + j + '</i><span>题，</span><span>合计</span><i class="content_fs">' + wendafenshu + '</i><span>分</span>' +
						'</p>' +
						'</div>' +
						'</div>';
					wendaHerf = '<div class="rt_content">' +
						'<div class="rt_content_tt">' +
						'<h2>问答题</h2>' +
						'<p>' +
						'<span>共</span><i class="content_lit">' + j + '</i><span>题</span>' +
						'</p>' +
						'</div>' +
						'<div class="rt_content_nr answerSheet">' + herf + '</div>';
					wendaHtml = head + html;
				}
			}
			
			$.ajax({
				type: "POST",
				url: "../KaoshiController/getExamTime.action?examPage=" + id,
				success: function(data) {
					var xiaoshi = parseInt("00") + parseInt(parseInt(data) / 60);
					var fenzhong = parseInt("00") + parseInt(data) % 60;
					var shijian = "0" + xiaoshi + ":" + fenzhong;
					var headBotton = '<div class="test_title">' +
						'<p class="test_time">' +
						'<i class="icon iconfont">&#xe6fb;</i><b class="alt-1">' + shijian + '</b>' +
						'</p>' +
						'<font><input type="button" name="test_jiaojuan" value="交卷" onclick="jiaojuan()"></font>' +
						'</div>';
					$('#timu').html(headBotton + danxuanHtml + duoxuanHtml + tiankongHtml + panduanHtml);
					var herf = '<div class="rt_nr1_title">' +
						'<h1 style="margin-top:0px;line-height:3">' +
						'<i class="icon iconfont">&#xe692;</i>答题卡' +
						'</h1>' +
						'<p class="test_time">' +
						'<i class="icon iconfont">&#xe6fb;</i><b class="alt-1">' + shijian + '</b>' +
						'</p>' +
						'</div>';
					$('.rt_nr1').html(herf + danxuanHerf + duoxuanHerf + tiankongHerf + panduanHerf);
					getTimeout();
					seeTime();
				}
			});

			stu_getAnswer();

		}

	})

})

//定时器，检查所剩时间，如果时间结束，就自动交卷
function seeTime() {
	var thisTime = $('.alt-1')[1].innerText;
	var timeList = thisTime.split(":");
	if(timeList[0] == "00" && timeList[1] == "00" && timeList[2] == "00") {
		jiaojuan();
	} else {
		setTimeout(function() {
			seeTime();
		}, 1000);
	}
}

//绑定标签，让它调用插件的时间函数。
function getTimeout() {
	"use strict";

	$('time').countDown({
		with_separators: false
	});
	$('.alt-1').countDown({
		css_class: 'countdown-alt-1'
	});
	$('.alt-2').countDown({
		css_class: 'countdown-alt-2'
	});
}

//选择题、判断题的onchange事件，需要给当前选择的value和这个题目的id，不使用cententId
function danpanChange(value, quesId) {
	$.ajax({
		type: "POST",
		url: "../KaoshiController/daan.action",
		data: {
			quesId: quesId,
			pageId: pageId,
			value: value
		},
		dataType: "json",
		success: function(data) {
			if(data == "ture") {
				console.log("成功一次");
			}
		}
	})
}

//多选题的onchange事件，需要给当前选择的name，通过name得到check=true的所有值。还需要这个题目的id
function duoxuanChange(name, quesId) {
	var dxt = document.getElementsByName("" + name + "");
	var dxtL = dxt.length;
	var daan = "";
	var j = 0;
	for(var i = 0; i < dxtL; i++) {
		if(dxt[i].checked) {
			if(j === 0) {
				daan = dxt[i].value;
				++j;
			} else {
				daan += "______" + dxt[i].value;
				++j;
			}
		}
	}
	$.ajax({
		type: "POST",
		url: "../KaoshiController/daan.action",
		data: {
			quesId: quesId,
			pageId: pageId,
			value: daan
		},
		dataType: "json",
		success: function(data) {
			if(data == "ture") {
				console.log("成功一次");
			}
		}
	})
}

//填空题的onchange事件
function tiankongChange(name, quesId) {
	var dxt = document.getElementsByName("" + name + "");
	var dxtL = dxt.length;
	var daan = "";
	for(var i = 0; i < dxtL; i++) {
		if(i === 0) {
			daan = dxt[i].value;
		} else {
			daan += "______" + dxt[i].value;
		}
	}
	$.ajax({
		type: "POST",
		url: "../KaoshiController/daan.action",
		data: {
			quesId: quesId,
			pageId: pageId,
			value: daan
		},
		dataType: "json",
		success: function(data) {
			if(data == "ture") {
				console.log("成功一次");
			}
		}
	})
}

//单选题的xml解析
function danxuanXml(content) {
	var xml = new DOMParser().parseFromString(content, "text/xml");
	var tigan_wenzi = xml.getElementsByTagName("题干")[0].children[0].innerHTML;
	var xuanxiang1_wenzi = xml.getElementsByTagName("选项1")[0].children[1].innerHTML;
	var xuanxiang2_wenzi = xml.getElementsByTagName("选项2")[0].children[1].innerHTML;
	var xuanxiang3_wenzi = xml.getElementsByTagName("选项3")[0].children[1].innerHTML;
	var xuanxiang4_wenzi = xml.getElementsByTagName("选项4")[0].children[1].innerHTML;
	var timu = [];
	timu.push(tigan_wenzi);
	timu.push(xuanxiang1_wenzi);
	timu.push(xuanxiang2_wenzi);
	timu.push(xuanxiang3_wenzi);
	timu.push(xuanxiang4_wenzi);
	return timu;
}

//多选题的xml解析
function duoxuanXml(content) {
	var timu = [];
	var xml = new DOMParser().parseFromString(content, "text/xml");
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
	if(xuanxiang5_wenzi != "") {
		timu.push(xuanxiang5_wenzi);
	}
	if(xuanxiang6_wenzi != "") {
		timu.push(xuanxiang6_wenzi);
	}
	return timu;
}

//填空题、判断题的xml解析
function tiankongXml(content) {
	var timu = "";
	var xml = new DOMParser().parseFromString(content, "text/xml");
	var tigan_wenzi = xml.getElementsByTagName("题干")[0].children[0].innerHTML;
	timu = tigan_wenzi;
	return timu;
}

//交卷按钮事件
var key = 0;

function jiaojuan() {
	if(key == 0) {
		key = 1;
		$.ajax({
			type: "POST",
			url: "../KaoshiController/jiaojuan.action?pageId=" + pageId,
			success: function(data) {
				if(data == "ture") {
					alert("交卷成功");
					tuichu();
					$("#contentDiv").load('content/stuExam.php');
					return;
				}
			},
			error: function() {
				alert("网络错误！请检查并刷新")
				key = 0;
				return;
			}
		})
	}
}
//等到组装完试卷，把答案加上去
function stu_getAnswer() {
	$.ajax({
		type: "POST",
		url: "../KaoshiController/seleAnswer.action?pageId=" + pageId,
		async: false,
		success: function(data) {
			if(data) {
				var dataL = data.length;
				for(var i = 0; i < dataL; i++) {
					if(data[i].questionAnswer == "A" || data[i].questionAnswer == "B" || data[i].questionAnswer == "C" || data[i].questionAnswer == "D") {
						$('#' + data[i].questionKey + '').find("input[value=" + data[i].questionAnswer + "]").attr("checked", true);
					} else {
						var answerChar = data[i].questionAnswer.split("______");
						var charL = answerChar.length;
						for(var j = 0; j < charL; j++) {
							console.log(answerChar[j]);
							if(answerChar[j] == "A" || answerChar[j] == "B" || answerChar[j] == "C" || answerChar[j] == "D" || answerChar[j] == "E" || answerChar[j] == "F") {
								$('#' + data[i].questionKey + '').find("input[value=" + answerChar[j] + "]").attr("checked", true);
							} else {
								$('#' + data[i].questionKey + ' input:nth-child(' + (j + 1) + ')').val(answerChar[j]);
							}
						}
					}
				}
				$('#Transparent_thin_film')[0].style.display = "block";
			}
		}
	})
}