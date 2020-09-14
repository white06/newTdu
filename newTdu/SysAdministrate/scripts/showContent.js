/// <reference path="jquery.ztree.core-3.5.js" />
var $parentwindow = $(window.parent.document);
var nowquestype;
$(function () {
	
    $("#question-tab li a").click(function () {
        $("#question-tab li a").removeClass("active");
        $(this).addClass("active")
    });
    $(document).on("submit", "form", function () {
        return false;
    });
    $(document).on("change", "input[id='quesimg']", function () {
        var $this = $(this);
        var file = $this.context.files[0];
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        fd.append("name", file, file.name);
        xhr.open("post", PoolName + "/Question/QuestionImgUpload?Id=" + questionid, false);
        xhr.send(fd);
        if ($this.prev("span").length > 0) {
            $this.prev("span").remove();
            $this.before('<img width="80" height="40" src="' + xhr.responseText + '"/>')
        }
        else {
            $this.prev("img").prop({ "src": xhr.responseText });
        }
        $("#showimg").prop({ 'src': xhr.responseText })
        $("#Photo").val($("#showimg").prop('src'));
    })
   
    $(document).on("click", "#addextritem_single", function () {
        if ($("#questionitemediv").css("display") == "none") {
            $("#questionitemediv").show();
            if ($("#questionanswer").length > 0) {
                $("#questionitemediv input").prop({ id: "questioniteme" });
                if ($("#questionanswer span").length > 0) {
                    $("#questionanswer span").before(' <input type="radio" name="questionanswer" value="E" class="form-inline" /> &nbsp;E &nbsp;');
                }
                else {
                    $("#questionanswer").append(' <input type="radio" name="questionanswer" value="E" class="form-inline" /> &nbsp;E &nbsp;');
                }
            }
            else {
                $("#questionitemediv input").prop({ id: "singlechoicequestion_QuestionItemE" });
                $("#singlechoicequestionQuestionAnswer").append(' <input type="radio" id="singlechoicequestion_QuestionAnswer" name="singlechoicequestion.QuestionAnswer" value="E" class="form-inline" /> E\u3000');
            }
        }
        else if ($("#questionitemfdiv").css("display") == "none") {
            $(this).remove();
            $("#questionitemfdiv").show();
            if ($("#questionanswer").length > 0) {
                $("#questionitemfdiv input").prop({ id: "questionitemf" });
                if ($("#questionanswer span").length > 0) {
                    $("#questionanswer span").before(' <input type="radio" name="questionanswer" value="F" class="form-inline" /> &nbsp;F &nbsp;');
                }
                else {
                    $("#questionanswer").append(' <input type="radio" name="questionanswer" value="F" class="form-inline" /> &nbsp;F &nbsp;');
                }
            }
            else {
                $("#questionitemfdiv input").prop({ id: "singlechoicequestion_QuestionItemF" });
                $("#singlechoicequestionQuestionAnswer").append('<input type="radio" id="singlechoicequestion_QuestionAnswer" name="singlechoicequestion.QuestionAnswer" value="F" class="form-inline" />F\u3000');
            }
        }

    });

    $(document).on("click", "#addextritem_mult", function () {
        if ($("#questionitemediv").css("display") == "none") {
            $("#questionitemediv").show();
            if ($("#questionanswer").length > 0) {
                $("#questionitemediv input").prop({ id: "questioniteme" });
                if ($("#questionanswer span").length > 0) {
                    $("#questionanswer span").before(' <input type="checkbox" name="questionanswer" value="E" /> &nbsp;E &nbsp;');
                }
                else {
                    $("#questionanswer").append('<input type="checkbox" name="questionanswer" value="E" /> &nbsp;E &nbsp;');
                }
            }
            else {
                $("#questionitemediv input").prop({ id: "multiplechoicequestion_QuestionItemE" });
                if ($("#multiplechoicequestionQuestionAnswer span").length > 0) {
                    $("#multiplechoicequestionQuestionAnswer span").before('<input type="checkbox" value="E" /> &nbsp;E &nbsp;');
                }
                else {
                    $("#multiplechoicequestionQuestionAnswer").append('<input type="checkbox" value="E" /> &nbsp;E &nbsp;');
                }
            }
        }
        else if ($("#questionitemfdiv").css("display") == "none") {
            $(this).remove();
            $("#questionitemfdiv").show();
            if ($("#questionanswer").length > 0) {
                $("#questionitemfdiv input").prop({ id: "questionitemf" });
                if ($("#questionanswer span").length > 0) {
                    $("#questionanswer span").before(' <input type="checkbox" name="questionanswer" value="F" /> &nbsp;F &nbsp;');
                }
                else {
                    $("#questionanswer").append(' <input type="checkbox" name="questionanswer" value="F" /> &nbsp;F &nbsp;');
                }
            }
            else {
                $("#questionitemfdiv input").prop({ id: "multiplechoicequestion_QuestionItemF" });
                if ($("#multiplechoicequestionQuestionAnswer span").length > 0) {
                    $("#multiplechoicequestionQuestionAnswer span").before(' <input type="checkbox" value="F" />F\u3000');
                }
                else {
                    $("#multiplechoicequestionQuestionAnswer").append(' <input type="checkbox" value="F" />F\u3000');
                }
            }
        }
    });

    
    
  //将字符串转化成dom对象;string转换为xml  
    function stringToXml(xmlString) {  
        var xmlDoc;  
        if (typeof xmlString == "string") {  
            //FF     
            if (document.implementation.createDocument) {  
                var parser = new DOMParser();  
                xmlDoc = parser.parseFromString(xmlString, "text/xml");  
            } else if (window.ActiveXObject) {  
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");  
                xmlDoc.async = false;  
                xmlDoc.loadXML(xmlString);  
            }  
        }  
        else {  
            xmlDoc = xmlString;  
        }  
        return xmlDoc;  
    }  
       
    //xml转换为string  
    function xmlToString(xmlDoc) {  
        if (window.ActiveXObject) {  
            return xmlDoc.xml;  //IE     
        } else {  
            return (new XMLSerializer()).serializeToString(xmlDoc);  //FF     
        }  
    } 
    
    $(document).on("click", "#addQuestion", function () {
        if ($("#question-tab li a").hasClass("active")) {
            if ($.trim($("#saveTreeNode").val()).length > 0) {
                switch ($("#question-tab li a.active").text()) {
                    case "全部":
                        $.messager.alert("提示",'请选中要添加的题型');
                        break;
                    case "填空题":
                        showFillBlankQuestion();
                        break;
                    case "单选题":
                        showSingleChoiceQuestion();
                        break;
                    case "多选题":
                        showMultipleChoiceQuestion();
                        break;
                    case "判断题":
                        showJudgeQuestion();
                        break;
                    case "问答题":
                        showAnswerQuestion();
                        break;
                    case "3D仿真实验题":
                        show3DQuestion();
                        break;
                }
            }
            else {
                $.messager.alert("提示","请选择添加试题的知识点");
            }
        }
        else {
            $.messager.alert("提示","请选择试题题型");
        }
    });
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
    /*
    对试题进行编辑的函数在这里
    */
    var bianji;
    $(document).off("click", "#editques").on("click", "#editques", function () {
    	//console.log(questionid)
    	//console.log("对试题进行编辑的函数");
        var $this = $(this);
        var parenttr = $this.parents("tr");
        //console.log(parenttr);
        $.post(PoolName + "../../../ExamController/chaxun.action", data = { id: questionid }, function (mesg) {
        	//console.log(mesg);
        	var xuangxiangA = nizhuanyi($(stringToXml(mesg.content)).find("选项A").text());
        	var xuangxiangB = nizhuanyi($(stringToXml(mesg.content)).find("选项B").text());
        	var xuangxiangC = nizhuanyi($(stringToXml(mesg.content)).find("选项C").text());
        	var xuangxiangD = nizhuanyi($(stringToXml(mesg.content)).find("选项D").text());
        	var daan = nizhuanyi($(stringToXml(mesg.content)).find("答案").text());
        	//var DaanCode=$(stringToXml(mesg.content)).find("答案").text();//获取答案标签的内容 
    		var JiexiCode=$(stringToXml(mesg.content)).find("解析").text();//获取答案标签的内容
        	if(mesg.type=="填空题"){
        		
        		var functionCallbak = function(){
        			$("input:radio[name='nandu'][value=" +"'"+mesg.questionImg+"']").attr('checked','true');
        			$("#fenshu").val(mesg.fenshu);
            		$("#tigan").html(mesg.title);
            		$("#daan").html(daan);
            		$("#jiexi").html(JiexiCode);
        		}
        		showFillBlankQuestion1(functionCallbak);
        		
        	}else if(mesg.type=="单选题"){
        		
        		//console.log("A:"+xuangxiangA+"B:"+xuangxiangB+"C:"+xuangxiangC+"D:"+xuangxiangD+"答案:"+daan);
        		
        		var functionCallbak = function(){
        			$("input:radio[name='nandu'][value=" +"'"+mesg.questionImg+"']").attr('checked','true');
        			$("#fenshu").val(mesg.fenshu);
            		$("#tigan").html(mesg.title);
            		
            		$("#xuanxiang1").html(xuangxiangA);
            		$("#xuanxiang2").html(xuangxiangB);
            		$("#xuanxiang3").html(xuangxiangC);
            		$("#xuanxiang4").html(xuangxiangD);
            		
            		$("input:radio[name='daan'][value=" +"'"+daan+"']").attr('checked','true');
            		$("#jiexi").html(JiexiCode);
        		}
        		
        		showSingleChoiceQuestion1(functionCallbak);
        	}else if(mesg.type=="多选题"){
        		//console.log("A:"+xuangxiangA+"B:"+xuangxiangB+"C:"+xuangxiangC+"D:"+xuangxiangD+"答案:"+daan);
        		var functionCallbak = function(){
        			$("input:radio[name='nandu'][value=" +"'"+mesg.questionImg+"']").attr('checked','true');
        			$("#fenshu").val(mesg.fenshu);
            		$("#tigan").html(mesg.title);
            		
            		$("#xuanxiang1").html(xuangxiangA);
            		$("#xuanxiang2").html(xuangxiangB);
            		$("#xuanxiang3").html(xuangxiangC);
            		$("#xuanxiang4").html(xuangxiangD);
            		
            		$("#jiexi").html(JiexiCode);
            		
            		
            		var reg = RegExp(/______/);
            		if(daan.match(reg)){
            		    // 包含     
            			//console.log("包含");
            			dada = daan.split('______');  //["h", "e", "l", "l", "o", "w", "o", "r", "l", "d"]
            			for (var i = 0; i < dada.length; i++) {
            				if(dada[i]=="A"){
            					$("input:checkbox[name='daan'][value=" +"'"+dada[i]+"']").attr('checked','true');
            				}else if(dada[i]=="B"){
            					$("input:checkbox[name='daan'][value=" +"'"+dada[i]+"']").attr('checked','true')
            				}else if(dada[i]=="C"){
            					$("input:checkbox[name='daan'][value=" +"'"+dada[i]+"']").attr('checked','true')
            				}else if(dada[i]=="D"){
            					$("input:checkbox[name='daan'][value=" +"'"+dada[i]+"']").attr('checked','true')
            				}
            			}
            		}else{
            			//console.log("不包含")
            			dada = daan.split('');  //["h", "e", "l", "l", "o", "w", "o", "r", "l", "d"]
            			for (var i = 0; i < dada.length; i++) {
            				if(dada[i]=="A"){
            					$("input:checkbox[name='daan'][value=" +"'"+dada[i]+"']").attr('checked','true');
            				}else if(dada[i]=="B"){
            					$("input:checkbox[name='daan'][value=" +"'"+dada[i]+"']").attr('checked','true')
            				}else if(dada[i]=="C"){
            					$("input:checkbox[name='daan'][value=" +"'"+dada[i]+"']").attr('checked','true')
            				}else if(dada[i]=="D"){
            					$("input:checkbox[name='daan'][value=" +"'"+dada[i]+"']").attr('checked','true')
            				}
            			}
            		}
            		
        		}
        		
        		showMultipleChoiceQuestion1(functionCallbak);
        	}else if(mesg.type=="判断题"){
        		//console.log("判断题"+daan);
        		var functionCallbak = function(){
        			$("input:radio[name='nandu'][value=" +"'"+mesg.questionImg+"']").attr('checked','true');
        			$("#fenshu").val(mesg.fenshu);
            		$("#tigan").html(mesg.title);
            		$("input:radio[name='daan'][value=" +"'"+daan+"']").attr('checked','true');
            		$("#jiexi").html(JiexiCode);
        		}
        		
        		showJudgeQuestion1(functionCallbak);
        	}else if(mesg.type=="问答题"){
        		//console.log("问答题"+"答案："+daan+"分数:"+mesg.fenshu+"题干："+mesg.title+"难度:"+mesg.questionImg);
        		var functionCallbak = function(){
        			$("input:radio[name='nandu'][value=" +"'"+mesg.questionImg+"']").attr('checked','true');
        			$("#fenshu").val(mesg.fenshu);
            		$("#tigan").html(mesg.title);
            		$("#daan").html(daan);
            		$("#jiexi").html($(stringToXml(mesg.content)).find("场景").text());
        		}
        		
        		showAnswerQuestion1(functionCallbak);
        	}else if(mesg.type=="3D仿真实验题"){
        		
        		var functionCallbak = function(){
        			$("input:radio[name='nandu'][value=" +"'"+mesg.questionImg+"']").attr('checked','true');
        			$("#fenshu").val(mesg.fenshu);
            		$("#tigan").html(mesg.title);
            		$("#daan").html($(stringToXml(mesg.content)).find("安装目录").text());
            		$("#jiexi").html($(stringToXml(mesg.content)).find("场景").text());
            		$("#step").html($(stringToXml(mesg.content)).find("step").text());
            		$("#type").html($(stringToXml(mesg.content)).find("type").text());
        		}
        		
        		show3DQuestion1(functionCallbak);
        	}
        	
            //EditEvent(editquestiontype, mesg, parenttr);
        });
    });
    /*
   对试题进行删除的函数在这里
   */
    $(document).off("click", "#deleteques").on("click", "#deleteques", function () {
        if (confirm("确定要删除试题？")) {
            $.post(PoolName + "../../../ExamController/delExam.action", data = { id: questionid }, function (data) {
                if (data) {
                    $.messager.alert("提示","删除成功");
                    //if ($("#partailQuestions tbody tr").length > 1) {
                    //    PageEvent($("a.pagination-active").text());
                    //}
                    //else {
                    //    var prevli = $("a.pagination-active").parent().prev("li");
                    //    if (prevli.length > 1) {
                    //        PageEvent(prevli.find("a").text());
                    //    }
                    //    else{
                    //        PageEvent(1);
                    //    }
                    //}
                }
                else {
                    $.messager.alert("提示","删除失败");
                }
                $("#FillBlanktable").datagrid("reload");
                $("#SingleChoicetable").datagrid("reload");
                $("#MulChoicetable").datagrid("reload");
                $("#IsTruetable").datagrid("reload");
                $("#Textaraetable").datagrid("reload");
                $("#3Dtable").datagrid("reload");
            });
        }
    });


    //注意一个元素的使用了show()和hide()方法后他的hidden属性不会改变！
    //分页的处理在这里(以后要将这个封装起来自己以后用！！)
    $(document).off("mouseenter", "#pagelist li a").on("mouseenter", "#pagelist li a", function () {
        $(this).removeClass("pagination-default");
        if (!$(this).hasClass("pagination-active"))
            $(this).addClass("pagination-hover");
    });
    $(document).off("mouseleave", "#pagelist li a").on("mouseleave", "#pagelist li a", function () {
        $(this).removeClass("pagination-hover");
        if (!$(this).hasClass("pagination-active"))
            $(this).addClass("pagination-default");
    });
    //点击分页标签事件的处理！
    $(document).off("click", "#pagelist li a").on("click", "#pagelist li a", function () {
        if (!$(this).hasClass("pagination-active")) {
            var $this = $(this);
            //点击跳转到下一页的事件在这里
            if ($this.prop("id") == "next") {
                PageEvent($("a.pagination-active").parent().next("li").find("a").text());
            }
                //点击跳转到前一页的事件在这里
            else if ($this.prop("id") == 'prev') {
                PageEvent($("a.pagination-active").parent().prev("li").find("a").text());
            }
                //点击跳转到第一页的事件在这里
            else if ($this.prop("id") == 'first') {
                PageEvent(1);
            }
                //点击跳转到最后一页的事件在这里
            else if ($this.prop("id") == 'last') {
                $.ajax({
                    url: PoolName + "/Question/GetQuestions",
                    data: {
                        random: Math.random(),
                        knowledgeId: $("#saveTreeNode").val(),
                        last: true,
                    },
                    type: "get",
                    async: false,
                    success: function (data) {
                        $("#partailQuestions").html(data);
                    }
                });
            }
            else {
                PageEvent($this.text());
            }
        }
    });
});

