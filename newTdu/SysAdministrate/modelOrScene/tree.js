/**
 * Created by TDU on 2019/12/30.
 */

var subUpId;
var treeName='模型库';
var RootId;
var IDMark_Swith = "_swith",
    IDMark_Icon = "_ico",
    IDMark_Span = "_span",
    IDMark_Input = "_input",
    IDMark_Check = "_check",
    IDMark_Edit = "_edit",
    IDMark_Remove = "_remove",
    IDMark_Ul = "_ul",
    IDMark_A= "_a",
    zTree;

var Id = $('.choosesub',parent.document)[0].id;//parentwindow.find("#subject option:selected").val();
//Id="ccabdcd3-9754-4426-9078-53ee4bd9d09c";
var treetype=$("#sourcetree option:selected").val();
//treetype="bbb25171-3ba7-47f9-8834-ac637337e842";

var setting = {
    view: {
        addHoverDom:addHoverDom,
        removeHoverDom:removeHoverDom,
        selectedMulti:false,
        showIcon:true
    },
    edit: {
        enable:true,
        editNameSelectAll:true,
        removeTitle:'删除',
        renameTitle:'重命名'
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
        beforeRemove:beforeRemove,//点击删除时触发，用来提示用户是否确定删除
        beforeEditName:beforeEditName,//点击编辑时触发，用来判断该节点是否能编辑
        beforeRename:beforeRename,//编辑结束时触发，用来验证输入的数据是否符合要求
        onRemove:onRemove,//删除节点后触发，用户后台操作
        onRename:onRename,//编辑后触发，用于操作后台
        beforeDrag:beforeDrag,
        beforeClick: beforeClick,
        onClick: onClick//点击打开页面
    }
};
function beforeClick(treeId,treeNode,clickFlag){
    var ticketBagNo =treeNode.phone;
    re=new RegExp(ticketBagNo);

    var accept =$("#accept").val();
    if(!re.test(accept)){
        $("#accept").val(accept+treeNode.name+"<"+ticketBagNo+">");
    }
}
function  onRename(e,treeId,treeNode,isCancel){

    var val=$("#sourcetree").find("option:selected").attr("data-type");

    var subId=$('.choosesub',parent.document)[0].id;
    var tName=treeNode.name;
    var tId=treeNode.id;
    if(treeNode.isParent){

        if(val==0){ //模型
            $.ajax({
                type:"POST",
                url: houtaiurl +"DevelopModelController/upFirModelTree.action",
                data:{"fId":tId,"subName":tName,"subId":subId,"treeName":treeName},
                success:function(res){
                    if(res){
                        layer.alert("修改成功！");
                    }else{
                        layer.alert("修改失败！");
                    }
                }
            });
        }else if(val==1){//场景
            $.ajax({
                type:"POST",
                url: houtaiurl+"DevelopScenesController/upFirSceneTree.action",
                data:{"fId":tId,"subName":tName,"subId":subId,"treeName":treeName},
                success:function(res){
                    if(res){
                        layer.alert("修改成功！");
                    }else{
                        layer.alert("修改失败！");
                    }
                }
            });
        }


    }else{
        if(val==0){ //模型
            $.ajax({
                type:"POST",
                url: houtaiurl +"DevelopModelController/upFirModelTree.action",
                data:{"fId":tId,"subName":tName,"subId":subId,"treeName":treeName},
                success:function(res){
                    if(res){
                        layer.alert("修改成功！");
                    }else{
                        layer.alert("修改失败！");
                    }
                }
            });
        }else if(val==1){//场景
            $.ajax({
                type:"POST",
                url: houtaiurl+"DevelopScenesController/upFirSceneTree.action",
                data:{"fId":tId,"subName":tName,"subId":subId,"treeName":treeName},
                success:function(res){
                    if(res){
                        layer.alert("修改成功！");
                    }else{
                        layer.alert("修改失败！");
                    }
                }
            });
        }


    }
}

