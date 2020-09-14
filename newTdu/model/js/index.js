var lei='';

$(function() {
    getName();
    initshow();
    getUserId();
});
function getName() {
    //对用户名进行获取，要是session中无值，返回登录页面
    $.ajax({
        url : fileurl + "ShouyeController/sUserName.action",
        type : "POST",
        async : true,
        success : function(data) {
            if (data == "err"||data=="") {
                window.location.assign("login.html");
                return;
            } else {
                //头部信息显示设置
                $("#personName").text(data);
                $("#dingwei").html(firstIndex);

                //首次进入首页展示页面显示

                $("#img").hide();
                $("#img2").hide();

                xianzhi = 1;

                setTimeout(function() {
                    if (xianzhi === 1) {
                        getName();
                        xianzhi = 0;
                    }
                }, 780000);
            }
        },
        error : function() {
            window.location.assign("login.html");
            return;
        }
    });
}
//写cookies
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//读取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}

//删除cookies
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}


function clickLis() {
    let filter = document.getElementsByClassName("navli")
    console.log(filter)
    for(let i=0;i<filter.length;i++){
        console.log($(filter[i]));
        filter[i].addEventListener('click',function(){
            filter[i].classList.add('activeLi')
            for(let j=0;j<filter.length;j++){
                if(i!=j){
                    filter[j].classList.remove('activeLi')
                }
            }
        })
    }
    console.log($(filter[0]));
}


var userId = ""
function getUserId() {
    //对用户名进行获取，要是session中无值，返回登录页面
    $.ajax({
        url : fileurl + "UsersController/getUserId.action",
        type : "POST",
        async : true,
        success : function(data) {
            console.log(data)
            userId=data;
        }
    });
}

//退出登录，注销功能
function tuichu(){
        $.ajax({
            type : "POST",
            url : fileurl+"UsersController/zhuxiao.action",
            success : function(data) {
                if (data == true) {
                    getName();
                }
            }
        })
}
/*  考试的试卷 右上角 X  关闭*/
function closePage(){
    $("#xianshidiv").css("display","none");
    $("#zhaozi").css("display","none");
}

//初始化科目下拉框
function initshow(){


    var str = getCookie("tai");

    if(str=="0"){
        //首页初始化
        $.ajax({
            type : "POST",
            url : fileurl+"ShouyeController/getSubjects_resource.action",
            success : function(data) {
                //科目树数据
                var submap=data[0];
                //键值获取
                var summap = Object.keys(data[0]);
                var html="";
                if(summap!=null){
                    html+='<a  style=\"color:white;font-size:18px;\" class="choosesub" id="'+submap[summap[0]][0].id+'">'+submap[summap[0]][0].subjectName+'</a><dl class=\"layui-nav-child\" style=\"text-align: center\" >';
                }
                //初始化左边树
                initleft(submap[summap[0]][0].id);
                for(var i=0;i<summap.length;i++){
                    html+=' <dd ><a  >'+summap[i].split(',')[0]+'</a><ul>';
                    for(var j=0;j<submap[summap[i]].length;j++){
                        html+=' <dd style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"> <a style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" onclick="choosesub(\''+submap[summap[i]][j].id+'\',\''+submap[summap[i]][j].subjectName+'\')" id="'+submap[summap[i]][j].id+'">'+submap[summap[i]][j].subjectName+'</a>';
                    }
                    html+=' </ul></dd>';
                }
                $("#submap").html(html);
            }
        })
    }else if(str=="1"){
        //首页初始化
        $.ajax({
            type : "POST",
            url : fileurl+"ShouyeController/getSubjects_develop.action",
            success : function(data) {
                //科目树数据
                var submap=data[0];
                //键值获取
                var summap = Object.keys(data[0]);
                var html="";
                if(summap!=null){
                    html+='<a  style=\"color:white;font-size:18px;\" class="choosesub" id="'+submap[summap[0]][0].id+'">'+submap[summap[0]][0].subjectName+'</a><dl class=\"layui-nav-child\" style=\"text-align: center\" >';
                }
                //初始化左边树
                initleft(submap[summap[0]][0].id);
                for(var i=0;i<summap.length;i++){
                    html+=' <dd ><a  >'+summap[i].split(',')[0]+'</a><ul>';
                    for(var j=0;j<submap[summap[i]].length;j++){
                        html+=' <dd> <a onclick="choosesub(\''+submap[summap[i]][j].id+'\',\''+submap[summap[i]][j].subjectName+'\')" id="'+submap[summap[i]][j].id+'">'+submap[summap[i]][j].subjectName+'</a>';
                    }
                    html+=' </ul></dd>';
                }
                $("#submap").html(html);
            }
        })
    }



}

//首页跳转
function shouye(){
    window.location.href="index.html";
}

