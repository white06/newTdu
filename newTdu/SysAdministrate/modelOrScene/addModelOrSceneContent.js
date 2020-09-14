/**
 * Created by TDU on 2019/12/30.
 */
var settingQuestion ={
    view:{
        showIcon:true,
        addHoverDom:addHoverDom,
        removeHoverDom:removeHoverDom,
        selectedMulti:false
        //		fontCss:{color:"blue",font-size:"16px"}
    },
    data:{
        keep:{
            leaf:true,
            parent:true
        },
        simpleData:{
            enable:true
        }
    },
    callback: {
        onClick: onClick//点击打开页面
    }
};

/// <reference path="jquery-1.10.2.js" />
var HomeWorkname;
var HomeWorkId;
//ztree点击事件
function onClick(event,treeId, treeNode){
    if(treeNode.children==null){
        showKnowledge(treeNode.id,treeNode.name);
    }
}

function showKnowledge(tid,tname){
    $("#QuesKnowledge").empty();
    var html='';
    html='<option value="'+tid+'">'+tname+'</option>'
    $("#QuesKnowledge").append(html);
}
//刷新功能
function updatePage(){
    $("#treeDemo").empty();
    $(function () {
        //获取资源树
        GetSourceList();
        //获取当前的科目
        var subject = $(window.parent.document).find("#subject");
        //console.log("----")
        //展开或折叠全部节点
        $.fn.zTree.init($("#treeDemo"), setting, []);
        //获取科目根id
        GetSubjectRootId($("#sourcetree option:selected").val());
        //设置隐藏框的值
        $("#saveTreeNode").val($("#rootid").val());
        subject.off("change.Tree").on("change.Tree", function () {
            $("#prevlist tbody").html("");
            //获取科目id
            var selectedvalue = $('.choosesub',parent.document)[0].id;//parentwindow.find("#subject option:selected").val();
            if ($.trim(selectedvalue).length > 0) {
                $.get(houtaiurl+"SubjectTreeController/treeChange.action", data = { id: selectedvalue }, function (datas) {
                    if (datas.length > 0) {
                        $("#sourcetree").html("");
                        for (var item in datas) {
                            if (datas[item].status< 2) {
                                $("#sourcetree").append(' <option value="' + datas[item].id + '" title="">' + datas[item].treeName + '</option>');

                            }
                        }
                        $("#sourcetree").trigger("change");
                    }
                });
            }
            else {
                $.fn.zTree.init($("#treeDemo"), setting, []);
                if ($("#addcontent").length > 0) {
                    $("#loaduppartail").hide();
                    $("#addDocument,#addPDF").removeClass("selecteda");
                }
            }
        });
        subject.trigger("change.Tree");
        $("#sourcetree").off("change").on("change", function () {
            GetSubjectRootId($("#sourcetree option:selected").val());
            $.get(houtaiurl+"SubjectTreeController/seleKnowledges.action?random=" + Math.random(), data = { Id: $('.choosesub',parent.document)[0].id, treetype: $("#sourcetree option:selected").val() }, function (data) {
                //$.get(PoolName + "/Home/GetSubjectKnowledges?random=" + Math.random(), data = { subjectId: parentwindow.find("#subject option:selected").val(), treetype: $("#sourcetree option:selected").val() }, function (data) {
                var zNodes=data;
                $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                //$("#uploadtoolbars").css("display", "none");
                ztreeobj = $.fn.zTree.getZTreeObj("treeDemo");
                selectlist = ztreeobj.getSelectedNodes();
                $("#AddKnowledgeController").unbind("click").bind("click", { isParent: true, parentNode: ztreeobj.getNodeByParam("id", $("#rootid").val(), null) }, add);
                $("#saveTreeNode").val($("#rootid").val());
                $("#addcontent").trigger("click");
                //GetNewDatas(true, "");
            });
        });
        $("#updateJS").click(function () {
            parentwindow.find("#update_modal").show();
            parentwindow.find("#updatemodal").show();
            if ($.trim($('.choosesub',parent.document)[0].id).length > 0) {
                $.post(houtaiurl+"SubjectTreeController/UpdateJS?Id=" + $('.choosesub',parent.document)[0].id, data = { treetype: $("#sourcetree option:selected").val() }, function (data) {
                    if (data.Key) {
                        parentwindow.find("#updatemodal").hide();
                        parentwindow.find("#update_modal").hide();

                        $.messager.confirm('系统提示', data.Value, function (r) {
                            if (r) {
                                window.location.reload();
                                $.fn.zTree.init($("#treeDemo"), setting, []);
                            }
                        });

                    }
                });
            }
            else {
                $.messager.alert("提示","请选择要更新的科目");
            }
        });
        $("#ChangeOldToNew").click(function () {
            parentwindow.find("#update_modal").show();
            parentwindow.find("#updatemodal").show();
            if ($.trim($('.choosesub',parent.document)[0].id).length > 0) {
                $.post(houtaiurl + "/Knowledge/ChangeOldToNew", data = {  }, function (data) {
                    $.messager.alert("提示",data);
                });
            }

        });

    });
}
function addUploading(){
    var url=houtaiurl+"AddKnowledgeController/addUploading.action";
    //资源名
    var customname=$("#customname").val();
    //资源介绍
    var introduce=$("#introduce").val();
    //资源样式
    var customstyle=$("#customstyle2").val();
    //添加文件
    var brosweFile=$("#brosweFile").val();

    var File1 = $("#fileupload")[0].files[0];
    if(File1==undefined){
        $.messager.alert("提示","上传的文件不存在！");
        return ;
    }
    //获取科目树id
    var subjectTreeId=$("#sourcetree").val();
    var treeNodeId=$("#saveTreeNode").val();
    console.log("subjectTreeId  :"+subjectTreeId+"  treeNodeId:"+treeNodeId);
    var data= new FormData;
    var type=$(".active");
    for(var i=0;i<type.length;i++){
        var typeid=$(type[i])[0].id;
        if(typeid=="addPhoto"||typeid=="addVideo"||typeid=="addDocument"||typeid=="addPDF"||typeid=="addFlash"||typeid=="addOSGJS"){
            data.append("customname",customname);
            data.append("introduce",introduce);
            data.append("customstyle",customstyle);
            data.append("brosweFile",brosweFile);
            data.append("subjectTreeId",subjectTreeId);
            data.append("treeNodeId",treeNodeId);
            data.append("type",typeid);
            data.append("file",File1);
            $.ajax({
                type:"POST",
                url: houtaiurl+url,
                data:data,
                contentType:false,
                processData:false,
                success:function(data){
                    if(data=="ok"){
                        $.messager.alert("提示","上传成功！");
                        updatePage();
                    }else{
                        $.messager.alert("提示","上传失败!");
                    }
                }
            });
        }
    }

}
function changefile(){
    var file = $("#fileupload").val();
    $("#brosweFile").val(file);
}