function onRemove(e,treeId,treeNode){

    var val=$("#sourcetree").find("option:selected").attr("data-type");

    var typeId=treeNode.id;
    if(treeNode.isParent){

        if(val==0){ //模型
            $.ajax({
                type:"POST",
                url: houtaiurl +"DevelopModelController/delFirModelTree.action?fId="+typeId,
                success:function(res){
                    if(res){
                        layer.alert("删除成功！");
                    }
                }
            });
        }else if(val==1){//场景
            $.ajax({
                type:"POST",
                url: houtaiurl+"DevelopScenesController/delFirSceneTree.action?fId="+typeId,
                success:function(res){
                    if(res){
                        layer.alert("删除成功！");
                    }
                }
            });
        }


    }else{
        if(val==0){ //模型
            $.ajax({
                type:"POST",
                url: houtaiurl +"DevelopModelController/delFirModelTree.action?fId="+typeId,
                success:function(res){
                    if(res){
                        layer.alert("删除成功！");
                    }else{
                        layer.alert("删除失败！");
                    }
                }
            });
        }else if(val==1){//场景
            $.ajax({
                type:"POST",
                url: houtaiurl+"DevelopScenesController/delFirSceneTree.action?fId="+typeId,
                success:function(res){
                    if(res){
                        layer.alert("删除成功！");
                    }else{
                        layer.alert("删除失败！");
                    }
                }
            });
        }

    }
}

var abc;
var ztreeobj = $.fn.zTree.getZTreeObj("treeDemo");
var selectlist;
//当鼠标放在树上时新增图标的显示和图标绑定新增函数！
function addHoverDom(treeId, treeNode) {
    /*if(treeNode.knowledgecontentId == "00000000-0000-0000-0000-000000000000") {
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

    }*/
    var upId=treeNode.id;
    if(treeNode.isParent){
        var sObj=$("#"+treeNode.tId+"_span");
        if(treeNode.editNameFlag|| $("#addBtn_"+treeNode.tId).length>0) return;
        var addStr="<span class='button add' id='addBtn_"+treeNode.tId
            +"'title='添加子节点' onfocus='this.blur();'></span>";
        sObj.after(addStr);
        var btn=$("#addBtn_"+treeNode.tId);
        if(btn) btn.bind("click",function(){
            var typeName;
            layer.prompt({formType:0,value:'',title:'请输入类别名称'},function(value,index){
                typeName=value;
                layer.close(index);
                return addSubModel(typeName,upId);
            })

            return false;
        })
    }

};

function addSubModel(typeName,upId){

    var val=$("#sourcetree").find("option:selected").attr("data-type");

    var subId=$('.choosesub',parent.document)[0].id;
    if(typeName !=null||typeName.length>0){
        if(val==0){ //模型
            console.log(upId,typeName,subId,$("#sourcetree").find("option:selected").text())
            $.ajax({
                type:"POST",
                url: houtaiurl +"DevelopModelController/addSubModelTree.action",
                data:{"fId":upId,"subName":typeName,"subId":subId,"treeName":$("#sourcetree").find("option:selected").text()},
                success:function(res){
                    if(res){
                        layer.alert("添加成功！");
                        getRootId();
                    }else{
                        layer.alert("添加失败！");
                    }
                }
            });

        }else if(val==1){//场景
            $.ajax({
                type:"POST",
                url: houtaiurl+"DevelopScenesController/addSubSceneTree.action",
                data:{"fId":upId,"subName":typeName,"subId":subId,"treeName":$("#sourcetree").find("option:selected").text()},
                success:function(res){
                    if(res){
                        layer.alert("添加成功！");
                        getRootId();
                    }else{
                        layer.alert("添加失败！");
                    }
                }
            });
        }


    }else{
        layer.alert("请输入正确的类别名称");
    }
}

function getRootId(){

    //固定subject  测试

    //var subId=$("#subject", parent.document).val();
    var subId=$('.choosesub',parent.document)[0].id;
    //subId="ccabdcd3-9754-4426-9078-53ee4bd9d09c";

    var val=$("#sourcetree").find("option:selected").attr("data-type");


    if(val==0){//模型
        $.ajax({
            type:"POST",
            url: houtaiurl +"DevelopModelController/getSubjectModelsRootId.action",
            async: false,
            data:{"subId":subId},
            success:function(res){
                gettModelsRootId(res.id);
            }
        });
    }else if(val==1){//场景
        $.ajax({
            type:"POST",
            url: houtaiurl+"DevelopScenesController/getSubjectScenesRootId.action",
            data:{"subId":subId},
            success:function(res){
                console.log(res.id)
                gettScenesRootId(res.id)
            }
        })
    }

}
function gettModelsRootId(rootId){
    $.ajax({
        type:"POST",
        url: houtaiurl +"DevelopModelController/gettModelsRootId.action",
        data:{"subId":rootId},
        success:function(res){

            panduanAdmin(res.id,"Root");
            getModelTree(res.id);


        }
    });
}
function gettScenesRootId(rootId){
    $.ajax({
        type:"POST",
        url: houtaiurl+"DevelopScenesController/gettScenesRootId.action",
        data:{"subId":rootId},
        success:function(res){
            console.log(res.id)
            getModelTree(res.id);

            panduanAdmin(res.id,"Root");
        }
    });
}
//当鼠标离开树时新增图标的隐藏和图标绑定事件的解除！
function removeHoverDom(treeId, treeNode) {
    /*//console.log("----")*/
    $("#addBtn_" + treeNode.tId).unbind().remove();
};
var childCount = 0;
var parentcount = 0;
var parentwindow = $(window.parent.document);