//左边树初始化
function initleft(subid){
    $("#contentDiv").html("");

    $("#contentDiv").css("background-size","97% 100%");
    $.ajax({
        type : "POST",
        url : fileurl+"SubjectTreeController/getUsersSub.action",
        data : {
            "majorId" : subid
        },
        async:false,
        success : function(data) {
             var html='';
             for(var i=0;i<data.length;i++){
                 console.log(data[i])
                console.log(data[i].style)
                /*
                * 0-模型库  1-场景库 2-题库 3-考试 4-资源类
                * */
                 if(data[i].style==0){  //模型库
                     html+=' <li class="navli" style="padding-top: 10px;padding-bottom: 10px"\n' +
                         '                id="'+data[i].id+'" onclick="showModels(\''+data[i].id+'\',\''+data[i].treeName+'\')"><a\n' +
                         '                    style=";position: relative"><img\n' +
                         '                    src="../'+data[i].icon+'">\n' +
                         '                <span \n' +
                         '                      class="childrenspan" style="color: white;width: auto">'+data[i].treeName+'</span><img\n' +
                         '                        style="z-index: 2;position:absolute;top: 20%;right: 10px;height: 50%;width: auto"\n' +
                         '                        src="img/ico/icon_reat.png" alt=""/></a></li>';
                 }else if(data[i].style==1){ //场景库
                     html+=' <li class="navli" style="padding-top: 10px;padding-bottom: 10px"\n' +
                         '                id="'+data[i].id+'" onclick="showScenes(\''+data[i].id+'\',\''+data[i].treeName+'\')"><a\n' +
                         '                    style=";position: relative"><img\n' +
                         '                    src="../'+data[i].icon+'">\n' +
                         '                <span \n' +
                         '                      class="childrenspan" style="color: white;width: auto">'+data[i].treeName+'</span><img\n' +
                         '                        style="z-index: 2;position:absolute;top: 20%;right: 10px;height: 50%;width: auto"\n' +
                         '                        src="img/ico/icon_reat.png" alt=""/></a></li>';
                 }
             }
             $("#subTree").html(html);
        }
    })
    clickLis();
}

function test(id) {
    //$("#"+id).find("a").css("background","linear-gradient(337deg,rgba(92,205,177,1) 0%,rgba(92,205,178,1) 0%,rgba(89,208,207,1) 100%)");
    $("#"+id).css("background","linear-gradient(337deg,rgba(92,205,177,1) 0%,rgba(92,205,178,1) 0%,rgba(89,208,207,1) 100%)");
    //$("#"+id).find("span").css("color","rgb(52,57,61)");
}
function leave(id) {
    //$("#"+id).find("a").css("background","rgb(52, 57, 76)");
    $("#"+id).css("background","rgb(52, 57, 76)");
    //$("#"+id).find("span").css("color","rgb(242,255,255)");
}

//获取此时框的高度，然后得到文件框的高度
function getHeight(){
    var getDiv=window.document.getElementById('xianshidiv');
    var getDiv1=window.document.getElementById('xianshiwenjian');
    var divHeight=getDiv.offsetHeight;
    getDiv1.style.height=(parseInt(divHeight)-parseInt(32))+'px';
}


var panduan = 0;
//主页显示 模型
function showModels(subid,treeName){

    clickLis();


    $("#subId").text(subid);

    $("#img2").hide();
    $("#img").show();

    $("#contentDiv").css("background-image","url()");
    $("#contentDiv").html("");
    $.ajax({
        type: "POST",
        url: fileurl + "DevelopModelController/getModelsFis.action",
        data: {"subTreeId": subid},
        success: function (data) {
            if (data != null&&data.length>0) {
                //模型库跳转
                getdivmodel(data[0].id);
                //获取div里信息，主页面显示内容
            }else{
                var html = '<div style="width:450px;'+
                    'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">'+
                    '<img src="../img/bg_huangying2.png" style="height: 100%;width: 100%">'+
                    '</div>';
                $("#contentDiv").html(html);
            }
        }
    })
}
//主页显示 場景
function showScenes(subid,treeName){

    clickLis();

    $("#subId").text(subid);

    $("#img2").hide();
    $("#img").show();

    $("#contentDiv").css("background-image","url()");
    $("#contentDiv").html("");
    $.ajax({
        type: "POST",
        url: fileurl + "DevelopScenesController/getScenesFis.action",
        data: {"subTreeId": subid},
        success: function (data) {
            console.log(data==null)
            if (data != null&&data.length>0) {
                getdivscene(data[0].id);
                //获取div里信息，主页面显示内容
            }else{
                var html = '<div style="width:450px;'+
                    'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">'+
                    '<img src="../img/bg_huangying2.png" style="height: 100%;width: 100%">'+
                    '</div>';
                $("#contentDiv").html(html);
            }
        }
    })
}

function showmain(subid,treeName){

    clickLis();

    $("#img2").hide();
    $("#img").show();

    $("#contentDiv").css("background-image","url()");
    if(treeName=="模型库") {
        $.ajax({
            type: "POST",
            url: fileurl + "DevelopModelController/getModelsFis.action",
            data: { "subTreeId": subid },
            success: function (data) {
                if (data != null&&data.length>0) {
                    //模型库跳转
                    getdivmodel(data[0].id);
                    //获取div里信息，主页面显示内容
                }else{
                var html = '<div style="width:450px;'+
                    'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">'+
                    '<img src="../img/bg_huangying2.png" style="height: 100%;width: 100%">'+
                        '</div>';
                    $("#contentDiv").html(html);
                }
            }
        })
    }else if(treeName=="场景库"){
        $.ajax({
            type: "POST",
            url: fileurl + "DevelopScenesController/getScenesFis.action",
            data: { "subTreeId": subid },
            success: function (data) {
                if (data != null&&data.length>0) {
                    getdivscene(data[0].id);
                    //获取div里信息，主页面显示内容
                }else{
                    var html = '<div style="width:450px;'+
                        'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">'+
                        '<img src="../img/bg_huangying2.png" style="height: 100%;width: 100%">'+
                        '</div>';
                    $("#contentDiv").html(html);
                }
            }
        })
    }else if(treeName=="贴图库"){
        $("#contentDiv").html("");
        var html = '<div style="width:450px;'+
            'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">'+
            '<img src="../img/bg_huangying2.png" style="height: 100%;width: 100%">'+
            '</div>';
        $("#contentDiv").html(html);
    }else if(treeName=="文档库"){
        panduan=1;
        $("#contentDiv").html("");
        $.ajax({
            type: "POST",
            url: fileurl + "KnowledgesController/getKnowledgesFis.action",
            data: { "subTreeId": subid },
            success: function (data) {
                console.log(data);
                if (data.length>0&&data!=null) {
                    getdivdoc(data[0].id);
                    //获取div里信息，主页面显示内容
                }else{
                    var html = '<div style="width:450px;'+
                        'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">'+
                        '<img src="../img/bg_huangying2.png" style="height: 100%;width: 100%">'+
                        '</div>';
                    $("#contentDiv").html(html);
                }
            }
        })
    }else if(treeName=="素材库"){
        panduan=0;
        $("#contentDiv").html("");
        $.ajax({
            type: "POST",
            url: fileurl + "KnowledgesController/getKnowledgesFis.action",
            data: { "subTreeId": subid },
            success: function (data) {
                console.log(data);
                if (data.length>0&&data!=null) {
                    getdivdoc(data[0].id);
                    //获取div里信息，主页面显示内容
                }else{
                    var html = '<div style="width:450px;'+
                        'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">'+
                        '<img src="../img/bg_huangying2.png" style="height: 100%;width: 100%">'+
                        '</div>';
                    $("#contentDiv").html(html);
                }
            }
        })
    }
}

