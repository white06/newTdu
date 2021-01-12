$(function () {
    getName();
    $("#loginTel").hide();
});


function getTelphone2() {
    var telphone = $("#telphone2").val();
    if(telphone==""){
        layer.msg("请填写手机号！")
        return
    }
    $.ajax({
        type: "POST",
        url : preurl + "UsersController/getTelphone.action",
        data : {
            telphone : telphone
        },
        async: false,
        success : function(result) {
            var data = eval("(" + (result) + ")");
            //  001 表示该手机号未被注册； 002表示该手机号已经被注册； 003表示该手机号已经被多人注册
            if(data.code=="001"){
                layer.msg("该手机号未被注册!可以使用！")
            }else if(data.code=="002"){
                layer.msg("该手机号已经注册!不可使用！");
            }else if(data.code=="003"){
                layer.msg("该手机号已经被多人注册!不可使用！");
            }
        }
    });
}


function getTelphone() {
    var telphone = $("#telphone").val();
    if(telphone==""){
        layer.msg("请填写手机号！")
        return
    }
    $.ajax({
        type: "POST",
        url : preurl + "UsersController/getTelphone.action",
        data : {
            telphone : telphone
        },
        async: false,
        success : function(result) {
            var data = eval("(" + (result) + ")");
            //  001 表示该手机号未被注册； 002表示该手机号已经被注册； 003表示该手机号已经被多人注册
            if(data.code=="001"){
                layer.msg("该手机号未被注册!可以使用！");
                telFlag=true;
            }else if(data.code=="002"){
                layer.msg("该手机号已经注册!不可使用！");
            }else if(data.code=="003"){
                layer.msg("该手机号已经被多人注册!不可使用！");
            }
        }
    });
}


var count = 0;

function telLogin() {
    $("#login").hide();
    $("#loginTel").show();
}
function nameLogin() {
    $("#login").show();
    $("#loginTel").hide();
}

function changeTai() {
    /*
     id为 tai  标签 value 为1 为开发者平台登录； value 为0  为 资源平台登录
     * */

    if ($("#tai").attr("value") == "0") {
        if ($("#tai").html() == "开发者平台登录") {
            $("#tai").html("资源平台登录");
            $("#title").html("开发者平台登录");
        } else if ($("#tai").html() == "资源平台登录") {
            $("#tai").html("开发者平台登录");
            $("#title").html("资源平台登录");
        }
        if (count != 0) {
            $("#tai").attr("value", "1");
        }
    } else if ($("#tai").attr("value") == "1") {
        if ($("#tai").html() == "开发者平台登录") {
            $("#tai").html("资源平台登录");
            $("#title").html("开发者平台登录");
        } else if ($("#tai").html() == "资源平台登录") {
            $("#tai").html("开发者平台登录");
            $("#title").html("资源平台登录");
        }
        if (count != 0) {
            $("#tai").attr("value", "0");
        }
    }
    count++;
    console.log(count)
}