//新增科目节点的函数在这里！
function add(e) {
    /*$("span.add,span.remove,span.edit").hide();
    var selectedtree = $("#sourcetree option:selected").val();
    if($.trim(selectedtree).length > 0) {
        str = "",
            isParent = e.data.isParent;
        var parentId = "";
        var preknowledge;
        //console.log($("#rootid").val())
        if(isParent) {
            newNode = ztreeobj.addNodes(e.data.parentNode, {
                id: "",
                isParent: isParent,
                name: "new node" + (++parentcount)
            });
            preknowledge = newNode[0].getPreNode();
            str = "random=" + Math.random() + "&Content=" + newNode[0].name + "&ParentKnowledge=" + $("#rootid").val() + "&PreKnowledge=" + ((preknowledge == undefined) ? "" : preknowledge.id) +
                "&treeId=" + selectedtree;
        } else {
            newNode = ztreeobj.addNodes(e.data.parentNode, {
                id: "",
                isParent: isParent,
                name: ""
            });
            newNode[0].name = newNode[0].getParentNode().name + "-" + (++childCount);
            parentId = newNode[0].getParentNode().id;
            preknowledge = newNode[0].getPreNode();
            str = "random=" + Math.random() + "&Content=" + newNode[0].name + "&ParentKnowledge=" + parentId + "&PreKnowledge=" + ((preknowledge == undefined) ? "" : preknowledge.id) +
                "&treeId=" + selectedtree;
            ztreeobj.updateNode(newNode[0]);
        }
        ztreeobj.editName(newNode[0]);
        $.ajax({
            type: "Get",
            url: houtaiurl + "/Knowledge/addKnowledge",
            data: str,
            async: false,
            success: function(data) {
                if(data.Key) {
                    newNode[0].id = data.Value;
                    selectlist = [];
                    $("#saveTreeNode").val(data.Value);
                    //GetNewDatas(true, "");
                    $("span.add,span.remove,span.edit").show();
                }
            }
        });
    } else {
        $.messager.alert("提示", "请选择添加知识点的科目树");
    }*/
    var firName;
    layer.prompt({formType:0,value:'',title:'请输入类别名称'},function(value,index){
        firName=value;
        layer.close(index);
        return addFirModel(firName);
    })
};

function addFirModel(firName){
    alert(RootId)
    //var subId=$("#subject", parent.document).val();
    var subId=$('.choosesub',parent.document)[0].id;
    var val=$("#sourcetree").find("option:selected").attr("data-type");
    if(firName !=null&&firName.length>0&&firName!=""){

        console.log($("#rootid").val())
        if(val==0) { //模型
            $.ajax({
                type:"POST",
                url: houtaiurl +"DevelopModelController/addFirModelTree.action",
                data:{"firName":firName,"subId":subId,"treeName":$("#sourcetree").find("option:selected").text()},
                success:function(res){
                    if(res){
                        layer.alert("添加成功！");
                        getModelTree(RootId);
                    }else{
                        layer.alert("添加失败！");
                    }
                }
            });
        }else if(val==1){//场景
            $.ajax({
                type:"POST",
                url: houtaiurl+"DevelopScenesController/addFirSceneTree.action",
                data:{"firName":firName,"subId":subId,"treeName":$("#sourcetree").find("option:selected").text()},
                success:function(res){
                    if(res){
                        layer.alert("添加成功！");
                        getModelTree(RootId);
                    }else{
                        layer.alert("添加失败！");
                    }
                }
            });
        }
    }else{
        layer.alert("请输入正确的类别名称");
    }
}