//获取主页显示内容，模型（首级获取）
function getdivmodel(subid){
    var majorid=$(".choosesub")[0].id;
    $.ajax({
        type : "POST",
        url : fileurl+"DevelopModelController/getModelsSecondAll.action",
        data : {
            "KnowledgesFisId" : subid,
            "subjectId":majorid
        },
        success : function(data) {
            var subid=parent.$("#subId").text();
            var lei=""

            var html='';
            html+=' <div onclick="addModel(\''+subid+'\',\''+lei+'\')" style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative;cursor:pointer;cursor:pointer">\n' +
                '        <div  style="width: 100px;height: 100px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -50px;margin-left: -50px; ">\n' +
                '            <img src="../img/icon_more.png" height="100" width="100"/>\n' +
                '        </div>\n' +
                '        </div>';
            for(var i=0;i<data.length;i++){
                if(data[i].modelContentId=="00000000-0000-0000-0000-000000000000"){
                    html+=' <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="../img/icon_1.png" style="width: 100%;height: 100%;"/></div>\n' +
                        '            <div style="position: absolute;top: 180px;width: 100%;text-align: center;height:40px;\n' +
                        'font-size:22px;\n' +
                        'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:40px;">'+data[i].content+'</div>\n' +
                        '            <div style="position: absolute;top: 230px;width: 100%;text-align: center;height:28px;\n' +
                        'font-size:17px;\n' +
                        'font-family:PingFangSC-Medium,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(138,144,159,1);\n' +
                        'line-height:28px;">'+data[i].name+'</div>\n' +
                        '            <div style="position: absolute;;width: 190px;height: 50px;top: 308px;left: 45px;\n' +
                        '            background:linear-gradient(337deg,rgba(92,205,177,1) 0%,rgba(92,205,178,1) 0%,rgba(89,208,207,1) 100%);border-radius:26px;\n' +
                        'font-size:20px;\n' +
                        'font-family:PingFangSC-Regular,PingFang SC;\n' +
                        'font-weight:400;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:50px;text-align: center; cursor:pointer " onclick="modelsecondshow(\''+data[i].id+'\',\''+data[i].userKey+'\',\''+data[i].name+'\')">进入</div>\n' +
                        '\n' +
                        '\n' +
                        '        </div>';
                }else{
                    var  str ="tduvr://command=open&App=TDuVRDirector&Scene="+data[i].userKey+"/"+data[i].modelContentId+"/"+data[i].name+"&UserID="+data[i].userKey+"&SceneOrModelID="+data[i].id+"&OpMode=TDuPractice&";
                    html+='        <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 90px;left: 85px;;width: 99px;height: 99px"><img src="../img/icon_3.png" style="height: 100%;width: 100%"/></div>\n' +
                        '            <div style="position: absolute;top: 220px;width: 100%;text-align: center;height:40px;\n' +
                        'font-size:22px;\n' +
                        'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:40px;">'+data[i].content+'</div>\n' +
                        '            <div style="position: absolute;bottom: 38px;width: 100%;height: 38px">\n' +
                        '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\''+str+'\'"><img src="img/ico/icon_vr.png" height="38" width="38" title="VR"/></div>\n' +
                        '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\''+str+'\'"><img src="img/ico/icon_ffehg.png" height="38" width="38" title="编辑器"/></div>\n' +
                        '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\''+str+'\'"><img src="img/ico/icon_fess.png" height="38" width="38" title="仿真"/></div>\n' +
                        '            </div>\n' +
                        '        </div>';
                }

            }
            $("#contentDiv").html(html);
        }
    })
}


var str1="";
var str2="";
var str3="";

