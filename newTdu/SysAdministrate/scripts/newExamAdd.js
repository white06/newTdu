var gitid="";

//要添加进去的列表
var uu = [];

//定义是提交还是修改功能执行的参数
var switched=0;

//定义一个题型的参数
var tixing="";

var index = parent.layer.getFrameIndex(window.name);
var bianji = parent.layer.bianji;
var questionid = parent.layer.questionid;
var knowId = parent.layer.knowId;
var type = parent.layer.knowId;
$(document).ready(function () {
    var str = GetRequest();
    eval(str)
    bianji = str.bianji;
    questionid = str.questionid;
    knowId = str.knowId;
    type = str.type;
    if(bianji==1){
        switched=1
        if(type=="1"){
            seleExam(questionid,"单选题","1");
        }else if(type=="2"){
            seleExam(questionid,"多选题","1");
        }else  if(type=="3"){
            seleExam(questionid,"填空题","1");
        }else  if(type=="4"){
            seleExam(questionid,"判断题","1");
        }else  if(type=="5"){
            seleExam(questionid,"问答题","1");
        }
    }
    else{
        switched=0
    }
    console.log("bianji : "+bianji+" questionid : "+questionid+" knowId : "+knowId+" switched : "+switched)
})


function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}





//定义zTree的全局变量zNodes
var zNodes =[];var upnum=0;var gitid="";
//设置zTree的基础设置
var setting = {
    view: {
        addHoverDom:addHoverDom,
        removeHoverDom:removeHoverDom,
        showLine: true,
        showIcon:false,
        selectedMulti: true,
    },
    data: {
        simpleData: {
            enable: true,
        }
    },
    callback:{//编辑功能和删除功能的回掉事件
        onRemove:zTreeOnRemove,
        onRename:zTreeOnRename,
        //鼠标单击事件
        onClick:zTreeonClick,
    },
    edit: {//加此属性就能过够新增删除按钮和编辑按钮，同时可以添加两个按钮功能
        enable: false
    },
};
//鼠标移动可见按钮的Hover事件
function addHoverDom(treeId, treeNode) {
    return;
    var aObj = $("#" + treeNode.tId + "_a");
    if ($("#diyBtn_"+treeNode.id).length>0) return;
    else if(treeNode.knowledgecontentId == "00000000-0000-0000-0000-000000000000"){
        var editadd = "<span type='button' class='button add' id='diyBtn_" + treeNode.id
            + "' title='"+treeNode.name+"' onfocus='this.blur();'onclick=\"add(id);\"></span>";
        aObj.append(editadd);
        return;
    }
};
//鼠标离开按钮不可见的Hover事件
function removeHoverDom(treeId, treeNode) {
    $("#diyBtn_"+treeNode.id).unbind().remove();
};
//删除
function zTreeOnRemove(event,treeId,treeNode){
    if(upnum==0){
        upnum=1;
        $.ajax({
            type:"POST",
            url:pathURL+"TreesController/deTree.action?id="+treeNode.id+"&filePath="+filePath,
            success:function(data){
                if(data=="true"){
                    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                    var node=treeObj.getNodes();
                    zNodes=node;
                    upnum=0;
                    return;
                }
            }
        })
    }
};
//编辑
function zTreeOnRename(event, treeId, treeNode){
    var name=treeNode.name;
    //转码
    name=encodeURI(name);
    name=encodeURI(name);
    $.ajax({
        type:"POST",
        url:pathURL+"TreesController/upRandom.action?id="+treeNode.id+"&name="+name,
        success:function(data){
            if(data=="true"){
                alert("编辑成功");
            }

        }
    })
};
//树的鼠标单击事件
function zTreeonClick(event, treeId, treeNode){
    var marginTop=$('#addClass').css('margin-top');
    var knowledge=treeNode.id;
    if( marginTop==-2000+'px'){
        //把手风琴模块显示在屏幕上
        $('#addClass').css({'margin-top':'10px'});
        //点击科目书节点，显示在此节点之下的所有题目
        $("#addClass").accordion({
            onSelect:function(title,index){
                if(title){
                    switch(index){
                        case 0:
                            seleExam(knowledge,"单选题","2");
                            break;
                        case 1:
                            seleExam(knowledge,"填空题","2");
                            break;
                        case 2:
                            seleExam(knowledge,"判断题","2");
                            break;
                        case 3:
                            seleExam(knowledge,"多选题","2");
                            break;
                        case 4:
							seleExam(knowledge,"问答题","2");
							break;
                        case 5:
							seleExam(knowledge,"3D仿真实验题","2");
							break;
                    }

                }else{
                    alert("未选中题型");
                }
            }
        });
    }else{

        var p = $('#addClass').accordion('getSelected');
        if (p){
            var index = $('#addClass').accordion('getPanelIndex', p);
            switch(index){
                case 0:
                    seleExam(knowledge,"单选题","1");
                    break;
                case 1:
                    seleExam(knowledge,"填空题","1");
                    break;
                case 2:
                    seleExam(knowledge,"判断题","1");
                    break;
                case 3:
                    seleExam(knowledge,"多选题","1");
                    break;
                case 4:
					seleExam(knowledge,"问答题","2");
					break;
                case 5:
					seleExam(knowledge,"3D仿真实验题","2");
					break;
            }

        }
    }
}