$(function () {
    getUserId();
    $("#newsource").on("click", function () {
        $("#addVideo,#addDocument,#addPDF,#addSimulite,#addQues").each(function () {
            if ($(this).hasClass("active")) {
                $(this).trigger("click");
            }
        });
    });
    $(document).on("click", "#addcontent", function () {
        $("#loaduppartail").show();
        $("#addVideo,#addDocument,#addPDF,#addSimulite,#addQues").show();
        $("#addVideo,#addDocument,#addPDF,#addSimulite,#addQues").removeClass("active");
        $("#fileuploadform,#simuliteform").hide();
    });
    $("#addVideo,#addDocument,#addPDF,#addOSGJS").on("click", function () {
        $("#sourcelist tbody").html("");
        hidenform();
        $("#tdqt-tab").find("a").removeClass("active");
        prevSourceListDefault();
        $(this).addClass("active");
        var $this = $(this);
        var $thisid = $(this).prop("id");
        $("#customform").hide();
        $("#HomeWorkform").hide();
        $("#simuliteform").hide();
        $("#fileuploadform").hide();
        $("#Quesform").hide();
        $('#filelistholder').addClass('hide');
        $("#fileupload").val("");
        $('#brosweFile').val("");
        $('#filelistholder').children().remove();
        $("#sourcelist tbody").append('<tr><td style="max-width:160px"><input type="text"id="customname" data-val-required="资源名称不能为空" /></td><td><input type="text" id="introduce"/></td>' +
            '<td><select id="customstyle2">' + '<option value="default">随机色</option>' +
            '<option value="widget_orange">橘色</option>' +
            '<option value="widget_purple">紫色</option>' +
            '<option value="widget_darkgreen">深绿色</option>' +
            '<option value="widget_red">红色</option>' +
            '<option value="widget_blue">蓝色</option>' +
            '<option value="widget_yellow">黄色</option>' +
            '<option value="widget_grey">灰色</option>' +
            '<option value="widget_green">绿色</option>' +
            '<option value="widget_darkblue">深蓝色</option>' +
            '<option value="widget_darkred">深红色</option>' +
            '</select></td><td><input id="startUpload" class="btn btn-primary btn-large" value="添加上传" type="button" onclick="addUploading()"/></td></tr>');


        setTimeout(function () {
            $("#fileuploadform").show();
        }, 100);
    });
    $("#addSimulite").on("click", function () {
        defaultsimulate();
        hidenform();
        $("#simuliteform form").append('<div class="form-group" id="newsimulate"><span class="col-md-offset-5 col-lg-offset-5 col-xs-offset-5 col-sm-offset-5" href="javascript:;"><input id="addsimulate" class="btn btn-primary" type="button" value="添加仿真" style="margin-left:0px;" /></span></div>');
        $("#addVideo,#addDocument,#addPDF,#addQues,#addCustom,#addExamList").removeClass("active");
        $(this).addClass("active");
        $("#fileuploadform").hide();
        $("#HomeWorkform").hide();
        $("#Quesform").hide();
        $("#Examform").hide();
        $("#customform").hide();
        $("#simuliteform").show();
        prevSourceListDefault();
        $("#addsimulate").off("click").on("click", function () {
            var parasxml = "<PARAS><url>" + $("#urladdress").val() + "</url><params>" + $("#scan").val() + "</params><step>" + $("#step").val() + "</step><substep>" + $("#substep").val() + "</substep><TDuViewerFolder>" + $("#TDuViewerFolder").val() + "</TDuViewerFolder></PARAS>";
            $.ajax({
                url: houtaiurl+ "AddKnowledgeController/IsKnowledgeContent.action",
                data: { id: $("#saveTreeNode").val()},
                type: "Post",
                async: false,
                success: function (data) {
                    if (data == "ok") {
                        $.messager.alert("提示","当前是知识点，不是目录，不能添加！");
                    }
                    else {
                        $.post(houtaiurl+"AddKnowledgeController/AddSimulateModel.action", data = { simulate: $("#urladdress").val(), KnowledgeId: $("#saveTreeNode").val(), name: $("#simulname").val(),treeId:$("#sourcetree").val() }, function (data) {

                            //更新数据，刷新界面
                            var index=document.getElementById("sourcetree").selectedIndex;//获取当前选择项的索引.
                            var	index_id=document.getElementById("sourcetree").options[index].value;
                            //document.location.reload();
                            document.getElementById('sourcetree').value=index_id;
                            GetNewDatas(true, "",index_id);
                            addnode(data, $("#simulname").val());
                            defaultsimulate();
                            $("#simuliteform,#Quesform,#fileuploadform,#HomeWorkform,#customform").hide();
                            $("#addSimulite").removeClass("active");

                        });
                    }
                }
            });

        });
    });
    //-
    $("#addQues").on("click", function () {
        defaultQues();
        hidenform();
        $("#Quesform form").append('<div class="form-group" id="newaddQues"><span class="col-md-offset-5 col-lg-offset-5 col-xs-offset-5 col-sm-offset-5" href="javascript:;"><input id="addques" class="btn btn-primary" type="button" value="添加题库" style="margin-left:0px;" /></span></div>');
        $("#addVideo,#addDocument,#addPDF,#addSimulite,#addCustom,#addExamList").removeClass("active");
        $(this).addClass("active");
        $("#fileuploadform").hide();
        $("#HomeWorkform").hide();
        $("#simuliteform").hide();
        $("#customform").hide();
        $("#Examform").hide();
        $("#Quesform").show();
        prevSourceListDefault();
        $("#addques").off("click").on("click", function () {
            var re = /^[1-9]+[0-9]*]*$/;
            var num = $("#Quesnum").val()*1;
            //console.log(num);
            if (!re.test(num)) {
                $.messager.alert("提示","随机数量不符合规则，请输入正整数！")
            }
            else {
                //-----此处添加get方法用于添加错题库
                var parasxml;
                var ttt=GetSubjectRootId($("#sourcetree option:selected").val());
                //console.log(ttt);
                if ($("#QuesType").val() == 1) {
                    var tt1=$('.choosesub',parent.document)[0].id;//$(window.parent.document).find("#subject").val();
                    parasxml = "<PARAS><url>/ErrorQues/RandomQuestionss/?subjectid=" + tt1 + "</url><num>" + $("#Quesnum").val() + "</num></PARAS>";
                }
                else if ($("#QuesType").val() == 2) {
                    parasxml = "<PARAS><url>/ErrorQues/ErrorQuestionlist/?kcid=" + ttt + "</url><num>" + $("#Quesnum").val() + "</num></PARAS>";
                }
                else if ($("#QuesType").val() == 3) {
                    parasxml = "<PARAS><url>/ErrorQues/RandomQuestions/?subjectid=all</url><num>" + $("#Quesnum").val() + "</num></PARAS>";
                } else if ($("#QuesType").val() == 4) {
                    parasxml = "<PARAS><url>/ErrorQues/RandomQuestions/?knowledgeId=" + $("#QuesKnowledge").val() + "</url><num>" + $("#Quesnum").val() + "</num></PARAS>";
                } else if($("#QuesType").val() == 5){
                    var a=$("#userId");
                    var userId=a.text();
                    parasxml = "<PARAS><url>/ErrorQues/RandomQuestions/?userShoucangId=" + userId+ "</url><num>收藏</num></PARAS>";
                } else if($("#QuesType").val()==6){
                    var a=$("#userId");
                    var userId=a.text();
                    parasxml = "<PARAS><url>/ErrorQues/RandomQuestions/?userErrorId=" + userId+ "</url><num>错题</num></PARAS>";
                }
                $.ajax({
                    url: houtaiurl+ "AddKnowledgeController/IsKnowledgeContent.action",
                    data: { id: $("#saveTreeNode").val() },
                    type: "Post",
                    async: false,
                    success: function (data) {
                        if (data == "ok") {
                            $.messager.alert("提示","当前是知识点，不是目录，不能添加！")
                        }
                        else {
                            $.post(houtaiurl+"AddKnowledgeController/AddQuesModel.action", data = { errorques: parasxml, KnowledgeId: $("#saveTreeNode").val(), name: $("#Quesname").val(), cusstyle: $("#Quesstyle option:selected").val() ,treeId:$("#sourcetree").val()}, function (data) {
                                var index=document.getElementById("sourcetree").selectedIndex;//获取当前选择项的索引.
                                var	index_id=document.getElementById("sourcetree").options[index].value;
                                //      	document.location.reload();
                                document.getElementById('sourcetree').value=index_id;
                                //     GetNewDatas(true, "",index_id);
                                //$("#sourcetree").trigger("change");
                                addnode(data, $("#Quesname").val())
                                defaultQues();
                                $("#simuliteform,#Quesform,#fileuploadform,#HomeWorkform,#customform").hide();
                                $("#addQues").removeClass("active");

                            });
                        }
                    }
                });
            }
        });
    });

    //-
    $("#addExamList").on("click", function () {
        console.log(1)
        hidenform();
        defaultQues();
        hidenform();
        showExamInfos();
        $("#Examform form").append('<div class="form-group" id="newaddExamList"><span class="col-md-offset-5 col-lg-offset-5 col-xs-offset-5 col-sm-offset-5" href="javascript:;"><input id="addexamList" class="btn btn-primary" type="button" value="添加考试" style="margin-left:0px;" /></span></div>');
        $("#addVideo,#addDocument,#addPDF,#addSimulite,#addCustom,#addExamList,#addQues").removeClass("active");
        $(this).addClass("active");
        $("#fileuploadform").hide();
        $("#HomeWorkform").hide();
        $("#simuliteform").hide();
        $("#customform").hide();
        $("#Quesform").hide();
        $("#Examform").show();
        prevSourceListDefault();
        $("#addexamList").off("click").on("click", function () {
            //定义考试名称
            var name=$("#Examname").val();
            //考卷id
            var examId=$("#examType").find("option:selected").val();
            if (name==null||name=='') {
                $.messager.alert("提示","请输入考试名称！");
            }else if(examId==null||examId==''){
                $.messager.alert("提示","请选择已发布的考试！");
            }else{
                var url = houtaiurl+"AddKnowledgeController/addExamModel.action"
                $.post(url, {
                    "name" : name,
                    "examId":examId,
                    "KnowledgeId": $("#saveTreeNode").val(),
                    "cusstyle":"default",
                    "treeId":$("#sourcetree").val()
                }, function(result) {
                    var index=document.getElementById("sourcetree").selectedIndex;//获取当前选择项的索引.
                    var	index_id=document.getElementById("sourcetree").options[index].value;
                    document.getElementById('sourcetree').value=index_id;
                    addnode(data, $("#Examname").val())
                    defaultQues();
                    $("#simuliteform,#Quesform,#fileuploadform,#HomeWorkform,#customform,#Quesform,#Examform").hide();
                    $("#addExamList").removeClass("active");
                });
            }
        });
    });
    //展示考试下拉考已经发布的考试
    function showExamInfos(){
        var subjectid = $('.choosesub',parent.document)[0].id;//$(window.parent.document).find("#subject").val();
        var url = houtaiurl+"ExamController/getPages.action";
        var html='';
        $.post(url, {
            "subjectid" : subjectid
        }, function(result) {
            for(var i=0;i<result.length;i++){

                html+='<option value="'+result[i].id+'">'+result[i].name+'</option>';
            }
            //console.log(html);
            $("#examType").empty();
            $("#examType").append(html);
        });
    }
    $("#addCustom").on("click", function () {
        defaultcustom();
        hidenform();
        $("#customform form").append('<div class="form-group" id="newaddcustom"><span class="col-md-offset-5 col-lg-offset-5 col-xs-offset-5 col-sm-offset-5" href="javascript:;"><input id="addcustom" class="btn btn-primary" type="button" value="添加自定义" style="margin-left:0px;" /></span></div>');
        $("#addVideo,#addDocument,#addPDF,#addSimulite,#addQues,#addExamList").removeClass("active");
        $(this).addClass("active");
        $("#fileuploadform").hide();
        $("#simuliteform").hide();
        $("#Quesform").hide();
        $("#HomeWorkform").hide();
        $("#Examform").hide();
        $("#customform").show();
        prevSourceListDefault();
        $("#addcustom").off("click").on("click", function () {
            //-----此处添加get方法用于添加错题库
            if ($("#customaddress").val().indexOf("http")<0) {
                var parasxml = "<PARAS><type>2</type><url>" + $("#customaddress").val() + "</url></PARAS>";
            }
            else {
                var parasxml = "<PARAS><type>1</type><url>" + $("#customaddress").val() + "</url></PARAS>";
            }
            console.log($("#saveTreeNode").val() )
            $.ajax({
                url: houtaiurl+ "AddKnowledgeController/IsKnowledgeContent.action",
                data: { id: $("#saveTreeNode").val() },
                type: "Post",
                async: false,
                success: function (data) {
                    if (data == "ok") {
                        $.messager.alert("提示","当前是知识点，不是目录，不能添加！")
                    }
                    else {
                        $.post(houtaiurl+"AddKnowledgeController/AddCustomModel.action", data = { errorques: parasxml, KnowledgeId: $("#saveTreeNode").val(), name: $("#customName").val(), cusstyle: $("#customstyle option:selected").val() ,treeId:$("#sourcetree").val()}, function (data) {
                            var index=document.getElementById("sourcetree").selectedIndex;//获取当前选择项的索引.
                            var	index_id=document.getElementById("sourcetree").options[index].value;
                            // 	document.location.reload();
                            document.getElementById('sourcetree').value=index_id;
                            //     GetNewDatas(true, "",index_id);
                            //$("#sourcetree").trigger("change");
                            addnode(data, $("#customName").val())
                            defaultQues();
                            $("#simuliteform,#Quesform,#fileuploadform,#HomeWorkform,#customform").hide();
                            $("#addCustom").removeClass("active");
                            //console.log($("#sourcetree"));

                        });
                    }
                }
            });

        });
    });

    $("#addfromMaterial").on("click", function () {
        var type = $("#tdqt-tab").find(".active")[0].id;
        var treenametype = "";
        $("#dlgmaterial").html("");
        if (type == "addPhoto") {
            treenametype = "图片素材库";
        } else if (type == "addVideo") {
            treenametype = "媒体素材库";
        } else if (type == "addFlash") {
            treenametype = "SWF素材库";
        } else if (type == "addDocument") {
            treenametype = "Office文档素材库";
        } else if (type == "addPDF") {
            treenametype = "PDF素材库";
        } else if (type == "addHtml") {
            treenametype = "HTML素材库";
        }
        var photohtml = '<script type="text/javascript">var settingphoto = {view: {selectedMulti: false}, edit: {enable: false, editNameSelectAll: false }, callback: {onClick: onClickPhoto,}, data: {simpleData: {enable: true}},};var ztreeobjphoto = $.fn.zTree.getZTreeObj("treeDemophoto");' +

            'function onClickPhoto(event, treeId, treeNode){//console.log(treeNode);$("#leftsourceid").val(treeNode.id);$("#leftcontentid").val(treeNode.Contentid)} function gettree(){$.get(PoolName + "/Subject/PsubjectChange?random=" + Math.random(), data = { Id: $(window.parent.document).find("#subject").val(), treetype: "' + treenametype + '" }, function (data) {data;$.fn.zTree.init($("#treeDemophoto"), settingphoto, zNodes);            ztreeobjphoto= $.fn.zTree.getZTreeObj("treeDemophoto");     });}</script>'
            + '<h3 style="margin-left:10%；font-size:18px;">' + treenametype + '</h3><input type="hidden" value="" id="leftsourceid"/><input type="hidden" value="" id="leftcontentid"/><hr/><ul id="treeDemophoto" class="ztree" style="margin-left:0%;width:100%"></ul><hr/><button style="width:100%;height:100px;border-radius:5px;margin-left:0%;font-size:22px;font-family:\'微软雅黑\';background:#00A1FF;" onclick="addnewsource()">添加选中项</button>';
        $("#dlgmaterial").append(photohtml)

        $("#dlgmaterial").dialog('open');
        gettree();

    })
    $("#dlgmaterial").dialog('close');
    $("#dlgbeforsetting").dialog('close');
});
function addnewsource() {
    // $.messager. $.messager.alert("提示",'提示', '未选中树节点!');
    var rightid = $("#saveTreeNode").val();
    var sourceid=$("#leftsourceid").val();
    var contentid = $("#leftcontentid").val();
    var subjectidd = $(window.parent.document).find("#subject").val();
    if (sourceid.length == 36) {
        if (contentid.length == 36 && contentid != "00000000-0000-0000-0000-000000000000") {
            $.ajax({
                type: "POST",
                data: { leftid: sourceid, rightid: rightid, leftsubjectid: subjectidd, rightsubjectid: subjectidd },
                url: houtaiurl + "/subjectTree/CopytoRight",
                async: false,
                success: function (data) {
                    if (data == "ok") {
                        $.messager.alert('提示', '添加成功!');
                        $("#sourcetree").trigger("change");
                        $("#dlgmaterial").dialog('close');
                    }

                }
            });

        } else {
            $.messager.alert('提示', '未选择正确的素材节点!');
        }
    } else {
        $.messager.alert('提示', '未选择正确的素材节点!');
    }
}
function addnode(mesg,name) {
    var knowid;
    $.ajax({
        url: houtaiurl+ 'AddKnowledgeController/getknowidbycontentid.action',
        data: { id: mesg },
        type: 'POST',
        async: false,
        success: function (data) {
            knowid = data;
        }
    });
    var newNodehtml = { id: knowid, name: name, knowledgecontentId: mesg ,ImageIcons:"Source/imgicon/tag_orange.png"};

    newNodehtml = ztreeobj.addNodes(ztreeobj.getNodeByParam("id", $("#saveTreeNode").val()), newNodehtml);
}
function defaultQues() {
    $("#Quesname").val("题库");
    $("#Quesstyle option:first").prop({ selected: "true" });
    $("#Quesnum").val("10");

}
function hidenform() {
    $("#editsimulate,#newsimulate,#newaddQues,#editQues,#newaddcustom,#editcustom,#newaddHomeWork,#editHomeWork,#myframehomeworkedit,#myframehomeworkdelete,#myframehomeworkcreate,#myframeexam,#addmyexam").remove();
}
function defaultcustom() {
    $("#customName").val("自定义");
    $("#customaddress").val("");
    $("#customstyle option:first").prop({ selected: "true" });
    $("#customType option:first").prop({ selected: "true" });

}
function defaultsimulate() {
    $("#simulname").val("3D仿真");
    $("#style option:first").prop({ selected: "true" });
    $("#urladdress").val("SimulatModel");
    $("#scan").val("default.exm");
    $("#step").val("0");
    $("#TDuViewerFolder").val("");
    $("#substep").val("0");
}
//新增科目节点的函数在这里！
function add(e) {
    ztreeobj = $.fn.zTree.getZTreeObj("treeDemo")
    //console.log(e);
    //console.log(e.pId+"----"+e.parentTId	);
    $("span.add,span.remove,span.edit").hide();
    var selectedtree = $("#sourcetree option:selected").val();
    if ($.trim(selectedtree).length > 0) {
        str = "",
            isParent = e.data.isParent;
        var parentId = "";
        var preknowledge;
        if (isParent) {
            newNode = ztreeobj.addNodes(e.data.parentNode, { id: "", isParent: isParent, name: "new node" + (++parentcount) });
            preknowledge = newNode[0].getPreNode();
            str = "random=" + Math.random() + "&Content=" + newNode[0].name + "&id=" + $("#rootid").val() + "&lei=" + ((preknowledge == undefined) ? "" : preknowledge.id) +
                "&subid=" + selectedtree;
            //console.log(str)
        }
        else {
            newNode = ztreeobj.addNodes(e.data.parentNode, { id: "", isParent: isParent, name: "" });
            //console.log(newNode);
            newNode[0].name = newNode[0].getParentNode().name + "-" + (++childCount);
            parentId = newNode[0].getParentNode().id;
            //console.log(parentId);
            preknowledge = newNode[0].getPreNode();
            str = "random=" + Math.random() + "&Content=" + newNode[0].name + "&id=" + parentId + "&lei=" + ((preknowledge == undefined) ? "" : preknowledge.id) +
                "&subid=" + selectedtree;
            //console.log(newNode[0].name)
            ztreeobj.updateNode(newNode[0]);
            //console.log(str)
        }
        ////console.log(PoolName);
        ztreeobj.editName(newNode[0]);

        console.log(str)
        $.ajax({
            type: "Post",
            url: houtaiurl+ "TreesController/ins.action",
            data:str,
            async: false,
            success: function (data) {
                newNode[0].id = data.id;//data.Value;
                selectlist = [];
                $("#saveTreeNode").val(data);//$("#saveTreeNode").val(data.Value);
                var index=document.getElementById("sourcetree").selectedIndex;//获取当前选择项的索引.
                var	index_id=document.getElementById("sourcetree").options[index].value;
                //	document.location.reload();
                document.getElementById('sourcetree').value=index_id;
                //     GetNewDatas(true, "",index_id);
                $("span.add,span.remove,span.edit").show();
                //console.log("结束")
                ztreeobj.refresh();
                //}
                //updatePage();
            }
        });
    }
    else {
        $.messager.alert("提示","请选择添加知识点的科目树");
    }
};