//第二页面展示 （模型）
function modelsecondshow(dataid,userid,username) {
    str1=dataid;
    str2=userid;
    str3=username;

    console.log($("#personName").text())

    var that=event.currentTarget;
    var obj = ($(that)[0].parentNode).childNodes
    console.log(obj)
    var txt= obj[3].innerHTML

    $("#img2").show();
    //$("#nowAddress2").attr("onclick","modelsecondshow('"+(dataid)+"','"+userid+"','"+username+"');");
    $("#nowAddress2").text(""+txt+"");
    $.ajax({
        type : "POST",
        url : fileurl+"DevelopModelController/getModelsSecond2.action",
        data : {
            "KnowledgesFisId" : dataid,
            "userId":userid,
        },
        success : function(data) {
            console.log(data);
            var html='';
            var KnowledgeId=dataid;
            var treeId=$("#subId").text();
            var lei="";
            if(data!=null&&data.length>0){
                lei=data[(data.length-1)].id;
            }
                if(username==$("#personName").text()){
                    html+=' <div onclick="addModelFolder(\''+KnowledgeId+'\',\''+treeId+'\',\''+lei+'\')" style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative;cursor:pointer">\n' +
                        '        <div  style="width: 100px;height: 100px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -50px;margin-left: -50px; ">\n' +
                        '            <img src="../img/icon_more.png" height="100" width="100"/>\n' +
                        '        </div>\n' +
                        '        </div>';
                }
                for(var i=0;i<data.length;i++) {
                    if (data[i].modelContentId == "00000000-0000-0000-0000-000000000000") {
                        html += ' <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                            '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="../img/icon_1.png" style="width: 100%;height: 100%;"/></div>\n' +
                            '            <div style="position: absolute;top: 180px;width: 100%;text-align: center;height:40px;\n' +
                            'font-size:22px;\n' +
                            'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                            'font-weight:500;\n' +
                            'color:rgba(255,255,255,1);\n' +
                            'line-height:40px;">' + data[i].content + '</div>\n' +
                            '            <div style="position: absolute;top: 230px;width: 100%;text-align: center;height:28px;\n' +
                            'font-size:17px;\n' +
                            'font-family:PingFangSC-Medium,PingFang SC;\n' +
                            'font-weight:500;\n' +
                            'color:rgba(138,144,159,1);\n' +
                            'line-height:28px;">' + data[i].name + '</div>\n' +
                            '            <div style="position: absolute;;width: 190px;height: 50px;top: 308px;left: 45px;\n' +
                            '            background:linear-gradient(337deg,rgba(92,205,177,1) 0%,rgba(92,205,178,1) 0%,rgba(89,208,207,1) 100%);border-radius:26px;\n' +
                            'font-size:20px;\n' +
                            'font-family:PingFangSC-Regular,PingFang SC;\n' +
                            'font-weight:400;\n' +
                            'color:rgba(255,255,255,1);\n' +
                            'line-height:50px;text-align: center; cursor:pointer " onclick="modelsecondshow(\'' + data[i].id + '\',\'' + data[i].userKey + '\',\'' + data[i].name + '\')">进入</div>\n' +
                            '\n' +
                            '\n' +
                            '        </div>';
                    } else {
                        //var str = "tduvr://command=open&App=TDuVRDirector&Scene=" + userid + "/" + data[i].modelContentId + "/" + data[i].name + "&UserID=" + userid + "&SceneOrModelID=" + data[i].id + "&OpMode=TDuPractice&";
                        var strVR = "tduvr://command=open&App=TDuVREngine&Scene=" + data[i].userKey + "/" + data[i].modelContentId + "/" + data[i].modelContentId + ".tdb&UserID=" + data[i].userKey + "&SceneOrModelID=" + data[i].modelContentId + "&OpMode=TDuPractice&";
                        var strEdit = "tduvr://command=open&App=TDuVRDirector&Scene=" + data[i].userKey + "/" + data[i].modelContentId + "/" + data[i].modelContentId + ".tdb&UserID=" + data[i].userKey + "&SceneOrModelID=" + data[i].modelContentId + "&OpMode=TDuPractice&";
                        var strFang = "tduvr://command=open&App=TDuSimEngine&Scene=" + data[i].userKey + "/" + data[i].modelContentId + "/" + data[i].modelContentId + ".tdb&UserID=" + data[i].userKey + "&SceneOrModelID=" + data[i].modelContentId + "&OpMode=TDuPractice&";
                        html += '        <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                            '            <div style="position: absolute;top: 90px;left: 85px;;width: 99px;height: 99px"><img src="../img/icon_3.png" style="height: 100%;width: 100%"/></div>\n' +
                            '            <div style="position: absolute;top: 220px;width: 100%;text-align: center;height:40px;\n' +
                            'font-size:22px;\n' +
                            'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                            'font-weight:500;\n' +
                            'color:rgba(255,255,255,1);\n' +
                            'line-height:40px;">' + data[i].content + '</div>\n' +
                            '            <div style="position: absolute;bottom: 38px;width: 100%;height: 38px">\n' +
                            '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + strVR + '\'"><img src="img/ico/icon_vr.png" height="38" width="38" title="VR"/></div>\n' +
                            '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + strEdit + '\'"><img src="img/ico/icon_ffehg.png" height="38" width="38" title="编辑器"/></div>\n' +
                            '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + strFang + '\'"><img src="img/ico/icon_fess.png" height="38" width="38" title="仿真" /></div>\n' +
                            '            </div>\n' +
                            '        </div>';
                    }
                }
            $("#contentDiv").html(html);
        }
    })
}