//分拆填空题答案
function fenchai(tigan,daan){
    if((tigan.split("______").length-1)===daan.split("______").length){
        return true;
    }else{
        return false;
    }
}

//组合所有的内容，形成xml文档
function zuhe(nowquestype){

    /*  临时  */
    //var nowquestype = "单选题";

    var tigan=$("#tigan").val();
    if(tigan==""){
        alert("题干不能为空");
        return;
    }
    tigan=zhuanyi(tigan);
    var nandu=$('input:radio[name="nandu"]:checked').val();
    var fenshu=$('#fenshu').val();

    //对内容进行获取和组合
    if(nowquestype==="单选题"){
        if($('input:radio[name="daan"]:checked').val()==undefined){
            alert("请选择一个正确答案");
            return;
        }
        var aa='<智能题>'+
            '<难度>'+nandu+'</难度>'+
            '<类型>'+nowquestype+'</类型>'+
            '<题干>'+
            '<文字>'+tigan+'</文字>'+
            '<图片>'+$("#tu0_id")[0].value+'</图片>'+
            '</题干>'+
            '<选项列表>'+
            '<选项A>'+
            '<图片>'+$("#tu1_id")[0].value+'</图片>'+
            '<文字>'+zhuanyi($("#xuanxiang1").val())+'</文字>'+
            '</选项A>'+
            '<选项B>'+
            '<图片>'+$("#tu2_id")[0].value+'</图片>'+
            '<文字>'+zhuanyi($("#xuanxiang2").val())+'</文字>'+
            '</选项B>'+
            '<选项C>'+
            '<图片>'+$("#tu3_id")[0].value+'</图片>'+
            '<文字>'+zhuanyi($("#xuanxiang3").val())+'</文字>'+
            '</选项C>'+
            '<选项D>'+
            '<图片>'+$("#tu4_id")[0].value+'</图片>'+
            '<文字>'+zhuanyi($("#xuanxiang4").val())+'</文字>'+
            '</选项D>'+
            '</选项列表>'+
            '<答案>'+$('input:radio[name="daan"]:checked').val()+'</答案>'+
            '<解析>'+zhuanyi($('#jiexi').val())+'</解析>'+
            '</智能题>';
    }else if(nowquestype==="填空题"){
        var daan=$("#daan").val();
        if(daan==""){
            alert("答案没有写");
            return;
        }else{
            if(fenchai(tigan,daan)){
                var aa='<智能题>'+
                    '<难度>'+nandu+'</难度>'+
                    '<类型>'+nowquestype+'</类型>'+
                    '<题干>'+
                    '<文字>'+tigan+'</文字>'+
                    '</题干>'+
                    '<答案>'+zhuanyi(daan)+'</答案>'+
                    '<解析>'+zhuanyi($('#jiexi').val())+'</解析>'+
                    '</智能题>';
            }else{
                alert("答案与题目不符合");
                return;
            }
        }
    }else if(nowquestype==="判断题"){
        if($('input:radio[name="daan"]:checked').val()==undefined){
            alert("请选择一个正确答案");
            return;
        }
        var aa='<智能题>'+
            '<难度>'+nandu+'</难度>'+
            '<类型>'+nowquestype+'</类型>'+
            '<题干>'+
            '<文字>'+tigan+'</文字>'+
            '<图片>'+$("#tu0_id")[0].value+'</图片>'+
            '</题干>'+
            '<答案>'+$('input:radio[name="daan"]:checked').val()+'</答案>'+
            '<解析>'+zhuanyi($('#jiexi').val())+'</解析>'+
            '</智能题>';
    }
    else if(nowquestype==="多选题"){
        var dxt=document.getElementsByName("daan");
        var dxtL=dxt.length;
        if(dxtL===0){
            alert("请至少选择一个正确答案");
            return;
        }else{
            var daan="";
            var j=0;
            for(var i=0;i<dxtL;i++){
                if(dxt[i].checked){
                    if(j===0){
                        daan=dxt[i].value;
                        ++j;
                    }else{
                        daan+="______"+dxt[i].value;
                        ++j;
                    }
                }
            }
            var aa='<智能题>'+
                '<难度>'+nandu+'</难度>'+
                '<类型>'+nowquestype+'</类型>'+
                '<题干>'+
                '<文字>'+tigan+'</文字>'+
                '<图片>'+$("#tu0_id")[0].value+'</图片>'+
                '</题干>'+
                '<选项列表>'+
                '<选项A>'+
                '<图片>'+$("#tu1_id")[0].value+'</图片>'+
                '<文字>'+zhuanyi($("#xuanxiang1").val())+'</文字>'+
                '</选项A>'+
                '<选项B>'+
                '<图片>'+$("#tu2_id")[0].value+'</图片>'+
                '<文字>'+zhuanyi($("#xuanxiang2").val())+'</文字>'+
                '</选项B>'+
                '<选项C>'+
                '<图片>'+$("#tu3_id")[0].value+'</图片>'+
                '<文字>'+zhuanyi($("#xuanxiang3").val())+'</文字>'+
                '</选项C>'+
                '<选项D>'+
                '<图片>'+$("#tu4_id")[0].value+'</图片>'+
                '<文字>'+zhuanyi($("#xuanxiang4").val())+'</文字>'+
                '</选项D>'+
                '<选项E>'+
                '<图片>'+$("#tu5_id")[0].value+'</图片>'+
                '<文字>'+zhuanyi($("#xuanxiang5").val())+'</文字>'+
                '</选项E>'+
                '<选项F>'+
                '<图片>'+$("#tu6_id")[0].value+'</图片>'+
                '<文字>'+zhuanyi($("#xuanxiang6").val())+'</文字>'+
                '</选项F>'+
                '</选项列表>'+
                '<答案>'+daan+'</答案>'+
                '<解析>'+zhuanyi($('#jiexi').val())+'</解析>'+
                '</智能题>';
        }
    }else if(nowquestype==="3D仿真实验题"){
    	var daan=$("#daan").val();
        if(daan==""){
            alert("安装目录没有写");
            return;
        }else{
        var aa='<智能题>'+
        '<难度>'+nandu+'</难度>'+
        '<类型>'+nowquestype+'</类型>'+
        '<题干>'+
        '<文字>'+tigan+'</文字>'+
        '</题干>'+
        '<场景>'+zhuanyi($('#jiexi').val())+'</场景>'+
        '<step>'+zhuanyi($('#step').val())+'</step>'+
        '<type>'+zhuanyi($('#type').val())+'</type>'+
        '<安装目录>'+zhuanyi(daan)+'</安装目录>'+
        '</智能题>';
        }
    }
    else if(nowquestype==="问答题"){
    	var daan=$("#daan").val();
        if(daan==""){
            alert("答案没有写");
            return;
        }else{
        var aa='<智能题>'+
        '<难度>'+nandu+'</难度>'+
        '<类型>'+nowquestype+'</类型>'+
        '<题干>'+
        '<文字>'+tigan+'</文字>'+
        '</题干>'+
        /*'<场景>'+zhuanyi($('#jiexi').val())+'</场景>'+*/
        '<答案>'+zhuanyi(daan)+'</答案>'+
        '</智能题>';
        }
    }
    //得到此刻选中的那个科目树
    //var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    //得到这个科目树中的具体参数
    //var nodes=treeObj.getSelectedNodes();
    //console.log(nodes);
    //console.log(nodes[0]);
    //当处于提交状态时
    if(switched===0){
        var fd=new FormData;
        //console.log(aa)
        //console.log(nowquestype)
        fd.append("content",aa);
        fd.append("knowledgeId",knowId);
        fd.append("title",tigan);
        fd.append("type",nowquestype);
        fd.append("nandu",nandu);
        fd.append("fenshu",fenshu);
        console.log(aa)
        console.log(nowquestype)
        $.ajax({
            type:"POST",
            url:houtaiurl+"ExamController/zuhe.action",
            data:fd,
            //不改变编码方式
            contentType: false,
            processData: false,
            success:function(data){
                if(data=="ture"){
                    alert("新增成功");
                    var index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);

                }
            }
        })
    }//处于修改状态时
    else if(switched===1){
        var id = $('#switchId').val();
        var fd=new FormData;
        fd.append("id",questionid)
        fd.append("content",aa);
        fd.append("title",tigan);
        fd.append("nandu",nandu);
        fd.append("fenshu",fenshu);
        //console.log("修改状态:"+nandu);
        //console.log("修改状态:"+fenshu);
        $.ajax({
            type:"POST",
            url:houtaiurl+"ExamController/updatExam.action",
            data:fd,
            //不改变编码方式
            contentType: false,
            processData: false,
            success:function(data){
                if(data=="ture"){
                    alert("修改成功");
                    var index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);


                }else{
                    alert("修改失败");
                }
            }
        })
    }
}

