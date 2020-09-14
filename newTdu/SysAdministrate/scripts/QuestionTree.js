/// <reference path="../Scripts/jquery.ztree.core-3.5.js" />

var setting = {
    view: {
        showIcon: true,
        addHoverDom: addHoverDom,
        removeHoverDom: removeHoverDom,
        selectedMulti: false
    },
    edit: {
        enable: true,
        editNameSelectAll: true
    },
    callback: {
        beforeEditName: beforeEditName,
        beforeRename: beforeRename,
        beforeRemove: beforeRemove,
        onClick: onClick,
        beforeDrag: beforeDrag,
        onDrop: onDrop
    },
    data: {
        simpleData: {
            enable: true
        }
    },
};
var abc;
var ztreeobj = $.fn.zTree.getZTreeObj("treeDemo");
var selectlist;

//当鼠标放在树上时新增图标的显示和图标绑定新增函数！
function addHoverDom(treeId, treeNode) {
    //console.log(" addHoverDom : "+treeId)
    //console.log(treeNode)
    /*var sObj = $("#" + treeNode.tId + "_span");
    if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
    var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
        + "' title='add node'onfocus='this.blur();'></span>";
    sObj.after(addStr);//添加新增的图标！
    var btn = $("#addBtn_" + treeNode.tId);
    if (btn) btn.bind("click", { isParent: false, parentNode: treeNode }, add);*/

    if(treeNode.knowledgecontentId == "00000000-0000-0000-0000-000000000000") {
        var sObj = $("#" + treeNode.tId + "_span");
        if(treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
        var addStr = "<span class='button add' id='addBtn_" + treeNode.tId +
            "' title='add node'onfocus='this.blur();'></span>";
        sObj.after(addStr); //添加新增的图标！
        //console.log("添加新增按钮");
        var btn = $("#addBtn_" + treeNode.tId);
        if(btn) btn.bind("click", {
            isParent: false,
            parentNode: treeNode
        }, add);
    } else {

    }

    if(treeNode.level==0&&treeNode.isParent==true){
        var sObj = $("#" + treeNode.tId + "_span");
        if(treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
        var addStr = "<span class='button add' id='addBtn_" + treeNode.tId +
            "' title='add node'onfocus='this.blur();'></span>";
        sObj.after(addStr); //添加新增的图标！
        //console.log("添加新增按钮");
        var btn = $("#addBtn_" + treeNode.tId);
        if(btn) btn.bind("click", {
            isParent: false,
            parentNode: treeNode
        }, add);
    }
};

//当鼠标离开树时新增图标的隐藏和图标绑定事件的解除！
function removeHoverDom(treeId, treeNode) {
    console.log(" removeHoverDom : "+treeId)
    console.log(treeNode)
    //$("#addBtn_" + treeNode.tId).unbind().remove();
    $("#addBtn_" + treeNode.tId).unbind().remove();
};
var childCount = 0;
var parentcount = 0;
var parentwindow = $(window.parent.document);
//console.log(parentwindow)
//新增科目节点的函数在这里！
function add(e) {
    ztreeobj = $.fn.zTree.getZTreeObj("treeDemo")
    console.log(e);
    console.log(e.pId+"----"+e.parentTId	);
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
            console.log(str)
        }
        else {
            newNode = ztreeobj.addNodes(e.data.parentNode, { id: "", isParent: isParent, name: "" });
            console.log(e.data.parentNode);
            console.log(newNode);
            newNode[0].name = newNode[0].getParentNode().name + "-" + (++childCount);
            parentId = newNode[0].getParentNode().id;
            console.log(parentId);
            console.log(newNode[0]);
            console.log(newNode[0].name);

            preknowledge = newNode[0].getPreNode();
            str = "random=" + Math.random() + "&Content=" + newNode[0].name + "&id=" + parentId + "&lei=" + ((preknowledge == undefined) ? "" : preknowledge.id) +
                "&subid=" + selectedtree;
            console.log(newNode[0].name)
            ztreeobj.updateNode(newNode[0]);
            console.log(str)
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
                ztreeobj.reAsyncChildNodes ();
                //ztreeobj.refresh();
                //}
                //updatePage();
            }
        });
    }
    else {
        $.messager.alert("提示","请选择添加知识点的科目树");
    }
    /*$("span.add,span.remove,span.edit").hide();
    var selectedtree = $("#sourcetree option:selected").val();
    if ($.trim(selectedtree).length > 0) {
        str = "",
        isParent = e.data.isParent;
        var parentId = "";
        var preknowledge;
        if (isParent) {
            newNode = ztreeobj.addNodes(e.data.parentNode, { id: "", isParent: isParent, name: "new node" + (++parentcount) });
            preknowledge = newNode[0].getPreNode();
            str = "random=" + Math.random() + "&Content=" +encodeURI(encodeURI(newNode[0].name)) + "&ParentKnowledge=" + $("#rootid").val() + "&PreKnowledge=" + ((preknowledge == undefined) ? "" : preknowledge.id) +
                   "&treeId=" + selectedtree;
        }
        else {
            newNode = ztreeobj.addNodes(e.data.parentNode, { id: "", isParent: isParent, name: "" });
            newNode[0].name = newNode[0].getParentNode().name + "-" + (++childCount);
            parentId = newNode[0].getParentNode().id;
            preknowledge = newNode[0].getPreNode();
            str = "random=" + Math.random() + "&Content=" + encodeURI(encodeURI(newNode[0].name)) + "&ParentKnowledge=" + parentId + "&PreKnowledge=" + ((preknowledge == undefined) ? "" : preknowledge.id) +
                   "&treeId=" + selectedtree;
            ztreeobj.updateNode(newNode[0]);
        }
        ztreeobj.editName(newNode[0]);
        $.ajax({
            type: "POST",
            url: houtaiurl + "QuestionController/addKnowledge.action?"+str,
            async: false,
            success: function (data) {
                if (data.Key) {
                    newNode[0].id = data.Value;
                    selectlist = [];
                    $("#saveTreeNode").val(data.Value);
                    GetNewDatas(true, "");
                    $("span.add,span.remove,span.edit").show();
                }
            }
        });
    }
    else {
        alert("请选择添加知识点的科目树");
    }*/

    /*$.post(houtaiurl + "/Subject/UpdateJS?Id=" + parentwindow.find("#subject option:selected").val(), data = { treetype: $("#sourcetree option:selected").val() }, function (data) {
        if (data.Key) {
            parentwindow.find("#updatemodal").hide();
            parentwindow.find("#update_modal").hide();
            //alert(data.Value);
            //window.location.reload();
            //$.fn.zTree.init($("#treeDemo"), setting, []);
        }
    });*/

};