//第二页面展示 （模型）
function modelsecondshowUpdate(dataid,userid,username) {
    str1=dataid;
    str2=userid;
    str3=username;

    console.log($("#personName").text())

    $.ajax({
        type : "POST",
        url : fileurl+"DevelopModelController/getModelsSecond2.action",
        data : {
            "KnowledgesFisId" : dataid,
            "userId":userid,
        },
        success : function(data) {
            console.log(data);
            var html='';
            var KnowledgeId=dataid;
            var treeId=$("#subId").text();
            var lei="";
            if(data!=null&&data.length>0){
                lei=data[(data.length-1)].id;
            }
            if(username==$("#personName").text()){
                html+=' <div onclick="addModelFolder(\''+KnowledgeId+'\',\''+treeId+'\',\''+lei+'\')" style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative;cursor:pointer">\n' +
                    '        <div  style="width: 100px;height: 100px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -50px;margin-left: -50px; ">\n' +
                    '            <img src="../img/icon_more.png" height="100" width="100"/>\n' +
                    '        </div>\n' +
                    '        </div>';
            }
            for(var i=0;i<data.length;i++) {
                if (data[i].modelContentId == "00000000-0000-0000-0000-000000000000") {
                    html += ' <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="../img/icon_1.png" style="width: 100%;height: 100%;"/></div>\n' +
                        '            <div style="position: absolute;top: 180px;width: 100%;text-align: center;height:40px;\n' +
                        'font-size:22px;\n' +
                        'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:40px;">' + data[i].content + '</div>\n' +
                        '            <div style="position: absolute;top: 230px;width: 100%;text-align: center;height:28px;\n' +
                        'font-size:17px;\n' +
                        'font-family:PingFangSC-Medium,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(138,144,159,1);\n' +
                        'line-height:28px;">' + data[i].name + '</div>\n' +
                        '            <div style="position: absolute;;width: 190px;height: 50px;top: 308px;left: 45px;\n' +
                        '            background:linear-gradient(337deg,rgba(92,205,177,1) 0%,rgba(92,205,178,1) 0%,rgba(89,208,207,1) 100%);border-radius:26px;\n' +
                        'font-size:20px;\n' +
                        'font-family:PingFangSC-Regular,PingFang SC;\n' +
                        'font-weight:400;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:50px;text-align: center; cursor:pointer " onclick="modelsecondshow(\'' + data[i].id + '\',\'' + data[i].userKey + '\',\'' + data[i].name + '\')">进入</div>\n' +
                        '\n' +
                        '\n' +
                        '        </div>';
                } else {
                    //var str = "tduvr://command=open&App=TDuVRDirector&Scene=" + userid + "/" + data[i].modelContentId + "/" + data[i].name + "&UserID=" + userid + "&SceneOrModelID=" + data[i].id + "&OpMode=TDuPractice&";
                    var strVR = "tduvr://command=open&App=TDuVREngine&Scene=" + data[i].userKey + "/" + data[i].modelContentId + "/" + data[i].modelContentId + ".tdb&UserID=" + data[i].userKey + "&SceneOrModelID=" + data[i].modelContentId + "&OpMode=TDuPractice&";
                    var strEdit = "tduvr://command=open&App=TDuVRDirector&Scene=" + data[i].userKey + "/" + data[i].modelContentId + "/" + data[i].modelContentId + ".tdb&UserID=" + data[i].userKey + "&SceneOrModelID=" + data[i].modelContentId + "&OpMode=TDuPractice&";
                    var strFang = "tduvr://command=open&App=TDuSimEngine&Scene=" + data[i].userKey + "/" + data[i].modelContentId + "/" + data[i].modelContentId + ".tdb&UserID=" + data[i].userKey + "&SceneOrModelID=" + data[i].modelContentId + "&OpMode=TDuPractice&";
                    html += '        <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 90px;left: 85px;;width: 99px;height: 99px"><img src="../img/icon_3.png" style="height: 100%;width: 100%"/></div>\n' +
                        '            <div style="position: absolute;top: 220px;width: 100%;text-align: center;height:40px;\n' +
                        'font-size:22px;\n' +
                        'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:40px;">' + data[i].content + '</div>\n' +
                        '            <div style="position: absolute;bottom: 38px;width: 100%;height: 38px">\n' +
                        '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + strVR + '\'"><img src="img/ico/icon_vr.png" height="38" width="38" title="VR"/></div>\n' +
                        '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + strEdit + '\'"><img src="img/ico/icon_ffehg.png" height="38" width="38" title="编辑器"/></div>\n' +
                        '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + strFang + '\'"><img src="img/ico/icon_fess.png" height="38" width="38" title="仿真" /></div>\n' +
                        '            </div>\n' +
                        '        </div>';
                }
            }
            $("#contentDiv").html(html);
        }
    })
}