//点击遮罩，退出大图浏览
function tuichu(){
	$("#ContentDiv").dialog('close');
    $("#xianshiwenjian").html('');//清空div中的所有内容
    $("#VideoContent").html('');//清空div中的所有内容
    $("#myImg").html('');
    $("#xianshidiv,#zhaozi").hide();
    $("#Videodiv").hide();
    switched=0;
    window.close();
}

//图片在选完之后就偷偷上传，免得一次性上传太慢
function upfile(obj){
    var fd =new FormData;
    fd.append("fileup",obj[0].files[0]);
    fd.append("filePath",filePath);
    $.ajax({
        type:"POST",
        url:pathURL+"ExamController/examup.action",
        data:fd,
        //不改变编码方式
        contentType: false,
        processData: false,
        success:function(data){
            //将返回的图片id保存在input中
            $("#"+obj[0].id+"_id").val(data);
        }
    })
}

//点击跳出选择新增框
function chuxian1(){
    //得到此刻选中的那个科目树
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    //得到这个科目树中的具体参数
    var nodes=treeObj.getSelectedNodes();
    if(nodes.length===0){
        alert("请先选中章节")
    }else{
        tixing="单选题";
        xianshi();
        $("#xianshiwenjian").load('content/xuanzeti.php');
        $("#xianshiwenjian").css("height",$("#xianshidiv")[0].clientHeight-32);
        $("#wenjianming").html("添加单选题")
    }
}