//删除节点的操作函数在这里！
function beforeRemove(treeId, treeNode) {

    console.log(" beforeRemove : "+treeId)
    console.log(treeNode)
    ztreeobj.selectNode(treeNode);
    $("#saveTreeNode").val(treeNode.id);
    //GetNewDatas(true, "");
    selectlist = ztreeobj.getSelectedNodes();
    var parentdata = false;
    $.messager.confirm('系统提示', "确认删除该知识点？",
        function(r) {
            selectlist = [];
            $("#saveTreeNode").val($("#rootid").val());
            //GetNewDatas(true, "");
            var oldName = treeNode;
            var Id = treeNode.id;
            //console.log("Id:" + Id);

            if(r) {
                $.ajax({
                    url: houtaiurl+"SubjectTreeController/Remove.action?random=" + Math.random(),
                    data: {
                        Id: Id,
                        parent: true,
                        subjectId: $('.choosesub',parent.document)[0].id//parentwindow.find("#subject option:selected").val()
                    },
                    type: "get",
                    async: false,
                    dataType: "json",
                    success: function(data) {
                        $("#sourcetree").trigger("change");
                        //console.log(data.Key);
                        if(data.Key) {
                            parentdata = true;
                            //$.messager.alert("提示", data.Key);
                            $("#sourcetree").off("change").on("change", function() {
                                GetSubjectRootId($("#sourcetree option:selected").val());
                                $.get(houtaiurl+"SubjectTreeController/seleKnowledges.action?random=" + Math.random(), data = {
                                    Id:Id,
                                    treetype: treetype
                                }, function(data) {
                                    //$.get(PoolName + "/Home/GetSubjectKnowledges?random=" + Math.random(), data = { subjectId: parentwindow.find("#subject option:selected").val(), treetype: $("#sourcetree option:selected").val() }, function (data) {
                                    var zNodes = data;
                                    //console.log("addnode");
                                    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                                    //$("#uploadtoolbars").css("display", "none");
                                    ztreeobj = $.fn.zTree.getZTreeObj("treeDemo");
                                    selectlist = ztreeobj.getSelectedNodes();
                                    $("#addKnowledge").unbind("click").bind("click", {
                                        isParent: true,
                                        parentNode: ztreeobj.getNodeByParam("id", $("#rootid").val(), null)
                                    }, add);
                                    $("#saveTreeNode").val($("#rootid").val());
                                    $("#addcontent").trigger("click");
                                    //GetNewDatas(true, "");
                                });
                            });
                        } else {
                            parentdata = false;
                            //$.messager.alert("提示", data.Value);
                            $("#sourcetree").off("change").on("change", function() {
                                GetSubjectRootId($("#sourcetree option:selected").val());
                                $.get(houtaiurl+"SubjectTreeController/seleKnowledges.action?random=" + Math.random(), data = {
                                    Id: Id,
                                    treetype: treetype
                                }, function(data) {
                                    //$.get(PoolName + "/Home/GetSubjectKnowledges?random=" + Math.random(), data = { subjectId: parentwindow.find("#subject option:selected").val(), treetype: $("#sourcetree option:selected").val() }, function (data) {
                                    var zNodes = data;
                                    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                                    //$("#uploadtoolbars").css("display", "none");
                                    ztreeobj = $.fn.zTree.getZTreeObj("treeDemo");
                                    selectlist = ztreeobj.getSelectedNodes();
                                    $("#addKnowledge").unbind("click").bind("click", {
                                        isParent: true,
                                        parentNode: ztreeobj.getNodeByParam("id", $("#rootid").val(), null)
                                    }, add);
                                    $("#saveTreeNode").val($("#rootid").val());
                                    $("#addcontent").trigger("click");
                                    //GetNewDatas(true, "");
                                });
                            });
                        }

                    }
                });
            }
            $("#btnUploadAll").hide();
            $("#simuliteform").hide();
            $("#Quesform").hide();
            $("#HomeWorkform").hide();
            $("#fileuploadform").hide();
            $("#customform").hide();
            $('#filelistholder').addClass('hide');
            $("#fileupload").val("");
            $('#brosweFile').val("");
            $('#filelistholder').children().remove();

        });
    return parentdata;
    /*ztreeobj.selectNode(treeNode);
    $("#saveTreeNode").val(treeNode.id);
    GetNewDatas(true, "");
    selectlist = ztreeobj.getSelectedNodes();
    if (confirm("确认删除该知识点？")) {
        selectlist = [];
        $("#saveTreeNode").val($("#rootid").val());
        GetNewDatas(true, "");
        var oldName = treeNode
        var Id = treeNode.id;
        if (treeNode.isParent) {
            var parentdata = false;
            $.ajax({
                url: houtaiurl + "TreesController/deTree.action?random=" + Math.random(),
                data: { id: Id, filePath:"" },
                type: "POST",
                async: false,
                dataType: "json",
                success: function (data) {
                    if (data.Key) {
                        parentdata = true;

                       /!* $.post(houtaiurl + "/Subject/UpdateJS?Id=" + parentwindow.find("#subject option:selected").val(), data = { treetype: $("#sourcetree option:selected").val() }, function (data) {
                            if (data.Key) {
                                parentwindow.find("#updatemodal").hide();
                                parentwindow.find("#update_modal").hide();
                                //alert(data.Value);
                                //window.location.reload();
                                //$.fn.zTree.init($("#treeDemo"), setting, []);
                            }
                        });*!/
                    }
                    else {
                        parentdata = false;

                    }

                }
            });
            return parentdata;
        }
        else {
            var childdata = false;
            $.ajax({
                url: houtaiurl + "TreesController/deTree.action?random=" + Math.random(),
                data: { id: Id, filePath:"" },
                type: "POST",
                async: false,
                dataType: "json",
                success: function (data) {
                    if (data.Key) {
                        childdata = true;
                        $.post(houtaiurl + "/Subject/UpdateJS?Id=" + parentwindow.find("#subject option:selected").val(), data = { treetype: $("#sourcetree option:selected").val() }, function (data) {
                            if (data.Key) {
                                parentwindow.find("#updatemodal").hide();
                                parentwindow.find("#update_modal").hide();
                                //alert(data.Value);
                                //window.location.reload();
                                //$.fn.zTree.init($("#treeDemo"), setting, []);
                            }
                        });
                    }
                    else {
                        childdata = false;
                        window.location.reload();
                        $.fn.zTree.init($("#treeDemo"), setting, []);
                    }
                }
            });
            return childdata;
        }
    }
    return false;*/
}
//点击编辑按钮的出发事件！
function beforeEditName(treeId, treeNode) {
    console.log(" beforeEditName : "+treeId)
    console.log(treeNode)
    $("#saveTreeNode").val(treeNode.id);
}
//编辑节点的操作函数在这里！
function beforeRename(treeId, treeNode, newName) {
    console.log(" beforeRename : "+treeId)
    console.log(treeNode)
    console.log(newName)

    console.log(newName)
    selectlist = ztreeobj.getSelectedNodes();
    if($.trim(newName).length <= 0) {
        $.messager.alert("提示", "节点名称不能为空");
        GetNewDatasRename();
        return true;
    } else {
        ztreeobj = $.fn.zTree.getZTreeObj("treeDemo");
        var Id = treeNode.id;
        //newName=encodeURI(encodeURI(newName));
        console.log(newName);
        $.ajax({
            type:"POST",
            url:houtaiurl+"TreesController/beforeRename.action?",
            data :{
                newname: newName,
                Id: Id
            },
            success:function(res){
            }
        });
        //返回true允许tree的数据更新！
        return true;
    }

    /*selectlist = ztreeobj.getSelectedNodes();
    if ($.trim(newName).length <= 0) {
        alert("节点名称不能为空");
        setTimeout(function () { ztreeobj.editName(treeNode) }, 10);
        //返回false不允许tree的数据更新！
        return false;
    }
    else {
        ztreeobj = $.fn.zTree.getZTreeObj("treeDemo");
        var Id = treeNode.id;
        $.post(houtaiurl + "TreesController/upRandom.action?random=" + Math.random(), data = { name: newName, id: Id }, function (data) {
            if (data.Key) {
               /!* $.post(houtaiurl + "/Subject/UpdateJS?Id=" + parentwindow.find("#subject option:selected").val(), data = { treetype: $("#sourcetree option:selected").val() }, function (data) {
                    if (data.Key) {
                        parentwindow.find("#updatemodal").hide();
                        parentwindow.find("#update_modal").hide();
                        //alert(data.Value);
                        //window.location.reload();
                        //$.fn.zTree.init($("#treeDemo"), setting, []);
                    }
                });*!/
                return data.Key;

            }
            //else {
            //    alert(data.Value);
            //    treeNode.name = oldname;
            //    ztreeobj.updateNode(treeNode);
            //}
        });
        //返回true允许tree的数据更新！
        return true;
    }*/
}
//节点拖拽完成调用的函数在这里！
var beforedragnextnode = null;
function beforeDrag(treeId, treeNodes) {

    beforedragnextnode = treeNodes[0].getNextNode();
    return true;
}

