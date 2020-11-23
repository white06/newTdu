var lei = '';

var pageUrl = "";

$(function () {
    //获取信息
    getName();
    //页面登录初始化
    initshow();
    getUserId();
    getPersonPhoto();
});

function getPersonPhoto() {
    //对用户名进行获取，要是session中无值，返回登录页面
    $.ajax({
        url: preurl + "UsersController/getPersonPhoto.action",
        type: "POST",
        async: true,
        success: function (data) {
            console.log(data.result)
            if (data.result != null) { //有个人头像
                document.getElementById("personPhoto").src = "http://file.tduvr.club/pp/" + data.result;
                $("#personPhoto").css("border-radius", "50px");
            } else { //无个人头像

            }
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
    for (let i = 0; i < filter.length; i++) {
        console.log($(filter[i]));
        filter[i].addEventListener('click', function () {
            filter[i].classList.add('activeLi')
            for (let j = 0; j < filter.length; j++) {
                if (i != j) {
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
        url: preurl + "UsersController/getUserId.action",
        type: "POST",
        async: true,
        success: function (data) {
            console.log(data)
            userId = data;
        }
    });
}

function getName() {
    //对用户名进行获取，要是session中无值，返回登录页面
    $.ajax({
        url: preurl + "ShouyeController/sUserName.action",
        type: "POST",
        async: true,
        success: function (data) {
            if (data == "err" || data == "") {
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

                setTimeout(function () {
                    if (xianzhi === 1) {
                        getName();
                        xianzhi = 0;
                    }
                }, 780000);
            }
        },
        error: function () {
            window.location.assign("login.html");
            return;
        }
    });
}

//退出登录，注销功能
function tuichu() {
    $.ajax({
        type: "POST",
        url: preurl + "UsersController/zhuxiao.action",
        success: function (data) {
            if (data == true) {
                getName();
            }
        }
    })
}

/*  考试的试卷 右上角 X  关闭*/
function closePage() {
    $("#xianshidiv").css("display", "none");
    $("#zhaozi").css("display", "none");
}

//初始化科目下拉框
function initshow() {


    var str = getCookie("tai");

    if (str == "0") {
        //首页初始化
        $.ajax({
            type: "POST",
            url: preurl + "ShouyeController/getSubjects_resource.action",
            success: function (data) {
                //科目树数据
                var submap = data[0];
                //键值获取
                var summap = Object.keys(data[0]);
                var html = "";
                if (summap != null) {
                    html += '<a  style=\"color:white;font-size:18px;\" class="choosesub" id="' + submap[summap[0]][0].id + '">' + submap[summap[0]][0].subjectName + '</a><dl class=\"layui-nav-child\" style=\"text-align: center\" >';
                }
                //初始化左边树
                initleft(submap[summap[0]][0].id);
                for (var i = 0; i < summap.length; i++) {
                    html += ' <dd ><a  >' + summap[i].split(',')[0] + '</a><ul>';
                    for (var j = 0; j < submap[summap[i]].length; j++) {
                        html += ' <dd style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"> <a style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" onclick="choosesub(\'' + submap[summap[i]][j].id + '\',\'' + submap[summap[i]][j].subjectName + '\')" id="' + submap[summap[i]][j].id + '">' + submap[summap[i]][j].subjectName + '</a>';
                    }
                    html += ' </ul></dd>';
                }
                $("#submap").html(html);
            }
        })
    } else if (str == "1") {
        //首页初始化
        $.ajax({
            type: "POST",
            url: preurl + "ShouyeController/getSubjects_develop.action",
            success: function (data) {
                //科目树数据
                var submap = data[0];
                //键值获取
                var summap = Object.keys(data[0]);
                var html = "";
                if (summap != null) {
                    html += '<a  style=\"color:white;font-size:18px;\" class="choosesub" id="' + submap[summap[0]][0].id + '">' + submap[summap[0]][0].subjectName + '</a><dl class=\"layui-nav-child\" style=\"text-align: center\" >';
                }
                //初始化左边树
                initleft(submap[summap[0]][0].id);
                for (var i = 0; i < summap.length; i++) {
                    html += ' <dd ><a  >' + summap[i].split(',')[0] + '</a><ul>';
                    for (var j = 0; j < submap[summap[i]].length; j++) {
                        html += ' <dd> <a onclick="choosesub(\'' + submap[summap[i]][j].id + '\',\'' + submap[summap[i]][j].subjectName + '\')" id="' + submap[summap[i]][j].id + '">' + submap[summap[i]][j].subjectName + '</a>';
                    }
                    html += ' </ul></dd>';
                }
                $("#submap").html(html);
            }
        })
    }


}

//首页跳转
function shouye() {
    window.location.href = "index.html";
}

var subject="";
//左边树初始化
function initleft(subid) {
    $("#contentDiv").html("");
    //$("#contentDiv").css("background-image","url(img/shuju.png)");
    $("#contentDiv").css("background-size", "97% 100%");
    $("#subjectId").val(subid);

    subject= $("#subjectId").val();
    console.log("   subject  : "+subject);

    $("#contentDiv").load("console.html");
    $.ajax({
        type: "POST",
        url: preurl + "SubjectTreeController/getUsersSub.action",
        data: {
            "majorId": subid
        },
        async: false,
        success: function (data) {
            var html = '';
            for (var i = 0; i < data.length; i++) {
                console.log(data[i])
                console.log(data[i].style)
                /*
                * 0-模型库  1-场景库 2-题库 3-考试 4-资源类
                * */
                if (data[i].style == 0) {  //模型库
                    html += ' <li class="navli" style="padding-top: 10px;padding-bottom: 10px"\n' +
                        '                id="' + data[i].id + '" onclick="showModels(\'' + data[i].id + '\',\'' + data[i].treeName + '\')"><a\n' +
                        '                    style=";position: relative"><img\n' +
                        '                    src="' + data[i].icon + '">\n' +
                        '                <span \n' +
                        '                      class="childrenspan" style="color: white;width: auto">' + data[i].treeName + '</span><img\n' +
                        '                        style="z-index: 2;position:absolute;top: 20%;right: 10px;height: 50%;width: auto"\n' +
                        '                        src="img/ico/icon_reat.png" alt=""/></a></li>';
                } else if (data[i].style == 1) { //场景库
                    html += ' <li class="navli" style="padding-top: 10px;padding-bottom: 10px"\n' +
                        '                id="' + data[i].id + '" onclick="showScenes(\'' + data[i].id + '\',\'' + data[i].treeName + '\')"><a\n' +
                        '                    style=";position: relative"><img\n' +
                        '                    src="' + data[i].icon + '">\n' +
                        '                <span \n' +
                        '                      class="childrenspan" style="color: white;width: auto">' + data[i].treeName + '</span><img\n' +
                        '                        style="z-index: 2;position:absolute;top: 20%;right: 10px;height: 50%;width: auto"\n' +
                        '                        src="img/ico/icon_reat.png" alt=""/></a></li>';
                } else if (data[i].style == 2) {  //题库
                    html += ' <li class="navli" style="padding-top: 10px;padding-bottom: 10px"\n' +
                        '                id="' + data[i].id + '" onclick="loadRightTest(\'' + data[i].id + '\',\'' + data[i].treeName + '\')"><a\n' +
                        '                    style=";position: relative"><img\n' +
                        '                    src="' + data[i].icon + '">\n' +
                        '                <span \n' +
                        '                      class="childrenspan" style="color: white;width: auto">' + data[i].treeName + '</span><img\n' +
                        '                        style="z-index: 2;position:absolute;top: 20%;right: 10px;height: 50%;width: auto"\n' +
                        '                        src="img/ico/icon_reat.png" alt=""/></a></li>';
                } else if (data[i].style == 3) {  //考试
                    html += ' <li class="navli" style="padding-top: 10px;padding-bottom: 10px"\n' +
                        '                id="' + data[i].id + '" onclick="loadRightPage(\'' + data[i].id + '\',\'' + data[i].treeName + '\')"><a\n' +
                        '                    style=";position: relative"><img\n' +
                        '                    src="' + data[i].icon + '">\n' +
                        '                <span \n' +
                        '                      class="childrenspan" style="color: white;width: auto">' + data[i].treeName + '</span><img\n' +
                        '                        style="z-index: 2;position:absolute;top: 20%;right: 10px;height: 50%;width: auto"\n' +
                        '                        src="img/ico/icon_reat.png" alt=""/></a></li>';
                } else if (data[i].style == 4) { //资源类
                    html += ' <li class="navli" style="padding-top: 10px;padding-bottom: 10px"\n' +
                        '                id="' + data[i].id + '"  onclick="showResources(\'' + data[i].id + '\',\'' + data[i].treeName + '\')"><a\n' +
                        '                    style=";position: relative"><img\n' +
                        '                    src="' + data[i].icon + '">\n' +
                        '                <span \n' +
                        '                      class="childrenspan" style="color: white;width: auto">' + data[i].treeName + '</span><img\n' +
                        '                        style="z-index: 2;position:absolute;top: 20%;right: 10px;height: 50%;width: auto"\n' +
                        '                        src="img/ico/icon_reat.png" alt=""/></a></li>';
                } else {
                    html += ' <li class="navli" style="padding-top: 10px;padding-bottom: 10px"\n' +
                        '                id="' + data[i].id + '" onclick="showmain(\'' + data[i].id + '\',\'' + data[i].treeName + '\')"><a\n' +
                        '                    style=";position: relative"><img\n' +
                        '                    src="' + data[i].icon + '">\n' +
                        '                <span \n' +
                        '                      class="childrenspan" style="color: white;width: auto">' + data[i].treeName + '</span><img\n' +
                        '                        style="z-index: 2;position:absolute;top: 20%;right: 10px;height: 50%;width: auto"\n' +
                        '                        src="img/ico/icon_reat.png" alt=""/></a></li>';
                }
                /*if(data[i].subjectKey!="6050b62c-4afd-4cab-94c6-57b5c9578f10"){
                html+=' <li style="padding-top: 10px;padding-bottom: 10px"\n' +
                    '                id="'+data[i].id+'" onclick="showmain(\''+data[i].id+'\',\''+data[i].treeName+'\')"><a\n' +
                    '                    style=";position: relative"><img\n' +
                    '                    src="'+data[i].icon+'">\n' +
                    '                <span id="childrenspan1"\n' +
                    '                      class="childrenspan" style="color: white;width: auto">'+data[i].treeName+'</span><img\n' +
                    '                        style="z-index: 2;position:absolute;top: 20%;right: 20px;height: 50%;width: auto"\n' +
                    '                        src="img/ico/icon_reat.png" alt=""/></a></li>';
                }else{
                    if(data[i].treeName=="总题库"){
                        html+=' <li style="padding-top: 10px;padding-bottom: 10px"\n' +
                            '                id="'+data[i].id+'" onclick="loadRightPage(\''+data[i].id+'\',\''+data[i].treeName+'\')"><a\n' +
                            '                    style=";position: relative"><img\n' +
                            '                    src="'+data[i].icon+'">\n' +
                            '                <span id="childrenspan1"\n' +
                            '                      class="childrenspan" style="color: white;width: auto">'+data[i].treeName+'</span><img\n' +
                            '                        style="z-index: 2;position:absolute;top: 20%;right: 20px;height: 50%;width: auto"\n' +
                            '                        src="img/ico/icon_reat.png" alt=""/></a></li>';
                    } else if(data[i].treeName=="电机控制题库"){
                        html+=' <li style="padding-top: 10px;padding-bottom: 10px"\n' +
                            '                id="'+data[i].id+'" onclick="loadRightPage(\''+data[i].id+'\',\''+data[i].treeName+'\')"><a\n' +
                            '                    style=";position: relative"><img\n' +
                            '                    src="'+data[i].icon+'">\n' +
                            '                <span id="childrenspan1"\n' +
                            '                      class="childrenspan" style="color: white;width: auto">'+data[i].treeName+'</span><img\n' +
                            '                        style="z-index: 2;position:absolute;top: 20%;right: 20px;height: 50%;width: auto"\n' +
                            '                        src="img/ico/icon_reat.png" alt=""/></a></li>';
                    }else if(data[i].treeName=="理论考试"){
                        html+=' <li style="padding-top: 10px;padding-bottom: 10px"\n' +
                            '                id="'+data[i].id+'" onclick="loadRightPage(\''+data[i].id+'\',\''+data[i].treeName+'\')"><a\n' +
                            '                    style=";position: relative"><img\n' +
                            '                    src="'+data[i].icon+'">\n' +
                            '                <span id="childrenspan1"\n' +
                            '                      class="childrenspan" style="color: white;width: auto">'+data[i].treeName+'</span><img\n' +
                            '                        style="z-index: 2;position:absolute;top: 20%;right: 20px;height: 50%;width: auto"\n' +
                            '                        src="img/ico/icon_reat.png" alt=""/></a></li>';
                    }else if(data[i].treeName=="电机控制理论考试"){
                        html+=' <li style="padding-top: 10px;padding-bottom: 10px"\n' +
                            '                id="'+data[i].id+'" onclick="loadRightPage(\''+data[i].id+'\',\''+data[i].treeName+'\')"><a\n' +
                            '                    style=";position: relative"><img\n' +
                            '                    src="'+data[i].icon+'">\n' +
                            '                <span id="childrenspan1"\n' +
                            '                      class="childrenspan" style="color: white;width: auto">'+data[i].treeName+'</span><img\n' +
                            '                        style="z-index: 2;position:absolute;top: 20%;right: 20px;height: 50%;width: auto"\n' +
                            '                        src="img/ico/icon_reat.png" alt=""/></a></li>';
                    }else{
                        html+=' <li style="padding-top: 10px;padding-bottom: 10px"\n' +
                            '                id="'+data[i].id+'" onclick="showmain(\''+data[i].id+'\',\''+data[i].treeName+'\')"><a\n' +
                            '                    style=";position: relative"><img\n' +
                            '                    src="'+data[i].icon+'">\n' +
                            '                <span id="childrenspan1"\n' +
                            '                      class="childrenspan" style="color: white;width: auto">'+data[i].treeName+'</span><img\n' +
                            '                        style="z-index: 2;position:absolute;top: 20%;right: 20px;height: 50%;width: auto"\n' +
                            '                        src="img/ico/icon_reat.png" alt=""/></a></li>';
                    }
                }*/
            }
            $("#subTree").html(html);
        }
    })
    clickLis();
}

function test(id) {
    //$("#"+id).find("a").css("background","linear-gradient(337deg,rgba(92,205,177,1) 0%,rgba(92,205,178,1) 0%,rgba(89,208,207,1) 100%)");
    $("#" + id).css("background", "linear-gradient(337deg,rgba(92,205,177,1) 0%,rgba(92,205,178,1) 0%,rgba(89,208,207,1) 100%)");
    //$("#"+id).find("span").css("color","rgb(52,57,61)");
}

function leave(id) {
    //$("#"+id).find("a").css("background","rgb(52, 57, 76)");
    $("#" + id).css("background", "rgb(52, 57, 76)");
    //$("#"+id).find("span").css("color","rgb(242,255,255)");
}


/**   題庫
 * 点击左侧菜单栏名字
 * 加载右侧页面
 * @param {Object} subjecttreeId 菜单栏的id
 * @param treeName    点击的右侧菜单栏的名字
 */
function loadRightTest(subjecttreeId, title) {

    clickLis();

    $("#img2").hide();
    $("#nowAddress").attr("onclick", "loadRightTest('" + (subjecttreeId) + "','" + title + "');");
    $("#nowAddress").text("" + title + "");
    $("#img").show()
    $("#nowAddress2").text(" ");

    $("#contentDiv").css("background-image", "url()");
    console.log("title   :" + title)
    $('#contentDiv').empty();
    //查询资源内容
    var url = houtaiurl + 'SubjectTreeController/queryKnowledgeContents.action';
    var params = {subjecttreeId: subjecttreeId};
    $.post(url, params, function (data) {
        var content = '';
        if (data.data != null && data.data.length > 0) {
            for (var i = 0; i < data.data.length; i++) {
                var imgUrl = '';
                console.log(data.data[i])
                if (data.data[i].knowledgecontentId == "00000000-0000-0000-0000-000000000000") {
                    imgUrl = 'img/ico/shu.png';
                    var dataImg = ' <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="img/icon_2.png" style="width: 100%;height: 100%;"/></div>\n' +
                        '            <div style="position: absolute;top: 180px;width: 100%;text-align: center;height:40px;\n' +
                        'font-size:22px;\n' +
                        'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:40px;">' + data.data[i].content + '</div>\n' +
                        '            <div style="position: absolute;;width: 190px;height: 50px;top: 308px;left: 45px;\n' +
                        '            background:linear-gradient(337deg,rgba(92,205,177,1) 0%,rgba(92,205,178,1) 0%,rgba(89,208,207,1) 100%);border-radius:26px;\n' +
                        'font-size:20px;\n' +
                        'font-family:PingFangSC-Regular,PingFang SC;\n' +
                        'font-weight:400;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:50px;text-align: center; cursor:pointer " onclick="openTest(\'' + data.data[i].id + '\',\'' + title + '\')">进入</div>\n' +
                        '\n' +
                        '\n' +
                        '        </div>';
                } else {
                    imgUrl = 'img/ico/shiti.png';
                    var dataImg = '<div class="dataDiv" title=\"' + data.data[i].content + '\" onclick="Test(\'' + data.data[i].id + '\',\'' + title + '\')">' +
                        '<div class="footImg-div">' +
                        '<img src=' + imgUrl + ' class="footImg"/>' +
                        '</div>' +
                        '<div class="dataName"><span>' +
                        data.data[i].content +
                        '</span></div>' +
                        '</div>';
                }
                content += dataImg;
            }
            $('#contentDiv').html(content);
        } else {
            var html = '<div style="width:450px;' +
                'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">' +
                '<img src="img/bg_huangying2.png" style="height: 100%;width: 100%">' +
                '</div>';
            $("#contentDiv").html(html);
        }


    });
}

/**  考试
 * 点击左侧菜单栏名字
 * 加载右侧页面
 * @param {Object} subjecttreeId 菜单栏的id
 * @param treeName    点击的右侧菜单栏的名字
 */
function loadRightPage(subjecttreeId, title) {

    clickLis();

    $("#img2").hide();
    $("#nowAddress").attr("onclick", "loadRightPage('" + (subjecttreeId) + "','" + title + "');");
    $("#nowAddress").text("" + title + "");
    $("#img").show();
    $("#nowAddress2").text(" ");

    $("#contentDiv").css("background-image", "url()");
    console.log("title   :" + title)
    $('#contentDiv').empty();
    //查询资源内容
    var url = houtaiurl + 'KaoshiController/kaoshi.action';
    var params = {subId: $('.choosesub', document)[0].id};
    $.post(url, params, function (data) {
        var content = '';
        var imgUrl = 'img/ico/shiti.png';
        if (data.length > 0 && data != null) {
            for (var i in data) {
                var dataImg = ' <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                    '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="img/icon_2.png" style="width: 100%;height: 100%;"/></div>\n' +
                    '            <div style="position: absolute;top: 180px;width: 100%;text-align: center;height:40px;\n' +
                    'font-size:22px;\n' +
                    'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                    'font-weight:500;\n' +
                    'color:rgba(255,255,255,1);\n' +
                    'line-height:40px;">' + data[i].name + '</div>\n' +
                    '            <div style="position: absolute;;width: 190px;height: 50px;top: 308px;left: 45px;\n' +
                    '            background:linear-gradient(337deg,rgba(92,205,177,1) 0%,rgba(92,205,178,1) 0%,rgba(89,208,207,1) 100%);border-radius:26px;\n' +
                    'font-size:20px;\n' +
                    'font-family:PingFangSC-Regular,PingFang SC;\n' +
                    'font-weight:400;\n' +
                    'color:rgba(255,255,255,1);\n' +
                    'line-height:50px;text-align: center; cursor:pointer " onclick="errortrue(\'' + data[i].examPager + '\',\'' + title + '\')">进入</div>\n' +
                    '\n' +
                    '\n' +
                    '        </div>';
                content += dataImg;
            }
            $('#contentDiv').html(content);
        } else {
            var html = '<div style="width:450px;' +
                'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">' +
                '<img src="img/bg_huangying2.png" style="height: 100%;width: 100%">' +
                '</div>';
            $("#contentDiv").html(html);
        }
    });
}

//该学生是否做过该试卷的判断
function errortrue(examPager) {
    console.log("examPager   :" + examPager)
    $.ajax({
        type: "POST",
        url: houtaiurl + "KaoshiController/checked.action?pageId=" + examPager,
        success: function (data) {
            ChooseSubject = examPager;
            $("#zhaozi,#xianshidiv").show();
            getHeight();
            $("#xianshiwenjian").css("background", "#FFFFFF");
            $("#xianshiwenjian").load('SysAdministrate/examination/kaoshi.html');
        }
    })
}

//获取此时框的高度，然后得到文件框的高度
function getHeight() {
    var getDiv = window.document.getElementById('xianshidiv');
    var getDiv1 = window.document.getElementById('xianshiwenjian');
    var divHeight = getDiv.offsetHeight;
    getDiv1.style.height = (parseInt(divHeight) - parseInt(32)) + 'px';
}

/**
 * 打开小节试卷
 * @param {Object} treeId
 */
function openTest(treeId, title) {
    $("#img2").show();
    $("#nowAddress2").attr("onclick", "openTest('" + (treeId) + "','" + title + "');");
    $("#nowAddress2").text("" + title + "");

    var url = houtaiurl + 'SubjectTreeController/loadAllKnowledges.action';
    $.post(url, {
        treeId: treeId
    }, function (data) {
        var content = '';
        for (var i in data.data) {
            var dataImg = '';
            if (data.data[i].knowledgecontentId == "00000000-0000-0000-0000-000000000000") {
                imgUrl = 'img/ico/shu.png';
            } else {
                imgUrl = 'img/ico/shiti.png';
            }
            dataImg = ' <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="img/icon_2.png" style="width: 100%;height: 100%;"/></div>\n' +
                '            <div style="position: absolute;top: 180px;width: 100%;text-align: center;height:40px;\n' +
                'font-size:22px;\n' +
                'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                'font-weight:500;\n' +
                'color:rgba(255,255,255,1);\n' +
                'line-height:40px;">' + data.data[i].content + '</div>\n' +
                '            <div style="position: absolute;;width: 190px;height: 50px;top: 308px;left: 45px;\n' +
                '            background:linear-gradient(337deg,rgba(92,205,177,1) 0%,rgba(92,205,178,1) 0%,rgba(89,208,207,1) 100%);border-radius:26px;\n' +
                'font-size:20px;\n' +
                'font-family:PingFangSC-Regular,PingFang SC;\n' +
                'font-weight:400;\n' +
                'color:rgba(255,255,255,1);\n' +
                'line-height:50px;text-align: center; cursor:pointer " onclick="Test(\'' + data.data[i].id + '\',\'' + title + '\')">进入</div>\n' +
                '\n' +
                '\n' +
                '        </div>';
            content += dataImg;
            $('#contentDiv').empty();
            $('#contentDiv').append(content);
        }
    });
}

/**
 *
 * @param {Object} knowledgeId
 */
function Test(knowledgeId, title) {
    /*$('#contentDiv').load("content/ErrorQues/allque.php?knowledgeId="+knowledgeId);*/
    if (title == "总题库") {
        layer.open({
            type: 2,
            title: "总题库",
            shadeClose: true,
            shade: 0.8,
            area: ['1300px', '90%'],
            content: 'content/ErrorQues/allque.html?knowledgeId=' + knowledgeId
        });
    } else {
        layer.open({
            type: 2,
            title: "总题库",
            shadeClose: true,
            shade: 0.8,
            area: ['1300px', '90%'],
            //content: 'content/ErrorQues/test.html?knowledgeId=' + knowledgeId
            content: 'content/ErrorQues/allque.html?knowledgeId=' + knowledgeId
        });
    }

}

var panduan = 0;

//主页显示 模型
function showModels(subid, treeName) {

    clickLis();


    $("#subId").text(subid);

    $("#img2").hide();
    $("#nowAddress").attr("onclick", "showModels('" + (subid) + "','" + treeName + "');");
    $("#nowAddress").text("" + treeName + "");
    $("#img").show();
    $("#nowAddress2").text(" ");

    $("#contentDiv").css("background-image", "url()");
    $("#contentDiv").html("");
    $.ajax({
        type: "POST",
        url: preurl + "DevelopModelController/getModelsFis.action",
        data: {"subTreeId": subid},
        success: function (data) {
            if (data != null && data.length > 0) {
                //模型库跳转
                getdivmodel(data[0].id);
                //获取div里信息，主页面显示内容
            } else {
                var html = '<div style="width:450px;' +
                    'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">' +
                    '<img src="img/bg_huangying2.png" style="height: 100%;width: 100%">' +
                    '</div>';
                $("#contentDiv").html(html);
            }
        }
    })
}

var subTreeId = "";

//主页显示 場景
function showScenes(subid, treeName) {

    subTreeId = subid;
    clickLis();

    $("#subId").text(subid);

    $("#img2").hide();
    $("#nowAddress").attr("onclick", "showScenes('" + (subid) + "','" + treeName + "');");
    $("#nowAddress").text("" + treeName + "");
    $("#img").show();
    $("#nowAddress2").text(" ");

    $("#contentDiv").css("background-image", "url()");
    $("#contentDiv").html("");
    $.ajax({
        type: "POST",
        url: preurl + "DevelopScenesController/getScenesFis.action",
        data: {"subTreeId": subid},
        success: function (data) {
            console.log(data == null)
            if (data != null && data.length > 0) {
                getdivscene(data[0].id);
                //获取div里信息，主页面显示内容
            } else {
                var html = '<div style="width:450px;' +
                    'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">' +
                    '<img src="img/bg_huangying2.png" style="height: 100%;width: 100%">' +
                    '</div>';
                $("#contentDiv").html(html);
            }
        }
    })
}

//主页显示 資源類   Knowledges表中内容
function showResources(subid, treeName) {

    clickLis();

    $("#img2").hide();
    $("#nowAddress").attr("onclick", "showResources('" + (subid) + "','" + treeName + "');");
    $("#nowAddress").text("" + treeName + "");
    $("#img").show();
    $("#nowAddress2").text(" ");

    $("#contentDiv").css("background-image", "url()");
    $("#contentDiv").html("");
    $.ajax({
        type: "POST",
        url: preurl + "KnowledgesController/getKnowledgesFis.action",
        data: {
            "subTreeId": subid
        },
        success: function (data) {
            console.log(data);
            if (data.length > 0 && data != null) {
                getdivdoc(data[0].id);
                //获取div里信息，主页面显示内容
            } else {
                var html = '<div style="width:450px;' +
                    'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">' +
                    '<img src="img/bg_huangying2.png" style="height: 100%;width: 100%">' +
                    '</div>';
                $("#contentDiv").html(html);
            }

        }
    })
}

function showmain(subid, treeName) {

    clickLis();

    $("#img2").hide();
    $("#nowAddress").attr("onclick", "showmain('" + (subid) + "','" + treeName + "');");
    $("#nowAddress").text("" + treeName + "");
    $("#img").show();
    $("#nowAddress2").text(" ");

    $("#contentDiv").css("background-image", "url()");
    if (treeName == "模型库") {
        $.ajax({
            type: "POST",
            url: preurl + "DevelopModelController/getModelsFis.action",
            data: {"subTreeId": subid},
            success: function (data) {
                if (data != null && data.length > 0) {
                    //模型库跳转
                    getdivmodel(data[0].id);
                    //获取div里信息，主页面显示内容
                } else {
                    var html = '<div style="width:450px;' +
                        'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">' +
                        '<img src="img/bg_huangying2.png" style="height: 100%;width: 100%">' +
                        '</div>';
                    $("#contentDiv").html(html);
                }
            }
        })
    } else if (treeName == "声音库") {
        $("#contentDiv").html("");
        var html = '<div style="width:450px;' +
            'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">' +
            '<img src="img/bg_huangying2.png" style="height: 100%;width: 100%">' +
            '</div>';
        $("#contentDiv").html(html);
    } else if (treeName == "场景库") {
        $.ajax({
            type: "POST",
            url: preurl + "DevelopScenesController/getScenesFis.action",
            data: {"subTreeId": subid},
            success: function (data) {
                if (data != null && data.length > 0) {
                    getdivscene(data[0].id);
                    //获取div里信息，主页面显示内容
                } else {
                    var html = '<div style="width:450px;' +
                        'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">' +
                        '<img src="img/bg_huangying2.png" style="height: 100%;width: 100%">' +
                        '</div>';
                    $("#contentDiv").html(html);
                }
            }
        })
    } else if (treeName == "贴图库") {
        $("#contentDiv").html("");
        var html = '<div style="width:450px;' +
            'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">' +
            '<img src="img/bg_huangying2.png" style="height: 100%;width: 100%">' +
            '</div>';
        $("#contentDiv").html(html);
    } else if (treeName == "文档库") {
        panduan = 1;
        $("#contentDiv").html("");
        $.ajax({
            type: "POST",
            url: preurl + "KnowledgesController/getKnowledgesFis.action",
            data: {"subTreeId": subid},
            success: function (data) {
                console.log(data);
                if (data.length > 0 && data != null) {
                    getdivdoc(data[0].id);
                    //获取div里信息，主页面显示内容
                } else {
                    var html = '<div style="width:450px;' +
                        'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">' +
                        '<img src="img/bg_huangying2.png" style="height: 100%;width: 100%">' +
                        '</div>';
                    $("#contentDiv").html(html);
                }
            }
        })
    } else if (treeName == "资源库") {
        panduan = 0;
        $("#contentDiv").html("");
        $.ajax({
            type: "POST",
            url: preurl + "KnowledgesController/getKnowledgesFis.action",
            data: {"subTreeId": subid},
            success: function (data) {
                console.log(data);
                if (data.length > 0 && data != null) {
                    getdivdoc(data[0].id);
                    //获取div里信息，主页面显示内容
                } else {
                    var html = '<div style="width:450px;' +
                        'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">' +
                        '<img src="img/bg_huangying2.png" style="height: 100%;width: 100%">' +
                        '</div>';
                    $("#contentDiv").html(html);
                }
            }
        })
    } else if (treeName == "素材库") {
        panduan = 0;
        $("#contentDiv").html("");
        $.ajax({
            type: "POST",
            url: preurl + "KnowledgesController/getKnowledgesFis.action",
            data: {"subTreeId": subid},
            success: function (data) {
                console.log(data);
                if (data.length > 0 && data != null) {
                    getdivdoc(data[0].id);
                    //获取div里信息，主页面显示内容
                } else {
                    var html = '<div style="width:450px;' +
                        'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">' +
                        '<img src="img/bg_huangying2.png" style="height: 100%;width: 100%">' +
                        '</div>';
                    $("#contentDiv").html(html);
                }
            }
        })
    } else if (treeName == "文本库") {
        panduan = 0;
        $("#contentDiv").html("");
        $.ajax({
            type: "POST",
            url: preurl + "KnowledgesController/getKnowledgesFis.action",
            data: {"subTreeId": subid},
            success: function (data) {
                console.log(data);
                if (data.length > 0 && data != null) {
                    getdivdoc(data[0].id);
                    //获取div里信息，主页面显示内容
                } else {
                    var html = '<div style="width:450px;' +
                        'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">' +
                        '<img src="img/bg_huangying2.png" style="height: 100%;width: 100%">' +
                        '</div>';
                    $("#contentDiv").html(html);
                }
            }
        })
    } else if (treeName == "数据库") {
        panduan = 0;
        $("#contentDiv").html("");
        $.ajax({
            type: "POST",
            url: preurl + "KnowledgesController/getKnowledgesFis.action",
            data: {"subTreeId": subid},
            success: function (data) {
                console.log(data);
                if (data.length > 0 && data != null) {
                    getdivdoc(data[0].id);
                    //获取div里信息，主页面显示内容
                } else {
                    var html = '<div style="width:450px;' +
                        'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">' +
                        '<img src="img/bg_huangying2.png" style="height: 100%;width: 100%">' +
                        '</div>';
                    $("#contentDiv").html(html);
                }
            }
        })
    } else if (treeName == "电机控制实验仿真") {
        panduan = 0;
        $("#contentDiv").html("");
        $.ajax({
            type: "POST",
            url: preurl + "KnowledgesController/getKnowledgesFis.action",
            data: {"subTreeId": subid},
            success: function (data) {
                console.log(data);
                if (data.length > 0 && data != null) {
                    getdivdoc(data[0].id);
                    //获取div里信息，主页面显示内容
                } else {
                    var html = '<div style="width:450px;' +
                        'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">' +
                        '<img src="img/bg_huangying2.png" style="height: 100%;width: 100%">' +
                        '</div>';
                    $("#contentDiv").html(html);
                }
            }
        })
    } else if (treeName == "电机控制实验视频") {
        panduan = 0;
        $("#contentDiv").html("");
        $.ajax({
            type: "POST",
            url: preurl + "KnowledgesController/getKnowledgesFis.action",
            data: {"subTreeId": subid},
            success: function (data) {
                console.log(data);
                if (data.length > 0 && data != null) {
                    getdivdoc(data[0].id);
                    //获取div里信息，主页面显示内容
                } else {
                    var html = '<div style="width:450px;' +
                        'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">' +
                        '<img src="img/bg_huangying2.png" style="height: 100%;width: 100%">' +
                        '</div>';
                    $("#contentDiv").html(html);
                }
            }
        })
    } else if (treeName == "电机控制实验指导") {
        panduan = 0;
        $("#contentDiv").html("");
        $.ajax({
            type: "POST",
            url: preurl + "KnowledgesController/getKnowledgesFis.action",
            data: {"subTreeId": subid},
            success: function (data) {
                console.log(data);
                if (data.length > 0 && data != null) {
                    getdivdoc(data[0].id);
                    //获取div里信息，主页面显示内容
                } else {
                    var html = '<div style="width:450px;' +
                        'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">' +
                        '<img src="img/bg_huangying2.png" style="height: 100%;width: 100%">' +
                        '</div>';
                    $("#contentDiv").html(html);
                }

            }
        })
    } else if (treeName == "电机控制实验考核") {
        panduan = 0;
        $("#contentDiv").html("");
        $.ajax({
            type: "POST",
            url: preurl + "KnowledgesController/getKnowledgesFis.action",
            data: {"subTreeId": subid},
            success: function (data) {
                console.log(data);
                if (data.length > 0 && data != null) {
                    getdivdoc(data[0].id);
                    //获取div里信息，主页面显示内容
                } else {
                    var html = '<div style="width:450px;' +
                        'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">' +
                        '<img src="img/bg_huangying2.png" style="height: 100%;width: 100%">' +
                        '</div>';
                    $("#contentDiv").html(html);
                }
            }
        })
    }
}

//获取主页显示内容，模型（首级获取）
function getdivmodel(subid) {
    var majorid = $(".choosesub")[0].id;
    $.ajax({
        type: "POST",
        url: preurl + "DevelopModelController/getModelsSecondAll.action",
        data: {
            "KnowledgesFisId": subid,
            "subjectId": majorid
        },
        success: function (data) {

            var subid = parent.$("#subId").text();
            var lei = ""

            var html = '';
            html += ' <div onclick="addModel(\'' + subid + '\',\'' + lei + '\')" style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative;cursor:pointer;cursor:pointer">\n' +
                '        <div  style="width: 100px;height: 100px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -50px;margin-left: -50px; ">\n' +
                '            <img src="img/icon_more.png" height="100" width="100"/>\n' +
                '        </div>\n' +
                '        </div>';
            for (var i = 0; i < data.length; i++) {
                if (data[i].modelContentId == "00000000-0000-0000-0000-000000000000") {
                    html += ' <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="img/icon_1.png" style="width: 100%;height: 100%;"/></div>\n' +
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
                    var str = "tduvr://command=open&App=TDuVRDirector&Scene=" + data[i].userKey + "/" + data[i].modelContentId + "/" + data[i].name + "&UserID=" + data[i].userKey + "&SceneOrModelID=" + data[i].id + "&OpMode=TDuPractice&";
                    html += '        <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 90px;left: 85px;;width: 99px;height: 99px"><img src="img/icon_3.png" style="height: 100%;width: 100%"/></div>\n' +
                        '            <div style="position: absolute;top: 220px;width: 100%;text-align: center;height:40px;\n' +
                        'font-size:22px;\n' +
                        'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:40px;">' + data[i].content + '</div>\n' +
                        '            <div style="position: absolute;bottom: 38px;width: 100%;height: 38px">\n' +
                        /*'                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\''+str+'\'"><img src="img/ico/icon_vr.png" height="38" width="38" title="VR"/></div>\n' +
                        '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\''+str+'\'"><img src="img/ico/icon_ffehg.png" height="38" width="38" title="编辑器"/></div>\n' +
                        '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\''+str+'\'"><img src="img/ico/icon_fess.png" height="38" width="38" title="仿真"/></div>\n' +*/
                        '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="getModelVRLink(\'' + data[i].id + '\',\'' + 1 + '\',\'' + 1 + '\')"><img src="img/ico/icon_vr.png" height="38" width="38" title="VR"/></div>\n' +
                        '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="getModelLink(\'' + data[i].id + '\',\'' + 2 + '\',\'' + 1 + '\')"><img src="img/ico/icon_ffehg.png" height="38" width="38" title="编辑器"/></div>\n' +
                        '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="getModelLink(\'' + data[i].id + '\',\'' + 4 + '\',\'' + 1 + '\')"><img src="img/ico/icon_fess.png" height="38" width="38" title="仿真"/></div>\n' +
                        '            </div>\n' +
                        '        </div>';
                }

            }
            $("#contentDiv").html(html);
        }
    })
}

function getModelVRLink(modelId, mark, type) {

    let content = "https://tdu.tduvr.club/TDuVRWebEngine/VRParameter.html";

    var count = mark;
    modelId = Base64.encode(modelId);
    mark = Base64.encode(mark);
    type = Base64.encode(type);
    console.log(modelId, mark, type)

    //  flag参数 1-模型  2-场景 3-资源类型

    var link = "tduvr://command=open&App=";
    if (count == 1) {
        link = link + "TDuVREngine";
    } else if (count == 2) {
        link = link + "TDuVRDirector";
    } else if (count == 3) {
        link = link + "TDuSimEngine";
    } else if (count == 4) {
        link = link + "TDuSimEngine";
    }
    link = link + "&knowledgeId=" + modelId + "&mark=" + mark + "&type=" + type + "&flag=" + "1&";
    console.log(link);
    var index = layer.open({
        type: 2,
        title: false,
        shadeClose: true,
        shade: 0.8,
        area: ['60%', '70%'],
        //content: 'content/cz/kaoshi.php' //iframe的url
        //content: content + '?modelId=' + modelId + "&mark=" + mark + '&type=' + type + '&subTreeId=' + subTreeId + '&userId=' + userId, //iframe的url
        content: content + '?' + link, //iframe的url
        cancel: function () {
            //右上角关闭回调
            flag = 1
            console.log("1111")
            //return false 开启该代码可禁止点击该按钮关闭
        },
        end: function () {
            if (flag == 0) {
                //addreturn();
            }
        }
    });
    //window.location.href = link;
    //window.open("https://tdu.tduvr.club/TDuWebEngine/index.html?" + link);
    // $.ajax({
    //     url: preurl + "DevelopModelController/getLink.action",
    //     type: "POST",
    //     data: {"knowledgeId": modelId, "mark": mark, "type": type},
    //     success: function (data) {
    //         //name = name + "KnowledgeID=" + knowContentId + "&OperateID=" + userId + "&"+ "loginId=" + data+"&";
    //         //   window.location.href=name;
    //         //window.location.href=data
    //         console.log(data);
    //     },
    //     error: function () {
    //         return;
    //     }
    // });
}
function getModelLink(modelId, mark, type) {
    var count = mark;
    modelId = Base64.encode(modelId);
    mark = Base64.encode(mark);
    type = Base64.encode(type);
    console.log(modelId, mark, type)

    //  flag参数 1-模型  2-场景 3-资源类型

    var link = "tduvr://command=open&App=";
    if (count == 1) {
        link = link + "TDuVREngine";
    } else if (count == 2) {
        link = link + "TDuVRDirector";
    } else if (count == 3) {
        link = link + "TDuSimEngine";
    } else if (count == 4) {
        link = link + "TDuSimEngine";
    }
    link = link + "&knowledgeId=" + modelId + "&mark=" + mark + "&type=" + type + "&flag=" + "1&";
    console.log(link);
    //window.location.href = link;
	window.open("https://tdu.tduvr.club/TDuWebEngine/index.html?" + link);
    $.ajax({
        url: preurl + "DevelopModelController/getLink.action",
        type: "POST",
        data: {"knowledgeId": modelId, "mark": mark, "type": type},
        success: function (data) {
            //name = name + "KnowledgeID=" + knowContentId + "&OperateID=" + userId + "&"+ "loginId=" + data+"&";
            //   window.location.href=name;
            //window.location.href=data
            console.log(data);
        },
        error: function () {
            return;
        }
    });
}

function getSceneLink2(sceneId, mark, type) {
    console.log(pageUrl)
    // layer.confirm('请选择是考试还是练习！', {
    //     btn: ['考试', '练习'] //按钮
    // }, function(){
    //     type="2";
    //     getSceneLink(sceneId,mark,type)
    // }, function(){
    //     getSceneLink(sceneId,mark,type)
    // });
    var content = "content/cz/chosePage.html";
    var index = layer.open({
        type: 2,
        title: false,
        shadeClose: true,
        shade: 0.8,
        area: ['20%', '30%'],
        //content: 'content/cz/kaoshi.php' //iframe的url
        content: content + '?sceneId=' + sceneId + "&mark=" + mark + '&type=' + type + '&subTreeId=' + subTreeId + '&userId=' + userId, //iframe的url
        cancel: function () {
            //右上角关闭回调
            flag = 1
            console.log("1111")
            //return false 开启该代码可禁止点击该按钮关闭
        },
        end: function () {
            if (flag == 0) {
                //addreturn();
            }
        }
    });

}

function getSceneEditor(sceneContentId, userKey, type,sceneId,mark) {
    sceneContentId = Base64.encode(sceneContentId);
    userKey = Base64.encode(userKey);

    var count = mark;
    var scene = sceneId
    sceneId = Base64.encode(sceneId);
    mark = Base64.encode(mark);
    type = Base64.encode(type);
    //  mark 1-VR：TDuVREngine    2-编辑器 : TDuVRDirector  3-WEBGl :TDuSimEngine 4-仿真 :TDuSimEngine
    //  flag参数 1-模型  2-场景 3-资源类型
    var link = "tduvr://command=open&App=TDuSimEngine";
    link = link + "&knowledgeId=" + sceneId + "&mark=" + mark + "&type=" + type + "&flag=" + "2&";
    let endLink = ""
    if(count!="3"){
        window.location.href=link;
    }else{
        if(scene=="e92eba19-f405-42b2-bfed-7ffc7f0df5a3"){
            endLink = "https://tdu.tduvr.club/Interpretation/index.html?"+link+"&key="+userId;
        }else if(scene=="dbb7777c-0df5-47f2-9eb3-af0c0b383ef0"||scene=="e577ff7d-92d1-48c5-9f81-3674694963b0"
            ||scene=="14df764a-9c64-4def-918c-1d8a33d929ad"||scene=="5eb2b1d8-9d54-497c-9e8f-68ce5932f947"){
            endLink = "https://tdu.tduvr.club/TDuCosmetics/index.html?"+link+"&key="+userId
        }else if(scene=="4437df7e-ce70-4a88-a164-80f393d826a5"){
            endLink = "https://tdu.tduvr.club/TDuCo2fireSystem/index.html?"+link+"&key="+userId
        }else if(scene == "8e6d8428-def5-427a-a88c-c621c25d69f4" || scene == "4018b621-52dc-4277-a48e-d3c4d5c35be2"
            || scene == "ee6a337f-17cd-4a23-8980-518b39f981ea") {
            endLink = "https://tdu.tduvr.club/TDuLiyuanOpera/index.html?"+link+"&key="+userId
        }else if(scene=="f6440981-26e4-4c3f-af1f-a43d979eec5f"){
            endLink = "https://tdu.tduvr.club/TDuECU/index.html?"+link+"&key="+userId
        }else if(scene=="d81b9ef2-bed1-42ce-9f22-342e9351d23e"){
            endLink = "https://tdu.tduvr.club/TDuSeduJiankong/index.html?"+link+"&key="+userId
        }else if(scene=="408e0167-2924-45df-9367-2e137f07d41f"){
            endLink = "https://tdu.tduvr.club/TDuBlueOffice/index.html?"+link+"&key="+userId
        }else if(scene=="24512b73-7a65-4fe2-975e-1b5ccc6d8571"){
            endLink = "https://tdu.tduvr.club/MusicOffice/index-musicoffice.html?"+link+"&key="+userId
        }else if(scene=="49ed746e-f131-4ce0-aab9-956fbf965fb8"||
            scene=="18132d4c-5691-4006-b61a-1f5f3ec3c07e"||scene=="1bd47b35-eea9-4615-b12b-3ac1d2265633"){
            endLink = "https://tdu.tduvr.club/BuildScan/index-buildScan.html?"+link+"&key="+userId
        }else if(scene=="bdd43444-e830-42b8-a78f-783bbc39788c"||
            scene=="b2a747bf-d6e8-4228-82b2-3b0a3806d9e9"){0
            endLink = "https://tdu.tduvr.club/BuildScan/index-buildScan.html?"+link+"&key="+userId
        }else if(subTreeId=="a4bc82f4-f25c-4431-8562-6d2561ce082f"&&scene!="24512b73-7a65-4fe2-975e-1b5ccc6d8571"){
            endLink = "https://tdu.tduvr.club/MusicOffice/index-musicoffice.html?"+link+"&key="+userId+"&isVisitor=scheme&"
        }else if(subTreeId=="a4b34abf-6c34-452e-aa13-899513bce279"){
            endLink = "https://tdu.tduvr.club/TDuGeneVaccine/index.html?"+link+"&key="+userId+"&"
        }else if(subTreeId=="46fa8aaa-bcb3-48cd-8e3f-9f23c67111d2"){
            endLink = "https://tdu.tduvr.club/TDuCultivatingCorals/index.html?"+link+"&key="+userId+"&"
        }else if(scene=="1fbc02bd-8c2f-43b7-a76e-bdfeb357d073"){
            endLink = "https://tdu.tduvr.club/bagualou/index.html"
        } else{
            endLink = "https://tdu.tduvr.club/TDuWebEngine/index.html?"+link
        }
    }
    endLink = Base64.encode(endLink);
    console.log(endLink)
    //window.open("http://192.168.0.19:8080/index.html?sceneContentId="+sceneContentId+"&userKey="+userKey+"&endLink="+endLink);
    window.open("https://tdu.tduvr.club/TduWebEdit/index.html?sceneContentId=" + sceneContentId + "&userKey=" + userKey+"&endLink="+endLink);
}

function getSceneLink(sceneId, mark, type) {
    console.log(sceneId, mark, type)
    var scene = sceneId
    var count = mark;
    sceneId = Base64.encode(sceneId);
    mark = Base64.encode(mark);
    type = Base64.encode(type);

    //  mark 1-VR：TDuVREngine    2-编辑器 : TDuVRDirector  3-WEBGl :TDuSimEngine 4-仿真 :TDuSimEngine

    //  flag参数 1-模型  2-场景 3-资源类型

    var link = "tduvr://command=open&App=";
    if (count == 1) {
        link = link + "TDuVREngine";
    } else if (count == 2) {
        link = link + "TDuVRDirector";
    } else if (count == 3) {
        link = link + "TDuSimEngine";
    } else if (count == 4) {
        link = link + "TDuSimEngine";
    }
    link = link + "&knowledgeId=" + sceneId + "&mark=" + mark + "&type=" + type + "&flag=" + "2&";
    console.log(link);
    if (count != "3") {
        if(count == 1){
            if (scene == "9faa6f5c-a662-41a1-9f7e-1f9e43c38b34") {
                window.open("https://tdu.tduvr.club/TDuVRWebEngine/index.html?" + link + "&key=" + userId);
            }else{
                window.location.href = link;
            }
        }else{
            window.location.href = link;
        }  
    } else {
        if (scene == "e92eba19-f405-42b2-bfed-7ffc7f0df5a3") {
            window.open("https://tdu.tduvr.club/Interpretation/index.html?" + link + "&key=" + userId);
        } else if (scene == "dbb7777c-0df5-47f2-9eb3-af0c0b383ef0" || scene == "e577ff7d-92d1-48c5-9f81-3674694963b0"
            || scene == "14df764a-9c64-4def-918c-1d8a33d929ad" || scene == "5eb2b1d8-9d54-497c-9e8f-68ce5932f947") {
            window.open("https://tdu.tduvr.club/TDuCosmetics/index.html?" + link + "&key=" + userId);
        } else if (scene == "4437df7e-ce70-4a88-a164-80f393d826a5") {
            window.open("https://tdu.tduvr.club/TDuCo2fireSystem/index.html?" + link + "&key=" + userId);
        } else if (scene == "8e6d8428-def5-427a-a88c-c621c25d69f4" || scene == "4018b621-52dc-4277-a48e-d3c4d5c35be2"
            || scene == "ee6a337f-17cd-4a23-8980-518b39f981ea") {
            window.open("https://tdu.tduvr.club/TDuLiyuanOpera/index.html?" + link + "&key=" + userId);
        } else if (scene == "f6440981-26e4-4c3f-af1f-a43d979eec5f") {
            window.open("https://tdu.tduvr.club/TDuECU/index.html?" + link + "&key=" + userId);
        } else if (scene == "d81b9ef2-bed1-42ce-9f22-342e9351d23e") {
            window.open("https://tdu.tduvr.club/TDuSeduJiankong/index.html?" + link + "&key=" + userId);
        } else if (scene == "408e0167-2924-45df-9367-2e137f07d41f") {
            window.open("https://tdu.tduvr.club/TDuBlueOffice/index.html?" + link + "&key=" + userId);
        } else if (scene == "24512b73-7a65-4fe2-975e-1b5ccc6d8571") {
            window.open("https://tdu.tduvr.club/MusicOffice/index-musicoffice.html?" + link + "&key=" + userId);
        } else if (scene == "49ed746e-f131-4ce0-aab9-956fbf965fb8" ||
            scene == "18132d4c-5691-4006-b61a-1f5f3ec3c07e" || scene == "1bd47b35-eea9-4615-b12b-3ac1d2265633") {
            window.open("https://tdu.tduvr.club/BuildScan/index-buildScan.html?" + link + "&key=" + userId);
        } else if (scene == "bdd43444-e830-42b8-a78f-783bbc39788c" ||
            scene == "b2a747bf-d6e8-4228-82b2-3b0a3806d9e9") {
            window.open("https://tdu.tduvr.club/BuildScan/index-buildScan.html?" + link + "&key=" + userId);
        } else if (subTreeId == "a4bc82f4-f25c-4431-8562-6d2561ce082f" && scene != "24512b73-7a65-4fe2-975e-1b5ccc6d8571") {
            window.open("https://tdu.tduvr.club/MusicOffice/index-musicoffice.html?" + link + "&key=" + userId + "&isVisitor=scheme&");
        } else if (subTreeId == "a4b34abf-6c34-452e-aa13-899513bce279") {
            window.open("https://tdu.tduvr.club/TDuGeneVaccine/index.html?" + link + "&key=" + userId + "&");
        } else if (subTreeId == "46fa8aaa-bcb3-48cd-8e3f-9f23c67111d2") {
            window.open("https://tdu.tduvr.club/TDuCultivatingCorals/index.html?" + link + "&key=" + userId + "&");
        } else if (scene == "1fbc02bd-8c2f-43b7-a76e-bdfeb357d073") {
            window.open("https://tdu.tduvr.club/bagualou/index.html");
        } else {
            window.open("https://tdu.tduvr.club/TDuWebEngine/index.html?" + link);
        }
    }

    console.log(sceneId, mark, type)
    $.ajax({
        url: preurl + "DevelopScenesController/getLink.action",
        type: "POST",
        data: {"knowledgeId": sceneId, "mark": mark, "type": type},
        success: function (data) {
            //name = name + "KnowledgeID=" + knowContentId + "&OperateID=" + userId + "&"+ "loginId=" + data+"&";
            //   window.location.href=name;
            if (count != "3") {
                //window.location.href=data
            } else {
                //window.open(data);
            }
        },
        error: function () {
            return;
        }
    });
}

var str1 = "";
var str2 = "";
var str3 = "";

//第二页面展示 （模型）
function modelsecondshow(dataid, userid, username) {
    str1 = dataid;
    str2 = userid;
    str3 = username;

    console.log($("#personName").text())

    var that = event.currentTarget;
    var obj = ($(that)[0].parentNode).childNodes
    console.log(obj)
    var txt = obj[3].innerHTML




    $("#img2").show();
    //$("#nowAddress2").attr("onclick","modelsecondshow('"+(dataid)+"','"+userid+"','"+username+"');");
    $("#nowAddress2").text("" + txt + "");
    $.ajax({
        type: "POST",
        url: preurl + "DevelopModelController/getModelsSecond2.action",
        data: {
            "KnowledgesFisId": dataid,
            "userId": userid,
        },
        success: function (data) {
            console.log(data);
            var html = '';
            var KnowledgeId = dataid;
            var treeId = $("#subId").text();
            var lei = "";
            if (data != null && data.length > 0) {
                lei = data[(data.length - 1)].id;
            }
            if (username == $("#personName").text()) {
                html += ' <div onclick="addModelFolder(\'' + KnowledgeId + '\',\'' + treeId + '\',\'' + lei + '\')" style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative;cursor:pointer">\n' +
                    '        <div  style="width: 100px;height: 100px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -50px;margin-left: -50px; ">\n' +
                    '            <img src="img/icon_more.png" height="100" width="100"/>\n' +
                    '        </div>\n' +
                    '        </div>';
            }
            for (var i = 0; i < data.length; i++) {
                if (data[i].modelContentId == "00000000-0000-0000-0000-000000000000") {
                    html += ' <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="img/icon_1.png" style="width: 100%;height: 100%;"/></div>\n' +
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
                    html += '        <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' ;
                    /*html += '            <div style="position: absolute;top: 90px;left: 85px;;width: 99px;height: 99px"><img src="img/icon_3.png" style="height: 100%;width: 100%"/></div>\n' ;*/
                    if(subject=="2f385a6d-98ce-404a-b97c-cc5b43dc521b"||subject=="791fcf59-2a49-4817-85c6-e3398e404c23"||subject=="9c111100-fdee-414e-a540-3b34c7c6c42f"||
                        subject=="bf4cca84-968b-444a-a439-bc45436c9d64"||subject=="c1e5cda3-b304-4ae9-a551-2164fc2dc36b"||subject=="e0da0fc5-a20a-4eed-8107-f01ec955d7a4"||
                        subject=="ff6c4f79-9cc0-465f-84f3-0afc19ad9d26"){
                        html += '            <div style="position: absolute;top: 30px;left: 42px;;width: 199px;height: 199px;border-radius: 10px;"><img src="https://tdu.tduvr.club/Data/3D/Model/'+data[i].userKey+'/'+data[i].modelContentId+'/slt.png" style="height: 100%;width: 100%;border-radius: 10px;"/></div>\n' ;
                        html += '            <div style="position: absolute;top: 250px;width: 100%;text-align: center;height:40px;\n'+
                            'font-size:22px;\n' +
                            'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                            'font-weight:500;\n' +
                            'color:rgba(255,255,255,1);\n' +
                            'line-height:40px;">' + data[i].content + '</div>\n' +
                            '            <div style="position: absolute;bottom: 38px;width: 100%;height: 38px">\n' +
                            '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="getModelLink(\'' + data[i].id + '\',\'' + 1 + '\',\'' + 1 + '\')"><img src="img/ico/icon_vr.png" height="38" width="38" title="VR"/></div>\n' +
                            '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="getModelLink(\'' + data[i].id + '\',\'' + 2 + '\',\'' + 1 + '\')"><img src="img/ico/icon_ffehg.png" height="38" width="38" title="编辑器"/></div>\n' +
                            '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="getModelLink(\'' + data[i].id + '\',\'' + 4 + '\',\'' + 1 + '\')"><img src="img/ico/icon_fess.png" height="38" width="38" title="仿真"/></div>\n' +
                            '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="downMax(\'' + data[i].userKey + '\',\'' + data[i].modelContentId + '\',\'' + data[i].content + '\')"><img src="img/ico/icon_down.png" height="38" width="38" title="仿真"/></div>\n' +
                            '            </div>\n' +
                            '        </div>';
                    }else{
                        html += '            <div style="position: absolute;top: 90px;left: 85px;;width: 99px;height: 99px"><img src="img/icon_3.png" style="height: 100%;width: 100%"/></div>\n' ;
                        html += '            <div style="position: absolute;top: 220px;width: 100%;text-align: center;height:40px;\n'+
                            'font-size:22px;\n' +
                            'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                            'font-weight:500;\n' +
                            'color:rgba(255,255,255,1);\n' +
                            'line-height:40px;">' + data[i].content + '</div>\n' +
                            '            <div style="position: absolute;bottom: 38px;width: 100%;height: 38px">\n' +
                            '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="getModelVRLink(\'' + data[i].id + '\',\'' + 1 + '\',\'' + 1 + '\')"><img src="img/ico/icon_vr.png" height="38" width="38" title="VR"/></div>\n' +
                            '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="getModelLink(\'' + data[i].id + '\',\'' + 2 + '\',\'' + 1 + '\')"><img src="img/ico/icon_ffehg.png" height="38" width="38" title="编辑器"/></div>\n' +
                            '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="getModelLink(\'' + data[i].id + '\',\'' + 4 + '\',\'' + 1 + '\')"><img src="img/ico/icon_fess.png" height="38" width="38" title="仿真"/></div>\n' +
                            '            </div>\n' +
                            '        </div>';
                    }
                }
            }
            $("#contentDiv").html(html);
        }
    })
}

function downMax(userKey,modelConId,name) {
    window.location.href = 'https://tdu.tduvr.club/Data/3D/Model/'+userKey+'/'+modelConId+'/'+name+'.zip';
}


//第二页面展示 （模型）
function modelsecondshowUpdate(dataid, userid, username) {
    str1 = dataid;
    str2 = userid;
    str3 = username;

    console.log($("#personName").text())

    $.ajax({
        type: "POST",
        url: preurl + "DevelopModelController/getModelsSecond2.action",
        data: {
            "KnowledgesFisId": dataid,
            "userId": userid,
        },
        success: function (data) {
            console.log(data);
            var html = '';
            var KnowledgeId = dataid;
            var treeId = $("#subId").text();
            var lei = "";
            if (data != null && data.length > 0) {
                lei = data[(data.length - 1)].id;
            }
            if (username == $("#personName").text()) {
                html += ' <div onclick="addModelFolder(\'' + KnowledgeId + '\',\'' + treeId + '\',\'' + lei + '\')" style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative;cursor:pointer">\n' +
                    '        <div  style="width: 100px;height: 100px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -50px;margin-left: -50px; ">\n' +
                    '            <img src="img/icon_more.png" height="100" width="100"/>\n' +
                    '        </div>\n' +
                    '        </div>';
            }
            for (var i = 0; i < data.length; i++) {
                if (data[i].modelContentId == "00000000-0000-0000-0000-000000000000") {
                    html += ' <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="img/icon_1.png" style="width: 100%;height: 100%;"/></div>\n' +
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
                        '            <div style="position: absolute;top: 90px;left: 85px;;width: 99px;height: 99px"><img src="img/icon_3.png" style="height: 100%;width: 100%"/></div>\n' +
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
function getdivscene(subid) {
    var majorid = $(".choosesub")[0].id;
    $.ajax({
        type: "POST",
        url: preurl + "DevelopScenesController/getScenesSecondAll.action",
        data: {
            "KnowledgesFisId": subid,
            "subjectId": majorid
        },
        success: function (data) {
            console.log(data);
            var subid = parent.$("#subId").text();
            var lei = "";
            var html = '';
            html += ' <div onclick="jumpScene(\'' + subid + '\',\'' + lei + '\')" style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative;cursor:pointer">\n' +
                '        <div  style="width: 100px;height: 100px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -50px;margin-left: -50px; ">\n' +
                '            <img src="img/icon_more.png" height="100" width="100"/>\n' +
                '        </div>\n' +
                '        </div>';
            for (var i = 0; i < data.length; i++) {
                if (data[i].sceneContentId == "00000000-0000-0000-0000-000000000000") {
                    html += ' <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="img/icon_2.png" style="width: 100%;height: 100%;"/></div>\n' +
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
                        '            <div style="position: absolute;top: 90px;left: 85px;;width: 99px;height: 99px"><img src="img/icon_3.png" style="height: 100%;width: 100%"/></div>\n' +
                        '            <div style="position: absolute;top: 220px;width: 100%;text-align: center;height:40px;\n' +
                        'font-size:22px;\n' +
                        'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:40px;">' + data[i].content + '</div>\n' +
                        '            <div style="position: absolute;bottom: 38px;width: 100%;height: 38px">\n' +
                        /*'                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + strVR + '\'"><img src="img/ico/icon_vr.png" height="38" width="38"title="VR" /></div>\n' +
                        '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + strEdit + '\'"><img src="img/ico/icon_ffehg.png" height="38" width="38" title="编辑器"/></div>\n' +
                        '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="window.open(\'http://tdu.tduvr.club/TDuWebEngine/index.html?' + strWeb + '\')"><img src="img/ico/web.png" height="38" width="38" title="Web"/></div>\n' +
                        '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + strFang + '\'"><img src="img/ico/icon_fess.png" height="38" width="38" title="仿真" /></div>\n' +*/
                        '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="getSceneLink(\'' + data[i].id + '\',\'' + 1 + '\',\'' + 1 + '\')"><img src="img/ico/icon_vr.png" height="38" width="38"title="VR" /></div>\n' +
                        '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="getSceneEditor(\'' + data[i].sceneContentId + '\',\'' + data[i].userKey + '\',\'' + 1 + '\',\'' + data[i].id + '\',\'' + 3 + '\')"><img src="img/ico/icon_ffehg.png" height="38" width="38" title="编辑器"/></div>\n' +
                        '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="getSceneLink2(\'' + data[i].id + '\',\'' + 3 + '\',\'' + 1 + '\')"><img src="img/ico/web.png" height="38" width="38" title="Web"/></div>\n' +
                        //'                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="window.open(\'http://tdu.tduvr.club/TDuWebEngine/index.html?' + strWeb + '\')"><img src="img/ico/web.png" height="38" width="38" title="Web"/></div>\n' +
                        '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="getSceneLink(\'' + data[i].id + '\',\'' + 4 + '\',\'' + 1 + '\')"><img src="img/ico/icon_fess.png" height="38" width="38" title="仿真" /></div>\n' +
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
$(document).on("click", "a[id='nowAddress2']", function (event) {
    type = 1;
});

var str11 = "";
var str22 = "";
var str33 = "";

//第二页面展示 （场景）
function scenesecondshow(dataid, userid, username) {

    str11 = dataid;
    str22 = userid;
    str33 = username;

    console.log(dataid, userid, username)

    var that = event.currentTarget;
    var obj = ($(that)[0].parentNode).childNodes
    console.log(obj)
    var txt = obj[3].innerText

    $("#img2").show();
    //$("#nowAddress2").attr("onclick","scenesecondshow('"+(dataid)+"','"+userid+"','"+username+"');");
    if (type == 0) {
        $("#nowAddress2").text("" + txt + "");
    }


    $.ajax({
        type: "POST",
        url: preurl + "DevelopScenesController/getScenesSecond2.action",
        data: {
            "KnowledgesFisId": dataid,
            "userId": userid,
        },
        success: function (data) {
            var treeId = parent.$("#subId").text();
            //console.log(subid)
            var KnowledgeId = dataid;
            var lei = "";
            if (data.length != 0) {
                lei = data[(data.length - 1)].id;
            }
            var html = '';
            if (username == $("#personName").text()) {
                html += ' <div onclick="jumpSceneTwo(\'' + KnowledgeId + '\',\'' + treeId + '\',\'' + lei + '\')" style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative;cursor:pointer">\n' +
                    '        <div  style="width: 100px;height: 100px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -50px;margin-left: -50px; ">\n' +
                    '            <img src="img/icon_more.png" height="100" width="100"/>\n' +
                    '        </div>\n' +
                    '        </div>';
            }
            for (var i = 0; i < data.length; i++) {
                if (data[i].sceneContentId == "00000000-0000-0000-0000-000000000000") {
                    html += ' <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="img/icon_2.png" style="width: 100%;height: 100%;"/></div>\n' +
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
                    /*html += '        <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                     '            <div style="position: absolute;top: 90px;left: 85px;;width: 99px;height: 99px"><img src="img/icon_3.png" style="height: 100%;width: 100%"/></div>\n' +
                     '            <div style="position: absolute;top: 220px;width: 100%;text-align: center;height:40px;\n' +
                     'font-size:22px;\n' +
                     'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                     'font-weight:500;\n' +
                     'color:rgba(255,255,255,1);\n' +
                     'line-height:40px;">' + data[i].content + '</div>\n' +
                     '            <div style="position: absolute;bottom: 38px;width: 100%;height: 38px">\n' +
                     '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="getSceneLink(\''+data[i].id+'\',\''+1+'\',\''+1+'\')"><img src="img/ico/icon_vr.png" height="38" width="38"title="VR" /></div>\n' +
                     '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="getSceneLink(\''+data[i].id+'\',\''+2+'\',\''+1+'\')"><img src="img/ico/icon_ffehg.png" height="38" width="38" title="编辑器"/></div>\n' +
                     '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="getSceneLink(\''+data[i].id+'\',\''+3+'\',\''+1+'\')"><img src="img/ico/web.png" height="38" width="38" title="Web"/></div>\n' +
                     '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="getSceneLink(\''+data[i].id+'\',\''+4+'\',\''+1+'\')"><img src="img/ico/icon_fess.png" height="38" width="38" title="仿真" /></div>\n' +
                     '            </div>\n' +
                     '        </div>';*/

                    html += '        <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 90px;left: 85px;;width: 99px;height: 99px"><img src="img/icon_3.png" style="height: 100%;width: 100%"/></div>\n' +
                        '            <div style="position: absolute;top: 220px;width: 100%;text-align: center;height:40px;\n' +
                        'font-size:22px;\n' +
                        'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:40px;">' + data[i].content + '</div>\n' +
                        '            <div style="position: absolute;bottom: 38px;width: 100%;height: 38px">\n' +
                        '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="getSceneLink(\'' + data[i].id + '\',\'' + 1 + '\',\'' + 1 + '\')"><img src="img/ico/icon_vr.png" height="38" width="38"title="VR" /></div>\n' +
                        '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="getSceneEditor(\'' + data[i].sceneContentId + '\',\'' + data[i].userKey + '\',\'' + 1 + '\',\'' + data[i].id + '\',\'' + 3 + '\')"><img src="img/ico/icon_ffehg.png" height="38" width="38" title="编辑器"/></div>\n' +
                        '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="getSceneLink2(\'' + data[i].id + '\',\'' + 3 + '\',\'' + 1 + '\')"><img src="img/ico/web.png" height="38" width="38" title="Web"/></div>\n';
                    if (data[i].parentScene == "6af60b10-e142-494d-bc67-fd29d9f76968"
                        || data[i].parentScene == "04fd9e9e-c587-4d6e-9c98-c199deb446cf"
                        || data[i].parentScene == "efb6a209-b414-4be7-ba6a-f028fbdbd313"
                        || data[i].parentScene == "43f28ded-0241-490f-8455-47f6d224ff9a"
                        || data[i].parentScene == "40eb745b-a73f-4b5e-bd86-7f901917e822") {
                        html += '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="getSceneLink2(\'' + data[i].id + '\',\'' + 4 + '\',\'' + 1 + '\')"><img src="img/ico/icon_fess.png" height="38" width="38" title="仿真" /></div>\n';
                    } else {
                        html += '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="getSceneLink(\'' + data[i].id + '\',\'' + 4 + '\',\'' + 1 + '\')"><img src="img/ico/icon_fess.png" height="38" width="38" title="仿真" /></div>\n';
                    }
                    html += '            </div>\n' +
                        '        </div>';
                }
            }
            $("#contentDiv").html(html);
        }
    })
}

//第二页面展示 （场景）
function scenesecondshowUpdate(dataid, userid, username) {

    str11 == dataid;
    str22 = userid;
    str33 = username;
    console.log(dataid, userid, username)
    $.ajax({
        type: "POST",
        url: preurl + "DevelopScenesController/getScenesSecond2.action",
        data: {
            "KnowledgesFisId": dataid,
            "userId": userid,
        },
        success: function (data) {
            var treeId = parent.$("#subId").text();
            //console.log(subid)
            var KnowledgeId = dataid;
            var lei = "";
            if (data.length != 0) {
                lei = data[(data.length - 1)].id;
            }
            var html = '';
            if (username == $("#personName").text()) {
                html += ' <div onclick="jumpSceneTwo(\'' + KnowledgeId + '\',\'' + treeId + '\',\'' + lei + '\')" style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative;cursor:pointer">\n' +
                    '        <div  style="width: 100px;height: 100px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -50px;margin-left: -50px; ">\n' +
                    '            <img src="img/icon_more.png" height="100" width="100"/>\n' +
                    '        </div>\n' +
                    '        </div>';
            }
            for (var i = 0; i < data.length; i++) {
                if (data[i].sceneContentId == "00000000-0000-0000-0000-000000000000") {
                    html += ' <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="img/icon_2.png" style="width: 100%;height: 100%;"/></div>\n' +
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
                        '            <div style="position: absolute;top: 90px;left: 85px;;width: 99px;height: 99px"><img src="img/icon_3.png" style="height: 100%;width: 100%"/></div>\n' +
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


//获取主页显示内容，（文档  资源类）
function getdivdoc(subid) {

    /*var that=event.currentTarget;
    var obj = ($(that)[0].parentNode).childNodes
    console.log(obj)
    var txt = obj[3].innerHTML

    $("#img2").show();
    $("#nowAddress2").attr("onclick","modelsecondshow('"+(dataid)+"','"+userid+"','"+username+"');");
    $("#nowAddress2").text(""+txt+"");*/


    var majorid = $(".choosesub")[0].id;
    $.ajax({
        type: "POST",
        url: preurl + "KnowledgesController/getKnowledgesSecondNew.action",
        data: {
            "KnowledgesFisId": subid
        },
        success: function (result) {
            console.log(result);
            var strData = result

            var data = strData.knowList
            var str = strData.knowContList

            if (data.length == 0 && str.length == 0) {
                var html = '<div style="width:450px;' +
                    'height:450px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -225px;margin-left: -225px;">' +
                    '<img src="img/bg_huangying2.png" style="height: 100%;width: 100%">' +
                    '</div>';
                $("#contentDiv").html(html);
                return;
            }

            console.log(data);
            var html = '';
            /*html+=' <div onclick="jumpType2()" style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative;cursor:pointer">\n' +
                '        <div  style="width: 100px;height: 100px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -50px;margin-left: -50px; ">\n' +
                '            <img src="img/icon_more.png" height="100" width="100"/>\n' +
                '        </div>\n' +
                '        </div>';*/
            for (var i = 0; i < data.length; i++) {
                html += ' <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n';

                if (data[i].content == "模型库") {
                    html += '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="img/icon_2.png" style="width: 100%;height: 100%;"/></div>\n';
                } else if (data[i].content == "场景库") {
                    html += '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="img/icon_3.png" style="width: 100%;height: 100%;"/></div>\n';
                } else if (data[i].content == "贴图库") {
                    html += '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="img/icon_1.png" style="width: 100%;height: 100%;"/></div>\n';
                } else if (data[i].content == "WORD") {
                    html += '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="img/icon_word.png" style="width: 100%;height: 100%;"/></div>\n';
                } else if (data[i].content == "EXCEL") {
                    html += '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="img/icon_excel.png" style="width: 100%;height: 100%;"/></div>\n';
                } else if (data[i].content == "PPT") {
                    html += '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="img/icon_ppt.png" style="width: 100%;height: 100%;"/></div>\n';
                } else if (data[i].content == "音频库") {
                    html += '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="img/icon_voice.png" style="width: 100%;height: 100%;"/></div>\n';
                } else if (data[i].content == "视频库") {
                    html += '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="img/icon_video.png" style="width: 100%;height: 100%;"/></div>\n';
                } else if (data[i].content == "图片") {
                    html += '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="img/icon_pic.png" style="width: 100%;height: 100%;"/></div>\n';
                } else {
                    html += '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="img/icon_1.png" style="width: 100%;height: 100%;"/></div>\n';
                }


                html += '            <div style="position: absolute;top: 180px;width: 100%;text-align: center;height:40px;\n' +
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
                    'color:rgba(255,255,255,1);\n';

                if (data[i].knowledgecontentId == "00000000-0000-0000-0000-000000000000") {
                    html += 'line-height:50px;text-align: center; cursor:pointer " onclick="getdivdoc(\'' + data[i].id + '\')">进入</div>\n';
                } else {
                    for (var j = 0; j < str.length; j++) {
                        if (str[j].id == "" + data[i].knowledgecontentId + "") {
                            html += 'line-height:50px;text-align: center; cursor:pointer " onclick="opendoc(\'' + str[j].type + '\',\'' + str[j].knowledge_Id + '\',\'' + str[j].userKey + '\',\'' + str[j].nmae + '\',\'' + data[i].knowledgecontentId + '\')">进入</div>\n';
                        }
                    }
                    //html+=   'line-height:50px;text-align: center; cursor:pointer " onclick="docsecondshow(\''+data[i].id+'\',\''+data[i].userKey+'\',\''+data[i].name+'\')">进入</div>\n';
                    //html+=   'line-height:50px;text-align: center; cursor:pointer " onclick="docsecondshow(\''+data[i].id+'\',\''+data[i].userKey+'\',\''+data[i].name+'\')">进入</div>\n';
                }

                html += '\n' +
                    '\n' +
                    '        </div>';
                //console.log(html)
            }
            $("#contentDiv").html(html);
        }
    })
}

//  if(data[i].content=="WORD")
function getModelInit(dataid, userid, username) {
    $.ajax({
        type: "POST",
        url: preurl + "KnowledgesController/getKnowledgesSecond.action?KnowledgesFisId=" + dataid
        ,
        success: function (data) {
            console.log(data);
            var html = '';

            if (username == $("#personName").text()) {
                html += ' <div onclick="addModelFolder()" style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative;cursor:pointer">\n' +
                    '        <div  style="width: 100px;height: 100px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -50px;margin-left: -50px; ">\n' +
                    '            <img src="img/icon_more.png" height="100" width="100"/>\n' +
                    '        </div>\n' +
                    '        </div>';
            }
            for (var i = 0; i < data.length; i++) {
                if (data[i].modelContentId == "00000000-0000-0000-0000-000000000000") {
                    html += ' <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="img/icon_1.png" style="width: 100%;height: 100%;"/></div>\n' +
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
                        'line-height:50px;text-align: center; cursor:pointer " onclick="getModelInit(\'' + data[i].id + '\',\'' + data[i].userKey + '\',\'' + data[i].name + '\')">进入</div>\n' +
                        '\n' +
                        '\n' +
                        '        </div>';
                } else {
                    var strVR = "tduvr://command=open&App=TDuVREngine&Scene=" + data[i].userKey + "/" + data[i].sceneContentId + "/" + data[i].sceneContentId + ".EXM&UserID=" + data[i].userKey + "&SceneOrModelID=" + data[i].sceneContentId + "&OpMode=TDuPractice&";
                    var strEdit = "tduvr://command=open&App=TDuVRDirector&Scene=" + data[i].userKey + "/" + data[i].sceneContentId + "/" + data[i].sceneContentId + ".EXM&UserID=" + data[i].userKey + "&SceneOrModelID=" + data[i].sceneContentId + "&OpMode=TDuPractice&";
                    var strFang = "tduvr://command=open&App=TDuSimEngine&Scene=" + data[i].userKey + "/" + data[i].sceneContentId + "/" + data[i].sceneContentId + ".EXM&UserID=" + data[i].userKey + "&SceneOrModelID=" + data[i].sceneContentId + "&OpMode=TDuPractice&";
                    html += '        <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 90px;left: 85px;;width: 99px;height: 99px"><img src="img/icon_3.png" style="height: 100%;width: 100%"/></div>\n' +
                        '            <div style="position: absolute;top: 220px;width: 100%;text-align: center;height:40px;\n' +
                        'font-size:22px;\n' +
                        'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:40px;">' + data[i].content + '</div>\n' +
                        '            <div style="position: absolute;bottom: 38px;width: 100%;height: 38px">\n' +
                        '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + strVR + '\'"><img src="img/ico/icon_vr.png" height="38" width="38" title="VR" /></div>\n' +
                        '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + strEdit + '\'"><img src="img/ico/icon_ffehg.png" height="38" width="38" title="编辑器" /></div>\n' +
                        '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + strFang + '\'"><img src="img/ico/icon_fess.png" height="38" width="38"  title="仿真" /></div>\n' +
                        '            </div>\n' +
                        '        </div>';
                }
            }
            $("#contentDiv").html(html);
        }
    });
}

/*  资源文件打开  */
function opendoc(type, id, userKey, name, knowContentId) {
    if (type == "Office") {
        console.log(type, id, userKey, name);
        window.open("https://office.tduvr.club/op/view.aspx?src=https://file.tduvr.club/office/" + name);
        //    var index =layer.open({
        //       type: 2,
        //        title: false,
        //        shadeClose: true,
        //       shade: 0.8,
        //        area: ['80%', '80%'],
        //        //content: 'content/cz/kaoshi.php' //iframe的url
        //          content: 'http://office.tduvr.org:9090/op/view.aspx?src=http://office1.web.com:9091/office/'+name, //iframe的url
        //          cancel: function(){
        //          //右上角关闭回调
        //              flag=1
        //              //return false 开启该代码可禁止点击该按钮关闭
        //       },
        //         end: function () {
        //              if(flag==0){
        //                 addreturn();
        //              }
        //        }
        //      });
    } else if (type == "video") {
        var index = layer.open({
            type: 2,
            title: false,
            shadeClose: true,
            shade: 0.8,
            area: ['80%', '80%'],
            content: 'https://file.tduvr.club/video/' + name, //iframe的url
            //content: 'http://file.tduvr.org:9091/video/'+name, //iframe的url
            cancel: function () {
                //右上角关闭回调
                flag = 1
                //return false 开启该代码可禁止点击该按钮关闭
            },
            end: function () {
                if (flag == 0) {
                    addreturn();
                }
            }
        });
    } else if (type == "仿真考核" || type == "仿真练习" || type == "仿真") {
        name = name + "&KnowledgeID=" + knowContentId + "&OperateID=" + userId + "&";
        //   window.location.href=name;
        window.open(name);
        /*$.ajax({
            url: preurl + "KnowOnlineController/insertKnowOnline.action",
            type: "POST",
            data: {"knowContentId": knowContentId},
            success: function (data) {
                console.log(knowContentId)
                /!*name = name + "KnowledgeID=" + knowContentId + "&OperateID=" + userId + "&"+ "loginId=" + data+"&";
                //   window.location.href=name;
                window.open(name);*!/
                var knowledgeId=Base64.encode(id);
                var mark=Base64.encode("4");
                var flag="";
                if(type=="仿真考核"){
                    flag=Base64.encode("2");
                }else if(type=="仿真练习"){
                    flag=Base64.encode("1");
                }else if(type=="仿真"){
                    flag=Base64.encode("1");
                }
                console.log(knowledgeId,mark,flag)
                var link = "tduvr://command=open&App=TDuSimEngine&knowledgeId="+knowledgeId+"&mark="+mark+"&type="+flag+"&flag="+"3&";

                if(knowContentId=="3d042cb3-b914-480a-9668-69b3deee0f47"
                ||knowContentId=="319ee811-94ab-4517-ad89-6736f7d2d293"
                ||knowContentId=="54447017-6bca-483d-83ae-8e1b444a7145"
                ||knowContentId=="dd2a75e9-7e1c-49c5-9b2c-e2b40a97c8c7"
                ||knowContentId=="c6366238-c299-4422-8298-c635cb52f190"
                    ||knowContentId=="642d8204-ff42-4ba3-bce6-1ff1403aa5f1"
                    ||knowContentId=="0f106067-69a8-49b7-b56a-20181a5b499a"){
                    window.open("http://tdu.tduvr.club/TDuWebEngine/index.html?"+link);
                }else{
                    window.location.href=link;
                }


                $.ajax({
                    url: preurl + "KnowledgesController/getLink.action",
                    type: "POST",
                    data: {"knowledgeId": knowledgeId,"mark":mark,"type":flag},
                    success: function (data) {
                        //name = name + "KnowledgeID=" + knowContentId + "&OperateID=" + userId + "&"+ "loginId=" + data+"&";
                        //   window.location.href=name;
                        window.open(data);
                    },
                    error: function () {
                        return;
                    }
                });


            },
            error: function () {
                return;
            }
        });*/
    }
}


//第二页面展示  （资源类）
function docsecondshow(dataid, userid, username) {

    var that = event.currentTarget;
    var obj = ($(that)[0].parentNode).childNodes
    console.log(obj)
    var txt = obj[3].innerHTML

    $("#img2").show();
    $("#nowAddress2").attr("onclick", "modelsecondshow('" + (dataid) + "','" + userid + "','" + username + "');");
    $("#nowAddress2").text("" + txt + "");
    $.ajax({
        type: "POST",
        url: preurl + "KnowledgesController/getKnowledgesSecond2.action",
        data: {
            "KnowledgesFisId": dataid,
            "userId": userid,
        },
        success: function (data) {
            console.log(data);
            var html = '';
            if (username == $("#personName").text()) {
                // html+=' <div onclick="addModelFolder()" style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative;cursor:pointer">\n' +
                //     '        <div  style="width: 100px;height: 100px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -50px;margin-left: -50px; ">\n' +
                //     '            <img src="img/icon_more.png" height="100" width="100"/>\n' +
                //     '        </div>\n' +
                //     '        </div>';
            }
            for (var i = 0; i < data.length; i++) {
                if (data[i].knowledgecontentId == "00000000-0000-0000-0000-000000000000") {
                    html += ' <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="img/icon_1.png" style="width: 100%;height: 100%;"/></div>\n' +
                        '            <div style="position: absolute;top: 180px;width: 100%;text-align: center;height:40px;\n' +
                        'font-size:22px;\n' +
                        'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:40px;">' + data[i].customname + '</div>\n' +
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
                    //     var str = "tduvr://command=open&App=TDuVRDirector&Scene=" + userid + "/" + data[i].modelContentId + "/" + data[i].name + "&UserID=" + userid + "&SceneOrModelID=" + data[i].id + "&OpMode=TDuPractice&";
                    html += '        <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 90px;left: 85px;;width: 99px;height: 99px"><img src="img/icon_3.png" style="height: 100%;width: 100%"/></div>\n' +
                        '            <div style="position: absolute;top: 220px;width: 100%;text-align: center;height:40px;\n' +
                        'font-size:22px;\n' +
                        'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:40px;">' + data[i].customname + '</div>\n' +
                        '            <div style="position: absolute;;width: 190px;height: 50px;top: 308px;left: 45px;\n' +
                        '            background:linear-gradient(337deg,rgba(92,205,177,1) 0%,rgba(92,205,178,1) 0%,rgba(89,208,207,1) 100%);border-radius:26px;\n' +
                        'font-size:20px;\n' +
                        'font-family:PingFangSC-Regular,PingFang SC;\n' +
                        'font-weight:400;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:50px;text-align: center; cursor:pointer " onclick="opendoc(\'' + data[i].type + '\',\'' + data[i].knowledge_Id + '\',\'' + data[i].userKey + '\',\'' + data[i].nmae + '\')">进入</div>\n' +
                        '        </div>';
                }
            }
            $("#contentDiv").html(html);
        }
    })
}

//选择科目切换
function choosesub(id, name) {
    console.log(id, name);
    $('.choosesub').attr('id', id);
    $(".choosesub").text(name);
    initleft(id);
}

/*
* 第二页以及后面的增加模型/文件夹弹窗
* */
function addModelFolder(KnowledgeId, treeId, lei) {
    //var content = "content/cz/addModel.html";
    var content = "content/cz/choseModel.html";
    /*var subid = "d36aa429-a200-4873-a884-81bf9a75c2b7"
    var lei="a9873c88-367c-4186-abd7-a6d07fdc05a8";*/
    var index = layer.open({
        type: 2,
        title: false,
        shadeClose: true,
        shade: 0.8,
        area: ['50%', '60%'],
        //content: 'content/cz/kaoshi.php' //iframe的url
        content: content + '?KnowledgeId=' + KnowledgeId + "&treeId=" + treeId + "&lei=" + lei, //iframe的url
        //content: content+'?subid='+subid+"&lei="+lei, //iframe的url
        cancel: function () {
            //右上角关闭回调
            flag = 1
            //return false 开启该代码可禁止点击该按钮关闭
        },
        end: function () {
            modelsecondshowUpdate(str1, str2, str3);
        }
    });
}

/*
 * 第一页增加模型/文件夹弹窗
 * */
function addModel(subid, lei) {
    //var content="test.html"
    //var content = "content/cz/addModelFolderFile.html";
    var content = "content/cz/choseModelFolder.html";
    /*var subid = "d36aa429-a200-4873-a884-81bf9a75c2b7"
     var lei="a9873c88-367c-4186-abd7-a6d07fdc05a8";*/
    var index = layer.open({
        type: 2,
        title: false,
        shadeClose: true,
        shade: 0.8,
        area: ['50%', '60%'],
        //content: 'content/cz/kaoshi.php' //iframe的url
        //content: content+'?KnowledgeId='+KnowledgeId+"&treeId="+treeId+"&lei="+lei, //iframe的url
        content: content + '?subid=' + subid + "&lei=" + lei, //iframe的url
        cancel: function () {
            //右上角关闭回调
            flag = 1
            //return false 开启该代码可禁止点击该按钮关闭
        },
        end: function () {
            if (flag == 0) {
                //addreturn();
            }
        }
    });
}

/*
 * 第一页增加场景/文件夹弹窗
 * */
function jumpScene(subid, lei) {
    //var content = "content/cz/addScenelFolderFile.html";
    var content = "content/cz/choseSceneFolder.html";
    var index = layer.open({
        type: 2,
        title: false,
        shadeClose: true,
        shade: 0.8,
        area: ['50%', '60%'],
        //content: 'content/cz/kaoshi.php' //iframe的url
        content: content + '?subid=' + subid + "&lei=" + lei + '&userId=' + userId, //iframe的url
        cancel: function () {
            //右上角关闭回调
            flag = 1
            console.log("1111")
            //return false 开启该代码可禁止点击该按钮关闭
        },
        end: function () {
            if (flag == 0) {
                //addreturn();
            }
        }
    });
}

/*
 * 第二页增加场景/文件夹弹窗
 * */
function jumpSceneTwo(KnowledgeId, treeId, lei) {
    //var content = "content/cz/addScene.html";
    var content = "content/cz/choseScene.html";
    var index = layer.open({
        type: 2,
        title: false,
        shadeClose: true,
        shade: 0.8,
        area: ['50%', '60%'],
        //content: 'content/cz/kaoshi.php' //iframe的url
        content: content + '?KnowledgeId=' + KnowledgeId + "&treeId=" + treeId + "&lei=" + lei + '&userId=' + userId, //iframe的url
        cancel: function () {
            //右上角关闭回调
            flag = 1
            console.log("1111")
            //return false 开启该代码可禁止点击该按钮关闭
        },
        end: function () {
            scenesecondshowUpdate(str11, str22, str33);
        }
    });
}

//后台跳转
function houtai() {
    window.location.href = "SysAdministrate/index.html";
}

function submitFn(obj, evt) {
    value = $(obj).find('.search-input').val().trim();

    _html = "您搜索的字符为: ";
    if (!value.length) {
        _html = "请输入需搜索的字符！";
    } else {
        _html += "<b>" + value + "</b>";
    }

    $(obj).find('.result-container').html('<span>' + _html + '</span>');
    $(obj).find('.result-container').fadeIn(100);

    evt.preventDefault();

    if (!value.length) {
        return;
    }

    $.ajax({
        type: "POST",
        url: preurl + "SubjectTreeController/getSubSearch.action",
        data: {
            "subjectId": $(".choosesub").attr("id"),
            sarchStr: value
        },
        success: function (data) {
            console.log(data);
            var html = "";
            for (var k in data) {
                if (k == "moList") {
                    console.log(data[k]);
                    if (data[k].length > 0) {
                        for (var i = 0; i < data[k].length; i++) {
                            var str = "tduvr://command=open&App=TDuVRDirector&Scene=" + data[k][i].userKey + "/" + data[k][i].modelContentId + "/" + data[k][i].name + "&UserID=" + data[k][i].userKey + "&SceneOrModelID=" + data[k][i].id + "&OpMode=TDuPractice&";
                            html += '        <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                                '            <div style="position: absolute;top: 90px;left: 85px;;width: 99px;height: 99px"><img src="img/icon_3.png" style="height: 100%;width: 100%"/></div>\n' +
                                '            <div style="position: absolute;top: 220px;width: 100%;text-align: center;height:40px;\n' +
                                'font-size:22px;\n' +
                                'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                                'font-weight:500;\n' +
                                'color:rgba(255,255,255,1);\n' +
                                'line-height:40px;">' + data[k][i].content + '</div>\n' +
                                '            <div style="position: absolute;bottom: 38px;width: 100%;height: 38px">\n' +
                                '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + str + '\'"><img src="img/ico/icon_vr.png" height="38" width="38" title="VR"/></div>\n' +
                                '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + str + '\'"><img src="img/ico/icon_ffehg.png" height="38" width="38" title="编辑器"/></div>\n' +
                                '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + str + '\'"><img src="img/ico/icon_fess.png" height="38" width="38" title="仿真"/></div>\n' +
                                '            </div>\n' +
                                '        </div>';

                        }
                    }
                } else if (k == "seList") {
                    console.log(data[k]);
                    if (data[k].length > 0) {
                        for (var i = 0; i < data[k].length; i++) {
                            var strVR = "tduvr://command=open&App=TDuVREngine&Scene=" + data[k][i].userKey + "/" + data[k][i].sceneContentId + "/" + data[k][i].sceneContentId + ".EXM&UserID=" + data[k][i].userKey + "&SceneOrModelID=" + data[k][i].sceneContentId + "&OpMode=TDuPractice&";
                            var strEdit = "tduvr://command=open&App=TDuVRDirector&Scene=" + data[k][i].userKey + "/" + data[k][i].sceneContentId + "/" + data[k][i].sceneContentId + ".EXM&UserID=" + data[k][i].userKey + "&SceneOrModelID=" + data[k][i].sceneContentId + "&OpMode=TDuPractice&";
                            var strFang = "tduvr://command=open&App=TDuSimEngine&Scene=" + data[k][i].userKey + "/" + data[k][i].sceneContentId + "/" + data[k][i].sceneContentId + ".EXM&UserID=" + data[k][i].userKey + "&SceneOrModelID=" + data[k][i].sceneContentId + "&OpMode=TDuPractice&";
                            var strWeb = "tduvr://command=open&App=TDuSimEngine&Scene=" + data[k][i].userKey + "/" + data[k][i].sceneContentId + "/" + data[k][i].sceneContentId + ".EXM&UserID=" + data[k][i].userKey + "&SceneOrModelID=" + data[k][i].sceneContentId + "&OpMode=TDuPractice&";
                            html += '        <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                                '            <div style="position: absolute;top: 90px;left: 85px;;width: 99px;height: 99px"><img src="img/icon_pic.png" style="height: 100%;width: 100%"/></div>\n' +
                                '            <div style="position: absolute;top: 220px;width: 100%;text-align: center;height:40px;\n' +
                                'font-size:22px;\n' +
                                'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                                'font-weight:500;\n' +
                                'color:rgba(255,255,255,1);\n' +
                                'line-height:40px;">' + data[k][i].content + '</div>\n' +
                                '            <div style="position: absolute;bottom: 38px;width: 100%;height: 38px">\n' +
                                '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + strVR + '\'"><img src="img/ico/icon_vr.png" height="38" width="38"title="VR" /></div>\n' +
                                '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + strEdit + '\'"><img src="img/ico/icon_ffehg.png" height="38" width="38" title="编辑器"/></div>\n' +
                                '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="window.open(\'http://tdu.tduvr.club/TDuWebEngine/index.html?' + strWeb + '\')"><img src="img/ico/web.png" height="38" width="38" title="Web"/></div>\n' +
                                '                <div style="width: 23.5%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\'' + strFang + '\'"><img src="img/ico/icon_fess.png" height="38" width="38" title="仿真" /></div>\n' +
                                '            </div>\n' +
                                '        </div>';
                        }
                    }
                } else {
                    console.log(data[k]);
                    if (data[k].length > 0) {
                        for (var i = 0; i < data[k].length; i++) {
                            html += ' <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n';
                            html += '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="img/icon_1.png" style="width: 100%;height: 100%;"/></div>\n';

                            html += '            <div style="position: absolute;top: 180px;width: 100%;text-align: center;height:40px;\n' +
                                'font-size:22px;\n' +
                                'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                                'font-weight:500;\n' +
                                'color:rgba(255,255,255,1);\n' +
                                'line-height:40px;">' + data[k][i].content + '</div>\n' +
                                /* '            <div style="position: absolute;top: 230px;width: 100%;text-align: center;height:28px;\n' +
                                 'font-size:17px;\n' +
                                 'font-family:PingFangSC-Medium,PingFang SC;\n' +
                                 'font-weight:500;\n' +
                                 'color:rgba(138,144,159,1);\n' +
                                 'line-height:28px;">' + data[k][i].name + '</div>\n' +*/
                                '            <div style="position: absolute;;width: 190px;height: 50px;top: 308px;left: 45px;\n' +
                                '            background:linear-gradient(337deg,rgba(92,205,177,1) 0%,rgba(92,205,178,1) 0%,rgba(89,208,207,1) 100%);border-radius:26px;\n' +
                                'font-size:20px;\n' +
                                'font-family:PingFangSC-Regular,PingFang SC;\n' +
                                'font-weight:400;\n' +
                                'color:rgba(255,255,255,1);\n';
                            html += 'line-height:50px;text-align: center; cursor:pointer " onclick="opendoc(\'' + data[k][i].type + '\',\'' + data[k][i].id + '\',\'' + userId + '\',\'' + data[k][i].nmae + '\',\'' + data[k][i].knowledgecontentId + '\')">进入</div></div>\n';
                        }
                    }

                }
            }
            if (html != "") {
                $("#contentDiv").css("background-image", "url()");
                $("#contentDiv").html("");
                $("#contentDiv").html(html);
            }
        }
    })
}

var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    },
    decode: function (e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9+/=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r)
            }
            if (a != 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = Base64._utf8_decode(t);
        return t
    },
    _utf8_encode: function (e) {
        e = e.replace(/rn/g, "n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    },
    _utf8_decode: function (e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3
            }
        }
        return t
    }
}