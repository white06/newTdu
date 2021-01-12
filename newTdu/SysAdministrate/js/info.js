$(function() {
    getuserinfo();
});

function getuserinfo(){
    $.ajax({
        type : "POST",
        url : secondeurl+"UsersController/GetUserInfo.action",
        success : function(data) {
            if(data!=null){
                $("#name").val(data.name);
                $("#password").val(data.passWord);
                if(data.sex=="女"){
                    $("#sexg").attr("checked","");
                }else{
                    $("#sexb").attr("checked","");
                }
                $("#email").val(data.email);
                $("#MSN").val(data.msn);
                $("#phone").val(data.mobilePhoneNum);
                $("#QQ").val(data.qqNum);
                $("#birthdate").val(data.birthdate);
            }
        }
    })
}

//修改提交
function tijiao(){
    var name= $("#name").val();
    var password= $("#password").val();
    var sex= $('input[name="sex"]:checked').val();
    var email= $("#email").val();
    var msn= $("#MSN").val();
    var phone= $("#phone").val();
    var qq= $("#QQ").val();
    var birthdate= $("#birthdate").val();
    console.log(name,password,sex,email,msn,phone,qq,birthdate);

    var File1 = $("#fileupload")[0].files[0];
    var data= new FormData;
    if(File1==undefined){
        layer.msg("未上传文件");
        data.append("file",null);
    }else if(File1.type=="image/png"||File1.type=="mage/vnd.microsoft.icon"||File1.type=="image/jpeg"){
        data.append("file",File1);
    }else{
        layer.alert("上传头像格式错误，请上传jpg,png,ico格式");
    }
    data.append("name",name);
    data.append("password",password);
    data.append("sex",sex);
    data.append("email",email);
    data.append("msn",msn);
    data.append("phone",phone);
    data.append("qq",qq);
    data.append("birthdate",birthdate);

    console.log(File1)

    if(File1==undefined){
        $.ajax({
            type : "POST",
            url : secondeurl+"UsersController/UpdateUserInfo.action",
            data: {"Name":name,"Sex":sex,"Brithdate":birthdate,"Password":password,"Email":email,"MSN":msn,"MobilePhoneNum":phone,"QQNum":qq},
            success : function(data) {
                if(data==true){
                    layer.alert("修改成功");
                }
            }
        })
    }else {
        $.ajax({
            type:"POST",
            url:secondeurl+"UsersController/UpdateUserFile.action",
            data:data,
            contentType:false,
            processData:false,
            success:function(data){
                if(data==true){
                    layer.alert("修改成功");
                }
            }
        });
    }
}