//点击跳出填空新增框
function chuxian2(){
    //得到此刻选中的那个科目树
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    //得到这个科目树中的具体参数
    var nodes=treeObj.getSelectedNodes();
    if(nodes.length===0){
        alert("请先选中章节")
    }else{
        tixing="填空题";
        xianshi();
        $("#xianshiwenjian").load('content/tiankongti.php');
        $("#xianshiwenjian").css("height",$("#xianshidiv")[0].clientHeight-32);
        $("#wenjianming").html("添加填空题")
    }
}

//点击跳出判断新增框
function chuxian3(){
    //得到此刻选中的那个科目树
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    //得到这个科目树中的具体参数
    var nodes=treeObj.getSelectedNodes();
    if(nodes.length===0){
        alert("请先选择知识点")
    }else{
        tixing="判断题";
        xianshi();
        $("#xianshiwenjian").load('content/panduan.php');
        $("#xianshiwenjian").css("height",$("#xianshidiv")[0].clientHeight-32);
        $("#wenjianming").html("添加判断题")
    }
}

//点击跳出多选新增框
function chuxian5(){
    //得到此刻选中的那个科目树
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    //得到这个科目树中的具体参数
    var nodes=treeObj.getSelectedNodes();
    if(nodes.length===0){
        alert("请先选择知识点")
    }else{
        tixing="多选题";
        xianshi();
        $("#xianshiwenjian").load('content/duoxuanti.php');
        $("#xianshiwenjian").css("height",$("#xianshidiv")[0].clientHeight-32);
        $("#wenjianming").html("添加多选题")
    }
}

