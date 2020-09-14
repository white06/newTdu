<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html style="height:100%;height:100%">
<head>
    <meta charset="UTF-8" />
    <title>题库</title>
    <link rel="stylesheet" href="../css/page.css" />
    <link rel="stylesheet" href="../css/tdkssty.css">
    <style type="text/css">
	*{
		font-family:'微软雅黑';
	}
        input.tk-insty {
            font-size: 1.25em;
            color: rgba(5, 25, 252, 1);
        }

        .fillit_que {
            word-break: break-all;
        }

        .dks-pdkey li {
            word-break: break-all;
			height:40px;
			font-size:18px;
			margin-top:15px;
        }

        .dks-textarea {
            margin-top: 10px;
        }

        .ques_body {
			padding-top:20px;
            width: 80%;
            height: auto; 
			margin-left:10%;
            
        }

        .error_ans {
            
            width: 100%;
            display: inline-block;
            /*text-align: center;*/
            background: #F6F6F5;
			padding: 20px;
            word-break: break-all;
        }
		.datika{
			background:#fff;
		}
		.datika:hover{
			cursor:pointer;
			background:red;
			color:white;
		}
		#shoucang,#next{
			text-decoration:none;
			border-radius:5px;
		}
		#shoucang:hover{
			background:#ff485E;
		}
		#next:hover{
			background:#ff485E;
		}
    </style>
    <script type="text/javascript" src="../js/jquery-1.10.2.js"></script>

    <script type="text/javascript" src="../js/PublicPoolName.js"></script>