function changeTaiTel() {
    /*
     id为 tai2  标签 value 为1 为开发者平台登录； value 为0  为 资源平台登录
     * */

    if ($("#tai2").attr("value") == "0") {
        if ($("#tai2").html() == "开发者平台登录") {
            $("#tai2").html("资源平台登录");
            $("#title2").html("开发者平台登录");
        } else if ($("#tai2").html() == "资源平台登录") {
            $("#tai2").html("开发者平台登录");
            $("#title2").html("资源平台登录");
        }
        if (count != 0) {
            $("#tai2").attr("value", "1");
        }
    } else if ($("#tai2").attr("value") == "1") {
        if ($("#tai2").html() == "开发者平台登录") {
            $("#tai2").html("资源平台登录");
            $("#title2").html("开发者平台登录");
        } else if ($("#tai2").html() == "资源平台登录") {
            $("#tai2").html("开发者平台登录");
            $("#title2").html("资源平台登录");
        }
        if (count != 0) {
            $("#tai2").attr("value", "0");
        }
    }
    count++;
    console.log(count)
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


function bianjiqi() {
    window.location.href = "http://tdudev.tduvr.club/TDuVRBrowserPlugin.exe";
}

//账号注册
function zhuceUser() {


    var reg1 = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
    if (reg1.test($('input[type=email]').val()) == false) {
        layer.msg('邮箱格式不正确', {icon: 2, time: 1000});
        return false;
    } else if($("#telphone").val()==""){
        layer.msg('请填写手机号码！');
        return false;
    }else if($("#telphoneNumber").val()==""){
        layer.msg('请填写验证码！');
        return false;
    }else if($("#telphoneNumber").val()!=validation){
        layer.msg('验证码错误！');
        return false;
    }else if(!telFlag){
        layer.msg('手机号不可用！');
        return false;
    } else {
        var telphone = $("#telphone").val();
        var telphoneNumber = $("#telphoneNumber").val();
        var email=$('input[type=email]').val();
        var ziyuan = $("#ziyuan").prop("checked");
        var username = $("#zhuceName").val()
        var password = $("#zhucePassword").val();
        var querenPassword = $("#querenPassword").val();
        console.log(ziyuan, username, password, querenPassword,email);
        if (ziyuan == true) {
            if (username == null|| username == "") {
                layer.alert("用户名并不能为空");
            } else if (password != querenPassword || password == "") {
                layer.alert("密码输入不一致！请重新输入");
            } else {
                $.ajax({
                    type: "POST",
                    url: preurl + "EmailUserController/emailUser.action?UserName=" + username + "&PassWord=" + password+ "&Email=" + email+ "&ziyuan=" + ziyuan+"&telphone="+telphone,
                    async: false,
                    success: function (res) {
                        if(res=="2"){
                            layer.alert("账号已存在，请重新注册");
                        }else if(res=="1"){
                            layer.alert('提交成功，请接受邮件并认证', function () {
                                location.reload();
                            })
                        }

                    },
                    error: function (data) {
                        layer.alert("注册异常");
                        return;
                    },
                });
            }
            /*if (username == null || username == "") {
                layer.alert("用户名并不能为空");
            } else if (password != querenPassword || password == "") {
                layer.alert("密码输入不一致！请重新输入");
            } else {
                console.log(username, password, querenPassword);
                $.ajax({
                    type: "POST",
                    url: preurl + "UsersController/ziyuanzhuce.action?UserName=" + username + "&PassWord=" + password+"&telphone="+telphone,
                    async: false,
                    success: function (res) {
                        layer.alert('注册成功', function () {
                            location.reload();
                        })
                    },
                    error: function (data) {
                        layer.alert("注册异常");
                        return;
                    },
                });
            }*/

        } else {
            //alert(ziyuan)
            if (username == null|| username == "") {
                layer.alert("用户名并不能为空");
            } else if (password != querenPassword || password == "") {
                layer.alert("密码输入不一致！请重新输入");
            } else {
                $.ajax({
                    type: "POST",
                    url: preurl + "EmailUserController/emailUser.action?UserName=" + username + "&PassWord=" + password+ "&Email=" + email+ "&ziyuan=" + ziyuan+"&telphone="+telphone,
                    async: false,
                    success: function (res) {
                        if(res=="2"){
                            layer.alert("账号已存在，请重新注册");
                        }else if(res=="1"){
                            layer.alert('提交成功，请接受邮件并认证', function () {
                                location.reload();
                            })
                        }

                    },
                    error: function (data) {
                        layer.alert("注册异常");
                        return;
                    },
                });
            }
        }
    }
}

//注册页面跳转
function zhuce(){
    $("#login").hide();
    $("#zhuce").show();
    //   window.location.href="";
}
//注册页面跳转
function zhuceTel(){
    $("#loginTel").hide();
    $("#zhuce").show();
    //   window.location.href="";
}


function loginByTel() {
    var UserName = $("#telphone2").val();
    var PassWord = $("#telphoneNumber2").val();
    if (!UserName.length > 0) {
        layer.alert("请输入电话号码！");
        return;
    };
    if (!PassWord.length > 0) {
        layer.alert("请输入验证码");
        return;
    };
    if(validation2!=PassWord){
        layer.alert("验证码错误！");
        return;
    }
    $.ajax({
        type: "POST",
        url: preurl + "UsersController/loginByTel.action?telphone=" + UserName,
        async: false,
        success: function (res) {
            var data = eval("(" + (res) + ")");

            if (data.success == "ture") {

                var str = $("#tai2").attr("value");
                setCookie("tai2", str)
                goIndex();
                return;
            } else if (data.false == "false") {
                layer.alert("账号或密码不正确");
                return;
            } else if (data.error == "error") {
                layer.alert("账号已失效；请联系管理员！");
                return;
            }
            else if (data.no == "no") {
                layer.alert("该手机未注册账号！");
                return;
            }
        },
        error: function (data) {
            layer.alert("登陆异常");
            return;
        },
    });
}

//登陆点击事件
function loginOnline() {
    var UserName = $("#UserName").val();
    var PassWord = $("#PassWord").val();
    if (!UserName.length > 0) {
        layer.alert("请输入账号");
        return;
    }
    ;
    if (!PassWord.length > 0) {
        layer.alert("请输入密码");
        return;
    }
    ;
    $.ajax({
        type: "POST",
        url: preurl + "UsersController/login.action?userName=" + UserName + "&passWord=" + PassWord,
        async: false,
        success: function (res) {
            var data = eval("(" + (res) + ")");

            if (data.success == "ture") {

                var str = $("#tai").attr("value");
                setCookie("tai", str)
                goIndex();
                return;
            } else if (data.false == "false") {
                layer.alert("账号或密码不正确");
                return;
            } else if (data.error == "error") {
                layer.alert("账号已失效；请联系管理员！");
                return;
            }
        },
        error: function (data) {
            layer.alert("登陆异常");
            return;
        },
    });
}




//注册页面跳转
/*function zhuce() {
    $("#login").hide();
    $("#zhuce").show();
    //   window.location.href="";
}*/

//回车事件
    $(document).keydown(function (e) {
        if (e.keyCode === 13) {
            login();
        }
    });

    /**
     * 登录跳转
     */
    function goIndex() {
        window.location.assign("index.html");//index.php?majorId="+data
    }

    function getName() {
        //对用户名进行获取，要是session中无值，返回登录页面
        $.ajax({
            url: preurl + "ShouyeController/sUserName.action",
            type: "POST",
            async: true,
            success: function (data) {
                console.log(data);
                if (data == "err" || data == "") {

                    return;
                }
                else {
                    window.location.assign("index.html");
                    return;
                }
            },
            error: function () {
                return;
            }
        });
    }