//查询试题,easyui自带的绑定函数
function seleExam(knowledge,Questype,ChooseType){
    if(ChooseType=="1"){

    }else if(ChooseType=="2"){
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        //得到这个科目树中的具体参数
        var nodes=treeObj.getSelectedNodes();
        knowledge=nodes[0].id;
    }
    switch(Questype){
        case "单选题":
            upDat(knowledge,Questype)
            break;
        case "填空题":
            upDat(knowledge,Questype)
            break;
        case "判断题":
            upDat(knowledge,Questype)
            break;
        case "多选题":
            upDat(knowledge,Questype)
            break;
        case "问答题":
            upDat(knowledge,Questype)
            break;
        case "3D仿真实验题":
            $("#3Dtable").datagrid({
                url:"/diesel/ExamController/selexam.action?knowledgeId="+knowledge+"&type="+encodeURI(encodeURI("3D仿真实验题")),
                method:"post",
                loadFilter:pagerFilter,
                singleSelect: true,
                rownumbers: true,
                pagination: true,
                pageSize: "10",
                toolbar:"#MulChoiceTool",
                onDblClickRow:function(index,row){

                    upDat(row.id,row.type)

                },
                onLoadSuccess:function(data){/*
                    $('.datagrid-cell').css('font-size','16px');
                    $('.datagrid-cell').css('text-align','center');
                    $('.datagrid-row').css('height','50px');
                    $('.datagrid-header .datagrid-cell span ').css('font-size','16px');
                    $('.panel-title ').css('font-size','16px');*/
                }
            })

            break;
    }
}

//操作按钮的添加
function caozuo(value,rowData,index){
    var anniu='<button class="customsubmitbutton" style="width:80px;height:40px" onclick="delexam(\''+rowData.id+'\',\''+rowData.knowledgeId+'\',\''+rowData.type+'\')">删除</button><button class="customsubmitbutton" style="width:80px;height:40px;margin-left:5px;" onclick="upDat(\''+rowData.id+'\',\''+rowData.type+'\')">修改</button>';
    return anniu;
}

//删除题目
function delexam(id,knowledgeId,type){
    $.ajax({
        type:"POST",
        url:pathURL+"ExamController/delExam.action?id="+id,
        success:function(data){
            if(data=="true"){
                alert("删除成功");
                seleExam(knowledgeId,type);
            }
        }
    })
}

//多选题增加答案
function showNum(){
    var num = $('#buttonNum').val();
    if(num==0){
        $('.E').show();
        $('#buttonNum').val(1);
        return;
    }else if(num==1){
        $('.F').show();
        $('#buttonNum').val(0);
        return;
    }
}