</head>
<body style="overflow:hidden;width:100%;height:100%;">
   
    <!--试卷统计分数弹出框-->
    <div class="ptwindow_bg" id="sumscoremodal-shadow"></div>
    <div class="ptwindow_shadow" id="sumscoremodal">
        <div class="win_con ulib-r3">
            <div class="win_bg ulib-r3">
                <a href="javascript:;" onclick="$(window.parent.document).find('#randomexammodal,#randomexam-shadow').hide(); $(window.parent.document).find('#randomexam_iframe').prop({ src: '' }); " class="btn-close" id="closesumscore">x</a>
                <div class="massege-tt ulib-r3">统计分数</div>
                <div class="massege-tx" id="sumscoretext" style="text-align:center;font-size:1.5em;">

                </div>
            </div>
        </div>
    </div>
    <!--试卷统计分数弹出框结束-->
    <div style="width:60%;height:90%;float:left;padding:5px;margin-top:3px;border-right:2px solid #dfdfdf" >
        <div style="margin-top: 10px; width: 90%;height:40px;border-bottom:rgba(0,0,0,0.1) solid 3px;line-height:40px;margin-left:5%;">
            <div style="width:90%;margin-left:5%;font-size:16px;">
                <div style="width:40%;float:left;font-family:'微软雅黑'">
                    第&nbsp;<input id="current_index" value="1" type="text" disabled style="width: 20px; height: 14px; border: none; background-color: transparent" />题&nbsp;
					<span style="color:#10ABF5">(答对&nbsp;<input id="get_score" value="0" type="text" disabled style="color:#10ABF5;width: 20px; height: 14px;border:none;background-color:transparent" />题)</span>
                </div>               
                <div style="float:right;width:60%">
				<a id="next" style="width:90px;height:36px;display:block;color:#fff;background:#10ABF5;text-align:center;float:right;margin-right:15px;">下一题</a>
					<a id="shoucang" style="width:90px;height:36px;display:block;color:#fff;background:#10ABF5;text-align:center;float:right;margin-right:15px;"><img style="margin-top:-5px" src="../img/shouc.png"/>&nbsp;收藏</a>
                    
                </div>
            </div>
        </div>
        @{var num = 1;
        foreach (var item in Model)
        {
            var xml = XElement.Parse(item.Content);
            if (num == 1)
            {
                <div class="AllQuestion" id="@num" style="overflow-y:auto;max-height:500px;width:570px;overflow-x:hidden">
                    <input id="hideid" value="@item.Id" type="text" hidden />
                    <div style="width: 570px">
                        <div style="width:553px;">
                            @if (item.QuestionImg != null)
                            {
                                <img style="width:100%" src="@item.QuestionImg" />
                            }

                        </div>
                    </div>
                    @if (item.Type == "填空题")
                    {
                        <div class="ques_body" data-type="填空题">
                            <div class="fillit_que" style="font-size:18px;">@item.Title</div>
                        </div>
                    }
                    else if (item.Type == "单选题")
                    {
                        <div class="ques_body" data-type="单选题">
                            <div style="word-break:break-all;font-size:18px;">@item.Title</div>
                            <ul class="dks-pdkey clear" style="margin-top:10px;">
                                <li><label><input type="radio" value="A" name=@item.Id />A、@xml.Element("选项列表").Element("选项A").Value</label></li>
                                <li><label><input type="radio" value="B" name=@item.Id />B、@xml.Element("选项列表").Element("选项B").Value</label></li>
                                <li><label><input type="radio" value="C" name=@item.Id />C、@xml.Element("选项列表").Element("选项C").Value</label></li>
                                <li><label><input type="radio" value="D" name=@item.Id />D、@xml.Element("选项列表").Element("选项D").Value</label></li>
                                @if (xml.Element("选项列表").Element("选项E").Value.Length > 0)
                                {
                                    <li><label><input type="radio" value="E" name=@item.Id />E、@xml.Element("选项列表").Element("选项E").Value</label></li>
                                    if (xml.Element("选项列表").Element("选项F").Value.Length > 0)
                                    {
                                        <li><label><input type="radio" value="F" name=@item.Id />F、@xml.Element("选项列表").Element("选项F").Value</label></li>
                                    }
                                }
                            </ul>
                        </div>
                    }
                    else if (item.Type == "多选题")
                    {
                        <div class="ques_body" data-type="多选题">
                            <div style="word-break:break-all;font-size:18px;">@item.Title</div>
                            <ul class="dks-pdkey clear" style="margin-top:10px;">
                                <li><label><input type="checkbox" value="A" />A、@xml.Element("选项列表").Element("选项A").Value</label></li>
                                <li><label><input type="checkbox" value="B" />B、@xml.Element("选项列表").Element("选项B").Value</label></li>
                                <li><label><input type="checkbox" value="C" />C、@xml.Element("选项列表").Element("选项C").Value</label></li>
                                <li><label><input type="checkbox" value="D" />D、@xml.Element("选项列表").Element("选项D").Value</label></li>
                                @if (xml.Element("选项列表").Element("选项E").Value.Length > 0)
                                {
                                    <li><label><input type="checkbox" value="E" />E、@xml.Element("选项列表").Element("选项E").Value</label></li>
                                    if (xml.Element("选项列表").Element("选项F").Value.Length > 0)
                                    {
                                        <li><label><input type="checkbox" value="F" />F、@xml.Element("选项列表").Element("选项F").Value</label></li>
                                    }
                                }
                            </ul>
                        </div>
                    }
                    else if (item.Type == "判断题")
                    {
                        <div class="ques_body" data-type="判断题">
                            <div style="word-break:break-all;font-size:18px;">@item.Title</div>
                            <ul class="dks-pdkey clear" style="margin-top:10px;">
                                <li><label><input type="radio" name=@item.Id value="正确" />正确</label></li>
                                <li><label><input type="radio" name=@item.Id value="错误" />错误</label></li>
                            </ul>
                        </div>
                    }
                    else if (item.Type == "问答题")
                    {
                        <div class="ques_body" data-type="问答题">
                            <div style="word-break:break-all;font-size:18px;">@item.Title</div>
                            <textarea class="ulib-r3 dks-textarea"></textarea>
                        </div>
                    }

                </div>
            }
            else
            {
                <div class="AllQuestion" id="@num" style="overflow-y:auto;max-height:500px;width:570px;overflow-x:hidden" hidden>
                    <input id="hideid" value="@item.Id" type="text" hidden />
                    <div style="width: 570px">
                        <div style="width:553px;">
                            @if (item.QuestionImg != null)
                            {
                                <img style="width:100%" src="@item.QuestionImg" />
                            }
                        </div>
                    </div>
                    @if (item.Type == "填空题")
                    {
                        <div class="ques_body" data-type="填空题">
                            <div class="fillit_que" style="font-size:18px;">@item.Title</div>
                        </div>
                    }
                    else if (item.Type == "单选题")
                    {
                        <div class="ques_body" data-type="单选题">
                            <div style="word-break:break-all;font-size:18px;">@item.Title</div>
                            <ul class="dks-pdkey clear" style="margin-top:10px;">
                                <li><label><input type="radio" value="A" name=@item.Id />A、@xml.Element("选项列表").Element("选项A").Value</label></li>
                                <li><label><input type="radio" value="B" name=@item.Id />B、@xml.Element("选项列表").Element("选项B").Value</label></li>
                                <li><label><input type="radio" value="C" name=@item.Id />C、@xml.Element("选项列表").Element("选项C").Value</label></li>
                                <li><label><input type="radio" value="D" name=@item.Id />D、@xml.Element("选项列表").Element("选项D").Value</label></li>
                                @if (xml.Element("选项列表").Element("选项E").Value.Length > 0)
                                {
                                    <li><label><input type="radio" value="E" name=@item.Id />E、@xml.Element("选项列表").Element("选项E").Value</label></li>
                                    if (xml.Element("选项列表").Element("选项F").Value.Length > 0)
                                    {
                                        <li><label><input type="radio" value="F" name=@item.Id />F、@xml.Element("选项列表").Element("选项F").Value</label></li>
                                    }
                                }
                            </ul>
                        </div>
                    }
                    else if (item.Type == "多选题")
                    {
                        <div class="ques_body" data-type="多选题">
                            <div style="word-break:break-all;font-size:18px;">@item.Title</div>
                            <ul class="dks-pdkey clear" style="margin-top:10px;">
                                <li><label><input type="checkbox" value="A" />A、@xml.Element("选项列表").Element("选项A").Value</label></li>
                                <li><label><input type="checkbox" value="B" />B、@xml.Element("选项列表").Element("选项B").Value</label></li>
                                <li><label><input type="checkbox" value="C" />C、@xml.Element("选项列表").Element("选项C").Value</label></li>
                                <li><label><input type="checkbox" value="D" />D、@xml.Element("选项列表").Element("选项D").Value</label></li>
                                @if (xml.Element("选项列表").Element("选项E").Value.Length > 0)
                                {
                                    <li><label><input type="checkbox" value="E" />E、@xml.Element("选项列表").Element("选项E").Value</label></li>
                                    if (xml.Element("选项列表").Element("选项F").Value.Length > 0)
                                    {
                                        <li><label><input type="checkbox" value="F" />F、@xml.Element("选项列表").Element("选项F").Value</label></li>
                                    }
                                }
                            </ul>
                        </div>
                    }
                    else if (item.Type == "判断题")
                    {
                        <div class="ques_body" data-type="判断题">
                            <div style="word-break:break-all;font-size:18px;">@item.Title</div>
                            <ul class="dks-pdkey clear" style="margin-top:10px;">
                                <li><label><input type="radio" name=@item.Id value="正确" />正确</label></li>
                                <li><label><input type="radio" name=@item.Id value="错误" />错误</label></li>
                            </ul>
                        </div>
                    }
                    else if (item.Type == "问答题")
                    {
                        <div class="ques_body" data-type="问答题">
                            <div style="word-break:break-all;font-size:18px;">@item.Title</div>
                            <textarea class="ulib-r3 dks-textarea"></textarea>
                        </div>
                    }
                </div>
            }
            num++;
        }
        }
    </div>
	
	<div style="width:35%;height:100%;float:right;">
		<div style="height:40px;line-height:40px;text-indent:10px;background:#fff;text-align:center;font-size:18px;">答题卡(共@(num-1)题)</div>
		<div style="height:80%;width:100%;overflow:auto">
			<ul style="width:100%;height:100%">
				@for(var k=0;k<num-1;k++){
					<li onclick="ShowQuestionByid('@(k+1)')" id="card@(k+1)" class="datika" style="border:1px solid #dfdfdf;width:40px;height:40px;float:left;text-align:center;line-height:40px">@(k+1)</li>
				}
			</ul>
		</div>
	</div>
	
 <!--   <script type="text/javascript">
        function refresh() {
            $(".error_ans").remove();
            $(".ques_body input:checked").prop({ checked: false });
            $(".ques_body input[type='text']").val("");
            $(".ques_body textare").val("");
        }

        $(function () {
            var prev = false;
            var userans = "";
            var errans = "";
            var current_index = ""
            var TotalNumber = "@ViewBag.TotalNumber" * 1;
			 
            $("#next").on("click", function () {
                $(".error_ans").hide();
                current_index = $("#current_index").val();
                if (current_index <= TotalNumber) {
                    if ($(".error_ans").length == 0) {
                        var current_quesbody = $("#" + current_index).find(".ques_body");
                        var questype = current_quesbody.data("type");
                        switch (questype) {
                            case "填空题":
                                current_quesbody.find("input").each(function (index, ele) {
                                    userans += "<填空" + (index + 1) + ">" + $(this).val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</填空" + (index + 1) + ">"
                                });
                                break;
                            case "单选题":
                                if (current_quesbody.find("input:checked").length > 0) {
                                    userans += current_quesbody.find("input:checked").val();
                                }
                                else {
                                    alert("未作答");
                                    return;
                                }
                                break;
                            case "多选题":
                                if (current_quesbody.find("input:checked").length > 1) {
                                    current_quesbody.find("input:checked").each(function (index, ele) {
                                        if (index == 0) {
                                            userans += $(this).val();
                                        }
                                        else {
                                            userans += "," + $(this).val();
                                        }
                                    });
                                }
                                else {
                                    alert("选择答案少于2个");
                                    return;
                                }
                                break;
                            case "判断题":
                                if (current_quesbody.find("input:checked").length > 0) {
                                    userans += current_quesbody.find("input:checked").val();
                                }
                                else {
                                    alert("未作答");
                                    return;
                                }
                                break;
                            case "问答题":
                                userans += current_quesbody.find("textarea").val();
                                break;
                        }
                        errans = userans;
                        $.ajax({
                            type: "Get",
                            url: PoolName + "/ErrorQues/CheckAns",
                            data: { quesid: $("#" + current_index).find("#hideid").val(), ans: userans, type: questype },
                            async: false,
                            success: function (data) {
                                userans = "";
                                if (data.Key) {
                                    if (!prev) {
                                        $("#get_score").val((parseInt($("#get_score").val()) + 1));
                                    }
                                    if (current_index < TotalNumber) {
                                        $("#" + current_index).find("#hideid")
                                        $("#" + current_index).hide();
                                        $("#current_index").val((parseInt(current_index) + 1));
                                        $("#" + $("#current_index").val()).show();
                                    }
                                    else {
                                        $("#sumscoretext").text("本次答题得分：" + parseInt($("#get_score").val()) * 10 + "分");
                                        $("#sumscoremodal-shadow,#sumscoremodal").show();
                                        refresh();
                                        //$(window.parent.document).find("#sumscoretext").text(parseInt($("#get_score").val())*10+"分");
                                        //$(window.parent.document).find('#sumscoremodal-shadow,#sumscoremodal').show();
                                        //if (confirm("本次答题结束，是否结束答题？")) {
                                        //    $(window.parent.document).find('#randomexammodal,#randomexam-shadow').hide(); $(window.parent.document).find('#randomexam_iframe').prop({ src: '' })
                                        //}
                                        //else {
                                        //    $("#current_index").val("1");
                                        //    $("#" + current_index).hide();
                                        //    refresh();
                                        //    $("#1").show();
                                        //    $("#get_score").val("0");
                                        //}
                                    }
									$("#card"+current_index).css("background","#10ABF5");
									$("#card"+current_index).css("color","#fff");
                                }
                                else {
                                    $("#" + current_index).find(".ques_body").append('<div class="error_ans" style="margin-top:10px"><div style="color:#ff485E">正确答案：' + data.Value.split('@("@*@")')[0]+'</div><div>解析：'+data.Value.split('@("@*@")')[1]+ '</div></div>');
                                    //$("#" + current_index).scrollTop($(".error_ans").offset().top);
                                    $.ajax({
                                        type: "Get",
                                        url: PoolName + "/ErrorQues/AddErrorInfor",
                                        data: { questionid: $("#" + current_index).find("#hideid").val(), errorans: errans },
                                        async: false,
                                        success: function () {
                                        }
                                    });
									$("#card"+current_index).css("background","#ff485E");
									$("#card"+current_index).css("color","#fff");
                                }
                                prev = false;
                            }
                        });
				
						
                    }
                    else {
                        prev = false;
                        if (current_index < TotalNumber) {
                            $("#" + current_index).find("#hideid")
                            $("#" + current_index).hide();
                            $("#current_index").val((parseInt(current_index) + 1));
							$(".AllQuestion").hide();
                            $("#" + $("#current_index").val()).show();
                            $(".error_ans").remove();
                        }
                        else {
                            refresh();
                            $("#sumscoretext").text("本次答题得分：" + parseInt($("#get_score").val()) * 10 + "分");
                            $("#sumscoremodal-shadow,#sumscoremodal").show();
                            //$(window.parent.document).find("#sumscoretext").text(parseInt($("#get_score").val()) * 10 + "分");
                            //$(window.parent.document).find('#sumscoremodal-shadow,#sumscoremodal').show();
                            //if (confirm("本次答题结束，是否结束答题？")) {
                            //    $(window.parent.document).find('#randomexammodal,#randomexam-shadow').hide(); $(window.parent.document).find('#randomexam_iframe').prop({ src: '' })
                            //}
                            //else {
                            //    $("#current_index").val("1");
                            //    $("#" + current_index).hide();
                            //    $("#1").show();
                            //    $("#get_score").val("0");
                            //}
                        }
                    }
                }
            });
            $("#prev").on("click", function () {
                prev = true;
                refresh();
                current_index = $("#current_index").val();
                if (current_index > 1) {
                    $("#current_index").val((parseInt(current_index) - 1));
                    $("#" + current_index).hide();
                    $("#" + $("#current_index").val()).show();
                }
            });
			$("#shoucang").on("click",function(){
				var q=$("#current_index").val();
				var qid=$("#"+q).find("#hideid").val();
				 $.ajax({
						type: "POST",
						url: PoolName + "/ErrorQues/CollectQuestion",
						data: { qid: qid },
						async:false,
						success:function (res) {
						 
							alert("收藏成功");
						}
					});
			//
			});
            $(".fillit_que").each(function () {
                var x = $(this).html();
                $(this).html(x.replace(/______/g, "<input class='tk-insty' type='text'/>"));

            });
            //$(".ques_body").find("input[type='text']").each(function(){
            //    $(this).blur(function(){
            //        if(userans===""){
            //            userans+=$(this).val();
            //        }

            //    });
            //});
        });
		
		function ShowQuestionByid(id){
		 
			$("#current_index").val(id*1);
			$(".AllQuestion").hide();
			$("#"+id).show();
			$(".error_ans").remove();
		}
    </script>   -->
</body>
</html>