function onDrop(event, treeId, treeNodes, targetNode, moveType) {
    if (moveType != null) {
        $.get(houtaiurl + "/Knowledge/Drag", data = {
            nextId: (treeNodes[0].getNextNode() === null) ? "" : treeNodes[0].getNextNode().id,
            nextprevknowledgeId: (treeNodes[0].getNextNode() === null) ? "" : treeNodes[0].id,
            prevId: (beforedragnextnode === null) ? "" : beforedragnextnode.id,
            prevprevknowledgeId: (beforedragnextnode === null) ? "" : ((beforedragnextnode.getPreNode() === null) ? "" : beforedragnextnode.getPreNode().id),
            selfId: treeNodes[0].id,
            selfprevknowledgeId: (treeNodes[0].getPreNode() === null) ? "" : treeNodes[0].getPreNode().id,
            selfparentknowledgeId: (treeNodes[0].pId === null) ? $("#rootid").val() : treeNodes[0].pId
        });
    }
}
//节点被点击后的事件函数在这里！
function onClick(event, treeId, treeNode) {

    console.log(" onClick : "+treeId)
    console.log(treeNode)
    console.log(event)


	/*knowId=treeNode.id;
	console.log(knowId,treeNode);
    ztreeobj.updateNode(treeNode);
    $("#saveTreeNode").val(treeNode.id);
    $("#question-tab li a").unbind("click").click(function () {
        $("#question-tab li a").removeClass("active");
        $(this).addClass("active");
    });
    $("#addQuestion").show();
    $("#question-tab li:first").find("a").trigger("click");
    //updateQuestionSelection();
    updateQuestion(treeNode.id);*/



    abc = treeNode;
    //$("#uploadtoolbars").css("display", "block");
    $("#addcontent").trigger("click");
    ztreeobj.updateNode(treeNode);
    $("#saveTreeNode").val(treeNode.id);
    //console.log(event.target.className.indexOf("add"))
    if(event.target.className.indexOf("add") == -1) {
        if(selectlist.length > 0) {

            if(selectlist[0].id == treeNode.id) {
                //取消选中
                ztreeobj.cancelSelectedNode(selectlist[0]);
                selectlist = []
                $("#saveTreeNode").val($("#rootid").val());
                $("#addDocument,#addPDF,#addSimulite,#addQues,#addExamList,#addCustom").show();
                $("#addDocument,#addPDF,#addsimulite,#addQues,#addExamList,#addCusto").removeClass("active");
                $("#simuliteform,#Quesform,#fileuploadform,#HomeWorkform,#Examform,#customform").hide();
            } else {
                showSource(treeNode.knowledgecontentId)
                selectlist = ztreeobj.getSelectedNodes();
            }
        } else {
            //第一次选中
            showSource(treeNode.knowledgecontentId)
            selectlist = ztreeobj.getSelectedNodes();
        }
    } else {

    }



}