function PageEvent(pageid) {
    $.ajax({
        url: PoolName + "/Question/GetQuestions",
        data: {
            random: Math.random(),
            knowledgeId: $("#saveTreeNode").val(),
            p: pageid,
        },
        type: "get",
        async: false,
        success: function (data) {
            $("#partailQuestions").html(data);
        }
    });
}

function EditEvent(questype, mesg, parenttr) {
    $("#ContentDiv").html(mesg);
    var count = 0;
    switch (questype) {
        case "填空题":
            $.each($("#fillblankquestion_QuestionItemB,#fillblankquestion_QuestionItemC,#fillblankquestion_QuestionItemD"), function () {
                if ($.trim($(this).val()).length <= 0) {
                    $(this).parent("div").parent("div").hide();
                }
                else {
                    count++;
                }
            });
            break;
        case "问答题":
            $("#addanswerare").remove();
            break;
    }
    $("#myModalLabel").text("修改" + $("#savequestype").val());
    IEStyle();
    $("#ContentDiv").modal({
        backdrop: 'static',
        show: true
    });
    $("#editsubmit").unbind("click").click(function () {
        EditSubmitEvent(questype, count, parenttr);
    });
}
function reloadmyalldata() {
    $("#FillBlanktable").datagrid("reload");
    $("#SingleChoicetable").datagrid("reload");
    $("#MulChoicetable").datagrid("reload");
    $("#IsTruetable").datagrid("reload");
    $("#Textaraetable").datagrid("reload");
    $("#3Dtable").datagrid("reload");
}
function EditSubmitEvent(questype, count, parenttr) {
    switch (questype) {
        case "填空题":
            if (editSubmit(count)) {
                if (addansmatchblank()) {

                    $.post(PoolName + "/Question/Edit", data = $("form").serialize(), function (data) {
                        if (data.Key) {
                            $.messager.alert("提示","数据保存成功");
                            parenttr.find(".my-table-text").text(data.Value);
                            $("#ContentDiv").modal('hide');

                        }
                        else {
                            $("#ContentDiv").html(data);
                            $("#myModalLabel").text("修改" + $("#savequestype").val());
                            IEStyle();
                            $.each($("#fillblankquestion_QuestionItemB,#fillblankquestion_QuestionItemC,#fillblankquestion_QuestionItemD"), function () {
                                if ($.trim($(this).val()).length <= 0) {
                                    $(this).parent("div").parent("div").hide();
                                }
                            });
                        }
                        reloadmyalldata();
                    });
                }
                else {
                    $.messager.alert("提示","答案和题干不匹配！");
                }
            }
            break;
        case "单选题":
            if ($("#singlechoicequestion_QuestionItemA,#singlechoicequestion_QuestionItemB,#singlechoicequestion_QuestionItemC,#singlechoicequestion_QuestionItemD,#singlechoicequestion_QuestionItemE,#singlechoicequestion_QuestionItemF,#singlechoicequestionQuestionAnswer").Jqvalidate()) {
                $("#Content").val(getSingleQuestionString());
                $.post(PoolName + "/Question/Edit", data = $("form").serialize(), function (data) {
                    if (data.Key) {
                        $.messager.alert("提示","数据保存成功");
                        parenttr.find(".my-table-text").text(data.Value);
                        $("#ContentDiv").modal('hide');
                    }
                    else {
                        $("#ContentDiv").html(data);
                        IEStyle();
                    }
                    reloadmyalldata();
                });
            }
            break;
        case "多选题":
            if ($("#multiplechoicequestion_QuestionItemA,#multiplechoicequestion_QuestionItemB,#multiplechoicequestion_QuestionItemC,#multiplechoicequestion_QuestionItemD,#multiplechoicequestion_QuestionItemE,#multiplechoicequestion_QuestionItemF,#multiplechoicequestionQuestionAnswer").Jqvalidate()) {
                $("#Content").val(getMultipleQuestionString());
                $.post(PoolName + "/Question/Edit", data = $("form").serialize(), function (data) {
                    if (data.Key) {
                        $.messager.alert("提示","数据保存成功");
                        parenttr.find(".my-table-text").text(data.Value);
                        $("#ContentDiv").modal('hide');
                    }
                    else {
                        $("#ContentDiv").html(data);
                        IEStyle();
                    }
                    reloadmyalldata();
                });
            }
            break;
        case "判断题":
            if ($("#judgequestionQuestionAnswer").Jqvalidate()) {
                $("#Content").val(getJudgeQuestionString());
                $.post(PoolName + "/Question/Edit", data = $("form").serialize(), function (data) {
                    if (data.Key) {
                        $.messager.alert("提示","数据保存成功");
                        parenttr.find(".my-table-text").text(data.Value);
                        $("#ContentDiv").modal('hide');
                    }
                    else {
                        $("#ContentDiv").html(data);
                        IEStyle();
                    }
                    reloadmyalldata();
                });
            }
            break;
        case "问答题":
            if ($("#answerquestion_QuestionAnswer").Jqvalidate()) {
                $("#Content").val(getAnswerQuestionString());
                $.post(PoolName + "/Question/Edit", data = $("form").serialize(), function (data) {
                    if (data.Key) {
                        $.messager.alert("提示","数据保存成功");
                        parenttr.find(".my-table-text").text(data.Value);
                        $("#ContentDiv").modal('hide');
                    }
                    else {
                        $("#ContentDiv").html(data);
                        IEStyle();
                    }
                    reloadmyalldata();
                });
            }
            break;
        case "3D仿真实验题":
            if ($("#answerquestion_QuestionAnswer").Jqvalidate()) {
                $("#Content").val(get3DQuestionString());
                $.post(PoolName + "/Question/Edit", data = $("form").serialize(), function (data) {
                    if (data.Key) {
                        $.messager.alert("提示","数据保存成功");
                        parenttr.find(".my-table-text").text(data.Value);
                        $("#ContentDiv").modal('hide');
                    }
                    else {
                        $("#ContentDiv").html(data);
                        IEStyle();
                    }
                    reloadmyalldata();
                });
            }
            break;
    }
}