//删除节点的操作函数在这里！
function beforeRemove(treeId, treeNode) {
    return true;
}
//点击编辑按钮的出发事件！
function beforeEditName(treeId, treeNode) {
    $("#saveTreeNode").val(treeNode.id);
    //GetNewDatas(true, "");
    return true;
}
//编辑节点的操作函数在这里！
function beforeRename(treeId, treeNode, newName) {
    if(newName.length<0){
        layer.alert("名称不能少于0个字符！");
        return false;
    }
    return true;
}
//节点拖拽完成调用的函数在这里！
var beforedragnextnode = null;

function beforeDrag(treeId,treeNodes){
    return false;
}
//节点被点击后的事件函数在这里！
function onClick(event, treeId, treeNode) {
    abc = treeNode;
    panduanAdmin(treeNode.id,treeNode.name);

}

function panduanAdmin(plugin,tabnaem){

    var val=$("#sourcetree").find("option:selected").attr("data-type");

    RootId=plugin;
    $.ajax({
        type:"POST",
        url: houtaiurl +"DevelopModelController/panduanAdmin.action",
        success:function(res){
            console.log("-------")
            console.log(res)
            if(res){
                if(val==0){ //模型
                    opentabModel(plugin,tabnaem);
                }else if(val==1){
                    opentabScene(plugin,tabnaem);
                }

            }else{
                if(val==0){ //模型
                    opentabcommonModel(plugin,tabnaem);
                }else if(val==1){
                    opentabcommonScene(plugin,tabnaem);
                }

            }
        }
    });
}
//打开下一级显示页面
function opentabModel(plugin,tabnaem) {
    var tab = $('#tt').tabs('getSelected');
    if ($('#tt').tabs('exists', tabnaem)) {
        $('#tt').tabs('select', tabnaem);
    } else {
        $("#tt").tabs("add", {
            title: tabnaem,
            closable: true,
            content: '<iframe src="modelShow.html?subModelId=' + plugin + '" style="width:100%;height:576px;border:none;overflow:hidden"></iframe>'

        });
    }
}
//打开下一级显示页面
function opentabcommonModel(plugin,tabnaem) {
    var tab = $('#tt').tabs('getSelected');
    if ($('#tt').tabs('exists', tabnaem)) {
        $('#tt').tabs('select', tabnaem);
    } else {
        $("#tt").tabs("add", {
            title: tabnaem,
            closable: true,
            content: '<iframe src="'+'commonModelShow.php?subModelId=' + plugin + '" style="width:100%;height:576px;border:none;overflow:hidden"></iframe>'

        });
    }
}
//打开下一级显示页面
function opentabScene(plugin,tabnaem) {
    var tab = $('#tt').tabs('getSelected');
    if ($('#tt').tabs('exists', tabnaem)) {
        $('#tt').tabs('select', tabnaem);
    } else {
        $("#tt").tabs("add", {
            title: tabnaem,
            closable: true,
            content: '<iframe src="'+'modelShow.html?subSceneId=' + plugin + '" style="width:100%;height:800px;border:none;overflow:hidden"></iframe>'

        });
    }
}
//打开下一级显示页面
function opentabcommonScene(plugin,tabnaem) {
    var tab = $('#tt').tabs('getSelected');
    if ($('#tt').tabs('exists', tabnaem)) {
        $('#tt').tabs('select', tabnaem);
    } else {
        $("#tt").tabs("add", {
            title: tabnaem,
            closable: true,
            content: '<iframe src="'+'../../SysAdministrate/Scene/commonSceneShow.php?subSceneId=' + plugin + '" style="width:100%;height:800px;border:none;overflow:hidden"></iframe>'

        });
    }
}


function GetSubjectRootId(treety) {
    var val=$("#sourcetree").find("option:selected").attr("data-type");
    var subjectId = $('.choosesub',parent.document)[0].id;

if(val==0){ //模型
    $.ajax({
        type: "POST",
        url: houtaiurl+"DevelopModelController/gettModelsRootId.action",
        /*data: {
         //subjectId: parentwindow.find("#subject option:selected").val(),
         //treetype:"36c8c7c2-8aaf-44c9-b6c8-53e0e3fa3a68",
         subjectId: subjectId,
         treetype: treety,
         random: Math.random()
         },*/
        data:{"subId":treety},
        async: false,
        dataType: "json",
        success: function(data) {
            console.log(data)
            if(data.id!="") {
                $("#rootid").val(data.id);
            }
            panduanAdmin(data.id,"Root");
        }
    });
}else if(val==1){//场景
 $.ajax({
        type: "POST",
        url: houtaiurl+"DevelopScenesController/gettScenesRootId.action",
        data:{"subId":treety},
        async: false,
        dataType: "json",
        success: function(data) {
            if(data.id!="") {
                $("#rootid").val(data.id);
            }
            panduanAdmin(data.id,"Root");
        }
    });
}
}