//获取主页显示内容，（首级获取）场景库
function getdivscene(subid){
    var majorid=$(".choosesub")[0].id;
    $.ajax({
        type : "POST",
        url : fileurl+"DevelopScenesController/getScenesSecondAll.action",
        data : {
            "KnowledgesFisId" : subid,
            "subjectId":majorid
        },
        success : function(data) {
            console.log(data);
            var subid=parent.$("#subId").text();
            var lei="";
            var html='';
            html+=' <div onclick="jumpScene(\''+subid+'\',\''+lei+'\')" style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative;cursor:pointer">\n' +
                '        <div  style="width: 100px;height: 100px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -50px;margin-left: -50px; ">\n' +
                '            <img src="../img/icon_more.png" height="100" width="100"/>\n' +
                '        </div>\n' +
                '        </div>';
            for(var i=0;i<data.length;i++) {
                if (data[i].sceneContentId == "00000000-0000-0000-0000-000000000000") {
                    html += ' <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="../img/icon_2.png" style="width: 100%;height: 100%;"/></div>\n' +
                        '            <div style="position: absolute;top: 180px;width: 100%;text-align: center;height:40px;\n' +
                        'font-size:22px;\n' +
                        'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:40px;">' + data[i].content + '</div>\n' +
                        '            <div style="position: absolute;top: 230px;width: 100%;text-align: center;height:28px;\n' +
                        'font-size:17px;\n' +
                        'font-family:PingFangSC-Medium,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(138,144,159,1);\n' +
                        'line-height:28px;">' + data[i].name + '</div>\n' +
                        '            <div style="position: absolute;;width: 190px;height: 50px;top: 308px;left: 45px;\n' +
                        '            background:linear-gradient(337deg,rgba(92,205,177,1) 0%,rgba(92,205,178,1) 0%,rgba(89,208,207,1) 100%);border-radius:26px;\n' +
                        'font-size:20px;\n' +
                        'font-family:PingFangSC-Regular,PingFang SC;\n' +
                        'font-weight:400;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:50px;text-align: center; cursor:pointer " onclick="scenesecondshow(\'' + data[i].id + '\',\'' + data[i].userKey + '\',\'' + data[i].name + '\')">进入</div>\n' +
                        '\n' +
                        '\n' +
                        '        </div>';

                } else {
                    var strVR = "tduvr://command=open&App=TDuVREngine&Scene=" + data[i].userKey + "/" + data[i].sceneContentId + "/" + data[i].sceneContentId + ".EXM&UserID=" + data[i].userKey + "&SceneOrModelID=" + data[i].sceneContentId + "&OpMode=TDuPractice&";
                    var strEdit = "tduvr://command=open&App=TDuVRDirector&Scene=" + data[i].userKey + "/" + data[i].sceneContentId + "/" + data[i].sceneContentId + ".EXM&UserID=" + data[i].userKey + "&SceneOrModelID=" + data[i].sceneContentId + "&OpMode=TDuPractice&";
                    var strFang = "tduvr://command=open&App=TDuSimEngine&Scene=" + data[i].userKey + "/" + data[i].sceneContentId + "/" + data[i].sceneContentId + ".EXM&UserID=" + data[i].userKey + "&SceneOrModelID=" + data[i].sceneContentId + "&OpMode=TDuPractice&";
                    var strWeb = "tduvr://command=open&App=TDuSimEngine&Scene=" + data[i].userKey + "/" + data[i].sceneContentId + "/" + data[i].sceneContentId + ".EXM&UserID=" + data[i].userKey + "&SceneOrModelID=" + data[i].sceneContentId + "&OpMode=TDuPractice&";
                    html += '        <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 90px;left: 85px;;width: 99px;height: 99px"><img src="../img/icon_3.png" style="height: 100%;width: 100%"/></div>\n' +
                        '            <div style="position: absolute;top: 220px;width: 100%;text-align: center;height:40px;\n' +
                        'font-size:22px;\n' +
                        'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:40px;">' + data[i].content + '</div>\n' +
                        '            <div style="position: absolute;bottom: 38px;width: 100%;height: 38px">\n' +
                        '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + strVR + '\'"><img src="img/ico/icon_vr.png" height="38" width="38"title="VR" /></div>\n' +
                        '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + strEdit + '\'"><img src="img/ico/icon_ffehg.png" height="38" width="38" title="编辑器"/></div>\n' +
                        '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="window.open(\'http://tdu.tduvr.club/TDuWebEngine/index.html?' + strWeb + '\')"><img src="img/ico/web.png" height="38" width="38" title="Web"/></div>\n' +
                        '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + strFang + '\'"><img src="img/ico/icon_fess.png" height="38" width="38" title="仿真" /></div>\n' +
                        '            </div>\n' +
                        '        </div>';
                }
            }
            $("#contentDiv").html(html);
        }
    })
}
var type = 0;
/*  监听 点击路径 第三个 的点击事件；让其内容不进行变化   */
$(document).on("click", "a[id='nowAddress2']", function(event){
    type=1;
});

var str11="";
var str22="";
var str33="";

//第二页面展示 （场景）
function scenesecondshow(dataid,userid,username) {

    str11=dataid;
    str22=userid;
    str33=username;

    console.log(dataid,userid,username)

    var that=event.currentTarget;
    var obj = ($(that)[0].parentNode).childNodes
    console.log(obj)
    var txt= obj[3].innerText

    $("#img2").show();
    //$("#nowAddress2").attr("onclick","scenesecondshow('"+(dataid)+"','"+userid+"','"+username+"');");
    if(type==0){
        $("#nowAddress2").text(""+txt+"");
    }


    $.ajax({
        type : "POST",
        url : fileurl+"DevelopScenesController/getScenesSecond2.action",
        data : {
            "KnowledgesFisId" : dataid,
            "userId":userid,
        },
        success : function(data) {
            var treeId=parent.$("#subId").text();
            //console.log(subid)
            var KnowledgeId=dataid;
            var lei="";
            if(data.length!=0){
                lei=data[(data.length-1)].id;
            }
            var html='';
            if(username==$("#personName").text()){
                html+=' <div onclick="jumpSceneTwo(\''+KnowledgeId+'\',\''+treeId+'\',\''+lei+'\')" style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative;cursor:pointer">\n' +
                    '        <div  style="width: 100px;height: 100px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -50px;margin-left: -50px; ">\n' +
                    '            <img src="../img/icon_more.png" height="100" width="100"/>\n' +
                    '        </div>\n' +
                    '        </div>';
            }
            for(var i=0;i<data.length;i++) {
                if (data[i].sceneContentId == "00000000-0000-0000-0000-000000000000") {
                    html += ' <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="../img/icon_2.png" style="width: 100%;height: 100%;"/></div>\n' +
                        '            <div style="position: absolute;top: 180px;width: 100%;text-align: center;height:40px;\n' +
                        'font-size:22px;\n' +
                        'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:40px;">' + data[i].content + '</div>\n' +
                        '            <div style="position: absolute;top: 230px;width: 100%;text-align: center;height:28px;\n' +
                        'font-size:17px;\n' +
                        'font-family:PingFangSC-Medium,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(138,144,159,1);\n' +
                        'line-height:28px;">' + data[i].name + '</div>\n' +
                        '            <div style="position: absolute;;width: 190px;height: 50px;top: 308px;left: 45px;\n' +
                        '            background:linear-gradient(337deg,rgba(92,205,177,1) 0%,rgba(92,205,178,1) 0%,rgba(89,208,207,1) 100%);border-radius:26px;\n' +
                        'font-size:20px;\n' +
                        'font-family:PingFangSC-Regular,PingFang SC;\n' +
                        'font-weight:400;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:50px;text-align: center; cursor:pointer " onclick="scenesecondshow(\'' + data[i].id + '\',\'' + data[i].userKey + '\',\'' + data[i].name + '\')">进入</div>\n' +
                        '\n' +
                        '\n' +
                        '        </div>';
                } else {
                    var strVR = "tduvr://command=open&App=TDuVREngine&Scene=" + data[i].userKey + "/" + data[i].sceneContentId + "/" + data[i].sceneContentId + ".EXM&UserID=" + data[i].userKey + "&SceneOrModelID=" + data[i].sceneContentId + "&OpMode=TDuPractice&";
                    var strEdit = "tduvr://command=open&App=TDuVRDirector&Scene=" + data[i].userKey + "/" + data[i].sceneContentId + "/" + data[i].sceneContentId + ".EXM&UserID=" + data[i].userKey + "&SceneOrModelID=" + data[i].sceneContentId + "&OpMode=TDuPractice&";
                    var strFang = "tduvr://command=open&App=TDuSimEngine&Scene=" + data[i].userKey + "/" + data[i].sceneContentId + "/" + data[i].sceneContentId + ".EXM&UserID=" + data[i].userKey + "&SceneOrModelID=" + data[i].sceneContentId + "&OpMode=TDuPractice&";
                    var strWeb = "tduvr://command=open&App=TDuSimEngine&Scene=" + data[i].userKey + "/" + data[i].sceneContentId + "/" + data[i].sceneContentId + ".EXM&UserID=" + data[i].userKey + "&SceneOrModelID=" + data[i].sceneContentId + "&OpMode=TDuPractice&";
                    html += '        <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 90px;left: 85px;;width: 99px;height: 99px"><img src="../img/icon_3.png" style="height: 100%;width: 100%"/></div>\n' +
                        '            <div style="position: absolute;top: 220px;width: 100%;text-align: center;height:40px;\n' +
                        'font-size:22px;\n' +
                        'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:40px;">' + data[i].content + '</div>\n' +
                        '            <div style="position: absolute;bottom: 38px;width: 100%;height: 38px">\n' +
                        '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + strVR + '\'"><img src="img/ico/icon_vr.png" height="38" width="38" title="VR" /></div>\n' +
                        '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + strEdit + '\'"><img src="img/ico/icon_ffehg.png" height="38" width="38" title="编辑器"/></div>\n' +
                        '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="window.open(\'http://tdu.tduvr.club/TDuWebEngine/index.html?' + strWeb + '\')"><img src="img/ico/web.png" height="38" width="38" title="Web"/></div>\n' +
                        '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + strFang + '\'"><img src="img/ico/icon_fess.png" height="38" width="38" title="仿真" /></div>\n' +
                        '            </div>\n' +
                        '        </div>';
                }
            }
            $("#contentDiv").html(html);
        }
    })
}

