var pageId = ChooseSubject;
var pathUrl = "../";
var stuid ;

//交卷按钮事件
var key = 0;
$(function() {

	$('li.option label').click(function() {
		var examId = $(this).closest('.test_content_nr_main').closest('li').attr('id'); // 得到题目ID
		var cardLi = $('a[href=#' + examId + ']'); // 根据题目ID找到对应答题卡
		console.log(cardLi);
		// 设置已答题
		if(!cardLi.hasClass('hasBeenAnswer')) {
			cardLi.addClass('hasBeenAnswer');
		}
	});

	var id = pageId;
	$.ajax({
		type: "POST",
		url: "../KaoshiController/Newtimu.action?id=" + id,
		success: function(data) {
			//data=eval('('+data+')');
			var dataL = data.length;

			var danxuanHtml = "";
			var duoxuanHtml = "";
			var tiankongHtml = "";
			var panduanHtml = "";
			var wendaHtml = "";
			var fangzhenHtml = "";

			var EndAllHtml = "";
			var danxuanHerf = "";
			var duoxuanHerf = "";
			var tiankongHerf = "";
			var panduanHerf = "";
			var wendaHerf = "";
			var herf = "";
			if(dataL > 0) {

			}
			for(var i = 0; i < dataL; i++) {
				if(data[i].questionType == "单选题") {

					var j = 0;
					var danxuanfenshu = data[i].score;
					var html = "";
					html += '<li id="qu_' + i + '_' + i + '">' +
						'<div class="test_content_nr_tt">' +
						'<i>' + (i + 1) + '</i><font>' + data[i].questionStem + '</font><b class="icon iconfont">&#xe881;</b>' +
						'</div>' +
						'<div id=\"' + data[i].id + '\" class="test_content_nr_main">' +
						'<ul>';
					if(data[i].optionA != null && data[i].optionA.length != 0) {
						var optionA = '<li class="option">' +
							'<input type="radio" class="radioOrCheck" name="' + i + '_answer' + i + '"' +
							'id="' + i + '_answer_' + i + '_option_1"' +
							'onchange="danpanChange(this.value,\'' + data[i].id + '\')" value="A"/>' +
							'<label for="' + i + '_answer_' + i + '_option_1">' +
							'A.' +
							'<p class="ue" style="display: inline;">' + data[i].optionA + '</p>' +
							'</label>' +
							'</li>';
						html += optionA;
					}
					if(data[i].optionB != null && data[i].optionB.length != 0) {
						var optionB = '<li class="option">' +
							'<input type="radio" class="radioOrCheck" name="' + i + '_answer' + j + '"' +
							'id="' + i + '_answer_' + i + '_option_2"' + data[i].id + '\')" value="B"/>' +
							'<label for="' + i + '_answer_' + i + '_option_2">' +
							'B.' +
							'<p class="ue" style="display: inline;">' + data[i].optionB + '</p>' +
							'</label>' +
							'</li>';
						html += optionB;
					}
					if(data[i].optionC != null && data[i].optionC.length != 0) {
						var optionC = '<li class="option">' +
							'<input type="radio" class="radioOrCheck" name="' + i + '_answer' + j + '"' +
							'id="' + i + '_answer_' + i + '_option_3"' +
							'onchange="danpanChange(this.value,\'' + data[i].id + '\')" value="C"/>' +
							'<label for="' + i + '_answer_' + i + '_option_3">' +
							'C.' +
							'<p class="ue" style="display: inline;">' + data[i].optionC + '</p>' +
							'</label>' +
							'</li>';
						html += optionC;
					}
					if(data[i].optionD != null && data[i].optionD.length != 0) {
						var optionD = '<li class="option">' +
							'<input type="radio" class="radioOrCheck" name="' + i + '_answer' + j + '"' +
							'id="' + i + '_answer_' + i + '_option_4"' +
							'onchange="danpanChange(this.value,\'' + data[i].id + '\')" value="D"/>' +
							'<label for="' + i + '_answer_' + i + '_option_4">' +
							'D.' +
							'<p class="ue" style="display: inline;">' + data[i].optionD + '</p>' +
							'</label>' +
							'</li>';

						html += optionD;
					}
					if(data[i].optionE != null && data[i].optionE.length != 0) {
						var optionE = '<li class="option">' +
							'<input type="radio" class="radioOrCheck" name="' + i + '_answer' + j + '"' +
							'id="' + i + '_answer_' + i + '_option_5"' +
							'onchange="danpanChange(this.value,\'' + data[i].id + '\')" value="E"/>' +
							'<label for="' + i + '_answer_' + i + '_option_5">' +
							'E.' +
							'<p class="ue" style="display: inline;">' + data[i].optionE + '</p>' +
							'</label>' +
							'</li>';

						html += optionE;
					}
					if(data[i].optionF != null && data[i].optionF.length != 0) {
						var optionF = '<li class="option">' +
							'<input type="radio" class="radioOrCheck" name="' + i + '_answer' + j + '"' +
							'id="' + i + '_answer_' + i + '_option_6"' +
							'onchange="danpanChange(this.value,\'' + data[i].id + '\')" value="F"/>' +
							'<label for="' + i + '_answer_' + i + '_option_6">' +
							'F.' +
							'<p class="ue" style="display: inline;">' + data[i].optionF + '</p>' +
							'</label>' +
							'</li>';

						html += optionF;
					}
					if(data[i].optionG != null && data[i].optionG.length != 0) {
						var optionG = '<li class="option">' +
							'<input type="radio" class="radioOrCheck" name="' + i + '_answer' + j + '"' +
							'id="' + i + '_answer_' + i + '_option_7"' +
							'onchange="danpanChange(this.value,\'' + data[i].id + '\')" value="G"/>' +
							'<label for="' + i + '_answer_' + i + '_option_7">' +
							'G.' +
							'<p class="ue" style="display: inline;">' + data[i].optionG + '</p>' +
							'</label>' +
							'</li>';

						html += optionG;
					}
					if(data[i].optionH != null && data[i].optionH.length != 0) {
						var optionH = '<li class="option">' +
							'<input type="radio" class="radioOrCheck" name="' + i + '_answer' + j + '"' +
							'id="' + i + '_answer_' + i + '_option_8"' +
							'onchange="danpanChange(this.value,\'' + data[i].id + '\')" value="H"/>' +
							'<label for="' + i + '_answer_' + i + '_option_8">' +
							'H.' +
							'<p class="ue" style="display: inline;">' + data[i].optionH + '</p>' +
							'</label>' +
							'</li>';

						html += optionH;
					}

					html += '</ul>' +
						'</div>' +
						'</li>';
					herf += '<li>' +
						'<a href="#qu_' + i + '_' + i + '">' + (i + 1) + '</a>' +
						'</li>';

					var head = '<div class="test_content">' +
						'<div class="test_content_title">' +
						'<h2>单选题</h2>' +
						'<p>' +
						'<span>第</span><i class="content_lit">' + (i + 1) + '</i><span>题，</span><i class="content_fs">' + danxuanfenshu + '</i><span>分</span>' +
						'</p>' +
						'</div>' +
						'</div>';

					danxuanHtml = head + html;
					EndAllHtml += danxuanHtml;
				} else if(data[i].questionType == "多选题") {

					var duoxuanfenshu = data[i].score;
					var html = "";
					var xuanxiang = ""
					if(data[i].optionA != null && data[i].optionA.length != 0) {
						xuanxiang += '<li class="option">' +
							'<input type="checkbox" class="radioOrCheck" name="' + i + '_answer' + i + '"' +
							'id="' + i + '_answer_' + i + '_option_1"' +
							'onchange="duoxuanChange(this.name,\'' + data[i].id + '\')" value="A"/>' +
							'<label for="' + i + '_answer_' + i + '_option_1">' +
							'A.' +
							'<p class="ue" style="display: inline;">' + data[i].optionA + '</p>' +
							'</label>' +
							'</li>';
					}
					if(data[i].optionB != null && data[i].optionB.length != 0) {
						xuanxiang += '<li class="option">' +
							'<input type="checkbox" class="radioOrCheck" name="' + i + '_answer' + i + '"' +
							'id="' + i + '_answer_' + i + '_option_2"' +
							'onchange="duoxuanChange(this.name,\'' + data[i].id + '\')" value="B"/>' +
							'<label for="' + i + '_answer_' + i + '_option_2">' +
							'B' +
							'<p class="ue" style="display: inline;">' + data[i].optionB + '</p>' +
							'</label>' +
							'</li>';
					}
					if(data[i].optionC != null && data[i].optionC.length != 0) {
						xuanxiang += '<li class="option">' +
							'<input type="checkbox" class="radioOrCheck" name="' + i + '_answer' + i + '"' +
							'id="' + i + '_answer_' + i + '_option_3"' +
							'onchange="duoxuanChange(this.name,\'' + data[i].id + '\')" value="C"/>' +
							'<label for="' + i + '_answer_' + i + '_option_3">' +
							'C' +
							'<p class="ue" style="display: inline;">' + data[i].optionC + '</p>' +
							'</label>' +
							'</li>';
					}
					if(data[i].optionD != null && data[i].optionD.length != 0) {
						xuanxiang += '<li class="option">' +
							'<input type="checkbox" class="radioOrCheck" name="' + i + '_answer' + i + '"' +
							'id="' + i + '_answer_' + i + '_option_4"' +
							'onchange="duoxuanChange(this.name,\'' + data[i].id + '\')" value="D"/>' +
							'<label for="' + i + '_answer_' + i + '_option_4">' +
							'D.' +
							'<p class="ue" style="display: inline;">' + data[i].optionD + '</p>' +
							'</label>' +
							'</li>';
					}
					if(data[i].optionE != null && data[i].optionE.length != 0) {
						xuanxiang += '<li class="option">' +
							'<input type="checkbox" class="radioOrCheck" name="' + i + '_answer' + i + '"' +
							'id="' + i + '_answer_' + i + '_option_5"' +
							'onchange="duoxuanChange(this.name,\'' + data[i].id + '\')" value="E"/>' +
							'<label for="' + i + '_answer_' + i + '_option_5">' +
							'E.' +
							'<p class="ue" style="display: inline;">' + data[i].optionE + '</p>' +
							'</label>' +
							'</li>';
					}
					if(data[i].optionF != null && data[i].optionF.length != 0) {
						xuanxiang += '<li class="option">' +
							'<input type="checkbox" class="radioOrCheck" name="' + i + '_answer' + i + '"' +
							'id="' + i + '_answer_' + i + '_option_6"' +
							'onchange="duoxuanChange(this.name,\'' + data[i].id + '\')" value="F"/>' +
							'<label for="' + i + '_answer_' + i + '_option_6">' +
							'F.' +
							'<p class="ue" style="display: inline;">' + data[i].optionF + '</p>' +
							'</label>' +
							'</li>';
					}
					if(data[i].optionG != null && data[i].optionG.length != 0) {
						xuanxiang += '<li class="option">' +
							'<input type="checkbox" class="radioOrCheck" name="' + i + '_answer' + i + '"' +
							'id="' + i + '_answer_' + i + '_option_7"' +
							'onchange="duoxuanChange(this.name,\'' + data[i].id + '\')" value="G"/>' +
							'<label for="' + i + '_answer_' + i + '_option_7">' +
							'G.' +
							'<p class="ue" style="display: inline;">' + data[i].optionG + '</p>' +
							'</label>' +
							'</li>';
					}
					if(data[i].optionH != null && data[i].optionH.length != 0) {
						xuanxiang += '<li class="option">' +
							'<input type="checkbox" class="radioOrCheck" name="' + i + '_answer' + i + '"' +
							'id="' + i + '_answer_' + i + '_option_8"' +
							'onchange="duoxuanChange(this.name,\'' + data[i].id + '\')" value="H"/>' +
							'<label for="' + i + '_answer_' + i + '_option_8">' +
							'H.' +
							'<p class="ue" style="display: inline;">' + data[i].optionH + '</p>' +
							'</label>' +
							'</li>';
					}
					html += '<li id="qu_' + i + '_' + i + '">' +
						'<div class="test_content_nr_tt">' +
						'<i>' + (i + 1) + '</i><font>' + data[i].questionStem + '</font><b class="icon iconfont">&#xe881;</b>' +
						'</div>' +
						'<div id=\"' + data[i].id + '\" class="test_content_nr_main">' +
						'<ul>' + xuanxiang + '</ul>' +
						'</div>' +
						'</li>';
					herf += '<li>' +
						'<a href="#qu_' + i + '_' + i + '">' + (i + 1) + '</a>' +
						'</li>';

					var head = '<div class="test_content">' +
						'<div class="test_content_title">' +
						'<h2>多选题</h2>' +
						'<p>' +
						'<span>第</span><i class="content_lit">' + (i + 1) + '</i><span>题，</span><i class="content_fs">' + duoxuanfenshu + '</i><span>分</span>' +
						'</p>' +
						'</div>' +
						'</div>';

					duoxuanHtml = head + html;
					EndAllHtml += duoxuanHtml;
				} else if(data[i].questionType == "填空题") {

					var tiankongfenshu = data[i].score;
					var html = "";

					var input = '<input type="text" class="tiankong" name="' + i + '_blanks_' + i + '" onchange="tiankongChange(this.name,\'' + data[i].id + '\') ">';

					timu = data[i].questionStem.replace(/______/g, input);
					html += '<li id="qu_' + i + '_' + i + '">' +
						'<div id=\"' + data[i].id + '\" class="test_content_nr_tt">' +
						'<i>' + (i + 1) + '</i><font>' + timu + '</font><b class="icon iconfont">&#xe881;</b>' +
						'</div>' +
						'</li>';
					herf += '<li>' +
						'<a href="#qu_' + i + '_' + i + '">' + (i + 1) + '</a>' +
						'</li>';

					var head = '<div class="test_content">' +
						'<div class="test_content_title">' +
						'<h2>填空题</h2>' +
						'<p>' +
						'<span>第</span><i class="content_lit">' + (i * 1 + 1) + '</i><span>题，</span><i class="content_fs">' + tiankongfenshu + '</i><span>分</span>' +
						'</p>' +
						'</div>' +
						'</div>';
					tiankongHtml = head + html;
					EndAllHtml += tiankongHtml;
				} else if(data[i].questionType == "判断题") {
					var panduanfenshu = data[i].score;
					var html = "";
					html += '<li id="qu_' + i + '_' + i + '">' +
						'<div class="test_content_nr_tt">' +
						'<i>' + (i + 1) + '</i><font>' + data[i].questionStem + '</font><b class="icon iconfont">&#xe881;</b>' +
						'</div>' +
						'<div id=\"' + data[i].id + '\" class="test_content_nr_main">' +
						'<ul>' +
						'<li class="option">' +
						'<input type="radio" class="radioOrCheck" name="' + i + '_answer' + i + '"' +
						'id="' + i + '_answer_' + i + '_option_1"' +
						'onchange="danpanChange(this.value,\'' + data[i].id + '\')" value="A"/>' +
						'<label for="' + i + '_answer_' + i + '_option_1">' +
						'正确.' +
						'</label>' +
						'</li>' +
						'<li class="option">' +
						'<input type="radio" class="radioOrCheck" name="' + i + '_answer' + i + '"' +
						'id="' + i + '_answer_' + i + '_option_2"' +
						'onchange="danpanChange(this.value,\'' + data[i].id + '\')" value="B"/>' +
						'<label for="' + i + '_answer_' + i + '_option_2">' +
						'错误.' +
						'</label>' +
						'</li>' +
						'</ul>' +
						'</div>' +
						'</li>';
					herf += '<li>' +
						'<a href="#qu_' + i + '_' + i + '">' + (i + 1) + '</a>' +
						'</li>';

					var head = '<div class="test_content">' +
						'<div class="test_content_title">' +
						'<h2>判断题</h2>' +
						'<p>' +
						'<span>第</span><i class="content_lit">' + (i + 1) + '</i><span>题，</span><span>合计</span><i class="content_fs">' + panduanfenshu + '</i><span>分</span>' +
						'</p>' +
						'</div>' +
						'</div>';

					panduanHtml = head + html;
					EndAllHtml += panduanHtml;
				} else if(data[i].questionType == "问答题") {
					var wendafenshu = data[i].score;
					var html = "";

					var input = '<input type="text" class="tiankong" name="' + i + '_blanks_' + i + '" onchange="tiankongChange(this.name,\'' + data[i].id + '\') ">';

					html += '<li id="qu_' + i + '_' + i + '">' +
						'<div class="test_content_nr_tt">' +
						'<i>' + (i + 1) + '</i><font>' + data[i].questionStem + '</font><b class="icon iconfont">&#xe881;</b>' +
						'</div>' +
						'<div class="test_content_nr_main">' +
						'<ul>' +
						'<li class="option">' +
						'<textarea id=\"' + data[i].id + '\" style="width:100%;resize:none;height:250px"  name="' + i + '_answer' + i + '"' +
						'id="' + i + '_answer_' + i + '_option_1"' +
						'onchange="danpanChange(this.value,\'' + data[i].id + '\')"></textarea>' +
						'</li>' +
						'</ul>' +
						'</div>' +
						'</li>';
					herf += '<li>' +
						'<a href="#qu_' + i + '_' + i + '">' + (i + 1) + '</a>' +
						'</li>';

					var head = '<div class="test_content">' +
						'<div class="test_content_title">' +
						'<h2>问答题</h2>' +
						'<p>' +
						'<span>第</span><i class="content_lit">' + (i * 1 + 1) + '</i><span>题，</span><i class="content_fs">' + wendafenshu + '</i><span>分</span>' +
						'</p>' +
						'</div>' +
						'</div>';
					wendaHtml = head + html;
					EndAllHtml += wendaHtml;
				} else if(data[i].questionType == "3D仿真实验题") {
					var fangzhenfenshu = data[i].score;
					var html = "";
					html += '<li id="qu_' + i + '_' + i + '">' +
						'<div class="test_content_nr_tt">' +
						'<i>' + (i + 1) + '</i><font>' + data[i].questionStem + '</font><b class="icon iconfont">&#xe881;</b>' +
						'</div>' +
						'<div id=\"' + data[i].id + '\" class="test_content_nr_main">' +
						'<ul>' +
						'<li class="option">' +
						'<a onclick="open3dIframe(\'' + data[i].optionA + '\',\'' + data[i].optionB + '\',\'' + data[i].optionC + '\')">开始仿真试题考试</a>' + //此处还需要打开仿真界面来考试
						'</li>' +
						'</ul>' +
						'</div>' +
						'</li>';
					herf += '<li>' +
						'<a href="#qu_' + i + '_' + i + '">' + (i + 1) + '</a>' +
						'</li>';

					var head = '<div class="test_content">' +
						'<div class="test_content_title">' +
						'<h2>3D仿真实验题</h2>' +
						'<p>' +
						'<span>第</span><i class="content_lit">' + (i * 1 + 1) + '</i><span>题，</span><i class="content_fs">' + fangzhenfenshu + '</i><span>分</span>' +
						'</p>' +
						'</div>' +
						'</div>';
					fangzhenHtml = head + html;
					EndAllHtml += fangzhenHtml;
				} else if(data[i].questionType == "综合题") {
					var zonghefenshu = data[i].score;
					var html = "";
					html += '<li id="qu_' + i + '_' + i + '">' +
						'<div class="test_content_nr_tt">' +
						'<i>' + (i + 1) + '</i><font>' + data[i].questionStem + '</font><b class="icon iconfont">&#xe881;</b>' +
						'</div>' +
						'<div class="test_content_nr_main">' +
						'<ul>';
					var qchild = data[i].answer.split(',');
					for(var qi = 0; qi < qchild.length; qi++) {
						$.ajax({
							url: '../KaoshiController/getchildrentimu.action',
							type: "POST",
							data: {
								id: qchild[qi]
							},
							async: false,
							success: function(res) {
								html += compreHtml(res, i);
								console.log(html)
							}
						});
					}
					html += '</ul>' +
						'</div>' +
						'</li>';
					herf += '<li>' +
						'<a href="#qu_' + i + '_' + i + '">' + (i + 1) + '</a>' +
						'</li>';

					var head = '<div class="test_content">' +
						'<div class="test_content_title">' +
						'<h2>综合题</h2>' +
						'<p>' +
						'<span>第</span><i class="content_lit">' + (i * 1 + 1) + '</i><span>题，</span><i class="content_fs">' + zonghefenshu + '</i><span>分</span>' +
						'</p>' +
						'</div>' +
						'</div>';
					fangzhenHtml = head + html;
					EndAllHtml += fangzhenHtml;
				}
				danxuanHerf = '<div class="rt_content">' +
					'<div class="rt_content_tt">' +
					'<h2>试题</h2>' +
					'<p>' +
					'<span>共</span><i class="content_lit">' + dataL + '</i><span>题</span>' +
					'</p>' +
					'</div>' +
					'<div class="rt_content_nr answerSheet">' + herf + '</div>';

			}
			EndAllHtml += '<div class="test_content"><div class="test_content_title"></div></div>';

			$.ajax({
				type: "Get",
				url: "../KaoshiController/getStartAndEndTime.action?pageId=" + pageId,
				success: function(data) {
					console.log(data);
					var startTime = data[0];
					var endTime = data[1];
					var nowTime = data[2];
					var startDate = dateTimeDispose(startTime);
					var endDate = dateTimeDispose(endTime);
					var nowDate = dateTimeDispose(nowTime);
					var difference = endDate - nowDate;
					var hours = Math.floor(difference / 1000 / 60 / 60);
					console.log(hours);
					var minutes = Math.ceil((difference - hours * 1000 * 60 * 60) / 1000 / 60);
					console.log(minutes);
					var time = hours + ":" + minutes;
					console.log(time);
					var headBotton = '<div class="test_title">' +
						'<p class="test_time">' +
						'<i class="icon iconfont">&#xe6fb;</i><b class="alt-1">' + time + '</b>' +
						'</p>' +
						'<font><input type="button" name="test_jiaojuan" value="交卷" onclick="jiaojuan()"></font>' +
						'</div>';
					$('#timu').html(headBotton + EndAllHtml);
					var herf = '<div class="rt_nr1_title">' +
						'<h1 style="margin-top:0px;line-height:3">' +
						'<i class="icon iconfont">&#xe692;</i>答题卡' +
						'</h1>' +
						'<p class="test_time">' +
						'<i class="icon iconfont">&#xe6fb;</i><b class="alt-1">' + time + '</b>' +
						'</p>' +
						'</div>';
					$('.rt_nr1').html(herf + danxuanHerf);
					getstuId(function(stuid){
						restoreTest(pageId,stuid);
						getTimeout();
						seeTime();	
					});
					
				}
			})
		}
	})

})
//日期对象转换为毫秒数
function dateDisposeMsec(date) {
	var msec = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
	return msec;
}
//日期字符串转换为日期对象
function dateTimeDispose(dateStr) {
	var time = dateStr.split(" ");
	var time1 = time[0].split("-");
	var time2 = time[1].split(":");
	var d = new Date();
	d.setFullYear(time1[0], time1[1], time1[2]);
	d.setHours(time2[0], time2[1], time2[2]);
	return d;
}
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
		url: "../KaoshiController/answerDispose.action",
		data: {
			quesId: quesId,
			pageId: pageId,
			value: value
		},
		dataType: "json",
		success: function(data) {
			if(data == "ture") {
				//console.log("成功一次");
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
		url: "../KaoshiController/answerDispose.action",
		data: {
			quesId: quesId,
			pageId: pageId,
			value: daan
		},
		dataType: "json",
		success: function(data) {
			if(data == "ture") {
				//console.log("成功一次");
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
		url: "../KaoshiController/answerDispose.action",
		data: {
			quesId: quesId,
			pageId: pageId,
			value: daan
		},
		dataType: "json",
		success: function(data) {
			if(data == "ture") {
				//console.log("成功一次");
			}
		}
	})
}

function compreHtml(data, nownum) {
	var danxuanHtml = "";
	var duoxuanHtml = "";
	var tiankongHtml = "";
	var panduanHtml = "";
	var wendaHtml = "";
	var fangzhenHtml = "";
	var EndAllHtml = "";
	for(var i = 0; i < data.length; i++) {
		if(data[i].questionType == "单选题") {

			var j = 0;
			var danxuanfenshu = data[i].score;
			var html = "";
			html += '<li id="qu_' + nownum + "" + i + '_' + i + '">' +
				'<div class="test_content_nr_tt">' +
				'<i>' + (i + 1) + '</i><font>' + data[i].questionStem + '</font><b class="icon iconfont">&#xe881;</b>' +
				'</div>' +
				'<div id=\"' + data[i].id + '\" class="test_content_nr_main">' +
				'<ul>';
			if(data[i].optionA != null && data[i].optionA.length != 0) {
				var optionA = '<li class="option">' +
					'<input type="radio" class="radioOrCheck" name="' + nownum + "" + i + '_answer' + i + '"' +
					'id="' + nownum + "" + i + '_answer_' + i + '_option_1"' +
					'onchange="danpanChange(this.value,\'' + data[i].id + '\')" value="A"/>' +
					'<label for="' + nownum + "" + i + '_answer_' + i + '_option_1">' +
					'A.' +
					'<p class="ue" style="display: inline;">' + data[i].optionA + '</p>' +
					'</label>' +
					'</li>';
				html += optionA;
			}
			if(data[i].optionB != null && data[i].optionB.length != 0) {
				var optionB = '<li class="option">' +
					'<input type="radio" class="radioOrCheck" name="' + nownum + "" + i + '_answer' + j + '"' +
					'id="' + nownum + "" + i + '_answer_' + i + '_option_2"' + data[i].id + '\')" value="B"/>' +
					'<label for="' + nownum + "" + i + '_answer_' + i + '_option_2">' +
					'B.' +
					'<p class="ue" style="display: inline;">' + data[i].optionB + '</p>' +
					'</label>' +
					'</li>';
				html += optionB;
			}
			if(data[i].optionC != null && data[i].optionC.length != 0) {
				var optionC = '<li class="option">' +
					'<input type="radio" class="radioOrCheck" name="' + nownum + "" + i + '_answer' + j + '"' +
					'id="' + nownum + "" + i + '_answer_' + i + '_option_3"' +
					'onchange="danpanChange(this.value,\'' + data[i].id + '\')" value="C"/>' +
					'<label for="' + nownum + "" + i + '_answer_' + i + '_option_3">' +
					'C.' +
					'<p class="ue" style="display: inline;">' + data[i].optionC + '</p>' +
					'</label>' +
					'</li>';
				html += optionC;
			}
			if(data[i].optionD != null && data[i].optionD.length != 0) {
				var optionD = '<li class="option">' +
					'<input type="radio" class="radioOrCheck" name="' + nownum + "" + i + '_answer' + j + '"' +
					'id="' + nownum + "" + i + '_answer_' + i + '_option_4"' +
					'onchange="danpanChange(this.value,\'' + data[i].id + '\')" value="D"/>' +
					'<label for="' + nownum + "" + i + '_answer_' + i + '_option_4">' +
					'D.' +
					'<p class="ue" style="display: inline;">' + data[i].optionD + '</p>' +
					'</label>' +
					'</li>';

				html += optionD;
			}
			if(data[i].optionE != null && data[i].optionE.length != 0) {
				var optionE = '<li class="option">' +
					'<input type="radio" class="radioOrCheck" name="' + nownum + "" + i + '_answer' + j + '"' +
					'id="' + nownum + "" + i + '_answer_' + i + '_option_5"' +
					'onchange="danpanChange(this.value,\'' + data[i].id + '\')" value="D"/>' +
					'<label for="' + nownum + "" + i + '_answer_' + i + '_option_5">' +
					'E.' +
					'<p class="ue" style="display: inline;">' + data[i].optionE + '</p>' +
					'</label>' +
					'</li>';

				html += optionE;
			}
			if(data[i].optionF != null && data[i].optionF.length != 0) {
				var optionF = '<li class="option">' +
					'<input type="radio" class="radioOrCheck" name="' + nownum + "" + i + '_answer' + j + '"' +
					'id="' + nownum + "" + i + '_answer_' + i + '_option_6"' +
					'onchange="danpanChange(this.value,\'' + data[i].id + '\')" value="D"/>' +
					'<label for="' + nownum + "" + i + '_answer_' + i + '_option_6">' +
					'F.' +
					'<p class="ue" style="display: inline;">' + data[i].optionF + '</p>' +
					'</label>' +
					'</li>';

				html += optionF;
			}
			if(data[i].optionG != null && data[i].optionG.length != 0) {
				var optionG = '<li class="option">' +
					'<input type="radio" class="radioOrCheck" name="' + nownum + "" + i + '_answer' + j + '"' +
					'id="' + nownum + "" + i + '_answer_' + i + '_option_7"' +
					'onchange="danpanChange(this.value,\'' + data[i].id + '\')" value="D"/>' +
					'<label for="' + nownum + "" + i + '_answer_' + i + '_option_7">' +
					'G.' +
					'<p class="ue" style="display: inline;">' + data[i].optionG + '</p>' +
					'</label>' +
					'</li>';

				html += optionG;
			}
			if(data[i].optionH != null && data[i].optionH.length != 0) {
				var optionH = '<li class="option">' +
					'<input type="radio" class="radioOrCheck" name="' + nownum + "" + i + '_answer' + j + '"' +
					'id="' + nownum + "" + i + '_answer_' + i + '_option_8"' +
					'onchange="danpanChange(this.value,\'' + data[i].id + '\')" value="D"/>' +
					'<label for="' + nownum + "" + i + '_answer_' + i + '_option_8">' +
					'H.' +
					'<p class="ue" style="display: inline;">' + data[i].optionH + '</p>' +
					'</label>' +
					'</li>';

				html += optionH;
			}

			html += '</ul>' +
				'</div>' +
				'</li>';

			var head = '<div class="test_content">' +
				'<div class="test_content_title">' +
				'<h2>单选题</h2>' +
				'<p>' +
				'<span>第</span><i class="content_lit">' + (i + 1) + '</i><span>小题，</span><i class="content_fs">' + danxuanfenshu + '</i><span>分</span>' +
				'</p>' +
				'</div>' +
				'</div>';

			danxuanHtml = head + html;
			EndAllHtml += danxuanHtml;
		} else if(data[i].questionType == "多选题") {

			var duoxuanfenshu = data[i].score;
			var html = "";
			var xuanxiang = ""
			if(data[i].optionA != null && data[i].optionA.length != 0) {
				xuanxiang += '<li class="option">' +
					'<input type="checkbox" class="radioOrCheck" name="' + nownum + "" + i + '_answer' + i + '"' +
					'id="' + nownum + "" + i + '_answer_' + i + '_option_1"' +
					'onchange="duoxuanChange(this.name,\'' + data[i].id + '\')" value="A"/>' +
					'<label for="' + nownum + "" + i + '_answer_' + i + '_option_1">' +
					'A.' +
					'<p class="ue" style="display: inline;">' + data[i].optionA + '</p>' +
					'</label>' +
					'</li>';
			}
			if(data[i].optionB != null && data[i].optionB.length != 0) {
				xuanxiang += '<li class="option">' +
					'<input type="checkbox" class="radioOrCheck" name="' + nownum + "" + i + '_answer' + i + '"' +
					'id="' + nownum + "" + i + '_answer_' + i + '_option_2"' +
					'onchange="duoxuanChange(this.name,\'' + data[i].id + '\')" value="B"/>' +
					'<label for="' + nownum + "" + i + '_answer_' + i + '_option_2">' +
					'B' +
					'<p class="ue" style="display: inline;">' + data[i].optionB + '</p>' +
					'</label>' +
					'</li>';
			}
			if(data[i].optionC != null && data[i].optionC.length != 0) {
				xuanxiang += '<li class="option">' +
					'<input type="checkbox" class="radioOrCheck" name="' + nownum + "" + i + '_answer' + i + '"' +
					'id="' + nownum + "" + i + '_answer_' + i + '_option_3"' +
					'onchange="duoxuanChange(this.name,\'' + data[i].id + '\')" value="C"/>' +
					'<label for="' + nownum + "" + i + '_answer_' + i + '_option_3">' +
					'C' +
					'<p class="ue" style="display: inline;">' + data[i].optionC + '</p>' +
					'</label>' +
					'</li>';
			}
			if(data[i].optionD != null && data[i].optionD.length != 0) {
				xuanxiang += '<li class="option">' +
					'<input type="checkbox" class="radioOrCheck" name="' + nownum + "" + i + '_answer' + i + '"' +
					'id="' + nownum + "" + i + '_answer_' + i + '_option_4"' +
					'onchange="duoxuanChange(this.name,\'' + data[i].id + '\')" value="D"/>' +
					'<label for="' + nownum + "" + i + '_answer_' + i + '_option_4">' +
					'D.' +
					'<p class="ue" style="display: inline;">' + data[i].optionD + '</p>' +
					'</label>' +
					'</li>';
			}
			if(data[i].optionE != null && data[i].optionE.length != 0) {
				xuanxiang += '<li class="option">' +
					'<input type="checkbox" class="radioOrCheck" name="' + nownum + "" + i + '_answer' + i + '"' +
					'id="' + nownum + "" + i + '_answer_' + i + '_option_5"' +
					'onchange="duoxuanChange(this.name,\'' + data[i].id + '\')" value="E"/>' +
					'<label for="' + nownum + "" + i + '_answer_' + i + '_option_5">' +
					'E.' +
					'<p class="ue" style="display: inline;">' + data[i].optionE + '</p>' +
					'</label>' +
					'</li>';
			}
			if(data[i].optionF != null && data[i].optionF.length != 0) {
				xuanxiang += '<li class="option">' +
					'<input type="checkbox" class="radioOrCheck" name="' + nownum + "" + i + '_answer' + i + '"' +
					'id="' + nownum + "" + i + '_answer_' + i + '_option_6"' +
					'onchange="duoxuanChange(this.name,\'' + data[i].id + '\')" value="F"/>' +
					'<label for="' + nownum + "" + i + '_answer_' + i + '_option_6">' +
					'F.' +
					'<p class="ue" style="display: inline;">' + data[i].optionF + '</p>' +
					'</label>' +
					'</li>';
			}
			if(data[i].optionG != null && data[i].optionG.length != 0) {
				xuanxiang += '<li class="option">' +
					'<input type="checkbox" class="radioOrCheck" name="' + nownum + "" + i + '_answer' + i + '"' +
					'id="' + nownum + "" + i + '_answer_' + i + '_option_7"' +
					'onchange="duoxuanChange(this.name,\'' + data[i].id + '\')" value="G"/>' +
					'<label for="' + nownum + "" + i + '_answer_' + i + '_option_7">' +
					'G.' +
					'<p class="ue" style="display: inline;">' + data[i].optionG + '</p>' +
					'</label>' +
					'</li>';
			}
			if(data[i].optionH != null && data[i].optionH.length != 0) {
				xuanxiang += '<li class="option">' +
					'<input type="checkbox" class="radioOrCheck" name="' + nownum + "" + i + '_answer' + i + '"' +
					'id="' + nownum + "" + i + '_answer_' + i + '_option_8"' +
					'onchange="duoxuanChange(this.name,\'' + data[i].id + '\')" value="H"/>' +
					'<label for="' + nownum + "" + i + '_answer_' + i + '_option_8">' +
					'H.' +
					'<p class="ue" style="display: inline;">' + data[i].optionH + '</p>' +
					'</label>' +
					'</li>';
			}
			html += '<li id="qu_' + nownum + "" + i + '_' + i + '">' +
				'<div class="test_content_nr_tt">' +
				'<i>' + (i + 1) + '</i><font>' + data[i].questionStem + '</font><b class="icon iconfont">&#xe881;</b>' +
				'</div>' +
				'<div id=\"' + data[i].id + '\" class="test_content_nr_main">' +
				'<ul>' + xuanxiang + '</ul>' +
				'</div>' +
				'</li>';

			var head = '<div class="test_content">' +
				'<div class="test_content_title">' +
				'<h2>多选题</h2>' +
				'<p>' +
				'<span>第</span><i class="content_lit">' + (i + 1) + '</i><span>题，</span><i class="content_fs">' + duoxuanfenshu + '</i><span>分</span>' +
				'</p>' +
				'</div>' +
				'</div>';

			duoxuanHtml = head + html;
			EndAllHtml += duoxuanHtml;
		} else if(data[i].questionType == "填空题") {

			var tiankongfenshu = data[i].score;
			var html = "";

			var input = '<input type="text" class="tiankong" name="' + nownum + "" + i + '_blanks_' + i + '" onchange="tiankongChange(this.name,\'' + data[i].id + '\') ">';

			var timu = data[i].questionStem.replace(/______/g, input);
			html += '<li id="qu_' + nownum + "" + i + '_' + i + '">' +
				'<div id=\"' + data[i].id + '\" class="test_content_nr_tt">' +
				'<i>' + (i + 1) + '</i><font>' + timu + '</font><b class="icon iconfont">&#xe881;</b>' +
				'</div>' +
				'</li>';

			var head = '<div class="test_content">' +
				'<div class="test_content_title">' +
				'<h2>填空题</h2>' +
				'<p>' +
				'<span>第</span><i class="content_lit">' + (i * 1 + 1) + '</i><span>小题</span>' +
				'</p>' +
				'</div>' +
				'</div>';
			tiankongHtml = head + html;
			EndAllHtml += tiankongHtml;
		} else if(data[i].questionType == "判断题") {
			var panduanfenshu = data[i].score;
			var html = "";
			html += '<li id="qu_' + nownum + "" + i + '_' + i + '">' +
				'<div id=\"' + data[i].id + '\" class="test_content_nr_tt">' +
				'<i>' + (i + 1) + '</i><font>' + data[i].questionStem + '</font><b class="icon iconfont">&#xe881;</b>' +
				'</div>' +
				'<div class="test_content_nr_main">' +
				'<ul>' +
				'<li class="option">' +
				'<input type="radio" class="radioOrCheck" name="' + nownum + "" + i + '_answer' + i + '"' +
				'id="' + nownum + "" + i + '_answer_' + i + '_option_1"' +
				'onchange="danpanChange(this.value,\'' + data[i].id + '\')" value="A"/>' +
				'<label for="' + nownum + "" + i + '_answer_' + i + '_option_1">' +
				'正确.' +
				'</label>' +
				'</li>' +
				'<li class="option">' +
				'<input type="radio" class="radioOrCheck" name="' + nownum + "" + i + '_answer' + i + '"' +
				'id="' + nownum + "" + i + '_answer_' + i + '_option_2"' +
				'onchange="danpanChange(this.value,\'' + data[i].id + '\')" value="B"/>' +
				'<label for="' + nownum + "" + i + '_answer_' + i + '_option_2">' +
				'错误.' +
				'</label>' +
				'</li>' +
				'</ul>' +
				'</div>' +
				'</li>';

			var head = '<div class="test_content">' +
				'<div class="test_content_title">' +
				'<h2>判断题</h2>' +
				'<p>' +
				'<span>第</span><i class="content_lit">' + (i + 1) + '</i><span>题，</span><span>合计</span><i class="content_fs">' + panduanfenshu + '</i><span>分</span>' +
				'</p>' +
				'</div>' +
				'</div>';

			panduanHtml = head + html;
			EndAllHtml += panduanHtml;
		} else if(data[i].questionType == "问答题") {
			var wendafenshu = data[i].score;
			var html = "";

			var input = '<input type="text" class="tiankong" name="' + nownum + "" + i + '_blanks_' + i + '" onchange="tiankongChange(this.name,\'' + data[i].id + '\') ">';

			html += '<li id="qu_' + nownum + "" + i + '_' + i + '">' +
				'<div class="test_content_nr_tt">' +
				'<i>' + (i + 1) + '</i><font>' + data[i].questionStem + '</font><b class="icon iconfont">&#xe881;</b>' +
				'</div>' +
				'<div class="test_content_nr_main">' +
				'<ul>' +
				'<li class="option">' +
				'<textarea id=\"' + data[i].id + '\" style="width:100%;resize:none;height:250px"  name="' + nownum + "" + i + '_answer' + i + '"' +
				'id="' + nownum + "" + i + '_answer_' + i + '_option_1"' +
				'onchange="danpanChange(this.value,\'' + data[i].id + '\')"></textarea>' +
				'</li>' +
				'</ul>' +
				'</div>' +
				'</li>';

			var head = '<div class="test_content">' +
				'<div class="test_content_title">' +
				'<h2>问答题</h2>' +
				'<p>' +
				'<span>第</span><i class="content_lit">' + (i * 1 + 1) + '</i><span>题，</span><i class="content_fs">' + wendafenshu + '</i><span>分</span>' +
				'</p>' +
				'</div>' +
				'</div>';
			wendaHtml = head + html;
			EndAllHtml += wendaHtml;
		} else if(data[i].questionType == "3D仿真实验题") {
			var fangzhenfenshu = data[i].score;
			var html = "";
			html += '<li id="qu_' + nownum + "" + i + '_' + i + '">' +
				'<div class="test_content_nr_tt">' +
				'<i>' + (i + 1) + '</i><font>' + data[i].questionStem + '</font><b class="icon iconfont">&#xe881;</b>' +
				'</div>' +
				'<div id=\"' + data[i].id + '\" class="test_content_nr_main">' +
				'<ul>' +
				'<li class="option">' +
				'<a onclick="open3dIframe(\'' + data[i].optionA + '\',\'' + data[i].optionB + '\',\'' + data[i].optionC + '\')">开始仿真试题考试</a>' + //此处还需要打开仿真界面来考试
				'</li>' +
				'</ul>' +
				'</div>' +
				'</li>';

			var head = '<div class="test_content">' +
				'<div class="test_content_title">' +
				'<h2>3D仿真实验题</h2>' +
				'<p>' +
				'<span>第</span><i class="content_lit">' + (i * 1 + 1) + '</i><span>题，</span><i class="content_fs">' + fangzhenfenshu + '</i><span>分</span>' +
				'</p>' +
				'</div>' +
				'</div>';
			fangzhenHtml = head + html;
			EndAllHtml += fangzhenHtml;
		}
	}
	return EndAllHtml;
}

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

function open3dIframe(a, b, c) {
	$("#fangzhendiv").show();
	$("#framediv").append('<iframe style="width:100%;height:100%;" src="content/3dquestion.php?a=' + a + '&&b=' + b + '&&c=' + c + '"></iframe>');
}
/**
 * 获取学生作答答案
 * @param examId
 * @param userId
 * @returns
 */
function restoreTest(pageId,stuid){
	var returnResult;
	var url = pathUrl+"checkHomeWork/restoreTest.action?examId="+pageId+"&&userId="+stuid;
	$.ajax({
		url:url,
		async:true,
		success:function(result){
			placeAnswer(result);
		}
	});
}
/**
 * 根据题型还原试卷答案
 * @param ress
 * @returns
 */
function placeAnswer(ress) {
	console.log(ress);
	var data = ress.data;
	for(var i = 0; i < data.length; i++) {
		if(data[i].quesType == "单选题") {
			$("#" + data[i].questionKey + ' input[type=radio][value=' + data[i].questionAnswer + ']')[0].checked = true;
			$("#" + data[i].questionKey + "_score").val(data[i].quesScore);
		} else if(data[i].quesType == "多选题") {
			if(data[i]) {
				var ans = data[i].questionAnswer.split("______");
				for(var j = 0; j < ans.length; j++) {
					$("#" + data[i].questionKey + ' input[type=checkbox][value=' + ans[j] + ']')[0].checked = true;
				}
				$("#" + data[i].questionKey + "_score").val(data[i].quesScore);
			}
		} else if(data[i].quesType == "判断题") {
			$("#" + data[i].questionKey + ' input[type=radio][value=' + data[i].questionAnswer + ']')[0].checked = true;
			$("#" + data[i].questionKey + "_score").val(data[i].quesScore);
		} else if(data[i].quesType == "填空题") {
			if(data[i]) {
				var ans = data[i].questionAnswer.split("______");
				for(var j = 0; j < ans.length; j++) {
					$($("#" + data[i].questionKey + ' input[type=text]')[j]).val(ans[j]);
				}
				$("#" + data[i].questionKey + "_score").val(data[i].quesScore);
			}
		} else if(data[i].quesType == "问答题") {
			$("#" + data[i].questionKey).val(data[i].questionAnswer);
			$("#" + data[i].questionKey + "_score").val(data[i].quesScore);

		} else if(data[i].quesType == "3D仿真题") {

		}
	}
}
function getstuId(functionCallback){
	var url = pathUrl+"KaoshiController/getStuId.action";
	var data = {};
	$.ajax({
		type:"POST",
		async:true,
		url:url,
		success:function(result){
			var res = result.data;
			functionCallback(res);
			return res;
		}
	});
}