//修改题目
function upDat(id,type){

    console.log(type)

    var content="";
    $.ajax({
        type:"POST",
        url:houtaiurl+"ExamController/chaxun.action?id="+id,
        async: false,
        success:function(data){
            if(data){

                console.log(data)

                content=data.content;
                //第一步，解析xml
                var xml=new DOMParser().parseFromString(content,"text/xml");
                var nandu = xml.getElementsByTagName("难度")[0].textContent;
                var tigan_wenzi = xml.getElementsByTagName("题干")[0].children[0].innerHTML;

                var jiexi = "";
                if(xml.getElementsByTagName("解析").length>0){
                    jiexi=  xml.getElementsByTagName("解析")[0].textContent;
                }

                tigan_wenzi=nizhuanyi(tigan_wenzi);
                jiexi=nizhuanyi(jiexi);
                console.log(tigan_wenzi,jiexi,nandu)
                if(type==="单选题"){

                    console.log(xml)

                    var tigan_tupian = xml.getElementsByTagName("题干")[0].children[1].innerHTML;
                    var xuanxiang1_tupian = xml.getElementsByTagName("选项A")[0].children[0].innerHTML;
                    var xuanxiang1_wenzi = xml.getElementsByTagName("选项A")[0].children[1].innerHTML;
                    xuanxiang1_wenzi=nizhuanyi(xuanxiang1_wenzi);
                    var xuanxiang2_tupian = xml.getElementsByTagName("选项B")[0].children[0].innerHTML;
                    var xuanxiang2_wenzi = xml.getElementsByTagName("选项B")[0].children[1].innerHTML;
                    xuanxiang2_wenzi=nizhuanyi(xuanxiang2_wenzi);
                    var xuanxiang3_tupian = xml.getElementsByTagName("选项C")[0].children[0].innerHTML;
                    var xuanxiang3_wenzi = xml.getElementsByTagName("选项C")[0].children[1].innerHTML;
                    xuanxiang3_wenzi=nizhuanyi(xuanxiang3_wenzi);
                    var xuanxiang4_tupian = xml.getElementsByTagName("选项D")[0].children[0].innerHTML;
                    var xuanxiang4_wenzi = xml.getElementsByTagName("选项D")[0].children[1].innerHTML;
                    xuanxiang4_wenzi=nizhuanyi(xuanxiang4_wenzi);

                    console.log(xml.getElementsByTagName("答案"))
                    var xuanze = xml.getElementsByTagName("答案")[0].textContent;

                        $("input[value="+ nandu +"]").attr("checked",true);
                        $('#tigan').val(tigan_wenzi);
                        $('#xuanxiang1').val(xuanxiang1_wenzi);
                        $('#xuanxiang2').val(xuanxiang2_wenzi);
                        $('#xuanxiang3').val(xuanxiang3_wenzi);
                        $('#xuanxiang4').val(xuanxiang4_wenzi);
                        $("input[value="+ xuanze +"]").attr("checked",true);
                        $("#jiexi").val(jiexi);
                        $('#switchId').val(id);
                        $('#fenshu').val(data.fenshu);

                }else if(type==="填空题"){

                    console.log(xml)

                    var daan = xml.getElementsByTagName("答案")[0].textContent;
                    daan=nizhuanyi(daan);
                        $('input[value='+nandu+']').attr("checked",true);
                        $('#tigan').val(tigan_wenzi);
                        $('#daan').val(daan);
                        $("#jiexi").val(jiexi);
                        $('#switchId').val(id);

                    $('#fenshu').val(data.fenshu);

                    //})
                }else if(type==="判断题"){

                    console.log(xml)

                    var tigan_tupian = xml.getElementsByTagName("题干")[0].children[1].innerHTML;
                    var daan = xml.getElementsByTagName("答案")[0].textContent;
                        $('input[value='+nandu+']').attr("checked",true);
                        $('#tigan').val(tigan_wenzi);
                        $('#tu0_img').attr("src",'examFile/'+tigan_tupian);
                        $("input[value="+ daan +"]").attr("checked",true);
                        $("#jiexi").val(jiexi);
                        $('#switchId').val(id);
                    $('#fenshu').val(data.fenshu);
                    //})
                }
                else if(type==="多选题"){

                    console.log(xml)

                    var tigan_tupian = xml.getElementsByTagName("题干")[0].children[1].innerHTML;
                    var xuanxiang1_tupian = xml.getElementsByTagName("选项A")[0].children[0].innerHTML;
                    var xuanxiang1_wenzi = xml.getElementsByTagName("选项A")[0].children[1].innerHTML;
                    xuanxiang1_wenzi=nizhuanyi(xuanxiang1_wenzi);
                    var xuanxiang2_tupian = xml.getElementsByTagName("选项B")[0].children[0].innerHTML;
                    var xuanxiang2_wenzi = xml.getElementsByTagName("选项B")[0].children[1].innerHTML;
                    xuanxiang2_wenzi=nizhuanyi(xuanxiang2_wenzi);
                    var xuanxiang3_tupian = xml.getElementsByTagName("选项C")[0].children[0].innerHTML;
                    var xuanxiang3_wenzi = xml.getElementsByTagName("选项C")[0].children[1].innerHTML;
                    xuanxiang3_wenzi=nizhuanyi(xuanxiang3_wenzi);
                    var xuanxiang4_tupian = xml.getElementsByTagName("选项D")[0].children[0].innerHTML;
                    var xuanxiang4_wenzi = xml.getElementsByTagName("选项D")[0].children[1].innerHTML;
                    xuanxiang4_wenzi=nizhuanyi(xuanxiang4_wenzi);
                    var xuanxiang5_tupian = xml.getElementsByTagName("选项E")[0].children[0].innerHTML;
                    var xuanxiang5_wenzi = xml.getElementsByTagName("选项E")[0].children[1].innerHTML;
                    xuanxiang5_wenzi=nizhuanyi(xuanxiang5_wenzi);
                    var xuanxiang6_tupian = xml.getElementsByTagName("选项F")[0].children[0].innerHTML;
                    var xuanxiang6_wenzi = xml.getElementsByTagName("选项F")[0].children[1].innerHTML;
                    xuanxiang6_wenzi=nizhuanyi(xuanxiang6_wenzi);
                    var xuanze = xml.getElementsByTagName("答案")[0].textContent;

                    //第二步，显示文本框
                    //xianshi();
                    //$("#xianshiwenjian").load('content/duoxuanti.php',function(){
                        //document.getElementById('shuxing').style.display="none";
                        //第三步 加载完load页面之后执行参数的填入
                        $("input[value="+ nandu +"]").attr("checked",true);
                        $('#tigan').val(tigan_wenzi);
                        $('#tu0_img').attr("src",'examFile/'+tigan_tupian);
                        $('#xuanxiang1').val(xuanxiang1_wenzi);
                        $('#tu1_img').attr("src",'examFile/'+xuanxiang1_tupian);
                        $('#xuanxiang2').val(xuanxiang2_wenzi);
                        $('#tu2_img').attr("src",'examFile/'+xuanxiang2_tupian);
                        $('#xuanxiang3').val(xuanxiang3_wenzi);
                        $('#tu3_img').attr("src",'examFile/'+xuanxiang3_tupian);
                        $('#xuanxiang4').val(xuanxiang4_wenzi);
                        $('#tu4_img').attr("src",'examFile/'+xuanxiang4_tupian);
                        $('#xuanxiang5').val(xuanxiang5_wenzi);
                        $('#tu5_img').attr("src",'examFile/'+xuanxiang5_tupian);
                        $('#xuanxiang6').val(xuanxiang6_wenzi);
                        $('#tu6_img').attr("src",'examFile/'+xuanxiang6_tupian);
                        $('.E').show();
                        $('.F').show();
                        var daan=xuanze.split("______");
                        var daanL=daan.length;
                        for(var i=0;i<daanL;i++){
                            $("input[value="+ daan[i] +"]").attr("checked",true);
                        }
                        $("#jiexi").val(jiexi);
                        $('#switchId').val(id);
                   // });
                }
                else if(type==="问答题"){
                    console.log(xml)

                    var daan = xml.getElementsByTagName("答案")[0].textContent;
                    daan=nizhuanyi(daan);
                    $('input[value='+nandu+']').attr("checked",true);
                    $('#tigan').val(tigan_wenzi);
                    $('#daan').val(daan);
                   /* $("#jiexi").val(jiexi);*/
                    $('#switchId').val(id);

                    $('#fenshu').val(data.fenshu);
                }
                //第四步，把选择参数置为1，表示是修改,并且把tixing这个参数赋值
                tixing=type;
                $("#wenjianming").html("修改"+type)
                switched=1;
            }
        }
    })

}