//填空题用来判断填了哪几个空在这里
function editSubmit(count) {
    switch (count) {
        case 0:
            if ($("#fillblankquestion_QuestionItemA").Jqvalidate()) {
                $("#Content").val(getFillQuestionString());
                return true;
            }
            return false;
        case 1:
            if ($("#fillblankquestion_QuestionItemA,#fillblankquestion_QuestionItemB").Jqvalidate()) {
                $("#Content").val(getFillQuestionString());
                return true;
            }
            return false;
        case 2:
            if ($("#fillblankquestion_QuestionItemA,#fillblankquestion_QuestionItemB,#fillblankquestion_QuestionItemC").Jqvalidate()) {
                $("#Content").val(getFillQuestionString());
                return true;
            }
            return false;
        case 3:
            if ($("#fillblankquestion_QuestionItemA,#fillblankquestion_QuestionItemB,#fillblankquestion_QuestionItemC,#fillblankquestion_QuestionItemD").Jqvalidate()) {
                $("#Content").val(getFillQuestionString());
                return true;
            }
            return false;
    }
}
//编辑数据后重新获取填空题内容的函数在这里！
function getFillQuestionString() {
    return "<智能题><题干>" + $("#Title").val() + "</题干><类型>" + $("#Type").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</类型><场景>" + $("#fillblankquestion_QuestionScare").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</场景><答案列表><填空1>"
            + $.trim($("#fillblankquestion_QuestionItemA").val()).replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</填空1><填空2>" + $.trim($("#fillblankquestion_QuestionItemB").val()).replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</填空2><填空3>" + $.trim($("#fillblankquestion_QuestionItemC").val()).replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</填空3><填空4>" + $.trim($("#fillblankquestion_QuestionItemD").val()).replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</填空4></答案列表></智能题>";
}