function GetSubjectRootId(treety) {

    /*  12.7 暂时写死*/
    var subjectId = $('.choosesub',parent.document)[0].id;//"6050b62c-4afd-4cab-94c6-57b5c9578f10"
    $.ajax({
        type: "POST",
        url: houtaiurl + "SubjectTreeController/GetSubjectRootId.action",
        data: {
            subjectId: subjectId,
            treetype: treety,
            random: Math.random()
        },
        async: false,
        dataType: "json",
        success: function (data) {
            console.log(data)
            if (data.Key) {
                $("#rootid").val(data.Value);
            }

        }
    });
}
///--------
function GetNewDatas(isnew, strid) {
    $.post(houtaiurl + "QuestionController/GetPrevSourceList.action", data = { selesubjectid: $("#saveTreeNode").val() }, function (datas) {
        $("#prevlist tbody").html("");
        if (datas.length > 0) {
            for (var i in datas) {
                if (!isnew && strid == datas[i].knowledgecontentid) {
                    $("#prevlist tbody").append('<tr id="' + datas[i].knowledgecontentid + '"><td id="type">' + datas[i].type + '</td><td id="name">' + datas[i].customname + '</td><td><button class="btn btn-danger">查看</button></td></tr>');
                }
                else {
                    $("#prevlist tbody").append('<tr id="' + datas[i].knowledgecontentid + '"><td id="type">' + datas[i].type + '</td><td id="name">' + datas[i].customname + '</td><td><button class="btn btn-primary">查看</button></td></tr>');
                }
                $("#" + datas[i].knowledgecontentid).find("button").off("click").on("click", function () {
                    $("#prevlist tbody").find("button").each(function () {
                        if ($(this).hasClass("btn-danger")) {
                            $(this).removeClass("btn-danger");
                            $(this).addClass("btn-primary")
                        }
                    });
                    $(this).removeClass("btn-primary");
                    $(this).addClass("btn-danger");
                    var clickid = $(this).parents("tr").prop("id");
                    var filetype = $(this).parents("tr").find("#type").text();
                    switch (filetype) {
                        case "图片":
                            bindPrevSourceEvent("addPhoto", clickid);
                            break;
                        case "视频":
                            bindPrevSourceEvent("addVideo", clickid);
                            break;
                        case "音频":
                            bindPrevSourceEvent("addVideo", clickid);
                            break;
                        case "OFFICE文档":
                            bindPrevSourceEvent("addDocument", clickid);
                            break;
                        case "PDF":
                            bindPrevSourceEvent("addPDF", clickid);
                        case "Swf":
                            bindPrevSourceEvent("addFlash", clickid);
                            break;
                        case "仿真":
                            bindPrevSourceEvent("addSimulite", clickid);
                            break;
                        case "错题库":
                            bindPrevSourceEvent("addQues", clickid);
                            break;
                        case "作业":
                            bindPrevSourceEvent("addHomeWork", clickid);
                            break;
                        case "考试":
                            bindPrevSourceEvent("addExamList", clickid);
                            break;
                        case "自定义":
                            bindPrevSourceEvent("addCustom", clickid);
                            break;
                        case "HTML":
                            bindPrevSourceEvent("addHtml", clickid);
                            break;
                    }
                });
            }
        }
    });
}
///---------------
function GetSourceTree(subjectkey) {
	//console.log(subjectkey)
    $.ajax({
        url: houtaiurl+"SubjectTreeController/GetSubjectTree.action",
        type:"POST",
        async:false,
        data:{SubjectKey:subjectkey},
        success:function(res){
            var html='';
           for(var i=0;i<res.length;i++){
               if(res[i].style=="2"){
                   html+='<option value="'+res[i].id+'">'+res[i].treeName+'</option>';
               }
           }
           //console.log(html)
           $("#sourcetree").html(html);

        }

    });
}
function Closemydlg3() {
    $("#ContentDiv").html("");
}
/*function Closemydlgmaterial() {
    $("#ContentDiv").html("");
    $("#ContentDiv").dialog('close');
}*/
$(function () {

    $("#danxuan").css("display","none");

    //Closemydlgmaterial();
    $("#sourcetree").css("display", "none");
    //获取当前的科目



    //var subject = $(window.parent.document).find("#subject");

    var subject =  $(window.parent.document).find(".choosesub");

    //获取资源树ID
    /* 12.7 暂时写死 */
    var subjectKeyid=$('.choosesub',parent.document)[0].id;//"6050b62c-4afd-4cab-94c6-57b5c9578f10";
    GetSourceTree(subjectKeyid);

    GetSubjectRootId($("#sourcetree option:selected").val());
    //展开或折叠全部节点
    $.fn.zTree.init($("#treeDemo"), setting, []);


    /*  treetype  暂时写死；为总题库ID*/
    $.ajaxSettings.async = false;
    $.get(houtaiurl+"SubjectTreeController/seleKnowledges.action?random=" + Math.random(), data = {
        Id: subjectKeyid,
        treetype: $("#sourcetree option:selected").val()
    }, function(data) {
        //$.get(houtaiurl + "/Home/GetSubjectKnowledges?random=" + Math.random(), data = { subjectId: parentwindow.find("#subject option:selected").val(), treetype: $("#sourcetree option:selected").val() }, function (data) {
        var zNodes = data;
        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        ztreeobj = $.fn.zTree.getZTreeObj("treeDemo");
        selectlist = ztreeobj.getSelectedNodes();
        $("#addKnowledge").unbind("click").bind("click", {
            isParent: true,
            parentNode: ztreeobj.getNodeByParam("id", $("#rootid").val(), null)
        }, add);
        $("#saveTreeNode").val($("#rootid").val());
        $("#addcontent").trigger("click");
    });

    $.ajaxSettings.async = true;

    subject.bind('DOMNodeInserted',function(e) {
        console.log('DOMNodeInserted');
        console.log($(e.target).html());//change

        subjectKeyid= subject.attr('id');

        var selectedvalue =subject.attr('id');
        if ($.trim(selectedvalue).length > 0) {
            GetSourceTree(selectedvalue);
            GetSubjectRootId($("#sourcetree option:selected").val());
            $.get(houtaiurl+"SubjectTreeController/seleKnowledges.action?random=" + Math.random(), data = {
                Id: selectedvalue,
                treetype: $("#sourcetree option:selected").val()
            }, function(data) {
                //$.get(houtaiurl + "/Home/GetSubjectKnowledges?random=" + Math.random(), data = { subjectId: parentwindow.find("#subject option:selected").val(), treetype: $("#sourcetree option:selected").val() }, function (data) {
                var zNodes = data;
                $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                //$("#uploadtoolbars").css("display", "none");
                ztreeobj = $.fn.zTree.getZTreeObj("treeDemo");
                selectlist = ztreeobj.getSelectedNodes();
                $("#addKnowledge").unbind("click").bind("click", {
                    isParent: true,
                    parentNode: ztreeobj.getNodeByParam("id", $("#rootid").val(), null)
                }, add);
                $("#saveTreeNode").val($("#rootid").val());
                $("#addcontent").trigger("click");
                //GetNewDatas(true, "");
            });
        }
        else {
            $.fn.zTree.init($("#treeDemo"), setting, []);
        }
    });
    subject.trigger("change.Tree");
	$("#sourcetree").off("change").on("change", function() {

		GetSubjectRootId($("#sourcetree option:selected").val());
		$.get(houtaiurl+"SubjectTreeController/seleKnowledges.action?random=" + Math.random(), data = {
			Id: subjectKeyid,
			treetype: $("#sourcetree option:selected").val()
		}, function(data) {
		    //alert(data)
			//$.get(houtaiurl + "/Home/GetSubjectKnowledges?random=" + Math.random(), data = { subjectId: parentwindow.find("#subject option:selected").val(), treetype: $("#sourcetree option:selected").val() }, function (data) {
			var zNodes = data;
			$.fn.zTree.init($("#treeDemo"), setting, zNodes);
			ztreeobj = $.fn.zTree.getZTreeObj("treeDemo");
			selectlist = ztreeobj.getSelectedNodes();
			$("#addKnowledge").unbind("click").bind("click", {
				isParent: true,
				parentNode: ztreeobj.getNodeByParam("id", $("#rootid").val(), null)
			}, add);
			$("#saveTreeNode").val($("#rootid").val());
			$("#addcontent").trigger("click");
		});
	});
	$("#updateJS").click(function() {
		//选择当前窗口的父窗口的相应的子元素并展示
		parentwindow.find("#update_modal").show();
		parentwindow.find("#updatemodal").show();
		if($.trim(parentwindow.find("#subject option:selected").val()).length > 0) {
			$.post(houtaiurl+"SubjectTreeController/UpdateJS.action?Id=" + parentwindow.find("#subject option:selected").val(), data = {
				treetype: $("#sourcetree option:selected").val()
			}, function(data) {
				if(data.Key == "success") {
					parentwindow.find("#updatemodal").hide();
					parentwindow.find("#update_modal").hide();

					$.messager.confirm('系统提示', data.Key, function(r) {
						if(r) {
							window.location.reload();
							$.fn.zTree.init($("#treeDemo"), setting, []);
						}
					});

				}
			});
		} else {
			$.messager.alert("提示", "请选择要更新的科目");
		}
	});
	$("#ChangeOldToNew").click(function() {
		parentwindow.find("#update_modal").show();
		parentwindow.find("#updatemodal").show();
		if($.trim(parentwindow.find("#subject option:selected").val()).length > 0) {
			$.post(houtaiurl + "/Knowledge/ChangeOldToNew", data = {}, function(data) {
				$.messager.alert("提示", data);
			});
		}

	});

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------

});