//第二页面展示 （场景）
function scenesecondshowUpdate(dataid,userid,username) {

    str11==dataid;
    str22=userid;
    str33=username;
    console.log(dataid,userid,username)
    $.ajax({
        type : "POST",
        url : fileurl+"DevelopScenesController/getScenesSecond2.action",
        data : {
            "KnowledgesFisId" : dataid,
            "userId":userid,
        },
        success : function(data) {
            var treeId=parent.$("#subId").text();
            //console.log(subid)
            var KnowledgeId=dataid;
            var lei="";
            if(data.length!=0){
                lei=data[(data.length-1)].id;
            }
            var html='';
            if(username==$("#personName").text()){
                html+=' <div onclick="jumpSceneTwo(\''+KnowledgeId+'\',\''+treeId+'\',\''+lei+'\')" style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative;cursor:pointer">\n' +
                    '        <div  style="width: 100px;height: 100px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -50px;margin-left: -50px; ">\n' +
                    '            <img src="../img/icon_more.png" height="100" width="100"/>\n' +
                    '        </div>\n' +
                    '        </div>';
            }
            for(var i=0;i<data.length;i++) {
                if (data[i].sceneContentId == "00000000-0000-0000-0000-000000000000") {
                    html += ' <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="../img/icon_2.png" style="width: 100%;height: 100%;"/></div>\n' +
                        '            <div style="position: absolute;top: 180px;width: 100%;text-align: center;height:40px;\n' +
                        'font-size:22px;\n' +
                        'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:40px;">' + data[i].content + '</div>\n' +
                        '            <div style="position: absolute;top: 230px;width: 100%;text-align: center;height:28px;\n' +
                        'font-size:17px;\n' +
                        'font-family:PingFangSC-Medium,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(138,144,159,1);\n' +
                        'line-height:28px;">' + data[i].name + '</div>\n' +
                        '            <div style="position: absolute;;width: 190px;height: 50px;top: 308px;left: 45px;\n' +
                        '            background:linear-gradient(337deg,rgba(92,205,177,1) 0%,rgba(92,205,178,1) 0%,rgba(89,208,207,1) 100%);border-radius:26px;\n' +
                        'font-size:20px;\n' +
                        'font-family:PingFangSC-Regular,PingFang SC;\n' +
                        'font-weight:400;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:50px;text-align: center; cursor:pointer " onclick="scenesecondshow(\'' + data[i].id + '\',\'' + data[i].userKey + '\',\'' + data[i].name + '\')">进入</div>\n' +
                        '\n' +
                        '\n' +
                        '        </div>';
                } else {
                    var strVR = "tduvr://command=open&App=TDuVREngine&Scene=" + data[i].userKey + "/" + data[i].sceneContentId + "/" + data[i].sceneContentId + ".EXM&UserID=" + data[i].userKey + "&SceneOrModelID=" + data[i].sceneContentId + "&OpMode=TDuPractice&";
                    var strEdit = "tduvr://command=open&App=TDuVRDirector&Scene=" + data[i].userKey + "/" + data[i].sceneContentId + "/" + data[i].sceneContentId + ".EXM&UserID=" + data[i].userKey + "&SceneOrModelID=" + data[i].sceneContentId + "&OpMode=TDuPractice&";
                    var strFang = "tduvr://command=open&App=TDuSimEngine&Scene=" + data[i].userKey + "/" + data[i].sceneContentId + "/" + data[i].sceneContentId + ".EXM&UserID=" + data[i].userKey + "&SceneOrModelID=" + data[i].sceneContentId + "&OpMode=TDuPractice&";
                    var strWeb = "tduvr://command=open&App=TDuSimEngine&Scene=" + data[i].userKey + "/" + data[i].sceneContentId + "/" + data[i].sceneContentId + ".EXM&UserID=" + data[i].userKey + "&SceneOrModelID=" + data[i].sceneContentId + "&OpMode=TDuPractice&";
                    html += '        <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 90px;left: 85px;;width: 99px;height: 99px"><img src="../img/icon_3.png" style="height: 100%;width: 100%"/></div>\n' +
                        '            <div style="position: absolute;top: 220px;width: 100%;text-align: center;height:40px;\n' +
                        'font-size:22px;\n' +
                        'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:40px;">' + data[i].content + '</div>\n' +
                        '            <div style="position: absolute;bottom: 38px;width: 100%;height: 38px">\n' +
                        '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + strVR + '\'"><img src="img/ico/icon_vr.png" height="38" width="38" title="VR" /></div>\n' +
                        '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + strEdit + '\'"><img src="img/ico/icon_ffehg.png" height="38" width="38" title="编辑器"/></div>\n' +
                        '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="window.open(\'http://tdu.tduvr.club/TDuWebEngine/index.html?' + strWeb + '\')"><img src="img/ico/web.png" height="38" width="38" title="Web"/></div>\n' +
                        '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + strFang + '\'"><img src="img/ico/icon_fess.png" height="38" width="38" title="仿真" /></div>\n' +
                        '            </div>\n' +
                        '        </div>';
                }
            }
            $("#contentDiv").html(html);
        }
    })
}