//为填空题增加空格
function addspan(){
    $('#tigan').val($('#tigan').val()+"______");
}

//为填空题答案增加空格
function addspan2(){
    var daan=$('#daan').val();
    if(daan==""){
        alert("请先填写第一个答案");
    }else{
        $('#daan').val($('#daan').val()+"______");
    }
}

//显示弹窗
function xianshi(){
    var zhaozi=document.getElementById("zhaozi");
    var xianshidiv=document.getElementById("xianshidiv");
    //zhaozi.style.display="block";
    //xianshidiv.style.display="block";
}


//下拉框科目选中事件
function subjecttrees(){
    seleknow_id();
    $.ajax({
        type:"POST",
        url:pathURL+"SecondController/selknowledges.action?ChooseSubject="+gitid,
        success:function(data){
            if(data){
                zNodes=data;
            }else{
                //清空zNodes
                zNodes=[];
            }
            var treeObj = $("#treeDemo");
            $.fn.zTree.init(treeObj, setting, zNodes);

            if(zNodes.length>0){
                var zTree2 = $.fn.zTree.getZTreeObj("treeDemo");//获取ztree对象
                var node = zTree2.getNodeByTId("tree_1");

                zTree2.selectNode(node);//选择点
                $(".curSelectedNode").trigger("click");
            }
        }
    })
}