//得到一级分类信息(ceshi)
function getModelTree(rootId){
    //var subId=$("#subject", parent.document).val();
    var subId=$('.choosesub',parent.document)[0].id;
    //subId = "ccabdcd3-9754-4426-9078-53ee4bd9d09c";

    var val=$("#sourcetree").find("option:selected").attr("data-type");

    if(val==0){//模型
        $.ajax({
            type:"POST",
            url: houtaiurl +"DevelopModelController/getModelTree.action",
            data:{"subId":subId,"treeName":$("#sourcetree").find("option:selected").text(),"rootId":rootId},
            success:function(res){
                showTree(res);
            }
        });
    }else if(val==1){//场景
        $.ajax({
            type:"POST",
            url: houtaiurl+"DevelopScenesController/getSceneTree.action",
            data:{"subId":subId,"treeName":$("#sourcetree").find("option:selected").text(),"rootId":rootId},
            success:function(res){
                console.log(res)
                showTree(res);
            }
        });
    }

}
function showTree(res){
    treeNodes = res;
    $.fn.zTree.init($("#treeDemo"), setting, treeNodes);
}


function GetSourceList() {
    //var subjectid = parentwindow.find("#subject option:selected").val();
    var subjectid=$('.choosesub',parent.document)[0].id;

    //subjectid="ccabdcd3-9754-4426-9078-53ee4bd9d09c"
    $.ajax({
        url: houtaiurl+"SubjectTreeController/getSourceList.action",
        type: "POST",
        data: {
            subjectid: subjectid
        },
        async: false,
        success: function(res) {
            var html = '';
            for(var i = 0; i < res.length; i++) {

                if(res[i].style==0||res[i].style==1){
                    html += '<option  data-type="' + res[i].style + '"  value="' + res[i].id + '" title="">' + res[i].treeName + '</option>'
                }
            }
            $("#sourcetree").html(html);
        }
    });

}

$(function() {
    //获取资源树
    GetSourceList();
    //获取当前的科目
    var subject =  $(window.parent.document).find(".choosesub");//$(window.parent.document).find("#subject");
    console.log(subject);
    //展开或折叠全部节点
    $.fn.zTree.init($("#treeDemo"), setting, []);
    //获取科目根id
    GetSubjectRootId($("#sourcetree option:selected").val());
    //设置隐藏框的值
    $("#saveTreeNode").val($("#rootid").val());

    subject.bind('DOMNodeInserted',function(e) {
        console.log('DOMNodeInserted');
        console.log($(e.target).html());//change


        $("#prevlist tbody").html("");
        //获取科目id
        var selectedvalue = $('.choosesub',parent.document)[0].id;//parentwindow.find("#subject option:selected").val();
        if($.trim(selectedvalue).length > 0) {
            $.get(houtaiurl+"SubjectTreeController/treeChange.action", data = {
                id: selectedvalue
            }, function(datas) {
                if(datas.length > 0) {
                    $("#sourcetree").html("");
                    for(var item in datas) {
                            if(datas[item].style==0||datas[item].style==1){
                            $("#sourcetree").append(' <option data-type="' + datas[item].style + '" value="' + datas[item].id + '" title="">' + datas[item].treeName + '</option>');

                        }
                    }
                    $("#sourcetree").trigger("change");
                }
            });
        } else {
            $.fn.zTree.init($("#treeDemo"), setting, []);
            if($("#addcontent").length > 0) {
                $("#loaduppartail").hide();
                $("#addVideo,#addDocument,#addPDF").removeClass("selecteda");
            }
        }


    })
    subject.trigger("change.Tree");
    $("#sourcetree").off("change").on("change", function() {
        $(".tabs li").each(function(index, obj) {
            //获取所有可关闭的选项卡
            var tab = $(".tabs-closable", this).text();
            $(".easyui-tabs").tabs('close', tab);
        });

        GetSubjectRootId($("#sourcetree option:selected").val());
        var val=$("#sourcetree").find("option:selected").attr("data-type");
        if(val==0){ //模型
            $.ajax({
                type:"POST",
                url: houtaiurl +"DevelopModelController/getModelTree.action",
                data:{"subId":$('.choosesub',parent.document)[0].id,"treeName":$("#sourcetree").find("option:selected").text(),"rootId":$("#rootid").val()},
                success:function(data){
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
                }
            });
        }else if(val==1){
            $.ajax({
                type:"POST",
                url: houtaiurl +"DevelopScenesController/getSceneTree.action",
                data:{"subId":$('.choosesub',parent.document)[0].id,"treeName":$("#sourcetree").find("option:selected").text(),"rootId":$("#rootid").val()},
                success:function(data){
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
                }
            });

        }
    });

});