//选择科目切换
function choosesub(id,name){
    console.log(id,name);
    $('.choosesub').attr('id',id);
    $(".choosesub").text(name);
    initleft(id);
}

/*
* 第二页以及后面的增加模型/文件夹弹窗
* */
function addModelFolder(KnowledgeId,treeId,lei){
    var content="../content/cz/addModel.html";
    /*var subid = "d36aa429-a200-4873-a884-81bf9a75c2b7"
    var lei="a9873c88-367c-4186-abd7-a6d07fdc05a8";*/
    var index =layer.open({
        type: 2,
        title: false,
        shadeClose: true,
        shade: 0.8,
        area: ['35%', '45%'],
        //content: 'content/cz/kaoshi.php' //iframe的url
        content: content+'?KnowledgeId='+KnowledgeId+"&treeId="+treeId+"&lei="+lei, //iframe的url
        //content: content+'?subid='+subid+"&lei="+lei, //iframe的url
        cancel: function(){
            //右上角关闭回调
            flag=1
            //return false 开启该代码可禁止点击该按钮关闭
        },
        end: function () {
            modelsecondshowUpdate(str1,str2,str3);
        }
    });
}
/*
 * 第一页增加模型/文件夹弹窗
 * */
function addModel(subid,lei){
    var content="../content/cz/addModelFolderFile.html";
    /*var subid = "d36aa429-a200-4873-a884-81bf9a75c2b7"
     var lei="a9873c88-367c-4186-abd7-a6d07fdc05a8";*/
    var index =layer.open({
        type: 2,
        title: false,
        shadeClose: true,
        shade: 0.8,
        area: ['70%', '70%'],
        //content: 'content/cz/kaoshi.php' //iframe的url
        //content: content+'?KnowledgeId='+KnowledgeId+"&treeId="+treeId+"&lei="+lei, //iframe的url
        content: content+'?subid='+subid+"&lei="+lei, //iframe的url
        cancel: function(){
            //右上角关闭回调
            flag=1
            //return false 开启该代码可禁止点击该按钮关闭
        },
        end: function () {
            if(flag==0){
                //addreturn();
            }
        }
    });
}
/*
 * 第一页增加场景/文件夹弹窗
 * */
function jumpScene(subid,lei) {
    var content="../content/cz/addScenelFolderFile.html";
    var index =layer.open({
        type: 2,
        title: false,
        shadeClose: true,
        shade: 0.8,
        area: ['70%', '70%'],
        //content: 'content/cz/kaoshi.php' //iframe的url
        content: content+'?subid='+subid+"&lei="+lei+'&userId='+userId, //iframe的url
        cancel: function(){
            //右上角关闭回调
            flag=1
            console.log("1111")
            //return false 开启该代码可禁止点击该按钮关闭
        },
        end: function () {
            if(flag==0){
                //addreturn();
            }
        }
    });
}

/*
 * 第二页增加场景/文件夹弹窗
 * */
function jumpSceneTwo(KnowledgeId,treeId,lei) {
    var content="../content/cz/addScene.html";
    var index =layer.open({
        type: 2,
        title: false,
        shadeClose: true,
        shade: 0.8,
        area: ['70%', '70%'],
        //content: 'content/cz/kaoshi.php' //iframe的url
        content: content+'?KnowledgeId='+KnowledgeId+"&treeId="+treeId+"&lei="+lei+'&userId='+userId, //iframe的url
        cancel: function(){
            //右上角关闭回调
            flag=1
            console.log("1111")
            //return false 开启该代码可禁止点击该按钮关闭
        },
        end: function () {
            scenesecondshowUpdate(str11,str22,str33);
        }
    });
}