//新增功能
function add(id){
    if(upnum==0){
        upnum=1;
        var lei="";
        var dataL=zNodes.length
        for(var i=0;i<dataL;i++){
            if(zNodes[i].pId==id.substring(7)){
                lei=zNodes[i].id;
            }
        }
        $.ajax({
            type:"POST",
            url:pathURL+"TreesController/ins.action?id="+id.substring(7)+"&lei="+lei+"&subid="+gitid,
            success:function(data){
                zNodes.push(data);
                var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                var nodes=treeObj.getNodeByParam("id",id.substring(7));
                var kk=treeObj.addNodes(nodes,-1,data);
                upnum=0;
                return;
            }
        })
    }
}

//新增按钮新增
function addniu(){
    if(upnum==0){
        upnum=1;
        var lei="";
        var id="";
        if(0!=zNodes.length){
            var dataL=zNodes.length;
            for(var i=0;i<dataL;i++){
                if(zNodes[i].pId==0){
                    lei=zNodes[i].id;
                }
            }
        }
        $.ajax({
            type:"POST",
            url:pathURL+"TreesController/ins.action?id="+id+"&lei="+lei+"&subid="+gitid,
            success:function(data){
                if(0==zNodes.length){
                    zNodes=[];
                }
                zNodes.push(data);
                var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                var nodes=null;
                nodes=treeObj.getNodeByParam("id",id);
                var kk=treeObj.addNodes(nodes,-1,data);
                upnum=0;
                return;
            }
        })
    }
}

//写死每次获取到的科目树的知识树的id
function seleknow_id(){
    //写死每次获取到的科目树的知识树的id
    var id=$('#subject').val();
    //3DMAX
    if(id=="086e9c77-8f33-4b0a-b3a6-39f138f512a0"){
        gitid="75ae241b-8c07-496c-8d6a-c9e96cfcd5d9";
        return;
    }
    //AUTOCAD设计
    else if(id=="72a1bc9e-131d-4c13-a326-9faddeb17e9e"){
        gitid="c80bccfa-cdc5-47f1-864c-c8dacf115391";
        return;
    }
    //HTML5+CSS3基础
    else if(id=="745aac79-f1ef-476b-b57c-dc9d3472ec3a"){
        gitid="884f3131-a4c7-492f-9fe5-0cb7010f2fba";
        return;
    }
    //After Effects Cs5基础教程
    else if(id=="a1ffdc90-3f23-4d75-b9b9-c24b4870e03b"){
        gitid="4c878bd5-2317-43c4-97a4-924ae1f10746";
        return;
    }
    //网络综合布线设计与实施
    else if(id=="b386476e-a7cf-4992-946b-90ff0568a0d9"){
        gitid="4b82db76-1dbc-4972-8b3e-fb3b07aa7ba2";
        return;
    }
}

//分页功能
function pagerFilter(data){
    //判断是否是数组
    if (typeof data.length == 'number' && typeof data.splice == 'function'){	// is array
        data = {
            total: data.length,
            rows: data
        }
    }
    var dg = $(this);
    var opts = dg.datagrid('options');
    var pager = dg.datagrid('getPager');
    pager.pagination({
        onSelectPage:function(pageNum, pageSize){
            opts.pageNumber = pageNum;
            opts.pageSize = pageSize;
            pager.pagination('refresh',{
                pageNumber:pageNum,
                pageSize:pageSize
            });
            //等待重写，形成列表
            dg.datagrid('loadData',data);
        },
        beforePageText : '第', //页数文本框前显示的汉字
        afterPageText : '页    共 {pages} 页',
        displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录',
    });
    if (!data.originalRows){
        data.originalRows = (data.rows);
    }
    var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
    var end = start + parseInt(opts.pageSize);
    data.rows = (data.originalRows.slice(start, end));
    return data;
}

//组卷，load到组卷的页面去实现组卷功能
function zujuan(){
    $("#contentDiv").load("content/zujuan.php",'课程组卷');
}
//将特殊字符转义保存
function zhuanyi(zifu){
	zifu=zifu.replace(/&/g,"&#38;");
	zifu=zifu.replace(/</g,"&#60;");
	zifu=zifu.replace(/>/g,"&#62;");
	zifu=zifu.replace(/"/g,"&#34;");
	zifu=zifu.replace(/×/g,"&#215;");
	zifu=zifu.replace(/÷/g,"&#247;");
	zifu=zifu.replace(/¥/g,"&#165;");
	zifu=zifu.replace(/¯/g,"&#175;");
	zifu=zifu.replace(/´/g,"&#180;");
	return zifu;
}

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