//刷新功能
function updatePage(){
    $("#treeDemo").empty();
    $(function () {
        //获取资源树
        GetSourceList();
        //获取当前的科目
        var subject = $('.choosesub',parent.document)//$(window.parent.document).find("#subject");
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
            var selectedvalue = $('.choosesub',parent.document)[0].id;
            //parentwindow.find("#subject option:selected").val();
            if ($.trim(selectedvalue).length > 0) {
                $.get(houtaiurl+"SubjectTreeController/treeChange.action", data = { id: selectedvalue }, function (datas) {
                    if (datas.length > 0) {
                        $("#sourcetree").html("");
                        for (var item in datas) {
                            if(datas[item].style==0||datas[item].style==1){
                                $("#sourcetree").append(' <option data-type="' + datas[item].style + '" value="' + datas[item].id + '" title="">' + datas[item].treeName + '</option>');

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
                    $("#addVideo,#addDocument,#addPDF").removeClass("selecteda");
                }
            }
        });
        subject.trigger("change.Tree");
        $("#sourcetree").off("change").on("change", function () {
            $(".tabs li").each(function(index, obj) {
                //获取所有可关闭的选项卡
                var tab = $(".tabs-closable", this).text();
                $(".easyui-tabs").tabs('close', tab);
            });

            GetSubjectRootId($("#sourcetree option:selected").val());
            var val=$("#sourcetree").find("option:selected").attr("data-type");
            console.log($("#rootid").val())
            if(val==0){ //模型
                $.ajax({
                    type:"POST",
                    url: houtaiurl +"DevelopModelController/getModelTree.action",
                    data:{"subId":$('.choosesub',parent.document)[0].id,"treeName":$("#sourcetree").find("option:selected").text(),"rootId":$("#rootid").val()},
                    success:function(data){
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
                    }
                });
            }else if(val==1){
                $.ajax({
                    type:"POST",
                    url: houtaiurl +"DevelopScenesController/getSceneTree.action",
                    data:{"subId":$('.choosesub',parent.document)[0].id,"treeName":$("#sourcetree").find("option:selected").text(),"rootId":$("#rootid").val()},
                    success:function(data){
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
                    }
                });

            }
        });

    });
}

/*
function GetNewDatas(isnew, strid,index_id) {
    /!*$.get(houtaiurl+"SubjectTreeController/seleKnowledges.action?random=" + Math.random(), data = {
     Id: Id,
     treetype: treetype
     }, function(data) {*!/
    $.get(houtaiurl+"SubjectTreeController/seleKnowledges.action?random=" + Math.random(), data = { subjectId: $('.choosesub',parent.document)[0].id, treetype: $("#sourcetree option:selected").val() }, function (data) {
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
function GetNewDatasRename() {
    /!*$.get(houtaiurl+"SubjectTreeController/seleKnowledges.action?random=" + Math.random(), data = {
     Id: Id,
     treetype:treetype
     }, function(data) {*!/
    $.get(houtaiurl+"SubjectTreeController/seleKnowledges.action?random=" + Math.random(), data = { subjectId: $('.choosesub',parent.document)[0].id, treetype: $("#sourcetree option:selected").val() }, function (data) {
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
*/


function prevSourceListDefault() {
    $("#prevlist tbody").find("button").each(function() {
        if($(this).hasClass("btn-danger")) {
            $(this).removeClass("btn-danger");
            $(this).addClass("btn-primary")
        }
    });
}