var questionid;
var editquestiontype;
var myalldatas1, myalldatas2, myalldatas3, myalldatas4, myalldatas5, myalldatas6,
    mynum1 = 0, mynum2 = 0, mynum3 = 0, mynum4 = 0, mynum5 = 0, mynum6 = 0;
function updateQuestionSelection() {
    /*$.get(houtaiurl + "SubjectController/GetQuestions.action",
        data ={
                knowledgeId: $("#saveTreeNode").val(),
                random: Math.random()
            }, function (mesg) {*/
    $("#FillBlankpanel").css("margin-top", "10px");
                //----------填空---------------
                $("#FillBlanktable").datagrid({
                    singleSelect: true,
                    rownumbers: true,
                    method: "POST",
                    url: houtaiurl + "QuestionController/GetFillblankQuestionJson.action?knowledgeid=" + $("#saveTreeNode").val() + "&&random=" + Math.random() + "&&subjectid=" + $(window.parent.document).find("#subject option:selected").val(),
                    fit: true,
                    fitColumns: true,
                    pagination: true,
                    pageSize: "10",
                    loadFilter: pagerFilter,
                    onSelect: function (index, row) {
                        questionid = row.id;
                        editquestiontype = row.type;
                    },
                    toolbar: "#Fillblanksearchtitle",
                    onLoadSuccess: function (data) {
                        if (mynum1 == 0) {
                            myalldatas1 = data.rows;
                            mynum1++;
                        }
                    }
                });
                //----------单选---------------
                $("#SingleChoicetable").datagrid({
                    singleSelect: true,
                    rownumbers: true,
                    method: "POST",
                    url: houtaiurl + "QuestionController/GetSingleChoiceQuestionJson.action?knowledgeid=" + $("#saveTreeNode").val() + "&&random=" + Math.random() + "&&subjectid=" + $(window.parent.document).find("#subject option:selected").val(),
                    fit: true,
                    fitColumns: true,
                    pagination: true,
                    pageSize: "10",
                    loadFilter: pagerFilter,
                    onSelect: function (index, row) {
                        questionid = row.id;
                        editquestiontype = row.type;
                    },
                    toolbar: "#SingleChoicesearchtitle",
                    onLoadSuccess: function (data) {
                        if (mynum2 == 0) {
                            myalldatas2 = data.rows;
                            mynum2++;
                        }
                    }
                });
                //----------多选---------------
                $("#MulChoicetable").datagrid({
                    singleSelect: true,
                    rownumbers: true,
                    method: "POST",
                    url: houtaiurl + "QuestionController/GetMulChoiceQuestionJson.action?knowledgeid=" + $("#saveTreeNode").val() + "&&random=" + Math.random() + "&&subjectid=" + $(window.parent.document).find("#subject option:selected").val(),
                    fit: true,
                    fitColumns: true,
                    pagination: true,
                    pageSize: "10",
                    loadFilter: pagerFilter,
                    onSelect: function (index, row) {
                        questionid = row.id;
                        editquestiontype = row.type;
                    },
                    toolbar: "#MulChoicesearchtitle",
                    onLoadSuccess: function (data) {
                        if (mynum3 == 0) {
                            myalldatas3 = data.rows;
                            mynum3++;
                        }
                    }
                });
                //----------判断---------------
                $("#IsTruetable").datagrid({
                    singleSelect: true,
                    rownumbers: true,
                    method: "POST",
                    url: houtaiurl + "QuestionController/GetIsTureQuestionJson.action?knowledgeid=" + $("#saveTreeNode").val() + "&&random=" + Math.random() + "&&subjectid=" + $(window.parent.document).find("#subject option:selected").val(),
                    fit: true,
                    fitColumns: true,
                    pagination: true,
                    pageSize: "10",
                    loadFilter: pagerFilter,
                    onSelect: function (index, row) {
                        questionid = row.id;
                        editquestiontype = row.type;
                    },
                    toolbar: "#IsTruesearchtitle",
                    onLoadSuccess: function (data) {
                        if (mynum4 == 0) {
                            myalldatas4 = data.rows;
                            mynum4++;
                        }
                    }
                });
                //----------问答---------------
                $("#Textaraetable").datagrid({
                    singleSelect: true,
                    rownumbers: true,
                    method: "POST",
                    url: houtaiurl + "QuestionController/GetTextAreaQuestionJson.action?knowledgeid=" + $("#saveTreeNode").val() + "&&random=" + Math.random() + "&&subjectid=" + $(window.parent.document).find("#subject option:selected").val(),
                    fit: true,
                    fitColumns: true,
                    pagination: true,
                    pageSize: "10",
                    loadFilter: pagerFilter,
                    onSelect: function (index, row) {
                        questionid = row.id;
                        editquestiontype = row.type;

                    },
                    toolbar: "#Textaraesearchtitle",
                    onLoadSuccess: function (data) {
                        if (mynum5 == 0) {
                            myalldatas5 = data.rows;
                            mynum5++;
                        }
                    }
                });
                //----------3D---------------
                $("#3Dtable").datagrid({
                    singleSelect: true,
                    rownumbers: true,
                    method: "POST",
                    url: houtaiurl + "QuestionController/Get3DQuestionJson.action?knowledgeid=" + $("#saveTreeNode").val() + "&&random=" + Math.random() + "&&subjectid=" + $(window.parent.document).find("#subject option:selected").val(),
                    fit: true,
                    fitColumns: true,
                    pagination: true,
                    pageSize: "10",
                    loadFilter: pagerFilter,
                    onSelect: function (index, row) {
                        questionid = row.id;
                        editquestiontype = row.type;
                    },
                    toolbar: "#3Dsearchtitle",
                    onLoadSuccess: function (data) {
                        if (mynum6 == 0) {
                            myalldatas6 = data.rows;
                            mynum6++;
                        }
                    }
                });
                //---------------------


}

function intialSubjectTree() {
    $("#partailQuestions tbody").html("");
    $("#pagelist").remove();
    $("#addQuestion").hide();
    $("#question-tab li:first").find("a").trigger("click");
}