function showQuesSubKnow() {
    if ($("#QuesType").val() == 4) {
        $("#sunm").show();
        $.ajax({
            type: "Post",
            url: secondeurl+ "ExercisesController/getAllSub.action",
            async: false,
            success: function (data) {
                var html='';
                for(var i=0;i<data.length;i++){
                    html+='<option value="'+data[i].id+'">'+data[i].subjectName+'</option>'
                }
                $("#Quessubject").append(html);
            }
        });
        $("#Quessubjectdiv").show();


    }else if($("#QuesType").val() == 5||$("#QuesType").val()==6){
        $("#Quessubjectdiv").hide();
        $("#QuesKnowledgediv").hide();
        $("#sunm").hide();
    }else {
        $("#sunm").show();
        $("#Quessubjectdiv").hide();
        $("#QuesKnowledgediv").hide();
    }
}
function showKnowled() {
    $.ajax({
        url: houtaiurl+ "ExercisesController/getKnowledgeZtree.action",
        type: "Post",
        data: { subid: $("#Quessubject").val() },
        async: false,
        success: function (data) {
            ShowQuestionZtree(data);
        }
    });
    $("#QuesKnowledgediv").show();
    $(".ztreeQuestion").show();


}

function getUserId(){
    $.ajax({
        url: secondeurl+ "ExercisesController/getUserId.action",
        type: "Post",
        async: false,
        success: function (userId) {
            var a=$("#userId");
            a.empty();
            a.append(userId);
        }
    });
}

function ShowQuestionZtree(result){
    $.fn.zTree.init($(".ztreeQuestion"), settingQuestion, result);
}