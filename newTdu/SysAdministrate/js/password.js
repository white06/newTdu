$(function() {
    getuserinfo();
});

function getuserinfo(){
    $.ajax({
        type : "POST",
        url : secondeurl+"UsersController/GetUserInfo.action",
        success : function(data) {
            if(data!=null){
                $("#password").val(data.confirmPassword);
                console.log(data.confirmPassword);
            }
        }
    })
}

function tijiao(){
    var newpassword=$("#newpassword").val();
    var newpassword2=$("#newpassword2").val();
    if(newpassword==null||newpassword2==null){
        layer.alert("请确认输入新密码！");
    }else if(newpassword.length<6){
        layer.alert("修改密码格式不正确！");
    }else if(newpassword!=newpassword2){
        layer.alert("两次密码输入不一致！");
    }else{
        $.ajax({
            type : "POST",
            url : secondeurl+"UsersController/updatePassword.action",
            data : {"Password":newpassword},
            success : function(data) {
                if(data==true){
                    layer.alert("修改成功");

                }
            }
        })
    }
}