//编辑数据后重新获取单选题内容的函数在这里！
function getSingleQuestionString() {
    return "<智能题><题干>" + $("#Title").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</题干><类型>" + $("#Type").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</类型><场景>" + $("#singlechoicequestion_QuestionScare").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</场景><选项列表><选项A>"
            + $("#singlechoicequestion_QuestionItemA").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</选项A><选项B>"
            + $("#singlechoicequestion_QuestionItemB").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</选项B><选项C>" + $("#singlechoicequestion_QuestionItemC").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</选项C><选项D>"
            + $("#singlechoicequestion_QuestionItemD").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</选项D><选项E>"
            + (($("#singlechoicequestion_QuestionItemE").length == 0) ? "" : $("#singlechoicequestion_QuestionItemE").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;")) + "</选项E><选项F>"
            + (($("#singlechoicequestion_QuestionItemF").length == 0) ? "" : $("#singlechoicequestion_QuestionItemF").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;")) + "</选项F></选项列表><答案>" + $("#singlechoicequestionQuestionAnswer input:checked").val() + "</答案></智能题>";
}

//编辑数据后重新获取多选题内容的函数在这里！
function getMultipleQuestionString() {
    var answerstr = "";
    $("#multiplechoicequestionQuestionAnswer input:checked").each(function (index) {
        if (index > 0) {
            answerstr += "," + $(this).val();
        }
        else {
            answerstr += $(this).val();
        }
    });
    return "<智能题><题干>" + $("#Title").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</题干><类型>"
             + $("#Type").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</类型><场景>"
             + $("#multiplechoicequestion_QuestionScare").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</场景><选项列表><选项A>"
             + $("#multiplechoicequestion_QuestionItemA").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;")
             + "</选项A><选项B>" + $("#multiplechoicequestion_QuestionItemB").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;")
             + "</选项B><选项C>" + $("#multiplechoicequestion_QuestionItemC").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;")
             + "</选项C><选项D>" + $("#multiplechoicequestion_QuestionItemD").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;")
             + "</选项D><选项E>" + (($("#multiplechoicequestion_QuestionItemE").length == 0) ? "" : $("#multiplechoicequestion_QuestionItemE").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;"))
             + "</选项E><选项F>" + (($("#multiplechoicequestion_QuestionItemF").length == 0) ? "" : $("#multiplechoicequestion_QuestionItemF").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;"))
            + "</选项F></选项列表><答案>" + $.trim(answerstr).replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</答案></智能题>";
}

//编辑数据后重新获取判断题内容的函数在这里！
function getJudgeQuestionString() {
    return "<智能题><题干>" + $("#Title").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</题干><类型>" + $("#Type").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</类型><场景>" + $("#judgequestion_QuestionScare").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</场景><答案>" + $("#judgequestionQuestionAnswer input:checked").val() + "</答案></智能题>";
}

//编辑数据后重新获取问答题内容的函数在这里！
function getAnswerQuestionString() {
    return "<智能题><题干>" + $("#Title").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</题干><类型>" + $("#Type").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</类型><场景>" + $("#answerquestion_QuestionScare").val() + "</场景><答案>" + $("#answerquestion_QuestionAnswer").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</答案></智能题>";
}
//编辑数据后重新获取3D仿真实验题内容的函数在这里！
function get3DQuestionString() {
    return "<智能题><题干>" + $("#Title").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</题干><类型>" + $("#Type").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</类型><step>" + $("#my3dquestion_step").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</step><type>lcg</type><场景>" + $("#my3dquestion_QuestionScare").val() + "</场景><安装目录>" + $("#my3dquestion_QuestionAnswer").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</安装目录></智能题>";
}


//显示填空题DIV的函数在这里！
function showFillBlankQuestion() {
    nowquestype = "填空题";
    /*$.get(PoolName + "/Question/Create?random=" + Math.random(), data = { questiontype: "填空题" }, function (data) {
        $("#ContentDiv").html(data);
        IEStyle();
        $("#ContentDiv").modal({
            backdrop: 'static',
            show: true
        });
    });*/
    bianji=0;
    $("#ContentDiv").load("../../content/tiankongti.php");
    $("#ContentDiv").append('<script type="text/javascript" src="../Scripts/newExamAdd.js"></script>');
    $("#ContentDiv").dialog('open');

    // IEStyle();
    // $("#ContentDiv").modal({
    //     backdrop: 'static',
    //     show: true
    // });
}

//显示单选题DIV的函数在这里！
function showSingleChoiceQuestion() {
    nowquestype = "单选题";
    /*$.get(PoolName + "/Question/Create?random=" + Math.random(), data = { questiontype: "单选题" }, function (data) {
        $("#ContentDiv").html(data);
        IEStyle();
        $("#ContentDiv").modal({
            backdrop: 'static',
            show: true
        });
    });*/
    bianji=0;
    $("#ContentDiv").load("../../content/xuanzeti.php");
    $("#ContentDiv").append('<script type="text/javascript" src="../Scripts/newExamAdd.js"></script>');
    $("#ContentDiv").dialog('open');
}

//显示多选题DIV的函数在这里！
function showMultipleChoiceQuestion() {
    nowquestype = "多选题";
    /*$.get(PoolName + "/Question/Create?random=" + Math.random(), data = { questiontype: "多选题" }, function (data) {
        $("#ContentDiv").html(data);
        IEStyle();
        $("#ContentDiv").modal({
            backdrop: 'static',
            show: true
        });
    });*/
    bianji=0;
    $("#ContentDiv").load("../../content/duoxuanti.php");
    $("#ContentDiv").append('<script type="text/javascript" src="../Scripts/newExamAdd.js"></script>');
    $("#ContentDiv").dialog('open');
}

//显示判断题DIV的函数在这里！
function showJudgeQuestion() {
    nowquestype = "判断题";
    /*$.get(PoolName + "/Question/Create?random=" + Math.random(), data = { questiontype: "判断题" }, function (data) {
        $("#ContentDiv").html(data);
        IEStyle();
        $("#ContentDiv").modal({
            backdrop: 'static',
            show: true
        });
    });*/
    bianji=0;
    $("#ContentDiv").load("../../content/panduan.php");
    $("#ContentDiv").append('<script type="text/javascript" src="../Scripts/newExamAdd.js"></script>');
    $("#ContentDiv").dialog('open');
}

//显示问答题DIV的函数在这里！
function showAnswerQuestion() {
	//console.log("显示问答题DIV的函数");
    nowquestype = "问答题";
    /*$.get(PoolName + "/Question/Create?random=" + Math.random(), data = { questiontype: "问答题" }, function (data) {
        $("#ContentDiv").html(data);
        IEStyle();
        $("#ContentDiv").modal({
            backdrop: 'static',
            show: true
        });
    });*/
    bianji=0;
    $("#ContentDiv").load("../../content/wendati.php");
    $("#ContentDiv").append('<script type="text/javascript" src="../Scripts/newExamAdd.js"></script>');
    $("#ContentDiv").dialog('open');
}
//显示3D仿真实验题DIV的函数在这里！
function show3DQuestion() {
	//console.log("显示3D仿真实验题DIV的函数");
    nowquestype = "3D仿真实验题";
    /*$.get(PoolName + "/Question/Create?random=" + Math.random(), data = { questiontype: "3D仿真实验题" }, function (data) {
        $("#ContentDiv").html(data);
        IEStyle();
        $("#ContentDiv").modal({
            backdrop: 'static',
            show: true
        });
    });*/
    bianji=0;
    $("#ContentDiv").load("../../content/3dqt.php");
    $("#ContentDiv").append('<script type="text/javascript" src="../Scripts/newExamAdd.js"></script>');
    $("#ContentDiv").dialog('open');
}


/**
 * 编辑div
 */
// 编辑div显示填空题DIV的函数在这里！
function showFillBlankQuestion1(functionCallbak) {
  nowquestype = "填空题";
  bianji=1;
  $("#ContentDiv").load("../../content/tiankongti.php",bianji,functionCallbak);
  $("#ContentDiv").append('<script type="text/javascript" src="../Scripts/newExamAdd.js"></script>');
  $("#ContentDiv").dialog('open');
}

// 编辑div显示单选题DIV的函数在这里！
function showSingleChoiceQuestion1(functionCallbak) {
  nowquestype = "单选题";
  bianji=1;
  $("#ContentDiv").load("../../content/xuanzeti.php",bianji,functionCallbak);
  $("#ContentDiv").append('<script type="text/javascript" src="../Scripts/newExamAdd.js"></script>');
  $("#ContentDiv").dialog('open');
}

// 编辑div显示多选题DIV的函数在这里！
function showMultipleChoiceQuestion1(functionCallbak) {
  nowquestype = "多选题";
  bianji=1;
  $("#ContentDiv").load("../../content/duoxuanti.php",bianji,functionCallbak);
  $("#ContentDiv").append('<script type="text/javascript" src="../Scripts/newExamAdd.js"></script>');
  $("#ContentDiv").dialog('open');
}

// 编辑div显示判断题DIV的函数在这里！
function showJudgeQuestion1(functionCallbak) {
  nowquestype = "判断题";
  bianji=1;
  $("#ContentDiv").load("../../content/panduan.php",bianji,functionCallbak);
  $("#ContentDiv").append('<script type="text/javascript" src="../Scripts/newExamAdd.js"></script>');
  $("#ContentDiv").dialog('open');
}

// 编辑div显示问答题DIV的函数在这里！
function showAnswerQuestion1(functionCallbak) {
	//console.log("显示问答题DIV的函数");
  nowquestype = "问答题";
  bianji=1;
  $("#ContentDiv").load("../../content/wendati.php",bianji,functionCallbak);
  $("#ContentDiv").append('<script type="text/javascript" src="../Scripts/newExamAdd.js"></script>');
  $("#ContentDiv").dialog('open');
}
// 编辑div显示3D仿真实验题DIV的函数在这里！
function show3DQuestion1(functionCallbak) {
	//console.log("显示3D仿真实验题DIV的函数");
  nowquestype = "3D仿真实验题";
  bianji=1;
  $("#ContentDiv").load("../../content/3dqt.php",bianji,functionCallbak);
  $("#ContentDiv").append('<script type="text/javascript" src="../Scripts/newExamAdd.js"></script>');
  $("#ContentDiv").dialog('open');
}

//新增试题提交表单前题型内容的验证的函数在这里！
function submitFun() {
    var ttype = nowquestype;
    $("#Type").val(ttype);
    $('#questionSubject #SubjectId').val($parentwindow.find("#subject option:selected").val());
    $('#questionKnowledge #KnowledgeId').val($('#saveTreeNode').val());
    //新增填空题的提交在这里
    if (ttype == "填空题") {
        if ($("#questionitema").Jqvalidate()) {
            $("#Content").val(getFillQuestionContentString());
            if ($.trim($("#questionitemb").val()).length == 0 && ($.trim($("#questionitemc").val()).length > 0 || $.trim($("#questionitemd").val()).length > 0)) {
                $("#questionitemb").Jqvalidate();
                return false;
            }
            else if ($.trim($("#questionitemc").val()).length == 0 && $.trim($("#questionitemd").val()).length > 0) {
                $("#questionitemc").Jqvalidate();
                return false;
            }
            if (!addansmatchblank()) {
                $.messager.alert("提示", "答案和题干不匹配！");
                return false;
            }
            var options = $("form").serialize();
            $.post(PoolName + "/Question/Create", data = options, function (mesg) {
                if (mesg.Key) {
                    $.messager.alert("提示","新增试题成功");
                    $("#ContentDiv").modal('hide');
                    PageEvent($("a.pagination-active").text());
                }
                else {
                    var scare = $("#questionscare").val(), itema = $("#questionitema").val(), itemb = $("#questionitemb").val(), itemc = $("#questionitemc").val(), itemd = $("#questionitemd").val();
                    $("#ContentDiv").html(mesg);
                    IEStyle();
                    $("#questionscare").val(scare);
                    $("#questionitema").val(itema);
                    $("#questionitemb").val(itemb);
                    $("#questionitemc").val(itemc);
                    $("#questionitemd").val(itemd);
                }
                reloadmyalldata();
            });
            return true;
        }
        return false;
    }
        //新增单选题的提交在这里
    else if (ttype == "单选题") {
        if ($("#questionitema,#questionitemb,#questionitemc,#questionitemd,#questioniteme,#questionitemf,#questionanswer").Jqvalidate()) {
            $("#Content").val(getSingleChoiceContentString());
            var options = $("form").serialize();
            $.post(PoolName + "/Question/Create", data = options, function (mesg) {
                if (mesg.Key) {
                    $.messager.alert("提示","新增试题成功");
                    $("#ContentDiv").modal('hide');
                    PageEvent($("a.pagination-active").text());
                }
                else {
                    var scare = $("#questionscare").val(), itema = $("#questionitema").val(), itemb = $("#questionitemb").val(), itemc = $("#questionitemc").val(), itemd = $("#questionitemd").val(), iteme = $("#questioniteme").val(), itemf = $("#questionitemf").val(), answer = $("#questionanswer").val();
                    $("#ContentDiv").html(mesg);
                    IEStyle();
                    $("#questionscare").val(scare);
                    $("#questionitema").val(itema);
                    $("#questionitemb").val(itemb);
                    $("#questionitemc").val(itemc);
                    $("#questionitemd").val(itemd);
                    $("#questioniteme").val(iteme);
                    $("#questionitemf").val(itemf);
                    $("#questionanswer").val(answer);
                }
                reloadmyalldata();
            });
            return true;
        }
        return false;
    }
        //新增多选题的提交在这里
    else if (ttype == "多选题") {
        if ($("#questionitema,#questionitemb,#questionitemc,#questionitemd,#questioniteme,#questionitemf,#questionanswer").Jqvalidate()) {
            $("#Content").val(getMultipleChoiceContentString());
            var options = $("form").serialize();
            $.post(PoolName + "/Question/Create", data = options, function (mesg) {
                if (mesg.Key) {
                    $.messager.alert("提示","新增试题成功");
                    $("#ContentDiv").modal('hide');
                    PageEvent($("a.pagination-active").text());
                }
                else {
                    var scare = $("#questionscare").val(), itema = $("#questionitema").val(), itemb = $("#questionitemb").val(), itemc = $("#questionitemc").val(), itemd = $("#questionitemd").val(), iteme = $("#questioniteme").val(), itemf = $("#questionitemf").val(), answer = $("#questionanswer").val();
                    $("#ContentDiv").html(mesg);
                    IEStyle();
                    $("#questionscare").val(scare);
                    $("#questionitema").val(itema);
                    $("#questionitemb").val(itemb);
                    $("#questionitemc").val(itemc);
                    $("#questionitemd").val(itemd);
                    $("#questioniteme").val(iteme);
                    $("#questionitemf").val(itemf);
                    $("#questionanswer").val(answer);
                }
                reloadmyalldata();
            });
            return true;
        }
        return false;
    }
        //新增判断题的提交在这里
    else if (ttype == "判断题") {
        if ($("#questionanswer").Jqvalidate()) {
            $("#Content").val(getJudgeQuestionContentString());
            var options = $("form").serialize();
            $.post(PoolName + "/Question/Create", data = options, function (mesg) {
                if (mesg.Key) {
                    $.messager.alert("提示","新增试题成功");
                    $("#ContentDiv").modal('hide');
                    PageEvent($("a.pagination-active").text());
                }
                else {
                    var scare = $("#questionscare").val(), answer = $("#questionanswer").val();
                    $("#ContentDiv").html(mesg);
                    IEStyle();
                    $("#questionscare").val(scare);
                    $("#questionanswer").val(answer);
                }
                reloadmyalldata();
            });
            return true;
        }
        return false;
    }
        //新增问答题的提交在这里
    else if (ttype == "问答题") {
        if ($("#questionanswer").Jqvalidate()) {
            $("#Content").val(getAnswerQuestionContentString());
            var options = $("form").serialize();
            $.post(PoolName + "/Question/Create", data = options, function (mesg) {
                if (mesg.Key) {
                    $.messager.alert("提示","新增试题成功");
                    $("#ContentDiv").modal('hide');
                    PageEvent($("a.pagination-active").text());
                }
                else {
                    var scare = $("#questionscare").val(), answer = $("#questionanswer").val();
                    $("#ContentDiv").html(mesg);
                    IEStyle();
                    $("#questionscare").val(scare);
                    $("#questionanswer").val(answer);
                }
                reloadmyalldata();
            });
            return true;
        }
        return false;
    }
        //新增3D仿真实验题的提交在这里
    else if (ttype == "3D仿真实验题") {
    	//console.log("新增3D仿真实验题的提交")
        if ($("#questionanswer").Jqvalidate()) {
            $("#Content").val(get3DQuestionContentString());
            var options = $("form").serialize();
            //console.log("新增3D仿真实验题的提交")
            $.post(PoolName + "/Question/Create", data = options, function (mesg) {
                if (mesg.Key) {
                    $.messager.alert("提示","新增试题成功");
                    $("#ContentDiv").modal('hide');
                    PageEvent($("a.pagination-active").text());
                }
                else {
                    var scare = $("#questionscare").val(), answer = $("#questionanswer").val();
                    $("#ContentDiv").html(mesg);
                    IEStyle();
                    $("#questionscare").val(scare);
                    $("#questionanswer").val(answer);
                }
                reloadmyalldata();
            });
            return true;
        }
        return false;
    }
}

//新增试题获取填空试题内容的函数在这里
function getFillQuestionContentString() {
    return "<智能题><题干>" + $("#Title").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</题干><类型>填空题</类型><场景>" + $("#questionscare").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</场景><答案列表><填空1>"
            + $.trim($("#questionitema").val()).replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</填空1><填空2>" + $.trim($("#questionitemb").val()).replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</填空2><填空3>" + $.trim($("#questionitemc").val()).replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</填空3><填空4>" + $.trim($("#questionitemd").val()).replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</填空4></答案列表></智能题>";
}

//新增试题获取单选试题内容的函数在这里
function getSingleChoiceContentString() {
    return "<智能题><题干>" + $("#Title").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</题干><类型>单选题</类型><场景>" + $("#questionscare").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</场景><选项列表><选项A>"
             + $("#questionitema").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</选项A><选项B>" + $("#questionitemb").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</选项B><选项C>" + $("#questionitemc").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</选项C><选项D>" + $("#questionitemd").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</选项D><选项E>"
             + (($("#questioniteme").length == 0) ? "" : $("#questioniteme").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;")) + "</选项E><选项F>"
             + (($("#questionitemf").length == 0) ? "" : $("#questionitemf").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;")) + "</选项F></选项列表><答案>" + $("#questionanswer").find("input:checked").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</答案></智能题>";
}

//新增试题获取多选试题内容的函数在这里
function getMultipleChoiceContentString() {
    var checkedanswer = "";
    $("#questionanswer").find("input:checked").each(function (index) {
        if (index > 0) {
            checkedanswer += "," + $(this).val();
        }
        else {
            checkedanswer += $(this).val();
        }
    });
    return "<智能题><题干>" + $("#Title").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</题干><类型>多选题</类型><场景>" + $("#questionscare").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</场景><选项列表><选项A>"
              + $("#questionitema").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</选项A><选项B>" + $("#questionitemb").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</选项B><选项C>" + $("#questionitemc").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</选项C><选项D>" + $("#questionitemd").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</选项D><选项E>"
              + (($("#questioniteme").length == 0) ? "" : $("#questioniteme").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;")) + "</选项E><选项F>"
              + (($("#questionitemf").length == 0) ? "" : $("#questionitemf").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;")) + "</选项F></选项列表><答案>" + $.trim(checkedanswer).replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</答案></智能题>";
}

//新增试题获取判断试题内容的函数在这里
function getJudgeQuestionContentString() {

    return "<智能题><题干>" + $("#Title").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</题干><类型>判断题</类型><场景>" + $("#questionscare").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</场景><答案>" + $("#questionanswer").find("input:checked").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</答案></智能题>";
}

//新增试题获取问答试题内容的函数在这里
function getAnswerQuestionContentString() {
    return "<智能题><题干>" + $("#Title").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</题干><类型>问答题</类型><场景>" + $("#questionscare").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</场景><答案>" + $("#questionanswer").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</答案></智能题>";
}
//新增试题获取3D仿真实验题内容的函数在这里
function get3DQuestionContentString() {
    return "<智能题><题干>" + $("#Title").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</题干><类型>3D仿真实验题</类型><step>" + $("#Step").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</step><type>lcg</type><场景>" + $("#questionscare").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</场景><安装目录>" + $("#questionanswer").val().replace(new RegExp(/</g), "&lt;").replace(new RegExp(/>/g), "&gt;") + "</安装目录></智能题>";
}

function IEStyle() {
    if ((navigator.userAgent.indexOf("Mozilla") != -1 && navigator.userAgent.indexOf("Firefox") == -1 && navigator.userAgent.indexOf("Chrome") == -1) || navigator.userAgent.indexOf("MSIE") != -1) {
        $("#addanswerare").css({ margin: "-3% 0 0 5px" });
    }
    else if ((navigator.userAgent.indexOf("Mozilla") != -1 && navigator.userAgent.indexOf("Firefox") == -1 && navigator.userAgent.indexOf("Chrome") != -1) || navigator.userAgent.indexOf("MSIE") != -1) {
        $("#addanswerare").css({ margin: "-7% 0 0 5px" });
    }
}

function addansmatchblank() {
    var count = 0, reg = "______", questitle = "";
    if ((navigator.userAgent.indexOf("Mozilla") != -1 && navigator.userAgent.indexOf("Firefox") == -1 && navigator.userAgent.indexOf("Chrome") == -1) || navigator.userAgent.indexOf("MSIE") != -1) {
        questitle += $("#Title").text();
    }
    else {
        questitle += $("#Title").val();
    }
    $("#questionitema,#questionitemb,#questionitemc,#questionitemd").each(function () {
        //console.log($(this).val())
        if ($.trim($(this).val()).length > 0) {
            count++;
        }
    });
    var ii = questitle.split(reg);
   
    
    if (questitle.split(reg).length - 1 == count) {
        return true;
    }
    else {
        return false;
    }
}




//-----------------------
